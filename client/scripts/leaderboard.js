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
				'getScores': {},
				'getFriendScores': {}
			}
		}, function (result) {
			var list = result.leaderBoard.getScores;
			for (friend in list) {
				self.globalEntries.push(new EntryViewModel(friend, list[friend]));
			}

			list = result.leaderBoard.getFriendScores;
			for (friend in list) {
				self.friendEntries.push(new EntryViewModel(friend, list[friend]));
			}
		});	
	}

	function EntryViewModel(name, score) {
		var self = this;

		this.name = name;
		this.score = score;
	}

	ko.applyBindings(new LeaderboardViewModel());
});