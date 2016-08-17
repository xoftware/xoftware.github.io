Element[method]
------------------------------------------

# | Element.cloneTemplate

## Usage: 

 * "Similar to `Element.cloneNode`, but with unique id indices and namespaces."
		
### CLONING
		
 1. `(element).cloneTemplate();`

	```
    (element).cloneTemplate = document.cloneTemplate;
			
    for
    	(	var clones=[]
    	;	10 >= clones.push((element).cloneTemplate());
    	)
    ;
	```
	
 2. `document.cloneTemplate.call((element));`

	```
    for
		(	var clones=[]
    	;	10 >= clones.push(document.cloneTemplate.call((element)));
    	)	
    ;
	```
			
### REFERENCING
		
 1. `(clone).getElementById("component");`
 2. `(clone).getElementById("component.sub-component");`
 3. `(clone).getElementById("component").getElementById("sub-component");`