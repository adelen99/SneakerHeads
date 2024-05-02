// domain/.netlify/functions/create-payment-intent
require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  if (event.body) {
    const { cartItems, calculateTotal } = JSON.parse(event.body);
    console.log(cartItems);

    const calculateOrderAmount = () => {
      const totalAmount = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price);
        return sum + price;
      }, 0);

      return totalAmount * 100;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: "Create Payment Intent",
  };
};
