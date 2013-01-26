function Healthbar( o ) {
	if ( !o ) {
		o = {};
		o.x = 10;
		o.y = 10;
		o.w = 200;
		o.h = 30;
		o.p = 0.7;
	}
	this.w = o.w;
	this.h = o.h;
	this.x = o.x;
	this.y = o.y;
	this.p = o.p;
	
	function bar(x,y,w,h,c) {
		return '<div style="position:fixed;top:' + y + 'px;left:' + x + 'px; width:' + w + 'px; height: ' + h + 'px; background-color:' + c + ';"></div>';
	}
	this.barContainer = $(bar(this.x,this.y,this.w,this.h,'#ff0000')).appendTo(document.body);
	this.healthbar = $(bar(this.x,this.y,this.w * this.p ,this.h,'#00ff00')).appendTo(document.body);	
}

Healthbar.prototype.updatePercentage = function ( p ) {
	var width = this.width * p;
	console.log($(this.healthbar).css({ width: width + 'px' }));
}

Healthbar.prototype.draw = function ( context ) {

}
