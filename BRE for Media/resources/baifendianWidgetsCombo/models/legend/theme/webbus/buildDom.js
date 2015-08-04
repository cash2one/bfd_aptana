BfdWidget.legend.prototype.buildDom = function(setting) {
    var self = this;
    setting.option.groups = setting.cols
    function buildItem(table) {
        var tr1 = $('<tr></tr>',{
            'class':'label_row'
        }).appendTo(table);
        var tr2 = $('<tr></tr>',{
            'class':'value_row'
        }).appendTo(table);
        var width = table.innerWidth()/setting.option.groups.length
       var spans = $.each(setting.option.groups, function(i,item) {
            var span = $('<td></td>').appendTo(tr1).html(item.title);
            span.width(width)
            var vDomObj = {
                dom: $('<td></td>', {
                    'class': 'l_value',
                    'html': '<span class="loading">加载中...</span>'
                })
            }
            vDomObj.dom.appendTo(tr2)
            if(item.format && BfdWidget.format[item.format]) {
                vDomObj.format = BfdWidget.format[item.format]
            } else {
                vDomObj.format = function(v) {
                    return v
                }
            }
            self.vDoms[item.key] ? self.vDoms[item.key].push(vDomObj) : self.vDoms[item.key] = [vDomObj];
         //   return span.html('<div class="label">'+item.title+'</div>').append(vDomObj.dom);
        });
       
        // $.each(spans.reverse(),function(n,i){
        //     i.prependTo(container)
        // })
    }
    self.dom.append('<table  cellspacing="0" cellpadding="0" border="0"></table>');
    buildItem(self.dom.find('table').addClass('bus_legend'));
    self.items = setting.option.groups;
}