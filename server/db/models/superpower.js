const Sequelize = require('sequelize')
const db = require('../db')

const Superpower = db.define('superpower', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  // duration: {
  //   type: Sequelize.ARRAY(Sequelize.INTEGER)
  // },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  stock: {
    type: Sequelize.INTEGER
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    //Setter function
  }
})

Superpower.findByTag = (tag) => {
  return Superpower.findAll({
    where: {
      tags: {
        $contains: [tag]
      }
    }
  })
}

// Superpower.prototype.findSimilar = () => {}
