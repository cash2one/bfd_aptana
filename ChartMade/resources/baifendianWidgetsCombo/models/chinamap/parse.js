BfdWidget.chinamap = function(setting, global) {
	Widget.call(this)
	var data_param = {
		requestId: setting.id,
		cols: $.merge(setting.cols.slice(0), setting.groupBy),
		start: global.dateRange.start,
		end: global.dateRange.end,
		limit: 0,
		//开始的位置
		range: 20,
		//个数
		type: setting.type,
		//请求类型
		init: false,
		//在init为True时返回，为false或不存在时无需返回
		keys: ['name', 'attr2'],
		//参数名称
		values: ['v1', 'v2'] //参数值
	}
	var self = this
	var getData = function() {
			return $.ajax({
				url: _baifendianDataURL[data_param.requestId],
				data: data_param,
				dataType: "json"
			});
		}
	var parseSetting = function() {
			setting.option.chart.renderTo = setting.container;
			setting.option.tooltip.formatter = function() {
				var unit = {
					'Rainfall': 'mm',
					'Temperature': '°C',
					'Sea-Level Pressure': 'mb',
					'MSIE': '%'
				}[this.series.name];
				if (this.point.name) {
					return '<b>' + this.point.name + '</b><br/>' + this.x + ': ' + this.y + ' ' + unit;
				} else {
					return '' + this.x + ': ' + this.y + ' ' + unit;
				}
				
			}
		}
	this.init = function() {
		parseSetting()
		getData().done(function(data) {
			// if (data.categories && setting.option.xAxis) {
			// 	setting.option.xAxis.categories = data.categories
			// }
			// setting.option.series = data.series
			$.each(china_shapes, function(n, i) {
				setting.option.series[0].data.push({
					path: Highcharts.pathToArray(i.path),
					name: i.name,
					y: data.data[n]['value'],
					color: data.data[n]['color'],
					key: n
				});
			});
			this.map = new Highcharts.Map(setting.option)
		});
	}
	this.init();
}