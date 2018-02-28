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
    }, include: {all: true}
  })
  .then(superpower => res.json(superpower))
  .catch(next);
});

router.post('/', (req, res, next) => {
  Superpower.create(req.body,
    // {[{model: Review}]}
  )
  .then(superpower => res.json(superpower))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  Superpower.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
  .then(superpower => res.status(201).json(superpower[1][0]))
  .catch(next);
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
