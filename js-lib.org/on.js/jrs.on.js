/**\	on.js
\**/
/**\	(c)	2014
\**/
(	function ()
	{
		(	on = function()
			{	var type = 
					this instanceof arguments.callee
					?	"[on Constructor]"
					:	"[on Function]"
				;
				return {toString:function(){return type}}
			}
		)	.	toString = function()
				{	return "[on]" 
				}
		;
		
			String.prototype[on]=function(data){return exec(data,this.valueOf())};
			RegExp.prototype[on]=function(data){return exec(data,this.source)};
			
			/*	Man Pages	*/
			on['about'] = function(){on_about&&on_about(INFO_FLAG)};var INFO_RESET,INFO_FLAG=0;
			
			var util = { };
			/* Not Found	*/
			util['not found']													= function(args,cmmd)					{ console.warn('[on] command: {'+cmmd+'('+args+')} not found !') };

			/* All Tools   */
			util['typeof']														= Object.prototype.toString;
			util['slice']														= function(i,l,a)						{ if(i<0)i+=this.length;if(l<0)l+=this.length;i=i||0;l=l||this.length;if(this.charAt){for(a=a||'';i<l;i+=1)a+=this.charAt(i);}else{for(a=a||[];i<l;i++)a.push(this[i])}return a };
				
			/*	Number util */			  util.number							= { };
			util['pad left']			= util.number['pad left']				= function(l)							{ return l?(this.valueOf()<0?'-':'')+(('0000000000')+Math.abs(this.valueOf())).slice(-l):this.valueOf(); };

			/*	String Tools */			  util.string							= { };

			/* Event Tools  */			  util.event							= { };									var ev = window.addEventListener?['addEventListener','']:['attachEvent','on'], ev_callbacks = {}, event_type=function(name){ for(var i=ev_types.length;--i;)if(name===ev_types[i])return true }; var ev_types=['load','unload','abort','error','scroll','resize','reset','submit','focus','blur','select','change','cut','copy','paste','keydown','keyup','keypress','touchstart','touchend','touchmove','touchcancel','contextmenu','dblclick','mousewheel','DOMMouseScroll','mousemove','mouseover','mouseout','mousedown','mouseup','click'];
			util["add event"]			= util.event['add']						= function(node,exec,type)				{ node[ev[0]](ev[1]+type,function(e){INFO_RESET=INFO_FLAG;INFO_FLAG=10;exec.call(node,e||window.event)},false);INFO_FLAG=INFO_RESET; };
			util["bind event"]			= util.event['bind']					= function(exec,type)					{ if(ev_callbacks[type]==undefined){ev_callbacks[type]=[];document[ev[0]](ev[1]+type,function(e){INFO_RESET=INFO_FLAG;INFO_FLAG=11;e=e||window.event;for(var i=0,l=ev_callbacks[type].length;i<l;i++){ev_callbacks[type][i].call(e.srcElement||e.target,e)}INFO_FLAG=INFO_RESET;},false)}else{for(var i=ev_callbacks[type].length;i--;)if(exec==ev_callbacks[type][i])return i}return ev_callbacks[type].push(exec) };
			
			/* Array Tools */			  util.array							= { };
			util['for each item']		= util.array['for each']				= function(callback)					{ var i=0,l=this.length,n;for(n=l%8;n--;){if(callback.call(this,i++)===false)return false}for(n=Math.floor(l/8);n--;){if(callback.call(this,i++)===false||callback.call(this,i++)===false||callback.call(this,i++)===false||callback.call(this,i++)===false||callback.call(this,i++)===false||callback.call(this,i++)===false||callback.call(this,i++)===false||callback.call(this,i++)===false)return false}return true };

			/* Host List Tools */		  util.hostlist							= { };

			/* Object Tools */			  util.object							= { };
			util['for each prop']		= util.object['for each']				= function(callback)					{ var k;for(k in this){if(this.hasOwnProperty(k))if(callback.call(this,k)==false)return false}return true };
			util['count props']			= util.object['count']					= function(_i,_k)						{ var i=0,k;for(k in this){if(this.hasOwnProperty(k))if(i++==_i)return _k?this[k]:k}return i };

			/* Element Tools */			  util.element							= { };
			util['for each child tN']	= util.element['for each child tN']		= function(callback, tagName)			{ for(var i=0,l=this.length;i<l;i+=1){if(this[i].nodeType===1)if(this[i].tagName===tagName)if(callback.call(this,i)===false)return false}return true };

			util['new script']			= util.element['new script']			= function(src)							{ var node=document.createElement('script');node.setAttribute('src',src);node.setAttribute('type','text/javscript');document.getElementsByTagName('head')[0].appendChild(node);return node };
			util['new css']				= util.element['new link']				= function(src)							{ var node=document.createElement('link');node.setAttribute('href',src);node.setAttribute('type','text/css');node.setAttribute('rel','stylesheet');document.getElementsByTagName('head')[0].appendChild(node);return node };
			util['new iframe']			= util.element['new iframe']			= function(src,name,width,height)		{ var node;try{node=document.createElement("<iframe name=\""+name+"\" />")}catch(e){(node=document.createElement('iframe')).name=name}node.setAttribute('src',src);node.style.width=width;node.style.height=height;node.setAttribute('frameborder',0);this.appendChild(node);return node };		
			util['new element']			= util.element['new']					= function(type,className,Id,src)		{ var node=document.createElement(type);node.setAttribute('class',className);node.setAttribute('id',Id);src && node.setAttribute('src',src);this.appendChild(node);return node };

			/*	Async Tools */			  util.ajax 							= on.ajax = { };						/*according to spec-->couldn't we just test for: (responseText !== null)*/
/**/		//	THE FOLLOWING IMPLEMENTATION IS PRONE TO AWESOMENESS
			//	
			util['ajax schedule']		= util.ajax['schedule']					= 
			function(jsro,method,url,pass)
			{	var ajax=util.ajax;
				
				1===ajax.busy.push
				(	function(xhro)
					{	xhro.abort();			//to ensure the integrity of the xhro
										
						for (var p in xhro.upload)
						(	xhro.upload[p]=jsro.upload[p]
						);	jsro.upload=null;
										
						for (var p in jsro)
						(	xhro[p]=jsro[p]
						);	jsro=null;
									
						ajax[method](xhro,url,pass);
					}
				)	&& 
					(	function()
						{	var i=ajax.quee[0]+1;

							while(--i||!setTimeout(arguments.callee,0))
							{	if((ajax.quee[i]=ajax.quee[i]||ajax.xhro()).onreadystatechange)
									continue;
									
								ajax.busy.shift()
								(	ajax.quee[i]
								);

								ajax.busy.length &&
									arguments.callee();
								return;
							}
						}
					)();
			};
			
			util['ajax request']		= util.ajax['request']				= 
			function(callback,datatype)
			{ 	var jsro={upload:{}};
				switch(datatype)
				{	case(void 0):default: jsro.onreadystatechange=function(){if(this.readyState===4){INFO_RESET=INFO_FLAG;INFO_FLAG=20;callback.call(this,(this.status!==200&&this.status));INFO_FLAG=INFO_RESET;this.onreadystatechange=null;}};break;break;
					case  'load module' : jsro.onreadystatechange=function(){if(this.readyState===4){if(this.status===200){INFO_RESET=INFO_FLAG;var code=this.responseText;if(callback.length){INFO_FLAG=23;new (function(){try{eval(code)}catch(e){}finally{eval('('+callback.toString()+').call(this,true)')}})()}else{INFO_FLAG=22;callback.call(new (function(){try{eval(code)}catch(e){}})())}INFO_FLAG=INFO_RESET;}this.onreadystatechange=null;}};break;
					case  'load script' : jsro.onreadystatechange=function(){if(this.readyState===4){if(this.status===200){INFO_RESET=INFO_FLAG;INFO_FLAG=21;try{eval(this.responseText)}finally{callback()}INFO_FLAG=INFO_RESET;}this.onreadystatechange=null;}};break;
				}
				return jsro;
			};

			util['ajax xhro']			= util.ajax['xhro'] = function(){return new XMLHttpRequest()||new ActiveXObject("Msxml2.XMLHTTP")||new ActiveXObject("Microsoft.XMLHTTP")||null};
			util['ajax busy']			= util.ajax['busy'] = [   ];
			util['ajax quee']			= util.ajax['quee'] = [100];
			
			util['ajax POST']			= util.ajax['POST']					= function(xhro,url,pass)				{ var i=url.indexOf('?')+1;xhro.GET=i?url.substr(i):null;xhro.POST=pass||null;xhro.open('POST',url,true);if('string'===typeof pass){xhro.setRequestHeader("Content-type","application/x-www-form-urlencoded")}xhro.send(xhro.POST) };
			util['ajax GET' ]			= util.ajax['GET' ]					= function(xhro,url,pass)				{ var i=url.indexOf('?')+1;xhro.POST=null;xhro.GET=pass?(url+=(i?('&')+(pass=url.substr(i)+'&'+pass,''):('?'))+pass,pass):(i?url.substr(i):null);xhro.open('GET',url,true);xhro.send(null) };

/**/
/*			//	THE FOLLOWING IMPLEMENTATION IS PRONE TO COLLISONS
			//	SEEN IN: IE 7-9, WITH >= 100,000 iterations
			util['ajax schedule']		= util.ajax['schedule']				= function(jsro,method,url,pass)		{ var ajax=util.ajax; ajax.busy.push(function(xhro){ var ajax=util.ajax,p;for(p in xhro.upload){xhro.upload[p]=jsro.upload[p]}jsro.upload=null;for(p in jsro){xhro[p]=jsro[p]}jsro=null;ajax[method](xhro,url,pass) }); ajax.quee[0]-->0 && ajax.quee.push(ajax.xhro()); ajax.quee[1] && ajax.next(ajax.quee.pop()); };
			util['ajax request']		= util.ajax['request']				= 
			function(callback,datatype)
			{ 	var jsro={upload:{}};
				switch(datatype)
				{	case(void 0):default: jsro.onreadystatechange=function(){if(this.readyState===4){INFO_RESET=INFO_FLAG;INFO_FLAG=20;callback.call(this,(this.status!==200&&this.status));INFO_FLAG=INFO_RESET;util.ajax.next(this);}};break;break;
					case  'load module' : jsro.onreadystatechange=function(){if(this.readyState===4){if(this.status===200){INFO_RESET=INFO_FLAG;var code=this.responseText;if(callback.length){INFO_FLAG=23;new (function(){try{eval(code)}catch(e){}finally{eval('('+callback.toString()+').call(this,true)')}})()}else{INFO_FLAG=22;callback.call(new (function(){try{eval(code)}catch(e){}})())}INFO_FLAG=INFO_RESET;}util.ajax.next(this);}};break;
					case  'load script' : jsro.onreadystatechange=function(){if(this.readyState===4){if(this.status===200){INFO_RESET=INFO_FLAG;INFO_FLAG=21;try{eval(this.responseText)}finally{callback()}INFO_FLAG=INFO_RESET;}util.ajax.next(this);}};break;
				}
				return jsro;
			};
			util['ajax xhro']			= util.ajax['xhro']					= function()							{ return new XMLHttpRequest()||new ActiveXObject("Msxml2.XMLHTTP")||new ActiveXObject("Microsoft.XMLHTTP")||null };
			util['ajax busy']			= util.ajax['busy'] = [   ];
			util['ajax quee']			= util.ajax['quee'] = [100];
			util['ajax next']			= util.ajax['next']					= function(xhro)						{ xhro.abort(); util.ajax.busy.length?util.ajax.busy.shift()(xhro):util.ajax.quee.push(xhro) };

			util['ajax POST']			= util.ajax['POST']					= function(xhro,url,pass)				{ var i=url.indexOf('?')+1;xhro.GET=i?url.substr(i):null;xhro.POST=pass||null;xhro.open('POST',url,true);if('string'===typeof pass){xhro.setRequestHeader("Content-type","application/x-www-form-urlencoded")}xhro.send(xhro.POST) };
			util['ajax GET' ]			= util.ajax['GET' ]					= function(xhro,url,pass)				{ var i=url.indexOf('?')+1;xhro.POST=null;xhro.GET=pass?(url+=(i?('&')+(pass=url.substr(i)+'&'+pass,''):('?'))+pass,pass):(i?url.substr(i):null);xhro.open('GET',url,true);xhro.send(null) };
*/
			on.event = new function(self)
			{	self=this;
				self.stopPropagation		= function(){ this.stopPropagation?this.stopPropagation():this.cancelBubble=true; };
				self.preventDefault			= function(){ this.preventDefault?this.preventDefault():this.returnValue=false; };
				self.wheelDelta				= function(){ return this.wheelDelta||this.detail*-40 };
				self.detail					= function(){ return this.detail||this.wheelDelta/-40 };
			};
			on.iframe = new function(self)
			{	self=this;
				self.window					= function(){ var N=this; return N.contentWindow||N.window||(N=N.contentDocument||N.document).defaultView||N.parentWindow||null };
				self.document				= function(){ var N=this; return (N=N.contentDocument||N.contentWindow||N).document||N	};
			};
			on.document = new function(self)
			{	self=this;
				self.eachElementBy 			= {};
				self.getElementsBy			= {};

				self.getElementsByTagName	= self.getElementsBy.tagName	= function(tagName)						{ var node=(this.nodeType===void 0?document:this);return node.getElementsByTagName(tagName) };
				self.eachElementByTagName	= self.eachElementBy.tagName	= function(tagName,callback)			{ var node=(this.nodeType===void 0?document:this);return util['for each item'].call(node.getElementsByTagName(tagName),callback) };
				self.getElementById											= function(Id)							{ var node=(this.nodeType===void 0?document:this);return node.getElementById(Id) };
					
				self.getElementsByClassPrefix								= function(className)					{ return self.getElementsByClassName.call(this,className,void 0,true) };
				self.getElementsByClassSuffix								= function(className)					{ return self.getElementsByClassName.call(this,className,void 0,void 0,true) };
				self.getElementsByClassContains								= function(className)					{ return self.getElementsByClassName.call(this,className,void 0,true,true) };
				self.eachElementByClassPrefix								= function(className,callback)			{ return self.eachElementByClassName.call(this,className,callback,true) };
				self.eachElementByClassSuffix								= function(className,callback)			{ return self.eachElementByClassName.call(this,className,callback,void 0,true) };	
				self.eachElementByClassContains								= function(className,callback)			{ return self.eachElementByClassName.call(this,className,callback,true,true) };

				self.getElementsByClassName = self.getElementsBy.className	=
				self.eachElementByClassName = self.eachElementBy.className	= function(cN,cB,pF,sF)					{ var node=(this.nodeType===void 0?document:this);if((pF||sF)===void 0&&document.getElementsByClassName){var tree=node.getElementsByClassName(cN);if(cB===void 0){return tree}else{for(var i=0,l=tree.length;i<l;i+=1){if(cB.call(tree,i)==false)return false}return true}}else{var list=[],tree=node.getElementsByTagName('*');cN=((sF?'':' ')+cN+(pF?'':' '));if(cB===void 0){for(var i=0,l=tree.length;i<l;i+=1){((' '+tree[i].className+' ').indexOf(cN)>=0)&&list.push(tree[i])}return list}else{for(var i=0,l=tree.length;i<l;i+=1){if((' '+tree[i].className+' ').indexOf(cN)>=0)if(cB.call(tree,i)==false)return false}return true}} };
				self.getElementsByAttribute = self.getElementsBy.attribute	= function(attribute,strict)			{ var node=(this.nodeType===void 0?document:this);if(document.querySelectorAll)return node.querySelectorAll('['+attribute+(strict?'="'+strict+'"':'')+']');var tree=node.getElementsByTagName('*'),list=[];if(strict!==void 0){for(var i=0,l=tree.length,test;i<l;i+=1)if(test=tree[i].getAttribute(attribute))if(test==strict)list.push(tree[i])}else{for(var i=0,l=tree.length;i<l;i+=1)if(tree[i].getAttribute(attribute))list.push(tree[i])}return list };
				self.eachElementByAttribute = self.eachElementBy.attribute	= function(attribute,strict,callback)	{ var node=(this.nodeType===void 0?document:this);if(document.querySelectorAll){var list=node.querySelectorAll('['+attribute+(strict!==void 0?'="'+strict+'"':'')+']');for(var i=0,l=list.length;i<l;i+=1)if(callback.call(list,i)==false)return false}else{var list=node.getElementsByTagName('*');if(strict!==void 0){for(var i=0,l=list.length,test;i<l;i+=1)if(test=list[i].getAttribute(attribute))if(test==strict)if(callback.call(list,i)==false)return false}else{for(var i=0,l=list.length;i<l;i+=1)if(list[i].getAttribute(attribute))if(callback.call(list,i)==false)return false}}return true };
			};
			on.element = new function(self)
			{	self=this;	
				self.addClass 				= function(c){ if((' '+this.className+' ').indexOf(' '+c+' ')==-1)return this.className+=' '+c;else return false };
				self.hasClass				= function(c){ return ((' '+this.className+' ').indexOf(' '+(c||'')+' ')>=0)&&(c) };
				self.delClass				= function(c){ var i;if((i=(' '+this.className+' ').indexOf(' '+c+' '))>=0){return this.className=this.className.substr(0,i)+this.className.substr(i+c.length+1)}return false };
				self.togClass				= function(c){ return self.hasClass.call(this,c)?self.delClass.call(this,c):self.addClass.call(this,c); };

				self.hasClasses 			= function(c){ c=c.split(' ');for(var i in c){if((' '+this.className+' ').indexOf(' '+(c[i])+' ')==-1)return false}return c=c.join(' ')  };
				self.addClasses 			= function(c){ c=c.split(' ');for(var i in c){self.addClass.call(this,c[i])}return c=c.join(' ') };
				self.delClasses 			= function(c){ c=c.split(' ');for(var i in c){self.delClass.call(this,c[i])}return c=c.join(' ') };

/**/			self.hasTagMatch			= function(t){ var m,i,test=new RegExp("<([a-z]+)([^>]+)*>","");if((m=test.exec(t))!==null)if(this.tagName!==m[1].toUpperCase())return false;test=(new RegExp("([a-zA-Z0-9\-_]+)='([a-zA-Z0-9\-_ ]+)'","g"));while((m=test.exec(t))!==null){if('id'===m[1]){if(this.id!== m[2])return false}else if('class'===m[1]){for(i=(m[2]=m[2].split(' ')).length;i--;)if((' '+this.className+' ').indexOf(' '+m[2][i]+' ')===-1)return false}else{if(this.getAttribute(m[1])!==m[2])return false}}return true };	
				
				self.offset 				= function(p){ for(var offset=0,next=this;next;next=next.offsetParent){offset+=next['offset'+p]}return offset };
				self.offsetTop				= function( ){ return self.offset.call(this,'Top') };
				self.offsetLeft				= function( ){ return self.offset.call(this,'Left') };
				self.nextElementSibling 	= function( ){ if(this.nextElementSibling)return this.nextElementSibling;for(var next;next=(next||this).nextSibling;){if(next.nodeType===1)break}return next };
				self.innerText				= function( ){ return this.innerText||this.textContent };
					
/**/			self.toSubmitFormData		= function( ){ var text="",en=encodeURIComponent;for(var k in this){if(typeof this[k]==='string'){text+="&"+en(k)+"="+en(this[k])}else{for(var i in this[k])text+="&"+en(k)+"["+i+"]"+"="+en(this[k][i])}}return text };
/**/			self.getSubmitFormDataObject= function( ){ var data={};var form=this,i=0,n,o;while(form=form.parentNode){if('FORM'===form.tagName)break}form=form.getElementsByTagName('*');while(n=form[i++]){switch((n.type||'').toLowerCase()){case'radio':case'checkbox':if(n.checked)data[n.name||n.id]=n.value;break;break;case'select-multiple':for(var k=0;o=n.options[k++];)if(o.selected)(data[n.name||n.id]=data[n.name||n.id]||[]).push(o.value||o.text);break;default:switch(n.tagName){case'INPUT':case'TEXTAREA':data[n.name||n.id]=n.value;break;break;case'SELECT':data[n.name||n.id]=(o=n.options[n.selectedIndex]).value||o.text}}}return data };
					
				self.getSubmitFormData		= 
				function(_R)
				{	var vars="";var form=this,i=0,n,o,en=encodeURIComponent;
				
					while(form){if('FORM'===form.tagName)break;form=form.parentNode}
						form=form.getElementsByTagName('*');

					while(n=form[i++])
					{	switch((n.type||'').toLowerCase())
						{	case'file':
								if(_R)
									return false;
							case'radio':
							case'checkbox':
								if(n.checked)
									vars+=	"&"	+	en(n.name||n.id)
										+	"="	+	en(n.value);
							break;
							break;
							case'select-multiple':
								for(var k=0;o=n.options[k++];)
									if(o.selected)
										vars+=	"&"		+	en(n.name||n.id)
											+	"="		+	en(o.value||o.text);
							break;
							default:
								switch(n.tagName)
								{	case'INPUT':
									case'TEXTAREA':
										vars+=	"&"	+	en(n.name||n.id)
											+	"="	+	en(n.value);
									break;
									break;
									case'SELECT':
										vars+=	"&"	+	en(n.name||n.id)
											+	"="	+	en((o=n.options[n.selectedIndex]).value||o.text);
								}
						}
					}
					return vars
				};
			};
			on.submit = new function(self)
			{	self=this;
				self.toFormData				= function(N){ return on.element.toSubmitFormData.call(N) };
				self.getFormDataObject		= function(N){ return on.element.getSubmitFormDataObject.call(N) };
				self.getFormData			= function(N){ return on.element.getSubmitFormData.call(N) };
			};
			on.form = new function(self)
			{	self=this;

				self.append					=
				function(name,value)
				{

				};

				self.upload =
				{	start:		function(c)			{ (this.upload=this.upload||{}).onloadstart=c }
				,	end:		function(c)			{ (this.upload=this.upload||{}).onloadend=c }
				,	complete:	function(c)			{ (this.upload=this.upload||{}).onload=c }
				,	error:		function(c)			{ (this.upload=this.upload||{}).onerror=c }
				,	abort:		function(c)			{ (this.upload=this.upload||{}).onabort=c }
				,	progress:	function(c)			{ (this.upload=this.upload||{}).onprogress=c }
				,	request:	function(xhro)
					{	for (var s in this.upload)
							(	xhro.upload[s]=this.upload[s]
							,	this.upload[s]=null
							);	this.upload=null
						return xhro;
					}
				};

				self.data					= function(N){ try{return new FormData(N)}catch(e){return on.element.getSubmitFormData.call(N,true)} };
				
				self.submit					=
				function(callback,method)
				{	var form=this,data;
					
					while(form){if('FORM'===form.tagName)break;form=form.parentNode}

					if(data=self.data(form))
					{	
						util.ajax.schedule
						(	self.upload.request.call(form,util['ajax request'](callback))
						,	(method||form.method).toUpperCase()	
						,	form.action
						,	data
						);
					}
					else
					{	var iframe;

						util['add event']
						(	iframe = util['new iframe'].call(form,'',+new Date(),0,0)
						,	function(e)
							{
								callback.call({responseText:on.element.innerText.call(on.iframe.document.call(this).body)});
								
								form.removeAttribute('enctype');
								form.removeAttribute('encoding');
								form.removeAttribute('target');
								form.removeChild(this);
							}
						,	'load'
						);
							
						form.setAttribute('encoding',"multipart/form-data");
						form.setAttribute('enctype',"multipart/form-data");
						form.target = iframe.name;
						form.submit();
					}			
				};
			};
	
			var exec = function(data,cmmd,type)
			{	//	NEED TO DETERMINE COURSE OF ACTION FROM DATA AND CMMD
				cmmd = cmmd || '';
				data = data || {};
				type = type || 
				(	function (coerce)
					{	
						if (typeof data === 'string')
							return (coerce=document.getElementById(data)) ? (data=coerce,'element') : 'string';

						if (data.type && (data.srcElement||data.target))
							return 'event';

						if (data.nodeType != void 0)
							return 'element';

						if (data[0] != void 0 && data[0].nodeType != void 0)
							return 'hostlist';

						if (util['typeof'].call(data) === '[object Array]')
							return 'array';

						if (data/1 === data)
							return 'number';

						return 'object';
					}
				)();
/**/
				var u;
				if (u=(util[type][cmmd]||util[cmmd]))
					return function(){return u.apply(data,arguments)};
				
				//	Recognized data commands
				switch(type)
				{	case 'hostlist':
						if(event_type(cmmd))
							return function(exec){ for(var i=data.length;i--;)util['add event'](data[i],exec,cmmd) };	
					break;
					case 'element':
						if(event_type(cmmd))
						{	if(document===data)
								return function(exec){return util['bind event'](exec,cmmd)};
							else
								return function(exec){return util['add event'](data,exec,cmmd)};
						}
						switch(cmmd)
						{	case'for each':
							case'for each node':
								return function(callback){ return util.array['for each'].call(data.getElementsByTagName('*')	,callback) };
							case'for each child':
								return function(callback){ return util.array['for each'].call((data.body||data).children		,callback) };
							case'GET':
							case'POST':
								return function(callback){ return on.form.submit.call(data,callback,cmmd) };
							case'upload':
								return function(callback){ return on.form.upload.progress.call(data,callback) };
						}

						if (0== cmmd.indexOf('new '))
						{	cmmd=cmmd.substr('new '.length).toLowerCase();
							return function(className,Id,src){ return util['new element'].call((data.body||data),cmmd,className,Id,src) };
						}
						if (0== cmmd.indexOf('for each child '))
						{	cmmd=cmmd.substr('for each child '.length).toUpperCase();
							return function(callback){ return util['for each child tN'].call((data.body||data).children,callback,cmmd) };
						}
						if (0== cmmd.indexOf('for each '))
						{	cmmd=cmmd.substr('for each '.length).toUpperCase();
							return function(callback){ return util.array['for each'].call(data.getElementsByTagName(cmmd),callback) };		
						}
						if (0== cmmd.indexOf('upload '))
						{	cmmd=cmmd.substr('upload '.length).toLowerCase();
							return function(callback){ return on.form.upload[cmmd].call(data,callback) };
						}
					break;
					case 'string':
						switch(cmmd)
						{	case'GET':
							case'POST':
								return function(callback){ util['ajax schedule'](util['ajax request'](callback),(cmmd),(data)) };
							case'load script':
							case'load module':
								return function(callback){ util['ajax schedule'](util['ajax request'](callback,cmmd),('GET' ),(data)) };
						}
						
						if (0 == cmmd.indexOf('POST '))
						{	cmmd=cmmd.substr ('POST '.length);
							return function(callback){ util['ajax schedule'](util['ajax request'](callback),('POST'),(data),(cmmd)) };
						}
						if (0 == cmmd.indexOf('GET '))
						{	cmmd=cmmd.substr ('GET '.length);
							return function(callback){ util['ajax schedule'](util['ajax request'](callback),('GET' ),(data),(cmmd)) };
						}
					break;
				}

				//	Unrecognized Exception
				return function(){return util['not found'](arguments,cmmd)};
			};		
	}
)	
	("Behold, as the clay is in the potter's hand, so are ye in mine hand"/* Jeremiah 18:6 */)
;
/**\	Xoftware
\**/
/**\	Christian Research Open-Source Software
\**/
