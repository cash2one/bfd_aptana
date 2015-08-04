/**
 * @author Administrator
 */
var clipboardpath
(function(){
	var path=document.scripts;   
	path=path[path.length-1].src.substring(0,path[path.length-1].src.lastIndexOf("/")+1);   
	if ((path.indexOf('http') != 0 && path.indexOf('/') != 0) || path.indexOf('./') == 0) {
		path = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1) + path
	}
	clipboardpath=path.substring(0,path.lastIndexOf("js"))
})();


function copy_code(copyText,callback) 
    {
        if (window.clipboardData) 
        {
            window.clipboardData.setData("Text", copyText)
        } 
        else 
        {
            var flashcopier = 'flashcopier';
            if(!document.getElementById(flashcopier)) 
            {
              var divholder = document.createElement('div');
              divholder.id = flashcopier;
              document.body.appendChild(divholder);
            }
            document.getElementById(flashcopier).innerHTML = '';
            var divinfo = '<embed src="'+clipboardpath+'swf/_clipboard.swf" FlashVars="clipboard='+encodeURIComponent(copyText)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
            document.getElementById(flashcopier).innerHTML = divinfo;
        }
       if(callback){
	   	    callback()
	   }
    }