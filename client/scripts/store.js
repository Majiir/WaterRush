/**
 * This is the entry point for the application. Should probably call Login or something
 */
define([ 'knockout', 'modules/communication' ], function(ko, communication) {
	function StoreViewModel() {
		var self = this;

		self.entries = ko.observableArray();

		communication.send({
			'storeInfo': {
				'getState': {}
			}
		}, function (result) {
			var list = result.storeInfo.getState;
			for (entry in list) {
				self.entries.push(new EntryViewModel(list[entry].name, list[entry].price));
			}
		});
	
	}

	function EntryViewModel(name, price) {
		var self = this;

		this.name = name;
		this.price = price;

		this.buy = function(){
			communication.send({
				'spendCoins': {
					'spendCoins': {
						item: self.name,
						quantity: 1
					}
				}
			}, function (result) {
			});
		};
	}

	ko.applyBindings(new StoreViewModel());
});
