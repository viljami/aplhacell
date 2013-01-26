function Egg(o) {

	if ( !o ) {
		o = {};
		o.x = 5;
		o.y = 10;
		o.r = 0.3;

		//o.xs = center.x + Math.random();
		//o.ys = center.y + Math.random();
	}

	var center = game.box2dCenter.Copy();
	center.Subtract(new b2Vec2(o.x, o.y));
	var depth = center.Length();
	if (depth < game.level.r/2) {
		center.Multiply(-1);
	}
	center.Normalize();
	center.Multiply(1);

	this.body = box2d.create.circle({r: o.r, x: o.x, y: o.y, static: false });
	this.body.name = "egg";

	this.body.ApplyImpulse(new b2Vec2(center.x + Math.random(), center.y + Math.random()), this.body.GetWorldCenter());

	this.image = $('#egg').get(0);

	this.life = 7;
	this.stuck = false;

	this.removeMe = false;
}

Egg.prototype.draw = function(context) {
	context.save();
	context.translate( this.body.GetPosition().x * box2d.scale, this.body.GetPosition().y * box2d.scale ); 
	context.rotate( this.body.GetAngle() );

	var s2 = 0.3;
	var scale = s2;
	context.scale( scale, scale );
	context.drawImage( this.image, -this.image.width/2, -this.image.height/2 );

	context.restore();
}

Egg.prototype.update = function(deltaTime) {
	this.life -= deltaTime;

	if( !this.stuck && this.life < 5 && this.body.beginContact != null ) {
		var name1 = this.body.beginContact.GetFixtureA().GetBody().name;
		var name2 = this.body.beginContact.GetFixtureB().GetBody().name;

		if ((name1 && name1 == "ground" || name2 && name2 == "ground") &&
			(this.body.beginContact.GetFixtureA().GetBody() == this.body || this.body.beginContact.GetFixtureB().GetBody() == this.body)) {
			console.log(this.body.beginContact);
			this.stuck = true;
			var x = this.body.GetWorldCenter().x;
			var y = this.body.GetWorldCenter().y;
			this.remove();
			this.body = box2d.create.circle({r: 0.3, x: x, y: y, static: true });
			this.body.name = "egg";
			this.life = 3;
		}
	}

	if (this.life < deltaTime && this.stuck) {
		this.removeMe = true;
	}
}

Egg.prototype.remove = function () {
	box2d.world.DestroyBody( this.body );
}