/**
 * @author Administrator
 */
(function($){
    var methods = {
        init: function(opts){
            var defaults = {}
            var setting = $.extend({}, defaults, opts)
			var self=$(this)
			var interval=setInterval(function(){
				self.html(setting.random())
			},80)
			$(this).data('interval',interval)
        },
        stop: function(){
			clearInterval($(this).data('interval'))
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
