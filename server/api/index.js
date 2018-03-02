const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'));
router.use('/superpowers', require('./superpowers'));
router.use('/reviews', require('./reviews'));
router.use('/orders', require('./orders'));
router.use('/order-quantities', require('./order-quantities'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
