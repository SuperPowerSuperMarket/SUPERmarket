const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => review.update(req.body))
    .then(updated => res.json(updated))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Review.destroy({where: {id: req.params.id} })
    .then(() => res.status(204).json('review deleted'))
    .catch(next)
})
