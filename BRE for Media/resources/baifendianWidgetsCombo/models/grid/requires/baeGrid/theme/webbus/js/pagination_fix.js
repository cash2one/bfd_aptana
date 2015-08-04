BfdWidget.grid.prototype.onDataLoad = function(data,setting){
	if(setting.hasPager){
		var total = data.totalItem;
		var count = data.stores.length;
		var pagination = setting.page.renderTo;
		if(total){
			pagination.find("#total").html('总条目数：<em>'+total+'</em>');
		}
		if(!pagination.children('.entry').size()){
			pagination.prepend('<div class="entry"><span id="total" class="mr25"></span><span id="count"></span></div>');
		}
		if(total!==undefined){
			pagination.find("#total").html('总条目数：<em>'+total+'</em>');
		}
		pagination.find("#count").html('查询条目数：<em>'+count+'</em>');
	}
//	if(data.stores&&data.stores.length<5){
//		setting.renderTo.height(248);
//	}else{
//		setting.renderTo.css({
//			height:"auto"
//		});
//	}
};