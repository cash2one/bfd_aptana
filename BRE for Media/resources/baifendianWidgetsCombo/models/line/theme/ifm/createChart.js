BfdWidget.line.prototype.creatChart = function(option){
	var self=this
	var formats = {}
	$.each(self.setting.cols, function(m, j) {
		option.yAxis[m] = {
			title: {
				text: null//.split("").join("<br/>"),
				// rotation:0
			},
			min:0
		}
		
		if($.inArray(j.format,['rate','rate1'])==-1){
			option.yAxis[m].minTickInterval = 1
		}
		if(m % 2) {
			option.yAxis[m].opposite = true
		}
		var allZero = true
		$.each(option.series, function(n, i) {
			if(i.yAxisId == j.key) {
				if(j.type) {
					i.type = j.type
				}
				//i.yAxis = m
			}
			$.each(i.data,function(l,k){
				if(k.y>0){
					allZero = false;
				}
			})
		})
		if(j.format && BfdWidget.format[j.format]) {
			option.yAxis[m].labels = {
				formatter: function() {
					return BfdWidget.format[j.format](this.value)
				}
			}
			if(allZero){
				option.yAxis[m].min = 0
			//	option.yAxis[m].minPadding = 0
				if($.inArray(j.format,['rate','rate1'])==-1){
					option.yAxis[m].minTickInterval = 1
					option.yAxis[m].minRange = 4
					option.yAxis[m].max = 100
				}else{
					option.yAxis[m].max = 1
				}
			}
		}
		formats[j.title] = (j.format && BfdWidget.format[j.format]) ? BfdWidget.format[j.format] : function(v) {
			return v;
		}
		if(self.setting.rule.yAxis){
			$.extend(true,option.yAxis[m],self.setting.rule.yAxis)
		}
	})
	$.each(option.xAxis, function(m, j) {
		var step = 1
		var l = j.categories.length
		if(l > self.x_maxrange) {
			while(Math.floor(l / step) + (l % step) > self.x_maxrange) {
				step++;
			}
		}
		j.labels = {
			step: step
		}
		if(m % 2) {
			j.opposite = true
		}
		$.each(option.series, function(n, i) {
			if(i.xAxisId == j.id) {
				i.xAxis = m
				$.each(i.data, function(l, k) {
					k.name = self.setting.rule.hourformat?(new RegExp("^"+db_flag).test(j.id)?global.dateRange.getDbStart()+"至"+global.dateRange.getDbEnd():global.dateRange.getStart()+"至"+global.dateRange.getEnd())+' '+j['categories'][l]:j['categories'][l]
				})
				if(self.colors[m]){
					i.color=self.colors[m][n]
				}
			}
		})
		if(self.setting.rule.xAxis){
			$.extend(true,option.xAxis[m],self.setting.rule.xAxis)
		}
	})
	option.tooltip = {
		formatter: function() {
			return this.point.name + '<br/>' + this.series.name + ':' + formats[this.series.name](this.y)
		}
	}
	if(self.setting.rule.legend){
		$.extend(true,option.legend,self.setting.rule.legend)
	}
	if(self.chart) {
		self.chart.destroy();
	}
//	option.series[0].color="#7dd5ed"
	option.plotOptions={
			series:{
				events:{legendItemClick:$.noopFalse}
			}
	}
	self.chart = new Highcharts.Chart(option);
}