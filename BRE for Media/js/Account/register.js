$(function(){
	$('#sub').click(function(){
		$('#form1').submit()
	})
	$('#form1').keyup(function(event){
		if(event.keyCode===13){
			$('#form1').submit();
			}
	})
	$('.agree span').click(function(){
		if($(this).parent().find(':checkbox').is(':checked')){
			$(this).parent().find(':checkbox').attr('checked',false)
		}else{
			$(this).parent().find(':checkbox').attr('checked',true)
		}
	})
	$.validator.addMethod("idiot_email", function(value,element) { 
		return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test($.trim(value))
	}, "邮箱格式错误，请重新输入");
	$.validator.addMethod("qq", function(value,element) { 
		return $.trim(value)=='' || /^[1-9]\d{4,11}$/.test($.trim(value))
	}, "请输入正确的QQ号码");
	var validater = $('#form1').validate({
		submitHandler: function(form){
			$(form).ajaxSubmit({
				success:function(responseText, statusText, xhr, $form){
					if(responseText=='0' ){
						window.document.location.href = "SiteManager/site/!index";
					}else if(responseText == '2'){
						validater.showErrors({'user.username':'请输入邮箱地址'});
					} else if(responseText == '3'){
						validater.showErrors({'user.password':'请输入密码'});
					} else if(responseText == '4'){
						validater.showErrors({'user.username':'邮箱格式错误，请重新输入'});
					} else if(responseText == '5'){
						validater.showErrors({'user.password':'密码格式错误，请重新输入'});
					} else if(responseText == '6'){
						validater.showErrors({'user.username':'账号已存在提示该账号已存在，请填写其他邮箱或登录'});
					} else if(responseText == '7'){
						validater.showErrors({'user.username':'服务器出现异常，请稍后再试'});
					}
				}
			})
			return false
		},
        rules: {
        	'user.username': {
            	 required: true,
            	 idiot_email:true,
                 remote:{
                	 url:'Account/user/!queryUserByUserName2',//返回true or false
                	 type:'post',
                	 dataType:'json',
                	 data:{username:function(){
                		 return $('#username').val()
                	 }}
                 }
             },
             'user.qqNumber':{
            	 //required: true,
            	 qq:true
             },
             'user.password':{
             	 required: true,
             	 minlength: 6,
            	 maxlength: 16
             },
             repassword: {
             	required: true,
                 equalTo: "#password"
             },
             agree:{
            	 required:function(element){
            		 if($(element).is(':checked')){
            			 return false
            		 }
            		 return true
            	 }
             }
         },
         messages: {
        	 'user.username': {
                 required: "请输入邮箱地址",
                 email:'邮箱格式错误',
                 remote:'用户已存在'
             },
             'user.qqNumber':{
            	 required: "请输入QQ号码"
             },
             'user.password':{
             	required: "请输入密码",
             	minlength:'请输入6-16位字符(字母、数字、符号)',//"密码最少6位",
            	maxlength:'请输入6-16位字符(字母、数字、符号)'//"密码最多18位"
             },
             repassword:{
            	 required:"请重复确认密码",
             	  equalTo:'两次输入密码不一致' 
             },
             agree:{
            	 required:'请同意使用协议'
             }
         },
         showErrors: function (errorMap, errorList) {
        	    this.defaultShowErrors();
        	    $.each(errorList, function (i, error) {
        	        $(error.element).next().find('span').css("display", "inline-block");
        	    });
         },
         focusInvalid:true,
         onkeyup: false,
         wrapper:'span',
         errorElement:'span',
         errorClass:'_undefineClass',
         errorPlacement: function(error, element){
        	 element.parent().find('.exp-tip-normal2').remove()
        	 element.parent().append(error.addClass('error'))
//             error.addClass('error').appendTo(element.parent()).find('span').css('display','block');
         }
     })
     $('input:text:first').focus()
     
     $(window).resize(function(){
		 var bodyheight=document.documentElement.clientHeight
//		 var contentHeight=377
		 var contentHeight=377+48
    	 var margintop=((bodyheight-contentHeight)/2>120)?((bodyheight-contentHeight)/2-50):((bodyheight-contentHeight)/2)
    	 $('#login-area').css('margin-top',margintop+'px')
	 }).resize()
})