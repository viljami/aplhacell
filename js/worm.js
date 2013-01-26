function Worm( o ) {
	if ( !o ) {
		o = {};
		o.x = 6;
		o.y = 14.7;
		o.r = 0.5;
		o.a = 2 * Math.PI;
		o.distance = 7;
	}
	
	var center = game.box2dCenter;
	var distances = [ 8.5, 8.5-o.r, 8.5-(o.r*2) ];
	var angle = o.a || Math.PI;
	
	var position1 = new b2Vec2( center.x + distances[ 0 ] * Math.sin( angle ), center.y + distances[ 0 ] * Math.cos( angle ));
	var position2 = new b2Vec2( center.x + distances[ 1 ] * Math.sin( angle ), center.y + distances[ 1 ] * Math.cos( angle ));
	var position3 = new b2Vec2( center.x + distances[ 2 ] * Math.sin( angle ), center.y + distances[ 2 ] * Math.cos( angle ));
	
	var bottom = box2d.create.circle({r: o.r, x: position1.x, y: position1.y, static: true }),
		middle = box2d.create.circle({r: o.r * 0.8, x: position2.x, y: position2.y, density: 0.8, static: Math.random() < 0.5 }),
		head = box2d.create.circle({r: o.r * 0.6, x: position3.x, y: position3.y, density: 0. }),
/*	
	var bottom = box2d.create.circle({r: o.r, x: o.x, y: o.y, static: true }),
	    middle = box2d.create.circle({r: o.r * 0.8, x: o.x, y: o.y - o.r, density: 0.8 }),
	    head = box2d.create.circle({r: o.r * 0.6, x: o.x, y: o.y - o.r * 2, density: 0.2 }),
	    */
	    djoint1 = box2d.create.distanceJoint({bodyA: bottom, bodyB: middle, centerA: bottom.GetPosition(), centerB: middle.GetPosition() }),
	    djoint2 = box2d.create.distanceJoint({bodyA: middle, bodyB: head, centerA: middle.GetPosition(), centerB: head.GetPosition() }),
	    rjoint1 = box2d.create.revoluteJoint({
			bodyA: bottom, 
			bodyB: middle, 
			centerA: bottom.GetPosition(), 
			centerB: middle.GetPosition(),
			lowerAngle: -0.02 * Math.PI,
			upperAngle: 0.02 * Math.PI 
		}),
		rjoint2 = box2d.create.revoluteJoint({
			bodyA: middle, 
			bodyB: head, 
			centerA: middle.GetPosition(), 
			centerB: head.GetPosition(),
			lowerAngle: -0.05 * Math.PI,
			upperAngle: 0.05 * Math.PI 
		});
	
	//box2d.create.distanceJoint({bodyA: middle, bodyB: head });
	//box2d.create.box({w:5, h: 1, x: 5, y: 5});
	
	this.bottom = bottom;
	this.middle = middle;
	this.head = head;
	this.head.name = 'worm';
	this.middle.name = 'worm';
	this.bottom.name = 'worm';
	this.imgs = {
		head: $('#wormHead').get(0),
		middle: $('#wormBody').get(0),
		bottom: $('#wormBody').get(0)
	}

	this.eggInterval = 5 + 30 * Math.random();
	this.eggTimeLeft = this.eggInterval;
}

Worm.prototype.imgs = {};

Worm.prototype.draw = function ( context ) {
	// Draw Head
	context.save();
	context.translate(this.head.GetPosition().x * box2d.scale, this.head.GetPosition().y * box2d.scale ); 
	context.rotate(this.head.GetAngle() + 1.5 + Math.sin(game.gameTime*0.3));
	var s2 = 0.5;
	var scale = s2;
	context.scale(scale,scale);
	context.drawImage(this.imgs.head,-37,-37);
	//overlay
	if (this.eggTimeLeft < 3 && game.gameTime % 0.5 > 0.2) {
        context.fillStyle = "rgba(255, 0, 0, 0.4)";
        context.beginPath();
        context.arc(0, 0, 37, 0, (Math.PI * 2), true);
        context.closePath();
        context.fill();
    }
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

Worm.prototype.update = function ( deltaTime, isPlayerAttacking ) {
	this.eggTimeLeft -= deltaTime;

	if (this.eggTimeLeft <= 0) {
		this.eggTimeLeft = this.eggInterval;


		var pos = this.head.GetWorldCenter();
		//launch egg
		game.eggs.push(new Egg({x:pos.x, y:pos.y, r:0.3}));
	}

	if( this.head.beginContact != null ) {
		var contact = this.head.beginContact;
		if( !contact.GetFixtureA().GetBody().ground && !contact.GetFixtureB().GetBody().ground && isPlayerAttacking )  {
			if( (this.head.beginContact.GetFixtureA().GetBody().name && this.head.beginContact.GetFixtureA().GetBody().name == 'player' ) ||
				(this.head.beginContact.GetFixtureB().GetBody().name && this.head.beginContact.GetFixtureB().GetBody().name == 'player' )) {
					this.removeMe = true;
					var headPos = this.head.GetPosition();
					var midPos = this.middle.GetPosition();
					var bottomPos = this.bottom.GetPosition();
					headPos.Multiply(box2d.scale);
					midPos.Multiply(box2d.scale);
					bottomPos.Multiply(box2d.scale);
					for (var i = 0; i < 10; i++)
						game.particleEngine.addParticle({x:headPos.x, y:headPos.y, color:"worm"});
					for (var i = 0; i < 10; i++)
						game.particleEngine.addParticle({x:midPos.x, y:midPos.y, color:"worm"});
					for (var i = 0; i < 10; i++)
						game.particleEngine.addParticle({x:bottomPos.x, y:bottomPos.y, color:"worm"});
			}
		}
	}
	if( this.head.endContact ) {
		this.head.beginContact = null;
		this.head.endContact = false;
	}
	
}

Worm.prototype.remove = function () {
	box2d.world.DestroyBody( this.head );
	box2d.world.DestroyBody( this.middle );
	box2d.world.DestroyBody( this.bottom );
	//box2d.world.DestroyJoint( this.djoint2 )
	//box2d.world.DestroyJoint( this.rjoint2 );
	score.wormsKilled++;
}
