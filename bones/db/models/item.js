'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Item = db.define('items', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  num_available: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },

  //saved in cents
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  medium: Sequelize.STRING,
  profile_image: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  gallery: Sequelize.ARRAY(Sequelize.TEXT),
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      minLength: function(val) {
        if (val.length < 10) throw new Error('content of comments must be at least 10 characters')
      }
    }
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    set: function (tags) {
      tags = tags || []
      if (typeof tags === 'string') {
        tags = tags.split(',').map(function (str) {
          return str.trim()
        })
      }
      this.setDataValue('tags', tags);
    }
  },
  num_upvotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  ratings_sum: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  num_ratings: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
    // incrementer will be done on the comment post route
    // instance.increment('num_ratings')
  },
  endorsedBy: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }
}, {
  setterMethods: {
    increaseRatingsSum: function(rating) {
      const newRating = this.ratings_sum + rating
      this.setDataValue('ratings_sum', newRating)
    }
  },
  getterMethods: {
    avgRating: function() {
      if (this.num_ratings > 0) return this.ratings_sum / this.num_ratings
      else return 0
    }
  }
})

module.exports = Item
