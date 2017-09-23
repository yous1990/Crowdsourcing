var mongoose = require('mongoose');

var LocaleSchema = mongoose.Schema(
    {
        name: String,
        position:{
            latitude: String,
            longitude: String
        },
        cityId: String,
        tel: String,
        category: {
            value: String,
            type: {
                type: String
            }
        }
    },
    {
        collection: 'locales'
    }
);

var LocaleModel = mongoose.model('LocaleModel', LocaleSchema);

module.exports = LocaleModel;