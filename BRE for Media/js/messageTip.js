$(function(){
	$.post('../../SiteManager/msg/!getUnreadMsgNum',function(data){
		if(data){
			$('.top > ul > li > a:contains("消息")').addClass('bg')
		}
	})
})