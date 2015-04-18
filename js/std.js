(function (global) {

	"use strict";
	
	if (!(global.ppt instanceof Object) || !(global.ppt.pptility instanceof Object)) throw "No global ppt/pptility obj! Check out the externaLib setup!";
	
	var ppt = global.ppt,
		pptility = global.ppt.pptility;
	
	var _CONST = {
		
			classNames : {
				// prevSlide
				// nextSlide
				// slideContent
				// slideFooterCount
			}
		},
		
		_pptElem = document.querySelector(".ppt");
	
	var _slides = [];
		_slides.currentIdx = 0;
	
	ppt.DBG = new pptility.cls_Master_DBG(null);
	
	ppt.addSlide = function (slide) {
		_slides.push(slide);
	}
	
	
	
}(window));