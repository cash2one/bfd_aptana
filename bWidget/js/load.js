/**
 * @author Administrator
 */
(function(){
    var _path = document.scripts;
    _path = _path[_path.length - 1].src.substring(0, _path[_path.length - 1].src.lastIndexOf("/") + 1);
    if ((_path.indexOf('http') != 0 && _path.indexOf('/') != 0) || _path.indexOf('./') == 0) {
        _path = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1) + _path
    }
    window.BaifendianWidgets = function(param){
        var self = this, widgets = []
        self.widgets = {}
        self.init = function(){
			var commonLoads=[_path+'config.js',_path+'Widget.js']
			typeof(jQuery) == 'undefined' ?commonLoads.unshift (_path + 'commons/jquery.js'):null
			$LAB.script(commonLoads).wait(_jqLoad)
            function _jqLoad(){
                if (param instanceof Object) {
                    $.each(param, function(k, v){
                        self[k] = v
                    })
                }
                else {
                    param = {
                        pageId: param
                    }
                }
                _getSetting().done(function(data){
                    $.each(data, function(i, item){
							var $l = $LAB.sandbox()
							var requires = _baifendianWidgets[item.type]['requires']//.slice(0);
							requires.push('models/' + item.type + '/parse.js')
							if(_baifendianWidgets[item.type]['css']){
								$.each(_baifendianWidgets[item.type]['css'],function(a,b){
									var link = document.createElement("link");
									link.setAttribute("rel","stylesheet");
									link.setAttribute("type","text/css");
									link.setAttribute("href",_path + b);
									document.getElementsByTagName("head")[0].appendChild(link);
								})
							}
							$.each(requires, function(a, b) {
								$l = $l.script(_path + b).wait()
							})
							$l.wait(function(){
								 var widget = new BfdWidget[item.type](item)
		                        self.widgets[item.id] = widget
		                        if (item.events) {
		                            $.each(item.events, function(i, item){
		                                widget[item.name](function(){
		                                    self.widgets[item.target][item.action].apply(self.widgets[item.target], arguments)
		                                })
		                            })
		                        }
							})
                    })
                })
            }
        }
        self.getWidgetById = function(id){
            return self.widgets[id]
        }
        self.getSetting = function(){
            return $.ajax({
                url: _baifendianWidgetsComboSettingURL,
                data: {
                    pageID: self.pageId
                },
                dataType: 'json'
            })
        }
    }
    
})();
