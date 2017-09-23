var express = require('express');
var router = express.Router();
var cityController = require('../controllers/city');

/*******************************************************************/
/******************************* GET ******************************/
/*******************************************************************/

// define the get route of a specific city
router.get('/:id', function (req, res) {
	cityController.getCity(req.params.id)
					  .then(function (doc) {
						  res.send(doc);
					  }, function (err) {
						  res.send(err);
					  });
});

// define the get route of all incidents in a specific city
router.get('/:id/incidents', function (req, res) {
	cityController.getCityIncidents(req.params.id)
					  .then(function (doc) {
						  res.send(doc);
					  }, function (err) {
						  res.send(err);
					  });
});

// define the get route of all locales in a specific city
router.get('/:id/locales', function (req, res) {
	cityController.getCityLocales(req.params.id)
					  .then(function (doc) {
						  res.send(doc);
					  }, function (err) {
						  res.send(err);
					  });
});

// define the get route of all cities
router.get('/', function (req, res) {
	if(req.query.country){
		cityController.getCountryCities(req.query.country)
					  .then(function (docs) {
						  res.send(docs);
					  }, function (err) {
						  res.send(err);
					  });
	}
	else {
		cityController.getAllCities()
					  .then(function (docs) {
						  res.send(docs);
					  }, function (err) {
						  res.send(err);
					  });
	}
});

/*******************************************************************/
/******************************* UPDATE ****************************/
/*******************************************************************/
// define the update route
router.put('/:id', function (req, res) {
	cityController.updateCity(req)
					  .then(function (msg) {
						  res.send(msg);
					  }, function (err) {
						  res.send(err);
					  });
});

/*******************************************************************/
/******************************* POST ******************************/
/*******************************************************************/
// define the post route
router.post('/', function (req, res) {
	cityController.insertCity(req.body)
					  .then(function (doc) {
						  res.send(doc._id);
					  }, function (err) {
						  res.send(err);
					  });
});

/*******************************************************************/
/******************************* DELETE ******************************/
/*******************************************************************/
// define the delete route
router.delete('/:id', function (req, res) {
	cityController.deleteCity(req.params.id)
					  .then(function (msg) {
						  res.send(msg);
					  }, function (err) {
						  res.send(err);
					  });
});


module.exports = {
	router: router
};