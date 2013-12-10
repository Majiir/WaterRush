/**
 * This is the entry point for the application. Should probably call Login or something
 */
define([ 'knockout', 'modules/communication' ], function(ko, communication) {
	function NewsfeedViewModel() {
		var self = this;

		self.entries = ko.observableArray();

		communication.send({
			'notifications': {
				'getNotifications': {}
			}
		}, function (result) {
			var list = result.notifications.getNotifications;
			for (notify in list) {
				self.entries.push(new EntryViewModel(list[notify].notification));
			}
		});
	
	}

	function EntryViewModel(notification) {
		var self = this;

		this.notification = notification;
	}

	ko.applyBindings(new NewsfeedViewModel());
});