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
							 formatHTML(React.createElement("a", {href: "xyz.html"}, "The Shawshank Redemption")) 
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
							 formatHTML(React.createElement("a", {id: "movie", href: "xyz.html"}, "The Shawshank Redemption")) 
						)
					)
				)
			});
	
			slideData.push({
			
				title : "And what are these ?",
				
				content : (
					React.createElement("div", {className: "grid-parent grid-100"}, 
					
						React.createElement("code", {className: "grid-50"}, 
							"{", React.createElement("br", null), 
								"\"name\" : \"Jeremy Lin\",", React.createElement("br", null), 
								"\"phone\" : \"123-456-789\"", React.createElement("br", null), 
							"}"
						), 
						
						React.createElement("code", {className: "grid-50"}, 
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
								"\"phone\" / \"tel\" : \"123-456-789\"", React.createElement("br", null), 
							"}"
						)						
					)
				)
			});

			slideData.push({
			
				title : "The current web",
				
				content : (
					React.createElement("div", {className: "lyt-centerContent"}, 
					
						React.createElement("p", {className: "lyt-margin-top-20x lyt-margin-bottom-10x"}, 
							"Follow ", React.createElement("span", {className: "sty-highlight"}, "LINKs"), " in the HTML"
						), 
						
						React.createElement("code", {className: "sty-font-italic"}, 
							 formatHTML(React.createElement("span", null, "Frank Darabont")), 
							React.createElement("br", null), 
							 formatHTML(React.createElement("a", {href: "xyz.html"}, "The Shawshank Redemption")) 
						), 
						
						React.createElement("p", {className: "lyt-margin-top-40x lyt-margin-bottom-10x"}, 
							"Exchange data thru ", React.createElement("span", {className: "sty-highlight"}, "JSON")
						), 
						
						React.createElement("code", {className: "sty-font-italic"}, 
							"{", React.createElement("br", null), 
								"\"name\" : \"Jeremy Lin\",", React.createElement("br", null), 
								"\"tel\" : \"123-456-789\"", React.createElement("br", null), 
							"}"
						)
						
					)
				)
			});

			slideData.push({
			
				title : "Ambiguity",
				
				content : (
					React.createElement("div", {className: "lyt-centerContent"}, 
						React.createElement("code", {className: "lyt-margin-bottom-20x"}, 
							"{", React.createElement("br", null), 
								React.createElement("span", {className: "sty-highlight"}, "name : \"Jeremy Lin\""), ", page : \"http://linsanity.com\"", 
							React.createElement("br", null), "}"
						), 
						React.createElement("code", null, 
							"{", React.createElement("br", null), 
								React.createElement("span", {className: "sty-highlight"}, "name : \"Linsanity\""), ", page : \"http://linsanity.com\"", 
							React.createElement("br", null), "}"
						)
					)
				)
			});
			
			slideData.push({
			
				title : "Difficult for computer",
				
				content : (
					React.createElement("div", {className: "lyt-centerContent lyt-margin-top-20x"}, 
						React.createElement("img", {src: "./img/sad_computer.png"})
					)
				)
			});

			slideData.push({
			
				title : "Computer loves this",
				
				content : (
					React.createElement("div", {className: "lyt-centerContent lyt-margin-top-10x"}, 
						React.createElement("code", null, 
							"{", React.createElement("br", null), 
								React.createElement("span", {className: "sty-highlight"}, "\"https://schema.org/name\""), " : \"Linsanity\",", 
								React.createElement("br", null), 
								React.createElement("span", {className: "sty-highlight"}, "\"https://schema.org/WebPage\""), " : \"http://linsanity.com\"", 
							React.createElement("br", null), "}"
						)
					)
				)
			});

			slideData.push({
			
				title : "Computer friendly language !?",
				
				content : (
					React.createElement("div", {className: "lyt-centerContent lyt-margin-top-20x"}, 
						React.createElement("img", {src: "./img/help_computer.jpg"})
					)
				)
			});

			slideData.push({
			
				title : "RDF",
				
				content : (
					React.createElement("div", {className: "lyt-centerContent lyt-margin-top-20x"}, 
						React.createElement("a", {href: "http://www.w3.org/RDF/"}, "Resource Description Framework")
					)
				)
			});

			slideData.push({
			
				title : "How to express ?",
				
				content : (
					React.createElement("div", {className: "lyt-centerContent lyt-margin-top-20x"}, 
						React.createElement("img", {src: "./img/graph_for_human.png"})
					)
				)
			});

			slideData.push({
			
				title : "Graph",
				
				content : (
					React.createElement("div", {className: "lyt-centerContent lyt-margin-top-20x"}, 
						React.createElement("img", {src: "./img/graph_for_computer.png"})
					)
				)
			});

			slideData.push({
			
				title : "RDF statement",
				
				content : (
					React.createElement("div", {className: "lyt-centerContent lyt-margin-top-20x"}, 
					
						React.createElement("p", {className: "lyt-margin-bottom-20x"}, 
							"Subject - Predicate - Object"
						), 
					
						React.createElement("p", null, 
							"\"Lin plays basketball\""
						)
						
					)
				)
			});

			slideData.push({
			
				title : "Structured data",
				
				content : (
					React.createElement("div", {className: "grid-container grid-parent grid-100 mobile-grid-100 lyt-margin-top-20x"}, 

						React.createElement("div", {className: "grid-50 mobile-grid-100 lyt-centerContent lyt-mobile-margin-bottom-25x"}, 
							
							React.createElement("div", {className: "lyt-margin-bottom-15x"}, "Schema.org"), 

							React.createElement("a", {href: "https://schema.org/"}, 
								React.createElement("img", {src: "./img/schema_logo.jpg", 								
									 className: "lyt-centerBlock", 									 
									 style:  {
										width : "80%",
										minWidth : "200px"
									 } }
								)
							)

						), 

						React.createElement("div", {className: "grid-50 mobile-grid-100 lyt-centerContent"}, 
							
							React.createElement("div", {className: "lyt-margin-bottom-15x"}, "FOAF"), 
							
							React.createElement("a", {href: "http://www.foaf-project.org/"}, 
								React.createElement("img", {src: "./img/foaf_logo.png", 
									 className: "lyt-centerBlock", 
									 style:  {
										width : "80%",
										minWidth : "200px"
									 } }
								)
							)

						)
						
					)
				)
			});
			
env_dbg.dPoint=

			slideData.push({
			
				title : "Linked Data",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("span", null, 
							"Data linked by" + ' ' +
							" ", 
							React.createElement("span", {className: "sty-highlight"}, "Algorithm"), 
							"with",  
							React.createElement("span", {className: "sty-highlight"}, "Data Structure")
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