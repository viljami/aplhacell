var game;
var worm;
function Game() {
	box2d.init();
	this.player = box2d.create.box({w:1, h:1, x:2, y:3, static:false});
	
	worm = new Worm();

	this.canvas = $("#gamecanvas").get(0);
	this.context = this.canvas.getContext("2d");

	this.level = new Level(this.canvas);
	
	new Controls();
}

Game.prototype.run = function(deltaTime) {
	//this.context.fillStyle = "red";
	box2d.world.Step( deltaTime, 3);
	box2d.world.ClearForces();

	box2d.world.DrawDebugData();


worm.draw( box2d.context);


	this.level.draw(this.context);

/*
	var pos = this.player.GetPosition();
	var center = new b2Vec2(7, 7);
	var force = pos;
	force.Subtract(center);
	force.Normalize();
	force.Multiply(1);

	this.player.ApplyForce(force, this.player.GetPosition());
	*/
}

var _requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
                        window.oRequestAnimationFrame;

var current_time = 0;
var delta_time;

function getCurrentTime()
{
	return new Date().getTime()/1000.0;
}

function mainLoop() {
	var old_time = current_time;
	current_time = getCurrentTime();
	delta_time = current_time - old_time;
	delta_time = Math.min(0.1, delta_time);

	game.run(delta_time);
	_requestAnimFrame(mainLoop);
}
