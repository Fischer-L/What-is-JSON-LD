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
		
			return (<div>{tab(lv, "")}&#123;</div>);
		},
		
		objEnd = function (lv, trailingComma) {
			
			if (!pptility.isNum(lv)) lv = 0;
			
			trailingComma = (trailingComma === ",") ? "," : null;
			
			return (<div>{tab(lv, "")}&#125;{trailingComma}</div>);
		},
		
		arrHead = function (lv) {
		
			if (!pptility.isNum(lv)) lv = 0;
		
			return (<div>{tab(lv, "")}&#91;</div>);		
		},
		
		arrEnd = function (lv, trailingComma) {
			
			if (!pptility.isNum(lv)) lv = 0;
			
			trailingComma = (trailingComma === ",") ? "," : null;
			
			return (<div>{tab(lv, "")}&#93;{trailingComma}</div>);
		
		},
		
		tab = function (lv, content) {
			
			var tab = [];
			
			for (lv--; lv >= 0; lv--) { // No tab for the lv 0
				tab.push( <span>&nbsp;&nbsp;&nbsp;&nbsp;</span> );
			}
			
			if (tab.length <= 0) tab = null;
			
			return ( <span>{tab}{content}</span> );
		},
		
		comment = function(lv, str) {
		
			var span = ( <span className="sty-comment">{tab(lv, "")}&#47;&#47; {str}</span> );	

			return newLine(0, span);			
		},
		
		highlit = function (lv, str, trailingComma) {
			
			var span = ( <span className="sty-highlight">{tab(lv, "")}{str}</span> );
			
			return newLine(0, span, trailingComma);
		},
		
		newLine = function (lv, content, trailingComma) {
			
			content = tab(lv, content);
			
			if (trailingComma !== ",") trailingComma = null;
		
			return ( <div>{content}{trailingComma}</div> );			
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
							{ objHead() }
								"name" : "Jeremy Lin",<br/>
								"phone" : "123-456-789"
							{ objEnd() }
						</code>
						
						<code className="grid-50">
							{ objHead() }
								"name" : "Jeremy Lin",<br/>
								"tel" : "123-456-789"
							{ objEnd() }
						</code>
						
					</div>
				)
			});
	
			slideData.push({
			
				title : "These are",
				
				content : (
					<div>					
						<code>
							{ objHead() }
								"name" : "Jeremy Lin",<br/>
								"phone" / "tel" : "123-456-789"
							{ objEnd() }
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
							{ objHead() }
								"name" : "Jeremy Lin",<br/>
								"tel" : "123-456-789"
							{ objEnd() }
						</code>
						
					</div>
				)
			});

			slideData.push({
			
				title : "Ambiguity",
				
				content : (
					<div className="lyt-centerContent">
						<code className="lyt-margin-bottom-20x">
							{ objHead() }
								<span className="sty-highlight">name : "Jeremy Lin"</span>, page : "http://linsanity.com"
							{ objEnd() }
						</code>
						<code>
							{ objHead() }
								<span className="sty-highlight">name : "Linsanity"</span>, page : "http://linsanity.com"
							{ objEnd() }
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
							{ objHead() }
								<span className="sty-highlight">"https://schema.org/name"</span> : "Linsanity",
								<br/>
								<span className="sty-highlight">"https://schema.org/WebPage"</span> : "http://linsanity.com"
							{ objEnd() }
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
							{ objHead() }
								<span className="sty-comment">&#47;&#47; Our context is the person.jsonld file</span>
							<br/>
								"@context" : <a href="./docs/person.jsonld">"http://foo.com/docs/person.jsonld"</a>
							<br/>
								"name" : "Jeremy Lin",
							<br/>
								"email" : "jeremy.lin@example.com"
							{ objEnd() }
						</code>
					</div>
				)
			});

			slideData.push({
			
				title : "Compact IRI",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<code>
							{ objHead() }
								
								{ newLine(0, "\"@context\" :") }
								
									{ objHead(1) }
									
										{ newLine(1, "\"foaf\" : \"http://xmlns.com/foaf/0.1/\"") }
									
									{ objEnd(1, ",") }
								
								{ comment(0, "\"@type\" : \"http://xmlns.com/foaf/0.1/Person\"") }
								{ newLine(0, "\"@type\": \"foaf:Person\"", ",") }
								
								{ comment(0, "\"http://xmlns.com/foaf/0.1/name\" : \"Jeremy Lin\"") }
								{ newLine(0, "\"foaf:name\" : \"Jeremy Lin\"") }
								
							{ objEnd() }
						</code>
					</div>
				)
			});

			slideData.push({
			
				title : "Type",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<code>
							{ objHead() }
								
								{ newLine(1, "\"@context\" :") }
								
									{ objHead(1) }
									
										{ newLine(2, "\"foaf\" : \"http://xmlns.com/foaf/0.1/\"") }
									
									{ objEnd(1, ",") }
								
								{ comment(1, "The data type is Person") }
								{ highlit(1, "\"@type\": \"foaf:Person\"", ",") }
								
								{ newLine(1, "\"foaf:name\" : \"Jeremy Lin\"") }
								
							{ objEnd() }
						</code>
					</div>
				)
			});

			slideData.push({
			
				title : "Type",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<code>
							{ objHead() }
								
								{ newLine(1, "\"@context\" :") }
								
									{ objHead(1) }
									
										{ newLine(2, "\"xsd\": \"http://www.w3.org/2001/XMLSchema#\"", ",") }									
										{ newLine(2, "...") }
										
									{ objEnd(1, ",") }
								
								{ newLine(1, "\"birthday\" :") }
								
									{ objHead(1) }
										
										{ newLine(2, "\"@value\" : \"2000-01-01\"", ",") }
										{ highlit(2, "\"@type\" : \"xsd:date\"") }
										
									{ objEnd(1) }
								
							{ objEnd() }
						</code>
					</div>
				)
			});

			slideData.push({
			
				title : "Type coercion",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<code>
							{ objHead() }
								
								{ newLine(1, "\"@context\" :") }
								
									{ objHead(1) }
										
										{ highlit(2, "\"birthday\" :") }
											
											{ objHead(2) }
												
												{ newLine(3, "\"@id\" : \"https://schema.org/birthDate\"", ",") }												
												{ newLine(3, "\"@type\" : \"https://schema.org/birthDate\"") }
												
											{ objEnd(2, ",") }
										
									{ objEnd(1, ",") }
								
								{ highlit(1, "\"birthday\" : \"2000-01-01\"") }
								
							{ objEnd() }
						</code>
					</div>
				)
			});

			slideData.push({
			
				title : "Keyword Aliasing",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<code>
							{ objHead() }
								
								{ newLine(1, "\"@context\" :") }
								
									{ objHead(1) }
										
										{ highlit(2, "\"url\": \"@id\"", ",") }
										{ newLine(2, "...") }
										
									{ objEnd(1, ",") }
								
								{ highlit(1, "\"url\" : \"http://foo.com/jeremy_lin\"", ",") }
								{ newLine(1, "\"name\" : \"Jeremy Lin\"") }
								
							{ objEnd() }
						</code>
					</div>
				)
			});	

			slideData.push({
			
				title : "Language",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<code>
							{ objHead() }
								
								{ newLine(1, "\"@context\" : ...", ",") }
								
								{ newLine(1, "\"name\" :") }
									
									{ objHead(1) }
										
										{ newLine(2, "\"@value\" : \"たなか まさひろ\"", ",") }
										
										{ comment(2, "BCP-47") }
										{ highlit(2, "\"@language\" : \"jp\"") }
										
									{ objEnd(1) }
									
							{ objEnd() }
						</code>
					</div>
				)
			});	

			slideData.push({
			
				title : "Language",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<code>
							{ objHead() }
								
								{ newLine(1, "\"@context\" :") }
									
									{ objHead(1) }
										
										{ newLine(2, "nameJP :") }
										
											{ objHead(2) }
												
												{ newLine(3, "\"@id\" : \"http://schema.org/name\"", ",") }
												{ highlit(3, "\"@language\" : \"jp\"") }
												
											{ objEnd(2) }
										
									{ objEnd(1, ",") }
									
								{ newLine(1, "\"nameJP\" : \"たなか まさひろ\"", ",") }
										
							{ objEnd() }
						</code>
					</div>
				)
			});	
			
env_dbg.dPoint=

			slideData.push({
			
				title : "Graph",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">						
						<span>How to express "Lin knows Kobe" ?</span>						
					</div>
				)
			});

			slideData.push({
			
				title : "Graph",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<code>
							{ objHead() }
								
								{ newLine(1, "\"@context\" :") }
									
									{ objHead(1) }
										
										{ newLine(2, "knows :") }
										
											{ objHead(2) }
												
												{ newLine(3, "\"@id\" : \"http://xmlns.com/foaf/0.1/knows\"", ",") }
												{ highlit(3, "\"@type\" : \"@id\"") }
												
											{ objEnd(2) }
										
									{ objEnd(1, ",") }
								
								{ newLine(1, "\"@id\" : \"http://foo.com/jeremy_lin\"", ",") }
								
								{ newLine(1, "\"@type\" : \"foaf:Person\"", ",") }
								
								{ newLine(1, "\"name\" : \"Lin\"", ",") }
										
								{ highlit(1, "knows :") }
								
									{ objHead(1) }
								
										{ newLine(2, "\"@id\" : \"http://foo.com/kobe\"", ",") }
										
										{ newLine(2, "\"@type\" : \"foaf:Person\"", ",") }
										
										{ newLine(2, "\"name\" : \"Kobe\"") }
										
									{ objEnd(1) }
								
							{ objEnd() }
						</code>				
					</div>
				)
			});

			slideData.push({
			
				title : "Graph",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<code>
							{ objHead() }
								
								{ newLine(1, "\"@context\" :") }
									
									{ objHead(1) }
										
										{ newLine(2, "knows :") }
										
											{ objHead(2) }
												
												{ newLine(3, "\"@id\" : \"http://xmlns.com/foaf/0.1/knows\"", ",") }
												{ highlit(3, "\"@type\" : \"@id\"") }
												
											{ objEnd(2) }
										
									{ objEnd(1, ",") }
								
								{ newLine(1, "\"@id\" : \"http://foo.com/jeremy_lin\"", ",") }
								
								{ newLine(1, "\"@type\" : \"foaf:Person\"", ",") }
								
								{ newLine(1, "\"name\" : \"Lin\"", ",") }
										
								{ highlit(1, "knows :") }
								
									{ objHead(1) }
								
										{ newLine(2, "\"@id\" : \"http://foo.com/kobe\"", ",") }
										
										{ newLine(2, "\"@type\" : \"foaf:Person\"", ",") }
										
										{ newLine(2, "\"name\" : \"Kobe\"", ",") }
										
										{ highlit(2, "\"knows\" : \"http://foo.com/jeremy_lin\"") }
										
									{ objEnd(1) }
								
							{ objEnd() }
						</code>				
					</div>
				)
			});

			slideData.push({
			
				title : "Graph",
				
				content : (
					<div className="lyt-margin-top-20x lyt-centerContent">
						<code>
							{ objHead() }
								
								{ newLine(1, "\"@context\" : ...", ",") }								
								
								{ highlit(1, "\"@graph\" :") }
									
									{ arrHead(1) }
									
										{ objHead(2) }
											
											{ newLine(3, "...", ",") }
											
											{ newLine(3, "\"name\" : \"Lin\"", ",") }
											
											{ newLine(3, "\"knows\" : \"http://foo.com/kobe\"") }
											
										{ objEnd(2, ",") }
									
										{ objHead(2) }
											
											{ newLine(3, "...", ",") }
											
											{ newLine(3, "\"name\" : \"kobe\"", ",") }
											
											{ newLine(3, "\"knows\" : \"http://foo.com/jeremy_lin\"") }
											
										{ objEnd(2) }
									
									{ arrEnd(1) }
								
							{ objEnd() }
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