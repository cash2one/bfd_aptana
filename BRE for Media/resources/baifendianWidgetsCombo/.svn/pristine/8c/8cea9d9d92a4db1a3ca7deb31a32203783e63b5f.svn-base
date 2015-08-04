BfdWidget.forcedirected = function(setting, global) {
	Widget.call(this)
	var data_param = function() {
			return {
				requestId: setting.id.split("_")[0],
				cols: $.map(setting.cols, function(i) {
					return i.key
				}),
				start: global.dateRange.start,
				end: global.dateRange.end,
				type: setting.type,
				keys: [],
				values: [] 
			}
		}
	var self = this
	var getData = function() {
			return $.ajax({
				url: setting.url||_baifendianDataURL,
				data: data_param(),
				dataType: "json"
			});
		}
	var parseSetting = function() {
		setting.option.container = setting.container;
		setting.option.width = setting.option.width||$("#"+setting.container).width();
		setting.option.height = setting.option.height||$("#"+setting.container).width();
		
	}
	this.init = function() {
		parseSetting()
		this.forcedirected = new d3ForceDirected(setting.option);
		getData().done(function(data) {
			self.forcedirected.setData(data);
		});
	}
	this.init();
}