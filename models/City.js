var mongoose = require('mongoose');

var CitySchema = mongoose.Schema(
	{
		name: String,
		position:{
			latitude: String,
			longitude: String
		},
		zoomLevel: Number,
		country: {},
		continent: {
			id: String,
			value: String
		}
	},
	{
		collection: 'cities'
	}
);

var CityModel = mongoose.model('CityModel', CitySchema);

module.exports = CityModel;