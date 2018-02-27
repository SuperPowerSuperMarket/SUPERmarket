const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  content: {
    type: Sequelize.TEXT
  },
  dateCreated: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  }
})

module.exports = Review
