/**
 * 
 */
(function (global) {

	// -- Setup -- //
	
	"use strict";
	
	var webpptCtrl = {},
			
		pptility = {
	
		/*	Func:
				From John Resig.
				Mitigate the differences of the event obj between browsers. Use this function in the event handler.
			Arg:
				<OBJ> event = the event obj
			Return:
				<OBJ> the normalized event obj
		*/
		normalizeEvt : function normalizeEvt(event) {

			function returnTrue() { return true; } 	
			function returnFalse() { return false; }
			
			if (!event || !event.stopPropagation) {
			
				var old = event || window.event;
				
				// Clone the old object so that we can modify the values
				event = {};
				for (var prop in old) { 
					event[prop] = old[prop];
				}
				
				// The event occurred on this element
				if (!event.target) {
					event.target = event.srcElement || document;
				}
				
				// Handle which other element the event is related to
				event.relatedTarget = event.fromElement === event.target ?
				event.toElement :
				event.fromElement;
				
				// Stop the default browser action
				event.preventDefault = function () {
					event.returnValue = false;
					event.isDefaultPrevented = returnTrue;
				};
				event.isDefaultPrevented = returnFalse;
					
				// Stop the event from bubbling
				event.stopPropagation = function () {
					event.cancelBubble = true;
					event.isPropagationStopped = returnTrue;
				};
				event.isPropagationStopped = returnFalse;
				
				// Stop the event from bubbling and executing other handlers
				event.stopImmediatePropagation = function () {
					this.isImmediatePropagationStopped = returnTrue;
					this.stopPropagation();
				};
				event.isImmediatePropagationStopped = returnFalse;
				
				// Handle mouse position
				if (event.clientX != null) {
				
					var doc = document.documentElement, body = document.body;
					
					event.pageX = event.clientX +
								  (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
								  (doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = event.clientY +
								  (doc && doc.scrollTop || body && body.scrollTop || 0) -
								  (doc && doc.clientTop || body && body.clientTop || 0);
				}
				
				// Handle key presses
				event.which = event.charCode || event.keyCode;
				
				// Fix button for mouse clicks:
				// 0 == left; 1 == middle; 2 == right
				if (event.button != null) {
					event.button =  event.button & 1 ?
									0 : event.button & 4 ?
									1 : event.button & 2 ? 
									2 : 0;
				}
			}
			
			return event; 
		},

		/*	Func: Mitigate the addEventListener & attachEvent methods
			Arg:
				<ELM> elem = the DOM elem into which the event is being added
				<STR> evt = the event name, as per the normal addEventListener method
				<FN> eHandle = the event handle
			Return:
				<FN> The handle to the event handler (Use this for removing event).
		*/
		addEvt : function addEvt(elem, evt, eHandle) {
			
			var normalizeEvt = this.normalizeEvt;
			
			function proxyHandle(e) {
				return eHandle.call(elem, normalizeEvt(e));
			};
			
			if (elem.addEventListener) {
				elem.addEventListener(evt, proxyHandle);
			} else if (elem.attachEvent) { // The IE 8 case
				elem.attachEvent("on" + evt, proxyHandle);
			}
			
			return proxyHandle;
		},

		/*	Func: Mitigate the removeEventListener & detachEvent methods
			Arg: Refer to addEvt
		*/
		rmEvent : function rmEvent(elem, evt, eHandle) {
			if (elem.removeEventListener) {
				elem.removeEventListener(evt, eHandle);
			} else if (elem.detachEvent) { // The IE 8 case
				elem.detachEvent("on" + evt, eHandle);
			}
		},

		/*	Arg:
				<*> target = the target to test
			Return:
				@ OK: true
				@ NG: false
		*/
		isStr : function isStr(target) {
			return (typeof target == "string");
		},

		/*	Arg:
				<*> target = the target to test
			Return:
				@ OK: true
				@ NG: false
		*/
		isNum : function isNum(target) {
			return (typeof target == "number");
		},
		
		/*	Arg:
				<*> target = the target to test
			Return:
				@ OK: true
				@ NG: false
		*/
		isFunc : function isFunc(target) {
			return (typeof target == "function");
		},

		/*	Arg:
				<*> target = the target to test
			Return:
				@ OK: true
				@ NG: false
		*/		
		isObj : function isObj(target) {
			return (target instanceof Object);
		},

		/*	Arg:
				<*> target = the target to test
			Return:
				@ OK: true (text node is counted as well)
				@ NG: false
		*/		
		isHTMLElem : function isHTMLElem(target) {
			return (   target
					&& typeof target == "object"
					&& typeof target.nodeType == "number"
					&& (target.nodeType === 1 || target.nodeType === 3)
				   );
		},

		/*	Arg:
				<*> target = the target to test
			Return:
				@ OK: true
				@ NG: false
		*/	
		isArr : function isArr(target) {
			return (target instanceof Array);
		},

		/*	Arg:
				<*> target = the target to test
			Return:
				@ OK: true
				@ NG: false
		*/	
		isDate : function isDate(target) {
			return (target instanceof Date);
		},
 
		/*	Func:
				Format string. Fox example, formaStr("{0} can {1}.", "Bird", "fly") returns "Bird can fly"
			Arg:
				<STR> The 1st arg is the base string to format
				<STR|NUM> The rest of args are values supplied into the base string
			Return:
				<STR> The formatted string
		*/
		formaStr : function formaStr() { // From : http://jsfiddle.net/joquery/9KYaQ/

			// The string containing the format items (e.g. "{0}")
			// will and always has to be the first argument.
			var theString = arguments[0];
			
			// start with the second argument (i = 1)
			for (var i = 1; i < arguments.length; i++) {
				// "gm" = RegEx options for Global search (more than one instance)
				// and for Multiline search
				var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
				theString = theString.replace(regEx, arguments[i]);
			}
			
			return theString;
		},

		/*	Func:
				Find out if the specified CSS classes exist in the target element's className attribute
			Arg:
				<STR|ELM> target = the test target, could be the class of dom element or the dom element
				<STR|ARR> className = classes to test in a string seperated by " " or in an array
			Return:
				@ Having: true
				@ Not having: false
		*/
		hasClass : function hasClass(target, className) {
			var has = false,
				elemClass = this.isHTMLElem(target) ? target.className : target;
			
			if (typeof elemClass == "string" && elemClass) {
				
				className = (typeof className == "string") ? className.split(" ") : className;
				
				if (className instanceof Array) {
				
					has = true;
					elemClass = " " + elemClass + " ";	
					
					for (var i = 0; i < className.length; i++) {
						if (typeof className[i] == "string") {
							if (elemClass.search(" " + className[i] + " ") < 0) {
								has = false;
								break;
							}
						}
					}
				}
			}
			return has;
		},

		/*	Func:
				Add some CSS classes into one element's className attribute
			Arg:
				<ELM> elem = the target element which is being added classes
				<STR|ARR> newClasseses = the new classes to add, if multiple, seperated by " " or put in an array
			Return:
				@ OK: the newly added classes in an array
				@ NG: false
		*/
		addClass : function addClass(elem, newClasses) {
			var addedClasses = [],
				thisClass = elem.className;
				
			newClasses = this.isStr(newClasses) ? newClasses.split(" ") : newClasses;
			
			if (this.isArr(newClasses)) {
				for (var i = 0, j = newClasses.length; i < j; i++) {
					if (!this.hasClass(thisClass, newClasses[i]) ) {
						thisClass += " " + newClasses[i];
						addedClasses.push(newClasses[i]);
					}
				}
			}
			
			if (addedClasses.length > 0) {
				elem.className = thisClass.trim();
				return addedClasses;
			} else {
				return false;
			}
		},

		/*	Func:
				Remove some CSS classes from one element's className attribute
			Arg:
				<ELM> elem = the target element whose classes are being removed
				<STR|ARR> classes = the classes to remove, if multiple, seperated by " " or put in an array
			Return:
				@ OK: the removed classes in an array
				@ NG: false
		*/
		removeClass : function removeClass(elem, classes) {
			var removedClasses = [],
				thisClass = " " + elem.className + " ";
			
			classes = this.isStr(classes) ? classes.split(" ") : classes;
			
			if (this.isArr(classes)) {
				for (var i = 0, j = classes.length; i < j; i++) {
					if (this.hasClass(thisClass, classes[i]) ) {
						thisClass = thisClass.replace(" " + classes[i] + " ", " ");
						removedClasses.push(classes[i]);
					}
				}
			}

			if (removedClasses.length > 0) {
				elem.className = thisClass.trim();
				return removedClasses;
			} else {
				return false;
			}
		},
		
		/*	Func:
				A master debug mode controller class.
			Properties:
				[ Private ]
				<BOO> _flag_masterDBG = the master debug flag. If being set to true or false, would override all local debug mode flags. If undefined, would allow all local debug mode controllers to take controls.
				<CLS> _cls_Local_DBG = the local debug mode controller class.
			Methods:
				[ Public ]
				<FN> newLocDBG = new one instance of this::_cls_Local_DBG
		*/
		cls_Master_DBG : (function () {
			
			/*	Properties:
					[ Private ]
					<BOO> __flag_locDBG = the local debig mode flag
				Methods:
					[ Public ]
					> isDBG : Tell the debug mode
					> log, warn, error = Equal to call console.log/warn/error but only works under the debug mode on.
				-----------------------------------
				Constructor:
					Arg:
						> dbg = refer to this::__flag_locDBG
			*/
			function _cls_Local_DBG(dbg) {
			
				var __flag_locDBG = !!dbg;
				
				/*	Return:
						@ ON: true
						@ OFF: false
				*/
				this.isDBG = function () {			
					return (_flag_masterDBG === true || _flag_masterDBG === false) ? _flag_masterDBG : __flag_locDBG;
				}
			}
					_cls_Local_DBG.prototype.log = function () {			
						if (this.isDBG()) return console.log.apply(console, Array.prototype.slice.apply(arguments));
					}
					
					_cls_Local_DBG.prototype.warn = function () {			
						if (this.isDBG()) return console.warn.apply(console, Array.prototype.slice.apply(arguments));
					}
					
					_cls_Local_DBG.prototype.error = function () {			
						if (this.isDBG()) return console.error.apply(console, Array.prototype.slice.apply(arguments));
					}
						
			var _flag_masterDBG;
			
			/*	Arg:
					> dbg = refer to this::_flag_masterDBG
			*/
			function cls_Master_DBG(dbg) {
				_flag_masterDBG = (dbg === undefined) ? undefined : !!dbg;
			}
					/*	Arg:
							> dbg = refer to this::_cls_Local_DBG
						Return:
							<OBJ> this::_cls_Local_DBG
					*/
					cls_Master_DBG.prototype.newLocDBG = function (dbg) {
						return new _cls_Local_DBG(dbg);
					}
			
			return cls_Master_DBG;			
		}())
	};
	
	// !-- Setup -- //
	
	
	
	var _CONST = {
		
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
		},
		
		_flag_sliding = false,
		
		_pptRoot,
		
		_pptElem;
	
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
			
			_cmds.clear = function () {
				_cmds.splice(0, _cmds.length);
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
		},
		
		_slidePPT = function (cmdType) {
			
			if (cmdType == _cmds.TYPE_NEXT) {
				
				if (_slides.currentIdx + 1 < _slides.length) {
					// Make sure there is next slide				
				} else {
					cmdType = undefined;
				}
				
			} else if (cmdType == _cmds.TYPE_PREV) {
				
				if (_slides.currentIdx - 1 >= 0) {
					// Make sure there is previous slide				
				} else {
					cmdType = undefined;
				}
				
			} else {
				cmdType = undefined;
			}
			
			if (!cmdType) {
				
				// If no cmdType, it should be that no more next/prevous slide.
				// Let's clear buffered cmds
				_cmds.clear();
			
			} else {
				
				if (!_flag_sliding) {
									
					_flag_sliding = true;
					
					if (cmdType == _cmds.TYPE_NEXT) {
						
						// Slide out the current one to become previous
						_setPrevSlide(_slides[_slides.currentIdx++]);
					
					} else if (cmdType == _cmds.TYPE_PREV) {
						
						// Slide out the current one to become next
						_setNextSlide(_slides[_slides.currentIdx--]);
					}
						
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
					_cmds.push(cmdType);
				}
			}
		};
	
	var _webppt = {
	
			addSlide : function (slide) {
				
				var elems = pptility.isArr(slide) ? slide : [slide],
				
					docFragment = document.createDocumentFragment();
				
				elems.forEach(function (e, i, es) {
					
					if (pptility.isHTMLElem(e)) {
					
						_slides.push(e);
						
						docFragment.appendChild(e);
					}
				});
				
				_pptElem.appendChild(docFragment);
				
				return _slides.length;
			},
			
			play : function (start) {
			
				if (_slides.length > 0) {
					
					start = Math.min(_slides.length - 1, Math.max(0, start));
					
					_slides.currentIdx = isNaN(start) ? 0 : start;
					
					for (var i = 0; i < _slides.length; i++) _setNextSlide(_slides[i]);
					
					_setCurrentSlide(_slides.currentIdx);
				}
			},
			
			next : function () {
				_slidePPT(_cmds.TYPE_NEXT);
			},
			
			prev : function () {
				_slidePPT(_cmds.TYPE_PREV);
			}
		};
	
	
}(window));