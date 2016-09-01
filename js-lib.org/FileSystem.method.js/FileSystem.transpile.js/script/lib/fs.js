/**\    fs.js
\**/
/**\    (c)    2015
\**/
(FileSystem={})
.   transpile = function (root)
    {var self = arguments.callee; 	//I think this is actually the proper use of self! (self -> Constructor; this -> Instance)
        
        self.component = 
       (self.namespace = self.namespace||[]).push(
        self.framework = this) -1;
        
        this
        .   temp =
            {    
            }
        ;
        this
        .   exts =
            {   exts
                :   function()
                    {
                        return exts[temp.extension[0]] = [eval][0]("(function "+ temp.extension[0] +"(){ return this.temp['"+ temp.extension[0] +"'] = "+ arguments[0] +" })").bind(self.framework)
                    }
            }
        ;
        
        var
            core =
            {   ajax:
                {   sync: function (path, callback)
                    {
                        var
                            xhro = new XMLHttpRequest
                        ;
                        xhro
                        .   onreadystatechange = function ()
                            {   if (this.readyState == 4)
                                    xhro.done.call(this,(this.status!==200&&this.status))
                                ;
                            }
                        ;
                        xhro.done = callback;
                        xhro.open('GET',path,false);
                        xhro.send(null);
                    }
                ,   contents: function ( path )
                    {
                        var
                            contents = 
                            {   extensions:   []
                            ,   components:   []
                            }
                        ;
                        
                        console.log(path);
                        
                        //core.ui.HUD.bill(contents);
                        
                        core.ajax.sync
                        (   temp.directory = path
                        ,   function (error)
                            {
                                if (error)
                                    return console.warn('index failure: ' + path)
                                ;
                                
                                this.responseText
                                .   replace
                                    (   new RegExp
                                        (   '<a href="([^\/]+)\/">'
                                        ,   'ig'
                                        )
                                    ,   function (match,name)
                                        {    
                                            contents.components.push(name);
                                        }
                                    )
                                ;
                                
                                this.responseText
                                .   replace
                                    (   new RegExp
                                        (   '<a href="([a-z]+\.[a-z]+)">'
                                        ,   'ig'
                                        )
                                    ,   function (match,name)
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
                ,   extension: function ( path )
                    {    
                        var 
                            text
                        ;
                        
                        core.ajax.sync
                        (   temp.file = path
                        ,   function (error)
                            {   text = 
                                    error
                                    ?    false
                                    :    this.responseText || "/* */"
                                ;
                            }
                        );
                        
                        return text;
                    }
                }
            ,   load:
                {   code: function (code)
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
                            ?   temp.extension[1]
                            :   temp.extension[0]
                        ;
                        
                        temp.namespace[temp.component][file] =
                        (   //new 
                            (   exts[temp.extension[1]]   ||   String
                            )   (    code
                                )
                        )    
                        .   valueOf()
                    }
                ,   environments: function ( environments )
                    {    
                        var
                            self =
                            {   directory    :    temp.directory
                            ,   component    :    temp.component
                            ,   namespace    :    temp.namespace
                            }
                        ;
                        
                        if (self.namespace == window)
                            environments.extensions.length = 0
                        ;
                        
                        while
                        (   temp.extension = environments.extensions.shift()
                        )   {
                                core.load.code
                                (   core.ajax.extension
                                    (   self.directory + "/"
                                    +   temp.extension
                                    )
                                );
                            }
                        ;
                            
                        while
                        (   temp.component = environments.components.shift()
                        )   {
                                temp.namespace = self.namespace[self.component];
                        
                                temp.namespace[temp.component] =
                                temp.namespace[temp.component] || new function Component(){};	//use *.info for Custom Types
                                
                                core.load.environments
                                (   core.ajax.contents
                                    (   self.directory + "/"
                                    +   temp.component + "/"
                                    )
                                );
                            }
                    }
                ,   resources: function (resources)
                    {
                        var
                            directory = temp.directory
                        ;
                        
                        while
                        (   temp.resource = resources.components.shift()
                        )   {
                                temp.namespace = self.namespace;
                                temp.component = self.component;
                                
                                core.load.environments
                                (   core.ajax.contents
                                    (   directory + "/"
                                    +   temp.resource + "/"
                                    )
                                );
                            }
                    }
                }
            ,   init: function ()
                {
                    core.load.resources
                    (   core.ajax.contents
                        (    root || "script"
                        )
                    );
                    
                    delete self.framework.exts;
                    delete self.framework.temp;
                }
            }
        ;
                var 
                    temp = self.framework.temp
                ,   exts = self.framework.exts
                ;    
                
        core.init();

    }
;
/**\    http://xoftware.org
\**/
/**\    Christian Research Open-Source Software
\**/
