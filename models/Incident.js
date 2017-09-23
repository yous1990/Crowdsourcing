var mongoose = require('mongoose');

var IncidentSchema = mongoose.Schema(
	{
		name:String,
		creationDate: {
			type: Date,
			default: new Date()
		},
		position:{
			latitude: String,
			longitude: String
		},
		description: String,
		category: {
			value: String,
			categ: String
		},
		type: {
			type: String
		},
		credibility: {
			thumbsUp: {
				type: Number,
				default: 1
			},
			thumbsDown: {
				type: Number,
				default: 0
			}
		},
		cityId: String
	},
	{
		collection: 'incidents'
	}
);

var IncidentModel = mongoose.model('IncidentModel', IncidentSchema);

module.exports = IncidentModel;

//http://beta.json-generator.com/NyJxmyjmb
//[
//	{
//		'repeat(2, 30)': {
//			"cityId" : "574b0bb949ea862e6b0b52fe",
//			description: '{{lorem(3, "sentences")}}',
//			credibility: {
//				thumbsDown: '{{integer(0, 1000)}}',
//				thumbsUp: '{{integer(1, 1000)}}'
//			},
//			creationDate: '{{moment(this.date(new Date(2014, 0, 1), new Date()))}}',
//
//			name: '{{lorem(1, "sentences")}}',
//
//
//			position : {
//				latitude : '{{floating(34.730032, 34.797032, 8)}}',
//				longitude : '{{floating(10.677284, 10.781937, 8)}}'
//			},
//
//			category : function (tags) {
//
//				function getRandomIntInclusive(min, max) {
//					return Math.floor(Math.random() * (max - min +1)) + min;
//				}
//
//				return [{'value':'Tout', 'categ':'all'}, {'value':'Autre', 'categ':'other'}, {'value':'Accident', 'categ':'accident'}, {'value':'Aggression', 'categ':'aggression'}, {'value':'Corruption', 'categ':'corruption'}, {'value':'Défaut voie publique', 'categ':'public_way_pbm'}, {'value':'Falsification', 'categ':'falsification'}, {'value':'Fraude', 'categ':'fraud'}, {'value':'Harcèlement Sexuel', 'categ':'sexual_harassment'}, {'value':'Incivilité', 'categ':'incivility'}, {'value':'Perdu', 'categ':'lost'}, {'value':'Pot de vin', 'categ':'bribery'}, {'value':'Vol', 'categ':'theft'}][getRandomIntInclusive(0, 12)];
//			}
//		}
//	}
//]