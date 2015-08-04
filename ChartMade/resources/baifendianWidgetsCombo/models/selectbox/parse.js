BfdWidget.selectbox = function(setting, global) {
	Widget.call(this)
	var self = this
	var parseSetting = function() {
		self.selectbox = new render(setting);
		var legend = $.grep(setting.option.groups, function(n, t) {
			return !n.checked
		})
		self.flush({
			current: setting.option.groups[0],
			others : legend
		})
	}
	var render = function(setting) {
		var select = $('<select name="compare"></select>').appendTo(
				"#" + setting.container)
		return select
	}
	this.init = function() {
		setting.option.groups = setting.cols
		if (setting.option.groups.length) {
			setting.option.groups[0].checked = true
		}
		parseSetting()
		self.addEvent('change', function() {
		})
		self.selectbox.change(function() {
			var key = $(this).val()
			self.fireEvent('change', $(this).val() === "0" ? undefined : {
				selected : $.grep(setting.option.groups, function(n, t) {
					return n.key == key
				})[0],
				current : $.grep(setting.option.groups, function(n, t) {
					return n.checked
				})[0]
			})
		})
	}
	this.flush = function(legend) {
		$.each(setting.option.groups, function(n, i) {
			i.checked = false
			if (legend.current.key) {
				i.checked = true
			}
		})
		self.selectbox.empty().append('<option value="0">对比指标</option>')
		$.each(legend.others, function(n, i) {
			self.selectbox.append('<option value="' + i.key + '">' + i.title
					+ '</option>');
		})

	}
	this.init();
}