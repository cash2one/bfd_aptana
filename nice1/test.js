

(function(){
	if (!document.getElementsByClassName) {
	    document.getElementsByClassName = function(className, element) {
	        var children = (element || document).getElementsByTagName('*');
	        var elements = new Array();
	        for (var i = 0; i < children.length; i++) {
	            var child = children[i];
	            var classNames = child.className.split(' ');
	            for (var j = 0; j < classNames.length; j++) {
	                if (classNames[j] == className) {
	                    elements.push(child);
	                    break;
	                }
	            }
	        }
	        return elements;
	    };
	};
	var articles=document.getElementsByClassName('post-body')
	for(var i in articles){
		var p=articles[i].childNodes
		for(var j in p){
			if(p[j].nodeName=="#text"){
		   	   continue;
		   }else{
		    	if(p[j].style){
					p[j].style.fontFamily='微软雅黑,文泉驿微米黑'
				} 
		   }
		}
	}
})();


