'use strict'

const db = require('APP/db')
const Item = db.model('items')
const router = require('express').Router();

router.get('/', function(req, res, next) {
//working
  Item.findAll()
  .then(allItems => {
    res.json(allItems)
  })
  .catch(next)
})


module.exports = router
