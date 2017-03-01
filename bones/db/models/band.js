'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Band = db.define('band', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    profile_image: {
        type: Sequelize.STRING //imageURL
    },
    image_references: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
    },
    description: {
        type: Sequelize.TEXT
    },
    genre: {
        type: Sequelize.STRING
    },
    favorite_users: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        validate: {
          maxLength: function(val) {
            const favoritesLimit = 3
            if (val.length > favoritesLimit) throw new Error(`user can only have ${favoritesLimit}`)
          }
        }
    },
    favorite_pieces: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        validate: {
          maxLength: function(val) {
            const favoritesLimit = 3
            if (val.length > favoritesLimit) throw new Error(`user can only have ${favoritesLimit}`)
          }
        }
    }
}, {})

module.exports = Band
