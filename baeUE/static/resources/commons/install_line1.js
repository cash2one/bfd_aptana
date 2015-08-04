function Chart(dateRange, a, b, setting){
	var parse={
		parseParam:function(param){
			return param
		},
		pareResult:function(data){
			return data
		}
	}
    var self = this
    function getData(fun){
        var temParam = {}
        if (dateRange.mode === 'compare') {
            temParam['dbBegin'] = dateRange.dbBegin
            temParam['dbEnd'] = dateRange.dbEnd
        }
        var p = {
            typeName: a.currentItem.key
        }
        if (!$.isEmptyObject(b.currentDbItem)) {
            p['dbTypeName'] = b.currentDbItem.key
        }
		var param=$.extend(temParam, p, {
            begin: dateRange.begin,
            end: dateRange.end
        }, setting.chart.data)
		if(parse.parseParam){
			param=parse.parseParam(param)
		}
        $.ajax({
            async: true,
            url: setting.chart.url,
			data:param,
            dataType: 'json',
            success: function(data){
				if(parse.pareResult){
					data=parse.pareResult(data)
				}
                fun(data)
            }
        })
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
                renderTo: $(setting.chart.renderTo)[0],
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
