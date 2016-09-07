var express = require('express');
var router = express.Router();

var queries = require('../db/queries');

/* GET all shows. */
router.get('/shows', function(req, res, next) {
  queries.getAll()
  	.then((shows) => {
  		res.status(200).json(shows);
  	})
  	.catch((err) => {
  		next(err);
  	})
});

router.get('/shows/:id', function(req, res, next){
	queries.getSingle(req.params.id)
		.then((show) => {
			res.status(200).json(show);
		})
		.catch((err) => {
			next(error)
		})
})

router.post('/shows', function(req, res, next){
	queries.add(req.body)
		.then((showID) => {
			return queries.getSingle(showID);
		})
		.then((show) => {
			res.status(200).json(show)
		})
		.catch((err) => {
			next(err)
		})
})

router.put('/shows/:id', function(req, res, next) {
  queries.update(req.params.id, req.body)
  .then(function() {
    return queries.getSingle(req.params.id);
  })
  .then(function(show) {
    res.status(200).json(show);
  })
  .catch(function(error) {
    next(error);
  });
});

module.exports = router;
