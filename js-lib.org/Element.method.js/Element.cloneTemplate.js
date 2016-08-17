document
.	getElementByNamespaceId = function(){return document.getElementById(this.id+"."+arguments[0])}
;

document
.	cloneTemplate = function ()
	{	var
			clone=document.head.appendChild(this.cloneNode(true))
		;	clone.id=this.id+"-"+(this.clones=this.clones||[]).push(clone)
		;
		var list = clone.getElementsByTagName("*");
		for (var i=list.length;i--;)
			if (list[i].id)
			{	list[i].id = clone.id+"." + list[i].id.split(this.id+".").join("")
				list[i].getElementById = document.getElementByNamespaceId
			}
		;
		clone.getElementById=document.getElementByNamespaceId;
		return document.head.removeChild(clone)
	}
;
