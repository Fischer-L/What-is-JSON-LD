(function (global) {

	"use strict";
	
	if (!(global.ppt instanceof Object) || !(global.ppt.pptility instanceof Object)) throw "No global ppt/pptility obj! Check out the externaLib setup!";
	
	var ppt = global.ppt,
		pptility = global.ppt.pptility;
	
	
	var _pptElem = document.querySelector(".ppt");
	
	var _slides = [];
		_slides.currentIdx = 0;
	
	ppt.CONST = {
	
		classNames : {
			prevSlide : "ppt-prevSlide",
			nextSlide : "ppt-nextSlide",
			currentSlide : "ppt-currentSlide",
			slideContent : "ppt-slide-content"
			// slideFooterCount	
		}
	};
	
	ppt.masterDBG = new pptility.cls_Master_DBG();
	
	ppt.addSlide = function (reactSlide) {
		
		var slide = React.render(reactSlide, document.createElement("div"));
		
		_slides.push(slide);
		
		_pptElem.appendChild(slide.getDOMNode());
		
		return _slides.length;
	}
	
	ppt.play = function () {
	
		if (_slides.length > 0) {
		
			_slides.currentIdx = 0;
			
			_slides[0].setState({ status : this.CONST.classNames.currentSlide });
		}
	}
		
}(window));