on.js
-------------------------------
    return true;
	
### What is on.js?

*A Javascript Library*

<table><tr><td>  
<p>It uniquely integrates
the essentials of Front-end JavaScript.</p>

<ul>
<li>a.) Best-Practices &amp; Native Conventions</li>
<li>b.) Benchmark-Optimized &amp; Scale-Integrated Framework</li>
<li>c.) Cross-browser Compatability &amp; Polyfills</li>
<li>d.) DOM/Iframe Iteration &amp; Manipulation</li>
<li>e.) Event Management, Ajax Polling, File Uploading, &amp; Script Loading</li>
<li>f.) Asynchronous Scope Introspection, Datatype Detection &amp; Aliases</li>
</ul>

<p>Including Optional Dependency, Developer's Documentation.</p>

<ul>
<li>g.) Live In-Console Wiki</li>
</ul>
</td><td>
<img src="https://github.com/xoftware/js-lib.org/raw/master/on.js/OnJavaScript.png?raw=true">
</td></tr></table>


------------------------------------

*A Keyword*

on.js introduces an artificial keyword, with 3 syntactical methods.

 1. Prepositional Methods
 2. Datatype Methods
 3. Constructor & Global Methods
 
-------------------------------------


# Binding Events
    host event object

*Events*

### | OVERVIEW

*Attaching event handlers to elements should be simple and universal. on.js makes everything possible in one easy step.*

### | KEYWORDS

 * this

### | ARGUMENTS

 * event

### | METHODS

 * 'load'
 * 'unload'
 * 'abort'
 * 'error'
 * 'scroll'
 * 'resize'
 * 'reset'
 * 'submit'
 * 'focus'
 * 'blur'
 * 'select'
 * 'change'
 * 'cut'
 * 'copy'
 * 'paste'
 * 'keydown'
 * 'keyup'
 * 'keypress'
 * 'touchstart'
 * 'touchend'
 * 'touchmove'
 * 'touchcancel'
 * 'contextmenu'
 * 'dblclick'
 * 'mousewheel' (webkit)
 * 'DOMMouseScroll' (firefox)
 * 'mousemove'
 * 'mouseover'
 * 'mouseout'
 * 'mousedown'
 * 'mouseup'
 * 'click'

### | METHODS

```javascript
on.event.preventDefault.call(e);    //cancels default browser behavior on the event
```

```javascript
on.event.stopPropagation.call(e);   //cancels propagation on the event
```

### DOCUMENT

*Tight & Loose Binding*

```javascript
("click").on(document)
(   function(e)         //the callback function with the event object
    {
            this;       //target element
    }
);
```

### ELEMENT

*Tight Binding*

```javascript
var element = document.getElementById('the-id');

("click").on(element)
(   function(e)         //the callback function with the event object
    {
        this;           //the element
    }
);
```

*Loose Binding*

```javascript
("click").on(document)
(   function(e)         //the callback function with the event object
    {
        if(this.id==='the-id')
        {
            this;       //each element
        }
    }
);
```

### ELEMENT(S)

*Tight Binding*

```javascript
var elements = on.document.getElementsByAttribute('the-attribute');

("click").on(elements)
(   function(e)         //the callback function with the event object
    {
        this;           //each element
    }
);
```

*Loose Binding*

```javascript
("click").on(document)
(   function(e)         //the callback function with the event object
    {
        if(this.getAttribute('the-attribute'))
        {
            this;       //each element
        }
    }
);
```

-------------------------------------


# Sending/Recieving Data
    Asynchronous JavaScript and XML
*AJAX*

### | OVERVIEW

AJAX content retrieval should be simple and universal. on.js makes everything possible in one easy step.

### | KEYWORDS

 * this

### | PROPERTIES

 * this.GET
 * this.POST

### | ARGUMENTS

 * error

### | METHODS

 * 'GET'
 * 'POST'

### GET

```javascript
/**\    basic "GET"
\**/
/**\    fetch content
\**/

("GET").on("webpage/url/")                     //the page to get
(   function(err)
    {
        console.log(this.responseText);             //the content fetched
    }
);
```

```javascript

/**\    "GET" with variables        (first way)
\**/
/**\    fetch content
\**/

("GET").on("webpage/url/?publicVar1=true")     //the page to get
(   function(err)
    {
        console.log(this.GET);                      //the public variables
        console.log(this.responseText);             //the content fetched
    }
);
```

```javascript
/**\    "GET" with variables        (second way)
\**/
/**\    fetch content
\**/

("GET publicVar1=true").on("webpage/url/")     //the page to get
(   function(err)
    {
        console.log(this.GET);                      //the public variables
        console.log(this.responseText);             //the content fetched
    }
);
```

```javascript
/**\    "GET" with variables        (both ways)
\**/
/**\    fetch content
\**/

("GET publicVar1=true").on("webpage/url/?publicVar2=true")     //the page to get
(   function(err)
    {
        console.log(this.GET);                      //the public variables
        console.log(this.responseText);             //the content fetched
    }
);
```

### POST

```javascript
/**\    basic "POST"
\**/
/**\    fetch content
\**/

("POST").on("webpage/url/")                   //the page to post to
(   function(err)
    {
        console.log(this.responseText);             //the content fetched
    }
);
```

```javascript
/**\    "POST" with variables       (standard way)
\**/
/**\    fetch content
\**/

('POST priVar1=true').on("webpage/url/")            //the page to post to
(   function(err)
    {
        console.log(this.POST);                     //the private variables
        console.log(this.responseText);             //the content fetched
    }
);
```

```javascript
/**\    "POST" with variables       (standard way)
\**/
/**\    fetch content
\**/

('POST priVar=true').on("webpage/url/?pubVar=true")    //the page to post/get
(   function()
    {
        console.log(this.GET);                          //the public variables
        console.log(this.POST);                         //the private variables
        console.log(this.responseText);                 //the content fetched
    }
);
```

------------------------------------------------


# Submitting Form Data
    Form Inputs
*AJAX*

### | OVERVIEW

*AJAX form submission should be simple and universal. on.js makes everything possible in one easy step.*

### SINGLE FORM

```html
<form id="TheForm" action="webpage/url/">

<input type="submit" value="Submit" />

</form>
```

```javascript
('submit').on('TheForm')  //the "submit" event on the form
(   function(e)
    {
        on.event.preventDefault.call(e);    //prevent default html submit

        ("POST").on(this)                  //the ajax form post (formatted/encoded)
        (   function(err)
            {
                this.responseText;          //the content fetched
            }
        );
    }
);
```

### MULTIPLE FORMS

```html
<form class="These Forms" id="TheForm1" action="../the/first/url">

<input type="submit" value="Submit" />

</form>

<form class="These Forms" id="TheForm2" action="../the/second/url">

<input type="submit" value="Submit" />

</form>
```

```javascript
var theseForms = on.document.getElementsByClassName('These Forms');

('submit').on(theseForms)               //the "submit" event on each form
(   function(e)
    {
        on.event.preventDefault.call(e);    //prevent default html submit

        ('POST').on(this)                  //the ajax form post (formatted/encoded)
        (   function(err)
            {
                this.responseText;          //the content fetched
            }
        );
    }
);
```

### ALL FORMS

```javascript
('submit').on(document.forms)               //the "submit" event on each form
(   function(e)
    {
        on.event.preventDefault.call(e);    //prevent default html submit

        ('POST').on(this)                  //the ajax form post (formatted/encoded)
        (   function(err)
            {
                this.responseText;          //the content fetched
            }
        );
    }
);
```

### ACTION & METHOD

*In JavaScript*

```html
<form id="TheJavaScriptForm" action="../the/html/url">

<input type="submit" value="Submit" />

</form>
```

```javascript
("submit").on("TheJavaScriptForm")          //the "submit" event on the form
(   function(e)
    {
        on.event.preventDefault.call(e);     //prevent default html submit
        this.action = "../the/js/url";

        ("GET").on(this)                    //the ajax form post (formatted/encoded)
        (   function(err)
            {
                this.responseText;           //the content fetched
            }
        );
    }
);
```

*In HTML*

```html
<form id="TheHTMLForm" method="POST" action="../the/html/url">

<input type="submit" value="Submit" />

</form>
```

```javascript
("submit").on("TheHTMLForm")  //the "submit" on the element
(   function(e)
    {
        on.event.preventDefault.call(e);    //prevent default html submit

        on.form.submit.call                  //the ajax form post (formatted/encoded)
        (   this
        ,   function(err)
            {
                this.responseText;                      //the content fetched
            }
        );
    }
);
```

-------------------------------------------------------------


# Uploading Files
    FormData
*AJAX*

### | OVERVIEW

*Ajax file uploads should be simple and universal. on.js makes everything possible in one easy step.*

 * Support for All Browsers
 * Progress/Event Support for Modern Browsers
 
### | METHODS

 * 'progress'
 * 'complete'
 * 'start'
 * 'end'
 * 'error'
 * 'abort'

### | ALIASES

*Upload Event(s)*

```javascript
("upload").on(this)
(   function(e)
    {
        100 * (e.loaded/e.total) + "%";
    }
);
```

```javascript
("upload progress").on(this)
(   function(e)
    {
        100 * (e.loaded/e.total) + "%";
    }
);
```

```javascript
on.form.upload.progress.call
(   this
,   function(e)
    {
        100 * (e.loaded/e.total) + "%";
    }
);
```

### UPLOAD PROGRESS

```html
<form id="TheUploadForm" action="webpage/url">

<input type="file" value="Select A File" />

<input type="submit" value="Submit" />

</form>
```

```javascript
("submit").on("TheUploadForm")
(   function(e)
    {
        on.event.preventDefault.call(e);

        ("upload progress").on(this)
        (   function(e)
            {
                100 * (e.loaded/e.total) + "%";
            }
        );

        ("POST").on(this)
        (   function(err)
            {
                this.responseText;
            }
        );
    }
);
```

-----------------------------------------------

# For Each Loops
    Iterate Items/Properties
*for each*

### | OVERVIEW

*For Each Loops should be simple and universal. on.js makes everything possible in one easy step.*

### | KEYWORDS

 * this
 * return true
 * return false

### | ARGUMENTS

 * i/name

### | METHODS

 * "for each"

### ARRAYS

```javascript
("for each").on(['abc',123,'xyz',789])
(   function(i)     //the function to be called on every item with index [i]
    {
        i;          //each item index
        this[i];    //each item value
    }
);
```

### OBJECTS

```javascript
("for each").on({'abc':123,'xyz':789})
(   function(name)  //the function to be called on every property with index [name]
    {
        name;       //each property name
        this[name]; //each property value
    }
);
```

### DOCUMENT

*Nodes*

```javascript
("for each").on(document)
(   function(i)     //the function to be called on every element with index [i]
    {
        i;          //each element index
        this[i];    //each element
    }
);
```

```javascript
("for each div").on(document)
(   function(i)     //the function to be called on every div with index [i]
    {
        i;          //each div index
        this[i];    //each div
    }
);
```

*Children*

```javascript
("for each child").on(document)
(   function(i)     //the function to be called on every element with index [i]
    {
        i;          //each child element index
        this[i];    //each child element
    }
);
```

```javascript
("for each child div").on(document)
(   function(i)     //the function to be called on every child div with index [i]
    {
        i;          //each child div index
        this[i];    //each child div
    }
);
```

### ELEMENT

*Nodes*

```javascript
("for each").on("the-element")
(   function(i)     //the function to be called on every element with index [i]
    {
        i;          //each element index
        this[i];    //each element
    }
);
```

```javascript
("for each div").on("the-element")
(   function(i)     //the function to be called on every div with index [i]
    {
        i;          //each div index
        this[i];    //each div
    }
);
```

*Children*

```javascript
("for each child").on("the-element")
(   function(i)     //the function to be called on every element with index [i]
    {
        i;          //each child element index
        this[i];    //each child element
    }
);
```

```javascript
("for each child div").on("the-element")
(   function(i)     //the function to be called on every child div with index [i]
    {
        i;          //each child div index
        this[i];    //each child div
    }
);
```

-------------------------------------------

# Document & Element
    Document Object Model
*DOM*

### | OVERVIEW

*It's best not to iterate on the DOM selectively, but if you must, on.js adheres closest to native conventions.*

### DOCUMENT

*By Id*

```javascript
document.getElementById('the-id');
```

*By TagName*

```javascript
on.document.getElementsByTagName('*');      //on.document.getElementsBy.tagName
```

```javascript
on.document.getElementsByTagName('div');        //on.document.getElementsBy.tagName
```

```javascript
on.document.eachElementByTagName        //on.document.eachElementBy.tagName
(   '*'
,   function(i)                         //perform a function on each current element
    {
        this[i];                        //each element
        return true;			//continue the loop early (if needed)
        return false;                   //break the loop early (if needed)
    }
);
```

```javascript
on.document.eachElementByTagName        //on.document.eachElementBy.tagName
(   'div'
,   function(i)                         //perform a function on each current element
    {
        this[i];                        //each element
        return true;			//continue the loop early (if needed)
        return false;                   //break the loop early (if needed)
    }
);
```

*By Class*

```javascript
on.document.getElementsByClassName('the-class-to-find');        //on.document.getElementsBy.className
```

```javascript
on.document.getElementsByClassPrefix('the-class-prefix-');      //on.document.getElementsBy.classPrefix
```

```javascript
on.document.getElementsByClassSuffix('-the-class-suffix');      //on.document.getElementsBy.classSuffix
```

```javascript
on.document.getElementsByClassContains('the-search-string');        //on.document.getElementsBy.classContains
```

```javascript
on.document.eachElementByClassName      //on.document.eachElementBy.className
(   'the-class-to-find'
,   function(i)                         //perform a function on each current element
    {
        this[i];                        //each element
        return true;			//continue the loop early (if needed)
        return false;                   //break the loop early (if needed)
    }
);
```

```javascript
on.document.eachElementByClassPrefix        //on.document.eachElementBy.classPrefix
(   'the-class-prefix-'
,   function(i)                         //perform a function on each current element
    {
        this[i];                        //each element
        return true;			//continue the loop early (if needed)
        return false;                   //break the loop early (if needed)
    }
);
```

```javascript
on.document.eachElementByClassSuffix        //on.document.eachElementBy.classSuffix
(   '-the-class-suffix'
,   function(i)                         //perform a function on each current element
    {
        this[i];                        //each element
        return true;			//continue the loop early (if needed)
        return false;                   //break the loop early (if needed)
    }
);
```

```javascript
on.document.eachElementByClassContains      //on.document.eachElementBy.classContains
(   'the-search-string'
,   function(i)                         //perform a function on each current element
    {
        this[i];                        //each element
        return true;			//continue the loop early (if needed)
        return false;                   //break the loop early (if needed)
    }
);
```

*By Attribute*

```javascript
on.document.getElementsByAttribute('the-attribute');        //on.document.getElementsBy.attribute
```

```javascript
on.document.getElementsByAttribute('the-attribute','the-value');        //on.document.getElementsBy.attribute
```

```javascript
on.document.getElementsByAttribute      //on.document.eachElementBy.attribute
(   'the-attribute'
,   null
,   function(i)                         //perform a function on each current element
    {
        this[i];                        //each element
        return true;			//continue the loop early (if needed)
        return false;                   //break the loop early (if needed)
    }
);
```

```javascript
on.document.getElementsByAttribute      //on.document.eachElementBy.attribute
(   'the-attribute'
,   'the-value'
,   function(i)                         //perform a function on each current element
    {
        this[i];                        //each element
        return true;			//continue the loop early (if needed)
        return false;                   //break the loop early (if needed)
    }
);
```

### ELEMENT

*Classes*

```javascript
on.element.hasClass.call(theElement,'the-class');
```

```javascript
on.element.addClass.call(theElement,'the-new-class');
```

```javascript
on.element.delClass.call(theElement,'the-old-class');
```

```javascript
on.element.hasClasses.call(theElement,'the-class the-other-class');
```

```javascript
on.element.addClasses.call(theElement,'the-new-class the-other-new-class');
```

```javascript
on.element.delClasses.call(theElement,'the-old-class the-other-old-class');
```

*Offsets*

```javascript
on.element.offsetLeft.call(theElement);
```

```javascript
on.element.offsetTop.call(theElement);
```

*Siblings*

```javascript
on.element.nextElementSibling.call(theElement);
```

*Tags*

```javascript
on.element.hasTagBody.call('<div id="the-id" class="the-class the-other-class" the-attribute="the-value">');
```

```javascript
on.element.hasTagBody.call('<div class="the-class the-other-class" the-attribute="the-value">');
```

```javascript
on.element.hasTagBody.call('id="the-id" class="the-class the-other-class" the-attribute="the-value"');
```

```javascript
on.element.hasTagBody.call('<div the-attribute="the-value" class="the-class" the-other-attribute="the-other-value">');
```

-------------------------------------------------------------------------------------------


# Accessing Iframes
    Inline Frames
*Iframes*

### | OVERVIEW

*Working with Iframes should be simple and universal. on.js makes everything possible in one easy step.*

### | METHODS

*Window*

```javascript
on.iframe.window(theIframeElement);
```

*Document*

```javascript
on.iframe.document(theIframeElement);
```

*Body*

```javascript
on.iframe.document(theIframeElement).body;
```

--------------------------------------------------------------------


# Dependency Injection [Beta]
    Modules and Scripts
*AJAX*

### | OVERVIEW

*Dependency Injection should be simple and universal. on.js makes everything possible in one easy step.*

### | KEYWORDS

 * this [optional]

### | ARGUMENTS

 * private [optional]

### | METHODS

 * "load script"
 * "load module"

### JAVASCRIPT

```javascript
("load script").on("../the-script-file.js")
(   function(err)      //the callback function to be executed after the script file has loaded
    {        
    }
);
```

### PUBLIC MODULES

```javascript
("load module").on("../the-module-file.js")
(   function(err)      //the callback function to be executed after the script file has loaded
    {        
        this;           //the public scope of the module (access to global)
        any_variable;       //any variable in the global scope
    }
);
```

### PRIVATE MODULES

```javascript
("load module").on("../the-module-file.js")
(   function(private)   //the callback function to be executed after the script file has loaded
    {        
        this;           //the private scope of the module (no access to global)
        any_variable;       //any variable in the private scope of the module
    }
);
```

------------------------------------------------------


# Printing Manual Pages
    In-Console Wiki
*Developer Documentation*

### | OVERVIEW

*As an optional feature, on.js logs out relevant usage information anywhere in your code with `on(this)`*

### | REQURE

 * on_this.js [optional]

### | MANUAL PAGES

Events

 * document
 * element
 * element lists

Ajax

 * GET
 * POST

Script Loading

 * script
 * public module
 * private module

DOM

 * eachElementBy
 * for each

Arrays

 * for each

Objects

 * for each

Element Lists

 * for each

### INTROSPECTION

```javascript
var contentBody = document.getElementById('content-body');
var contentTabs = document.getElementById('content-tabs');

var activeTab;

("mouseover").on(contentTabs.children)
(   function(e)
    {
        on.event.preventDefault.call(e);
        on(this); //console logs man page for Events on Elements

        var queryTab = activeTab = this;

        ("POST").on(this.href+"?ajax=true")
        (   function(err)
            {
                if (activeTab != queryTab) return;

                on(this); //console logs man page for ajax POST on URL
                contentBody.innerHTML = this.responseText;
            }
        );
    }
);

on(this); //console logs man page for on.js
```
