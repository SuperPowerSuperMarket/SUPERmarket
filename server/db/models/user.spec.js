/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

xdescribe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          firstName: 'Cody',
          lastName: 'Guy',
          email: 'cody@puppybook.com',
          password: 'bones',
          mailingAddress: '123 Fake St',
          billingAddress: '123 Fake St',
          phone: 1234567890
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
