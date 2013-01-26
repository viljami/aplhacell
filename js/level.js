function Level(game) {

	this.bodies = [];
	this.r = 10.0;
	
	//Border
	for (var a = 0; a < Math.PI*2; a += Math.PI/40) {
		var x = game.box2dCenter.x + Math.sin(a) * this.r;
		var y = game.box2dCenter.y + Math.cos(a) * this.r;
		var r = 1 + Math.random();
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
}

Level.prototype.draw = function(context) {

	/*
	context.fillStyle = "red";
	for (var i = 0; i < this.bodies.length; i++) {
		var body = this.bodies[i];
		var x = body.m_xf.position.x;
		var y = body.m_xf.position.y;
		context.fillRect(x-body.r, y-body.r, body.r*2, body.r*2);
	}
	*/

	for (var i = 0; i < this.bodies.length; i++) {
		var body = this.bodies[i];
		//body.m_linearVelocity.x = 1;
	}

}
