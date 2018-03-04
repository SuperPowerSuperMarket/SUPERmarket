const router = require('express').Router()
const { Order, Superpower, OrderQuantity } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  // console.log('body', req.body)
  console.log('session', req.session)
  // console.log(req.user)
  let currentId
  if (req.user) {
    currentId = req.user.id
  } else {
    currentId = req.session.id
  }
  // console.log(currentId)
  // Order.findAll({
  //   where: {
  //     // userId: currentId
  //   },
  //   include: [{ all: true, nested: true }]
  // })
  //   .then(orders => res.json(orders))
  //   .catch(next);
});

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, { include: [{ all: true }] })
    .then(order => res.json(order))
    .catch(next);
});

router.post('/', async (req, res, next) => {
  const order = await Order.create(req.body, {
    include: [{ all: true }]
  })
  const { userId, superpowerId, quantity } = req.body
  await OrderQuantity.create({
    orderId: order.id,
    userId, superpowerId, quantity
  }).catch(next)
  await order.reload()
  res.send(order)
});

router.put('/:id', (req, res, next) => {
  // const order = await Order.findById(req.params.id, {
  //   include: { all: true }
  // })
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

// router.put('/:id', (req, res, next) => {
//   let superpower;
//   let order;
//   let items;
//   Promise.all([Superpower.findById(req.body.superpowerId), Order.findById(req.params.id), OrderQuantity.findAll({where: {orderId: req.params.id}})])
//     .then(values => {
//       superpower = values[0];
//       order = values[1];
//       items = values[2];
//     })
//     .then(() => {
//       const found = items.find(item => {
//         return item.superpowerId === superpower.id
//       });
//       return found ?
//         found.update({quantity: req.body.quantity})
//         : order.addSuperpower(superpower, { through: {quantity: req.body.quantity }})
//     })
//     .then(() => order.update(req.body))
//     .then(updated => res.json(updated))
//     .catch(next);
// });

router.delete('/:id', (req, res, next) => {
  Order.destroy({ where: { id: req.params.id } })
    .then(() => res.status(204).json('order deleted'))
    .catch(next);
});

