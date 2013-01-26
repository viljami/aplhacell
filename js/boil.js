function Boil( o ) {
	if ( !o ) {
		o = {};
		o.x = 6;
		o.y = 7;
		o.w = 0.5;
		o.h = 0.5;
		o.a = 2 * Math.PI;
	}
	
	this.body = box2d.create.box({w: o.w, h: o.h, x: o.x, y: o.y, static: true }),
	
	this.imgs = {
		body: $('#boil').get(0),
	}
}

Boil.prototype.imgs = {};

Boil.prototype.draw = function ( context ) {
	context.save();
	context.translate( this.body.GetPosition().x * box2d.scale, this.body.GetPosition().y * box2d.scale ); 
	context.rotate( this.body.GetAngle() );
	var s2 = 0.5;
	var scale = s2;
	context.scale( scale, scale );
	context.drawImage( this.imgs.body, -40, -40);
	context.restore();
}
