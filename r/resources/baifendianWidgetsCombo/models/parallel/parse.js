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
			//url:_baifendianDataURL,
			url:'../test_pages/parallel.json',
			data: param,
			dataType: "json"
		});
	}
	this.init = function(){
		setting.option.container = setting.container
		setting.option.titles = $.map(setting.cols,function(n,i){
			return n.title;
		})
		this.parallel = new Parallel(setting.option)
		getData(data_param).done(function(data){
			self.parallel.setData(data);
		})
	}
	this.init();
}