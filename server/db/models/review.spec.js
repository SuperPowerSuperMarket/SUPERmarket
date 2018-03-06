/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Sequelize = require('sequelize')
const Promise = require('bluebird')
const User = db.model('user')
const Review = db.model('review')

describe('Review model', () => {
  let review

  //clear the database before making any instances
  before(function () {
    return db.sync({force: true})
  })

  //make a review instance before each spec
  beforeEach(function(){
    review = Review.build({
        stars: 4,
        content: 'Superpowers are the coolest!'
      })
  })

  //remove the review instance we made after running each spec
  afterEach(function () {
    return Review.truncate({cascade: true})
  })

  describe('definition', () => {

    it('includes `stars`, `dateCreated` and `content` fields', function () {

      return review.save()
      .then(function (savedReview) {
        expect(savedReview.stars).to.equal(4)
        expect(savedReview.content).to.equal('Superpowers are the coolest!')
      })

    })

    it('requires `stars`', function () {

      review.stars = null;

      return review.validate()
      .then(function () {
        throw new Error('validation should fail when content is null');
      },
      function(result) {
        expect(result).to.be.an.instanceOf(Error);
      })

    })

    it('belongs to a user, who is the review\'s author', function() {

      var creatingUser = User.create({
          firstName: 'Unsatisfied',
          lastName: 'Customer',
          email: 'unhappy@sad.com',
          mailingAddress: '324 Unhappy Lane',
          billingAddress: '324 Unhappy Lane',
          phone: 123455683
      });

      var creatingReview = Review.create({
        stars: 1
      });

      return Promise.all([creatingUser, creatingReview])
      .spread(function(createdUser, createdReview) {
        return createdReview.setUser(createdUser);
      })
      .then(function() {
        return Review.findOne({
          where: { stars: 1 },
          include: [{ model: User}]
        });
      })
      .then(function(foundReview){
        expect(foundReview.user).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundReview.user.firstName).to.equal('Unsatisfied');
      });

    })
  })
})
