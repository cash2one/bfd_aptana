$(function(){
	$('#btn1').click(function(event){
		$('#form1').submit()
		return false
	})
	$('#form1').keyup(function(event){
		if(event.keyCode===13){
			$('#form1').submit();
			}
	})
	 $.validator.addMethod("valueNotEquals", function(value, element, arg){
	    return arg != value;
	 }, "请选择开户银行");
	 var validater = $('#form1').validate({
		submitHandler:function(form){
			$(form).ajaxSubmit({
				success:function(responseText, statusText, xhr, $form){
					if(responseText=='1' || responseText=='2'){
								   $.ifmWidget('alertFail',{'title':'申请失败',content:'申请失败'})
					} else if(responseText == '0'){
									 $.ifmWidget('alertSuccess',{'title':'申请成功',content:'申请成功'})
									 form.reset()
					} 
				}
			})
			return false
		},
		rules: {
			'amount':{
				required:true
			},
        	'blank': {
            	 valueNotEquals: 'defalusts'
             },
			 'account-name':{
			 	required:true
			 },
			 'account-id':{
			 	required:true
			 }
         },
         messages: {
        	'amount':{
				required:'请输入金额 '
			},
			 'account-name':{
			 	required:'请输入开户人名称'
			 },
			 'account-id':{
			 	required:'请输入银行帐号'
			 }
         },
         showErrors: function (errorMap, errorList) {
     	    this.defaultShowErrors();
     	    $.each(errorList, function (i, error) {
     	        $(error.element).next().addClass('exp-tip-wrong2').find('span').css("display", "inline-block");     	   
     	    });
         },
         focusInvalid:true,
         onkeyup: false,
         wrapper:'span',
         errorElement:'span',
         errorClass:'_undefineClass',
         errorPlacement: function(error, element){
		 	element.after(error)
         }
	})
})
$(function(){
	$('#account-id').keydown(function(event){
		var code=event.keyCode
		if (event.shiftKey){
			return false
		}
		if((code>=96&&code<=105)||((!event.shiftKey)&&code>=48&&code<=57)||code<57){
			return true
		}
		return false
	})
	$('#account-id').keyup(function(){
//		$(this).val($(this).val().replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 "))
	    $(this).val($(this).val().replace(/\s/g,'').replace(/(\d{4})/g,"$1 "))
	})
})
