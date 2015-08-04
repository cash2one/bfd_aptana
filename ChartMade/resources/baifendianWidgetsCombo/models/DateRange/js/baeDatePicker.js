(function($){
    var date_reg = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/
    var methods = {
        init: function(opts){
            var defaults = {
            };
			(function(){
				var c = new Date()
				  c.setDate(c.getDate() - 1)
                  var l = new Date()
                  l.setDate(l.getDate() - 8)
                  defaults.date=[formatDate(l, 'Y-m-d'), formatDate(c, 'Y-m-d')]
			})();
            var setting = $.extend({}, defaults, opts)
            var filterDom = $('<div class="baeRangeLable"><span class="baeRangeLable01"></span><input type="text"/><span class="baeRangeLable02">至</span><input type="text"/><span class="baeRangeLable03">最近7天</span><span class="baeRangeLable04">最近30天</span></div>')
			filterDom.find('span:first').html(setting.lable)
            function setDate(d1, d2){
                beginDom.val(d1)
                endDom.val(d2)
                packerDom.DatePickerSetDate([d1, d2], true)
            }
            filterDom.find('span:eq(2)').click(function(){
                var c = new Date()
				c.setDate(c.getDate() - 1)
                var l = new Date()
                l.setDate(l.getDate() - 7)
                setDate(formatDate(l, 'Y-m-d'), formatDate(c, 'Y-m-d'))
            })
            filterDom.find('span:eq(3)').click(function(){
                var c = new Date()
				c.setDate(c.getDate() - 1)
                var l = new Date()
                l.setDate(l.getDate() - 30)
                setDate(formatDate(l, 'Y-m-d'), formatDate(c, 'Y-m-d'))
            })
            var beginDom = filterDom.find('input:eq(0)')
            beginDom.val(setting.date[0])
            beginDom.mask('9999-99-99')
            beginDom.keyup(function(){
                if (date_reg.test($(this).val())) {
                    setDate($(this).val(), packerDom.DatePickerGetDate('Y-m-d')[1])
                }
            })
            var endDom = filterDom.find('input:eq(1)')
            endDom.val(setting.date[1])
            endDom.mask('9999-99-99')
            endDom.keyup(function(){
                if (date_reg.test($(this).val())) {
                    setDate(packerDom.DatePickerGetDate('Y-m-d')[0], $(this).val())
                }
            })
            var packerDom = $('<div></div>')
            this.append(filterDom).append(packerDom)
            packerDom.DatePicker({
                flat: true,
                date: setting.date,
                calendars: 3,
                mode: 'range',
                starts: 1,
                onChange: function(formated, dates){
                    beginDom.val(formated[0])
                    endDom.val(formated[1])
                }
            })
            this.data('packerDom', packerDom)
			this.data('setDate',setDate)
        },
        getDate: function(){
            return this.data('packerDom').DatePickerGetDate('Y-m-d')
        },
		setDate:function(d1,d2){
			this.data('setDate')(d1,d2)
		}
    };
    
    $.fn.baeDatePicker = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else 
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            }
            else {
                $.error('Method ' + method + ' does not exist on jQuery.baeDatePicker');
            }
    };
})(jQuery);
