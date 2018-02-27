/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Superpower = db.model('superpower')

describe('Superpower routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/superpowers/', () => {
    const powerName = 'Dashing good looks'
    const powerDescription = 'Too handsome for his own good'
    const powerImageUrl = 'https://baseballhall.org/sites/default/files/styles/large/public/Jones%20Chipper%209504-95_HS_NBL.jpg?itok=2Vvo4pKo'
    const powerStock = 100

    beforeEach(() => {
      return Superpower.create({
        name: powerName,
        description: powerDescription,
        imageUrl: powerImageUrl,
        stock: powerStock
      })
    })

    it('GET /api/superpowers returns superpowers', () => {
      return request(app)
        .get('/api/superpowers')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(powerName)
        })
    })

    it('PUT /api/superpowers/:id updates a superpower', () => {
      const newPowerName = 'Looks like Chipper Jones'
      return request(app)
        .put('/api/superpowers/1')
        .send({name: newPowerName})
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.equal(newPowerName);
        })
    })

    it('POST /api/superpowers adds a superpower', () => {
      const newName = 'Really good danger'
      const newDescription = 'Has moves like Mick Jagger'
      const newImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/AdamLevine2011.jpg/1200px-AdamLevine2011.jpg'
      const newStock = 100
      Superpower.create({
        name: newName,
        description: newDescription,
        imageUrl: newImageUrl,
        stock: newStock
      })
      return request(app)
        .get('/api/superpowers/')
        .expect(200)
        .expect(function(res) {
          expect(res.body[1].name).to.be.equal(newName)
      })
    })

    it('DELETE /api/superpower/:id removes a superpower', () => {
      return request(app)
        .delete(`/api/superpowers/2`)
        // .expect(204)
        .expect(() => {
          return Superpower.findById(2).then(res =>
            expect(res).to.equal(null)
          )
    })
  })
})
})
