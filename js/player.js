function Player( o ) {
	if ( !o ) {
		o = {};
		o.x = 5;
		o.y = 10;
		o.r = 0.5;
		o.a = 2 * Math.PI;
	}
	// TODO: Angle
	this.body = box2d.create.circle({r: o.r, x: o.x, y: o.y, static: false }),

	this.imgs = {
		body: $('#wormHead').get(0)
	}
}

Player.prototype.imgs = {};

Player.prototype.draw = function ( context ) {
	context.save();
	context.translate( this.body.GetPosition().x * box2d.scale, this.body.GetPosition().y * box2d.scale ); 
	context.rotate( this.body.GetAngle() );
	var s2 = 0.5;
	var scale = s2;
	context.scale( scale, scale );
	context.drawImage( this.imgs.body, -40, -40);
	context.restore();
}
