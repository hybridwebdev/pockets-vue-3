/* Swiper, No Swiping! */ 
let _private = {
	params: {},
	init: function (params, callback) {
		let p = this.params;
		
		p.slipMinTime = params.slipMinTime || 500;
		
		p.slipMinDelta = params.slipMinDelta || 20;
		
		p.tanAngle = params.tanAngle || 0;
		
		this.core = params.core;
		this.callback = callback;
		
		this.stopPropagation = !!params.stopPropagation;

		
		this.delta = {};
		this.start = {};

		this._bind('touchstart');
		this._bind('touchmove');
		this._bind('touchend');
		this._bind('touchcancel');
	},
	handleEvent: function(e) {
		switch (e.type) {
			case "touchstart": this.touchstart(e); break;
			case "touchmove": this.touchmove(e); break;
			case "touchend":
			case "touchcancel": this.touchend(e); break;
		}
		this.stopPropagation && event.stopPropagation();
	},
	_bind: function(type) { 
		this.core.addEventListener(type, this, !1);
	},
	_off: function(type) { 
		this.core.removeEventListener(type, this, !1);
	},
	touchstart: function(event){
		let {pageX:x, pageY:y} = event.touches[0]
		this.start = {
			x,
			y,
			time: +new Date
		};
		this.isScrolling = undefined
	},
	touchmove: function(event){
		if (event.touches.length > 1) return;
		let touches = event.touches[0],
			delta = this.delta,
			start = this.start,
			p = this.params;
		delta.x = touches.pageX - start.x;
		delta.y = touches.pageY - start.y;
		
		if (typeof this.isScrolling === 'undefined') {
			let x = Math.abs(delta.x),
				y = Math.abs(delta.y);
			if(p.tanAngle){
				this.isScrolling = !!( this.isScrolling || y > x * Math.tan(p.tanAngle/360 * Math.PI) );
			} else {
				this.isScrolling = !!( this.isScrolling || x < y );
			}
		}
	},
	touchend: function(event){
		
		if (this.isScrolling || typeof this.isScrolling === 'undefined') return;

		let delta = this.delta,
			start = this.start,
			p = this.params;

		
		let duration = +new Date - start.time;
		let isValidSlide =
			Number(duration) < p.slipMinTime       
			&& Math.abs(delta.x) > p.slipMinDelta; 

		if (isValidSlide) {
			this.callback && this.callback(delta.x < 0, event);
		}
	},
	remove: function(){
		this._off('touchstart');
		this._off('touchmove');
		this._off('touchend');
		this._off('touchcancel');
	}
};

function clone(object) {
	function F(){}
	F.prototype = object;
	return new F;
}

export default {
	install(app) {
		app.directive('swiper', {
			created: function (el, binding, vnode, oldVnode) {
				let swpieObj = clone(_private);
				let callback = typeof(binding.value) === "object" ? binding.value.fn : binding.value;
				let params = typeof(binding.value) === "object" ? binding.value : {};
				params.core = el;
				swpieObj.init(params, callback);
			}
		} );
	}
}
