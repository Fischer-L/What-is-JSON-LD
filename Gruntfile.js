module.exports = function(grunt) {

	function formaStr () { // From : http://jsfiddle.net/joquery/9KYaQ/
		var theString = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
			theString = theString.replace(regEx, arguments[i]);
		}
		return theString;
	};
	
	String.prototype.toWinPath = function () { // Maybe shall only work on Linux...
		return this.replace(new RegExp("/", "gm"), "\\");
	};
	
	var env = {}; {
		
		env.jsxEXT = ".jsx.js";
		
		env.dir = {}; {
			env.dir.fileRoot = ".",
			env.dir.localhost = "C:/AppServ/www/JSON-LD",
		
			env.dir.jsSrc = env.dir.fileRoot + "/js",
			env.dir.jsxSrc = env.dir.fileRoot + "/js/jsx",
			env.dir.jsExternaLib = env.dir.fileRoot + "/js/externaLib"
			
			env.dir.style.css = env.dir.fileRoot + "style/css",
			env.dir.style.sass = env.dir.fileRoot + "style/sass",
		};
		
		env.file = {

			jsExternaLib : {		
				react : env.dir.jsExternaLib + "/react.min.js",			
				JSXTransformer : env.dir.jsExternaLib + "/JSXTransformer.js"
			},
			
			jsSrc : {
				externaLib : env.dir.jsSrc + "/externaLib.js"
			},
			
			compassConfig : env.dir.fileRoot + "/config.rb"
		};	
	};
	
	// Project configuration.
	grunt.initConfig({
		
		compass :｛
			
			options : {				
				config : env.file.compassConfig
			},
			
			build : {
				
				options : {
					
					noLineComments : true,
					
					outputStyle : "compressed"
				}
			},
			
			build_for_test : {
				
				options : {
					
					noLineComments : false,
					
					outputStyle : "expanded"
				}
			}
		},
		
		concat : {
		
			options : {
				separator : ";"
			}
			
			build_lib : {
				
				files : [
					{ dest : env.file.jsSrc.externaLib, src : [ env.file.jsSrc.react ] }
				]
			},
			
			build_lib_for_test : {
				
				files : [
					{ dest : env.file.jsSrc.externaLib, src : [ env.file.jsSrc.react, env.file.jsSrc.JSXTransformer ] }
				]
			}
		},
		
		shell: {
		
			build_jsx: {
			
				command: [
					formaStr('jsx -x {0} {1} {2}', env.jsxEXT, env.dir.jsxSrc, env.dir.jsSrc)			
				].join(' && '),
				
				stdout: true,				
				failOnError: true
			},
			
			build_jsx_for_test : {
			
				command: [
					formaStr("xcopy /E {0} {1}", env.dir.jsSrc.toWinPath(), env.dir.jsSrc.toWinPath())
				].join(' && '),
				
				stdout: true,				
				failOnError: true				
			},
			
			set_up : {
			
				command: [
					formaStr('rm -rf {0}', env.dir.jsBuild) // Clean the old files
				].join(' && '),
				
				stdout: true,				
				failOnError: true
			},
			
			clean_up : {
			
				command: [
					formaStr('rm -rf {0}/.module-cache/', env.dir.jsBuild)
				].join(' && '),
				
				stdout: true,				
				failOnError: true
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compass');
	
	// Tasks
	grunt.registerTask('default', [ 
		"shell:set_up", "shell:build_jsx_for_test", "concat:build_lib_for_test", "compass:build_for_test", "shell:clean_up"
	]);
	grunt.registerTask('release', [
		"shell:set_up", "shell:build_jsx", "concat:build_lib", "compass:build", "shell:clean_up"
	]);
};