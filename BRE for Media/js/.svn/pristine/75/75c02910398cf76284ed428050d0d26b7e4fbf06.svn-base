$(function(){
	$('.con-5 .btn6').click(function(){
		$.ifmWidget('loading',{
			basePath:'../../resources/ifmWidget',
			title:'验证中',
			content:'验证中...'
		})
		$.ajax({url:'../../SiteManager/site/!checkingFile',
				cache:false,
	            dataType: "json",
				data:{'address':$('.step2-two span').html()}
				}).done(function(status){//返回true或false
					if(status===true){
						$.ifmWidget('alertSuccess',{
//							basePath:'./resources/ifmWidget',
							title:'验证成功',
							content:'验证成功!',
							callBack:function(){
								//console.info('test')
								//验证成功点击后的动作
								//window.document.location.href = "/ifm/SiteManager/site/!showSelectPlatform";
								$("#form2").submit();
							}
						})
					}else{
						$.ifmWidget('alertFail',{
//							basePath:'./resources/ifmWidget',
							title:'验证失败',
							content:'验证失败，<br>请查看是否上传了验证文件！',
							callBack:function(){
								//验证失败点击后的动作
							}
						})
					}
			    })
	})  
})