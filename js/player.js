
function Player( o ) {
	if ( !o ) {
		o = {};
		o.x = 5;
		o.y = 10;
		o.r = 0.5;
		o.a = 2 * Math.PI;
	}

	this.radius = o.r;

	// TODO: Angle
	this.resetBody(o.x, o.y);
	/*
	this.body = box2d.create.circle({r: o.r, x: o.x, y: o.y, static: false }),
	this.body.name = 'player';
	*/

	this.levels = {
		jump: 1,
		attack: 1,
		speed: 1,
		maxHealth: 5,
		health: 5,
		hostHealth: 8,
		hostHealthMax: 8,
		amountOfWorms: 0,
		hostTolerance: 2,
		recovery: 500 // milliseconds
	};
	
	this.states = { normal: 'normal', attack: 'attack', disabled: 'disabled', win: "win" };
	this.state = this.states.normal;

	this.imgs = {
		"normal1": $('#cell1').get(0),
		"normal2": $('#cell2').get(0),
		"normal3": $('#cell3').get(0),
		"attack": $('#cellspikes').get(0),
		"disabled": $('#celldisabled').get(0),
		"win": $('#cellwin').get(0)
	}
	
	this.attackHandler = this.attackHandler.bind( this ); 
	this.postAttackHandler = this.postAttackHandler.bind( this ); 
	this.recoverFromDamage = this.recoverFromDamage.bind( this ); 
	this.postRecoverFromDamage = this.postRecoverFromDamage.bind( this  );
	
	this.healthbar = new Healthbar({w: 200, h: 30, x: 10, y: 10, p: 1, name: 'player' });
	this.hostHealthbar = new Healthbar({w: 200, h: 30, x: 10, y: 50, p: 1, name: 'host' });
}

Player.prototype.resetBody = function(x, y) {
	var radius = this.radius;
	if (this.state == "attack") radius *= 1.1;

	var v = new b2Vec2(0, 0);
	var va = 0;
	var angle = 0;

	if (this.body) {
		v = this.body.GetLinearVelocity().Copy();
		va = this.body.GetAngularVelocity();
		angle = this.body.GetAngle();

		box2d.world.DestroyBody( this.body );
	}

	this.body = box2d.create.circle({r: radius, x: x, y: y, static: false });
	this.body.name = 'player';

	this.body.SetLinearVelocity(v);
	this.body.SetAngle(angle);
	this.body.SetAngularVelocity(va);
}

Player.prototype.imgs = {};

Player.prototype.draw = function ( context ) {
	if (game.state == "win")
		this.state = this.states.win;

	context.save();
	context.translate( this.body.GetPosition().x * box2d.scale, this.body.GetPosition().y * box2d.scale ); 
	context.rotate( this.body.GetAngle() );
	var s2 = 0.5;
	var scale = s2;
	context.scale( scale, scale );
	var img;
	if (this.state == "normal") {
		var index = Math.floor((game.gameTime/2) % 3) + 1;
		img = this.imgs[this.state + index];
	}
	else
		img = this.imgs[this.state];
	context.drawImage( img, -img.width/2, -img.height/2 );
	context.restore();
}

Player.prototype.gameOver = function () {
	console.log('gameOver');

	this.state = "disabled";

	game.lose();
}
Player.prototype.setAmountOfWorms = function( n ) {
	this.levels.amountOfWorms = n;
	var percentage = ( this.levels.hostHealthMax - ( n / this.levels.hostTolerance )) / this.levels.hostHealthMax;
	this.hostHealthbar.updatePercentage( percentage );

	if (percentage <= 0)
		game.lose();

	function removeAllBeats() {
		$('.west').removeClass('beatleft');
		$('.east').removeClass('beatright');
		$('.west').removeClass('beatleftFast');
		$('.east').removeClass('beatrightFast');
		$('.south').removeClass('beatbottom');
		$('.south').removeClass('beatbottomFast');
		$('.southwest').removeClass('beatleft');
		$('.southeast').removeClass('beatright');
		$('.southwest').removeClass('beatleftFast');
		$('.southeast').removeClass('beatrightFast');
		$('.southsouthwest').removeClass('beatleft');
		$('.southsoutheast').removeClass('beatright');
		$('.southsouthwest').removeClass('beatleftFast');
		$('.southsoutheast').removeClass('beatrightFast');
	}
	
	if ( percentage > 0.7 && percentage < 0.9 ) {
		removeAllBeats();
		$('.west').addClass('beatleft');
		$('.east').addClass('beatright');
		$('.southwest').addClass('beatleft');
		$('.southeast').addClass('beatright');
	} else if ( percentage < 0.6 ) {
		removeAllBeats();
		$('.west').addClass('beatleftFast');
		$('.east').addClass('beatrightFast');
		$('.south').addClass('beatbottom');
		$('.southwest').addClass('beatleft');
		$('.southeast').addClass('beatright');
		$('.southsouthwest').addClass('beatleft');
		$('.southsoutheast').addClass('beatright');
	} else if ( percentage < 0.3 ) {
		removeAllBeats();
		$('.south').addClass('beatbottomFast');
		$('.west').addClass('beatleftFast');
		$('.east').addClass('beatrightFast');
		$('.southwest').addClass('beatleftFast');
		$('.southeast').addClass('beatrightFast');
		$('.southsouthwest').addClass('beatleftFast');
		$('.southsoutheast').addClass('beatrightFast');
	} else if ( percentage < 0.2 ) {
		removeAllBeats();
		$('.south').addClass('beatbottomFast');
		$('.west').addClass('beatleftFast');
		$('.east').addClass('beatrightFast');
		$('.southwest').addClass('beatleftFast');
		$('.southeast').addClass('beatrightFast');
		$('.southsouthwest').addClass('beatleft');
		$('.southsoutheast').addClass('beatright');
	}
}
Player.prototype.updateLevels = function () {
	if( this.levels.health <= 0 ) {
		this.gameOver();
	} 
	
	this.healthbar.updatePercentage( this.levels.health / this.levels.maxHealth );
	
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

Player.prototype.attackReady = true;
Player.prototype.attack = function () {
	if( this.attackReady ) {
		this.state = this.states.attack;
		this.attackReady = false;
		$("#attacksound").get(0).play();
		setTimeout( this.attackHandler, 1000 );

		this.resetBody(this.body.m_xf.position.x, this.body.m_xf.position.y);
	}
}

Player.prototype.attackHandler = function () {
	this.state = this.states.disabled;
	this.resetBody(this.body.m_xf.position.x, this.body.m_xf.position.y);
	setTimeout( this.postAttackHandler, this.levels.recovery );
}

Player.prototype.postAttackHandler = function () {
	this.attackReady = true;
	this.state = this.states.normal;
}

Player.prototype.update = function (deltaTime) {

	if( this.body.beginContact != null && (this.body.beginContact.GetFixtureA().GetBody() == this.body || this.body == this.body.beginContact.GetFixtureB().GetBody())) {
		var name1 = this.body.beginContact.GetFixtureA().GetBody().name;
		var name2 = this.body.beginContact.GetFixtureB().GetBody().name;
		if ((name1 && name1 == "ground" || name2 && name2 == "ground") && this.body.m_linearVelocity.Length() > 3) {
			//game.particleEngine.addParticle({x:});
			var manifold = new b2WorldManifold();
			this.body.beginContact.GetWorldManifold(manifold);
			var collisionPoint = manifold.m_points[0];
			collisionPoint.Multiply(box2d.scale);

			game.particleEngine.addParticle({x: collisionPoint.x, y: collisionPoint.y, color:"ground"});
		}
		if( this.state != this.states.attack ) {
			if( (this.body.beginContact.GetFixtureA().GetBody().name && this.body.beginContact.GetFixtureA().GetBody().name == 'worm' ) ||
				(this.body.beginContact.GetFixtureB().GetBody().name && this.body.beginContact.GetFixtureB().GetBody().name == 'worm' )) {
					if ( !this.recoveryMode ) {
						console.log("aih", this.body.beginContact);
						$("#aih").get(0).play();
						this.recoveryMode = true;
						this.bodyImage = $(document.body).css( 'background-image' );
						$(document.body).css( {'background-image': 'url("img/bg_sick_tile.png")' });
						this.levels.health--;
						setTimeout( this.recoverFromDamage, 100 );
					}
			}
		}
	}
	if( this.body.endContact ) {
		this.body.beginContact = null;
		this.body.endContact = false;
	}
	
	this.updateLevels();

	if (Math.random() < deltaTime) {
		var pos = this.body.GetWorldCenter();
		game.particleEngine.addParticle({x:pos.x*box2d.scale, y:pos.y*box2d.scale, color:"bubble"});
	}
}
Player.prototype.recoveryMode = false;
Player.prototype.recoverFromDamage = function () {
	if( !this.recoveryMode || game.state == "dead" ) {
		return;
	}
	$(document.body).css( {'background-image': this.bodyImage });
	
	setTimeout( this.postRecoverFromDamage, 300 );
}
Player.prototype.postRecoverFromDamage = function () {
	this.recoveryMode = false;
}

Player.prototype.getState = function () {
	return this.state;
}
Player.prototype.isAttacking = function () {
	return this.state == this.states.attack;
}
