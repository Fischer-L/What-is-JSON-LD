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
							{ formatHTML(<span>The Shawshank Redemption</span>) }
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
							{ formatHTML(<span id="movie">The Shawshank Redemption</span>) }
						</code>
					</div>
				)
			});
	
			env_dbg.dPoint = slideData.push({
			
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