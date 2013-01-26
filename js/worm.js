function Worm( o ) {
	if ( !o ) {
		o = {};
		o.x = 6;
		o.y = 8.3;
	}
	var bottom = box2d.create.circle({r: 1.4, x: o.x, y: o.y, static: true }),
	    middle = box2d.create.circle({r: 1.2, x: o.x, y: o.y - 1.9, density: 0.8 }),
	    head = box2d.create.circle({r: 1, x: o.x, y: o.y - 3.8, density: 0.2 });
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
}
