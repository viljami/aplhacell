function Worm( o ) {
	if ( !o ) {
		o = {};
		o.x = 6;
		o.y = 14.7;
		o.r = 0.5;
		o.a = 2 * Math.PI;
	}
	// TODO: Angle
	var bottom = box2d.create.circle({r: o.r, x: o.x, y: o.y, static: true }),
	    middle = box2d.create.circle({r: o.r * 0.8, x: o.x, y: o.y - o.r, density: 0.8 }),
	    head = box2d.create.circle({r: o.r * 0.6, x: o.x, y: o.y - o.r * 2, density: 0.2 });
	box2d.create.distanceJoint({bodyA: bottom, bodyB: middle, centerA: bottom.GetPosition(), centerB: middle.GetPosition() });
	box2d.create.distanceJoint({bodyA: middle, bodyB: head, centerA: middle.GetPosition(), centerB: head.GetPosition() });
	
	box2d.create.revoluteJoint({
		bodyA: bottom, 
		bodyB: middle, 
		centerA: bottom.GetPosition(), 
		centerB: middle.GetPosition(),
		lowerAngle: -0.02 * Math.PI,
		upperAngle: 0.02 * Math.PI });
	box2d.create.revoluteJoint({
		bodyA: middle, 
		bodyB: head, 
		centerA: middle.GetPosition(), 
		centerB: head.GetPosition(),
		lowerAngle: -0.05 * Math.PI,
		upperAngle: 0.05 * Math.PI });
	
	//box2d.create.distanceJoint({bodyA: middle, bodyB: head });
	//box2d.create.box({w:5, h: 1, x: 5, y: 5});
	
	this.bottom = bottom;
	this.middle = middle;
	this.head = head;
	
	this.imgs = {
		head: $('#wormHead').get(0),
		middle: $('#wormBody').get(0),
		bottom: $('#wormBody').get(0)
	}
}

Worm.prototype.imgs = {};

Worm.prototype.draw = function ( context ) {
	//console.log( this.head.GetPosition().x * box2d.scale, this.head.GetPosition().y * box2d.scale );
	// Draw Head
	context.save();
	context.translate(this.head.GetPosition().x * box2d.scale, this.head.GetPosition().y * box2d.scale ); 
	context.rotate(this.head.GetAngle());
	var s2 = 0.5;
	var scale = s2;
	context.scale(scale,scale);
	context.drawImage(this.imgs.head,-25,-25);
	context.restore();
	
	// Draw Middle
	context.save();
	context.translate(this.middle.GetPosition().x * box2d.scale, this.middle.GetPosition().y * box2d.scale ); 
	context.rotate(this.middle.GetAngle());
	var s2 = 0.4;
	var scale = s2;
	context.scale(scale,scale);
	context.drawImage(this.imgs.middle,-32,-32);
	context.restore();
	
	// Draw Bottom
	context.save();
	context.translate(this.bottom.GetPosition().x * box2d.scale, this.bottom.GetPosition().y * box2d.scale ); 
	context.rotate(this.bottom.GetAngle());
	var s2 = 0.5;
	var scale = s2;
	context.scale(scale,scale);
	context.drawImage(this.imgs.bottom,-35,-35);
	context.restore();
}

Worm.prototype.update = function () {
	if( this.head.endContact ) {
		this.head.beginContact = null;
		this.head.endContact = false;
	}
	
}
