function FrontLayer() {
	this.imgs = {
		body: $('#frontTile'),
	}
	
	this.imgs.leftBody = this.imgs.body.clone().appendTo(document.body).css({
		position: 'fixed',
		bottom: '-90px',
		left:'-90px',
		zIndex: '1'
	});
	
	this.imgs.rightBody = this.imgs.body.clone().appendTo(document.body).css({
		position: 'fixed',
		bottom: '-80px',
		right:'-80px',
		zIndex: '1'
	});
	
	this.handlePulse = this.handlePulse.bind( this );
	
	setInterval( this.handlePulse, 400);
}

FrontLayer.prototype.togglePulse = true;
FrontLayer.prototype.handlePulse = function () {
	if(this.togglePulse) {
		this.imgs.leftBody.css({
			width: '40%',
			height: '60%'
		});
		this.imgs.rightBody.css({
			width: '40%',
			height: '60%'
		});
	} else {
		this.imgs.leftBody.css({
			width: '39%',
			height: '59%'
		});
		this.imgs.rightBody.css({
			width: '39%',
			height: '59%'
		});
	}
	this.togglePulse = !this.togglePulse;
}

FrontLayer.prototype.draw = function ( context ) {
	context.save();
	context.translate( this.body.GetPosition().x * box2d.scale, this.body.GetPosition().y * box2d.scale ); 
	context.rotate( this.body.GetAngle() );
	var s2 = 0.5;
	var scale = s2;
	context.scale( scale, scale );
	context.drawImage( this.imgs.body, -40, -40);
	context.restore();
}
