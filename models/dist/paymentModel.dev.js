// const Stripe = require("stripe");
// const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
// class PaymentModel {
//   payment = async (price, email) => {
//     try {
//       return await stripe.paymentIntents.create({
//         amount,
//         currency: "usd",
//         payment_method_types: ["card"],
//           receipt_email: email,
//       });
//     } catch (error) {
//       throw new ErrorHandler(error.statusCode, error.message);
//     }
//   };
// }
// module.exports = new PaymentModel();
"use strict";