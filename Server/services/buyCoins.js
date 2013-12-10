var drs = require('../drs.js');
var dtm = require('../dtm.js');
var inventory = require ('./inventory.js');

exports.endpoints = {
	'buyCoins': function (req, user, done) {
		/**
		 * Adds the specified number of coins to the user
		 * req: the number of coins to be purchased
		 */
		dtm.start().coins(user.id, req).commit(done);
	},
	'buyFakeCoins': function (req, user, done) {
		/**
		 * Adds the specified number of coins to the user
		 * req: the number of coins to be purchased
		 */
		console.log("try buying coins: " + req);
		inventory.addFakeCoins(parseInt(req), done);
	},

};