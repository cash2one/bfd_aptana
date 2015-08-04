/**
 * @author Administrator
 */
(function($){
    var methods = {
        init: function(opts){
            var defaults = {time:80}
            var setting = $.extend({}, defaults, opts)
			$(this).each(function(){
				$(this).html(setting.random())
				var interval=setInterval(function(){
					$(this).html(setting.random())
				},setting.time)
				$(this).data('interval',interval)
			})
			
        },
        stop: function(){
        	$(this).each(function(){
        		clearInterval($(this).data('interval'))
        	})
//            $(this).removeDate('interval')
        }
    };
    $.fn.numberScroll = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else 
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            }
            else {
                $.error('Method ' + method + ' does not exist on jQuery.numberScroll');
            }
    };
})(jQuery);
