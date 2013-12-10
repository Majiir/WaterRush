
//from http://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs

var databaseUrl =  "abrigham@127.0.0.1/test"
var collections = ["scores","userInventory","notifications"]

var db = require('mongojs').connect(databaseUrl, collections);

exports.getCoins = function(userId, callback) {
	/* TODO: comment */
	db.userInventory.findOne({userid: userId},
		function(err, docs){
			if (err) { callback(err); } else { callback(null, docs.coins); }
		}

	);
};

exports.getItemCount = function(userId, itemId, callback) {
	/* TODO: comment */

	//might need to change to db.collections('userInventory').find({userid: userId})
	db.userInventory.findOne({userid: userId},function(err,docs){
		if (err) { 
			callback(err);
		} else {
			callback(null, docs.items[itemId].quantity);
		}
	});
};

exports.getScore = function(userId, levelId, callback) {
	/* TODO: comment */
	levelId = parseInt(levelId);
	db.scores.findOne({userid: userId},function(err,docs){ if (err) { callback(err); } else { callback(null, docs.scores[levelId]); }});};

exports.getPlayerScores = function(userId, callback) {
	/* TODO: comment */
	db.scores.findOne({userid: userId},function(err,docs){ if (err) { callback(err); } else { callback(null, docs.scores); }});
};

exports.getNotifications = function(userId, callback) {
	/* TODO: comment */
	db.notifications.findOne({userid: userId},function(err,docs){if (err) { callback(err); } else { callback(null, docs.notifications); }});
};

exports.getLives = function(userId, callback){
	/* TODO: comment */
	db.userInventory.findOne({userid: userId},
		function(err, docs){
			if (err) { callback(err); } else { callback(null, docs.lives); }
		}

	);
}

exports.getLevelScores = function(levelId, callback){
	/* TODO: comment */
	levelId = parseInt(levelId);

	db.scores.find({}).toArray(
		function (err, docs) {
			if (err) {
				callback(err);
			}
			var ret = {};
			for (var i = 0; i < docs.length; i++){
				ret[docs[i].userid]= docs[i].scores[levelId];
			}
			callback(null, ret);
		}
	);
}