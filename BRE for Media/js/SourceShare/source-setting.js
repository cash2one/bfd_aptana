$(function(){
	$('.select_box3 input:text').click(function(){
		$('.select_box3').find('ul').not($(this).parents('.select_box3').find('ul')).slideUp()
		$(this).parents('.select_box3').find('ul').slideToggle()
	})
	$('.select_box3 ul li').click(function(){
			$(this).parents('.select_box3').find('input:text').val($(this).html())
			$(this).parents('.select_box3').find('ul li.active').removeClass('active')
			$(this).addClass('active')
			$(this).parents('.select_box3').find('ul').slideUp()
			$(this).parents('.select_box3').find('input:hidden').val($(this).data('value'))
	})
	$('.select_box3 input:text').each(function(){
		var value=$(this).val()
		$(this).parents('.select_box3').find('li').each(function(){
			if($(this).html()==value){
				$(this).addClass('active')
			}
		})
	})
	$('body').click(function(event){
		if(!$(event.target).is('.select_box3')&&$(event.target).parents('.select_box3').size()==0){
			$('.select_box3').find('ul').slideUp()
		}
	})
	$('#tit').click(function(){
		$.ifmWidget("confirmNormal",{
			yesCallBack:function(){
				$.ifmWidget("loading",{
		    		title:'正在操作',
		    		content:'正在操作...'
				})
				$.post('../../SourceShare/source/!stopFlowExchange4User',{}).done(function(data){
					if(data=='0'){
						$.ifmWidget("alertSuccess",{
				    		title:'操作成功',
				    		content:'操作成功',
				    		callBack:function(){
				    			window.document.location.href = "../../SourceShare/source/!showSoureShare";
				    		}
				    	})
					}else{
						$.ifmWidget("alertFail",{
				    		title:'操作失败',
				    		content:'操作失败',
				    		callBack:function(){
				    			//
				    		}
				    	})
					}
				})
			},
			title:"确定停用流量交换",
			content:"确定要停用流量交换吗?"
		})
	})
})
$(function(){
	$('.item1 input:radio').change(function(){
//		if($(this).parent().parent().find('input:radio:first').is(':checked')){
//			$(this).parents('.display').find('.item2').show()
//		}else{
//			$(this).parents('.display').find('.item2').hide()
//		}
		if($(this).parents('.display').find('input:radio:first').is(':checked')){
			$(this).parents('.display').find('.item2').show()
			$(this).parents('.display').find('.item3:eq(1)').hide()
		}else{
			$(this).parents('.display').find('.item3:eq(1)').show()
			$(this).parents('.display').find('.item2').hide()
		}
	})
	//预览切换
	$('.set-right .preview').scrollable({vertical: true})
	var api=$('.set-right .preview').data('scrollable')
	$('.item1 input:radio').change(function(){
		if($(this).parent().parent().find('input:radio:first').is(':checked')){
			api.seekTo(0)
		}else{
			api.seekTo(1)
		}
	}).change()
	/*
	//图片宽度文本输入
	 function getNumberKeyValue(keyCode){
	 	if(keyCode<=57){
			return keyCode-48
		}else{
			return keyCode-96
		}
	 }
	$('.item3 input:text').keydown(function(event){
		if(event.keyCode==13||event.keyCode==8||event.keyCode==46||event.keyCode==37||event.keyCode==38||event.keyCode==39||event.keyCode==40){
			return true;
		}
		if($(this).val()==''&&(event.keyCode==48||event.keyCode==96)){
			return false
		}
		if((!(event.keyCode>=48&&event.keyCode<=57||event.keyCode==8))&&(!(event.keyCode>=96&&event.keyCode<=105))){
			return false
		}else{
			if(parseInt($(this).val()+getNumberKeyValue(event.keyCode),10)>120){
				return false
			}
		}
	}).keyup(function(){
					var item=$.trim($(this).val())
					item=parseInt(item,10)
					if(item<1||isNaN(item)){
						$(this).val('')
					}
	}).blur(function(){
						var item=$.trim($(this).val())
						item=parseInt(item,10)
						if(item<1||isNaN(item)){
							$(this).val('')
						}
	})
	*/
})
$(function(){
    $('a.btn').click(function(){
  	    var d=$(this)
  	    d.parents('form').submit()
	})
	$('#i4').keyup(function(event){
		if(event.keyCode===13){
			   $(this).find('a.btn').click();
			}
	})
	$.validator.addMethod("imgWidthReq", function(value,element) { 
		    if(!$(element).is(':visible')){
				return true
			}
	         if(value===''){
			  	   return false
			  }
			  return true
	 	 }, "请输入图片宽度");
		 $.validator.addMethod("imgWidthMin", function(value,element) { 
		   if(!$(element).is(':visible')){
				return true
			}
	         if(parseInt(value,10)<60){
			  	   return false
			  }
			  return true
	 	 }, "图片宽度最小需要60");
		 $.validator.addMethod("imgWidthMax", function(value,element) { 
			   if(!$(element).is(':visible')){
					return true
				}
		         if(parseInt(value,10)>120){
				  	   return false
				  }
				  return true
		 	 }, "图片宽度不能超过120");
		 $.validator.addMethod("imgNumber", function(value,element) { 
			   if(!$(element).is(':visible')){
					return true
				}
		        if(!/\d+/.test($.trim(value))){
				  	   return false
				 }
		         $(element).val(parseInt(value,10))
				 return true
		 	 }, "请输入整数值");
	 var setting={
				submitHandler: function(form){
					$(form).ajaxSubmit({
						success:function(responseText, statusText, xhr, $form){
							if(responseText=='1' || responseText=='2'){
							   $.ifmWidget('alertFail',{'title':'设置失败',content:'设置失败',basePath:'../../resources/ifmWidget'})
							} else if(responseText == '0'){
								 $.ifmWidget('alertSuccess',{'title':'设置成功',basePath:'../../resources/ifmWidget'})
							} 
						}
					})
					return false
				 },
				 rules:{'site.flushBonading.pictureWide':{imgWidthReq:true,
														  imgWidthMin:true,
														  imgWidthMax:true,
														  imgNumber:true}},
				 focusInvalid:true,
		         onkeyup: false,
		         wrapper:null,
		         errorElement:'span',
				 errorClass:'errormin',
				 errorPlacement:function(error, element){
					 error.appendTo(element.parents('.item2'))
				 }
			}
	 $('#form1').validate(setting)
})