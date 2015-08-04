BfdWidget.chinamap = function(setting, global) {
	Widget.call(this)
	var sourceWH = {width:170,height:151}
	var colors = setting.rule.colors||['#9dd1ff', '#346b97']
	var dataLabelOptions = setting.rule.dataLabelOptions||{};
	var data_param = function(){
		var param = {
			requestId: setting.id.split("_")[0],
			cols: $.map(setting.cols, function(i) {
				return i.key
			}).concat(setting.groupBy),
			start: global.dateRange.getStart(),
			end: global.dateRange.getEnd(),
			type: setting.type,
			keys:[],
			values:[]
		}
		if(setting.dataParam&&setting.dataParam.flagIndex){
			param.keys.push('flagIndex')
			param.values.push(true)
		}
		return param
	}
	var self = this
	var getData = function(param) {
		return $.ajax({
			url: setting.url||_baifendianDataURL,
			data: param,
			dataType: "json",
			error: function(){
				if(self.chart) {
					self.chart.showLoading("数据加载错误")
				}
			}
		});
	}
	var addColor = function(data){
		var tempArray = []
		$.each(data,function(k,v){
			tempArray.push(v.value)
		})
		var max = Math.max.apply(Math, tempArray)
		var min = Math.min.apply(Math, tempArray)
		var range = max - min
		range=(range==0?1:range)
		var colorrange = [{
			min:parseInt(colors[0].substr(1,2),16),
			max:parseInt(colors[1].substr(1,2),16)
		},
		{
			max:parseInt(colors[1].substr(3,2),16),
			min:parseInt(colors[0].substr(3,2),16)
		},
		{
			max:parseInt(colors[1].substr(5),16),
			min:parseInt(colors[0].substr(5),16)
		}]
		
		$.each(data,function(k,v){
			var datacolor = $.map(colorrange,function(n){
				var vg = Number(n.min+(Math.ceil((v.value - min) * (n.max-n.min) / range))).toString(16)
				vg = vg.length > 1 ? vg : ('0' + vg)
				return vg;
			})
			v.color = "#"+datacolor.join("")
		})
		return data
	}
	var parseData = function(json){
		var data = {}
		$.each(json.stores,function(n,store){
			$.each(setting.groupBy,function(m,g){
				data[store[g]] = {}
				$.each(setting.cols,function(l,col){
					data[store[g]]['value'] = 0
					if(store[col.key]!=undefined){
						data[store[g]]['value'] = store[col.key]
					}
				})
			})
		});
		data = addColor(data)
		return data;
	}
	var createMap = function(data){
		setting.option.series[0].data = []
		var formats = {};
		$.each(setting.cols,function(m,j){
			setting.option.series[m].name = j.title
			formats[j.title] = (j.format&&BfdWidget.format[j.format])?BfdWidget.format[j.format]:function(v){return v;}
		});
		
		$.each(china_shapes, function(n, i) {
			var point = {
				path: Highcharts.pathToArray(i.path),
				name: i.name,
				key: n,
				states: {
					hover: {
						color: '#68bcff'
					}
				},
				dataLabels:{
					enabled: true,
					color:"black",
					style: {
						fontFamily: 'Tahoma,"宋体"', // default font
						fontSize: '10px',
						fontWeight: 'normal'
					},
					formatter: function(dataLabelOptions) {
						return this.point.options.name;
					}
				}
			};
			if(dataLabelOptions[n]){
				$.extend(point.dataLabels,dataLabelOptions[n])
			}
			if(data&&data[n]){
				point.y = data[n]['value']
				point.color = data[n]['color']
			}else{
				point.y = 0
				point.color = colors[0]
			}
			setting.option.series[0].data.push(point);
			
		});
		setting.option.tooltip = {
			formatter:function(){
				return this.point.name+'<br/>'+this.series.name+':'+formats[this.series.name](this.y)
			}
		}
		var option = {}
		$.extend(true,option,setting.option)
		if(self.map){
			self.map.destroy()
		}
		self.map = new Highcharts.Map(option);
	}
	this.init = function() {
		setting.option.chart.renderTo = setting.container;
		setting.option.chart.type = 'map';
		setting.option.chart.animation = false;
		setting.option.chart.width = $("#"+setting.container).width()*0.8
		setting.option.chart.style = {margin:'auto'}
		setting.option.chart.height = sourceWH.height*setting.option.chart.width/sourceWH.width
		
		setting.option.tooltip.formatter =function(){
			return this.point.name+":"+this.point.y
		}
		delete setting.option.xAxis;
		delete setting.option.yAxis;
		createMap()
		self.map.showLoading("正在载入……")
		getData(data_param()).done(function(json) {
			var data = parseData(json)
			createMap(data)
		});
	}
	this.init();
	this.legendflush = function(legend){
		setting.cols = [legend.current]
		var param = data_param()
		self.map.showLoading("正在载入……")
		getData(param).done(function(json) {
			var data = parseData(json)
			createMap(data)
		})
	}
	global.dateRange.addEventListener(function(dateRange) {
		var param = data_param()
		self.map.showLoading("正在载入……")
		getData(param).done(function(json) {
			var data = parseData(json)
			createMap(data)
		})
	})
}