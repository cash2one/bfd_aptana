BfdWidget.selectbox = function(setting, global) {
	Widget.call(this)
	setting.option.groups = setting.cols
	if(!setting.option.initBy){
		setting.option.initBy = 'simple'	
	}
	var self = this
	var render = function(setting) {
		$("#"+setting.container).addClass("selectbox_container")
		var select = $('<select></select>').appendTo(
				"#" + setting.container)
		return select
	}
	this.init = function() {
		self.selectbox = new render(setting)
		self.addEvent('change', function() {
		})
		self.addEvent('transValueChange',function(){
		})
		self.selectbox.change(function() {
			var key = $(this).val()
			self.fireEvent('change', {
				selected : $(this).val() === "0" ? undefined : $.grep(setting.option.groups, function(n, t) {
					return n.key == key
				})[0],
				current : $.grep(setting.option.groups, function(n, t) {
					return n.checked
				})[0]
			})
			self.fireEvent('transValueChange',$(this).val())
		})
		self[setting.option.initBy]()
	}
	this.simple = function(){
		self.selectbox.empty();
		$.each(setting.option.groups, function(n, i) {
			self.selectbox.append('<option value="' + i.key + '">' + i.title
					+ '</option>');
		})
	}
	this.withlegend = function(){
		var legend = {
			current:$.grep(setting.option.groups, function(n, t) {
				return n.checked
			})[0],
			others:$.grep(setting.option.groups, function(n, t) {
				return !n.checked
			})
		}
		this.flush(legend)
	}
	this.flush = function(legend) {
		$.each(setting.option.groups, function(n, i) {
			i.checked = false
			if (legend.current.key == i.key) {
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