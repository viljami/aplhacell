function Level(game) {

	this.bodies = [];
	this.r = 10.0;
	
	//Border
	for (var a = 0; a < Math.PI*2; a += Math.PI/40) {
		var x = game.box2dCenter.x + Math.sin(a) * this.r;
		var y = game.box2dCenter.y + Math.cos(a) * this.r;
		var r = 0.4 + Math.random()*2;
		var body = box2d.create.circle({r:r, x:x, y:y, static:true});
		body.r = r;
		body.ground = true;
		body.name = "ground";
		this.bodies.push(body);
	}

	//Inner
	for (var a = 0; a < Math.PI*2; a += Math.PI/10) {
		var x = game.box2dCenter.x + Math.sin(a)*1;
		var y = game.box2dCenter.y + Math.cos(a)*1;
		var r = 0.5 + Math.random();
		var body = box2d.create.circle({r:r, x:x, y:y, static:true});
		body.r = r;
		body.ground = true;
		body.name = "ground";
		this.bodies.push(body);
	}

	//Mid
	for (var a = 0; a < 9; a ++) {
		var angle = Math.random()*Math.PI*2;
		var depth = 2 + (this.r-2) * Math.random();

		var x = game.box2dCenter.x + Math.sin(angle)*depth;
		var y = game.box2dCenter.y + Math.cos(angle)*depth;
		var r = 0.6 + Math.random();

		if (depth + r > 6.7 || depth - r < 3) {
			a--;
			continue;
		}

		var body = box2d.create.circle({r:r, x:x, y:y, static:true});
		body.r = r;
		body.ground = true;
		body.name = "ground2";
		this.bodies.push(body);
	}
}

Level.prototype.draw = function(context) {
	if ( this.bufferCanvas == null ) {
		this.drawBackground();
	} 
	//this.drawBackground(context);
	context.drawImage( this.bufferCanvas, 0, -100 );
}

Level.prototype.bufferCanvas = null;
Level.prototype.drawBackground = function () {
	this.bufferCanvas = document.createElement('canvas');
	this.bufferCanvas.width = 1024;
	this.bufferCanvas.height = 1024;
	var context = this.bufferCanvas.getContext('2d');
	
	var img = $( '#wallTile' ).get( 0 );
	var image = new Image();
	image.src = 'img/walls_tile.png';
	var onload = function () {
		var pattern = context.createPattern( image, 'repeat');
		context.fillStyle = pattern;
		
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.shadowBlur = 2;
		context.shadowColor = "rgba(99, 55, 11, 0.3)";
		context.translate(0, 100);
		
		for (var i = 0; i < this.bodies.length; i++) {
			var body = this.bodies[i];
			var pos = body.GetPosition();
			
			context.arc( pos.x * box2d.scale, pos.y * box2d.scale, body.r  * box2d.scale, 0, 2 * Math.PI, false );
			context.fill();
		}
	};
	image.onload = onload.bind(this);
}
