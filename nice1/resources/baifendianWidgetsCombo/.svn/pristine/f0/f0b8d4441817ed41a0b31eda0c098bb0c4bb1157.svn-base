BfdWidget.parallel = function(setting, global) {
	Widget.call(this)
	var self = this
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
		return param
	};
	var getData = function(param) {
		return $.ajax({
			url:setting.url||_baifendianDataURL,
			data: param,
			dataType: "json"
		});
	}
	function parseData(result){
		var data = []
		$.each(result,function(m,j){
			var item = {}
			$.each(setting.cols,function(n,i){
				if(j[i.key]){
					item[i.title] = j[i.key]
				}
			})
			data.push(item)
		})
		return data
	}
	this.init = function(){
		setting.option.container = setting.container
		setting.option.titles = $.map(setting.cols,function(n,i){
			return n.title;
		})
		this.parallel = new Parallel(setting.option)
		getData(data_param()).done(function(data){
			self.parallel.setData(parseData(data));
		})
	}
	this.init();
}