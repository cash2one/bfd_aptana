$(function(){
    function MadeList(dateRange){
        $.template('t1', '<tr>' +
        '<td rowspan="2">' +
        '2013-5-3' +
        '</td>' +
        '<td>' +
        '商品推荐栏' +
        '</td>' +
        '<td>1212</td>' +
        '<td>1212</td>' +
        '<td>1212</td>' +
        '<td>1212</td>' +
        '<td rowspan="2">1212</td>	' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '电商频道' +
        '</td>' +
        '<td>1212</td>' +
        '<td>1212</td>' +
        '<td>1212</td>' +
        '<td>1212</td>' +
        '</tr>')
        var setting = {
            container: 'table.grid tbody',
            rowList: 10,
            getData: function(){
                return {
                    start: dateRange.getStart(),//setting.global.dateRange.getStart(),
                    end: dateRange.getEnd()
                }
            },
            Model: function(i, item){
                var self = this
                self.dom = $.tmpl('t1', item)
                //							            i % 2 == 0 ? null : self.dom.addClass('color')
                //										self.dom.data('item',item)
            },
            testData: {
                "stores": [{}, {}, {}, {}],
                "totalItem": 50
            },
            page: {
                container: '#grid > ul'
            }
        }
        var list = new List(setting)
		dateRange.addEventListener(function(){
			list.reset()
		})
    }
    
})
