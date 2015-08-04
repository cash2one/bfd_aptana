BfdWidget.legend.prototype.buildDom = function(setting) {
    var self = this;
    setting.option.groups = setting.cols
    function buildItem(container) {
       var spans = $.map(setting.option.groups, function(item,i) {
            var span = $('<span class="txt"></span>')
            var vDomObj = {
                dom: $('<em></em>', {
                    'class': 'red',
                    'html': '<span class="loading">加载中...</span>'
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
            return span.html(item.title+'：').append(vDomObj.dom);
        });
        $.each(spans.reverse(),function(n,i){
            i.prependTo(container)
        })
    }
    buildItem(self.dom);
    self.items = setting.option.groups;
}