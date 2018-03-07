const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  passwordReset: {
    type: Sequelize.BOOLEAN
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get () {
      return () => this.getDataValue('salt')
    }
  },
  mailingAddress: {
    type: Sequelize.TEXT
  },
  billingAddress: {
    type: Sequelize.TEXT
  },
  phone: {
    type: Sequelize.INTEGER
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
  },
  isLoggedIn: {
    type: Sequelize.BOOLEAN,
  },
  googleId: {
    type: Sequelize.STRING
  }
}, {
  getterMethods: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    }
  },
  // setterMethods: {
  //   createdAtDate () {
  //     const date = createdAt
  //     this.setDataValue('createdAt', )
  //   }
  // }
})

module.exports = User

// User.beforeCreate(async (user) => {
//   const cart = await Order.create({
//     userId: user.id
//   })
//   await OrderQuantity.update(
//     { orderId: cart[0].id },
//     {
//       where: { orderId: req.session.orderId },
//       returning: true
//     }
//   )
//   await Order.destroy({ where: { id: req.session.orderId } })
// })

User.beforeDestroy((userInstance) => {
  return Order.destroy({
    where: {
      userId: userInstance.id
    }
  })
})

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)


