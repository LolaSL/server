
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

//data.order_id, data.product_id, data.quantity

const storeItems = new Map([
    [1, {
        priceInCents: 25799, name: "Brooch",

    },],

    [2, {
        priceInCents: 35467, name: "Figurine Statue",

    },],
    [3, {
        priceInCents: 8750, name: "Alarm Clock",

    },],
]);
const processPayment = async (req, res) => {

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: storeItem.name,

                        },
                        unit_amount: storeItem.priceInCents,
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

}


module.exports = processPayment;
