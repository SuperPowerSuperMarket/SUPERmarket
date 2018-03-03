const router = require('express').Router()
const { Order, Superpower, OrderQuantity } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const userId = req.user.id
  const sessionId = req.session.id
  let order;
  if (userId) {
    order = await Order.findAll({
      where: {userId},
      include: [{ all: true, nested: true }]
    })
  } else {
    order = await Order.findOrCreate({
      where: {sessionId},
      defaults: {sessionId},
      include: [{ all: true }]
    }).spread((item) => item)
  }
  await order.reload()
  res.send(order)
});

// router.get('/:id', (req, res, next) => {
//   Order.findById(req.params.id, { include: [{ all: true }] })
//     .then(order => res.json(order))
//     .catch(next);
// });

router.post('/', async (req, res, next) => {
  const { userId, superpowerId, quantity } = req.body
  let order
  if (!userId) {
  order = await Order.create({
    sessionId: req.session.id
  }, {
    include: [{ all: true }]
  })
} else {
  order = await Order.create({userId}, {
    include: [{ all: true }]
  })
}
  await OrderQuantity.create({
    orderId: order.id,
      superpowerId, quantity
  }).catch(next)
  await order.reload()
  res.send(order)
});

router.put('/:id', (req, res, next) => {
  OrderQuantity.findOrCreate({
    where: {
      orderId: req.params.id,
      superpowerId: req.body.superpowerId
    },
    defaults: {quantity: req.body.quantity},
    include: [{ all: true }]
  }).spread((item, created) => {
    if (!created) {
      return item.update(req.body)
        .then(updated => Order.findById(updated.orderId, {
          include: [{ all: true }]
        }))
        .then(order => {
          res.json(order)
        })
    }
    else {
      Order.findById(item.orderId, {
        include: [{ all: true }]
      }).then(order => res.json(order));
    }
  })
})

router.delete('/:id', (req, res, next) => {
  Order.destroy({ where: { id: req.params.id } })
    .then(() => res.status(204).json('order deleted'))
    .catch(next);
});

