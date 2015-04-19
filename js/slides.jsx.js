(function (global, React) {

	"use strict";
	
	var ppt = global.ppt,
	
		pptility = global.ppt.pptility,
		
		env_dbg = ppt.masterDBG.newLocDBG(true),
		
		env_classNames = ppt.CONST.classNames,
		
		formatoHTML = function (reactElem) {		
			return React.renderToStaticMarkup(reactElem);
		},
		
		objHead = function (lv) {
		
			if (!pptility.isNum(lv)) lv = 0;
		
			return (React.createElement("div", null, tab(lv, ""), "{"));
		},
		
		objEnd = function (lv, trailingComma) {
			
			if (!pptility.isNum(lv)) lv = 0;
			
			trailingComma = (trailingComma === ",") ? "," : null;
			
			return (React.createElement("div", null, tab(lv, ""), "}", trailingComma));
		},
		
		arrHead = function (lv) {
		
			if (!pptility.isNum(lv)) lv = 0;
		
			return (React.createElement("div", null, tab(lv, ""), "["));		
		},
		
		arrEnd = function (lv, trailingComma) {
			
			if (!pptility.isNum(lv)) lv = 0;
			
			trailingComma = (trailingComma === ",") ? "," : null;
			
			return (React.createElement("div", null, tab(lv, ""), "]", trailingComma));
		
		},
		
		tab = function (lv, content) {
			
			var tab = [];
			
			for (lv--; lv >= 0; lv--) { // No tab for the lv 0
				tab.push( React.createElement("span", null, "    ") );
			}
			
			if (tab.length <= 0) tab = null;
			
			return ( React.createElement("span", null, tab, content) );
		},
		
		comment = function(lv, str) {
		
			var span = ( React.createElement("span", {className: "sty-comment"}, tab(lv, ""), "// ", str) );	

			return newLine(0, span);			
		},
		
		highlit = function (lv, str, trailingComma) {
			
			var span = ( React.createElement("span", {className: "sty-highlight"}, tab(lv, ""), str) );
			
			return newLine(0, span, trailingComma);
		},
		
		newLine = function (lv, content, trailingComma) {
			
			content = tab(lv, content);
			
			if (trailingComma !== ",") trailingComma = null;
		
			return ( React.createElement("div", null, content, trailingComma) );			
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
							 formatoHTML(React.createElement("span", null, "Frank Darabont")), 
							React.createElement("br", null), 
							 formatoHTML(React.createElement("a", {href: "xyz.html"}, "The Shawshank Redemption")) 
						)
					)
				)
			});
	
			slideData.push({
			
				title : "This is",
				
				content : (
					React.createElement("div", null, 
						React.createElement("code", null, 
							 formatoHTML(React.createElement("span", {id: "director"}, "Frank Darabont")), 
							React.createElement("br", null), 
							 formatoHTML(React.createElement("a", {id: "movie", href: "xyz.html"}, "The Shawshank Redemption")) 
						)
					)
				)
			});
	
			slideData.push({
			
				title : "And what are these ?",
				
				content : (
					React.createElement("div", {className: "grid-parent grid-100"}, 
					
						React.createElement("code", {className: "grid-50"}, 
							 objHead(), 
								"\"name\" : \"Jeremy Lin\",", React.createElement("br", null), 
								"\"phone\" : \"123-456-789\"", 
							 objEnd() 
						), 
						
						React.createElement("code", {className: "grid-50"}, 
							 objHead(), 
								"\"name\" : \"Jeremy Lin\",", React.createElement("br", null), 
								"\"tel\" : \"123-456-789\"", 
							 objEnd() 
						)
						
					)
				)
			});
	
			slideData.push({
			
				title : "These are",
				
				content : (
					React.createElement("div", null, 					
						React.createElement("code", null, 
							 objHead(), 
								"\"name\" : \"Jeremy Lin\",", React.createElement("br", null), 
								"\"phone\" / \"tel\" : \"123-456-789\"", 
							 objEnd() 
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
							 formatoHTML(React.createElement("span", null, "Frank Darabont")), 
							React.createElement("br", null), 
							 formatoHTML(React.createElement("a", {href: "xyz.html"}, "The Shawshank Redemption")) 
						), 
						
						React.createElement("p", {className: "lyt-margin-top-40x lyt-margin-bottom-10x"}, 
							"Exchange data thru ", React.createElement("span", {className: "sty-highlight"}, "JSON")
						), 
						
						React.createElement("code", {className: "sty-font-italic"}, 
							 objHead(), 
								"\"name\" : \"Jeremy Lin\",", React.createElement("br", null), 
								"\"tel\" : \"123-456-789\"", 
							 objEnd() 
						)
						
					)
				)
			});

			slideData.push({
			
				title : "Ambiguity",
				
				content : (
					React.createElement("div", {className: "lyt-centerContent"}, 
						React.createElement("code", {className: "lyt-margin-bottom-20x"}, 
							 objHead(), 
								React.createElement("span", {className: "sty-highlight"}, "name : \"Jeremy Lin\""), ", page : \"http://linsanity.com\"", 
							 objEnd() 
						), 
						React.createElement("code", null, 
							 objHead(), 
								React.createElement("span", {className: "sty-highlight"}, "name : \"Linsanity\""), ", page : \"http://linsanity.com\"", 
							 objEnd() 
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
							 objHead(), 
								React.createElement("span", {className: "sty-highlight"}, "\"https://schema.org/name\""), " : \"Linsanity\",", 
								React.createElement("br", null), 
								React.createElement("span", {className: "sty-highlight"}, "\"https://schema.org/WebPage\""), " : \"http://linsanity.com\"", 
							 objEnd() 
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
								React.createElement("img", {src: "./img/schema_logo.jpg", className: "lyt-centerImg"})
							)

						), 

						React.createElement("div", {className: "grid-50 mobile-grid-100 lyt-centerContent"}, 
							
							React.createElement("div", {className: "lyt-margin-bottom-15x"}, "FOAF"), 
							
							React.createElement("a", {href: "http://www.foaf-project.org/"}, 
								React.createElement("img", {src: "./img/foaf_logo.png", className: "lyt-centerImg"})
							)

						)
						
					)
				)
			});

			slideData.push({
			
				title : "Linked Data",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("span", null, 
							"Data linked by" + ' ' +
							" ", 
							React.createElement("span", {className: "sty-highlight"}, "Algorithm"), 
							" " + ' ' +
							"with" + ' ' + 
							" ", 
							React.createElement("span", {className: "sty-highlight"}, "Data Structure")
						)
					)
				)
			});

			slideData.push({
			
				title : "Linking Data by JSON",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x"}, 							
						React.createElement("a", {href: "http://json-ld.org/"}, 
							React.createElement("img", {src: "./img/json_ld_logo_0.png", 
							     className: "lyt-centerImg", 
								 style: {
									width : "250px"
								 }}
							)
						)
					)
				)
			});

			slideData.push({
			
				title : "Context",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("span", null, "Do you know ", React.createElement("a", {href: "https://en.wikipedia.org/wiki/LSB"}, "LSB"), " ?")
					)
				)
			});

			slideData.push({
			
				title : "Context",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("code", null, 
							 objHead(), 
								React.createElement("span", {className: "sty-comment"}, "// Our context is the person.jsonld file"), 
							React.createElement("br", null), 
								"\"@context\" : ", React.createElement("a", {href: "./docs/person.jsonld"}, "\"http://foo.com/docs/person.jsonld\""), 
							React.createElement("br", null), 
								"\"name\" : \"Jeremy Lin\",", 
							React.createElement("br", null), 
								"\"email\" : \"jeremy.lin@example.com\"", 
							 objEnd() 
						)
					)
				)
			});

			slideData.push({
			
				title : "Compact IRI",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("code", null, 
							 objHead(), 
								
								 newLine(0, "\"@context\" :"), 
								
									 objHead(1), 
									
										 newLine(1, "\"foaf\" : \"http://xmlns.com/foaf/0.1/\""), 
									
									 objEnd(1, ","), 
								
								 comment(0, "\"@type\" : \"http://xmlns.com/foaf/0.1/Person\""), 
								 newLine(0, "\"@type\": \"foaf:Person\"", ","), 
								
								 comment(0, "\"http://xmlns.com/foaf/0.1/name\" : \"Jeremy Lin\""), 
								 newLine(0, "\"foaf:name\" : \"Jeremy Lin\""), 
								
							 objEnd() 
						)
					)
				)
			});

			slideData.push({
			
				title : "Type",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("code", null, 
							 objHead(), 
								
								 newLine(1, "\"@context\" :"), 
								
									 objHead(1), 
									
										 newLine(2, "\"foaf\" : \"http://xmlns.com/foaf/0.1/\""), 
									
									 objEnd(1, ","), 
								
								 comment(1, "The data type is Person"), 
								 highlit(1, "\"@type\": \"foaf:Person\"", ","), 
								
								 newLine(1, "\"foaf:name\" : \"Jeremy Lin\""), 
								
							 objEnd() 
						)
					)
				)
			});

			slideData.push({
			
				title : "Type",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("code", null, 
							 objHead(), 
								
								 newLine(1, "\"@context\" :"), 
								
									 objHead(1), 
									
										 newLine(2, "\"xsd\": \"http://www.w3.org/2001/XMLSchema#\"", ","), 									
										 newLine(2, "..."), 
										
									 objEnd(1, ","), 
								
								 newLine(1, "\"birthday\" :"), 
								
									 objHead(1), 
										
										 newLine(2, "\"@value\" : \"2000-01-01\"", ","), 
										 highlit(2, "\"@type\" : \"xsd:date\""), 
										
									 objEnd(1), 
								
							 objEnd() 
						)
					)
				)
			});

			slideData.push({
			
				title : "Type coercion",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("code", null, 
							 objHead(), 
								
								 newLine(1, "\"@context\" :"), 
								
									 objHead(1), 
										
										 highlit(2, "\"birthday\" :"), 
											
											 objHead(2), 
												
												 newLine(3, "\"@id\" : \"https://schema.org/birthDate\"", ","), 												
												 newLine(3, "\"@type\" : \"https://schema.org/birthDate\""), 
												
											 objEnd(2, ","), 
										
									 objEnd(1, ","), 
								
								 highlit(1, "\"birthday\" : \"2000-01-01\""), 
								
							 objEnd() 
						)
					)
				)
			});

			slideData.push({
			
				title : "Keyword Aliasing",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("code", null, 
							 objHead(), 
								
								 newLine(1, "\"@context\" :"), 
								
									 objHead(1), 
										
										 highlit(2, "\"url\": \"@id\"", ","), 
										 newLine(2, "..."), 
										
									 objEnd(1, ","), 
								
								 highlit(1, "\"url\" : \"http://foo.com/jeremy_lin\"", ","), 
								 newLine(1, "\"name\" : \"Jeremy Lin\""), 
								
							 objEnd() 
						)
					)
				)
			});	

			slideData.push({
			
				title : "Language",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("code", null, 
							 objHead(), 
								
								 newLine(1, "\"@context\" : ...", ","), 
								
								 newLine(1, "\"name\" :"), 
									
									 objHead(1), 
										
										 newLine(2, "\"@value\" : \"たなか まさひろ\"", ","), 
										
										 comment(2, "BCP-47"), 
										 highlit(2, "\"@language\" : \"jp\""), 
										
									 objEnd(1), 
									
							 objEnd() 
						)
					)
				)
			});	

			slideData.push({
			
				title : "Language",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("code", null, 
							 objHead(), 
								
								 newLine(1, "\"@context\" :"), 
									
									 objHead(1), 
										
										 newLine(2, "nameJP :"), 
										
											 objHead(2), 
												
												 newLine(3, "\"@id\" : \"http://schema.org/name\"", ","), 
												 highlit(3, "\"@language\" : \"jp\""), 
												
											 objEnd(2), 
										
									 objEnd(1, ","), 
									
								 newLine(1, "\"nameJP\" : \"たなか まさひろ\"", ","), 
										
							 objEnd() 
						)
					)
				)
			});	
			
env_dbg.dPoint=

			slideData.push({
			
				title : "Graph",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 						
						React.createElement("span", null, "How to express \"Lin knows Kobe\" ?")						
					)
				)
			});

			slideData.push({
			
				title : "Graph",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("code", null, 
							 objHead(), 
								
								 newLine(1, "\"@context\" :"), 
									
									 objHead(1), 
										
										 newLine(2, "knows :"), 
										
											 objHead(2), 
												
												 newLine(3, "\"@id\" : \"http://xmlns.com/foaf/0.1/knows\"", ","), 
												 highlit(3, "\"@type\" : \"@id\""), 
												
											 objEnd(2), 
										
									 objEnd(1, ","), 
								
								 newLine(1, "\"@id\" : \"http://foo.com/jeremy_lin\"", ","), 
								
								 newLine(1, "\"@type\" : \"foaf:Person\"", ","), 
								
								 newLine(1, "\"name\" : \"Lin\"", ","), 
										
								 highlit(1, "knows :"), 
								
									 objHead(1), 
								
										 newLine(2, "\"@id\" : \"http://foo.com/kobe\"", ","), 
										
										 newLine(2, "\"@type\" : \"foaf:Person\"", ","), 
										
										 newLine(2, "\"name\" : \"Kobe\""), 
										
									 objEnd(1), 
								
							 objEnd() 
						)				
					)
				)
			});

			slideData.push({
			
				title : "Graph",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("code", null, 
							 objHead(), 
								
								 newLine(1, "\"@context\" :"), 
									
									 objHead(1), 
										
										 newLine(2, "knows :"), 
										
											 objHead(2), 
												
												 newLine(3, "\"@id\" : \"http://xmlns.com/foaf/0.1/knows\"", ","), 
												 highlit(3, "\"@type\" : \"@id\""), 
												
											 objEnd(2), 
										
									 objEnd(1, ","), 
								
								 newLine(1, "\"@id\" : \"http://foo.com/jeremy_lin\"", ","), 
								
								 newLine(1, "\"@type\" : \"foaf:Person\"", ","), 
								
								 newLine(1, "\"name\" : \"Lin\"", ","), 
										
								 highlit(1, "knows :"), 
								
									 objHead(1), 
								
										 newLine(2, "\"@id\" : \"http://foo.com/kobe\"", ","), 
										
										 newLine(2, "\"@type\" : \"foaf:Person\"", ","), 
										
										 newLine(2, "\"name\" : \"Kobe\"", ","), 
										
										 highlit(2, "\"knows\" : \"http://foo.com/jeremy_lin\""), 
										
									 objEnd(1), 
								
							 objEnd() 
						)				
					)
				)
			});

			slideData.push({
			
				title : "Graph",
				
				content : (
					React.createElement("div", {className: "lyt-margin-top-20x lyt-centerContent"}, 
						React.createElement("code", null, 
							 objHead(), 
								
								 newLine(1, "\"@context\" : ...", ","), 								
								
								 highlit(1, "\"@graph\" :"), 
									
									 arrHead(1), 
									
										 objHead(2), 
											
											 newLine(3, "...", ","), 
											
											 newLine(3, "\"name\" : \"Lin\"", ","), 
											
											 newLine(2, "\"knows\" : \"http://foo.com/kobe\""), 
											
										 objEnd(2, ","), 
									
										 objHead(2), 
											
											 newLine(3, "...", ","), 
											
											 newLine(3, "\"name\" : \"kobe\"", ","), 
											
											 newLine(2, "\"knows\" : \"http://foo.com/jeremy_lin\""), 
											
										 objEnd(2), 
									
									 arrEnd(1), 
								
							 objEnd() 
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