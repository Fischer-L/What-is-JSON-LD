(function (global) {
	
	// -- Setup -- //
	
	"use strict";
	
	if (!(global.ppt instanceof Object) || !(global.ppt.pptility instanceof Object)) throw "No global ppt/pptility obj! Check out the externaLib setup!";
	
	var ppt = global.ppt,
	
		pptility = global.ppt.pptility,
		
		_masterDBG = new pptility.cls_Master_DBG(),
		
		dbg = _masterDBG.newLocDBG(true);
	
	// !-- Setup -- //
	
	var _flag_sliding = false,
		
		_pptElem = document.querySelector(".ppt"),
		
		_CONST = {
		
			slideAnimDuration : 1000,
		
			keyCode : {
				left : 39,
				right : 37
			},
			
			classNames : {
				prevSlide : "ppt-prevSlide",
				nextSlide : "ppt-nextSlide",
				currentSlide : "ppt-currentSlide",
				slideContent : "ppt-slide-content"
			}
		};
	
	var _slides = [];
			_slides.currentIdx = 0;
		
	var _cmds = []; {
			
			_cmds.TYPE_NEXT = "slide to the next";
			
			_cmds.TYPE_PREV = "slide to the previous";
			
			_cmds.execNext = function () {
				
				if (this.length > 0) {
				
					switch (this.shift()) {						
						case this.TYPE_NEXT: ppt.next(); break;
						case this.TYPE_PREV: ppt.prev(); break;
					}
				}
			}
		}
	
	var _setPrevSlide  = function (slide) {
	
			pptility.removeClass(slide, [ ppt.CONST.classNames.nextSlide, ppt.CONST.classNames.currentSlide ]);	
			
			pptility.addClass(slide, ppt.CONST.classNames.prevSlide);
		},
		
		_setNextSlide = function (slide) {
		
			pptility.removeClass(slide, [ ppt.CONST.classNames.prevSlide, ppt.CONST.classNames.currentSlide ]);	
			
			pptility.addClass(slide, ppt.CONST.classNames.nextSlide);		
		},
		
		_setCurrentSlide = function (slide) {
		
			pptility.removeClass(slide, [ ppt.CONST.classNames.prevSlide, ppt.CONST.classNames.nextSlide ]);
			
			pptility.addClass(slide, ppt.CONST.classNames.currentSlide);		
		};
	
	ppt.CONST = {	
		classNames : _CONST.classNames
	};
	
	ppt.masterDBG = _masterDBG;
	
	ppt.addSlide = function (slide) {
		
		var elems = pptility.isArr(slide) ? slide : [slide],
		
			docFragment = document.createDocumentFragment();
		
		elems.forEach(function (e, i, es) {
			
			_slides.push(e);
			
			docFragment.appendChild(e);
		});
		
		_pptElem.appendChild(docFragment);
		
		return _slides.length;
	}
	
	ppt.play = function () {
	
		if (_slides.length > 0) {
			
			_slides.currentIdx = 0;
			
			for (var i = 1; i < _slides.length; i++) _setNextSlide(_slides[i]);
			
			_setCurrentSlide(_slides[0]);
		}
	}
	
	ppt.next = function () {

		if (_slides.currentIdx + 1 < _slides.length) { // Make sure there is next slide
			
			if (!_flag_sliding) {
							
				_flag_sliding = true;
				
				var prevIdx = _slides.currentIdx++;
				
				// Slide out the current one to become previous
				_setPrevSlide(_slides[prevIdx]);
				
				// Wait the slide out animation a little while.
				// Then, slide in the next slide.
				setTimeout(function () {
					
					var s = _slides[_slides.currentIdx];
					
					_setCurrentSlide(s);
				
				}, _CONST.slideAnimDuration / 3);
				
				// After the slide out animation is done,
				// let's do the next operation.
				setTimeout(function () {
									
					_flag_sliding = false;
					
					_cmds.execNext();
				
				}, _CONST.slideAnimDuration);					
			
								
			} else {
				// It is sliding.
				// Let's buf this next cmd for later
				_cmds.push(_cmds.TYPE_NEXT);
			}
		}
	}
	
	ppt.prev = function () {
		
		if (_slides.currentIdx - 1 >= 0) { // Make sure there is previous slide
			
			if (!_flag_sliding) {				
			
				_flag_sliding = true;
				
				var nextIdx = _slides.currentIdx--;
				
				// Slide out the current one to become next
				_setNextSlide(_slides[nextIdx]);
				
				// Wait the slide out animation a little while.
				// Then, slide in the previous slide.
				setTimeout(function () {
					
					var s = _slides[_slides.currentIdx];
					
					_setCurrentSlide(s);
				
				}, _CONST.slideAnimDuration / 3);
				
				// After the slide out animation is done,
				// let's do the next operation.
				setTimeout(function () {
									
					_flag_sliding = false;
					
					_cmds.execNext();
				
				}, _CONST.slideAnimDuration);	
								
			} else {
				// It is sliding.
				// Let's buf this next cmd for later
				_cmds.push(_cmds.TYPE_PREV);
			}
		}
	}
	
	// -- Init -- //
	
	pptility.addEvt(document, "keyup", function (e) {
		
		switch (e.keyCode) {		
			case _CONST.keyCode.left:  ppt.next(); break;
			case _CONST.keyCode.right: ppt.prev(); break;
		}
	});
	
	// !-- Init -- //
	
}(window));