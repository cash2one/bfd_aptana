$(function(){
	$('#sub').click(function(){
		$('#form1').submit()
	})
/*	$('body').keyup(function(event){
		if(event.keyCode===13){
			$('#form1').submit();
			}
	})*/
	$.validator.addMethod("idiot_email", function(value,element) { 
		return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test($.trim(value))
	}, "邮箱格式错误，请重新输入");
	var validater = $('#form1').validate({
		submitHandler: function(form){
			//form.submit()
			$(form).ajaxSubmit({
				success:function(responseText, statusText, xhr, $form){
					if(responseText=='5' ){
						var username = $("#username").val();
						username = jQuery.trim(username);
						window.document.location.href = "!showFindPassword2?username="+username;
					}else if(responseText == '0'){
						validater.showErrors({'username':'请输入邮箱地址'});
					} else if(responseText == '1'){
						validater.showErrors({'username':'邮箱格式错误，请重新输入'});
					} else if(responseText == '2'){
						validater.showErrors({'username':'你输入的邮箱地址尚未注册！'});
					} else if(responseText == '3'){
						validater.showErrors({'username':'你输入的邮箱地址数据库出现异常！'});
					} else if(responseText == '4'){
						validater.showErrors({'username':'服务器出现异常'});
					}
				}
			})
			return false
		},
        rules: {
             username: {
            	 required: true,
            	 idiot_email:true,
                 remote:{
                	 url:'../../Account/user/!queryUserByUserName',//返回true or false
                	 type:'post',
                	 dataType:'json',
                	 data:{username:function(){
                		 return $('#username').val()
                	 }}
                 }
             }
         },
         messages: {
             username: {
                 required: "请输入邮箱",
                 email:'邮箱格式错误，请重新输入',
                 remote:'无此用户'
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
        	 element.parent().append(error.addClass('error'))
        	 $(error.element).parent().append(error.addClass('error'))
        	 //error.addClass('error').appendTo(element.parent())
        	// element.after(error.addClass('error'))
         }
     })
     
     $(window).resize(function(){
		 var bodyheight=document.documentElement.clientHeight
    	 var margintop=((bodyheight-247)/2>120)?((bodyheight-247)/2-50):((bodyheight-247)/2)
    	 $('#login-area').css('margin-top',margintop+'px')
	 }).resize()
})