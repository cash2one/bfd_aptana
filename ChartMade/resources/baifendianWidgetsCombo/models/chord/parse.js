BfdWidget.chord = function(setting, global) {
	Widget.call(this)
	var data_param = function() {
			return {
				requestId: setting.id,
				cols: $.merge(setting.cols.slice(0), setting.groupBy),
				start: global.dateRange.start,
				end: global.dateRange.end,
				limit: 0,
				//开始的位置
				range: 20,
				//个数
				type: setting.type,
				//请求类型
				init: false,
				//在init为True时返回，为false或不存在时无需返回
				keys: ['name', 'attr2'],
				//参数名称
				values: ['v1', 'v2'] //参数值
			}
		}
	var self = this
	var getData = function() {
			return $.ajax({
				url: _baifendianDataURL[data_param().requestId],
				data: data_param(),
				dataType: "json"
			});
		}
	var parseSetting = function() {
			setting.option.container = setting.container;
		}
	this.init = function() {
		parseSetting()
		this.chord = new d3chord(setting.option);
		getData().done(function(data) {
			self.chord.setData(data);
		});
	}
	this.init();
}