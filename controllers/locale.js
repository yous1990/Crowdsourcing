var LocaleModel = require('../models/Locale');
var Q = require('q');
var ObjectId = require('mongoose').Types.ObjectId;

//create an locale
function insertLocale(myLocale) {
    var deferred = Q.defer();
    var newLocale = new LocaleModel(myLocale);
    newLocale.save(function (err, doc) {
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
//update an locale
function updateLocale(query) {
    var deferred = Q.defer();
    LocaleModel.update({_id: new ObjectId(query.params.id)}, query.body, {upsert: true}, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else {
            var msg = 'The Locale has been successfully updated';
            deferred.resolve(msg);
        }
    });
    return deferred.promise;
}

/*******************************************************************/
/******************************* POST ******************************/
/*******************************************************************/
//get a single locale
function getLocale(localeIdObj) {
    var deferred = Q.defer();
    LocaleModel.findOne({_id: new ObjectId(localeIdObj)}, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(doc);
        }
    });
    return deferred.promise;
}


//get all locales
function getAllLocales() {
    var deferred = Q.defer();
    LocaleModel.find(function (err, docs) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(docs);
        }
    });
    return deferred.promise;
}

//delete an locale
function deleteLocale(localeIdObj) {
    var deferred = Q.defer();
    var msg = '';
    return docExists(localeIdObj)
        .then(function (exists) {
            if (exists) {
                LocaleModel.remove({_id: new ObjectId(localeIdObj)}, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        msg = 'The Locale has been successfully removed';
                        deferred.resolve(msg);
                    }
                });
            }
            else {
                msg = 'The Locale does not exist';
                deferred.resolve(msg);
            }
            return deferred.promise;
        }, function (err) {
            return deferred.reject(err);
        });
}

//check if a document exists
function docExists(localeIdObj) {
    var deferred = Q.defer();
    LocaleModel.count({_id: new ObjectId(localeIdObj)}, function (err, nbDoc) {
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
    insertLocale: insertLocale,
    deleteLocale: deleteLocale,
    getAllLocales: getAllLocales,
    getLocale: getLocale,
    updateLocale: updateLocale
};