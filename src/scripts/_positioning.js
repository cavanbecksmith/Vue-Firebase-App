import $ from 'jquery'

var _position = {
	run: false,
	init: function(){
		// console.log('run');
		window.r = this.recalcOverlayPosition();
		var $this = this;
		$this.resizeWindow();
		// $this.scrollLocking();
	},
	// Main resize function
	resizeWindow: function(){
		var $this = this;

		$this.recalcOverlayH();
		$this.recalcOverlayPosition();
		$this.recalcEditPosition();

		if($this.run == false){
			$(window).resize(function(){
				$this.recalcOverlayH();
				$this.recalcOverlayPosition();
				$this.recalcEditPosition();
			});
			$this.run = true;
		}
	},
	recalcOverlayH: function(){
		var winH = $(window).height();
		$('.issuebox').height(winH);
		$('.overlay').height(winH);
	},
	recalcOverlayPosition: function (){
		var left = ($(window).width() / 2) - ($('#createIssue .wrap').outerWidth()/2);
		var top = ($(window).height() / 2) - ($('#createIssue .wrap').outerHeight()/2);
		$('#createIssue .wrap').css({'left': left, 'top': top});
	},
	recalcEditPosition: function (){
		var left = ($(window).width() / 2) - ($('#editIssue .wrap').outerWidth()/2);
		var top = ($(window).height() / 2) - ($('#editIssue .wrap').outerHeight()/2);
		$('#editIssue .wrap').css({'left': left, 'top': top});
	},
	scrollLocking: function () {

		/*
			Set window.scrollLock to true when 
			you want the window to stop scrolling
		*/

		// console.log('SCROLLLOCK');
		window.scrollLock = false;
		window.previousScrollTop = 0
		var $window = $(window);
		$window.scroll(function(event) {

		    if(window.scrollLock) {
		        $window.scrollTop(window.previousScrollTop); 
		    }

		    window.previousScrollTop = $window.scrollTop();

		});
	},
	align: function(item, relativeitem){
		console.log(item, relativeitem);
		$(item).css('top',  (Number($(relativeitem).css('top').replace('px', '')) + Number($(relativeitem).css('height').replace('px', ''))) + 'px' );
	},
	hideNavigation: function(item, posCollapse){
		$(window).scroll(function(event){
			var pos = $(window)[0].scrollY;
			if(pos > posCollapse){
				item.hide();
			}
			else{
				item.show();
			}
		})
	},
	enableLoader: function() {
		var $loader = $('<div id="loader" style="text-align:center;"><svg style="top: 35%; position: absolute; z-index: 100; fill: #fff" width="135" height="60" viewBox="0 0 100 60"> <rect x="0" y="0" width="10" height="60" rx="6"> <animate attributeType="CSS" attributeName="height" values="60;20;60;" begin=\'0s\' dur="1s" repeatCount="indefinite"/> <animate attributeType="CSS" attributeName="y" begin=\'0s\' values="0;20;0;" dur="1s" repeatCount="indefinite"/> </rect> <rect x="20" y="0" width="10" height="60" rx="6"> <animate attributeType="CSS" attributeName="height" values="60;20;60" begin=\'0.2s\' dur="1s" repeatCount="indefinite"/> <animate attributeType="CSS" attributeName="y" values="0;20;0" begin=\'0.2s\' dur="1s" repeatCount="indefinite"/> </rect> <rect x="40" y="0" width="10" height="60" rx="6"> <animate attributeType="CSS" attributeName="height" values="60;20;60" begin=\'0.4s\' dur="1s" repeatCount="indefinite"/> <animate attributeType="CSS" attributeName="y" values="0;20;0" begin=\'0.4s\' dur="1s" repeatCount="indefinite"/> </rect> <rect x="60" y="0" width="10" height="60" rx="6"> <animate attributeType="CSS" attributeName="height" values="60;20;60" begin=\'0.6s\' dur="1s" repeatCount="indefinite"/> <animate attributeType="CSS" attributeName="y" values="0;20;0" begin=\'0.6s\' dur="1s" repeatCount="indefinite"/> </rect> <rect x="80" y="0" width="10" height="60" rx="6"> <animate attributeType="CSS" attributeName="height" values="60;20;60" begin=\'0.8s\' dur="1s" repeatCount="indefinite"/> <animate attributeType="CSS" attributeName="y" values="0;20;0" begin=\'0.8s\' dur="1s" repeatCount="indefinite"/> </rect> </svg></div>');
		var $this = this;

		scrollLock = true;

		$loader.css({width: '100%', height: '100%', 'background': 'black', 'top': 0, left: 0, position: 'fixed', opacity: '0.25', "z-index": 1000})
		$('body').append($loader);

		return true;
	},
	disableLoader: function(){
		window.scroll = true;
		$('#loader').remove();
	}
}


export default {_position}