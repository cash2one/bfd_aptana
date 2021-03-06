BfdWidget.legend = function(setting, global) {
    Widget.call(this)
    var self = this
    self.vDoms = {},self.dom = $('#' + setting.container),self.i1=$(),self.i2=$()
    self._expParam = {}

    function getDate(d1, d2, index) {
        var param = {
            type: setting.type,
            cols: $.map(setting.option.groups, function(i) {
                return i.key
            }),
            start: d1,
            end: d2,
            keys: [],
			values: []
        }
		 if(setting.id){
		 	param['requestId']= setting.id.split("_")[0]
		 }
        if(setting.dataParam){
        	$.each(setting.dataParam,function(k,v){
				param.keys.push(k)
				param.values.push(v)
			})
        }
        if(!$.isEmptyObject(self._expParam)){
            param.fact_keys = []
            param.fact_values = []
            $.each(self._expParam,function(k,v){
                param.fact_keys.push(k)
                param.fact_values.push(v)
            })
        }
        $.ajax({
            url:setting.url|| _baifendianDataURL,
            dataType: "json",
            data: param
        }).done(function(data) {
            for (var i in self.vDoms) {
                self.vDoms[i][index].dom.html(self.vDoms[i][index].format(data.stores[0][i]))
            }
        }).fail(function(){
        	for (var i in self.vDoms) {
                self.vDoms[i][index].dom.html('<div class="loading">加载异常</div>')
            }
        })
    }
    self.setExpParam = function(obj){
        self._expParam = obj;
        self.flush();
    }
    self.flush = function() {
        for (var i in self.vDoms) {
            $(self.vDoms[i][0], self.vDoms[i][1]).html('<div class="loading">加载中...</div>')
        }
        getDate(global.dateRange.getStart(), global.dateRange.getEnd(), 0)
        if (global.dateRange.mode != 'single') {
            getDate(global.dateRange.getDbStart(), global.dateRange.getDbEnd(), 1)
            self.i2.show()
        } else {
            self.i2.hide()
        }
    }
    self.init = function() {
		if (!setting.option) {
				setting.option = {}
	   }
        self.addEvent('change', function() {})
        self.buildDom(setting)
        global.dateRange.addEventListener(function() {
            self.flush()
        })
        self.flush()
    }
    self.init()
}