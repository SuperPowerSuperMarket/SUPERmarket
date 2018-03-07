// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require("stripe")("sk_test_EdLt9chrYNvjUTFWhvbOAJD8");
const router = require('express').Router()
module.exports = router

router.post('/', (req, res, next) => {
  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
  const token = req.body.stripeToken;

  // Charge the user's card:
  stripe.charges.create({
    amount: req.body.amount,
    currency: 'usd',
    description: 'Supermarket',
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
  next();
})
