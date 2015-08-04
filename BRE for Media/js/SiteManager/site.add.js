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
	      //var re= /(((http|ftp|https|file):\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig;   
    	  var re= /(((http|https):\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig; 
	      return this.optional(element) || re.test(value);   

	  }, "请输入正确的URL");
	var validater = $('#form1').validate({
		submitHandler: function(form){
			$(form).ajaxSubmit({
				success:function(responseText, statusText, xhr, $form){
					if(responseText=='4' ){
					  window.document.location.href = "url";
					} else if(responseText == '0'){
						validater.showErrors({'url':'错误信息'})
					} 
				}
			})
			return false
			//form.submit()
		},
        rules: {
        	'url': {
            	 required: true,
                 isURL:true
             }
         },
         messages: {
        	 'url': {
                 required: "请输入域名",
                 isURL:'域名格式错误，请重新输入'
             }
         },
         focusInvalid:true,
         onkeyup: false,
         wrapper:null,
         errorElement:'span',
         errorPlacement: function(error, element){
             error.appendTo(element.parent().parent());
         }
     })
})
