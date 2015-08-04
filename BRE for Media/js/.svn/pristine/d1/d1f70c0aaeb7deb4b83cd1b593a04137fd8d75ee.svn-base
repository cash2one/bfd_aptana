$(function(){
	$('#sub').click(function(event){
		$('#form1').submit()
		return false
	})
	$('#form1').keyup(function(event){
		if(event.keyCode===13){
			$('#form1').submit();
			}
	})
	$.validator.addMethod("idiot_email", function(value,element) { 
		return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test($.trim(value))
	}, "邮箱格式错误，请重新输入");
	var validater = $('#form1').validate({
		submitHandler: function(form){
			$(form).ajaxSubmit({
				success:function(responseText, statusText, xhr, $form){
					if(responseText=='4'){
					  window.document.location.href = "SiteManager/site/!index";
					} else if(responseText == '0'){
						validater.showErrors({'user.username':'您输入的帐号或密码不正确，请重新输入'})
					} else if(responseText == '1'){
						validater.showErrors({'user.username':'邮箱格式错误，请重新输入'})
					} else if(responseText == '2'){
						validater.showErrors({'user.username':'您输入的帐号或密码不正确，请重新输入'})
					} else if(responseText == '3'){
						validater.showErrors({'user.username':'服务器出错了'})
					} else if(responseText == '5'){
						var siteName;
						var strCookie=document.cookie;
						//将多cookie切割为多个名/值对
						var arrCookie=strCookie.split("; ");
						//遍历cookie数组，处理每个cookie对
						for(var i=0;i<arrCookie.length;i++){
						var arr=arrCookie[i].split("=");
						//找到名称为userId的cookie，并返回它的值
						if("siteName"==arr[0]){
							siteName=arr[1];
						break;
						}
						} 
						window.document.location.href = "SiteManager/site/!showCheckingAddress?siteName="+siteName;
					} else if(responseText == '6'){
						window.document.location.href = "DataAnalysis/stat/!synthetical.action";
					}
				}
			})
			return false
			//form.submit()
		},
        rules: {
        	'user.username': {
            	 required: true,
            	 idiot_email:true
             },
             'user.password':{
             	 required: true,
             	 minlength: 6,
            	 maxlength: 16
             }
             
         },
         messages: {
        	 'user.username': {
                 required: "请输入邮箱",
                 email:'邮箱格式错误，请重新输入'
             },
             'user.password':{
             	required: "密码不能为空",
             	minlength:"密码最少6位",
            	maxlength:"密码最多16位"
             }
         },
         showErrors: function (errorMap, errorList) {
     	    this.defaultShowErrors();
     	    $.each(errorList, function (i, error) {
     	        $(error.element).next().find('span').css("display", "inline-block");
     	        if(i>0){
     	        	$(error.element).next().hide()
     	        }
     	    });
     	    
         },
         focusInvalid:true,
         onkeyup: false,
         wrapper:'span',
         errorElement:'span',
         errorClass:'_undefineClass',
         errorPlacement: function(error, element){
        	 element.parent().append(error.addClass('error'))
             //error.addClass('error').appendTo(element.parent()).find('span').css('display','block');
         }
     });
     $('.tip').click(function(){
    	 $('#username2').val($('#username1').val())
 		$("#form2").submit();
     });
     
	 $(window).resize(function(){
		 var bodyheight=document.documentElement.clientHeight
    	 var margintop=((bodyheight-318)/2>120)?((bodyheight-318)/2-50):((bodyheight-318)/2)
    	 $('#login-area').css('margin-top',margintop+'px')
	 }).resize()
})
