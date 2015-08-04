/**
 * @author Administrator
 */
BfdWidget.line = function(setting, global) {
	Widget.call(this)
	var self = this
	var default_option = setting.option;
	var colors = setting.rule.colors||[['#609EC8', '#A6C71E'],['#C3E3F8', '#DCF185']]
	var x_maxrange = setting.rule.x_maxrange || 12
	var fullDate = function(dateRange) {
		var dates = []
		var start = dateRange.start + '';
		var end = dateRange.end + '';
		function formatDate(str) {
			return str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2)
		}
		if(start.length == 8 && end.length == 8) {
			var startdate = new Date(Date.parse(formatDate(start)));
			var enddate = new Date(Date.parse(formatDate(end)));
			var i = startdate.getTime()
			var day = 24 * 60 * 60 * 1000
			while(i <= enddate.getTime()) {
				var d = new Date(i)
				var num = d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate()
				dates.push(num)
				i += day;
			}
		}
		return dates
	}
	var data_param = function() {
		var param = {
			requestId: setting.id.split("_")[0],
			type: setting.type,
			cols: $.map(setting.cols, function(i) {
				return i.key
			}),
			start: global.dateRange.getStart(),
			end: global.dateRange.getEnd(),
			keys: [],
			values: []
		}
		if(setting.dataParam) {
			$.each(setting.dataParam, function(k, v) {
				param.keys.push(k)
				param.values.push(v)
			})
		}
		if(global.dateRange.mode == 'compare') {
			param.keys.push('dbStart', 'dbEnd')
			param.values.push(global.dateRange.getDbStart(), global.dateRange.getDbEnd())
		}
		return param
	};
	var getData = function(param) {
		return $.ajax({
			url: _baifendianDataURL,
			data: param,
			dataType: "json"
		});
	}
	var creatChart = function(option) {
		var formats = {}
		$.each(setting.cols, function(m, j) {
			option.yAxis[m] = {
				title: {
					text: j.title
				},
				min: 0
			}
			if(j.format && BfdWidget.format[j.format]) {
				option.yAxis[m].labels = {
					formatter: function() {
						return BfdWidget.format[j.format](this.value)
					}
				}
			}
			if(m % 2) {
				option.yAxis[m].opposite = true
			}
			$.each(option.series, function(n, i) {
				if(i.yAxisId == j.key) {
					if(j.type) {
						i.type = j.type
					}
					i.yAxis = m
				}
			})
			formats[j.title] = (j.format && BfdWidget.format[j.format]) ? BfdWidget.format[j.format] : function(v) {
				return v;
			}
		})
		$.each(option.xAxis, function(m, j) {
			var step = 1
			var l = j.categories.length
			if(l > x_maxrange) {
				while(Math.floor(l / step) + (l % step) > x_maxrange) {
					step++;
				}
			}
			j.labels = {
				step: step
			}
			if(m % 2) {
				j.opposite = true
			}
			$.each(option.series, function(n, i) {
				if(i.xAxisId == j.id) {
					i.xAxis = m
					$.each(i.data, function(l, k) {
						k.name = j['categories'][l]
					})
					if(colors[m][i.yAxis]){
						i.color = $.isArray(colors[m][i.yAxis]) ? (colors[m][i.yAxis][n] ? colors[m][i.yAxis][n] : undefined) : colors[m][i.yAxis]
					}
				}
			})
		})
		option.tooltip = {
			formatter: function() {
				return this.x + '<br/>' + this.series.name + ':' + formats[this.series.name](this.y)
			}
		}
		if(self.chart) {
			self.chart.destroy();
		}
		self.chart = new Highcharts.Chart(option);
	}
	var parseData = function(json) {
		var allData = eachStores(json.stores, false);
		var db_flag = 'db_'
		if(json.db_stores) {
			allData = addData(eachStores(json.db_stores, true), allData)
			$.each(allData.xAxis,function(n,i){
				i.title = {
					text:new RegExp("^"+db_flag);.test(i.id)?'对比时间段':'当前时间段'
				}
			})
		}
		function eachStores(stores, isdb) {
			var data = {
				xAxis: [],
				yAxis: [],
				series: []
			}
			if(setting.rule.sort) {
				var orderby = setting.groupBy[setting.rule.sort.index]
				var sortFunction = {
					time:function(s1,s2,orderby){
						return s1[orderby] - s2[orderby]
					}
				}
				stores.sort(function(s1,s2){
					return sortFunction[setting.rule.sort.type](s1,s2,orderby)
				});
				if(setting.rule.sort.mode != 'asc') {
					stores.reverse();
				}
			}
			if(setting.rule.needfill) {
				$.each(fullDate({
					start: isdb ? global.dateRange.getDbStart() : global.dateRange.getStart(),
					end: isdb ? global.dateRange.getDbEnd() : global.dateRange.getEnd()
				}), function(n, i) {
					$.each(setting.groupBy, function(m, j) {
						if(!stores[n] || i !== stores[n][j]) {
							var store = {}
							store[j] = i
							$.each(setting.cols, function(k, col) {
								store[col.key] = 0;
							});
							stores.splice(n, 0, store);
						}
					})
				})
			}
			$.each(stores, function(n, store) {
				$.each(setting.groupBy, function(m, j) {
					if(store[j] != undefined) {
						if(!data.xAxis[m]) {
							data.xAxis[m] = {
								categories: [],
								id: !isdb ? j : db_flag + j
							}
						}
						data.xAxis[m].categories.push(store[j])
					}
				})
				$.each(setting.cols, function(m, j) {
					if(!data.series[m]) {
						data.series[m] = {
							data: [],
							name: j.title,
							key: j.key,
							yAxisId: j.key,
							xAxisId: data.xAxis[j.groupBy ? j.groupBy : 0].id
						}
					}
					data.series[m].data.push({
						y: store[j.key] ? store[j.key] : 0
					})
				})
			})
			return data
		}
		return allData;
	}
	var flushData = function(data, option) {
		option.xAxis = data.xAxis;
		option.yAxis = data.yAxis;
		option.series = data.series;
		return option
	}
	var addData = function(data, option) {
		$.merge(option.xAxis, data.xAxis);
		$.merge(option.yAxis, data.yAxis);
		$.merge(option.series, data.series);
		return option
	}
	this.init = function() {
		default_option.chart.renderTo = setting.container;
		default_option.chart.width = $("#" + setting.container).width() * 0.95
		default_option.chart.style = {
			margin: 'auto'
		}
		default_option.chart.type = 'line';
		self.chart = new Highcharts.Chart(default_option);
		self.chart.showLoading("正在载入……")
		var param = data_param()
		param.cols = param.cols.concat(setting.groupBy)
		getData(param).done(function(json) {
			var data = parseData(json)
			creatChart(flushData(data, default_option))
		});
	}
	this.init();
	var flush = function() {
		self.chart.showLoading("正在载入……")
		var param = data_param()
		param.cols = param.cols.concat(setting.groupBy)
		getData(param).done(function(json) {
			var data = parseData(json)
			creatChart(flushData(data, default_option))
		})
	}
	this.legendflush = function(legend) {
		setting.cols = [legend.current]
		flush();
	}
	this.dateTypeflush = function(value) {
		if(setting.dataParam) {
			setting.dataParam.dateType = value
		}
		flush();
	}
	this.selectflush = function(sbox) {
		setting.cols = [sbox.selected]
		flush();
	}
	this.timeTypeflush = function(value) {
		if(setting.dataParam) {
			setting.dataParam.timeType = value
		}
		flush();
	}
	this.compare = function(sbox) {
		if(sbox.current) {
			setting.cols = $.grep(setting.cols, function(n, t) {
				return n.key == sbox.current.key
			})
		}
		if(sbox.selected) {
			setting.cols.push(sbox.selected)
		}
		var param = data_param()
		param.cols = param.cols.concat(setting.groupBy)
		self.chart.showLoading("正在载入……")
		getData(param).done(function(json) {
			var data = parseData(json)
			creatChart(flushData(data, default_option));
		})
	}
	global.dateRange.addEventListener(function(dateRange) {
		var param = data_param()
		param.cols = param.cols.concat(setting.groupBy)
		self.chart.showLoading("正在载入……")
		getData(param).done(function(json) {
			var data = parseData(json)
			creatChart(flushData(data, default_option))
		});
	})
}