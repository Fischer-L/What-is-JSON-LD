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
							{ formatHTML(<span>Frank Darabont</span>) }
							<br/>
							{ formatHTML(<a href="xyz.html">The Shawshank Redemption</a>) }
						</code>
					</div>
				)
			});
	
			slideData.push({
			
				title : "This is",
				
				content : (
					<div>
						<code>
							{ formatHTML(<span id="director">Frank Darabont</span>) }
							<br/>
							{ formatHTML(<a id="movie" href="xyz.html">The Shawshank Redemption</a>) }
						</code>
					</div>
				)
			});
	
			slideData.push({
			
				title : "And what are these ?",
				
				content : (
					<div className="grid-parent grid-100">
					
						<code className="grid-50">
							&#123;<br/>
								"name" : "Jeremy Lin",<br/>
								"phone" : "123-456-789"<br/>
							&#125;
						</code>
						
						<code className="grid-50">
							&#123;<br/>
								"name" : "Jeremy Lin",<br/>
								"tel" : "123-456-789"<br/>
							&#125;
						</code>
						
					</div>
				)
			});
	
			slideData.push({
			
				title : "These are",
				
				content : (
					<div>					
						<code>
							&#123;<br/>
								"name" : "Jeremy Lin",<br/>
								"phone" / "tel" : "123-456-789"<br/>
							&#125;
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
							{ formatHTML(<span>Frank Darabont</span>) }
							<br/>
							{ formatHTML(<a href="xyz.html">The Shawshank Redemption</a>) }
						</code>
						
						<p className="lyt-margin-top-40x lyt-margin-bottom-10x">
							Exchange data thru <span className="sty-highlight">JSON</span>
						</p>
						
						<code className="sty-font-italic">
							&#123;<br/>
								"name" : "Jeremy Lin",<br/>
								"tel" : "123-456-789"<br/>
							&#125;
						</code>
						
					</div>
				)
			});

			slideData.push({
			
				title : "Ambiguity",
				
				content : (
					<div className="lyt-centerContent">
						<code className="lyt-margin-bottom-20x">
							&#123;<br/>
								<span className="sty-highlight">name : "Jeremy Lin"</span>, page : "http://linsanity.com"
							<br/>&#125;
						</code>
						<code>
							&#123;<br/>
								<span className="sty-highlight">name : "Linsanity"</span>, page : "http://linsanity.com"
							<br/>&#125;
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
							&#123;<br/>
								<span className="sty-highlight">"https://schema.org/name"</span> : "Linsanity",
								<br/>
								<span className="sty-highlight">"https://schema.org/WebPage"</span> : "http://linsanity.com"
							<br/>&#125;
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
			
env_dbg.dPoint=

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
								<img src="./img/schema_logo.jpg"								
									 className="lyt-centerBlock"									 
									 style={ {
										width : "80%",
										minWidth : "200px"
									 } }
								/>
							</a>

						</div>

						<div className="grid-50 mobile-grid-100 lyt-centerContent">
							
							<div className="lyt-margin-bottom-15x">FOAF</div>
							
							<a href="http://www.foaf-project.org/">
								<img src="./img/foaf_logo.png"
									 className="lyt-centerBlock"
									 style={ {
										width : "80%",
										minWidth : "200px"
									 } }
								/>
							</a>

						</div>
						
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