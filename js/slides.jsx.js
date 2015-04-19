(function (global, React) {

	"use strict";
	
	var ppt = global.ppt,
	
		pptility = global.ppt.pptility,
		
		env_dbg = ppt.masterDBG.newLocDBG(true),
		
		env_classNames = ppt.CONST.classNames,
		
		formatHTML = function (v) {	
		
			return React.renderToStaticMarkup(v);
		};
	
	var mkPPTSlideClass = function () {
		
			/*	React props:
					<OBJ> _render = { // The obj holding vars for rendering, should not be present on the HTML element attribute
							<NUM> [slideCount] = the count number of this slide				
							<ReactClass> slideContent = the slide content
						}
				React state:
					<STR> status = the status of this slide, say, being viewed, previous slide or next slide. Refer to the CSS classNames for the valid value.
			*/
			var PPT_Slide = React.createClass({displayName: "PPT_Slide",
				
					getInitialState : function () {
						
						return {
							status : env_classNames.nextSlide					
						};
					},
					
					render : function () {
						
						var cls, title, count, content;
						
						cls = "ppt-slide ";
						switch (this.state.status) {
							case env_classNames.prevSlide:    cls += env_classNames.prevSlide; break;
							case env_classNames.nextSlide:    cls += env_classNames.nextSlide; break;
							case env_classNames.currentSlide: cls += env_classNames.currentSlide; break;
						}
						
						title = pptility.isStr(this.props._render.slideTitle) ? this.props._render.slideTitle : "";
						
						count = pptility.isNum(this.props._render.slideCount) ? this.props._render.slideCount : "";
												
						return (
							React.createElement("section", {className: cls}, 
								
								React.createElement("h3", {className: "ppt-slide-title"}, title), 
								
								React.createElement("p", {className: "ppt-slide-content"}), 
								
								React.createElement("aside", {className: "ppt-slide-footer"}, 
									React.createElement("span", {className: "ppt-slide-footer-count"}, count)
								)
								
							)
						);
					},
					
					componentDidMount : function () {
						
						var slide = React.findDOMNode(this);
						
						React.render(
							this.props._render.slideContent, slide.querySelector("." + env_classNames.slideContent)
						);
					}
			});
			
			return PPT_Slide;
		};
	
	var slideData = []; {
		
			env_dbg.dPoint = // env_dbg.dPoint marks the starting point for debugging slides 	
			slideData.push({
			
				title : "JSON-LD",
				
				content : (
					React.createElement("div", {className: "lyt-centerContent"}, 						
						React.createElement("div", {className: "lyt-margin-bottom-20x"}, 
							"Fischer @ ", React.createElement("a", {href: "https://github.com/Fischer-L"}, "https://github.com/Fischer-L")
						), 
						"2015.04"
					)
				)
			});
	
			slideData.push({
			
				title : "What is this ?",
				
				content : (
					React.createElement("div", null, 
						React.createElement("code", null, 
							 formatHTML(React.createElement("span", null, "Frank Darabont")), 
							React.createElement("br", null), 
							 formatHTML(React.createElement("span", null, "The Shawshank Redemption")) 
						)
					)
				)
			});
	
			slideData.push({
			
				title : "This is",
				
				content : (
					React.createElement("div", null, 
						React.createElement("code", null, 
							 formatHTML(React.createElement("span", {id: "director"}, "Frank Darabont")), 
							React.createElement("br", null), 
							 formatHTML(React.createElement("span", {id: "movie"}, "The Shawshank Redemption")) 
						)
					)
				)
			});
	
			env_dbg.dPoint = slideData.push({
			
				title : "And what are these ?",
				
				content : (
					React.createElement("div", {className: "grid-parent grid-100"}, 
					
						React.createElement("code", {className: "grid-50 sty-font-size-s"}, 
							"{", React.createElement("br", null), 
								"\"name\" : \"Jeremy Lin\",", React.createElement("br", null), 
								"\"phone\" : \"123-456-789\"", React.createElement("br", null), 
							"}"
						), 
						
						React.createElement("code", {className: "grid-50 sty-font-size-s"}, 
							"{", React.createElement("br", null), 
								"\"name\" : \"Jeremy Lin\",", React.createElement("br", null), 
								"\"tel\" : \"123-456-789\"", React.createElement("br", null), 
							"}"
						)
						
					)
				)
			});
	
			slideData.push({
			
				title : "These are",
				
				content : (
					React.createElement("div", null, 					
						React.createElement("code", null, 
							"{", React.createElement("br", null), 
								"\"name\" : \"Jeremy Lin\",", React.createElement("br", null), 
								"\"phone/tel\" : \"123-456-789\"", React.createElement("br", null), 
							"}"
						)						
					)
				)
			});
		}
	
	var i = env_dbg.isDBG() ? env_dbg.dPoint - 1 : 0,
		
		com,
		
		slides = [],
		
		div = document.createElement("div");
	
	for (; i < slideData.length; i++) {
		
		com = React.render(React.createElement(
		
			mkPPTSlideClass(),
			
			{
				_render : {
					slideTitle : slideData[i].title,	
					slideContent : slideData[i].content,
					slideCount : (i == 0) ? null : i
				}
			}
		), div);
		
		slides.push(com.getDOMNode().cloneNode(true));
	}
	
	ppt.addSlide(slides);
	
}(window, React));