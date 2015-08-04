BfdWidget.chord = function(setting, global) {
	Widget.call(this)
	var data_param = function() {
	var param = {
			requestId: setting.id.split("_")[0],
			cols: $.map(setting.cols, function(i) {
				return i.key
			}),
			start: global.dateRange.getStart(),
			end: global.dateRange.getEnd(),
			type: setting.type,
			keys: [],//参数名称
			values: [] //参数值
		}
		return param
	}
	var self = this
	var getData = function() {
			return $.ajax({
				url: '../test_pages/data5.json',
				//url:_baifendianDataURL,
				data: data_param(),
				dataType: "json"
			});
		}
	var parseData = function(json){
		var data = []
		$.each(json.stores,function(n,store){
			$.each(setting.cols,function(m,col){
				if(store[col.key]!=undefined){
					var to = []
					data.push({
						key:col.key,
						name:col.title,
						to:to
					})
				}
				
			})
		})
		return data
	}
	this.init = function() {
		setting.option.container = setting.container;
		setting.option.groups = setting.cols;
		this.chord = new d3chord(setting.option);
		getData().done(function(data) {
			self.chord.setData(parseData(data));
		});
	}
	this.init();
}