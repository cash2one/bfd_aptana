BfdWidget.tabbar = function(setting){
	Widget.call(this)
	var self = this	
	var render = function(setting) {
		var itemsarray = {items:[]}
		$("#"+ setting.container).addClass("tabmenu").append("<span>类型：</span>")
		$.each(setting.items,function(n,i){
			var item = $('<a>'+i.title+'</a>').appendTo(
				"#" + setting.container)
			if(n==setting.current){
				item.addClass("now")
				document.title = i.title
			}else{
				item.attr("href",i.url)
				item.attr("target",i.target)
				if(i.param&&!$.isEmptyObject(i.param)){
					item.attr("href",item.attr("href")+"?"+$.param(i.param,true))
				}
			}
			itemsarray.items.push(item)
		})
		return itemsarray
	}
	this.init = function(){
		self.tabbar = new render(setting)
	}
	this.init()
}