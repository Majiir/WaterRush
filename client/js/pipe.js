function makePipe (IMAGES, freezePU, pipeId) {
	var id;
	if (pipeId) {
		// if this is the first pipe, its id may be pre-determined.
		id = pipeId;
	} else {
		id = Math.floor( Math.random() * 16 ) % 7;
	}

	var pipe = $('<div class="pipe"></div>')
		.draggable({ revert: 'invalid' })
		.attr('data-pipeType', id)
		.css({ 'background-image': 'url("images/' + IMAGES[id].base + '")' });

	if ( freezePU.isFreezing() ) { //If the freeze power is used, the pipes are hidden
		pipe.css( { 'opacity': 0 } );
	}

	$( '#queue' ).prepend( pipe );
	return pipe;
}