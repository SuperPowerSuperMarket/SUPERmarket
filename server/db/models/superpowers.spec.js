/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Sequelize = require('sequelize');
const Promise = require('bluebird');
const Superpower = db.model('superpower');

describe('Superpower model', () => {
  let superpower;

  //clear the database before making any instances
  before(function() {
    return db.sync({ force: true });
  });

  //make a review instance before each spec
  beforeEach(function() {
    superpower = Superpower.build({
      name: 'Cat-like Reflexes',
      price: 750,
      description: 'Like the eye of the tiger',
      imageUrl:
        'http://www.survivorband.com/wp-content/uploads/2016/04/final_11.-Best-of.jpg',
      stock: 100,
      tags: ['animal', 'speed']
    });
  });

  //remove the instance we made after running each spec
  afterEach(function() {
    return Superpower.truncate({ cascade: true });
  });

  describe('definition', () => {
    it('includes `name`, `price`, `description`, `imageUrl`, `stock`, and `tags` fields', function() {
      return superpower.save().then(function(savedSuperpower) {
        expect(savedSuperpower.name).to.equal('Cat-like Reflexes');
        expect(+savedSuperpower.price).to.equal(750);
        expect(savedSuperpower.description).to.equal(
          'Like the eye of the tiger'
        );
        expect(savedSuperpower.imageUrl).to.equal(
          'http://www.survivorband.com/wp-content/uploads/2016/04/final_11.-Best-of.jpg'
        );
        expect(+savedSuperpower.stock).to.equal(100);
        console.log(savedSuperpower.tags)
        expect(savedSuperpower.tags[0]).to.equal('animal');
      });
    });

    it('requires `name`', function() {
      superpower.name = null;

      return superpower.validate().then(
        function() {
          throw new Error('validation should fail when content is null');
        },
        function(result) {
          expect(result).to.be.an.instanceOf(Error);
        }
      );
    });
  });
});
