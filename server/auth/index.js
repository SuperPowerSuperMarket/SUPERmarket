const router = require('express').Router()
const {User, Order, OrderQuantity} = require('../db/models')

module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({
    include: [{all: true}],
    where: {email: req.body.email}
  })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
        return user;
      }
    })
    .then((user) => {
      const cart = user.orders.find(order => order.status === 'active')
      OrderQuantity.update(
        { orderId: cart.id },
        { where: { orderId: req.session.orderId}}
      )
    })
    .spread((affectedCount, affectedRows) => {
      return  Order.destroy({where: {id: req.session.orderId}})
    })
    .then(() => console.log('deleted!'))
     
    })
    //.catch(next)


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
