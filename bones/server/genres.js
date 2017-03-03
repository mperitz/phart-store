'use strict'

const db = require('APP/db')
const Genre = db.model('genres')
const router = require('express').Router();

router.get('/', function(req,res,next){
	Genre.findAll()
	.then(genresArr => res.json(genresArr))
	.catch(next);
})

router.get('/:genreId', function(req, res, next){
  Genre.findById(req.params.genreId)
  .then(genre => res.json(genre))
  .catch(next)
})

module.exports = router
