var score = {
	wormsKilled: 0,
	boilsKilled: 0,
	startTime: null,
	endTime: null,
}

function ScoreDisplay() {
	this.show = function () {
		
		var timeBonus = ( score.endTime.getTime() - score.startTime.getTime() ) * 100;
		console.log( timeBonus, score.endTime.getTime(), score.startTime.getTime() );
		if( !this.dialog ) {
			var fullBonus = score.wormsKilled * 10000 + timeBonus;
			this.dialog = $('<div id="scoreDialog"><h1>Scores</h1><ul><li> Worms killed: ' + 
				score.wormsKilled + '</li><li>Time bonus: ' + timeBonus + '</li><li>Total: ' + fullBonus  + ' </li></ul><h2>Press anykey to replay!</h2></div>').appendTo('#canvasContainer');
		}
		
		$(this.dialog).keypress( this.hide );
	}

	this.hide = function () {
		$( '#canvasContainer' ).remove( this.dialog );

		this.reset();
		
		// TODO: Replay
	}
	this.hide = this.hide.bind( this );
	
	this.reset = function ()  {
		this.dialog = null;
		this.startTime = null;
		this.endTime = null;
		this.wormsKilled = 0;
	}
}
