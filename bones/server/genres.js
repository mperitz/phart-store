'use strict'

const db = require('APP/db')
const Genre = db.model('genres')
const router = require('express').Router();

router.get('/', function(req,res,next){
	Genre.findAll()
	.then(genresArr => res.json(genresArr))
	.catch(next);
})

module.exports = router