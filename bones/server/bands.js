'use strict'

const db = require('APP/db')
const Band = db.model('bands')
const router = require('express').Router()

router.get('/', function(req,res,next){
  Band.findAll()
  .then(bandsArr => res.json(bandsArr))
  .catch(next)
})

router.get('/:bandId', function(req, res, next){
  Band.findById(req.params.bandId)
  .then(band => res.json(band))
  .catch(next)
})

module.exports = router

