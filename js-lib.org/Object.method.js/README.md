Object[method]
------------------------------------------

#| Object.default

## Usage:

 * "Overlaying specific properties of an object onto another. Example: Settings/Defaults."

### DEFAULTING

 1. `Object.template(cfgs.settings, cfgs.defaults);`

```
    function Favorites( settings )
    {   
        Object.default
        (   settings = settings || {}
        ,   {   
                "Radio"   : "WDEFAULT"
            ,   "Color"   : "Blue"
            ,   "Numbers" : [ 7, 77, Infinity ]
            ,   "Foods"
            :   {   "Pizza"     : "Mushroom"
                ,   "Ice-Cream" : "Caramel"
                }
            }
        );
        
    };
    
    new Favorites( {"Foods":{"Pizza":"Cheese"}} );
```
