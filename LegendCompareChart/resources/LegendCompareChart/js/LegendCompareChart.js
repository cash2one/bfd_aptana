/**
 * @author Administrator
 */
function LegendCompareChart(dom, setting, dateRange){
    var self = this
    function MenuItem(){
        var self = this
        self.vDoms = {}
        function buildDom(){
            function buildItem(container){
                $.each(setting.items, function(i, item){
                    var width = 100 / setting.items.length
                    var d = $('<td></td>')
                    d.css('width', width + '%')
                    var d1 = $('<div></div>').click(function(){
                        if (!$(this).hasClass('groupnow')) {
                            $(dom).find('.z').find('tr').find('div.groupnow').removeClass('groupnow').addClass('group')
                            var index = $(this).parent().index()
                            $(dom).find('.z').find('tr').find('td:eq(' + index + ') > div').addClass('groupnow')
                            self.currentItem = item
                            self.change()
                        }
                    })
                    if (item.checked && $.isEmptyObject(self.currentItem)) {//初始化
                        self.currentItem = item
                        d1.addClass('groupnow')
                    }
                    else {
                        d1.addClass('group')
                    }
                    var title = $('<div></div>', {
                        'class': 'tittle',
                        html: '<div class="txt">' + item.title + '</div><a class="ico" href="#"></a>'
                    })
                    title.find('a').qtip({
                        content: item.desc,
                        style: {
                            name: 'blue'
                        },
                        position: {
                            corner: {
                                target: 'topMiddle',
                                tooltip: i == 0 ? 'leftBottom' : ((i == setting.items.length - 1) ? 'rightBottom' : 'bottomMiddle')
                            }
                        },
                        style: {
                            //                            	 width: 150,
                            background: '#F0F5F9',
                            color: '#999999',
                            border: {
                                color: '#267BB6'
                            }
                        }
                    })
                    var value = $('<div></div>', {
                        'class': 'value',
                        'text': 'loading...'
                    })
                    self.vDoms[item.key] ? self.vDoms[item.key].add(value) : self.vDoms[item.key] = value
                    if (i === setting.items.length - 1) {
                        d1.css('background-image', 'none')
                    }
                    d1.append(title).append(value).appendTo(d)
                    d.appendTo(container)
                })
            }
            var i1 = $('<table cellspacing="0" cellpadding="0" border="0" class="data01">' +
            '<tbody><tr>' +
            '<td class="l">' +
            '</td>' +
            '<td class="z">' +
            '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr>' +
            '</tr></tbody></table>' +
            ' </td>' +
            '<td class="r">' +
            '</td>' +
            '</tr>' +
            '</tbody></table>')
            self.items = setting.items
            var i2 = i1.clone().addClass('data01_01').hide()
            buildItem(i1.find('.z tr'))
            buildItem(i2.find('.z tr'))
            i1.appendTo($(dom))
            i2.appendTo($(dom))
        }
        function getDate(d1, d2, index){
            var param = {
                cols: $.map(setting.items, function(i){
                    return i.key
                }),
                limits: {
                    dataRange: {
                        start: d1,
                        end: d2
                    },
                    option: setting.menuItem.data
                }
            }
            $.ajax({
                url: setting.menuItem.url,
                dataType: "json",
                data: param
            }).done(function(data){
                for (var i in self.vDoms) {
                    self.vDoms[i].eq(index).html(data[i])
                }
            })
        }
        self.flush = function(){
            for (var i in self.vDoms) {
                self.vDoms[i].html('loading...')
            }
            getDate(dateRange.begin, dateRange.end, 0)
            if (dateRange.mode != 'single') {
                getDate(dateRange.dbBegin, dateRange.dbEnd, 1)
            }
        }
        self.init = function(){
            buildDom()
            self.flush()
        }
        self.init()
    }
    function MenuItemCompare(menuItem){
        var self = this
        self.dom = $(dom).find('.data02 >.top >.data_select >select')
        self.currentDbItem = {}
        self.bindEvent = function(){
            self.dom.change(function(){
                if ($(this).val() === $(this).find('option:first').val()) {
                    self.currentDbItem = {}
                }
                else {
                    $.each(setting.items, $.proxy(function(i, item){
                        if ($(this).val() == item.key) {
                            self.currentDbItem = item
                        }
                    }, this))
                }
                self.change()
            })
        }
        self.flush = function(){
            self.currentDbItem = {}
            self.dom.find('option:gt(0)').remove()
            $.each(menuItem.items, $.proxy(function(i, item){
                if (item.key != menuItem.currentItem.key) {
                    $('<option></option>', {
                        value: item.key,
                        text: item.title
                    }).appendTo(self.dom)
                }
            }, self))
        }
        self.init = function(){
            self.flush()
            this.bindEvent()
        }
        self.init()
    }
    function Chart(render, dateRange, a, b, setting){
        var self = this
        function getData(fun){
            var i = 0, i0, i1
            function request(d1, d2, cols, index){
                var param = {
                    cols: cols,
                    groupBy: ['date'],
                    limits: {
                        dataRange: {
                            start: d1,
                            end: d2
                        },
                        option: setting.chart.data
                    }
                }
                $.ajax({
                    async: true,
                    url: setting.chart.url,
                    data: param,
                    dataType: "json",
                    success: function(data){
                        i++
                        if (index == 0) {
                            i0 = data.stores
                        }
                        else {
                            i1 = data.stores
                        }
                        requestSuccess()
                    }
                })
            }
            function requestSuccess(){
                if ((dateRange.mode === 'compare' && i == 2) || (dateRange.mode != 'compare' && i == 1)) {
                    i = 0
                    var result = {}
                    result['type'] = $.map(i0, function(item){
                        return item[a['currentItem']['key']]
                    })
                    if (!$.isEmptyObject(b.currentDbItem)) {
                        result['dbtype'] = $.map(i0, function(item){
                            return item[b['currentDbItem']['key']]
                        })
                    }
                    if (dateRange.mode === 'compare') {
                        result['type2'] = $.map(i1, function(item){
                            return item[a['currentItem']['key']]
                        })
                    }
                    if (!$.isEmptyObject(b.currentDbItem) && dateRange.mode === 'compare') {
                        result['dbtype2'] = $.map(i1, function(item){
                            return item[b['currentDbItem']['key']]
                        })
                        console.info(result)
                    }
                    fun(result)
                }
            }
            var c = [a['currentItem']['key']]
            if (!$.isEmptyObject(b.currentDbItem)) {
                c.push(b['currentDbItem']['key'])
            }
            request(dateRange.begin, dateRange.end, c, 0)
            if (dateRange.mode === 'compare') {
                request(dateRange.dbBegin, dateRange.dbEnd, c, 1)
            }
        }
        self.flush = function(){
            self.chart.showLoading()
            getData(function(data){
                var ax = self.chart.xAxis[1]
                self.chart.yAxis[0].setTitle({
                    text: a['currentItem']['title']
                }, false)
                self.chart.yAxis[1].setTitle({
                    text: $.isEmptyObject(b.currentDbItem) ? null : b['currentDbItem']['title']
                }, false)
                var d = dateRange.begin.split('-'), d1
                while (self.chart.series.length > 0) {
                    self.chart.series[0].remove(false);
                }
                
                self.chart.addSeries({
                    name: a.currentItem.title,
                    marker: {
                        symbol: 'circle',
                        radius: 5
                    },
                    color: '#609EC8',
                    data: data['type'],
                    pointInterval: 24 * 3600 * 1000,
                    xAxis: 0,
                    yAxis: 0,
                    pointStart: Date.UTC(d[0], parseInt(d[1], 10) - 1, d[2])
                }, false)
                if (!$.isEmptyObject(b.currentDbItem)) {
                    self.chart.addSeries({
                        name: b.currentDbItem.title,
                        marker: {
                            symbol: 'circle',
                            radius: 5
                        },
                        color: '#A6C71E',
                        data: data['dbtype'],
                        pointInterval: 24 * 3600 * 1000,
                        xAxis: 0,
                        yAxis: 1,
                        pointStart: Date.UTC(d[0], parseInt(d[1], 10) - 1, d[2])
                    }, false)
                }
                if (dateRange.mode === 'compare') {
                    d1 = dateRange.dbBegin.split('-')
                    self.chart.addSeries({
                        name: a.currentItem.title + '(对比时间段)',
                        marker: {
                            symbol: 'square',
                            radius: 5
                        },
                        color: '#C3E3F8',
                        data: data['type2'],
                        pointInterval: 24 * 3600 * 1000,
                        xAxis: 1,
                        yAxis: 0,
                        pointStart: Date.UTC(d1[0], parseInt(d1[1], 10) - 1, d1[2])
                    }, false)
                }
                if (!$.isEmptyObject(b.currentDbItem) && dateRange.mode === 'compare') {
                    self.chart.addSeries({
                        name: b.currentDbItem.title + '(对比时间段)',
                        marker: {
                            symbol: 'square',
                            radius: 5
                        },
                        color: '#DCF185',
                        data: data['dbtype2'],
                        pointInterval: 24 * 3600 * 1000,
                        xAxis: 1,
                        yAxis: 1,
                        pointStart: Date.UTC(d1[0], parseInt(d1[1], 10) - 1, d1[2])
                    }, false)
                }
                self.chart.redraw()
                self.chart.hideLoading()
            })
        }
        self.init = function(){
            self.chart = new Highcharts.Chart({
                chart: {
                    renderTo: $(render)[0],
                    marginRight: 60,
                    events: {
                        redraw: function(){
                            if (dateRange.mode === 'compare') {
                                self.chart.xAxis[1]['showAxis'] = true
                                self.chart.xAxis[1]['axisTitle'].show()
                            }
                            else {
                                self.chart.xAxis[1]['showAxis'] = false
                                self.chart.xAxis[1]['axisTitle'].hide()
                                self.chart.xAxis[1].redraw()
                            }
                        }
                    },
                    zoomType: ''
                },
                lang: {
                    loading: '加载中...'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: null
                },
                tooltip: {
                    formatter: function(){
                        var d = new Date(this.x)
                        return '日期:' + d.getUTCFullYear() + '-' + (parseInt(d.getUTCMonth(), 10) + 1) + '-' + d.getUTCDate() +
                        '<br/><b>' +
                        this.series.yAxis.axisTitle.text +
                        ':' +
                        this.point.y +
                        '</b>'
                    }
                },
                xAxis: [{
                    type: 'datetime',
                    title: {
                        text: '当前时间段',
                        style: {
                            color: '#000'
                        }
                    },
                    dateTimeLabelFormats: {
                        day: '%Y-%m-%e'
                    },
                    tickInterval: 24 * 3600 * 1000,
                    tickmarkPlacement: 'on',
                    showLastLabel: true,
                    showFirstLabel: true
                }, {
                    type: 'datetime',
                    title: {
                        text: '对比时间段',
                        style: {
                            color: '#000'
                        }
                    },
                    dateTimeLabelFormats: {
                        day: '%Y-%m-%e'
                    },
                    tickInterval: 24 * 3600 * 1000,
                    tickmarkPlacement: 'on',
                    showLastLabel: true,
                    showFirstLabel: true,
                    opposite: true
                }],
                yAxis: [{
                    title: {
                        style: {
                            color: '#609EC8'
                        },
                        text: null
                    },
                    lineColor: '#609EC8'
                
                }, {
                    title: {
                        style: {
                            color: '#A6C71E'
                        },
                        text: null
                    },
                    lineColor: '#A6C71E',
                    opposite: true
                }],
                series: [{
                    color: '#609EC8',
                    data: [],
                    pointInterval: 24 * 3600 * 1000,
                    xAxis: 0,
                    yAxis: 0
                }, {
                    color: '#A6C71E',
                    data: [],
                    pointInterval: 24 * 3600 * 1000,
                    xAxis: 0,
                    yAxis: 1
                }, {
                    color: '#C3E3F8',
                    data: [],
                    pointInterval: 24 * 3600 * 1000,
                    xAxis: 1,
                    yAxis: 0
                }, {
                    color: '#DCF185',
                    data: [],
                    pointInterval: 24 * 3600 * 1000,
                    xAxis: 1,
                    yAxis: 1
                }]
            })
            self.flush()
        }
        self.init()
    }
    self.flush = function(){
        self.menuItem.flush()
        self.chart.flush()
    }
    self.init = function(){
        self.menuItem = new MenuItem()
        $(dom).append($('<div class="data02"><div class="top"><div class="data_select"><select name="compare" style="display: inline;"><option>对比指标</option></select></div></div><div class="tubiao"></div></div>'))
        self.menuItemCompare = new MenuItemCompare(self.menuItem)
        self.chart = new Chart($(dom).find('.tubiao'), dateRange, self.menuItem, self.menuItemCompare, setting)
        self.menuItem.change = function(){
            self.menuItemCompare.flush()
            self.chart.flush()
        }
        self.menuItemCompare.change = function(){
            self.chart.flush()
        }
        dateRange.addEventListener(function(){
            self.flush()
        })
    }
    self.init()
    
}
