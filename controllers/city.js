var LocaleModel = require('../models/Locale');
var CityModel = require('../models/City');
var IncidentModel = require('../models/Incident');
var Q = require('q');
var ObjectId = require('mongoose').Types.ObjectId;

//create an city
function insertCity(myCity) {
	var deferred = Q.defer();
	var newCity = new CityModel(myCity);
	newCity.save(function (err, doc) {
		if (err) {
			deferred.reject(err)
		}
		else {
			deferred.resolve(doc);
		}
	});
	return deferred.promise;
}

/*******************************************************************/
/******************************* UPDATE ****************************/
/*******************************************************************/
//update an city
function updateCity(query) {
	var deferred = Q.defer();
	CityModel.update({_id: new ObjectId(query.params.id)}, query.body, {upsert: true}, function (err, doc) {
		if (err) {
			deferred.reject(err);
		}
		else {
			var msg = 'The City has been successfully updated';
			deferred.resolve(msg);
		}
	});
	return deferred.promise;
}

/*******************************************************************/
/******************************* GET ******************************/
/*******************************************************************/
//get a single city
function getCity(cityIdObj) {
	var deferred = Q.defer();
	CityModel.findOne({_id: new ObjectId(cityIdObj)}, function (err, doc) {
		if (err) {
			deferred.reject(err);
		}
		else {
			deferred.resolve(doc);
		}
	});
	return deferred.promise;
}

//get a city's incidents
function getCityIncidents(cityIdObj) {
	var deferred = Q.defer();
	IncidentModel.find({cityId: cityIdObj}, function (err, doc) {
		if (err) {
			deferred.reject(err);
		}
		else {
			deferred.resolve(doc);
		}
	});
	return deferred.promise;
}

//get a city's incidents
function getCityLocales(cityIdObj) {
	var deferred = Q.defer();
	LocaleModel.find({cityId: cityIdObj}, function (err, doc) {
		if (err) {
			deferred.reject(err);
		}
		else {
			deferred.resolve(doc);
		}
	});
	return deferred.promise;
}

//get a city's incidents
function getCountryCities(countryCode) {
	var deferred = Q.defer();
	CityModel.find({'country.code': countryCode}, function (err, doc) {
		if (err) {
			deferred.reject(err);
		}
		else {
			deferred.resolve(doc);
		}
	});
	return deferred.promise;
}

//get all cities
function getAllCities() {
	var deferred = Q.defer();
	CityModel.find(function (err, docs) {
		if (err) {
			deferred.reject(err);
		}
		else {
			deferred.resolve(docs);
		}
	});
	return deferred.promise;
}

//delete an city
function deleteCity(cityIdObj) {
	var deferred = Q.defer();
	var msg = '';
	return docExists(cityIdObj)
		.then(function (exists) {
			if (exists) {
				CityModel.remove({_id: new ObjectId(cityIdObj)}, function (err, doc) {
					if (err) {
						deferred.reject(err);
					}
					else {
						msg = 'The City has been successfully removed';
						deferred.resolve(msg);
					}
				});
			}
			else {
				msg = 'The City does not exist';
				deferred.resolve(msg);
			}
			return deferred.promise;
		}, function (err) {
			return deferred.reject(err);
		});
}

//check if a document exists
function docExists(cityIdObj) {
	var deferred = Q.defer();
	CityModel.count({_id: new ObjectId(cityIdObj)}, function (err, nbDoc) {
		if (err) {
			deferred.reject(err);
		}
		else {
			deferred.resolve(nbDoc);
		}
	});
	return deferred.promise;
}

module.exports = {
	insertCity: insertCity,
	deleteCity: deleteCity,
	getAllCities: getAllCities,
	getCountryCities: getCountryCities,
	getCityIncidents: getCityIncidents,
	getCityLocales: getCityLocales,
	getCity: getCity,
	updateCity: updateCity
};