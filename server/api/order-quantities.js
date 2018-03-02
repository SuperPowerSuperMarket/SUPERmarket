const router = require('express').Router()
const { Order, Superpower, OrderQuantity } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {

  OrderQuantity.findAll({
    include: [{ model: Superpower }]
  })
  .then(orderquant => res.json(orderquant))
  .catch(next);
});
