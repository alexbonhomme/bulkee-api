var app = require('../../server.js').app;
var mongoose = require('mongoose');
var User = mongoose.model('Users');
var _ = require('lodash');
var Promise = require('bluebird');
Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);
app.listen(4040);

exports.initUser = function(userData) {
	var userToCreate = new User(userData.newUser);

	return userToCreate.saveAsync()
		.then(function(data) {
			return data;
		})
		.catch(function(err) {
			return err;
		});
};

exports.removeUser = function(userData) {
	return User.removeAsync({_id: userData.newUser._id})
		.then(function(data) {
			return User.removeAsync({email : userData.userSignup.email})
		})
		.then(function(data) {
			return data;
		})
		.catch(function(err) {
			return err;
		});
};

var createArrayOfButtons = function createArrayOfButtons(buttonsData) {
	var buttonsId = _.map(buttonsData, function(buttonId) {
		return {_id : buttonId};
	});
	return buttonsId;
};

exports.initButtons = function(buttonsData) {	
	var buttonsId = createArrayOfButtons(buttonsData);

	return Button.createAsync(buttonsId)
		.then(function(buttonsCreated) {
			return buttonsCreated;
		})
		.catch(function(err) {
			return err;
		});
};

exports.initButton = function(buttonData) {

	return Button.createAsync(buttonData)
		.then(function(buttonCreated) {
			return buttonCreated
		})
		.catch(function(err) {
			return err;
		});
};

exports.removeButtons = function(buttonsData) {
	//var buttonsId = createArrayOfButtons(buttonsData);

	return Button.removeAsync()
		.then(function(buttonsDeleted) {
			return buttonsDeleted
		})
		.catch(function(err) {
			return err;
		});
};
