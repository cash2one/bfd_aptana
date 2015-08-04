/**
 * @author Administrator
 */
BfdWidget.chart = function(setting, global) {
	Widget.call(this)
	var self = this
	var default_option = setting.option;
	var current_option;
	var colors = [['#609EC8','#C3E3F8'],['#A6C71E','#DCF185']]

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
		if(setting.dataParam){
			if(setting.dataParam.sort&&setting.dataParam.sortmode){
				param.keys.push('sort','mode')
				param.values.push(setting.dataParam.sort,setting.dataParam.sortmode)
			}
		}
		console.log(global.dateRange)
		if(global.dateRange.mode=='compare'){
			param.keys.push('dbStart','dbEnd')
			param.values.push(global.dateRange.getDbStart(),global.dateRange.getDbEnd())
		}
		return param
	};
	var getData = function(param) {
		return $.ajax({
			//url: '../test_pages/' + param.cols[0] + '.json',
			url:_baifendianDataURL,
			data: param,
			dataType: "json"
		});
	}
	var creatChart = function(option){	
		$.each(setting.cols,function(m,j){
			var yindex = 0;
			option.yAxis[m] = {
				title:{
					text:j.title
				},
				min:0
			}
			if(m%2){
				option.yAxis[m].opposite = true
			}
			$.each(option.series,function(n,i){
				if(i.key==j.key){
					i.yAxis = m
					i.color = colors[m%2][yindex]
					i.xAxis = yindex
					yindex++;
				}
			})
		})
		$.each(option.xAxis,function(m,j){
			if(m%2){
				j.opposite = true
			}
			$.each(option.series,function(n,i){
				if(i.xAxis==m){
					$.each(i.data,function(l,k){
						k.name = j['categories'][l]
					})
				}
			})
		})
		if (self.chart) {
			self.chart.destroy();
		}
		console.log(option)
		self.chart = new Highcharts.Chart(option);
	}
	var parseData = function(stores){
		var data = {
			xAxis:[],
			yAxis:[],
			series:[]
		}
		var each = function(n, store) {
			var cols = [];
			$.each(setting.cols, function(m,j){
				if(store[j.key]!=undefined){
					cols.push(j)
				}
				if(store[j.key]=='0'){
					store[j.key]=0
				}
			});
			$.each(setting.groupBy, function(m, j) {
				if (store[j]) {
					if (!data.xAxis[m]) {
						data.xAxis[m] = {
							categories: []
						}
					}
					data.xAxis[m].categories.push(store[j])
				}
			})
			$.each(cols, function(m, j) {
				if (!data.series[m]) {
					data.series[m] = {
						data: [],
						name: j.title,
						key: j.key,
						yAxis: 0,
						xAxis: 0
					}
				}
				data.series[m].data.push({y:store[j.key]})
			})
		}
		$.each(stores, each)
		return data;
	}
	var flushData = function(data, option) {
		option.xAxis = data.xAxis;
		option.yAxis = data.yAxis;	
		option.series = data.series;
		return option
	}
	var addData = function(data, option) {
		$.merge(option.xAxis,data.xAxis);
		$.merge(option.yAxis,data.yAxis);
		$.merge(option.series,data.series);
		return option
	}
	this.init = function() {
		default_option.chart.renderTo = setting.container;
		current_option = default_option;
		self.chart = new Highcharts.Chart(default_option);
		self.chart.showLoading("wait...")
		var param = data_param()
		param.cols = param.cols.concat(setting.groupBy)
		getData(param).done(function(json) {
			var data = parseData(json.stores)
			if(json.db_stores){
				var dbdata = parseData(json.db_stores)
				data = addData(dbdata,data)
			}
			creatChart(flushData(data, default_option))
		});
	}
	this.init();
	this.flush = function(legend) {
		setting.cols = [legend.current]
		current_option = default_option;
		self.chart.showLoading("wait...")
		var param = data_param()
		param.cols = param.cols.concat(setting.groupBy)
		getData(param).done(function(json) {
			var data = parseData(json.stores)
			if(json.db_stores){
				var dbdata = parseData(json.db_stores)
				data = addData(dbdata,data)
			}
			creatChart(flushData(data, default_option))
		})
	}
	this.compare = function(sbox) {
		if(sbox.current){
			setting.cols = $.grep(setting.cols,function(n,t){
				return n.key == sbox.current.key
			})
		}
		if (sbox.selected) {
			setting.cols.push(sbox.selected)
			var param = data_param()
			param.cols = [sbox.selected.key]
			current_option = {}
			$.extend(true, current_option, default_option);
			self.chart.showLoading("wait...")
			getData(param).done(function(json) {
				var data = parseData(json.stores)
				if(json.db_stores){
					var dbdata = parseData(json.db_stores)
					data = addData(dbdata,data)
				}
				creatChart(addData(data, current_option));
			})
		} else {
			creatChart(addData({
				xAxis:[],
				yAxis:[],
				series:[]
			}, default_option))
		}
	}
	global.dateRange.addEventListener(function(dateRange) {
		var param = data_param()
		param.cols = param.cols.concat(setting.groupBy)
		getData(param).done(function(json) {
			var data = parseData(json.stores)
			if(json.db_stores){
				var dbdata = parseData(json.db_stores)
				data = addData(dbdata,data)
			}
			creatChart(flushData(data, current_option))
		});
	})
}