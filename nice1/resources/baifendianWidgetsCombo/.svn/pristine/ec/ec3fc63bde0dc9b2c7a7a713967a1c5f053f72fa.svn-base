BfdWidget.treemap = function(setting, global) {
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
	this.init = function(){
		setting.option.container = setting.container;
		setting.option.width = setting.option.width||$("#"+setting.container).width();
		setting.option.height = setting.option.height||$("#"+setting.container).width();
		
		setting.option.titles = $.map(setting.cols,function(n,i){
			return n.title;
		})
		this.treemap = new D3Treemap(setting.option)
		getData(data_param()).done(function(data){
			self.treemap.setData(data);
		})
	}
	this.init();
}