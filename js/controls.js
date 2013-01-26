
function Controls() {
	this.keys = {
		up: { keyCode: 38, isDown: false },
		left: { keyCode: 37, isDown: false },
		right: { keyCode: 39, isDown: false },
		down: { keyCode: 40, isDown: false },
		space: { keyCode: 32, isDown: false },
	};

	this.keyDown = function(e) {
		switch( e.keyCode ) {
			case this.keys.up.keyCode:
				this.keys.up.isDown = true;
				break;
			case this.keys.down.keyCode:
				this.keys.down.isDown = true;
				break;
			case this.keys.left.keyCode:
				this.keys.left.isDown = true;
				break;
			case this.keys.right.keyCode:
				this.keys.right.isDown = true;
				break;
			case this.keys.space.keyCode:
				this.keys.space.isDown = true;
				break;
		}
		//e.preventDefault();
	};
	this.keyDown = this.keyDown.bind( this );
	$(document.body).keydown( this.keyDown );
	
	this.keyUp = function(e) {
		switch( e.keyCode ) {
			case this.keys.up.keyCode:
				this.keys.up.isDown = false;
				break;
			case this.keys.down.keyCode:
				this.keys.down.isDown = false;
				break;
			case this.keys.left.keyCode:
				this.keys.left.isDown = false;
				break;
			case this.keys.right.keyCode:
				this.keys.right.isDown = false;
				break;
			case this.keys.space.keyCode:
				this.keys.space.isDown = false;
				break;
		}
		//e.preventDefault();
	};
	this.keyUp = this.keyUp.bind( this );
	$(document.body).keyup( this.keyUp );
}
