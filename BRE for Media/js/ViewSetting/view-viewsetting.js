$.ajaxSettings.traditional = true

$(function(){
    $('.choose > li').click(function(){
        if (!$(this).hasClass('current')) {
            document.title = '展示设置-' + $(this).find('a').html()
            $(this).siblings().removeClass('current')
            $(this).addClass('current')
            $('.set-box').hide().eq($(this).index()).show()
        }
    })
    $('.choose > li:first').addClass('current')
     $('.set-box:first').show()
})

$(function(){
	$('.select_box3 input:text').click(function(){
		$('.select_box3').find('ul').not($(this).parents('.select_box3').find('ul')).slideUp()
		$(this).parents('.select_box3').find('ul').slideToggle()
	})
	$('.select_box3 ul li').click(function(){
			$(this).parents('.select_box3').find('input:text').val(parseInt($(this).html(),10))
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
})

//animate

$(function(){
	//1,4
	$('#i0').add('#i4').find('input:radio').change(function(){
		if($(this).parents('.display').find('input:radio:first').is(':checked')){
			$(this).parents('.display').find('.item2').show()
		}else{
			$(this).parents('.display').find('.item2').hide()
		}
	})
	//2
	$('#i1').find('input:radio').change(function(){
		if($(this).parents('.display').find('input:radio:first').is(':checked')){
			$(this).parents('.display').find('.item2').show()
			$(this).parents('.display').find('.item3:eq(2)').hide()
			
			$(this).parents('.display').find('.item3:eq(1)').hide()
			$(this).parents('.display').find('.item3:eq(0)').show()
		}else{
			$(this).parents('.display').find('.item3:eq(2)').show()
			$(this).parents('.display').find('.item2').hide()
			
			$(this).parents('.display').find('.item3:eq(0)').hide()
			$(this).parents('.display').find('.item3:eq(1)').show()
		}
	}).change()
	$('#i2').find('input:radio').change(function(){
		if($(this).parents('.display').find('input:radio:eq(0)').is(':checked')){//图片模式
			if($(this).parents('.display').find('input:radio:eq(2)').is(':checked')){//底部通栏
				$(this).parents('.display').find('.item2').show()
				$(this).parents('.display').find('.item3').hide()
			}else{//右侧
				$(this).parents('.display').find('.item2').show()
				$(this).parents('.display').find('.item3').hide()
				$(this).parents('.display').find('.item3:eq(0)').show()
			}
		}else{//文字模式
			if($(this).parents('.display').find('input:radio:eq(2)').is(':checked')){//底部通栏
				$(this).parents('.display').find('.item2').hide()
				$(this).parents('.display').find('.item3').show()
				$(this).parents('.display').find('.item3:eq(0)').hide()
			}else{//右侧
				$(this).parents('.display').find('.item2').hide()
				$(this).parents('.display').find('.item3').hide()
				$(this).parents('.display').find('.item3:eq(0)').show()
			}
		}
	}).change()
	//开启
	$('.set-box').find('input:checkbox').change(function(){
		if($(this).is(':checked')){
			$(this).parents('form').find('.display input').attr('disabled',false)
		}else{
			$(this).parents('form').find('.display input').attr('disabled',true)
		}
	}).change()
	
	//预览切换
	$('#i0,#i1,#i4').each(function(){
		$(this).find('.preview').scrollable({vertical: true})
		var api=$(this).find('.preview').data('scrollable')
		$(this).find('input:radio').change(function(){
			if($(this).parents('.display').find('input:radio:first').is(':checked')){
				api.seekTo(0)
			}else{
				api.seekTo(1)
			}
		})
	 })
	 $('.choose > li').one('click',function(){
		 $('.section > div:gt(0)').eq($(this).index()).find('input:radio').change()
	 })
	 setTimeout(function(){
		 $('.section > div:gt(0):visible').find('input:radio').change()
	 },100)
	 
	 $('#i2').each(function(){
		$(this).find('.preview').scrollable()
		var api=$(this).find('.preview').data('scrollable')
		$(this).find('input:radio').change(function(){
			if($(this).parents('.display').find('input:radio:eq(0)').is(':checked')){//图片模式
				if($(this).parents('.display').find('input:radio:eq(2)').is(':checked')){//底部通栏
							api.seekTo(0)
					}else{//右侧
					       api.seekTo(1)
					}
				}else{//文字模式
					if($(this).parents('.display').find('input:radio:eq(2)').is(':checked')){//底部通栏
					       api.seekTo(2)
					}else{//右侧
					       api.seekTo(3)
					}
				}
		}).change()
	 })
})
$(function(){
	  $('a.btn2').click(function(event){
	  	    var d=$(this)
	  	    d.parents('form').submit()
		})
		$('.set-box').keyup(function(event){
			if(event.keyCode===13){
				   $(this).find('a.btn2').click();
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
		 
		var nameList=["site.keySupernatant.pictureWide","site.flushBonading.pictureWide","site.floatWindow.pictureWide","","site.individuationArtical.pictureWide"]
		$('#form0,#form1,#form2,#form3,#form4').each(function(i){
			if($(this).size()==0){
				return;
			}
			var setting={
					submitHandler: function(form){
						$(form).ajaxSubmit({
							beforeSubmit: function(arr, $form, options){
//								console.log(arr)
							},
							success:function(responseText, statusText, xhr, $form){
//								console.log(responseText)
								if(responseText=='1' || responseText=='2'){
								   $.ifmWidget('alertFail',{'title':'设置失败',content:'设置失败',basePath:'../../resources/ifmWidget'})
								} else if(responseText == '0'){
									 $.ifmWidget('alertSuccess',{'title':'设置成功',basePath:'../../resources/ifmWidget'})
								} 
							}
						})
						return false
					 },
					 rules:{},
					 focusInvalid:true,
			         onkeyup: false,
			         wrapper:null,
			         errorElement:'span',
					 errorClass:'errormin',
					 errorPlacement:function(error, element){
						 error.appendTo(element.parents('.item2'))
					 }
				}
			if(i!==3){
				setting.rules[nameList[i]]={
						imgWidthReq:true,
						imgWidthMin:true,
						imgWidthMax:true,
						imgNumber:true
					}
			}
			
			$(this).validate(setting)
		})
		
})
