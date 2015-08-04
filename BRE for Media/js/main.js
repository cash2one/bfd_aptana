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
}
    $.ajax({
//        url: './menu/list.action',
         url:'./list.json',
        dataType: "json",
        success: function(data){
            $('.menulist').baeLeftBar({
                linkTarget: 'function',
                nodes: data[0]['children'],
                animate:false
            })
        }
    })
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
//        url: './site/listFact.action',
         url:'./listFact.json',
        dataType: "json",
        cache:false,
        success: function(data){
//			var id=request('siteId')
//			if(!id){
//				id=data[0]['id']
//				$.cookie('site_id',data[0]['id'],{path:'/'})
//			}
			$.each(data,function(i,item){
				var d=item.domain.replace('http://www.','').replace('http://','')
				if(d.length>20){
					d=d.substring(0,17)+'...'
				}
				if(item.selected){
					$('.zdlist').find('div:first a').text(d).data('id',item.id)
				}else{
					var c=$('<div><a></a></div>')
				    c.find('a').text(d).data('id',item.id)
				    c.appendTo('.others')
				}
			})
        }
    })
    $('.menulist > .ml01 > span > a').click(function(){
    	if(!$(this).hasClass('now')){
    		$('.baeLeftBar').find('a.now').removeClass('now')
    		$(this).addClass('now')
    	}
    })
	$('.zdlist').hover(function(){
		$(this).data('status','in')
		setTimeout($.proxy(function(){
				if($(this).data('status')=='in'){
					$(this).find('.others').slideDown('fast')
				}
			},this),400)
	},function(){
	    $(this).data('status','out')
	    setTimeout($.proxy(function(){
				if($(this).data('status')=='out'){
					$(this).find('.others').slideUp('fast')
				}
			},this),200)
	})
	$('.zdlist .others').click(function(event){
		$(event.target).parent().before($('.zdlist').find('div:first'))
		$(event.target).parent().parent().before($(event.target).parent())
		$('.zdlist .others').slideUp('fast')
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
												$('#function').attr('src','./function/charts/synthetical.html?'+(new Date))
										        
												$('.baeLeftBar').find('a.now').removeClass('now')
												 $('.menulist > .ml01 > span > a').addClass('now')
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
	//退出
	$('.menu > a:last').click(function(){
		 $.cookie('bae_date_range_begin', null, {
             path: '/'
         })
         $.cookie('bae_date_range_end', null, {
             path: '/'
         })
	})
})
/*
$(function(){
	$('body').ajaxSuccess(function(e, xhr, settings){
		var content=xhr.responseText
		if(content.indexOf('</body>')>0&&content.indexOf('</html>')>0){
			window.location.href="http://passport.baifendian.com/bbgweb/login.jsp"
		}
	})
	$('body').ajaxError(function(){
		window.location.href="http://passport.baifendian.com/bbgweb/login.jsp"
	})
});
*/