/**
 * @author Administrator
 */
$(function(){
	$.extend({
		baeFilterGrid:function(opts){
			var defaults = {}
			var setting = $.extend(true, defaults, opts)
			var filterListDom=$('<ul/>')
			var filterButtonDom=$('<p/>')
			var showCol=[]
			$.each(setting['colModel'],function(i,item){
				if(!item['fixed']){
					var li=$('<li/>').appendTo(filterListDom)
					$('<input/>',{'type':'checkbox','value':item['name']})
					.attr('checked',item['checked']?true:false)
					.appendTo(li)
					$('<label/>',{
						text:item['colName']
					}).appendTo(li)
				}
			})
			$('<button/>',{text:'确定'}).click(function(){
				var colModel=[]
				$.each(setting['colModel'],function(i,item){
					if(item['fixed']){
						colModel.push(item)
					}
				})
				filterListDom.find('input:checked').each(function(i){
					$.each(setting['colModel'],$.proxy(function(i,item){
						if($(this).val()===item['name']){
							colModel.push(item)
						}
					},this))
				})
//				alert(filterListDom.find('input:checked').length)
				$(setting['gridRendTo']).baeGrid($.extend({},setting, {colModel:colModel}))
			}).appendTo(filterButtonDom).click()
			$(setting['filterRenderTo']).append(filterListDom).append(filterButtonDom)
		}
	})
})
