/**
 * @author Administrator
 */
BfdWidget.column = function(setting, global) {
	Widget.call(this)
	var self = this
	var default_option = setting.option;
	var current_option;
	var colors = [['#AFD8F8','#F6BD0F'],['#8BBA00','#F6BD0F']]
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
		// if(global.dateRange.mode=='compare'){
		// 	param.keys.push('dbStart','dbEnd')
		// 	param.values.push(global.dateRange.getDbStart(),global.dateRange.getDbEnd())
		// }
		return param
	};
	var getData = function(param) {
		return $.ajax({
			url:_baifendianDataURL,
			data: param,
			dataType: "json"
		});
	}
	
	var creatChart = function(option){
		var formats = {}
		$.each(setting.cols,function(m,j){
			formats[j.title] = (j.format&&BfdWidget.format[j.format])?BfdWidget.format[j.format]:function(v){return v;}
		})
		$.each(option.yAxis,function(m,j){
			var yindex = 0;
			if(j.format&&BfdWidget.format[j.format]){
				option.yAxis[m].labels = {
					formatter: function(){
						return BfdWidget.format[j.format](this.value)
					}
				}
			}
			if(m%2){
				option.yAxis[m].opposite = true
			}
			$.each(option.series,function(n,i){
				if(i.type==j.type){
					i.yAxis = m
					i.color = colors[m%2][yindex]
					yindex++;
				}
			})
		})
		option.tooltip = {
			formatter:function(){
				return this.x+'<br/>'+this.series.name+':'+formats[this.series.name](this.y)
			}
		}
		if (self.chart) {
			self.chart.destroy();
		}
		self.chart = new Highcharts.Chart(option);
	}
	var parseData = function(stores){
		var data = {
			xAxis:[],
			yAxis:[],
			series:[]
		}
		if(!stores.length){
			var yAxisObj = {}
			$.each(setting.cols, function(m,j){
				data.series[m] = {
					data: [],
					name: j.title,
					key: j.key,
					yAxis: 0,
					xAxis: 0
				}
				if(j.type){
					data.series[m].type = j.type
					if(!yAxisObj[j.type]){
						yAxisObj[j.type] = {
							type:j.type,
							title:{
								text:""
							},
							min:0
						}
					}
				}
			});
			data.xAxis[0] = {
				categories:[]
			}
			$.each(yAxisObj,function(k,v){
				data.yAxis.push(v)
			})
			return data
		}
		var each = function(n, store) {
			var cols = [];
			$.each(setting.cols, function(m,j){
				if(store[j.key]!=undefined){
					cols.push(j)
				}
			});
			$.each(setting.groupBy, function(m, j) {
				if (store[j]!=undefined) {
					if (!data.xAxis[m]) {
						data.xAxis[m] = {
							categories: []
						}
					}
					data.xAxis[m].categories.push(store[j])
				}
			})
			var yAxisObj = {}
			$.each(cols, function(m, j) {
				if(j.type&&!yAxisObj[j.type]){
					yAxisObj[j.type] = {
						type:j.type,
						title:{
							text:""
						},
						min:0
					}
				}
				if (!data.series[m]) {
					data.series[m] = {
						data: [],
						name: j.title,
						key: j.key,
						yAxis: 0,
						xAxis: 0
					}
				}
				if(j.type){
					data.series[m].type = j.type
				}
				data.series[m].data.push({y:store[j.key]})
			})
			if(n==0){
				$.each(yAxisObj,function(k,v){
					data.yAxis.push(v)
				})
			}
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
	this.init = function() {
		default_option.chart.renderTo = setting.container;
		default_option.chart.width = $("#"+setting.container).width()*0.95
		default_option.chart.style = {margin:'auto'}
		default_option.chart.type = 'column';
		//default_option.chart.borderWidth = 1;
		current_option = default_option;
		self.chart = new Highcharts.Chart(default_option);
		self.chart.showLoading("正在载入……")
		var param = data_param()
		param.cols = param.cols.concat(setting.groupBy)
		getData(param).done(function(json) {
			var data = parseData(json.stores)
			creatChart(flushData(data, default_option))
		});
	}
	this.init();

	global.dateRange.addEventListener(function(dateRange) {
		var param = data_param()
		param.cols = param.cols.concat(setting.groupBy)
		self.chart.showLoading("正在载入……")
		getData(param).done(function(json) {
			var data = parseData(json.stores)
			creatChart(flushData(data, current_option))
		});
	})
}