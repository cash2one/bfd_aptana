/**
 * @author 宁彬彬
 */
(function($){
$.ajaxSettings.traditional = true
    var methods = {
        init: function(opts){
                var defaults ={
					title:{
							 renderTo:'h1 span:eq(0)'
							 },
					dataRange:{
						renderTo:'.daydata .data'
					},
					menu:{
						parse:function(menus){
							$.each(menus,function(i,item){
								var d=$('<a></a>',{text:item.title})
								item.checked?d.addClass('now'):d.attr('href',item.url)
								d.appendTo('.menu')
							})
						}
					},
					menuItem:{
					},
					chart:{
						type:'line',
						compareItem_renderTo:'.data_select select:eq(0)',
						timeType_renderTo:'.data_select select:eq(1)',
						renderTo:'.tubiao',
						width:'100%',
						hight:380
					},
					grid:{
						grid:{renderTo:'#grid',page:{
								  	renderTo:'.pager',
									rowList:[20,30,50]
								  }},
						
//						gridRendTo:'#grid1 div:eq(1)',
						modelBtn:'#girdModel',
						filterListRenderTo:'.ud_select div:eq(0)',
						filter:{
							colModel: [{
                            colName: '唯一访客数',
                            name: 'UV'
                        }, 
                        {
                            colName: '页面浏览数',
                            name: 'PV'
                        }, 
                        {
                            colName: '新访次数',
                            name: 'F0'
                        }, 
                        {
                            colName: '每次访问页数',
                            name: 'F1'
                        }, 
                        {
                            colName: '平均网站访问时长',
                            name: 'F2'
                        }, 
                        {
                            colName: '新房客占比',
                            name: 'F3'
                        }, 
                        {
                            colName: '访次',
                            name: 'F4'
                        }, 
                        {
                            colName: '网站跳出率',
                            name: 'F5'
                        }, 
                        {
                            colName: '下定商品数量',
                            name: 'F6'
                        }, 
                        {
                            colName: '下定商品金额',
                            name: 'F7'
                        }, 
                        {
                            colName: '下定订单数量',
                            name: 'F8'
                        }, 
                        {
                            colName: '下定订单金额',
                            name: 'F9'
                        }, 
                        {
                            colName: '下定订单转化率',
                            name: 'F10'
                        }],
						defaultCols:["UV","PV","F5","F1","F8","F10"],
						orderCols:["UV","PV","F5","F8","F9","F10"],
						goodsCols:["UV","PV","F5","F6","F7"],
							listFilterBtn:'.data03 > .top > .userdata',
							changeFilterBtn:'.ud_select .select div:eq(1)',
							filterDom:'.ud_select',
							filterModeDom:'.ud_select .select .txt',
							cancellistFilterBtn:'.ud_select .select div:eq(0)'
						}	
					}
					
				}
				if(opts.grid.filter.defaultCols){
					delete defaults.grid.filter.defaultCols
				}
				if(opts.grid.filter.orderCols){
					delete defaults.grid.filter.orderCols
				}
				if(opts.grid.filter.goodsCols){
					delete defaults.grid.filter.goodsCols
				}
				var setting = $.extend(true, defaults, opts)   
				$(setting.title.renderTo).html(setting.title.content)
				window.parent.document.title=setting.title.content
				$(setting.dataRange.renderTo).html(setting.dataRange.begin+'至'+setting.dataRange.end)
				function DateRange(){
					function alignDateRange(d1,d2){
							d1=[parseDate(d1[0],'Y-m-d').valueOf(),parseDate(d1[1],'Y-m-d').valueOf()]
							d2=[parseDate(d2[0],'Y-m-d').valueOf(),parseDate(d2[1],'Y-m-d').valueOf()]
							if((d1[1]-d1[0])>(d2[1]-d2[0])){
								d1=align_oprate(d1,d2[1]-d2[0])
							}else{
								d2=align_oprate(d2,d1[1]-d1[0])
							}
							function align_oprate(d,range){
								 return [d[1]-range,d[1]]
							}
							return [[formatDate(new Date(d1[0]),'Y-m-d'),formatDate(new Date(d1[1]),'Y-m-d')],
								[formatDate(new Date(d2[0]),'Y-m-d'),formatDate(new Date(d2[1]),'Y-m-d')]]
						}
                    if ($.cookie('bae_date_range_begin') && $.cookie('bae_date_range_end')) {
                        this.begin = $.cookie('bae_date_range_begin');
                        this.end = $.cookie('bae_date_range_end');
                    }
                    else {
                        var l = new Date()
                        l.setDate(l.getDate() - 7)
                        this.begin = formatDate(l, 'Y-m-d')
                        this.end = formatDate(new Date(), 'Y-m-d')
                    }
                    this.dbBegin = parseDate(this.begin, 'Y-m-d')
                    this.dbBegin.setMonth(this.dbBegin.getMonth() - 1)
                    this.dbBegin = formatDate(this.dbBegin, 'Y-m-d')
                    this.dbEnd = parseDate(this.end, 'Y-m-d')
                    this.dbEnd.setMonth(this.dbEnd.getMonth() - 1)
                    this.dbEnd = formatDate(this.dbEnd, 'Y-m-d')
                    this.mode = 'single'
					$('.daydata .data').html(this.begin+"至"+this.end)
					$('.tushi0:eq(0) span').html('当前时间段（'+this.begin.replace('-','.')+'-'+this.end.replace('-','.')+'）')
                    $('.day_range > p > input:checkbox').attr('checked', false)
                    $('.day_range > div:eq(0)').baeDatePicker({
                        date: [this.begin, this.end],
						lable:'选择当前时间:  '
                    })
                    $('.day_range > div:eq(1)').baeDatePicker({
                        date: [this.dbBegin, this.dbEnd],
						lable:'选择对比时间:  '
                    })
                    $('.day_range > div:eq(1)').hide()
                    $('.day_range').hide()
                    
                    $('.daydata > a').toggle(function(){
                        $('.day_range').slideDown()
                    }, function(){
                        $('.day_range').slideUp()
                    })
                    $('.day_range > p > input:checkbox').change($.proxy(function(){
                        if ($('.day_range > p > input:checkbox').is(':checked')) {
                            this.mode = 'compare'
							var d=$('.day_range > div:eq(0)').baeDatePicker('getDate')
							d[0]=parseDate(d[0],'Y-m-d')
							d[1]=parseDate(d[1],'Y-m-d')
							d[0].setMonth(d[0].getMonth()-1)
							d[1].setMonth(d[1].getMonth()-1)
							$('.day_range > div:eq(1)').baeDatePicker('setDate', formatDate(d[0], 'Y-m-d'), formatDate(d[1], 'Y-m-d'))
                            $('.day_range > div:eq(1)').slideDown()
                        }
                        else {
                            this.mode = 'single'
                            $('.day_range > div:eq(1)').slideUp()
                        }
                    }, this))
                    $('.day_range > p > button:eq(1)').click(function(){
                        $('.daydata > a').click()
                    })
                    $('.day_range > p > button:eq(0)').click($.proxy(function(){
						this.begin=  $('.day_range > div:eq(0)').baeDatePicker('getDate')[0]
						this.end=  $('.day_range > div:eq(0)').baeDatePicker('getDate')[1]
						this.dbBegin = $('.day_range > div:eq(1)').baeDatePicker('getDate')[0]
                        this.dbEnd = $('.day_range > div:eq(1)').baeDatePicker('getDate')[1]
						if(this.mode==='compare'){
							var alignRange=alignDateRange([this.begin,this.end],[this.dbBegin,this.dbEnd])
							if(this.begin!=alignRange[0][0]||this.end!=alignRange[0][1]){
								this.begin=alignRange[0][0]
							    this.end=alignRange[0][1]
								$('.day_range > div:eq(0)').baeDatePicker('setDate',this.begin,this.end)
							}
							if(this.dbBegin!=alignRange[1][0]||this.dbEnd!=alignRange[1][1]){
								this.dbBegin=alignRange[1][0]
							    this.dbEnd=alignRange[1][1]
								$('.day_range > div:eq(1)').baeDatePicker('setDate',this.dbBegin,this.dbEnd)
							}
						}
						
						$.cookie('bae_date_range_begin',this.begin,{path:'/'})
						$.cookie('bae_date_range_end',this.end,{path:'/'})
						 if(this.mode==='single'){
							$('.contrastpic').hide()
						 	$('.daydata .data').html(this.begin+"至"+this.end)
						 }else{
						 	$('.contrastpic').show()
							$('.tushi0:eq(0) span').html('当前时间段（'+this.begin.replace('-','.')+'-'+this.end.replace('-','.')+'）')
							$('.tushi0:eq(1) span').html('对比时间段（'+this.dbBegin.replace('-','.')+'-'+this.dbEnd.replace('-','.')+'）')
						 	$('.daydata .data').html(this.begin+"至"+this.end+" VS "+this.dbBegin+"至"+this.dbEnd)
						 }
						 $('.daydata > a').click()
						 this.change([this.begin,this.end],[this.dbBegin,this.dbEnd])
                    },this))
                }
				var dateRange=new DateRange()
				dateRange.change=function(d1,d2){
					 menuItem.flush()
					   chart.reflush()
					   grid.reflush()
				}
				
				//menu
				$.ajax({
					async:false,//图表要依赖当前项，所以菜单加载不能是异步
					 url: setting.menu.url,
				     data:  setting.menu.data,
				     dataType: "json",
				     success:function(data){
					 	setting.menu.parse(data)
					 }
				})
				//menuItem
				function MenuItem(){
				     this.load=function(start,end){
					 	var dom
					 	$.ajax({
									async:false,
									url:setting.menuItem.url,
									data:$.extend(setting.menuItem.data,{begin:start,
												                                                 end:end}),
									dataType:'json',
									success:$.proxy(function(data){
										dom=this.parse(data)
									},this)
								})
						return dom		
					 }	
					 this.parse=function(items){
					 	var result=$('<tr></tr>')
					 	$.each(items,function(i,item){
												var d=$('<td></td>')
												var d1=$('<div></div>').click(function(){
														if(!$(this).hasClass('groupnow')){
																$('.z').find('tr').find('div.groupnow').removeClass('groupnow').addClass('group')
																var index=$(this).parent().index()
																$('.z').find('tr').find('td:eq('+index+') > div').addClass('groupnow')
																$('.data02 .top').find('.tushi').find('span').html(item.title)
															   chart.param.typeName=item.key
															   if(chart.param.dbTypeName){
															   	   delete chart.param.dbTypeName
															   }
																chart.reflush()
														}
												})
												item.checked?(d1.addClass('groupnow')&&(setting.currentItem=item.key)&&$('.data02 .top').find('.tushi').find('span').html(item.title)):d1.addClass('group')
												var title=$('<div></div>',{
													'class':'tittle',
													html:'<div class="txt">'+item.title+'</div><a class="ico" href="#"></a>'
												})
												var value=$('<div></div>',{
													  'class':'value',
													   'text':item.value
												})
												if(i!=0){
													$('<td class="line">&nbsp;</td>').appendTo(result)
												}
												d1.append(title).append(value).appendTo(d)
												d.appendTo(result)
											})
											return result
					 }
					 this.flush=function(){
					 	$('.z table').empty()
						$('.data01:eq(0) .z table').append(this.load(dateRange.begin,dateRange.end))
				        if(dateRange.mode==='compare')	{
							$('.data01_01').show()
							$('.tushi_1').show()
							$('.data01:eq(1) .z table').append(this.load(dateRange.dbBegin,dateRange.dbEnd))
						}else{
							$('.data01_01').hide()
							$('.tushi_1').hide()
						}	
					 }
				}
				var menuItem =new MenuItem()
				menuItem.flush()
				function Chart(){
									//chart
							this.flushCompareItem=function(){
								       if(setting.chart.type!=='map'){
												$(setting.chart.compareItem_renderTo).find('option:gt(0)').remove()
												$.each(setting.chart.compareItem,$.proxy(function(i,item){
													if(item.value!=this.param.typeName){
														$('<option></option>',{
															value:item.value,
															text:item.title
														}).appendTo(setting.chart.compareItem_renderTo)
													}
											},this))
									}
							}
							if(setting.chart.type!=='map'){
															$(setting.chart.compareItem_renderTo).change($.proxy(function(){
								                                this.param.typeName=setting.currentItem
																this.param.dbTypeName=$(setting.chart.compareItem_renderTo).val()
																this.reflush()
															},this))
															if(setting.chart.listtimeType){
																$('<option value="1">天</option>').appendTo($(setting.chart.timeType_renderTo))
																$('<option value="0">小时</option>').appendTo($(setting.chart.timeType_renderTo))
																$(setting.chart.timeType_renderTo).change($.proxy(function(){
																	 this.param.timeType=$(setting.chart.timeType_renderTo).val()
																	 this.reflush()
																},this))
															}else{
																$(setting.chart.timeType_renderTo).remove()
															}
															
							}else{
								$(setting.chart.compareItem_renderTo).parent().empty()
							}

							this.param={
								begin:dateRange.begin,
								end:dateRange.end,
//								showItems:[setting.cols]
                                typeName:setting.currentItem,
								timeType:1
							}
							this.param=$.extend(true,this.param,setting.chart.data)
							this.init=function(){
								var url=setting.chart.url+'?'+$.param(this.param)
//								console.info(url)
								if(setting.chart.type==='line'){
									$(setting.chart.renderTo).baeLineChart({
									     	dataSource:url,
											width:setting.chart.width,
										    hight:setting.chart.hight
							      })
								}else if(setting.chart.type==='pie'){
									$(setting.chart.renderTo).baePieChart({
									     	dataSource:url,
											width:setting.chart.width,
										    hight:setting.chart.hight
							      })
								}else if(setting.chart.type==='map'){
									$(setting.chart.renderTo).baeMap({
									     	dataSource:url,
											width:setting.chart.width,
										    hight:setting.chart.hight
							      })
								}
								this.flushCompareItem()
							}
							this.reflush=function(){
								var temParam={}
								if(dateRange.mode==='compare'){
									temParam['dbBegin']=dateRange.dbBegin
									temParam['dbEnd']=dateRange.dbEnd
								}
								var url=setting.chart.url+'?'+$.param($.extend(temParam,this.param))
//								console.info(url)
								this.flushCompareItem()
								if(setting.chart.type==='line'){
								  $(setting.chart.renderTo).baeLineChart('setData',url)
								}else if(setting.chart.type==='pie'){
									$(setting.chart.renderTo).baePieChart('setData',url)
								}else if(setting.chart.type==='map'){
									$(setting.chart.renderTo).baeMap('setData',url)
								}
							}
							this.init()
				}
				
				
				var chart=new Chart();

				//grid
				function Grid(){
					this.init=function(){
						$.baeToggleFilterGrid($.extend(true,setting.grid,{dateRange:dateRange}))
					}
					this.reflush=function(){
						$.baeToggleFilterGrid('reflush')
					}
					this.init()
				}
				var grid=new Grid()
				
				
//				$.baeFilterGrid(setting.grid)
        }
    };
    
    $.baeInstall = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else 
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            }
            else {
                $.error('Method ' + method + ' does not exist on jQuery.baeInstall');
            }
    };
    
})(jQuery);
