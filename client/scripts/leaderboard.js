/**
 * This is the entry point for the application. Should probably call Login or something
 */
define([ 'knockout', 'modules/communication' ], function(ko, communication) {
	function LeaderboardViewModel() {
		var self = this;

		self.globalEntries = ko.observableArray();
		self.friendEntries = ko.observableArray();

		self.showGlobal = ko.observable(true);

		communication.send({
			'leaderBoard': {
				'getGlobalHighScore': {},
				'getFriendHighScore': {}
			}
		}, function (result) {
			var list = result.leaderBoard.getGlobalHighScore;
			for (friend in list) {
				self.globalEntries.push(new EntryViewModel(friend, list[friend]));
			}

			list = result.leaderBoard.getFriendHighScore;
			for (friend in list) {
				self.friendEntries.push(new EntryViewModel(friend, list[friend]));
			}
			self.globalEntries.sort(function(left, right) {
				return right.score - left.score;
			});
		});	
	}

	function EntryViewModel(name, score) {
		var self = this;

		this.name = name;
		this.score = score;
	}

	ko.applyBindings(new LeaderboardViewModel());
});