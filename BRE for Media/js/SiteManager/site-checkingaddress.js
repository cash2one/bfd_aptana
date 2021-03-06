/**
 * @author Administrator
 */
$(function(){
	$('#sub').click(function(){
		$('#form1').submit()
	})
	$('body').keyup(function(event){
		if(event.keyCode===13){
			$('#form1').submit();
			}
	})
	$.validator.addMethod("isURL", function(value,element) { 
//    	  var re= /(((http|https):\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig; 
		var re= /(((http|https):\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig;  
		return this.optional(element) || re.test(value);   

	  }, "请输入正确的URL");
	var validater = $('#form1').validate({
		submitHandler: function(form){
			$("#address2").val($("#address").val());
			$(form).ajaxSubmit({
				success:function(responseText, statusText, xhr, $form){
					if(responseText=='4' ){
						$("#form2").submit();
					 // window.document.location.href = "/ifm/SiteManager/site/!showCheckingFile";
					} else if(responseText == '0'){
						validater.showErrors({'site.address':'参数有问题'});
					}  else if(responseText == '1'){
						validater.showErrors({'site.address':'请输入网站地址'});
					}  else if(responseText == '2'){
						validater.showErrors({'site.address':'网站地址格式错误，请重新输入'});
					}  else if(responseText == '3'){
						validater.showErrors({'site.address':''});
					}  else if(responseText == '5'){
						validater.showErrors({'site.address':'该网址已在本用户<a href="./!index" style="font-weight:bold;">网站列表</a>中'});
					}  else if(responseText == '6'){
						validater.showErrors({'site.address':'该网址已在其他网站列表中'});
					}  else if(responseText == '7'){
						validater.showErrors({'site.address':'有问题'});
					}  else if(responseText == '8'){
						validater.showErrors({'site.address':'出错了'});
					} else if(responseText == '9'){
						validater.showErrors({'site.address':'出错了'});
					} 
				}
			})
			return false
			//form.submit()
		},
        rules: {
        	'site.address': {
            	 required: true,
                 isURL:true
             }
         },
         messages: {
        	 'site.address': {
                 required:'请输入网站地址',// "",
                 isURL:'网站地址格式错误，请重新输入'
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
             error.addClass('addSiteError').appendTo(element.parent().parent());
         }
     });
})
