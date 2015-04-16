/*
	
*/

var notes = {
	
	RDFa : {
		* Basically a way tagging bits on web pages that we think are important for things like search engines
		  and social networking site and so on.
		  
		* Computer sees differently from human (texts and pics on HTML doc).
		  Computer sees data embedded in the web page.
		  
		* JSON kicks in for standard way of expressing linked data.
	},
	
	LD : {		
		Basically a way publishing data on the web such it is interconnected between web sites.
		So one website can refer data on another wewbsite.	
	},
	
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
						
						"http://bar.com/page" : "http://bob.com" } // We can now know "http://bob.com" is exactly for what kind of page
					},
					
					* But this kind of data is verbose and not friendly, so JSON-LD for rescue...
				}
			}
		}
	
	JSON-LD : {
		
		A extension to JSON
	}
}

