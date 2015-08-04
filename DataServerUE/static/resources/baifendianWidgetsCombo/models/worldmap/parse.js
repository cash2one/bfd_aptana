BfdWidget.prototype.worldmap = function(setting) {
	this.parseSetting = function() {
		setting.option.tooltip.formatter = function() {
			var unit = {
				'Rainfall': 'mm',
				'Temperature': '°C',
				'Sea-Level Pressure': 'mb',
				'MSIE': '%'
			}[this.series.name];
			if(this.point.name){
				return '<b>' + this.point.name + '</b><br/>' + this.x + ': ' + this.y + ' ';
			}else{
				return '' + this.x + ': ' + this.y + ' ' + unit;
			}
		}
		$.each(world_shapes, function(n, i) {
			setting.option.series[0].data.push({
				path: Highcharts.pathToArray(i.path),
				name: i.name,
				key: n
			});
		});
		setting.option.chart.renderTo = setting.container;
		this.map = new Highcharts.Map(setting.option)
		this.map.showLoading('正在加载，请稍候……');
	}
	this.mergeParam = function(){
		return {
			id: setting.id,
			cols: setting.cols,
			groupBy: setting.groupBy,
			limits: {
				dataRange: {
					start: setting.start,
					end: setting.end
				},
				range: {
					start: 12,
					range: 20
				},
				option: {
					id: setting.id
				}
			}
		};
	}
	this.parseData = function(item) {
		var self = this
		$.each(this.map.series[0].data, function(n, i) {
			if (i.name == 'unknown') {
				item.data[i.key]['value'] = 200
				item.data[i.key]['color'] = '#f60'
				//i.name = n
			}
			i.update({
				y: item.data[i.key]['value'],
				color: item.data[i.key]['color']
			}, false, false);
		});
		this.map.hideLoading();
	}
}