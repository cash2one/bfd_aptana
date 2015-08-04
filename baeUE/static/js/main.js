/**
 * @author Administrator
 */
$(function(){
	function request(paras){
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof(returnValue) == "undefined") {
        return "";
    }
    else {
        return returnValue;
    }
};
/**
    $.ajax({
        url: './menu/list.action',
        dataType: "json",
        success: function(data){
            $('.menulist').baeLeftBar({
                linkTarget: 'function',
                nodes: data[0]['children']
            })
        }
    });
    */
	(function(){
		var data=[{"title":"根目录","url":"null","children":[{"title":"访客","url":"1","icon":"./resources/menus/baeLeftBar/images/menulist_ico02.gif","children":[{"title":"访客分布","url":"./function/chart/uv_region.html"},{"title":"设备","url":"./function/chart/device_type.html"},{"title":"移动设备","url":"./function/chart/mobile_type.html"}]},{"title":"流量来源","url":"null","icon":"./resources/menus/baeLeftBar/images/menulist_ico03.gif","children":[{"title":"全部来源","url":"/wbportal/function/chart/ref_all.html"},{"title":"搜索引擎","url":"./function/chart/ref_source.html"}]},{"title":"网站内容","url":"null","icon":"./resources/menus/baeLeftBar/images/menulist_ico04.gif","children":[{"title":"网站页面","url":"1"},{"title":"网站搜索","url":"1"}]},{"title":"商品","url":"null","icon":"./resources/menus/baeLeftBar/images/menulist_ico05.gif","children":[{"title":"商品分析","url":"1"},{"title":"品牌分析","url":"1"},{"title":"品类分析","url":"1"}]},{"title":"订单","url":"null","icon":"./resources/menus/baeLeftBar/images/menulist_ico06.gif","children":[{"title":"购物车分析","url":"1"},{"title":"订单分析","url":"1"},{"title":"重复购买率","url":"1"}]}]}];
		$('.menulist').baeLeftBar({
                linkTarget: 'function',
                nodes: data[0]['children']
            })
	})();
	
	
    var misc = true
    $('.misc').toggle(function(){
        $(this).animate({
            left: '0px'
        }, 'slow')
//        if (/chrome/.test(navigator.userAgent.toLowerCase())) {
            $('.left,.left > div').animate({
                width: '1px'
            }, 'slow')
//        }
//        else {
//            $('.left,.left > div').animate({
//                width: '0px'
//            }, 'slow')
//        }
		$('.zdlist').hide()
        misc = false
    }, function(){
        $(this).animate({
            left: '150px'
        }, 'slow')
        $('.left,.left > div').animate({
            width: '149px'
        }, 'slow')
		$('.zdlist').show()
        misc = true
    })
    $(window).scroll(function(){
        if (misc) {
            $('.misc').css('left', 150 - $(this).scrollLeft() + 'px')
        }
        else {
            $('.misc').css('left', 0 - $(this).scrollLeft() + 'px')
        }
    })
	$.ajax({
        url: './site/listFact.action',
        dataType: "json",
        success: function(data){
			$.each(data,function(i,item){
				if(item.selected){
					$('.zdlist').find('div:first a').text(item.domain).data('id',item.id)
				}else{
					var c=$('<div><a></a></div>')
				    c.find('a').text(item.domain).data('id',item.id)
				    c.appendTo('.others')
				}
			})
        }
    })
	$('.zdlist').click(function(event){
		if($(event.target).parent().parent().is(this)&&$('.zdlist .others').is(':hidden')){
			$('.zdlist .others').slideDown()
		}else if($(event.target).parent().parent().is(this)&&$('.zdlist .others').is(':visible')){
			$('.zdlist .others').slideUp()
		}
	})
	$('.zdlist .others').click(function(event){
		$(event.target).parent().before($('.zdlist').find('div:first'))
		$(event.target).parent().parent().before($(event.target).parent())
		$('.zdlist .others').slideUp()
		var id=$(event.target).data('id')
		$.ajax({
			url : "./site/setSite.action",
			data : {'id':id},
			type : "POST",
			dataType : "JSON",
			success : function(data) {
											// 成功
											if (data.code == "1") {
//												$.cookie('site_id',id,{path:'/'})
												//alert("设置站点成功");
												$('#function').attr('src','./function/chart/synthetical.html?'+(new Date))
											} 
											else{
												alert("设置站点失败请联系管理员！");
											}
										},
										error : function(data) {
											alert("设置站点异常!");
										}
									});
	})
})
