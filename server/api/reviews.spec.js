/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')

describe('review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/reviews', () => {
    const stars = 2
    const content = 'Very mediocre superpower.'

    beforeEach(() => {
      return Review.create({
        stars,
        content
      })
    })

    it('GET /api/reviews returns reviews', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].content).to.be.equal(content)
        })
    })

    it('PUT /api/reviews/:id updates a review', () => {
      const newContent = 'Maybe it was better than I first thought.'
      return request(app)
        .put('/api/reviews/1')
        .send({content: newContent})
        .expect(200)
        .expect(res => {
          expect(res.body.content).to.equal(newContent);
        })
    })

    it('POST /api/reviews adds a review', () => {
      const newStars = 4
      const newContent = 'Had so much fun flying around town!'

      return request(app)
        .post('/api/reviews')
        .send({
          stars: newStars,
          content: newContent
        })
        .expect(201)
        .expect(function(res) {
          expect(res.body.content).to.be.equal(newContent)
      })
    })

    it('DELETE /api/review/:id removes a review', () => {
      return request(app)
        .delete(`/api/reviews/1`)
        .expect(() => {
          return Review.findById(1).then(res =>
            expect(res).to.equal(null)
          )
    })
  })
})
})
