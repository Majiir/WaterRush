define( [ 'modules/communication' ], function ( comm ) {
	$( function () {
		var previous = document.referrer,
			search = window.location.search,
			params = search.substring( 1 ).split( '&' ),
			level = JSON.parse( params[ 0 ].substring( params[ 0 ].indexOf( '=' ) + 1 ) ),
			score = JSON.parse( params[ 1 ].substring( params[ 1 ].indexOf( '=' ) + 1 ) ),
			success = JSON.parse( params[ 2 ].substring( params[ 2 ].indexOf( '=' ) + 1 ) ),
			numFreeze = JSON.parse( params[ 3 ].substring( params[ 3 ].indexOf( '=' ) + 1 ) ),
			numBoom = JSON.parse( params[ 4 ].substring( params[ 4 ].indexOf( '=' ) + 1 ) ),
			numReQ = JSON.parse( params[ 5 ].substring( params[ 5 ].indexOf( '=' ) + 1 ) ),
			playNext = $( '#playNext' ),
			replayLevel = $( '#replayLevel' ),
			home = $( '#home' ),
			powerUP = $( '#powerUp' );


		if ( success ) {
			var win = $( '#win' );
			win.show();
			win.children( 'h3' ).text( score );
		} else {
			var loss = $( '#loss' );
			loss.show();
			loss.children( 'h3' ).text( score );
		}

		playNext.on( 'click', function () {
			window.location = previous.substr( 0 , previous.lastIndexOf( '.' ) - 1 ) + ( ++level % 4 ) + '.html';
		} );

		replayLevel.on( 'click', function () {
			window.location = previous;
		} );

		home.on( 'click', function () {
			window.open('home.html', '_self', false);
		} );

		powerUP.on( 'click', function () {
			window.open('store.html', '_self', false);
		} );

		comm.send(
			{
				levelReport : {
					addLevelProgress : {
						levelId : level,
						score : score,
						win : success,
						freeze : numFreeze,
						boom : numBoom,
						reQ : numReQ
					}
				}
			},
			function ( res ) {} );
	} );

	return {};
} );