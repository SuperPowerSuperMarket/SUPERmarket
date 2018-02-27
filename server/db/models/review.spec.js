/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Sequelize = require('sequelize')
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
    let review = Review.build({
        stars: 4,
        dateCreated: '2018-02-15',
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
        expect(savedReview.stars).to.equal(4);
        expect(savedReview.dateCreated).to.equal('2018-02-15')
        expect(savedReview.content).to.equal('Superpowers are the coolest!');
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

      var newUser = User.create({ name: 'Unsatisfied Customer'});
      var newReview = Review.create({
        stars: 1,
        content: 'I ordered this flying superpower to see the sights of the city. I was very disappointed when I was only able to get five feet off the ground at any given moment. Would not recommend.'
      })

      return Promise.all([newUser, newReview])
      .spread(function(createdUser, createdReview) {
        return createdReview.setAuthor(createdUser);
      })
      .then(function() {
        return Review.findOne({
          where: { content: 'I ordered the flying superpower but was only ever able to get five feet off the ground at any given moment. Would not recommend.' },
          include: { model: User, as: 'author' }
        });
      })
      .then(function(foundReview){
        expect(foundReview.author).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundReview.author.name).to.equal('Unsatisfied Customer');
      })

    })


  })
})


// Reviews belong to superpower and user
// columns: number of stars, content, date
