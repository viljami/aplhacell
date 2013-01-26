var worm; //can be removed

function Game() {
	game = this;	
	this.width = $('canvas').css('width');
	this.height = $('canvas').css('height');
	this.center = new b2Vec2( parseInt( this.width ) / 2, parseInt( this.height ) / 2 );
	this.box2dCenter = new b2Vec2( parseInt( this.width ) / ( box2d.scale * 2), parseInt( this.height ) / ( box2d.scale * 2));
	console.log( this.width, this.height, this.center, this.box2dCenter);
	
	box2d.init();

	worm = new Worm();

	this.canvas = $( "#gamecanvas" ).get(0);
	this.context = this.canvas.getContext( "2d" );
	this.player = new Player();
	this.level = new Level( this );
	
	this.controls = new Controls();

	this.worms = [];

	for (var i = 0; i < 5; i++) {
		var angle = Math.PI + Math.random()*Math.PI;
		
		var params = {
			x: this.box2dCenter.x + (this.level.r-1) * Math.sin(angle),
			y: this.box2dCenter.y + (this.level.r-1) * Math.cos(angle),
			r: 0.5,
			a: (Math.random() * 100)
		};
		var newWorm = new Worm(params);
		this.worms.push(newWorm);
	}

	this.gameTime = 0;
	this.worldAngle = -1;
}

Game.prototype.run = function(deltaTime) {
	this.gameTime += deltaTime;
	this.handleControls(); 
	
	this.update();
	
	//this.context.fillStyle = "red";
	box2d.world.Step( deltaTime, 3);
	box2d.world.ClearForces();

	this.gravity();

	var vector = this.getUnityGravityVector(this.player.body.GetWorldCenter());
	var targetAngle = Math.atan2(vector.x, vector.y);
	if (this.worldAngle < 0)
		this.worldAngle = targetAngle;
	else {

		if (Math.abs(this.worldAngle - targetAngle) > Math.PI) {
			if (this.worldAngle < targetAngle) {
				targetAngle -= Math.PI*2;
			}
			else
				targetAngle += Math.PI*2;
		}
		var difference = Math.abs(this.worldAngle - targetAngle);
		if (difference > 0)
			this.worldAngle += (targetAngle - this.worldAngle)*Math.pow(deltaTime, 0.8);

		this.worldAngle = (this.worldAngle + Math.PI*2) % (Math.PI*2);
	}

	this.draw();
	
}

Game.prototype.update = function() {
	if( worm ) {
		worm.update();
	}
	for (var i = this.worms.length - 1; i >= 0; i--) {
		this.worms[i].update();
		if (this.worms[i].removeMe) {
			this.worms[i].remove();
			this.worms.splice(i, 1);
		}
	}

	if( !worm || !worm.removeMe ) {
		
	} else {
		worm.remove();
		worm = null;
	}
}

Game.prototype.draw = function() {
	var scale = 2;

	//this.context.fillStyle = "black";
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	this.context.save();
	this.context.translate(this.canvas.width/2, 0);

	this.context.rotate(this.worldAngle);
	this.context.scale(scale, scale);
	this.context.translate(-this.canvas.width/2, -this.canvas.height/2);

	box2d.world.DrawDebugData();
	if(worm != null )worm.draw( box2d.context);

	this.level.draw(this.context);
	for (var i = 0; i < this.worms.length; i++)
		this.worms[i].draw(box2d.context);

	this.player.draw(box2d.context);

	this.context.restore();
}

Game.prototype.gravity = function () {
	var pos = this.player.body.GetWorldCenter();
	var playerDistanceFromCenter = this.level.r + 10 - ( pos.x * pos.x + pos.y * pos.y );
	
	//console.log( playerDistanceFromCenter, this.level.r)
	
	// Check that will the peaces be pushed through the level ground
	if( playerDistanceFromCenter <= this.level.r - 2 ) {
		
		var center = this.box2dCenter;
		var force = pos.Copy();
		force.Subtract(center);
		force.Normalize();
		force.Multiply(10);

		this.player.body.ApplyForce(force, this.player.body.GetWorldCenter());		
	}
}

Game.prototype.getUnityGravityVector = function (pos) {
	var center = this.box2dCenter;
	var force = pos.Copy();
	force.Subtract(center);
	force.Normalize();
	return force;
}

Game.prototype.handleControls = function () {
	if( this.controls.keys.up.isDown ) {
		var pos = this.player.body.GetWorldCenter();
		var force = this.getUnityGravityVector(pos);
		force.Multiply(-15 -20 * Math.sin(this.gameTime*5));
		this.player.body.ApplyForce(force, pos);
	}
	if( this.controls.keys.down.isDown ) {
		
	}
	if( this.controls.keys.left.isDown ) {
		var pos = this.player.body.GetWorldCenter();
		var force = this.getUnityGravityVector(pos);
		force.CrossVF(-30);
		this.player.body.ApplyForce(force, pos);
	}
	if( this.controls.keys.right.isDown ) {
		var pos = this.player.body.GetWorldCenter();
		var force = this.getUnityGravityVector(pos);
		force.CrossVF(30);
		this.player.body.ApplyForce(force, pos);
	}
	if( this.controls.keys.space.isDown ) {
		
	}
}
