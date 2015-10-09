'use strict';

module.exports = function(router, Users) {

  router.get('/', getAll);
  router.get('/:id', getOne);

  function getAll(req, res) {
    res.json(Users.findAsync());
  }

  function getOne(req, res) {
    res.json(Users.findAsync({_id: req.params.id}));
  }
};
