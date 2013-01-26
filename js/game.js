var game;

function Game() {
	box2d.init();
	box2d.create.box({w:1, h:1, x:3, y:3, static:false});



	//create world

    box2d._boxFixDef.shape.SetAsBox( o.w, o.h );
    box2d._bodyDef.position.Set( o.x, o.y );


    if( !o ) {
        box2d._bodyDef.type = b2Body.b2_dynamicBody;
    } else {
        if( !o.static ) {
            box2d._bodyDef.type = b2Body.b2_dynamicBody
        } else {
            box2d._bodyDef.type = b2Body.b2_staticBody;
        }
    }

    var body = box2d.world.CreateBody( box2d._bodyDef );
    body.CreateFixture( box2d._boxFixDef );
	
	body.beginContact = null;
	
    return body;



}

Game.prototype.run = function(deltaTime) {
	//this.context.fillStyle("red");
	box2d.world.Step( deltaTime, 3);
	box2d.world.ClearForces();

	box2d.world.DrawDebugData();
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