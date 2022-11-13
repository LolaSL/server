require("dotenv").config()
const express = require('express');
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
const router = express.Router();
const Order = require("../models/OrderModel");
const { checkAuthentication } = require('../config/passportConfig');

router.post('/create-checkout-session', checkAuthentication, async (req, res) => {

  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.user_id,
      cart: JSON.stringify(req.body.cart_items),
    }
  })


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GR', 'DK', 'SE', 'KE'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          }
        }
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Next day air',
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          }
        }
      },
    ],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 20 * 100,
        },
        quantity: 1,
      },
    ],
    phone_number_collection: { enabled: true },
    // line_items,
    mode: 'payment',
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/carts/success`,
    cancel_url: `${process.env.CLIENT_URL}/carts`,
    automatic_tax: { enabled: false },
  });
  res.send({ url: session.url });
  console.log(session)
});
//Create order object

const createOrder = async (customer, data) => {
 items = JSON.stringify(customer.metadata.cart);
  const products = items.map((item) => {
    return {
      product_id: item.id,
      quantity: item.quantity,
    };
  });
  const orderInstance = new Order({
    user_id: customer.metadata.user_id,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: data.product_data,
    products:products,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status
  });
  try {
    const savedOrder = await orderInstance.create()
    //send email
    console.log("Processed Order: " + savedOrder)
  }
  catch (err) { console.log(err) }
};
//Stripe webhookEndpoint
// This is  Stripe CLI webhook secret for testing  endpoint locally.
let endpointSecret;
endpointSecret = process.env.END_POINT_SECRET;
router.post('/webhook', express.raw({ type: 'application/json' }),
  (req, res) => {
    const sig = req.headers['stripe-signature'];
    let data;
    let eventType;
    if (endpointSecret) {

      let event;

      try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
        console.log('Webhook verified.', event);
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }
    //Handle the event
    if (eventType === "checkout.session.completed")
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          console.log(customer);
          console.log('data:', data);
          createOrder(customer, data);
        }).catch(err => console.log(err.message));
    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
    console.log(eventType)
  });

module.exports = router;
