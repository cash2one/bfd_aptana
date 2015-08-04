function Chart(dateRange, a, b,setting){
    var self = this
    function getData(){
           var p = {
                        typeName: a.currentItem.key
                    }
            if ($.isEmptyObject(b.currentDbItem)) {
                p['dbTypeName'] = b.currentDbItem.key
            }
            var url = setting.chart.url + '?' +
            $.param($.extend(true, {}, p,  {
                begin: dateRange.begin,
                end: dateRange.end
            }, setting.chart.data))
			var result
			$.ajax({
				async: false,
				url:url,
				dataType: 'json',
				success:function(data){
					result=data
				}
			})
			return result		
    }
    self.flush = function(){
		   var data=getData()
           self.chart.series[0].setData(data['type'])
		   if(data['dbtype']){
		   		self.chart.series[1].setData(data['dbtype'])
		   }
		   if(data['type2']){
		  	 	self.chart.series[2].setData(data['type2'])
		   }
		   if(data['dbtype2']){
		   		self.chart.series[3].setData(data['dbtype2'])
		   }
    }
    self.init = function(){
        self.chart = new Highcharts.Chart({
            chart: {
                renderTo: $(setting.chart.renderTo)[0],
                zoomType: 'xy'
            },
            title: {
                text: null
            },
            legend: {
                enabled: false
            },
            xAxis:[{
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%Y-%m-%e'
                },
                minRange: 24 * 3600 * 1000,
                showLastLabel: true
            }, {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%Y-%m-%e'
                },
                minRange: 24 * 3600 * 1000,
                showLastLabel: true
            }],
            yAxis: [{
                title: {
                    text: null
                }
            }, {
                title: {
                    text: null
                }
            }],
            series: [{
                color: '#609EC8',
				data:[],
				 pointStart: Date.UTC(2010, 0, 1),
                 pointInterval: 24 * 3600 * 1000,
				 xAxis:0,
				 yAxis:0
            }, {
                color: '#A6C71E',
				data:[],
				 pointStart: Date.UTC(2010, 0, 1),
                 pointInterval: 24 * 3600 * 1000,
				  xAxis:0,
				 yAxis:1
            }, {
                color: '#C3E3F8',
				data:[],
				 pointStart: Date.UTC(2010, 0, 1),
                 pointInterval: 24 * 3600 * 1000 ,
				  xAxis:1,
				 yAxis:0
            }, {
                 color: '#DCF185',
				 data:[],
				 pointStart: Date.UTC(2010, 0, 1),
                 pointInterval: 24 * 3600 * 1000,
				  xAxis:1,
				 yAxis:1
            }]
        })
		self.flush()
    }
	self.init()
}
