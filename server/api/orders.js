const router = require('express').Router()
const { Order, Superpower } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(next);
});

router.post('/', (req, res, next) => {
  let superpower;
  Superpower.findById(req.body.superpowerId)
    .then((power) => {
      superpower = power;
      return Order.create()
    })
    .then(order => {
      order.addSuperpower(superpower, { through: {quantity: req.body.quantity }})
      return order;
    })
    .then(newOrder => res.json(newOrder))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(updated => res.json(updated))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Order.destroy({ where: {id: req.params.id} })
    .then(() => res.status(204).json('order deleted'))
    .catch(next);
});