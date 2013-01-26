var game;
var worm;
var boil;

function Game() {	
	this.width = $('canvas').css('width');
	this.height = $('canvas').css('height');
	this.center = new b2Vec2( parseInt( this.width ) / 2, parseInt( this.height ) / 2 );
	this.box2dCenter = new b2Vec2( parseInt( this.width ) / ( box2d.scale * 2), parseInt( this.height ) / ( box2d.scale * 2));
	
	box2d.init();
	
	worm = new Worm();
	boil = new Boil();
	
	this.canvas = $( "#gamecanvas" ).get(0);
	this.context = this.canvas.getContext( "2d" );
	this.player = box2d.create.box({ w:1, h:1, x:15, y:6 });
	this.level = new Level( this );
	
	this.controls = new Controls();
}

Game.prototype.run = function(deltaTime) {
	
	this.handleControls(); 
	
	//this.context.fillStyle = "red";
	box2d.world.Step( deltaTime, 3);
	box2d.world.ClearForces();

	box2d.world.DrawDebugData();

	worm.draw( box2d.context);
	boil.draw( box2d.context);
	
	this.gravity();

	this.level.draw(this.context);
	
}

Game.prototype.gravity = function () {
	var pos = this.player.GetWorldCenter();
	var playerDistanceFromCenter = this.level.r + 10 - ( pos.x * pos.x + pos.y * pos.y );
	
	//console.log( playerDistanceFromCenter, this.level.r)
	
	// Check that will the peaces be pushed through the level ground
	if( playerDistanceFromCenter <= this.level.r - 2 ) {
		var center = this.box2dCenter;
		var force = pos.Copy();
		force.Subtract(center);
		force.Normalize();
		force.Multiply(10);

		this.player.ApplyForce(force, this.player.GetWorldCenter());		
	}		
}

Game.prototype.handleControls = function () {
	if( this.controls.keys.up.isDown ) {
		var pos = this.player.GetWorldCenter();
		var center = this.box2dCenter;
		var force = pos.Copy();
		force.Subtract(center);
		force.Normalize();
		force.Multiply(-70);
		
		this.player.ApplyForce(force, this.player.GetWorldCenter());		
	}
	if( this.controls.keys.down.isDown ) {
		
	}
	if( this.controls.keys.left.isDown ) {
		
	}
	if( this.controls.keys.right.isDown ) {
		
	}
	if( this.controls.keys.space.isDown ) {
		
	}
}
