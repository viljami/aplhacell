function FrontLayer() {
	this.imgs = {
		body: $('#frontTile'),
	}
	
	if( window.innerWidth > 800 ) {
		this.imgs.midBody = this.imgs.body.clone().appendTo('#canvasContainer').css({
			position: 'absolute',
			bottom: '-100px;',
			right:'0px;',
			zIndex: '1'
		});
		
		this.imgs.leftTopBody = this.imgs.body.clone().appendTo('#canvasContainer').css({
			position: 'absolute',
			top: '0px;',
			left:'0px;',
			zIndex: '1'
		});
		
		this.imgs.rightTopBody = this.imgs.body.clone().appendTo('#canvasContainer').css({
			position: 'absolute',
			top: '100px;',
			right:'100px;',
			zIndex: '1'
		});
	}
	this.imgs.leftBody = this.imgs.body.clone().appendTo('#canvasContainer').css({
		position: 'absolute',
		bottom: '0px;',
		left: '0px;',
		zIndex: '1'
	});
	
	this.imgs.rightBody = this.imgs.body.clone().appendTo('#canvasContainer').css({
		position: 'absolute',
		bottom: '0px;',
		right:'0px;',
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
