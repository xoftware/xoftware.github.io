(   function (settings)
    {
        var _ = function(that)
        {   return new Node(that);
        };

        var Node = function(node)
        {   this.insert = function(c,a,b)
            {   node.insertBefore(a,c=='After'?b.nextSibling:b);
            };
            this.offset = function(p)
            {   for(this[p]=0;node;node=node.offsetParent) this[p]+=node['offset'+p];
                return this[p];
            };
        };

        var each =
        {   ElementBy:
            {   className: function(list,className,search,callback)
                {   search=search?search+' ':'';
                    for(var i=0,l=list.length;i<l;i+=1) ((list[i].className+' ').indexOf(className+search)>=0) && callback.call(list,i);
                }
            ,   attribute: function(list,attribute,search,callback)
                {   var test;
                    for(var i=0,l=list.length;i<l;i+=1) (test = list[i].getAttribute(attribute)) && (search?((test+' ').indexOf(search+' ')>=0):true) && callback.call(list,i);
                }
            }
        };

        String.prototype
        .   hyphenMatch = function(search)
            {   var l = search.length, m=[];
                if(search = this.match(new RegExp(search+"-[\\w\\d-]+","g")) )
                    while(search.length) m.push(search.shift().slice(l));
                else
                    return false;
                return m;
            }
        ;

        var ev = window.addEventListener?['addEventListener','']:['attachEvent','on'];
        var ev_add = function(node,ev_type,exec){ node[ev[0]](ev[1]+ev_type, function(e){return exec.call(node,e||window.event);}, false); }

        var lib;
        lib = 
        {   name:
            {   parent      :'dd-parent'
            ,   parentAxis  :'dd-parent-axis'
            ,   child       :'dd-child'
            ,   hold        :'dd-hold'
            ,   drag        :'dd-drag'
            }
        ,   init: function()//add event listeners
            {   dragdrop = settings; console.log('dragdrop version 1.00');
				
                ev_add(document,'mouseup'  ,lib.mouse.up  );
                ev_add(document,'mousedown',lib.mouse.down);
                ev_add(document,'mousemove',lib.mouse.move);
            }
        ,   mouse:
            {   down:function(e)
                {    
                    if (lib.drag.node || lib.drop.node)
                        return
                    ;
                    
                    (lib.drag.find(e.srcElement||e.target))
                  &&(lib.drop.make())
                  &&(lib.drag.make())
                  &&(lib.drag.move())
                  &&(lib.drag.time = setInterval
                    (    function()
                        {    lib.drag.move();
                            lib.drop.move();
                        }
                    ,    100/4
                    ));
                }
            ,   up:function(e)
                {
                    (lib.drop.node)
                  &&(lib.drag.node)
                  &&(lib.drop.done())
                  &&(lib.drag.done());
                }
            ,   move:function(e)
                {
                    e.preventDefault?e.preventDefault():e.returnValue=false;
                    lib.mouse.X_px = e.clientX + (document.body.scrollLeft||document.documentElement.scrollLeft);
                    lib.mouse.Y_px = e.clientY + (document.body.scrollTop ||document.documentElement.scrollTop );
                }
            }
        ,   drag:
            {   find:function(node)//find the draggable node
                {
                    if('className'==settings['mode'])
                    {   for(;node;node=node.parentNode)
                        {   if (lib.drag.type = (node.className||'').hyphenMatch(lib.name.child) )//methodized
                            {   lib.drop.node = node;
                                lib.drag.node = node.cloneNode(true); 
                                return true;
                            }
                        }   return false;
                    }else
                    {   for(;node;node=node.parentNode)
                        {   if (lib.drag.type = node.getAttribute(lib.name.child))
                            {   lib.drag.type = lib.drag.type.split(' ');
                                lib.drop.node = node;
                                lib.drag.node = node.cloneNode(true); 
                                return true;
                            }
                        }   return false;
                    }
                }
            ,   make: function()//make the draggable node
                {
                    lib.drag.x_px = lib.mouse.X_px - _(lib.drop.node).offset('Left');//methodized
                    lib.drag.y_px = lib.mouse.Y_px - _(lib.drop.node).offset('Top'); //methodized
                    lib.drag.node.style.width  = lib.drop.node.offsetWidth  + "px";
                    lib.drag.node.style.height = lib.drop.node.offsetHeight + "px"; 

                    lib.drag.node.setAttribute("drag","true");
                    lib.drag.node.style.position = "absolute";
                    document.body.appendChild(lib.drag.node);

                    return true;
                }
            ,   move: function()//move the draggable node
                {
                    lib.drag.node['style']['left']=(lib.mouse.X_px - lib.drag.x_px) + ('px');
                    lib.drag.node['style']['top' ]=(lib.mouse.Y_px - lib.drag.y_px) + ('px');
                    
                    return true;
                }
            ,   done: function()//stop the draggable node
                {
                    //stop move handler/timer
                    clearInterval(lib.drag.time);
                    //free drag node dependencies
                    for ( var i in lib.drag )
                        if( lib.drag[i] instanceof Function === false )//fixme
                            lib.drag[i] = undefined;

                    return true;
                }
            }
        ,   drop:
            {   make: function()//make the droppable node
                {
                    lib.drop.node.setAttribute("drop","true");
                    
                    return true;
                }
            ,   move:function()//move the droppable node
                {    for(var k in lib.drag.type)
                        each.ElementBy[settings['mode']]
                        (   document.getElementsByTagName('*')
                        ,   lib.name.parent
                        ,   lib.drag.type[k]
                        ,   function(i)
                            {   lib.parent = 
                                {   node:this[i]
                                ,   axis:this[i].getAttribute(lib.name.parentAxis)||('y')
                                };

                                each.ElementBy[settings['mode']]
                                (   lib.parent.node.children
                                ,   lib.name.child
                                ,   false
                                ,   function(i)
                                    {   lib.child = 
                                        {   node: (this[i])
                                        ,   x_px:_(this[i]).offset('Left')// + lib.parent.page.X
                                        ,   y_px:_(this[i]).offset('Top' )// + lib.parent.page.Y
                                        ,   w_px: (this[i]).offsetWidth
                                        ,   h_px: (this[i]).offsetHeight
                                        };

                                        lib.child.inside =
                                        {   x:  +( lib.mouse.X_px > lib.child.x_px )
                                            *   +((lib.mouse.X_px < lib.child.x_px + lib.child.w_px)
                                            +   +( lib.mouse.X_px < lib.child.x_px + lib.child.w_px/2 ))
                                        ,   y:  +( lib.mouse.Y_px > lib.child.y_px )
                                            *   +((lib.mouse.Y_px < lib.child.y_px + lib.child.h_px)
                                            +   +( lib.mouse.Y_px < lib.child.y_px + lib.child.h_px/2 ))
                                        };

                                        if ( lib.child.inside.x && lib.child.inside.y )
                                           _(lib.parent.node).insert
                                            (   ['After','Before'][--lib.child.inside[lib.parent.axis]]
                                            ,   lib.drop.node
                                            ,   lib.child.node
                                            )
                                        ;
                                    }
                                )
                            }
                        ;
                    )
                }
            ,   done: function()
                {
                    lib.drop.node.removeAttribute("drop");
                    document.body.removeChild(lib.drag.node);

                    lib.drag.node =
                    lib.drop.node = 
                    lib.child     = 
                    lib.parent    = void null;

                    return true;
                }
            }
        };	lib.init();
    }
)
    ({"mode":"attribute"})
;