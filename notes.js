/*
	
*/

var notes = {
	
	The current web : {
			
		* Doc based : HTML doc on the server, follow links
		
		* 2 types of data :  HTML and JSON,
	
		* JSON : {
			
			* Good for both human and machine readable.
			
			* But problem comes after different websites use different JSON data format : {
			
				Ambiguity : {
					
					* data_from_web_A : { name : "Bob", page : "http://bob.com" }
					
					* data_from_web_B : { name : "bboi4", page : "http://bob.com" }
					
					* Since data_from_web_A.page === data_from_web_B.page, we certainly know these data are related.
					  However data_from_web_A.name !== data_from_web_B.name, there is an ambiquity.
					  We can not certain about this part so it is hard to share data between websites.					
				}
			},
			
			* Solution to ambiguity => Being Specific : {
				
				* data_from_web_A : {
					
					"http://foo.com/name" : "Bod", // We can now know "Bob" is exactly for what kind of name
					
					"http://bar.com/page" : "http://bob.com" // We can now know "http://bob.com" is exactly for what kind of page
				},
				
				* But this kind of data is verbose and not friendly, so JSON-LD for rescue...
			}
		}
	},
	
	Linked Data : {
		
		* Human can know what the link in HTML points to from its inner text but compute cannot.
		  Computer can only know where to get the resource pointed by the link from its href value.
	
		* LD basically is a way publishing data on the web such it is interconnected between web sites.
		  So one website can refer data on another wewbsite.
		
		* Compute likes SPECIFIC and URL is a great specific identifier
		  
		* Example : {
			
			* Paul -- knows --> Sarah  -- marries --> Cook
			
			* For computer-readable : {
				"http://foo.com/paul" (= Paul) -- "http://schemas.org/knows" (= knows) --> "http://bar.com/sarah" (= Sarah)
			}
		}
	},

	RDF : {
		
		* Resource Description Framework 
		
		* A framework describing concepts, relationships and things in the universe
		
		* Foundation : {
			
			* Subject - Predicate - Object
			
			* Subject : The thing being described
			
			* Predicate : The attribute of Subject, expressing a relationship between the subject and the object
			
			* Object : the thing being referred with Predicate
			
			* Example : "Lin plays basketball"
		}
	},
	
	RDFa : {
		* Basically a way tagging bits on web pages that we think are important for things like search engines
		  and social networking site and so on.
		  
		* Computer sees differently from human (texts and pics on HTML doc).
		  Computer sees data embedded in the web page.
		  
		* JSON kicks in for standard way of expressing linked data.
	},
	
	JSON-LD : {
		
		* A extension to JSON
		
		* Context : {
			
			* In the real life conversation, we all talk under certain context.
			
			* "@context" : {
				
				* JSON-LD context tells app how to interpret the rest of data in doc
				
				* JsonLD_from_web_A : {
					
					"@contxt" : "http://web_a.com/web_a_ctx.jsonld", // This doc tells us what "name"(plus its datatype) is and what "page"(plus its datatype) is
					
					"name" : "Bob",
					
					"page" : "http://bob.com"
				}
			}
		},
		
		* Core Markup : {
		
			* "@type" : {
				
				* Object : {
				
					* Person, Place, Event and so on
					
					* Example : {
					
						"@context" : { ... },
						
						"@type" : "Person",
						
						"name" : "Jeremy Lin"
					}
				},
				
				* Data : {
					
					* data, integer, temp and  so on
					
					* Example : {
					
						"@context" : {
							"schema":"http://schema.org/",
							"xsd": "http://www.w3.org/2001/XMLSchema#", ...
						},
						
						"@type" : "schema:Person",
						
						"name" : "Jeremy Lin"
						
						"birthday" : {
						
							"@value" : "2000-01-01",
							
							"@type" : "xsd:date"
						}					
					}
				},
				
				* Type coercion : {
					
					"@context" : {
						"borthday" : {
							"@id" : "https://schema.org/birthDate",
							"@type" : "xsd:date"
						}
					},
					
					"birthday" : "2000-01-01"
				}
			},
			
			* Graph : {
			
				* How to express Lin -- knows --> Kobe ?
				
				* Method 1 - Embedding : {
					
					* Embed one object in another object with some kind of relationship
					
					* Example : {
					
						"@context" : { ... },
						
						"name" : "Lin",
						
						"knows" : {							
							"name" : "kobe"
						}
					}
				},
				
				* Method 2 - Referencing : {
				
					"@context" : { ... },
					
					"name" : "Lin",
					
					"knows" : "http://foo.com/kobe"
				}
			},
			
			* Keyword Aliasing : {
				
				with this declaration
				
					"@context" : {
					
						"id" : "@id",
						
						"type" : "@type",
						
						"url" : "@id"
					}
				
				then
					
					obj["@type"] === obj.type
			},
			
			Language : // TODO : 5:58 @ https://www.youtube.com/watch?v=UmvWk_TQ30A
		}
	},
	
	Ref : {
	
		"http://www.slideshare.net/gkellogg1/json-for-linked-data?next_slideshow=1",
		
		"http://json-ld.org/learn.html",
		
		"http://en.wikipedia.org/wiki/Schema.org",
		
		"http://en.wikipedia.org/wiki/JSON-LD",
		
		"http://en.wikipedia.org/wiki/Linked_data",
		
		"http://en.wikipedia.org/wiki/Resource_Description_Framework",
		
		"https://schema.org/"
		
		"http://seo.dns.com.tw/?p=2372"
	}
}

