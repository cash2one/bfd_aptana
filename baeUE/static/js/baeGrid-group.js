/**
 * @discription BaeGrid 分组插件
 * 
 * 填加到beforeFillRow中
 */

function beaGridGroup(opt){
	$.extend(opt.data[opt.groupCol]['attr'],{'rowspan':'all'})
	$.each(opt.data.transacts,function(i,item){
		item.transactName?item[opt.groupCol]=item.transactName:null
	})
	var dom=opt.loader.staticLoad(opt.data.transacts,{
		seq: false
	})
	 opt.dom.after(dom)
}
