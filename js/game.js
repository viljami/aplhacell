var game;
var worm;

function Game() {	
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

	var vector = this.getUnityGravityVector(this.player.GetWorldCenter());
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
	worm.update();
}

Game.prototype.draw = function() {
	this.context.save();
	this.context.translate(this.canvas.width/2, this.canvas.height/2);

	this.context.rotate(this.worldAngle);
	this.context.translate(-this.canvas.width/2, -this.canvas.height/2);

	box2d.world.DrawDebugData();
	worm.draw( box2d.context);

	this.level.draw(this.context);
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
