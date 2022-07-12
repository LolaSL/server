
const express = require('express');
const Stripe = require("stripe")
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
const router = express.Router();
const  Order  = require("../models/OrderModel");

router.post('/create-checkout-session', async (req, res) => {

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cart_items),
    }
  }); 
  

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GR', 'DK', 'SE','KE'],
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
            name: 'Abstract cityscape',
          },
          unit_amount: 47500,
        },
        quantity: 1,


      },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Sunburstwall clock',
          },
          unit_amount: 35100,

        },
        quantity: 1,

      },
    ],
    phone_number_collection: { enabled: true },
   
    mode: 'payment',
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/success.html`,
    cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    automatic_tax: { enabled: false },
  });

  res.send({ url: session.url });
 });
//Create order object

const createOrder = async (customer, data) => {

 Items = JSON.stringify(customer.metadata.cart);

  const orderInstance =  new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status
  });

  try {
    const savedOrder = await orderInstance.create(data)
    //send email
    console.log("Processed Order: " + savedOrder)
  }
  catch (err) { console.log(err) }
};
//Stripe webhookEndpoint
// This is your Stripe CLI webhook secret for testing your endpoint locally.
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
        }).catch(err => console.error(err.message));
    // Return a 200 response to acknowledge receipt of the event
    res.send().end();

  });



module.exports = router;
