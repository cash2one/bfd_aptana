BfdWidget.legend = function(setting, global) {
    Widget.call(this)
    var self = this
    self.vDoms = {}
    var dom = $('#' + setting.container),
        i1, i2

    function buildDom() {
        function buildItem(container) {
            setting.option.groups = setting.cols
//            if (setting.option.groups.length) {
//                setting.option.groups[0].checked = true
//            }
            $.each(setting.option.groups, function(i, item) {
                var width = 100 / setting.option.groups.length
                var d = $('<td></td>')
                d.css('width', width + '%')
                var d1 = $('<div></div>').click(

                function() {
                    if (!$(this).hasClass('groupnow')) {
                        $(dom).find('.z').find('tr').find('div.groupnow').removeClass('groupnow').addClass('group')
                        var index = $(this).parent().index()
                        $(dom).find('.z').find('tr').find('td:eq(' + index + ') > div').addClass('groupnow')
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
                        'text': 'loading...'
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
        i1 = $('<table cellspacing="0" cellpadding="0" border="0" class="data01">' + '<tbody><tr>' + '<td class="l">' + '</td>' + '<td class="z">' + '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr>' + '</tr></tbody></table>' + ' </td>' + '<td class="r">' + '</td>' + '</tr>' + '</tbody></table>')
        self.items = setting.option.groups
        i2 = i1.clone().addClass('data01_01').hide()
        buildItem(i1.find('.z tr'))
        buildItem(i2.find('.z tr'))

        i1.appendTo($(dom))
        i2.appendTo($(dom))
    }

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
        $.ajax({
            url:setting.url|| _baifendianDataURL,
            dataType: "json",
            data: param
        }).done(function(data) {
            for (var i in self.vDoms) {
                self.vDoms[i][index].dom.html(self.vDoms[i][index].format(data.stores[0][i]))
            }
        })
    }
    self.flush = function() {
        for (var i in self.vDoms) {
            $(self.vDoms[i][0], self.vDoms[i][1]).html('loading...')
        }
        getDate(global.dateRange.getStart(), global.dateRange.getEnd(), 0)
        if (global.dateRange.mode != 'single') {
            getDate(global.dateRange.getDbStart(), global.dateRange.getDbEnd(), 1)
            i2.show()
        } else {
            i2.hide()
        }
    }
    self.init = function() {
		if (!setting.option) {
				setting.option = {}
	   }
        self.addEvent('change', function() {})
        buildDom()
        global.dateRange.addEventListener(function() {
            self.flush()
        })
        self.flush()
    }
    self.init()
}