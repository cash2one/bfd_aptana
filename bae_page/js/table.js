function wsug(e, str){ 
 var oThis = arguments.callee;
 if(!str) {
  oThis.sug.style.visibility = 'hidden';
  document.onmousemove = null;
  return;
 }
 if(!oThis.sug){
  var div = document.createElement('div'), css = 'top:0; left:0; position:absolute; z-index:100; visibility:hidden';
   div.style.cssText = css;
   div.setAttribute('style',css);
  var sug = document.createElement('div'), css= 'font:normal 12px/16px "宋体"; white-space:nowrap; color:#000000; padding:3px; position:absolute; left:0; top:0; z-index:10; background:#FFF9C8; border:1px solid #EEE495';
   sug.style.cssText = css;
   sug.setAttribute('style',css);
  var dr = document.createElement('div'), css = 'position:absolute; top:2px; left:2px; background:#888888; filter:alpha(opacity=50); opacity:0.5; z-index:9';
   dr.style.cssText = css;
   dr.setAttribute('style',css);
  var ifr = document.createElement('iframe'), css='position:absolute; left:0; top:0; z-index:8; filter:alpha(opacity=0); opacity:0';
   ifr.style.cssText = css;
   ifr.setAttribute('style',css);
  div.appendChild(ifr);
  div.appendChild(dr);
  div.appendChild(sug);
  div.sug = sug;
  document.body.appendChild(div);
  oThis.sug = div;
  oThis.dr = dr;
  oThis.ifr = ifr;
  div = dr = ifr = sug = null;
 }
 var e = e || window.event, obj = oThis.sug, dr = oThis.dr, ifr = oThis.ifr;
 obj.sug.innerHTML = str;

 var w = obj.sug.offsetWidth, h = obj.sug.offsetHeight, dw = document.documentElement.clientWidth||document.body.clientWidth; dh = document.documentElement.clientHeight || document.body.clientHeight;
 var st = document.documentElement.scrollTop || document.body.scrollTop, sl = document.documentElement.scrollLeft || document.body.scrollLeft;
 var left = e.clientX +sl +17 + w < dw + sl && e.clientX + sl + 15 || e.clientX +sl-8 - w, top = e.clientY + st +17 + h < dh + st && e.clientY + st + 17 || e.clientY + st - 5 - h;
 obj.style.left = left+ 10 + 'px';
 obj.style.top = top + 10 + 'px';
 dr.style.width = w + 'px';
 dr.style.height = h + 'px';
 ifr.style.width = w + 3 + 'px';
 ifr.style.height = h + 3 + 'px';
 obj.style.visibility = 'visible';
 document.onmousemove = function(e){
  var e = e || window.event, st = document.documentElement.scrollTop || document.body.scrollTop, sl = document.documentElement.scrollLeft || document.body.scrollLeft;
  var left = e.clientX +sl +17 + w < dw + sl && e.clientX + sl + 15 || e.clientX +sl-8 - w, top = e.clientY + st +17 + h < dh + st && e.clientY + st + 17 || e.clientY + st - 5 - h;
  obj.style.left = left + 'px';
  obj.style.top = top + 'px';
 }
}

$(function() {	
//ado();

//$("#ConfigOptionBtn").hover(
//  function () {
//    $(this).css('background-position','-173px -331px');
//  },
//  function () {
//    $(this).addClass('config-btn');
//	$(this).css('background-position','-73px -331px');
//  }
//);

$('#ConfigOptionBtn').toggle(
 function(){
	 $('#ConfigOptionContainer').show();
},
 function(){
	 $('#ConfigOptionContainer').show();
});	 


$("#chkall").click(function() {
    if ($(this).attr("checked") == true || $(this).attr("checked") == "checked") {
        $("input[name='ids[]']").each(function() {
            $(this).attr("checked", true);   
        });   
    } else {
        $("input[name='ids[]']").each(function() {   
            $(this).attr("checked", false);   
        });   
    }   
});

$("#chkall2").click(function() {  
        $("input[name='ids[]']").each(function() {   
            $(this).attr("checked", true);   
        });   
});
        });

function slideToggle(s,c){
	if($("#"+s).attr('src') == '../images/addd.gif'){
		$("#"+s).attr('src','../images/addd2.gif');
		var sd = $("#"+s).parent().parent().attr('id');

/*$("#"+sd+" td").each(function(i){
	$(this).css('background','#f2f2f2')
});	
    $("div .sData tr td").css('background','#f2f2f2');*/
	//	$("#"+s).parent().parent().attr('onmouseout','');
	//	$("#"+s).parent().parent().attr('onmousemove','');
		
	//	$("div .sData #"+s).parent().parent().attr('onmouseout',"");		
		//$("div .sData #"+s).parent().parent().attr('onmousemove',"");

		//m_v(sd);		
	}else{
//    $("div .sData tr td").css('background','#ffffff');		
/*		$("#"+s).parent().parent().attr('onmouseout',"m_nv(this.id);");
		$("#"+s).parent().parent().attr('onmousemove',"m_v(this.id);");				
		$("div .sData #"+s).parent().parent().attr('onmouseout',"m_nv(this.id);");		
		$("div .sData #"+s).parent().parent().attr('onmousemove',"m_v(this.id);");
*/		
/*		var sd = $("#"+s).parent().parent().attr('id');
        m_nv(sd);*/
		$("#"+s).attr('src','../images/addd.gif');	
	}
	
var c_num=0;	
$("tr[name="+c+"]").each(function(i){
	c_num = c_num+1;
});	
//alert("#"+s+'_'+i)
for(var i=0; i<c_num/2; i++){
	if($("#"+s+'_'+i).css('display') == 'none' || $("div .sData #"+s+'_'+i).css('display') == 'none'){		
		$("#"+s+'_'+i).show();  	
		$("div .sData #"+s+'_'+i).show();  
		//fakeContainer
		$("div .sFDataInner #"+s+'_'+i).css('border','none').css('border-right','1px solid #C0C0C0');
        $("div .sData #"+s+'_'+i).css('border','none').css('border-right','1px solid #C0C0C0').css('border-left','1px solid #C0C0C0').css('color','#06F');		
	}else{
		$("#"+s+'_'+i).hide();		
		$("div .sData #"+s+'_'+i).hide();
	}
 }	
}


function m_v(id){
$("#"+id+" td").each(function(i){
	$(this).css('background','#f2f2f2')
});
$("div .sData #"+id+" td").each(function(i){
	$(this).css('background','#f2f2f2')
});
}

function m_nv(id){
$("#"+id+" td").each(function(i){
	$(this).css('background','#ffffff')
});
$("div .sData #"+id+" td").each(function(i){
	$(this).css('background','#ffffff')
});
}

function ado(act,data,v,vc,width){
	_begin = encodeURIComponent(baidu.date.format( static_begin, 'yyyy-MM-dd' ));
	_end = encodeURIComponent(baidu.date.format( static_end, 'yyyy-MM-dd' ));
	var k='';
	switch(act){		
		case 'order': 
			$("#TableOptionContainer input[name='ids[]']:checked").each(function(i){
			     k += $(this).val()+',';
			});
			actv = {order_f:v, order_o:vc, c_field:k.substring(0, k.length-1) ,data:data, begin:_begin, end:_end,lab_width:width}; 
			break;
		case 'c_field':
		$("#TableOptionContainer input[name='ids[]']:checked").each(function(i){
			     k += $(this).val()+',';
		});
		actv = {cf:1, c_field:k.substring(0, k.length-1), data:data, begin:_begin, end:_end,lab_width:width}; break;
		default: actv = {data:data, begin:_begin, end:_end}; break;
	}
	$('#ConfigOptionContainer').hide();
	loading();
    $.post("/wbportal/report/data.action", actv,
       function(data){
    	$('#ddd').hideLoading();
		$("#ddd").html(data);
		
    });
}

function loading() {
	$('#ddd').showLoading();	
}

 