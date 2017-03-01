'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Comment = db.define('comment', {

  content: {
    type: Sequelize.TEXT,
    validate: {
      minLength: function(val) {
        if (val.length < 10) throw new Error('content of comment must be at least 10 characters')
      }
    }
  },

  num_stars: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5 }
  }

},

{

  instanceMethods: {
    isUpdated: function() {
      const createdTime = this.getDataValue('created_at').toString()
      const updatedTime = this.getDataValue('updated_at').toString()
      const equalVal = (createdTime === updatedTime)
      console.log(equalVal, createdTime, updatedTime, this.dataValues)
      if (equalVal) return false
      else return updatedTime
    }
  }

})


module.exports = Comment
