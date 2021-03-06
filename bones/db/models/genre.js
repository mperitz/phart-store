'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */


const Sequelize = require('sequelize')
const db = require('APP/db')

const Genre = db.define('genres', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Genre
