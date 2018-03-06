const router = require('express').Router()
const { Order, Superpower, OrderQuantity } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const orders = await OrderQuantity.findAll({include: [{ all: true, nested: true }]})
  res.json(orders);
})

router.get('/user', async (req, res, next) => {
  let order;
  if (req.user) {
    const userId = req.user.id
    order = await Order.findAll({
      where: {userId},
      include: [{ all: true, nested: true }]
    })
  } else {
    order = await Order.findOrCreate({
      where: {id: +req.session.orderId},
      include: [{ all: true, nested: true }]
    }).spread((item, created) => {
      if (created) {
        req.session.orderId = item.id
      }
      return [item]})
  }
  res.json(order);
});

router.post('/', async (req, res, next) => {
  const { userId, superpowerId, quantity } = req.body
  let order
  if (!userId) {
  order = await Order.create({
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

router.put('/:id/complete', async (req, res, next) => {
  const order = await Order.findById(req.params.id, {
    include: [{ all: true }]
  })
  console.log(req.body)
  //const updated = await order.update(req.body)
  //res.json(updated)
})

router.delete('/:id', (req, res, next) => {
  Order.destroy({ where: { id: req.params.id } })
    .then(() => res.status(204).json('order deleted'))
    .catch(next);
});

