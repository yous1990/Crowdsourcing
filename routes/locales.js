var express = require('express');
var router = express.Router();
var localeController = require('../controllers/locale');

/*******************************************************************/
/******************************* GET ******************************/
/*******************************************************************/

// define the get route of a specific locale
router.get('/:id', function (req, res) {
    localeController.getLocale(req.params.id)
                  .then(function (doc) {
                      res.send(doc);
                  }, function (err) {
                      res.send(err);
                  });
});

// define the get route of all cities
router.get('/', function (req, res) {
        localeController.getAllLocales()
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
    localeController.updateLocale(req)
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
    localeController.insertLocale(req.body)
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
    localeController.deleteLocale(req.params.id)
                  .then(function (msg) {
                      res.send(msg);
                  }, function (err) {
                      res.send(err);
                  });
});


module.exports = {
    router: router
};