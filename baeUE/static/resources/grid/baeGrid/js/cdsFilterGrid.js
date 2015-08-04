/**
 * @author Administrator
 */
$(function(){
	     var methods = {
	     init : function( opts ) { 
		         var defaults = {}
			     var setting = $.extend(true, {},defaults, opts)
				 $(setting.filter.filterDom).hide()
				 $(setting.filter.listFilterBtn).toggle(function(){
				 	$(setting.filter.filterDom).slideDown()
				 },function(){
				 	$(setting.filter.filterDom).slideUp()
				 })
				 $(setting.filter.cancellistFilterBtn).click(function(){
				 	 $(setting.filter.listFilterBtn).click()
				 })
				 function Filter(){
				        var self=this
					 	 var filterBtn=$(setting.filterBtn)
						 var filterListDom=$('<ul/>')
						 function getCols(){
						 	var result=[]
							filterListDom.find('input:checked').each(function(i){
								result.push($(this).val())
							})
						 }
						 function setCols(array){
						 	filterListDom.find('input').attr('checked',false).each(function(){
								 if(array.include($(this).val())){
								 	$(this).attr('checked',true)
								 }
							})
						 }
						 this.getCols=function(){
								var cols=[]
								cols.push(setting.filter['fixColModel'])
								filterListDom.find('input:checked').each(function(i){
																		$.each(setting.filter['colModel'],$.proxy(function(i,item){
																			if($(this).val()===item['name']){
																				cols.push(item)
																			}
																		},this))
																	})
								return cols
							}
							this.resetOption=function(m){
								if(m==='list'){
									$(setting.filter.filterModeDom).find('a').eq(0).click()
								}else{
									filterListDom.find('input:checkbox').prop("checked", false);
									filterListDom.find('input:checkbox').eq(0).prop("checked", true);
									$(setting.filter.filterModeDom).find('a.now').removeClass('now')
								}
							}
							this.init=function(){
								                                     setting.filter['fixColModel']['sortable']=false
								                                    $(setting.filter.filterModeDom).find('a').each(function(i){
																		$(this).click(function(){
																					if(!$(this).hasClass('now')){
																					 $(setting.filter.filterModeDom).find('a').removeClass('now')
																					 $(this).addClass('now')
																					 if(i===0){
																					 	setCols(setting.filter.defaultCols)
																					 }else if(i===1){
																					 	setCols(setting.filter.orderCols)
																					 }else{
																					 	setCols(setting.filter.goodsCols)
																					 }
																				}
																		})
																	})
														           $.each(setting.filter['colModel'],function(i,item){
																		var li=$('<li/>').appendTo(filterListDom)
																		$('<input/>',{'type':'checkbox','value':item['name']})
																		.attr('checked',setting.filter.defaultCols.include(item['name'])?true:false)
																		.appendTo(li).click(function(){
																				if($(this).is(':checked')&&filterListDom.find('input:checkbox:checked').length===7){
																					alert('最多选择6项指标')
																					return false
																				}else if(filterListDom.find('input:checkbox:checked').length===0){
																					alert('最少保留1个指标')
																					return false
																				}else{
																					$(setting.filter.filterModeDom).find('a').removeClass('now')
																					if(setting.filter.defaultCols.equal(getCols())){
																						$(setting.filter.filterModeDom).find('a:eq(0)').removeClass('now')
																					}else if(setting.filter.orderCols.equal(getCols())){
																						$(setting.filter.filterModeDom).find('a:eq(1)').removeClass('now')
																					}else if((setting.filter.goodsCols.equal(getCols()))){
																						$(setting.filter.filterModeDom).find('a:eq(2)').removeClass('now')
																					}else{
																					}
																				}
																		})
																		$('<label/>',{
																			text:item['colName']
																		}).appendTo(li)
																})
																filterListDom.appendTo(setting.filter.filterListRenderTo)
							}
                            this.init()
				 }
				 function Grid(){
					this.fixColModel=[]
				 	this.reflush=function(){
						var param=$.extend(true,setting.grid, {colModel:filter.getCols()})
						$.baeGrid(param)
					}
					this.init=function(){
						$.baeGrid($.extend(true,setting.grid, {colModel:filter.getCols()}))
					}
					this.init()
				 }
				 var filter=new Filter()
				 var grid=new Grid()
				 $(setting.filter.changeFilterBtn).click(function(){
				 	  grid.reflush()
				 })
				   $('body').data('grid',grid)
	     },
		 reflush:function(){
					$('body').data('grid').reflush()
		 }
  };

  $.cdsFilterGrid = function( method ) {
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.baeToggleFilterGrid' );
    }    
  };
})
Array.prototype.equal=function(array){
	if(this.length!==array.length){
		return false
	}
	for(var i in this){
		if(this[i]!==array[i]){
			return false
		}
	}
	return true
}
Array.prototype.include=function(item){  
    for(var i=0;i<this.length;i++){  
        if(this[i]===item){  
            return true;  
        }  
    }  
    return false;  
}  