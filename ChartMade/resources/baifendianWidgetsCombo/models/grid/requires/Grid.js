/**
 * @author Administrator
 */
function Grid(setting, global){
    Widget.call(this)
    function buildDom(){
        var dom = $('#' + setting.container)
        if (setting.option.hasPager != false) {
            self.gridDom = $('<div></div>').appendTo(dom)
            self.pageDom = $('<div class="pager"></div>').appendTo(dom)
        }
        else {
            self.gridDom = dom
        }
    }
    self.flush = function(init){
		var param=$.extend(true,{},setting.option)
		param.url=_baifendianDataURL
		param.colModel=setting.cols
		param.data={
			keys:[],
			values:[]
		}
		if (!$.isEmptyObject(setting.option.data)){
			for (var k in setting.option.data) {
                    param.data.keys.push(k)
                    param.data.values.push(setting.option.data[k])
                }
		}
		param.data.type = 'grid'
        param.data.requestId = setting.id.split('_')[0]
        param.renderTo = self.gridDom
		if (setting.option.hasPager != false) {
                 setting.option.page?param.page= setting.option.page:param.page={}
				 param.page.renderTo = self.pageDom
        }
		if(setting.option.chart){
				if (setting.option.chart.hasScale) {
	                        param['colModel'].push({
	                            colName: '占比',
	                            name: 'scale'
	                        })
	                    }
			        param['fixColInStart'] = true
                    param['fixColModel'] = [{
                        colName: setting.option.chart.title,
                        'name': 'chart',
                        render: function(dom,stores){
                            dom.css('background-color', '#F9F9F9')
                            var data=[] 
							var k=setting.option.chart.labelsItem||param['colModel'][0].name
							var v=setting.option.chart.valueItem||param['colModel'][1].name
	                    	$.each(stores, function(i, item){
	                    		if(setting.option.chart.enabledLastStore==false&&i==stores.length-1){
	                    			return false
	                    		}
	                            data.push({
	                                name: item[k],
	                                y: item[v]
	                            })
	                        })
                            var chart = new GridChart(setting.option.chart.type, dom[0])
                            chart.setData(data)
                        }
                    }]
		}
		if (global.dateRange.mode === 'compare' && !setting.option.chart){
			 $.extend(true,param.data,{keys:['dbStart','dbEnd','groupCol','tansact'],
			              values:[global.dateRange.getDbStart(), 
						              global.dateRange.getDbEnd(),
									  setting.cols[0].name,
									   'dateRange'],
							groupCol:setting.cols[0].name,
							tansact: 'dateRange'		   
						})
		}	
		param.data.start = global.dateRange.getStart()
        param.data.end = global.dateRange.getEnd()
        $.baeGrid(param)
    }
    self.init = function(){
		buildDom()
        self.flush(true)
        global.dateRange.addEventListener(function(){
            self.flush(false)
        })
    }
    self.init()
}

function GridChart(type, rander){
    var self = this
    self.setData = function(data){
        self.chart.series[0].setData(data)
    }
    self.init = function(){
        self.chart = new Highcharts.Chart({
            chart: {
                renderTo: rander,
                type: type,
                backgroundColor:'#F9F9F9'
            },
            title: {
                text: null
            },
            xAxis: {
                categories: [],
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                title: null
            },
            tooltip: {
                formatter: function(){
                	if(type=='pie'){
                		return this.point.name + ': ' + this.percentage.toFixed(2) + ' %'
                	}else{
                		return this.point.name + ': ' + this.y
                	}
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                },
                pie: {
                    size: '45%',
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        formatter: function(){
                            return this.point.name + '<br/>' + this.y;
                        }
                    }
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            series: [{
                data: []
            }]
        });
    }
    self.init()
}
