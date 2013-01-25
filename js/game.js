var game;

function Game() {
	this.canvas = $("#gamecanvas");
	this.context = this.canvas.get(0).getContext("2d");
}

Game.prototype.run = function(deltaTime) {
	this.context.fillStyle = "red";
	this.context.rect
}

var _requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
                        window.oRequestAnimationFrame;

function mainLoop() {
	game.run();
	_requestAnimFrame(mainLoop);
}