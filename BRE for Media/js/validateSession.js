$(function(){
	$('body').ajaxSuccess(function(e, xhr, settings){
		var content=xhr.responseText
		if(content.indexOf('</body>')>0&&content.indexOf('</html>')>0&&content.indexOf('用户登录')>0&&content.indexOf('忘记密码了')>0){
			window.location.href="../../login.jsp"
		}
	})
//	$('body').ajaxError(function(){
//		window.location.href="../../login.jsp"
//	})
})