/**\	on.js
\**/
/**\	(c)	2015
\**/
new	
(	function Alpha ()
	{
		framework = this;
		
		this
		.	data =
			{	
			}
		;
		this
		.	temp =
			{	
			}
		;
		this
		.	exts =
			{	exts
				:	function()
					{
						return exts[temp.extension[0]] = [eval][0]("(function "+ temp.extension[0] +"(){ return framework.temp['"+ temp.extension[0] +"'] = "+ arguments[0] +" })")
					}
			}
		;
		var
			core =
			{	ajax:
				{	sync: function (path, callback)
					{
						var
							xhro = new XMLHttpRequest
						;
						xhro
						.	onreadystatechange = function ()
							{	if (this.readyState == 4)
									xhro.done.call(this,(this.status!==200&&this.status))
								;
							}
						;
						xhro.done = callback;
						xhro.open('GET',path,false);
						xhro.send(null);
					}
				,	contents: function ( path )
					{
						var
							contents = 
							{	extensions:	[]
							,	components:	[]
							}
						;
						
						console.log(path);
						
						//core.ui.HUD.bill(contents);
						
						core.ajax.sync
						(	temp.directory = path
						,	function (error)
							{
								if (error)
									return console.warn('index failure: ' + path)
								;
								
								this.responseText
								.	replace
									(	new RegExp
										(	'<a href="([^\/]+)\/">'
										,	'ig'
										)
									,	function (match,name)
										{	
											contents.components.push(name);
										}
									)
								;
								
								this.responseText
								.	replace
									(	new RegExp
										(	'<a href="([a-z]+\.[a-z]+)">'
										,	'ig'
										)
									,	function (match,name)
										{	
											console.log(name);
											contents.extensions.push(name);
										}
									)
								;
									
							}
						);
						
						return contents;
					}
				,	extension: function ( path )
					{	
						var 
							text
						;
						
						core.ajax.sync
						(	temp.file = path
						,	function (error)
							{	text = 
									error
									?	false
									:	this.responseText || "/* */"
								;
							}
						);
						
						return text;
					}
				}
			,	load:
				{	code: function (code)
					{
						if (!(code||code.length))
							return console.warn('code missing : ' + temp.file)
						;

						temp.extension = 
						temp.extension.split(".");
						
						var
							file
						=
							temp.extension[0] == temp.component
							?	temp.extension[1]
							:	temp.extension[0]
						;
						
						temp.namespace[temp.component][file] =
						(	new 
							(	exts[temp.extension[1]]	||	String
							)	(	code
								)
						)	
						.	valueOf()
					}
				,	environments: function ( environments )
					{	
						var
							self =
							{	directory	:	temp.directory
							,	component	:	temp.component
							,	namespace	:	temp.namespace
							}
						;
						
						if (self.namespace == window)
							environments.extensions.length = 0
						;
						
						while
						(	temp.extension = environments.extensions.shift()
						)	{
								core.load.code
								(	core.ajax.extension
									(	self.directory + "/"
									+	temp.extension
									)
								);
							}
						;
							
						while
						(	temp.component = environments.components.shift()
						)	{
								temp.namespace = self.namespace[self.component];
						
								temp.namespace[temp.component] =
								temp.namespace[temp.component] || new function Component(){};
								
								core.load.environments
								(	core.ajax.contents
									(	self.directory + "/"
									+	temp.component + "/"
									)
								);
							}
					}
				,	resources: function (resources)
					{
						var
							directory = temp.directory
						;
						
						while
						(	temp.resource = resources.components.shift()
						)	{
								temp.namespace = window;
								temp.component = 'framework';
								
								core.load.environments
								(	core.ajax.contents
									(	directory + "/"
									+	temp.resource + "/"
									)
								);
							}
					}
				}
			,	init: function ()
				{
					core.load.resources
					(	core.ajax.contents
						(	temp.root = "script"
						)
					);
					
					delete framework.exts;
					delete framework.temp;
				}
			}
		;
				var 
					temp = framework.temp
				,	exts = framework.exts
				;	
				
		core.init();
	}
);
/**\	Ryan Stortz
\**/
/**\	April 15th
\**/