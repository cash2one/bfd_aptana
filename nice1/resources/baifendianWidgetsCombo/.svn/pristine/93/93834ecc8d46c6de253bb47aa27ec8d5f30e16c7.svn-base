BfdWidget.wordcloud = function(setting, global) {
	Widget.call(this)
	var self = this
	var data_param = function() {
		var param = {
			requestId: setting.id.split("_")[0],
			type: setting.type,
			cols: $.map(setting.cols, function(i) {
				return i.key||i.title
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
		this.wordcloud = new D3WordCloud(setting.option)
		getData(data_param()).done(function(data){
			var words = $.map(setting.cols,function(n,i){
				return {
					text:n.title,
					value:data.stores[i] 
				};
			})
			self.wordcloud.setData(words);
		})
	}
	this.init();
	this.flush = function(){
		getData(data_param()).done(function(data){
			var words = $.map(setting.cols,function(n,i){
				return {
					text:n.title,
					value:data.stores[i] 
				};
			})
			self.wordcloud.setData(words);
		})
	}
}