$.fn.baeLeftBar=function(opts){
	var defaults = {'visable':true,linkTarget:'_blank',animate:true}  
    var setting = $.extend({}, defaults, opts)  
	var c_dom=$(this)
	
	function appendDom(nodes,visable){
		var dom=$('<ul></ul>')
		if(!visable){
			dom.hide()
		}
		$.each(nodes,function(i,item){
			var c=$('<li><span></span></li>')
			c.find('span').html(item['title'])
			if(item.icon){
				c.find('span').before($("<img/>",{
					src:item.icon
				}))
			}
			if(!item['children']){
				c.find('span').wrapInner('<a target="'+setting.linkTarget+'" href="'+item['url']+'"></a>')
				c.find('span').find('a').click(function(){
					  c_dom.find('a.now').add('.menulist > .ml01 > span > a').removeClass('now')
					  $(this).addClass('now')
					})
			}else{
				c.find('span').addClass('p_span')
				appendDom(item['children'],item['visable']?item['visable']:true).appendTo(c)
			}
			dom.append(c)
		})
		return dom
	}
	
	var dom=appendDom(setting['nodes'],setting['visable'])
	dom.addClass('baeLeftBar')
	$(this).append(dom)
	if(setting.animate){
		$(this).find('span').click(function(){
			var dom=$(this).parent().children('ul')
			if(dom&&(!dom.is(':visible'))){
				dom.slideDown()
				$(this).parent().parent().children("li").children('span').not(this).parent().children('ul').slideUp()
			}else{
				dom.slideUp()
			}
		})
	}
	return $(this)
}
