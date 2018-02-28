const router = require('express').Router()
const { Order, Superpower, OrderQuantity } = require('../db/models')
module.exports = router

// Cart middleware:
//   guarantees that req.cart exists after it runs.
async function withCart(req, res, next) {
  if (req.session.orderId) {
    req.cart = await Order.findById(req.session.orderId)
    // Q: What if this cart isn't in state: cart?
    //   (maybe create a cart?)
    // Q: What if this cart is owned by someone other than req.user?
    //   (maybe repudiation?) (maybe isn't a problem.)
    // Q: What if this cart is owned by NULL and req.user isn't null?
    //   (maybe adoption?)
    next()
    return
  }

  // If we get here, there isn't an orderId on session.
  // So, create one.
  const cart = await Order.create({
    userId: req.user ? req.user.id : null
  })
  req.session.orderId = cart.id
  req.cart = await Order.findById(req.session.orderId)    
  next()
}


// router.post('/cart/buy')

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

router.post('/', async (req, res, next) => {
  const order = await Order.create(req.body, {
    include: {all: true}
  })
  const {superpowerId, quantity} = req.body
  await OrderQuantity.create({
    orderId: order.id,
    superpowerId, quantity
  }).catch(next)
  await order.reload()
  res.send(order)
});

router.put('/:id', (req, res, next) => {
  // I think this is helpful.
  // But maybe there's something I'm not noticing.
  OrderQuantity.findOrCreate({
    orderId: req.cart.id,
    superpowerId: req.body.superpowerId
  }).then(line => line.update({quantity: req.body.quantity}))


  let superpower;
  let order;
  let items;
  Promise.all([
    Superpower.findById(req.body.superpowerId),
    Order.findById(req.params.id),
    OrderQuantity.findAll({where: {orderId: req.params.id}})])
    .then(values => {
      superpower = values[0];
      order = values[1];
      items = values[2];
    })
    .then(() => {
      const found = items.find(item => {
        return item.superpowerId === superpower.id
      });
      return found ?
        found.update({quantity: req.body.quantity})
        : order.addSuperpower(superpower, { through: {quantity: req.body.quantity }})
    })
    .then(() => order.update(req.body))
    .then(updated => res.json(updated))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Order.destroy({ where: {id: req.params.id} })
    .then(() => res.status(204).json('order deleted'))
    .catch(next);
});

