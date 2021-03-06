$(function(){
	$('#sub').click(function(){
		$('#form1').submit()
	})
	$('#form1').keyup(function(event){
		if(event.keyCode===13){
			$('#form1').submit();
			}
	})
	var validater = $('#form1').validate({
		submitHandler: function(form){
			$(form).ajaxSubmit({
				success:function(responseText, statusText, xhr, $form){
					if(responseText=='0' ){
					  window.document.location.href = "!showFindPassword4";
					} else if(responseText == '1'){
						validater.showErrors({'user.password':'请输入密码'});
					} else if(responseText == '2'){
						validater.showErrors({'user.password':'密码参数不正确'});
					} else if(responseText == '3'){
						validater.showErrors({'user.password':'密码小于6位，请输入6-16位字符'});
					} else if(responseText == '4'){
						validater.showErrors({'user.password':'密码大于16位，请输入6-16位字符'});
					} else if(responseText == '5'){
						validater.showErrors({'user.password':'密码格式错误，请重新输入'});
					} else {
						validater.showErrors({'user.password':'请重新申请重设密码'});
					} 
				}
			})
			return false;
		},
        rules: {
        	 'user.password':{
             	 required: true,
             	 minlength: 6,
            	 maxlength: 16
             },
             repassword: {
             	required: true,
                 equalTo: "#password"
             }
         },
         messages: {
        	 'user.password':{
              	required: "请输入密码",
              	minlength:"请输入6-16位字符(字母、数字、符号)",
             	maxlength:"请输入6-16位字符(字母、数字、符号)"
              },
              repassword:{
             	 required:"请重复确认密码",
              	  equalTo:'两次输入密码不一致' 
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
         }
     })
     
     $(window).resize(function(){
		 var bodyheight=document.documentElement.clientHeight
    	 var margintop=((bodyheight-291)/2>120)?((bodyheight-291)/2-50):((bodyheight-291)/2)
    	 $('#login-area').css('margin-top',margintop+'px')
	 }).resize()
})