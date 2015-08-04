BfdWidget.legend.prototype.buildDom = function(setting) {
    var self = this;

    function buildItem(container) {
        setting.option.groups = setting.cols
        var width = 100 / setting.option.groups.length;
        var tr_label = $('<tr></tr>').appendTo(container);
        var tr_value = $('<tr></tr>').appendTo(container);
        $.each(setting.option.groups, function(i, item) {
            var h = $('<th></th>');
            var d = $('<td></td>');
            var group = h.add(d)
            group.css('width', width + '%')
            var vDomObj = {
                dom: $('<div></div>', {
                    'class': 'value',
                    'html': '<div class="loading">加载中...</div>'
                })
            }
            if(item.format && BfdWidget.format[item.format]) {
                vDomObj.format = BfdWidget.format[item.format]
            } else {
                vDomObj.format = function(v) {
                    return v
                }
            }
            self.vDoms[item.key] ? self.vDoms[item.key].push(vDomObj) : self.vDoms[item.key] = [vDomObj];
            h.append($('<div></div>',{
                'html': item.title
            })).appendTo(tr_label)
            d.append(vDomObj.dom).append($('<div></div>', {
                'class': 'desc'
            })).appendTo(tr_value)
        })
        tr_label.children('th').last().addClass('brn')
        tr_value.children('td').last().addClass('brn')
    }
    self.dom.append($('<table class="legend" cellspacing="0" cellpadding="0" border="0"></table>'))
    buildItem(self.dom.find('table'));
    self.items = setting.option.groups;

}