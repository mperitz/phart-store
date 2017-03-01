'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const db = require('APP/db')

const User = db.define('users',
{
  // name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
			isEmail: true,
			notEmpty: true,
		},
    allowNull: false
  },

  //Added properties (begin)

  username: {
    type: Sequelize.STRING(25),
    allowNull: false
  },

  profile_photo: Sequelize.STRING,

  about_me: Sequelize.TEXT,

  is_vendor: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  is_admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  endorsed_by: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  },

  favorite_users: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    validate: {
      maxLength: function(val) {
        const favoritesLimit = 3
        if (val.length > favoritesLimit) throw new Error(`user can only have ${favoritesLimit}`)
      }
    },
    defaultValue: []
  },

  favorite_bands: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    validate: {
      maxLength: function(val) {
        const favoritesLimit = 3
        if (val.length > favoritesLimit) throw new Error(`user can only have ${favoritesLimit}`)
      }
    },
    defaultValue: []
  },
  //Added poperties (ends)

  // We support oauth, so users may or may not have passwords.
  password_digest: Sequelize.STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
	password: Sequelize.VIRTUAL // Note that this is a virtual, and not actually stored in DB
},

{
	indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate (plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      )
    },

    // updateFavorites (whichFavorites, newFavoritesArray) {

    //   if (Array.isArray(newFavoritesArray)) {
    //     if (whichFavorites === 'users') {
    //       this.favoriteUsers = newFavoritesArray
    //     } else if (whichFavorites === 'bands') {
    //       this.favoriteBands = newFavoritesArray
    //     }
    //   }
    // }
  }
})

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return new Promise((resolve, reject) =>
	  bcrypt.hash(user.get('password'), 10, (err, hash) => {
		  if (err) reject(err)
		  user.set('password_digest', hash)
      resolve(user)
	  })
  )
}

module.exports = User
