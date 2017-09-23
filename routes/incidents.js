var express = require('express');
var router = express.Router();
var incidentController = require('../controllers/incident');
var io;

function initSocket(server) {
    io = require('socket.io')(server);
}

/*******************************************************************/
/******************************* GET ******************************/
/*******************************************************************/

// define the get route of a specific incident
router.get('/:id', function (req, res) {
    incidentController.getIncident(req.params.id)
                      .then(function (doc) {
                          res.send(doc);
                      }, function (err) {
                          res.send(err);
                      });
});

// define the get route of all incidents
router.get('/', function (req, res) {
    incidentController.getAllIncidents()
                      .then(function (docs) {
                          res.send(docs);
                      }, function (err) {
                          res.send(err);
                      });
});

/*******************************************************************/
/******************************* UPDATE ****************************/
/*******************************************************************/
// define the update route
router.put('/:id', function (req, res) {
    incidentController.updateIncident(req)
                      .then(function (msg) {
                          res.send(msg);
                      }, function (err) {
                          res.send(err);
                      });
});

//define appreciation update route
router.put('/:id/appreciate', function (req, res) {
    incidentController.appreciateIncident(req)
                      .then(function (msg) {
                          res.send(msg);
                          io.emit('incidentCredibilityChanged', msg);
                      }, function (err) {
                          res.send(err);
                      });
});

//define depreciation update route
router.put('/:id/depreciate', function (req, res) {
    incidentController.depreciateIncident(req)
                      .then(function (msg) {
                          res.send(msg);
                          io.emit('incidentCredibilityChanged', msg);
                      }, function (err) {
                          res.send(err);
                      });
});

/*******************************************************************/
/******************************* POST ******************************/
/*******************************************************************/
// define the post route
router.post('/', function (req, res) {
    incidentController.insertIncident(req.body)
                      .then(function (doc) {
                          res.send(doc._id);
                          io.emit('newIncidentHappened', doc);
                      }, function (err) {
                          res.send(err);
                      });
});

/*******************************************************************/
/******************************* DELETE ******************************/
/*******************************************************************/
// define the delete route
router.delete('/:id', function (req, res) {
    incidentController.deleteIncident(req.params.id)
                      .then(function (msg) {
                          res.send(msg);
                      }, function (err) {
                          res.send(err);
                      });
});


module.exports = {
    router: router,
    initSocket: initSocket
};