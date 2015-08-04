$.fn.baeLeftBar=function(opts){
	var defaults = {'visable':true,linkTarget:'_blank'}  
    var setting = $.extend({}, defaults, opts)  
	
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
			}else{
				appendDom(item['children'],item['visable']).appendTo(c)
			}
			dom.append(c)
		})
		return dom
	}
	
	var dom=appendDom(setting['nodes'],setting['visable'])
	dom.addClass('baeLeftBar')
	$(this).append(dom)
	
	$(this).find('span').click(function(){
		var dom=$(this).parent().children('ul')
		if(dom&&(!dom.is(':visible'))){
			dom.slideDown()
		    $(this).parent().parent().children("li").children('span').not(this).parent().children('ul').slideUp()
		}else{
			dom.slideUp()
		}
	})
	return $(this)
}
