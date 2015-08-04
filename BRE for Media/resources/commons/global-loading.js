//$(function(){
//	var ajaxCount = 0;
//	
//	if(!$('body').find('#ajax_loading').size()){
//		$('body').append('<div id="ajax_loading"><div class="modal" style="position: absolute;width: 100%;height: 100%;background: black;opacity: 0.6;filter: alpha(opacity=60);z-index: 9999;top: 0px;left: 0px;"><div class="loadinglabel" style="position: absolute;color: white;z-index:100;"><img src="../../images/global-loading.gif"/><p style="margin-top:5px;">正在加载……</p></div></div></div>')
//		if(!$.support.style){
//			$('#ajax_loading').append('<iframe frameborder="0" style="position: absolute;top:0;left:0;z-index:0;width:100%;opacity: 0;filter: alpha(opacity=0);border:none;"></iframe>')
//		}
//	}
//	function setHeight(){
//		var height = Math.max($('body').height(),parent.window.screen.availHeight)
////		console.log($('body').height(),parent.window.screen.availHeight,height)
//		dom.find("div.modal").height(height);
//		dom.find("iframe").height(height);
//	}
//	var dom = $('#ajax_loading').hide()
//	$(document).ajaxSend(function(){
//		dom.find('div.loadinglabel').css({
//			top:parseInt(parent.$(".misc").css("top").replace('px'),10)-30+'px',
//			left:$('body').width()/2-30
//		})
//		setHeight()
//		if(ajaxCount==0){
//		    dom.show();
//		}
//		ajaxCount++;
//	}).ajaxComplete(function(){
//		setHeight()
//		setTimeout(function(){
//			ajaxCount--;
//			if(ajaxCount<=0){
//				dom.hide()
//			}
//		},400);
//	});
//});
