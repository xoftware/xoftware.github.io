/**\	on.js
\**/
/**\	(c)	2014
\**/
Object.default = function
(	table
,	template
)	{	
		for(var i in template)
		{
			if (!template.hasOwnProperty(i))
				continue
			;
			
			switch
			(	Object.prototype.toString.call( template[i] )
			)	{	case '[object Array]' : table[i] = Object.default(table[i]||[], template[i]);
						break;
					case '[object Object]': table[i] = Object.default(table[i]||{}, template[i]);
				}	// TODO: Functions, RegExp, Date, etc.
			
			if (table[i] == void 0)
				table[i] = template[i]
		}
		
		return table
	}
;
/**\	Ryan Stortz
\**/
/**\	May 11
\**/
