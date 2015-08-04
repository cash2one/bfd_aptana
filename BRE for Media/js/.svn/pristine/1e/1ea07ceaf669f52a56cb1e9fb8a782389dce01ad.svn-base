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
					if(responseText=='9' ){
//					  window.document.location.href = "./sites.html";
						$('#form1 input:password').val('')
						alert("修改成功");
					} else if(responseText == '1'){
						validater.showErrors({'user.password':'用户名错了'});
					} else if(responseText == '2'){
						validater.showErrors({'user.password':'请输入密码'});
					} else if(responseText == '3'){
						validater.showErrors({'user.password':'出错啦'});
					} else if(responseText == '4'){
						validater.showErrors({'user.password':'出错啦'});
					} else if(responseText == '5'){
						validater.showErrors({'user.password':'出错啦'});
					} else if(responseText == '6'){
						validater.showErrors({'user.password':'数据库出现错误'});
					} else if(responseText == '7'){
						validater.showErrors({'user.password':'您输入的密码不正确,请重新输入'});
					} else if(responseText == '8'){
						validater.showErrors({'user.password':'服务器出现问题出错'});
					} else if(responseText == '10'){
						validater.showErrors({'user.password':'数据库没有这个用户'});
					} 
				}
			})
			return false
		},
        rules: {
        	'user.password':{
             	 required: true,
             	 minlength: 6,
            	 maxlength: 16
             },
             newpassword:{
            	 required: true,
             	 minlength: 6,
            	 maxlength: 16
             },
             renewpassword:{
            	 required: true,
                 equalTo: "#password"
             }
         },
         messages: {
        	 'user.password':{
             	required: "您输入的密码不正确,请重新输入",
             	minlength:"请输入6-16位字符(字母、数字、符号)",
            	maxlength:"请输入6-16位字符(字母、数字、符号)"
             },
             newpassword:{
              	required: "请输入新密码",
              	minlength:"请输入6-16位字符(字母、数字、符号)",
             	maxlength:"请输入6-16位字符(字母、数字、符号)"
              },
             renewpassword:{
            	  required:"请重复确认密码",
             	  equalTo:'两次填写的密码不一致' 
               }
         },
         showErrors: function (errorMap, errorList) {
     	    this.defaultShowErrors();
     	    $.each(errorList, function (i, error) {
     	        $(error.element).parent().next().find('span').css("display", "inline-block");
     	    });
         },
         focusInvalid:true,
         onkeyup: false,
         wrapper:'span',
         errorElement:'span',
         errorClass:'_undefineClass',
         errorPlacement: function(error, element){
             element.parent().parent().append(error.addClass('exp-tip-wrong2'))
         }
     })
})