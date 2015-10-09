var supertest = require('supertest');
var _ = require('lodash');
var app = require('../../server.js').app;
var expect = require('chai').expect;
var usersData = require('../datas/users.json');
var testUtils = require('../config/tests-utils.js');

describe('Users testing suite : ', function() {
	
	/**********************************************/
  /*               INITIALISATION               */
  /**********************************************/

  beforeEach(function(done) {
      this.timeout(20000);
      testUtils.initUser(usersData)
      	.then(function(data) {
      		done(null, data);
      	})
      	.catch(function(err) {
      		done(err);
      	});
  });

	describe('Post : ', function() {
		it('/login denied', function(done) {
			var dataToSend = {};
    	supertest(app).post('/login')
    		.send(dataToSend)
				.expect(401)
				.end(function(err, res) {
					if (err) done(err);
          expect(res.text).to.equal('Params is empty');
          done();
				});
    });

    it('/login denied with not all credentials', function(done) {
			var dataToSend = {
				email : 'bnj'
			};
    	supertest(app).post('/login')
    		.send(dataToSend)
				.expect(401)
				.end(done);
    });

    it('/login accepted', function(done) {
			var dataToSend = {
				email : 'bnj',
				password : 'xxx'
			};
    	supertest(app).post('/login')
    		.send(dataToSend)
				.expect(401)
				.end(function(err, res) {
					if (err) done(err);
					expect(res.text).to.equal('Bad password');
					done();
				});
    });

    it('/login accepted', function(done) {
			var dataToSend = {
				email : 'bnj',
				password : 'bnj'
			};
    	supertest(app).post('/login')
    		.send(dataToSend)
				.expect(200)
				.end(function(err, res) {
					if (err) done(err);
					expect(res.body.email).to.equal(usersData.userLogin.email);
					expect(res.body.firstName).to.equal(usersData.userLogin.firstName);
					done();
				});
    });

    it('/signup with wrong parameters', function(done) {
    	supertest(app).post('/signup')
    		.send({})
    		.expect(400)
    		.end(done);
    });

    it('/login with email and password', function(done) {
    	supertest(app).post('/signup')
    		.send(usersData.userSignup)
    		.expect(200)
    		.end(function(err, res) {
    			if (err) done(err);
    			expect(res.body.email).to.equal(usersData.userSignup.email);
    			done();
    		});
    });

	});

	/**********************************************/
  /*               Final 					              */
  /**********************************************/

  afterEach(function(done) {
      this.timeout(20000);
      testUtils.removeUser(usersData)
      	.then(function(data) {
      		done(null, data);
      	})
      	.catch(function(err) {
      		done(err);
      	});
  });
});
