BfdWidget.worldmap = function(setting, global) {
	Widget.call(this)
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
			url: _baifendianDataURL,
			data: param,
			dataType: "json"
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
		$.each(data,function(k,v){
			var vg = Number(255 - (Math.ceil((v.value - min) * 255 / range))).toString(16)
			vg = vg.length > 1 ? vg : ('0' + vg)
			v.color = "#20" + vg + "FF"
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
		$.each(world_shapes, function(n, i) {
			setting.option.series[0].data.push({
				path: Highcharts.pathToArray(i.path),
				name: i.name,
				y: data[n]['value'],
				color: data[n]['color'],
				key: n,
				states: {
					hover: {
						color: 'orange'
					}
				}
			});
		});
		var option = {}
		$.extend(true,option,setting.option)
		if(self.map){
			self.map.destroy()
		}
		self.map = new Highcharts.Map(option)
	}
	this.init = function() {
		setting.option.chart.renderTo = setting.container;
		setting.option.chart.type = 'map';
		setting.option.chart.animation = false
		delete setting.option.xAxis;
		delete setting.option.yAxis;
		
		getData(data_param()).done(function(json) {
			var data = parseData(json)
			createMap(data)
		});
	}
	this.init();
	global.dateRange.addEventListener(function(dateRange) {
		var param = data_param()
		getData(param).done(function(json) {
			var data = parseData(json)
			createMap(data)
		})	
	})
}