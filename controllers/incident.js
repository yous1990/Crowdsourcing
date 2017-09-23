var IncidentModel = require('../models/Incident');
var Q = require('q');
var ObjectId = require('mongoose').Types.ObjectId;

//create an incident
function insertIncident(myIncident) {
    var deferred = Q.defer();
    var newIncident = new IncidentModel(myIncident);
    newIncident.save(function (err, doc) {
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
//update an incident
function updateIncident(query) {
    var deferred = Q.defer();
    IncidentModel.update({_id: new ObjectId(query.params.id)}, query.body, {upsert: true}, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else {
            var msg = 'The Incident has been successfully updated';
            deferred.resolve(msg);
        }
    });
    return deferred.promise;
}
//appreciate an incident
function appreciateIncident(query) {
    var deferred = Q.defer();
    IncidentModel.update({_id: new ObjectId(query.params.id)}, { $inc: {'credibility.thumbsUp': 1 } }, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else {
            var msg = 'The Incident has been successfully updated';
            deferred.resolve(msg);
        }
    });
    return deferred.promise;
}
//appreciate an incident
function depreciateIncident(query) {
    var deferred = Q.defer();
    IncidentModel.update({_id: new ObjectId(query.params.id)}, { $inc: {'credibility.thumbsDown': 1 } }, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else {
            var msg = 'The Incident has been successfully updated';
            deferred.resolve(msg);
        }
    });
    return deferred.promise;
}

/*******************************************************************/
/******************************* POST ******************************/
/*******************************************************************/
//get a single incident
function getIncident(incidentIdObj) {
    var deferred = Q.defer();
    IncidentModel.findOne({_id: new ObjectId(incidentIdObj)}, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(doc);
        }
    });
    return deferred.promise;
}


//get all incidents
function getAllIncidents() {
    var deferred = Q.defer();
    IncidentModel.find(function (err, docs) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(docs);
        }
    });
    return deferred.promise;
}

//delete an incident
function deleteIncident(incidentIdObj) {
    var deferred = Q.defer();
    var msg = '';
    return docExists(incidentIdObj)
        .then(function (exists) {
            if (exists) {
                IncidentModel.remove({_id: new ObjectId(incidentIdObj)}, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        msg = 'The Incident has been successfully removed';
                        deferred.resolve(msg);
                    }
                });
            }
            else {
                msg = 'The Incident does not exist';
                deferred.resolve(msg);
            }
            return deferred.promise;
        }, function (err) {
            return deferred.reject(err);
        });
}

//check if a document exists
function docExists(incidentIdObj) {
    var deferred = Q.defer();
    IncidentModel.count({_id: new ObjectId(incidentIdObj)}, function (err, nbDoc) {
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
    insertIncident: insertIncident,
    deleteIncident: deleteIncident,
    getAllIncidents: getAllIncidents,
    getIncident: getIncident,
    updateIncident: updateIncident,
    appreciateIncident: appreciateIncident,
    depreciateIncident: depreciateIncident
};