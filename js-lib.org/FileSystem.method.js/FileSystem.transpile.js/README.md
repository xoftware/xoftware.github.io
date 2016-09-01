Filesystem to JavaScript Framework Transpiler
--------------------------------------------------

You could have partial or full javascript code existing in files of any type. 
Some examples are json, objects, functions, or just some variable declarations. 
You choose how to handle those file-extensions, and it builds components out 
of them based on how you organize them within subdirectories in your file-system. 

It has a flexible way of doing this that actually ends up structuring your code to be most dynamic. 
That's what happens when you open up optimal pathways by simplifying the integral relationships! 
With these systemic principles, things often inevitably end up more light-weight too. 


You start out with a basic filesystem like this:

    _fs/   --for file-system rules
    app/   --applications
    lib/   --libraries
    mod/   --modules
    ext/   --extensions/extras/configs/etc.

In the _fs directory belong file-extension rules. For example, "txt.exts" would have the way to handle a ".txt"

Recursively, every subdirectory becomes an object, and every file becomes a property. This is where it becomes flexible, because of the naming options. 

For example, a tree like this

    - ext/
      - cfgs/
        - defaults.cfgs
        - settings.cfgs
      - cmds/
        - voice.cmds
      - data/ 
        - status/
          - status.flag
          - status.mask

would become objects in the framework like:

    "cfgs" : {
     "defaults" : {...},
     "settings" : {...}
    },

    "cmds" : {
     "voice" : {...}
    },

    "data" : {
     "status" : {
      "flag" : "...",
      "mask" : [...]
     }
    }

Notice how "flag" and "mask" pick up their names from their file-extensions, instead of their file-names. 
But you could also achieve the same result by placing both "status.flag" and "status.mask" directly under "data" 
They don't necessarily need to be contained like that. It will automatically create the "status" object anyway. 
Also, you don't have to name the folder after the file-extensions contained either. That's just for simplicity's sake. 

Now you can also combine the two and have a subdirectory and a file-extension share the same name. 

For example, this component:

    - carousel/
      - cfgs/
        - custom1.cfgs 
        - custom2.cfgs 
      - default.cfgs      <<

    would become:

    "carousel" : {
     "cfgs" : { 
      "default" : {...},  <<
      "custom1" : {...},  
      "custom2" : {...}   
     }
    }

And lastly, those simple file-extension rules in "_fs" can make any type, including functions. 
They can also access data recently imported from the current tree. 

For example, a component like:

    - global/
      - carousel/
        - carousel.init
        - carousel.exit
      - global.vars

    would make:

    "global" : {
     "carousel" : {
      "init" : function(){...},
      "exit" : function(){...}
     },
     "vars" : "..."
    }

The "init" and "exit" functions would have their code and the code from "global.vars" if specifically told to do so.



