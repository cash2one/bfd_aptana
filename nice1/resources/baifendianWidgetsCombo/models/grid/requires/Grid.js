/**
 * @author Administrator
 */

function Grid(setting, global) {
	if(typeof Widget != 'undefined') {
		Widget.call(this)
	}
	var self = this

	function buildDom() {
		var dom = $('#' + setting.container)
		if(setting.option.hasPager != false) {
			self.gridDom = $('<div></div>').appendTo(dom)
			self.pageDom = $()
			if(setting.theme !== 'default') { //setting.option.page&&setting.option.page.theme&&setting.option.page.theme=== 'pagination'){
				self.pageDom = $('<div class="pagination"><ul class="page"></ul></div>').appendTo(dom)
			} else {
				self.pageDom = $('<div class="pager"></div>').appendTo(dom)
			}
		} else {
			self.gridDom = dom
		}
	}
	self.setDataParameter = function(obj){
		$.extend(setting.dataParam,obj);
		self.flush()
	}
	self.setExpParam = function(obj) {
		self._expParam = obj
		self.flush()
	}
	self.flush = function() {
		if(self.onDataLoad){
			setting.option.onDataLoad=self.onDataLoad
		}
		self.gridDom.empty()
		if(setting.option.hasPager != false) {
			setting.theme==='default'?self.pageDom.empty():self.pageDom.find('ul').empty()
		}
		setting.option.data = setting.dataParam
		var param = $.extend(true,{}, setting.option, {
			'theme': setting.theme,
			data: global.param
		})

		param.url = setting.url || _baifendianDataURL
		param.colModel = setting.cols
		
		var keys = $.map($.extend(true,{},param.data||{}), function(v, k) {
			if($.isArray(v)){
				if(v.length){
					return k;
				}else{
					return null;
				}
			}else{
				return k;
			}
		});
		var values = $.map($.extend(true,{},param.data||{}), function(v, k) {
			return v;
		})
		
		param.data= {
			keys: keys,
			values: values,
			fact_keys: $.map(self._expParam || {}, function(v, k) {
				return k;
			}),
			fact_values: $.map(self._expParam || {}, function(v, k) {
				return v;
			})
		}
//		$.extend(param.data, {
//			keys: keys,
//			values: values,
//			fact_keys: $.map(self._expParam || {}, function(v, k) {
//				return k;
//			}),
//			fact_values: $.map(self._expParam || {}, function(v, k) {
//				return v;
//			})
//		})



		param.data.type = 'grid'
		if(setting.id) {
			param.data.requestId = setting.id.split("_")[0]
		}
		param.renderTo = self.gridDom
		if(setting.option.hasPager != false) {
			setting.option.page ? param.page = setting.option.page : param.page = {}
			param.page.renderTo = self.pageDom
		}
		if(setting.option.chart) {
			if(setting.option.chart.hasScale) {
				if($.grep(param['colModel'], function(item, i) {
					return item.name === 'scale'
				}).length == 0) {
					param['colModel'].push({
						colName: '占比',
						name: 'scale',
						type: 'rate',
						sortable: false
					})
				}
				var v = setting.option.chart.valueItem || param['colModel'][1].name
				param["onDataLoad"] = function(data) {
						if(data.stores && data.stores.length > 0) {
							var content = 0
							$.each(data.stores, function(i, item) {
								return content += item[v]
							})
							$.each(data.stores, function(i, item) {
								return item['scale'] = item[v] / content
							})
						}
					}
			}
			param['fixColInStart'] = true
			param['fixColModel'] = [{
				colName: setting.option.chart.title,
				'name': 'chart',
				'_colWidth': '30%',
				render: function(dom, stores) {
					dom.css({
						'background-color': '#F9F9F9',
						'text-align': 'left'
					})
					var data = []
					var k = setting.option.chart.labelsItem || param['colModel'][0].name
					var v = setting.option.chart.valueItem || param['colModel'][1].name
					$.each(stores, function(i, item) {
						if(setting.option.chart.enabledLastStore == false && i == stores.length - 1) {
							return false
						}
						data.push({
							name: item[k],
							y: item[v]
						})
					})
					if(stores.length > 0) {
						var chart = new GridChart(setting.option.chart.type, dom[0], stores.length)
						chart.setData(data)
					}

				}
			}]
			param.agv_width = true
			param._countNormolColWidthScala = (70 * (param['colModel'].length + param['fixColModel'].length)) / param['colModel'].length
		}
		if(global && global.dateRange && global.dateRange.mode === 'compare' && !setting.option.chart) {
			param.data.keys = param.data.keys.concat(['dbStart', 'dbEnd', 'groupCol', 'tansact'])
			param.data.values = param.data.values.concat([global.dateRange.getDbStart(), global.dateRange.getDbEnd(), setting.cols[0].name, 'dateRange'])
			$.extend(true, param.data, {
				groupCol: setting.cols[0].name,
				tansact: 'dateRange'
			})
		}
		if(global && global.dateRange) {
			param.data.start = global.dateRange.getStart()
			param.data.end = global.dateRange.getEnd()
		}
		$.baeGrid(param)
	}
	self.init = function() {
		buildDom();
		if(setting.autoload !== false) {
			self.flush();
		}
		if(global && global.dateRange) {
			global.dateRange.addEventListener(function() {
				if(setting.autoload!== false){
					self.flush()
				}
				
			})
		}
	}
	self.init()
}

function GridChart(type, rander, l) {
	var self = this
	self.setData = function(data) {
			self.chart.series[0].setData(data)
		}
	self.init = function() {
		var setting = {
			chart: {
				renderTo: rander,
				type: type,
				backgroundColor: '#F9F9F9',
				height: l == 1 ? 80 : 50 * l
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
				formatter: function() {
					if(type == 'pie') {
						return this.point.name + ': ' + this.percentage.toFixed(2) + ' %'
					} else {
						return this.point.name + ': ' + this.y
					}
				}
			},
			plotOptions: {
				bar: {
					dataLabels: {
						enabled: true,
						overflow: 'justify',
						stacking: 'percent'
					}
				},
				pie: {
					size: '45%',
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						formatter: function() {
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
		}
		if(type == 'bar') {
			setting.chart.spacingRight = 20
		}
		self.chart = new Highcharts.Chart(setting);
	}
	self.init()
}
$(function() {
	var navigatorString = navigator.userAgent.toLowerCase()
	if(/.*chrome.*/.test(navigatorString) || /.*(safari).*/.test(navigatorString)) {
		setInterval(function() {
			$('table.grid').each(function() {
				var height = $(this).height()
				var rowHeight = (height - $(this).find('tr:first').height()) / $(this).find('tr:gt(0)').size()
				$(this).find('tr:gt(0)').attr('height', rowHeight)
			})
		}, 300)
	}
});