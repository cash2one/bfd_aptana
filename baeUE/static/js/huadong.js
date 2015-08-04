//<!CDATA[
function g(o){return document.getElementById(o);}
function HoverLi(n){
for(var i=1;i<=12;i++)
{
  g('tb_'+i).className='off';
  g('tbc_'+i).className='undis';
}
if(g('tbc_'+n))
	g('tbc_'+n).className='dis';
g('tb_'+n).className='on';
}
function adaptionFrame(iframe){		
    var iframe = document.getElementById(iframe);
	try{
		var bHeight = iframe.contentWindow.document.body.scrollHeight;
		var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
		var height = Math.max(bHeight, dHeight);
		iframe.height =  height;
	}catch (ex){}
}
function reinitIframe(){
	adaptionFrame("xxxx");
}
//]]>