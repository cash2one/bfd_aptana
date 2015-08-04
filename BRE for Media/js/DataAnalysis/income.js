function MadeList(dateRange){
        $.template('t1', '<tr>' +
        '<td rowspan="2">' +
        '${state_date}' +
        '</td>' +
        '<td>' +
        '商品推荐栏' +
        '</td>' +
        '<td>${goods_uv}</td>' +
        '<td>${goods_click_uv}</td>' +
        '<td>${goods_click_cnt}</td>' +
        '<td>${goods_income}</td>' +
        '<td rowspan="2">${total_income}</td>	' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        '电商频道' +
        '</td>' +
        '<td>${waterfall_uv}</td>' +
        '<td>${waterfall_click_uv}</td>' +
        '<td>${waterfall_click_cnt}</td>' +
        '<td>${waterfall_income}</td>' +
        '</tr>')
        var setting = {
            container: 'table.grid tbody',
            rowList: 10,
            url:'../../DataAnalysis/stat/!promo.action?__='+(+new Date),
            fixPageParam:function(param,p){
            	param.limit=param.pos
            	delete param.pos
            },
            getData: function(){
                return {
                    start: dateRange.getStart(),//setting.global.dateRange.getStart(),
                    end: dateRange.getEnd()
                }
            },
            Model: function(i, item){
                var self = this
                
                item.goods_uv=window.BfdWidget.format.int(item.goods_uv)
                item.goods_click_uv=window.BfdWidget.format.int(item.goods_click_uv)
                item.goods_click_cnt=window.BfdWidget.format.int(item.goods_click_cnt)
                
                item.goods_income=window.BfdWidget.format.money(item.goods_income)
                item.total_income=window.BfdWidget.format.money(item.total_income)
                
                item.waterfall_uv=window.BfdWidget.format.int(item.waterfall_uv)
                item.waterfall_click_uv=window.BfdWidget.format.int(item.waterfall_click_uv)
                item.waterfall_click_cnt=window.BfdWidget.format.int(item.waterfall_click_cnt)
                
                item.waterfall_income=window.BfdWidget.format.money(item.waterfall_income)
                
                self.dom = $.tmpl('t1', item)
                //							            i % 2 == 0 ? null : self.dom.addClass('color')
                //										self.dom.data('item',item)
            },
//            testData: {
//                "stores": [{}, {}, {}, {}],
//                "totalItem": 50
//            },
            page: {
                container: '#grid > ul'
            }
        }
        var list = new List(setting)
		dateRange.addEventListener(function(){
			list.reset()
		})
}