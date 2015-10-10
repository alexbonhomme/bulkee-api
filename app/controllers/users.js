'use strict';

module.exports = function(router, Users, fieldsValidator) {

  router.get('/', getAll);
  router.get('/:id', getOne);
  router.post('/:id/alerts/:categoryId/:categoryName', addAlert);
  router.delete('/:id/alerts/:alertId', removeAlert);

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
          return res.status(400).json({message: 'User does\'t exist'});
        }

        if (!user.alerts) {
          user.alerts = [];
        }

        user.alerts.push({
          position: req.body.position,
          distance: parseInt(req.body.distance, 10),
          category: {
            name: req.params.categoryName,
            id: req.params.categoryId
          }
        });

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
          return res.status(400).json({message: 'User does\'t exist'});
        } else if (!user.alerts || !user.alerts.length) {
          return res.status(400).json({message: 'User doesn\'t have alerts'});
        }

        user.alerts.splice(req.params.alertId, 1);

        return user.saveAsync();
      })
      .spread(function(userUpdated) {
        return res.json(userUpdated);
      })
      .catch(function (err) {
        return res.status(400).json(err);
      });
  }
};
