BfdWidget.legend.prototype.buildDom= function (setting) {
	    var self=this
        function buildItem(container) {
            setting.option.groups = setting.cols
//            if (setting.option.groups.length) {
//                setting.option.groups[0].checked = true
//            }
            $.each(setting.option.groups, function(i, item) {
                var width = 100 / setting.option.groups.length
                var d = $('<td></td>')
                d.css('width', width + '%')
                var d1 = $('<div></div>').click(function() {
                    if (!$(this).hasClass('groupnow')) {
                        self.dom.find('.z').find('tr').find('div.groupnow').removeClass('groupnow').addClass('group')
                        var index = $(this).parent().index()
                        self.dom.find('.z').find('tr').find('td:eq(' + index + ') > div').addClass('groupnow')
                        self.currentItem = item
                        self.fireEvent('change', {
                            current: item,
                            others: $.grep(setting.option.groups, function(n, t) {
                                return n.key != item.key
                            })
                        })
                        // self.change()
                    }
                })
                if (item.checked) { // 初始化
                    self.currentItem = item
                    d1.addClass('groupnow')
                } else {
                    d1.addClass('group')
                }
                var title = $('<div></div>', {
                    'class': 'tittle',
                    html: '<div class="txt">' + item.title + '</div><a class="ico" href="#"></a>'
                })
                title.find('a').qtip({
                    content: item.desc,
                    style: {
                        name: 'blue'
                    },
                    position: {
                        corner: {
                            target: 'topMiddle',
                            tooltip: i == 0 ? 'leftBottom' : ((i == setting.option.groups.length - 1) ? 'rightBottom' : 'bottomMiddle')
                        }
                    },
                    style: {
                        // width: 150,
                        background: '#F0F5F9',
                        color: '#999999',
                        border: {
                            color: '#267BB6'
                        }
                    }
                })
                var vDomObj = {
                    dom:$('<div></div>', {
                        'class': 'value',
                        'html': '<div class="loading">加载中...</div>'
                    })
                }
                if(item.format&&BfdWidget.format[item.format]){
                    vDomObj.format = BfdWidget.format[item.format]
                }else{
                    vDomObj.format = function(v){
                        return v
                    }
                }
                self.vDoms[item.key] ? self.vDoms[item.key].push(vDomObj) : self.vDoms[item.key] = [vDomObj]
                if (i === setting.option.groups.length - 1) {
                    d1.css('background-image', 'none')
                }
                d1.append(title).append(vDomObj.dom).appendTo(d)
                d.appendTo(container)
            })
        }
        self.i1 = $('<table cellspacing="0" cellpadding="0" border="0" class="data01">' + '<tbody><tr>' + '<td class="l">' + '</td>' + '<td class="z">' + '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr>' + '</tr></tbody></table>' + ' </td>' + '<td class="r">' + '</td>' + '</tr>' + '</tbody></table>')
        self.i2 = self.i1.clone().addClass('data01_01').hide()
        buildItem(self.i1.find('.z tr'))
        buildItem(self.i2.find('.z tr'))

        self.i1.appendTo(self.dom)
        self.i2.appendTo(self.dom)
		
		self.items = setting.option.groups
    }