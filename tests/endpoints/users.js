var supertest = require('supertest');
var _ = require('lodash');
var app = require('../../server.js').app;
var expect = require('chai').expect;
var apiVersion = require('../config/config.js').apiVersion;
var usersData = require('../datas/users.json');
var testUtils = require('../config/tests-utils.js');
var Promise = require('bluebird');
var token = '';

describe('Users testing suite : ', function() {
	
	/**********************************************/
  /*               INITIALISATION               */
  /**********************************************/

  beforeEach(function(done) {
      this.timeout(20000);
      testUtils.initUser(usersData)
      	.then(function(data) {
          return (supertest(app).post('/login')
            .send({
              email : usersData.login.email,
              password : usersData.login.password
            })
            .endAsync());
        })
        .then(function(responseLogin) {
          token = responseLogin.body.token.token;
          return testUtils.initButtons(usersData.newUser.buttons);
        })
        .then(function(buttonsCreated) {
          done();
        })
      	.catch(function(err) {
      		done(err);
      	});
  });

	describe('Post : ', function() {
		


	});


  describe('Get : ', function() {



  });

	/**********************************************/
  /*               Final 					              */
  /**********************************************/

  afterEach(function(done) {
      this.timeout(20000);
      testUtils.removeUser(usersData)
      	.then(function(data) {
          return testUtils.removeButtons(usersData.newUser.buttons);
      	})
        .then(function(buttonsRemoved) {
          done(null, buttonsRemoved);
        })
      	.catch(function(err) {
      		done(err);
      	});
  });
});
