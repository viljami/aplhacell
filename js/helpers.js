var _requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
                        window.oRequestAnimationFrame;

var current_time = 0;
var delta_time;

function getCurrentTime() {
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
