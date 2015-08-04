/**
 * @author Administrator
 */
$(function(){
    $('#username,#password').focusin(function(){
        $(this).parent().parent().find('label').html('')
    })
    $('#username').focusout(function(){
        if ($.trim($(this).val()) === '') {
            $(this).val('').parent().parent().find('label').html('用户名')
        }
    })
    $('#password').focusout(function(){
        if ($(this).val() == '') {
            $(this).parent().parent().find('label').html('密码')
        }
    })
})
/*
$(function(){
	$('.form-actions button:first').click(function(){
		$('form').submit()
	})
    var validater = $('form').validate({
		submitHandler: function(form){
			console.info('submit')
            return false
        },
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            username: {
                required: "用户名不能为空"
            },
            password: {
                required: "密码不能为空"
            }
        },
        focusInvalid: true,
        onkeyup: false,
        wrapper: '',
        errorElement:'span',
		errorClass: "login_info",
        errorPlacement: function(error, element){
//            element.parent().next().empty()
            console.info('error')
			error.filter(':eq(0)').appendTo('.form-actions')
        }
    })
})
*/