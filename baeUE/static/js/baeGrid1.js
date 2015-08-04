/**
 * @author Administrator
 */
(function($){
	$.ajaxSettings.traditional = true
    $.fn.extend({
        baeGrid: function(opts, callback){
            var defaults = {'seq':true,
			                        pager:{
										          currentItem:1,
												  rowList:[20,30,50]
									         }
									}  
            var setting = $.extend(true, defaults, opts)   
			if (setting['seq']){
				setting['colModel'].unshift({colName:'序号',name:'grid_seq',sortable:false})
			}
			if(setting.fixColModel){
				$.each(setting.fixColModel,function(i,item){
					setting['colModel'].push(item)
				})
			}
			
			var dom=$('<table></table>')
			
			var s={//全局信号灯
				colIndex:[],//列序列
				currentIndex:1,//当前项
				total:null,
				sort:null,
				sortModel:null
			}
			
			function Title(){
				this.dom=$('<tr></tr>')
				$.each(setting['colModel'],$.proxy(function(i,item){
					var th=$('<th></th>')
					item['attr']?th.attr(item['attr']):null
					th.html(item.colName).appendTo(this.dom).data('id',item.name)
				    s.colIndex.push(item.name)
//					item.sortable=item.sortable||true
					if(item.sortable!=false){
								th.toggle(function(){
								s.sort=item.name
								s.sortModel='desc'
								s.currentIndex=1 
								loader.qAjaxLoad({deep:0})
							},function(){
								s.sort=item.name
								s.sortModel='asc'
								s.currentIndex=1 
								loader.qAjaxLoad({deep:0})
							})
					}
				},this))
			}
		   
		   function Load(){
		   	     this.qAjaxLoad=function(opts){
				 	this.ajaxLoad(opts,function(c){
						title.dom.nextAll().remove()
						title.dom.after(c.dom)
						c.afterFillEvent()
						 pager.flushVal()
					})
				 }
				 this.staticLoad=function(stores,opts){
				 	var c=new Content(stores,opts)
					c.load()
					return c.dom
				 }
		   	     this.ajaxLoad=function(opts,fun){
				 	this.__ajaxTools(function(stores){
						var c=new Content(stores,opts)
						c.load()
						fun(c)
					},opts)
				 }
				 this.__ajaxTools=function(fun,opts){
				 				   	       var param =$.extend(true,{},setting,{
							   	           data: {
										   	'pager.currentItem': s.currentIndex,
										   	'pager.rowList': pager.rowListSelect.val(),
										   	'cols': s.colIndex
										   }
									    }, opts)
										if(s.sort){
											param.data['sort']=s.sort
											param.data['sortModel']=s.sortModel
										}
										delete param.page
										   $.ajax({
													   type: "GET",
													   url: param.url,
													   data:  param.data,
													   dataType: "json",
													   success: function(data){
						                                if(data.totalItem){
														   s.total=parseInt(data.totalItem)
														}
														pager.pageDom.data('currentStoresLenght',data.stores.length)
													   	  fun(data.stores)
													   }
													});
				 }
		   }
		   
		 function Content(rows,opts){
		 	this.finalQueue=[]
		 	var param =$.extend(true,{},setting)
			$.extend(true,param,opts)
		   	   this.dom=$()
		   		this.createStruct=function(){
					        var cols;
							if(setting.fixColModel&&param.deep!=0){
								cols=s.colIndex.slice(0,s.colIndex.length-setting.fixColModel.length)
							}else{
								cols=s.colIndex
							}
				 	        $.each(rows,$.proxy(function(i,row){
									var tr=$('<tr></tr>')
									$.each(cols,function(j,colName){
										var td=$('<td></td>')
										td.appendTo(tr)
										if(param['seq']&&colName=='grid_seq'){
												td.html(s.currentIndex+i)
										  }
									})
							    	this.dom.last().after(tr)
									this.dom=this.dom.add(tr)
								},this))
				}
				this.loadData=function(){
					var trs=this.dom
					var removeDom=$()
					    $.each(rows,$.proxy(function(i,row){
							     if(setting.fixColModel){
								 	  $.each(setting.fixColModel,function(j,item){
											item.beforeFillRow({ 'title':title,
																									'pager':pager,
																									'loader':loader,
																									'data':row,
																									'param':param,
//																									'itemName':colName,
																									'dom':trs.eq(i),
																									'finalQueue':this.finalQueue,
																									'position':{'x':i}
																									})
										})
								 }
                                 //填充行前的插件					    
								   if(setting['beforeFillRow']){
												  	for(var f in setting['beforeFillRow']){
															 param['beforeFillRow'][f]({ 'title':title,
																									'pager':pager,
																									'loader':loader,
																									'data':row,
																									'param':param,
//																									'itemName':colName,
																									'dom':trs.eq(i),
																									'finalQueue':this.finalQueue,
																									'position':{'x':i}
																									})		 
														 }
												  }
							     $.each(s.colIndex,$.proxy(function(j,colName){
								  	      var td=trs.eq(i).find('td').eq(j);
										  //填充列前的插件
										  if(setting['beforeFillCol']){
												  	for(var f in setting['beforeFillCol']){
															setting['beforeFillCol'][f]({ 'title':title,
																									'pager':pager,
																									'loader':loader,
																									'data':row,
																									'setting':param,
																									'itemName':colName,
																									'dom':td,
																									'finalQueue':this.finalQueue,
																									'position':{'x':i,'y':j}
																									})
														 }
												  }
										  if(row[colName]){
										  	    if($.isPlainObject(row[colName])){
													if(row[colName]['type']&&row[colName]['type']!='text'){
														$.baeGridTypes[row[colName]['type']](row[colName],td,this.finalQueue)//内容类型
													}else{
													     td.html(row[colName]['content'])
													}
													//rowspan,colspan
													if (row[colName]['attr']) {
														   if (row[colName]['attr']['colspan']||row[colName]['attr']['rowspan']) {
															   row[colName]['attr']['rowspan'] == 'all' ? (row[colName]['attr']['rowspan'] = (this.dom.length -i) ): null
                                                               if(setting.fixColModel){
																 row[colName]['attr']['colspan'] == 'all' ? row[colName]['attr']['colspan'] = (td.nextAll().length + 1-setting.fixColModel.length) : null
															   }else{
															   	 row[colName]['attr']['colspan'] == 'all' ? row[colName]['attr']['colspan'] = (td.nextAll().length + 1) : null
															   }
																
														   }
															if (row[colName]['attr']['colspan']) {//本行colspan
																removeDom = removeDom.add(td.nextAll(':lt(' + (row[colName]['attr']['colspan'] - 1) + ')'))
															}
															if (row[colName]['attr']['rowspan']) {//rowspan
																row[colName]['attr']['colspan'] ? row[colName]['attr']['colspan'] : (row[colName]['attr']['colspan'] = 1)
																removeDom = removeDom.add(this.dom.filter(':gt(' + i + '):lt(' + (row[colName]['attr']['rowspan']  - 1) + ')').find('td:gt(' + (j - 1) + '):lt(' + ( row[colName]['attr']['colspan'] ) + ')'))
															}
													}
												}else{
													td.html(row[colName])
												}
												row[colName]['attr']?td.attr(row[colName]['attr']):null
										  }
										  								if(setting.fixColModel){
								 	  $.each(setting.fixColModel,$.proxy(function(j,item){
									  	   if(item.name===colName){
												   	item.alterFillCol({    'title':title,
																					'pager':pager,
																					'loader':loader,
																					'data':row,
																					'setting':param,
																					'itemName':colName,
																					'dom':td,
																					'finalQueue':this.finalQueue,
																					'position':{'x':i,'y':j}
																				})
										   }
										},this))
								 }
										  //填充列后的件
										  if(setting['afterFillCol']){
												  	for(var f in setting['afterFillCol']){
															setting['afterFillCol'][f]({ 'title':title,
																									'pager':pager,
																									'loader':loader,
																									'data':row,
																									'setting':param,
																									'itemName':colName,
																									'dom':td,
																									'finalQueue':this.finalQueue,
																									'position':{'x':i,'y':j}
																									})
														 }
												  }
								 },this))
								 //填充行后的插件
								   if(setting['afterFillRow']){
												  	for(var f in setting['afterFillRow']){
															 param['afterFillRow'][f]({ 'title':title,
																									'pager':pager,
																									'loader':loader,
																									'data':row,
																									'setting':param,
//																									'itemName':colName,
																									'dom':trs.eq(i),
																									'finalQueue':this.finalQueue,
																									'position':{'x':i}
																									})		 
														 }
												  }
													    
						},this))
						removeDom.remove()
						
				}
				this.afterFillEvent=function(){
					$.each(this.finalQueue,function(i,item){
							item()
						})
				}
				this.load=function(){
					this.createStruct()
					this.loadData()
				}
		 }
		   
		   
		   

			
			function Page(){
					this.pageDom=$("<ul></ul>")
				    
					//显示的条数
					var rowListDom=$('<li></li>');
					rowListDom.html('显示条数')
					this.rowListSelect=$('<select></select>').change(function(){
						loader.qAjaxLoad({deep:0})
					})
					$.each(setting['pager']['rowList'],$.proxy(function(i,item){
						$('<option></option>').html(item).appendTo(this.rowListSelect)
					},this))
					
					this.rowListSelect.appendTo(rowListDom)
					
					this.pageDom.append(rowListDom)
					
					
					//content
					var content=$('<li>第<input type="text" value=""/>项 第<span></span>项，共<span></span>项</li>')
				    this.currentItem=content.find('input:eq(0)').keydown(function(event){//当前项
									if(event.keyCode==8){
										return true;
									}
									if($(this).val()==''&&getNumKey(event.keyCode)==0){
										return false
									}
								if(event.keyCode==13){
                                       if($(this).val()!=''){
									   	   s.currentIndex = parseInt($(this).val())
					                  	  loader.qAjaxLoad({deep:0})
									   }
								}
								if((!(event.keyCode>=48&&event.keyCode<=57||event.keyCode==8))&&(!(event.keyCode>=96&&event.keyCode<=105))){
									return false
								}
								if(parseInt($(this).val()+getNumKey(event.keyCode))>s.total){
									return false
								}
								
					})
					this.currentItemRange=content.find('span:eq(0)')//项区间
					this.totalItem=content.find('span:eq(1)')//总共项
					
					this.pageDom.append(content)
					
					var pages=$('<li>上一页</li><li>下一页</li>')
					var firstPage=pages.filter('li:first').click($.proxy(function(){
						s.currentIndex=(s.currentIndex-parseInt(pager.rowListSelect.val()))<1?1:(s.currentIndex-parseInt(pager.rowListSelect.val()))
						loader.qAjaxLoad({deep:0})
					},this))
					var lastPage=pages.filter('li:last').click($.proxy(function(){
						s.currentIndex=(s.currentIndex+parseInt(pager.rowListSelect.val()))>=s.total?(s.total-parseInt(pager.rowListSelect.val())):(s.currentIndex+parseInt(pager.rowListSelect.val()))
						loader.qAjaxLoad({deep:0})
					},this))
					
					this.pageDom.append(pages)
					
	                this.flushVal=function(){
						this.currentItem.val(s.currentIndex)
						this.totalItem.html(s.total)
						this.currentItemRange.html(s.currentIndex+'-'+(s.currentIndex+pager.pageDom.data('currentStoresLenght')-1))
					}
					this.renderTo=function(renderDom){
										renderDom.append(this.pageDom)
									}
			}
			
						var title=new Title()
						var pager= new Page()
						var loader=new Load();
						
						
			this.__init__=function(){
						title.dom.appendTo(dom)
						if(setting['url']){
								loader.qAjaxLoad({'init':true,deep:0})
						}else if(setting['stores']){
								var c=new Content(setting['stores'])
						        c.load()
						        title.dom.after(c.dom)
						}
						
						this.data('loader',loader)
						this.data('title',title)
						this.data('pager',pager)
						
						dom.appendTo(this.empty())
						
						pager.renderTo($(setting['pager']['renderTo']).empty())
			}
				
			  this.__init__()	
			
			  return this
			
        },
		getLoader:function(){
			return this.data('loader')
		},
		getTitle:function(){
			return this.data('title')
		},
		getPager:function(rows){
			return this.data('pager')
		}
	
    })
})(jQuery);
function getNumKey(keyCode){
		var key=0;
		switch(keyCode){
			case 49:
			case 97:
				key=1
				break;
			case 50:
			case 98:
				key=2
				break;
			case 51:
			case 99:
				key=3
				break;
			case 52:
			case 100:
				key=4
				break;
			case 53:
			case 101:
				key=5
				break;
			case 54:
			case 102:
				key=6
				break;
			case 55:
			case 103:
				key=7
				break;
			case 56:
			case 104:
				key=8
				break;
			case 57:
			case 105:
				key=9
				break;
			case 48:
			case 96:
				key=0
				break;
			default:
		}
		return key;
	}