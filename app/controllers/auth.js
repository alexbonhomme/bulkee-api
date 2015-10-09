'use strict';
var jwt = require('jwt-simple');
var fieldsValidator = require('fieldsValidator');

module.exports = function(Users, _, app) {

  app.post('/login', login);
  app.post('/signup', signup);


  function signup(req, res) {

    var error = fieldsValidator.isValidWithMongo(Users, req.body, false, ['hashed_password', 'salt']);

    if (error || !req.body.password) {
      return res.status(400).send(error || 'Password is required');
    }

    var dbUserObj = fieldsValidator.createWithMongo(Users, req.body, ['password'], ['hashed_password', 'salt']);

    var user = new Users(dbUserObj);
    user.saveAsync()
      .spread(function(user) {
        return res.status(200).json(user);
      })
      .catch(function(err) {
        var error = {
          code: err.cause.code,
          message: (err.cause.code === 11000 ? 'Email already exists' : 'Error')
        };
        return res.status(400).json(error);
      });
  }

  function login(req, res) {
    var error = fieldsValidator.isValidWithMongo(Users, req.body, false, ['hashed_password', 'salt']);

    if (error) {
      return res.status(401).send(error);
    }

    if (!req.body.password) {
     return res.status(401).send('Password is required');
    }

    validate(req.body.email, req.body.password).then(function(user) {
      res.status(200).json(user);
    }, function() {
      res.status(401).send('Bad password');
    });
  }

  function validate(email, password) {
    return Users.validateAsync({ email: email })
      .then(function(user) {
        if (user && user.hashed_password === user.encryptPassword(password)) {
          var objectToReturn = JSON.parse(JSON.stringify(user));
          objectToReturn.token = genToken();

          return _.omit(objectToReturn, '__v', 'hashed_password', 'salt');
        } else {
          throw new Error('Can\'t authenticate');
        }
      });
  }
};

function genToken() {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({ exp: expires }, require('../../config/secret')());

  return {
    token: token,
    expires: expires
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

