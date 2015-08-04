/**
 * @author Administrator
 */
$(function(){
    $('#cancel').click(function(){
        $('#username,#password').val('')
    })
    $('#submit').click(function(){
        $('#form1').submit()
    })
    // 中文字两个字节       
    $.validator.addMethod("byteRangeLength", function(value, element, param){
        var length = value.length;
        for (var i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) > 127) {
                length++;
            }
        }
        return this.optional(element) || (length >= param[0] && length <= param[1]);
    }, "请确保输入的值在3-15个字节之间(一个中文字算2个字节)");
    $('#form1').validate({
        submitHandler: function(form){
            $(form).ajaxSubmit({
                dataType: 'json',
                success: function(responseText, statusText, xhr, $form){
                    if (responseText == 'success') {
                        window.document.location.href = "./main.html";
                    }
                    else {
                        $('<div/>').simpledialog2({
                            mode: 'blank',
                            headerText: '提示',
                            themeHeader: 'b',
                            headerClose: true,
                            blankContent: '<div data-role="content" data-theme="b">' +
                            responseText +
                            '<a rel="close" data-role="button">Close</a></div>'
                        })
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    var status = {
                        'timeout': "请求超时,请检查网络",
                        'error': '系统发生错误,请稍后再试',
                        'abort': '服务拒绝'
                    }
                    $('<div/>').simpledialog2({
                        mode: 'blank',
                        headerText: '提示',
                        themeHeader: 'b',
                        headerClose: true,
                        blankContent: '<div data-role="content" data-theme="b">' +
                        (status[textStatus] || "系统其他错误,请重试") +
                        '<a rel="close" data-role="button">Close</a></div>'
                    })
                    
                }
            })
        },
        rules: {
            username: {
                required: true
            },
            password: {
                required: true,
                byteRangeLength: [6, 18]
            }
        },
        messages: {
            username: {
                required: "用户名不能为空"
            },
            password: {
                required: "密码不能为空",
                byteRangeLength: "密码必须在6-18个字符之间"
            }
        },
        focusInvalid: true,
        onkeyup: false,
        wrapper: 'div',
        errorPlacement: function(error, element){
            error.appendTo(element.parent()).css('color', 'red');
        }
    })
})
