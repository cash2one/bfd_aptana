/**
 * author fxs
 */
BfdWidget.pie = function(setting, global) {
	Widget.call(this)
	var self = this
	var default_option = setting.option;
	var current_option;
	var colors = [['#609EC8','#C3E3F8'],['#A6C71E','#DCF185']]
	var sourceWH = {width:170,height:151}
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
			$.each(setting.dataParam,function(k,v){
				param.keys.push(k)
				param.values.push(v)
			})
		}
		if(global.dateRange.mode=='compare'){
			param.keys.push('dbStart','dbEnd')
			param.values.push(global.dateRange.getDbStart(),global.dateRange.getDbEnd())
		}
		return param
	};
	var getData = function(param) {
		return $.ajax({
			url:_baifendianDataURL,
			data: param,
			dataType: "json"
		});
	}
	var flush = function(){
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
	var creatChart = function(option){
		var formats = {}
		$.each(setting.cols,function(m,j){
			formats[j.title] = (j.format&&BfdWidget.format[j.format])?BfdWidget.format[j.format]:function(v){return v;}
		})
		option.tooltip = {
			formatter:function(){
				return '<b>'+ this.point.name +'</b>: '+ (this.point.allzero?'0 %':this.percentage +' %');
			}
		}
		option.plotOptions.pie.dataLabels.formatter = function() {
			return this.point.name+':'+(this.point.allzero?'0':formats[this.series.name](this.y))
		}
		if (self.chart) {
			self.chart.destroy();
		}
		self.chart = new Highcharts.Chart(option);
	}
	var parseData = function(stores){
		var data = {
			series:[]
		}
		if(!stores.length){
			$.each(setting.cols, function(m,j){
				data.series[m] = {
					data: [],
					name: j.title,
					key: j.key
				}
			});
			data.xAxis[0] = {
				categories:[]
			}
			return data
		}

		var each = function(n, store) {
			var cols = [];
			$.each(setting.cols, function(m,j){
				if(store[j.key]!=undefined){
					cols.push(j)
				}
			});
			$.each(cols, function(m, j) {
				if (!data.series[m]) {
					data.series[m] = {
						data: [],
						name: j.title,
						key: j.key
					}
				}
				data.series[m].data.push({
					y:store[j.key],
					name:store[setting.groupBy[0]]
				})
			})
		}
		$.each(stores, each)
		//如果全为0
		$.each(data.series,function(n,i){
			var allzero = true
			$.each(i.data,function(m,j){
				if(j.y!=0){
					allzero = false
				}
			});
			if (allzero) {
				i.data[0].y = 1
				i.data[0].allzero = true	
			}
		})
		return data;
	}
	var flushData = function(data, option) {
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
		default_option.chart.type = 'pie';
		setting.option.chart.width = $("#"+setting.container).width()*0.8
		setting.option.chart.style = {margin:'auto'}
		setting.option.chart.height = sourceWH.height*setting.option.chart.width/sourceWH.width
		delete setting.option.xAxis;
		delete setting.option.yAxis;
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