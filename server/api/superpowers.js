const router = require('express').Router();
const {Superpower} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Superpower.findAll()
    .then(superpowers => res.json(superpowers))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Superpower.findAll({
    // include: [{model: Review}],
    where: {
      id: req.params.id
    }
  })
  .then(superpower => res.json(superpower))
  .catch(next);
});

router.post('/', (req, res, next) => {
  Superpower.create(req.body)
  .then(superpower => res.json(superpower))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  Superpower.findById(req.params.id)
    .then(superpower => {
      superpower.update(req.body)
      .then(updatedPower => res.status(201).send(updatedPower))
    })
});

router.delete('/:id', (req, res, next) => {
  Superpower.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.send('deleted superpower'))
  .catch(next);
});
