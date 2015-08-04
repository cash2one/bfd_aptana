/**
 * @author Administrator
 */
$(function(){
    $('#nav > li:gt(0),.nav2 > li:last').click(function(){
        $.blockUI({
            message: $('<div>敬请期待!</div>').click($.unblockUI),
            css: {
                border: 'none',
                padding: '25px',
                'font-size': '80px',
                backgroundColor: '#000',
                '-moz-border-radius': '15px',
                '-khtml-border-radius': '15px',
                '-webkit-border-radius': '15px',
                'border-radius': '15px',
                opacity: .25,
                color: '#fff',
                top: ($(window).height() - 143) / 2 + 'px',
                left: ($(window).width() - 460) / 2 + 'px',
                'cursor': 'default'
            },
            overlayCSS: {
                opacity: .5,
                backgroundColor: '#000',
                'cursor': 'default'
            },
            onOverlayClick: $.unblockUI
        });
        setTimeout($.unblockUI,2000)
    })
})

$(function(){
		$.get("./user/getLoginedUser.action", null,
			function(name){
				$('#userid').html(name);
			});
})
