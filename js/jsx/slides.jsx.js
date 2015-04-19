(function (global, React) {

	"use strict";
	
	var ppt = global.ppt,
	
		pptility = global.ppt.pptility,
		
		env_dbg = ppt.masterDBG.newLocDBG(true),
		
		env_classNames = ppt.CONST.classNames,
		
		formatoHTML = function (reactElem) {		
			return React.renderToStaticMarkup(reactElem);
		},
		
		jsonHead = function () {
			return (<div>&#123;</div>);
		},
		
		jsonEnd = function (trailingComma) {
		
			trailingComma = (trailingComma === ",") ? "," : null;
			
			return (<div>&#125;{trailingComma}</div>);
		},
		
		tab = function (lv, str) {
			
			var tab = [];
			
			for (lv--; lv >= 0; lv--) { // No tab for the lv 0
				tab.push( <span>&nbsp;&nbsp;&nbsp;</span> );
			}
			
			if (tab.length <= 0) tab = null;
			
			return ( <span>{tab}{str}</span> );
		},
		
		comment = function(lv, str) {		
			return ( <div className="sty-comment">{tab(lv, "")}&#47;&#47; {str}</div> );			
		},
		
		newLine = function (lv, str, trailingComma) {
			
			str = tab(lv, str);
			
			if (trailingComma !== ",") trailingComma = null;
		
			return ( <div>{str}{trailingComma}</div> );			
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
			var PPT_Slide = React.createClass({
				
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
							<section className={cls}>
								
								<h3 className="ppt-slide-title">{title}</h3>
								
								<p className="ppt-slide-content"></p>
								
								<aside className="ppt-slide-footer">
									<span className="ppt-slide-footer-count">{count}</span>
								</aside>
								
							</section>
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
					<div className="lyt-centerContent">						
						<div className="lyt-margin-bottom-20x">
							Fischer @ <a href="https://github.com/Fischer-L">https://github.com/Fischer-L</a>
						</div>					
						2015.04
					</div>
				)
			});
	
			slideData.push({
			
				title : "What is this ?",
				
				content : (
					<div>
						<code>
							{ formatoHTML(<span>Frank Darabont</span>) }
							<br/>
							{ formatoHTML(<a href="xyz.html">The Shawshank Redemption</a>) }
						</code>
					</div>
				)
			});
	
			slideData.push({
			
				title : "This is",
				
				content : (
					<div>
						<code>
							{ formatoHTML(<span id="director">Frank Darabont</span>) }
							<br/>
							{ formatoHTML(<a id="movie" href="xyz.html">The Shawshank Redemption</a>) }
						</code>
					</div>
				)
			});
	
			slideData.push({
			
				title : "And what are these ?",
				
				content : (
					<div className="grid-parent grid-100">
					
						<code className="grid-50">
							{ jsonHead() }
								"name" : "Jeremy Lin",<br/>
								"phone" : "123-456-789"
							{ jsonEnd() }
						</code>
						
						<code className="grid-50">
							{ jsonHead() }
								"name" : "Jeremy Lin",<br/>
								"tel" : "123-456-789"
							{ jsonEnd() }
						</code>
						
					</div>
				)
			});
	
			slideData.push({
			
				title : "These are",
				
				content : (
					<div>					
						<code>
							{ jsonHead() }
								"name" : "Jeremy Lin",<br/>
								"phone" / "tel" : "123-456-789"
							{ jsonEnd() }
						</code>						
					</div>
				)
			});

			slideData.push({
			
				title : "The current web",
				
				content : (
					<div className="lyt-centerContent">
					
						<p className="lyt-margin-top-20x lyt-margin-bottom-10x">
							Follow <span className="sty-highlight">LINKs</span> in the HTML
						</p>
						
						<code className="sty-font-italic">
							{ formatoHTML(<span>Frank Darabont</span>) }
							<br/>
							{ formatoHTML(<a href="xyz.html">The Shawshank Redemption</a>) }
						</code>
						
						<p className="lyt-margin-top-40x lyt-margin-bottom-10x">
							Exchange data thru <span className="sty-highlight">JSON</span>
						</p>
						
						<code className="sty-font-italic">
							{ jsonHead() }
								"name" : "Jeremy Lin",<br/>
								"tel" : "123-456-789"
							{ jsonEnd() }
						</code>
						
					</div>
				)
			});

			slideData.push({
			
				title : "Ambiguity",
				
				content : (
					<div className="lyt-centerContent">
						<code className="lyt-margin-bottom-20x">
							{ jsonHead() }
								<span className="sty-highlight">name : "Jeremy Lin"</span>, page : "http://linsanity.com"
							{ jsonEnd() }
						</code>
						<code>
							{ jsonHead() }
								<span className="sty-highlight">name : "Linsanity"</span>, page : "http://linsanity.com"
							{ jsonEnd() }
						</code>
					</div>
				)
			});
			
			slideData.push({
			
				title : "Difficult for computer",
				
				content : (
					<div className="lyt-centerContent lyt-margin-top-20x">
						<img src="./img/sad_computer.png" />
					</div>
				)
			});

			slideData.push({
			
				title : "Computer loves this",
				
				content : (
					<div className="lyt-centerContent lyt-margin-top-10x">
						<code>
							{ jsonHead() }
								<span className="sty-highlight">"https://schema.org/name"</span> : "Linsanity",
								<br/>
								<span className="sty-highlight">"https://schema.org/WebPage"</span> : "http://linsanity.com"
							{ jsonEnd() }
						</code>
					</div>
				)
			});

			slideData.push({
			
				title : "Computer friendly language !?",
				
				content : (
					<div className="lyt-centerContent lyt-margin-top-20x">
						<img src="./img/help_computer.jpg" />
					</div>
				)
			});

			slideData.push({
			
				title : "RDF",
				
				content : (
					<div className="lyt-centerContent lyt-margin-top-20x">
						<a href="http://www.w3.org/RDF/">Resource Description Framework</a>
					</div>
				)
			});

			slideData.push({
			
				title : "How to express ?",
				
				content : (
					<div className="lyt-centerContent lyt-margin-top-20x">
						<img src="./img/graph_for_human.png" />
					</div>
				)
			});

			slideData.push({
			
				title : "Graph",
				
				content : (
					<div className="lyt-centerContent lyt-margin-top-20x">
						<img src="./img/graph_for_computer.png" />
					</div>
				)
			});

			slideData.push({
			
				title : "RDF statement",
				
				content : (
					<div className="lyt-centerContent lyt-margin-top-20x">
					
						<p className="lyt-margin-bottom-20x">
							Subject - Predicate - Object
						</p>
					
						<p>
							"Lin plays basketball"
						</p>
						
					</div>
				)
			});

			slideData.push({
			
				title : "Structured data",
				
				content : (
					<div className="grid-container grid-parent grid-100 mobile-grid-100 lyt-margin-top-20x">

						<div className="grid-50 mobile-grid-100 lyt-centerContent lyt-mobile-margin-bottom-25x">
							
							<div className="lyt-margin-bottom-15x">Schema.org</div>

							<a href="https://schema.org/">
								<img src="./img/schema_logo.jpg" className="lyt-centerImg" />
							</a>

						</div>

						<div className="grid-50 mobile-grid-100 lyt-centerContent">
							
							<div className="lyt-margin-bottom-15x">FOAF</div>
							
							<a href="http://www.foaf-project.org/">
								<img src="./img/foaf_logo.png" className="lyt-centerImg" />
							</a>

						</div>
						
					</div>
				)
			});

			slideData.push({
			
				title : "Linked Data",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<span>
							Data linked by
							&nbsp;
							<span className="sty-highlight">Algorithm</span>
							&nbsp;
							with 
							&nbsp;
							<span className="sty-highlight">Data Structure</span>
						</span>
					</div>
				)
			});

			slideData.push({
			
				title : "Linking Data by JSON",
				
				content : (
					<div className="lyt-margin-top-20x">							
						<a href="http://json-ld.org/">
							<img src="./img/json_ld_logo_0.png"
							     className="lyt-centerImg"
								 style={{
									width : "250px"
								 }}
							/>
						</a>
					</div>
				)
			});

			slideData.push({
			
				title : "Context",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<span>Do you know <a href="https://en.wikipedia.org/wiki/LSB">LSB</a> ?</span>
					</div>
				)
			});

			slideData.push({
			
				title : "Context",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<code>
							{ jsonHead() }
								<span className="sty-comment">&#47;&#47; Our context is the person.jsonld file</span>
							<br/>
								"@contxt" : <a href="./docs/person.jsonld">"http://foo.com/docs/person.jsonld"</a>
							<br/>
								"name" : "Jeremy Lin",
							<br/>
								"email" : "jeremy.lin@example.com"
							{ jsonEnd() }
						</code>
					</div>
				)
			});
						
env_dbg.dPoint=

			slideData.push({
			
				title : "Compact IRI",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<code>
							{ jsonHead() }
								
								{ newLine(0, "\"@contxt\" :") }
								
									{ jsonHead() }
									
										{ newLine(1, "\"foaf\" : \"http://xmlns.com/foaf/0.1/\"") }
									
									{ jsonEnd(",") }
								
								{ comment(0, "\"@type\" : \"http://xmlns.com/foaf/0.1/Person\"") }
								{ newLine(0, "\"@type\": \"foaf:Person\"", ",") }
								
								{ comment(0, "\"http://xmlns.com/foaf/0.1/name\" : \"Dave Longley\"") }
								{ newLine(0, "\"foaf:name\" : \"Dave Longley\"") }
								
							{ jsonEnd() }
						</code>
					</div>
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