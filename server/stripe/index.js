// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = require('express').Router()
module.exports = router

router.post('/', (req, res, next) => {
  console.log('here chilllin in stripe!!!')
  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
  const token = req.body.token;

  // Charge the user's card:
  stripe.charges.create({
    amount: req.body.amount,
    currency: 'usd',
    description: "Example charge",
    statement_descriptor: "Custom descriptor",
    source: token,
  }, function (err, charge) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      console.log(charge);
      res.send(charge)
    }
  });
})
