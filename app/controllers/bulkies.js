'use strict';

module.exports = function(router, Bulkies, fieldsValidator) {

  router.get('/', getAll);
  router.get('/:id', getOne);
  router.get('/:distance/nearme', getBulkiesNearMe);
  router.post('/', createOne);
  router.delete('/:id', deleteOne);

  function getAll(req, res) {
    return res.json(Bulkies.findAsync());
  }

  function getOne(req, res) {
    return res.json(Bulkies.findAsync({_id: req.params.id}));
  }

  function createOne(req, res) {
    var requiredFields = ['category','position','author'];
    var error = fieldsValidator.isValidWithMongo(Bulkies, req.body) ||
      fieldsValidator.isValidWithCustoms(requiredFields, req.body);

    if (error) {
      return res.status(400).send(error);
    }
    
    var bulky = new Bulkies(req.body);

    return bulky.saveAsync()
      .spread(function (bulkyCreated) {
        return res.json(bulkyCreated);
      })
      .catch(function (err) {
        return res.status(400).json(err);
      });
  }

  function deleteOne (req, res) {
    return res.json(Bulkies.deleteAsync({_id: req.params.id}));
  }

  function getBulkiesNearMe(req, res) {
    if (!req.query.longitude || !req.query.latitude || !req.params.distance) {
      return res.status(400).json({message: 'Missing longitude and/or lagitude and/or distance parameters'});
    }

    return Bulkies.findAsync({
      position: { 
          $near: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)],
          $maxDistance: parseInt(req.params.distance, 10)
        }
      })
      .then(function (data) {
        return res.json(data);
      });

  }
};