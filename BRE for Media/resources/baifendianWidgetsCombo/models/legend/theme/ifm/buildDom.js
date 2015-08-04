BfdWidget.legend.prototype.buildDom = function(setting){
    var self = this;
    function buildItem(container){
        setting.option.groups = setting.cols
        var width = 100 / setting.option.groups.length
        $.each(setting.option.groups, function(i, item){
            var d = $('<li><div class="item"><a><div class="line"><em></em></div></a><span class="li-top">&nbsp;</span></div></li>')
            d.find('em').qtip({
                content: item.desc,
                style: {
                    name: 'blue'
                },
                position: {
                    corner: {
                        target: 'topMiddle',
                        tooltip: 'bottomMiddle'
                    }
                },
                style:  {
		                        background: '#eefcff',
		                        color: '#000',
								'font-size': '12px',
		                        border: {
		                            color: '#d2eaea'
		                        },
			                    tip:{
			                      corner:'bottomMiddle',
								  color:'#d2eaea',
								  size:{
								  	x:10,
									y:4
								  }
			                    }
		                    }
            })
            d.css('width', width + '%').click(function(){
				if(!$(this).hasClass('current')){
					self.currentItem = item
                        self.fireEvent('change', {
                            current: item,
                            others: $.grep(setting.option.groups, function(n, t) {
                                return n.key != item.key
                            })
                        })
						$(this).parent().find('.current').removeClass('current')
						$(this).addClass('current')
				}
			})
            if (item.checked) {
                d.addClass('current')
                self.currentItem = item
            }
            var vDomObj = {
                dom: $('<span></span>', {
                    'class': 'n',
                    'html': '<div class="loading">加载中...</div>'
                })
            }
            if (item.format && BfdWidget.format[item.format]) {
                vDomObj.format = BfdWidget.format[item.format]
            }
            else {
                vDomObj.format = function(v){
                    return v
                }
            }
            self.vDoms[item.key] ? self.vDoms[item.key].push(vDomObj) : self.vDoms[item.key] = [vDomObj]
            
            var titleDom=$('<span></span>', {
                'class': 'text',
                'html': item.title
            })
            d.find('a').append(vDomObj.dom).find('div.line').prepend(titleDom)
            d.appendTo(container)
			  
        })
    }
	self.dom.append($('<ul class="statistics"></ul>'))
    buildItem(self.dom.find('ul'))
    self.items = setting.option.groups
}
