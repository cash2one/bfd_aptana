/**
 * @author Administrator
 */
window.DateRange=function(dom, isCompare,align){
    var self = this
    function alignDateRange(d1, d2){
        d1 = [parseDate(d1[0], 'Y-m-d').valueOf(), parseDate(d1[1], 'Y-m-d').valueOf()]
        d2 = [parseDate(d2[0], 'Y-m-d').valueOf(), parseDate(d2[1], 'Y-m-d').valueOf()]
        if ((d1[1] - d1[0]) > (d2[1] - d2[0])) {
            d1 = align_oprate(d1, d2[1] - d2[0])
        }
        else {
            d2 = align_oprate(d2, d1[1] - d1[0])
        }
        function align_oprate(d, range){
            return [d[1] - range, d[1]]
        }
        return [[formatDate(new Date(d1[0]), 'Y-m-d'), formatDate(new Date(d1[1]), 'Y-m-d')], [formatDate(new Date(d2[0]), 'Y-m-d'), formatDate(new Date(d2[1]), 'Y-m-d')]]
    }
    function getDateRange(d1, d2){
        var d1 = parseDate(d1, 'Y-m-d').valueOf()
        var d2 = parseDate(d2, 'Y-m-d').valueOf()
        if (d1 === d2) {
            return 0
        }
        else {
            return (d2 - d1) / (1000 * 60 * 60 * 24)
        }
    }
    function buildDom(){
        self.dom = $(dom).addClass('day_select')
        self.dom.append(' <div class="left"> &nbsp; </div>')
        self.dom.append('<div class="daydata">' +
        ' <a href="#">' +
        ' <div class="ico01">' +
        '  </div>' +
        '   <div class="data">' +
        '  </div>' +
        '   <div class="ico02">' +
        '  </div>' +
        '  </a>' +
        '  <div class="day_range">' +
        '      <div>' +
        '       </div>' +
        '       <div>' +
        '       </div>' +
        '      <p>' +
        '        <label>' +
        '       <input type="checkbox"/>' +
        '         与其他时间对比' +
        '       </label>' +
        '          <button>' +
        '          确定' +
        '        </button>' +
        '     <button>' +
        '          取消' +
        '         </button>' +
        '      </p>' +
        '   </div>' +
        '</div>')
        self.dom.append('<div class="right">&nbsp; </div>')
    }
    function buildEvent(){
        self.dom.find('.daydata > a').toggle(function(){
            self.dom.find('.day_range').slideDown()
//            self.dom.find(setting.chart.compareItem_renderTo).hide()//ie select标签的层级
        }, function(){
            self.dom.find('.day_range').slideUp()
//            self.dom.find(setting.chart.compareItem_renderTo).show()
        })
        self.dom.find('.day_range > p  input:checkbox').change($.proxy(function(){
            if (self.dom.find('.day_range > p  input:checkbox').is(':checked')) {
                var d = self.dom.find('.day_range > div:eq(0)').baeDatePicker('getDate')
                d[0] = parseDate(d[0], 'Y-m-d')
                d[1] = parseDate(d[1], 'Y-m-d')
                var r = getDateRange(d[0], d[1])
                d[0].setDate(d[0].getDate() - r - 1)
                d[1].setDate(d[1].getDate() - r - 1)
                self.dom.find('.day_range > div:eq(1)').baeDatePicker('setDate', formatDate(d[0], 'Y-m-d'), formatDate(d[1], 'Y-m-d'))
                self.dom.find('.day_range > div:eq(1)').slideDown()
            }
            else {
                self.dom.find('.day_range > div:eq(1)').slideUp()
            }
        }, this))
        self.dom.find('.day_range > p > button:eq(1)').click(function(){
            self.dom.find('.daydata > a').click()
        })
        self.dom.find('.day_range > p > button:eq(0)').click($.proxy(function(){
            if (self.dom.find('.day_range > p  input:checkbox').is(':checked')) {
                self.mode = 'compare'
            }
            else {
                self.mode = 'single'
            }
            self.begin = self.dom.find('.day_range > div:eq(0)').baeDatePicker('getDate')[0]
            self.end = self.dom.find('.day_range > div:eq(0)').baeDatePicker('getDate')[1]
            self.dbBegin = self.dom.find('.day_range > div:eq(1)').baeDatePicker('getDate')[0]
            self.dbEnd = self.dom.find('.day_range > div:eq(1)').baeDatePicker('getDate')[1]
            if (self.mode === 'compare') {
                var alignRange = alignDateRange([self.begin, self.end], [self.dbBegin, self.dbEnd])
                if (self.begin != alignRange[0][0] || self.end != alignRange[0][1]) {
                    self.begin = alignRange[0][0]
                    self.end = alignRange[0][1]
                    self.dom.find('.day_range > div:eq(0)').baeDatePicker('setDate', self.begin, self.end)
                }
                if (self.dbBegin != alignRange[1][0] || self.dbEnd != alignRange[1][1]) {
                    self.dbBegin = alignRange[1][0]
                    self.dbEnd = alignRange[1][1]
                    self.dom.find('.day_range > div:eq(1)').baeDatePicker('setDate', self.dbBegin, self.dbEnd)
                }
            }
            if ($.cookie) {
                $.cookie('bae_date_range_begin', self.begin, {
                    path: '/'
                })
                $.cookie('bae_date_range_end', self.end, {
                    path: '/'
                })
            }
            if (self.mode === 'single') {
                self.dom.find('.contrastpic').hide()
                self.dom.find('.daydata .data').html(self.begin + "  至  " + self.end)
            }
            else {
                self.dom.find('.contrastpic').show()
                self.dom.find('.tushi0:eq(0) span').html('当前时间段（' + self.begin.replace('-', '.') + '-' + self.end.replace('-', '.') + '）')
                self.dom.find('.tushi0:eq(1) span').html('对比时间段（' + self.dbBegin.replace('-', '.') + '-' + self.dbEnd.replace('-', '.') + '）')
                self.dom.find('.daydata .data').html(self.begin + " 至 " + self.end + "  VS  " + self.dbBegin + " 至 " + self.dbEnd)
            }
            self.dom.find('.daydata > a').click()
			
			$.each(self.events,function(i,item){
				item(self)
			})
            self.change(self)
        }, this))
    }
	self.addEventListener=function(fun){
		self.events.push(fun)
	}
    self.init = function(){
		self.events=[]
        if ($.cookie && $.cookie('bae_date_range_begin') && $.cookie('bae_date_range_end')) {
            self.begin = $.cookie('bae_date_range_begin');
            self.end = $.cookie('bae_date_range_end');
        }
        else {
            var l = new Date()
            l.setDate(l.getDate() - 7)
            var e = new Date()
            e.setDate(e.getDate() - 1)
            self.begin = formatDate(l, 'Y-m-d')
            self.end = formatDate(e, 'Y-m-d')
        }
        var r = getDateRange(self.begin, self.end)
        self.dbBegin = parseDate(self.begin, 'Y-m-d')
        self.dbBegin.setDate(self.dbBegin.getDate() - r - 1)
        self.dbBegin = formatDate(self.dbBegin, 'Y-m-d')
        self.dbEnd = parseDate(self.end, 'Y-m-d')
        self.dbEnd.setDate(self.dbEnd.getDate() - r - 1)
        self.dbEnd = formatDate(self.dbEnd, 'Y-m-d')
        self.mode = 'single'
        buildDom()
		if(align==='right'){
			 self.dom.find('.day_range').css('right','0px')
		}else{
			 self.dom.find('.day_range').css('left','-4px')
		}
        self.dom.find('.daydata .data').html(self.begin + "  至  " + self.end)
        self.dom.find('.tushi0:eq(0) span').html('当前时间段（' + self.begin.replace('-', '.') + '-' + self.end.replace('-', '.') + '）')
        self.dom.find('.day_range > p  input:checkbox').attr('checked', false)
        self.dom.find('.day_range > div:eq(0)').baeDatePicker({
            date: [self.begin, self.end],
            lable: '选择当前时间:&nbsp;&nbsp;'
        })
        self.dom.find('.day_range > div:eq(1)').baeDatePicker({
            date: [self.dbBegin, self.dbEnd],
            lable: '选择对比时间:&nbsp;&nbsp;'
        })
        self.dom.find('.day_range > div:eq(1)').hide()
        self.dom.find('.day_range').hide()
		self.change=function(){}
		buildEvent()
		if(isCompare===false){
			 self.dom.find('.day_range > p').find('input,label').hide()
		}
    }
    self.init()
}
