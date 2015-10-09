'use strict';
var config = require('../../config/config-loader').load();
var mandrill = require('mandrill-api/mandrill');
var mandrillClient = new mandrill.Mandrill(config.apiKey.mandrillKey);


exports.sendTemplate = function (opts, onsuccess, onerror) {
  mandrillClient.messages.sendTemplate(opts, onsuccess, function (e) {
    console.error('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    return onerror && onerror(e);
  });
};

exports.send = function (opts, onsuccess, onerror) {
  mandrillClient.messages.send(opts, onsuccess, function (e) {
    console.error('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    return onerror && onerror(e);
  });
};
