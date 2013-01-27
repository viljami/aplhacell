function Healthbar( o ) {
	if ( !o ) {
		o = {};
		o.x = 10;
		o.y = 10;
		o.w = 200;
		o.h = 30;
		o.p = 1;
	}
	this.w = o.w;
	this.h = o.h;
	this.x = o.x;
	this.y = o.y;
	this.p = o.p;
	
	function bar(x,y,w,h,c,id) {
		return '<div id="' + id + '" style="position:fixed;top:' + y + 'px;left:' + x + 'px; width:' + w + 'px; height: ' + h + 'px; background-color:' + c + ';background-image:url(\'img/energy_bg.png\')"></div>';
	}
	this.barContainer = $(bar(this.x,this.y,this.w,this.h,'#ff0000','barContainer')).appendTo(document.body);
	this.healthbar = $(bar(this.x,this.y,this.w * this.p ,this.h,'#00ff00','healthbar')).appendTo(document.body);	
}

Healthbar.prototype.updatePercentage = function ( p ) {
	var width = this.w * p;
	$(this.healthbar).css({ width: width + 'px' });
}

Healthbar.prototype.draw = function ( context ) {

}
