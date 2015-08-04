/**
 * @author Administrator
 */
var Grid = (function(){

    return function(setting){
        var self = this
        self.init = function(){
            var colModel = [{
                "colName": "网站",
                "name": "s1",
                "sortable": true
            }, {
                "colName": "类型",
                "name": "s2",
                "sortable": true
            }, {
                "colName": "描述",
                "name": "s3",
                "sortable": false
            }]
            if (setting.expand && setting.expand.colModel) {
                //		  	model.onRander
                colModel.push(setting.expand && setting.expand.colModel)
            }
			var param=$.extend(true,{colModel:colModel},setting.grid)
			$.baeGrid(param)
        }
		self.init()
    }
})();
