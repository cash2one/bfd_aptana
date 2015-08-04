$(function(){
	$('.select_box input:text').click(function(){
		$('.select_box ul').slideToggle()
	}).val('请选择平台')
	$('.select_box ul li').click(function(){
			$('.select_box input:text').val($(this).html())
			$('.select_box ul').find('li.active').removeClass('active')
			$(this).addClass('active')
			$('.select_box ul').slideUp()
			$('.btn').show()
			$('#plant').val($(this).data('value'))
			if($(this).html()=='代码安装'){
				$('#sub span').html('获取代码')
			}else{
				$('#sub span').html('获取插件')
			}
		})
	if($('#plant').val()!==''){
		$('.select_box ul li').each(function(){
			if($(this).data('value')==$('#plant').val()){
				$(this).click()
			}
		})
	}		
	$('#sub').click(function(){
		$('#form1').submit()
	})
})