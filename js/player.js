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
	this.body.name = 'player';
	
	this.levels = {
		jump: 1,
		attack: 1,
		speed: 1,
		health: 10
	};
	
	this.states = { normal: 'normal', attack: 'attack' };
	this.state = this.states.normal;

	this.imgs = {
		"normal": $('#cell').get(0),
		"attack": $('#cellspikes').get(0)
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
	var img = this.imgs[this.state];
	context.drawImage(img, -img.width/2, -img.height/2);
	context.restore();
}

Player.prototype.update = function () {
	if ( score.wormsKilled > 2 ) {
		// attack level up
	} else if ( score.wormsKilled > 7 ) {
		// attack level up
	} else if ( score.wormsKilled > 15 ) {
		// attack level up
	}
	
	if ( score.boilsKilled > 2 ) {
		// jump level up
	} else if ( score.boilsKilled > 7 ) {
		// jump level up
	} else if ( score.boilsKilled > 15 ) {
		// jump level up
	}
	
}
