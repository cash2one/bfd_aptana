$(function(){
	$('.btn1').click(function(){
		$.ifmWidget('loading',{
			basePath:'../../resources/ifmWidget',
			title:'检测中',
			content:'检测中...'
		})
	$.ajax({url:'../../SiteManager/site/!checkingJS',//修改检测url
				cache:false,
	            dataType: "json",
				data:{'参数名':$('.step2-two span').html()}
				}).done(function(status){//返回true或false
					if(status===true){
						var link='../../ContentManager/content/!showEmbodyStatistics'//成功后的url
						$.ifmWidget('alertSuccessMuti',{
							basePath:'../../resources/ifmWidget',
							title:'安装成功',
							content:'恭喜您，安装成功！',
							dom:$('<p class="tip">3秒后，进入<a href="'+link+'" class="admin">管理后台</a></p>')
						})
						setTimeout(function(){
							window.location.href=link
						},3000)
					}else{
						$.ifmWidget('alertFail',{
							basePath:'../../resources/ifmWidget',
							title:'验证失败',
							content:'在您的网站上没有检测到插件，请按照教程重新安装！',
							callBack:function(){
								//验证失败点击后的动作
							}
						})
					}
			    })
})
})
$(function(){
	$("a:contains('修改建站平台')").click(function(){
		$('#form1').submit();
	});
	$("#modifySitePlatform").click(function(){
		$('#form1').submit();
	});
	function modifySitePlatform() {
		$('#form1').submit();
	}
});