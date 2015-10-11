'use strict';

module.exports = function(router, Users, fieldsValidator) {

  router.get('/', getAll);
  router.get('/:id', getOne);
  router.post('/:id/alerts', addAlert);
  router.post('/:id/devicetoken/:devicetoken', addDeviceToken);
  router.delete('/:id/alerts', removeAlert);

  function getAll(req, res) {
    return res.json(Users.findAsync());
  }

  function getOne(req, res) {
    return res.json(Users.findAsync({_id: req.params.id}));
  }

  function addAlert(req, res) {
    var requiredFields = ['position', 'distance'];
    var error = fieldsValidator.isValidWithCustoms(requiredFields, req.body);

    if (error) {
      return res.status(400).json(error);
    }

    Users.findAsync({_id: req.params.id})
      .spread(function (user) {
        if (!user) {
          return res.status(400).json({message: 'User doesn\'t exist'});
        }

        user.alerts = {
          position: req.body.position,
          distance: parseInt(req.body.distance, 10),
          categories: req.body.categories
        };

        return user.saveAsync();
      })
      .spread(function (userUpdated) {
        return res.json(userUpdated);
      })
      .catch(function (err) {
        return res.status(400).json(err);
      });
  }

  function removeAlert(req, res) {
    Users.findAsync({_id: req.params.id})
      .spread(function (user) {
        if (!user) {
          return res.status(400).json({message: 'User doesn\'t exist'});
        } else if (!user.alerts) {
          return res.status(400).json({message: 'User doesn\'t have alerts'});
        }

        user.alerts.categories = {};

        return user.saveAsync();
      })
      .spread(function(userUpdated) {
        return res.json(userUpdated);
      })
      .catch(function (err) {
        return res.status(400).json(err);
      });
  }

  function addDeviceToken(req, res) {
    Users.findAsync({_id: req.params.id})
      .spread(function (user) {
        if (!user) {
          return res.status(400).json({message: 'User doesn\'t exist'});
        }

        user.device_token = req.params.devicetoken;

        return user.saveAsync();
      })
      .then(function (userUpdated) {
        return res.json(userUpdated);
      })
      .catch(function (err) {
        return res.status(400).json(err);
      });
  }
};
