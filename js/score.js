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
			this.dialog = $('<div id="scoreDialog"><h1>Scores</h1><table style="margin: 0px auto;"><tr><td style="width:100px;"> Worms killed: </td><td style="width:100px;">' + 
				score.wormsKilled + '</td></tr><tr><td>Time bonus: </td><td>' + timeBonus + '</td></tr><tr><td>Total: </td><td>' + fullBonus  + '</td></tr></table><h2>Press anykey to replay!</h2></div>').appendTo('#canvasContainer');
		}
		
		$(this.dialog).keypress( this.hide );
	}

	this.hide = function () {
		$( this.dialog ).remove();

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
