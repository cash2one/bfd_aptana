/**
 * @author Administrator
 */
(function($){
    $.template('_alertFail', '<div class="float-layer">' +
    '<div class="fl-title">' +
    '<h4>${title}</h4>' +
    '<a >&nbsp;</a>' +
    '</div>' +
    '<div class="fl-content2 plr39">' +
    '<img src="${basePath}/images/doubt.png" class="doubt-pic" alt="">' +
    '<p class="doubt">{{html content}}</p>' +
    '<div class="btn-2">' +
    '<a  class="grey-btn1">' +
    '<span>知道了</span>' +
    '</a>' +
    '</div>' +
    '</div>' +
    '</div>')
	$.template('_alertFailW380','<div class="ifmDialogBox w380">'+
													'<div class="ifmDialogTitle">'+
													'<h4>${title}</h4>'+
													'<a href="javascript:void(0)"></a> '+
													'</div>'+
													'<div class="ifmDialogContent">'+
													'<div class="ifmDialogIcon ifmDialogIcon-doubt"></div>'+
													'<div class="ifmDialogContent-text">'+
													'{{html content}}'+
													'</div>'+
													'</div>'+
													'<div class="ifmDialogOperate">'+
													'<a class="ifmDialog-btn ifmDialog-btn-w60 ifmDialog-btn-grey"><span>知道了</span></a>'+
													'</div>'+
													'</div>')
    $.template('_alertSuccess', '<div class="float-layer ">' +
    '<div class="fl-title">' +
    '<h4>${title}</h4>' +
    '<a >&nbsp;</a>' +
    '</div>' +
    '<div class="fl-content2 plr39">' +
    '<p class="win"><img alt="" class="win-pic" src="${basePath}/images/win-2.png">${title}</p>' +
    '<div class="btn-2">' +
    '<a class="grey-btn1" >' +
    '<span>知道了</span>' +
    '</a>' +
    '</div>' +
    '</div>' +
    '</div>')
    $.template('_alertSuccessMuti', '<div class="float-layer">' +
    '<div class="fl-title">' +
    '<h4>${title}</h4>' +
    	'<a href="javascript:void(0)">&nbsp;</a>'+
    '</div>' +
    '<div class="fl-content2 ">' +
    '<p class="win"><img alt="" class="win-pic" src="${basePath}/images/win-2.png">{{html content}}</p>' +
    //'<p class="tip">3秒后，进入<a class="admin" >管理后台</a></p>'+
    '</div>' +
    '</div>')
    $.template('_confirmNormal', '<div class="float-layer">' +
    '<div class="fl-title">' +
    '<h4>${title}</h4>' +
    '<a >&nbsp;</a>' +
    '</div>' +
    '<div class="fl-content">' +
    '<p>{{html content}}</p>' +
    '<div class="btn">' +
    '<a class="blue-btn1" >' +
    '<span>确 定</span>' +
    '</a>' +
    '<a class="grey-btn1" >' +
    '<span>取 消</span>' +
    '</a>' +
    '</div>' +
    '</div>' +
    '</div>')
	$.template('_confirmWin','<div class="ifmDialogBox w380">'+
													'<div class="ifmDialogTitle">'+
													'<h4>${title}</h4>'+
													'<a href="javascript:void(0)"></a> '+
													'</div>'+
													'<div class="ifmDialogContent">'+
													'<div class="ifmDialogIcon ifmDialogIcon-win"></div>'+
													'<div class="ifmDialogContent-text">'+
													'{{html content}}'+
													'</div>'+
													'</div>'+
													'<div class="ifmDialogOperate">'+
													'<a class="ifmDialog-btn ifmDialog-btn-w60 ifmDialog-btn-blue"><span>是</span></a>'+
													'<a style="margin-left: 10px;" class="ifmDialog-btn ifmDialog-btn-w60 ifmDialog-btn-grey"><span>否</span></a>'+
													'</div>'+
													'</div>')
    $.template('_conformWarn', '<div class="float-layer">' +
    '<div class="fl-title">' +
    '<h4>${title}</h4>' +
    '<a >&nbsp;</a>' +
    '</div>' +
    '<div class="fl-content2 ">{{html content}}' +
    //													'<p>{{html content}}</p>'+
    //													'<strong>${warnContent}</strong>'+
    '<div class="btn">' +
    '<a class="red-btn1" >' +
    '<span>确 定</span>' +
    '</a>' +
    '<a class="grey-btn1" >' +
    '<span>关 闭</span>' +
    '</a>' +
    '</div>' +
    '</div>' +
    '</div>')
    $.template('_loading', '<div class="float-layer">' +
    '<div class="fl-title">' +
    '<h4>${title}</h4>' +
    '</div>' +
    '<div class="fl-content2 ">' +
    '<p class="jc"><img alt="" class="jc-pic" src="${basePath}/images/jc-bg.png">{{html content}}</p>' +
    '</div>' +
    '</div>')
    $.template('tip_s', '<div class="float-layer">'+
								'<div class="fl-content2 h69">'+
								'<p class="shield"><img src="${basePath}/images/win-2.png" class="win-pic" alt="">{{html content}}</p>'+
								'</div>'+
								'</div>')
	 $.template('tip_m', '<div class="float-layer">'+
								'<div class="fl-content2 h69">'+
								'<p class="anew"><img src="${basePath}/images/win-2.png" class="win-pic" alt="">{{html content}}</p>'+
								'</div>'+
								'</div>')							
    var methods = {
        'alertFail': function(options){
            var defaults = {
                callBack: $.noop,
                basePath: '../../resources/ifmWidget'
            }
            var setting = $.extend(true, defaults, options)
            var dom = $.tmpl('_alertFail', setting)
            dom.find('.fl-title a').add(dom.find('.fl-content2 .btn-2 a')).click(function(){
                $.unblockUI()
                setting.callBack()
            })
            $.blockUI({
                message: dom,
                css: {
                    border: 'none',
                    width: '300px',
                    top: ($(window).height() - 204) / 2 + 'px'
                },
                overlayCSS: {
                    opacity: 0
                }
            })
        },
		'alertFailW380': function(options){
            var defaults = {
                callBack: $.noop
            }
            var setting = $.extend(true, defaults, options)
            var dom = $.tmpl('_alertFailW380', setting)
            dom.find('.ifmDialogTitle a').add(dom.find('.ifmDialogOperate a')).click(function(){
                $.unblockUI()
                setting.callBack()
            })
            $.blockUI({
                message: dom,
                css: {
                    border: 'none',
                    width: '380px',
                    top: ($(window).height() - 204) / 2 + 'px'
                },
                overlayCSS: {
                    opacity: 0
                }
            })
        },
        'alertSuccess': function(options){
            var defaults = {
                callBack: $.noop,
                basePath: '../..//resources/ifmWidget'
            }
            var setting = $.extend(true, defaults, options)
            var dom = $.tmpl('_alertSuccess', setting)
            dom.find('.fl-title a').add(dom.find('.fl-content2 .btn-2 a')).click(function(){
                $.unblockUI()
                setting.callBack()
            })
            $.blockUI({
                message: dom,
                css: {
                    border: 'none',
                    width: '300px',
                    top: ($(window).height() - 204) / 2 + 'px'
                },
                overlayCSS: {
                    opacity: 0
                }
            })
        },
        'alertSuccessMuti': function(options){
            var defaults = {
                dom: $(),
                basePath: '../..//resources/ifmWidget',
                closeCallback:$.noop
            }
            var setting = $.extend(true, defaults, options)
            var dom = $.tmpl('_alertSuccessMuti', setting)
            setting.dom.appendTo(dom.find('.fl-content2'))
            dom.find('.fl-title a').click(function(){
                $.unblockUI()
                setting.closeCallback()
            })
            $.blockUI({
                message: dom,
                css: {
                    border: 'none',
                    width: '300px',
                    top: ($(window).height() - 204) / 2 + 'px'
                },
                overlayCSS: {
                    opacity: 0
                }
            })
        },
        'confirmNormal': function(options){
            var defaults = {
                yesCallBack: $.noop,
                noCallBack: $.noop
            }
            var setting = $.extend(true, defaults, options)
            var dom = $.tmpl('_confirmNormal', setting)
            dom.find('.fl-title a').add(dom.find('.grey-btn1')).click(function(){
                $.unblockUI()
                setting.noCallBack()
            })
            dom.find('.blue-btn1').click(function(){
                $.unblockUI()
                setting.yesCallBack()
            })
            $.blockUI({
                message: dom,
                css: {
                    border: 'none',
                    width: '300px',
                    top: ($(window).height() - 204) / 2 + 'px'
                },
                overlayCSS: {
                    opacity: 0
                }
            })
        },
		 'confirmWin': function(options){
            var defaults = {
                yesCallBack: $.noop,
                noCallBack: $.noop
            }
            var setting = $.extend(true, defaults, options)
            var dom = $.tmpl('_confirmWin', setting)
            dom.find('.ifmDialogTitle a').add(dom.find('.ifmDialogOperate a:last')).click(function(){
                $.unblockUI()
                setting.noCallBack()
            })
            dom.find('.ifmDialogOperate a:first').click(function(){
                $.unblockUI()
                setting.yesCallBack()
            })
            $.blockUI({
                message: dom,
                css: {
                    border: 'none',
                    width: '380px',
                    top: ($(window).height() - 204) / 2 + 'px'
                },
                overlayCSS: {
                    opacity: 0
                }
            })
        },
        'conformWarn': function(options){
            var defaults = {
                yesCallBack: $.noop,
                noCallBack: $.noop
            }
            var setting = $.extend(true, defaults, options)
            var dom = $.tmpl('_conformWarn', setting)
            dom.find('.fl-title a').add(dom.find('.grey-btn1')).click(function(){
                $.unblockUI()
                setting.noCallBack()
            })
            dom.find('.red-btn1').click(function(){
                $.unblockUI()
                setting.yesCallBack()
            })
            $.blockUI({
                message: dom,
                css: {
                    border: 'none',
                    width: '300px',
                    top: ($(window).height() - 204) / 2 + 'px'
                },
                overlayCSS: {
                    opacity: 0
                }
            })
        },
        'loading': function(options){
            var defaults = {
                basePath: '../..//resources/ifmWidget'
            }
            var setting = $.extend(true, defaults, options)
            var dom = $.tmpl('_loading', setting)
            $.blockUI({
                message: dom,
                css: {
                    border: 'none',
                    width: '300px',
                    top: ($(window).height() - 204) / 2 + 'px'
                },
                overlayCSS: {
                    opacity: 0
                }
            })
        },
        'unloading': function(){
            $.unblockUI()
        },
		'tip':function(options){
			 var defaults = {
                basePath: '../..//resources/ifmWidget',
				muti:false
            }
            var setting = $.extend(true, defaults, options)
            var dom = $.tmpl(setting.muti?'tip_m':'tip_s', setting)
			var timeout=setTimeout($.unblockUI,1500)
			$.blockUI({
                message: dom.click($.unblockUI),
                css: {
                    border: 'none',
                    width: '300px',
                    top: ($(window).height() -166) / 2 + 'px'
                },
                overlayCSS: {
                    opacity: 0
                },
				onOverlayClick:$.unblockUI,
				onUnblock:function(){
					clearTimeout(timeout)
				}
            })
			
		}
    };
    
    $.ifmWidget = function(method){
    
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else 
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            }
            else {
                $.error('Method ' + method + ' does not exist on jQuery.ifmWidget');
            }
        
    };
    
})(jQuery);
