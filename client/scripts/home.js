/**
 * This is the entry point for the application. Should probably call Login or something
 */
define([ 'knockout', 'modules/communication' ], function(ko, communication) {
	function HomeViewModel() {
		var self = this;

		self.coins = ko.observable(0);
		self.lives = ko.observable(0);
		self.notifications = ko.observable(0);

		communication.send({
			'inventory': {
				'getCoins': {},
				'getLives': {}
			},
			'notifications': {
				'getNotifications': {}
			}
		}, function (result) {
			self.coins(result.inventory.getCoins);
			self.lives(result.inventory.getLives);
			self.notifications(result.notifications.getNotifications.length);
		});
	
	}

	ko.applyBindings(new HomeViewModel());
});
