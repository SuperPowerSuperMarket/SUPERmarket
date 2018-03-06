const router = require('express').Router()
const { User, Order, OrderQuantity } = require('../db/models')

const merger = async (user, req) => {
  const cart = await Order.findOrCreate({
    where: { status: 'active', userId: user.id },
    defaults: { userId: user.id },
    include: [{ all: true, nested: true }]
  })
  await OrderQuantity.update(
    { orderId: cart[0].id },
    {
      where: { orderId: req.session.orderId },
      returning: true
    }
  )
  await Order.destroy({ where: { id: req.session.orderId } })
}

module.exports = {router, merger}

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({
    include: [{ all: true }],
    where: { email: req.body.email }
  })
  if (!user) {
    res.status(401).send('User not found')
  } else if (!user.correctPassword(req.body.password)) {
    res.status(401).send('Incorrect password')
  } else {
    req.login(user, err => (err ? next(err) : res.json(user)))
    merger(user, req)
  }
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
