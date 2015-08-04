/**
 * @author Administrator
 */

// function Chart(setting) {
// }
/*_baifendianWidgets.chart.parse = function(item) { //设置中返回的项
	var c = new Chart(item);
	return c
}*/
BfdWidget.prototype.chart = function(setting) {
	this.parseSetting = function() {
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
		setting.option.chart.renderTo = setting.container;
		this.chart = new Highcharts.Chart(setting.option)
		this.chart.showLoading('正在加载，请稍候……');
	}
	this.mergeParam = function() {
		return {
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
	this.parseData = function(data, empty) {
		var self = this
		$.each(data.categories, function(n, i) {
			self.chart.xAxis[n].setCategories(i, false);
		})
		if (empty) {
			while (self.chart.series.length) {
				self.chart.series[0].remove(false);
			}
		}
		$.each(data.series, function(n, i) {
			self.chart.addSeries(i, false, true);
		});
		self.chart.redraw();
		this.chart.hideLoading();
	}
}