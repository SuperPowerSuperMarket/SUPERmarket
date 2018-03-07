const router = require('express').Router()
const { Order, Superpower, OrderQuantity } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await OrderQuantity.findAll({
      include: [{ all: true, nested: true }]
    })
    res.json(orders);
  } catch (err) {
    next(err);
  }
})

router.get('/user', async (req, res, next) => {
  let order;
  if (req.user) {
    const userId = req.user.id
    order = await Order.findAll({
      where: { userId },
      include: [{ all: true, nested: true }]
    })
  } else {
    order = await Order.findOrCreate({
      where: { id: +req.session.orderId },
      include: [{ all: true, nested: true }]
    }).spread((item, created) => {
      if (created) {
        req.session.orderId = item.id
      }
      return [item]
    })
  }
  res.json(order);
});

router.post('/', async (req, res, next) => {
  try {
    const { userId, superpowerId, quantity } = req.body
    let order
    if (!userId) {
      order = await Order.create({
      }, {
          include: [{ all: true }]
        })
    } else {
      order = await Order.create({ userId }, {
        include: [{ all: true }]
      })
    }
    await OrderQuantity.create({
      orderId: order.id,
      superpowerId, quantity
    }).catch(next)
    await order.reload()
    res.send(order)
  }
  catch (err) {
    next(err)
  }
});

router.put('/:id', (req, res, next) => {
  const { superpowerId, quantity } = req.body
  OrderQuantity.findOrCreate({
    where: {
      orderId: req.params.id,
      superpowerId: superpowerId
    },
    defaults: { quantity },
    include: [{ all: true }]
  }).spread((item, created) => {
    if (!created) {
      return item.update({
        quantity: quantity
      })
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
      })
        .then(order => res.json(order));
    }
  })
    .catch(next)
})

router.put('/:id/pending', async (req, res, next) => {
  const { fullName, shippingAddress } = req.body
  const order = await Order.findById(+req.params.id, {
    include: [{ all: true, nested: true }]
  })
  const updated = await order.update({ fullName, shippingAddress })
  res.json(updated)
})

router.put('/:id/complete', async (req, res, next) => {
  const order = await Order.findById(+req.params.id, {
    include: [{ all: true, nested: true }]
  })
  const updated = await order.update({
    status: 'ordered',
    orderedOn: new Date()
  })
  res.json(updated)
})

router.delete('/:id', (req, res, next) => {
  Order.destroy({ where: { id: req.params.id } })
    .then(() => res.status(204).json('order deleted'))
    .catch(next);
});
