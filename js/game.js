
function Game() {
	new FrontLayer();
	
	game = this;	
	this.width = $('canvas').css('width');
	this.height = $('canvas').css('height');
	this.center = new b2Vec2( parseInt( this.width ) / 2, parseInt( this.height ) / 2 );
	this.box2dCenter = new b2Vec2( parseInt( this.width ) / ( box2d.scale * 2), parseInt( this.height ) / ( box2d.scale * 2));
	console.log( this.width, this.height, this.center, this.box2dCenter);
	
	box2d.init();

	this.canvas = $( "#gamecanvas" ).get(0);
	this.context = this.canvas.getContext( "2d" );
	this.player = new Player();
	this.level = new Level( this );

	this.state = "start";
	
	this.controls = new Controls();

	this.worms = [];
	this.eggs = [];

	for (var i = 0; i < 5; i++) {
		var angle = Math.PI + Math.random()*Math.PI;
		
		var params = {
			//x: this.box2dCenter.x + (this.level.r-1) * Math.sin(angle),
			//y: this.box2dCenter.y + (this.level.r-1) * Math.cos(angle),
			r: 0.5,
			a: (Math.random() * 100)
		};
		var newWorm = new Worm(params);
		this.worms.push(newWorm);
	}

	this.gameTime = 0;
	this.worldAngle = -1;

	ParticleSystem.init(this.canvas);
	this.particleEngine = ParticleSystem;

	$("#aih").get(0).volume = 0.5;
	$("#squeeze").get(0).volume = 0.8;
}

Game.prototype.run = function(deltaTime) {
	this.gameTime += deltaTime;

	this.handleControls(); 
	
	if ( this.state == "running" ) {
		this.update( deltaTime );
	}
	
	//this.context.fillStyle = "red";
	box2d.world.Step( deltaTime, 3);
	box2d.world.ClearForces();

	this.gravity();

	this.calculateWorldAngle(deltaTime);

	if (this.state == "running" && this.worms.length == 0) {
		$("#winsong").get(0).play();
		this.state = "win";
	}

	this.draw(deltaTime);
	
}

Game.prototype.calculateWorldAngle = function(deltaTime) {
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
}

Game.prototype.update = function(deltaTime) {
	
		
	if( this.player ) {
		this.player.setAmountOfWorms( this.worms.length );
		this.player.update(deltaTime);
	}
	
	for (var i = this.worms.length - 1; i >= 0; i--) {
		this.worms[i].update( deltaTime, this.player.isAttacking() );
		if (this.worms[i].removeMe) {
			this.worms[i].remove();
			this.worms.splice(i, 1);

			$("#squeeze").get(0).play();
		}
	}

	for (var i = this.eggs.length - 1; i >= 0; i--) {
		this.eggs[i].update( deltaTime);
		if (this.eggs[i].removeMe) {

			var x = this.eggs[i].body.GetWorldCenter().x;
			var y = this.eggs[i].body.GetWorldCenter().y;

			var center = this.box2dCenter.Copy();
			var pos = new b2Vec2(x, y);
			pos.Subtract(center);
			pos.Multiply(1);

			var angle = Math.atan2(pos.x, pos.y);
		
			var params = {
				x: x,
				y: y,
				r: 0.5,
				a: angle
			};
			var newWorm = new Worm(params);
			this.worms.push(newWorm);

			this.eggs[i].remove();
			this.eggs.splice(i, 1);
		}
	}
}

Game.prototype.draw = function(deltaTime) {
	var scale = 2;

	//this.context.fillStyle = "black";
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	this.context.save();
	this.context.translate(this.canvas.width/2, -70);

	this.context.rotate(this.worldAngle);
	this.context.scale(scale, scale);
	this.context.translate(-this.canvas.width/2, -this.canvas.height/2);



	this.level.draw(this.context);
	for (var i = 0; i < this.worms.length; i++)
		this.worms[i].draw(box2d.context);

	for (var i = 0; i < this.eggs.length; i++)
		this.eggs[i].draw(box2d.context);

	this.player.draw(box2d.context);

	this.particleEngine.update(box2d.context, deltaTime);

	this.context.restore();

	if (this.state == "start") {
		var scale = 0.7;
		var img = $('#startpicture').get(0);
		this.context.save();
		this.context.scale(scale, scale);
		this.context.drawImage(img, this.canvas.width/2/scale - img.width/2, 0);
		this.context.restore();
/*
		this.context.font = "60px Arial";
		this.context.fillText("Welcome", 200, 300);*/
	}
	else if (this.state == "dead") {
		var scale = 0.7;
		var img = $('#gameover').get(0);
		this.context.save();
		this.context.scale(scale, scale);
		this.context.drawImage(img, this.canvas.width/2/scale - img.width/2, 0);
		this.context.restore();
	}
	else if (this.state == "win") {
		var scale = 0.7;
		var img = $('#win').get(0);
		this.context.save();
		this.context.scale(scale, scale);
		this.context.drawImage(img, this.canvas.width/2/scale - img.width/2, 0);
		this.context.restore();
	}
	
		//box2d.world.DrawDebugData();
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
	if (this.state == "dead")
		return;

	if( this.controls.keys.up.isDown ) {
		var pos = this.player.body.GetWorldCenter();
		var force = this.getUnityGravityVector(pos);
		force.Multiply(-17 -7 * Math.sin(this.gameTime*5));
		this.player.body.ApplyForce(force, pos);

		if (this.state == "start")
			this.state = "running";
	}
	if( this.controls.keys.down.isDown ) {
		
	}
	if( this.controls.keys.left.isDown ) {
		var pos = this.player.body.GetWorldCenter();
		var force = this.getUnityGravityVector(pos);
		force.CrossVF(-20);
		this.player.body.ApplyForce(force, pos);

		if (this.state == "start")
			this.state = "running";
	}
	if( this.controls.keys.right.isDown ) {
		var pos = this.player.body.GetWorldCenter();
		var force = this.getUnityGravityVector(pos);
		force.CrossVF(20);
		this.player.body.ApplyForce(force, pos);

		if (this.state == "start")
			this.state = "running";
	}
	if( this.controls.keys.space.isDown ) {
		this.player.attack();

		if (this.state == "start")
			this.state = "running";
	}
}

Game.prototype.lose = function() {
	$(document.body).css( {'background-image': 'url("img/bg_dead_tile.png")' });
	$("#deadsong").get(0).play();
}