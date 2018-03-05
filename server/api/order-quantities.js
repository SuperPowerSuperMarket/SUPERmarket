const router = require('express').Router()
const { Order, Superpower, OrderQuantity } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  OrderQuantity.findAll({
    include: [{ all: true }]
  })
  .then(orderquant => res.json(orderquant))
  .catch(next);
});
