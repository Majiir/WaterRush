define([ '$', 'Backbone', '_', 'gameLevel', 'store', 'newsfeed', 'leaderboard' ], function() {
	var Login = Backbone.Model.extend( {
		initialize : function() {

		}
	} );

	return {
		login : Login
	};
} );
