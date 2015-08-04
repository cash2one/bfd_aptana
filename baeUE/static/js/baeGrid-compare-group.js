/**
 * @discription BaeGrid 比较分组插件
 * 
 * 填加到beforeFillRow中
 */
function beaGridCompareGroup(opt){
//	$.extend(opt.data[opt.groupCol]['attr'],{'rowspan':'all'})
    if(!opt.param.groupable){
		return;
	}
	var array=[]
	opt.data[opt.param.groupCol]={'content':opt.data[opt.param.groupCol],attr:{'colspan':'all'}}
	$.each(opt.param.transacts,function(i,item){
		opt.data[item.name][opt.param.groupCol]=item.colName
//		opt.data[item.name][opt.param.groupCol]={'content':opt.data[item.name][opt.param.groupCol],attr:{'rowspan':'all'}}
//		$.extend(opt.data[item.name][opt.param.groupCol],{'rowspan':'all'})
//		alert(opt.data[item.name])
		array.push(opt.data[item.name])
	})
	var dom=opt.loader.staticLoad(array,{
	        	seq: false,
				groupable:false
	    })
//		alert(dom.length)
//		alert(opt.dom.html())
       opt.finalQueue.push(function(){
    		 opt.dom.after(dom)
//			 dom.appendTo('#table1')
//             alert(opt.dom.parent().html())
//              dom.appendTo(opt.dom.parent())
//			 alert(opt.dom.html())
//			 alert(dom.eq(0).html())
	   })
}
