/**
 * @author 宁彬彬
 */
$(function(){
	$.ajaxSettings.traditional = true
	 window.setInterval(function(){
				try{
					var bodyheight=window.parent.document.documentElement.clientHeight
					var minHeight=bodyheight-101
				    $(window.parent.document).find("#function").height($("body").height()>minHeight?$("body").height():minHeight);
				}catch (ex){}
			}, 20);
});
$(function(){
	var navigatorString = navigator.userAgent.toLowerCase()
	if( /.*chrome.*/.test(navigatorString)|| /.*(safari).*/.test(navigatorString)){
 	     setInterval(function(){
					   	$('table.grid').each(function(){
						 	    var height=$(this).height()
							    var rowHeight=(height-$(this).find('tr:first').height())/$(this).find('tr:gt(0)').size()
								$(this).find('tr:gt(0)').attr('height',rowHeight)
					    })
		       },300)
    }
});
//设置左侧菜单样式
(function(){
	 var s=window.location.href
	 var re = /(\w+\.html)/; 
     re.test(s);
     var r=RegExp.$1;
     var rDom=$(window.parent.document).find('.menulist a[href*="'+r+'"]')
     if(rDom.size()>0){
    	 if(!rDom.hasClass('now')){
    		 $(window.parent.document).find('.menulist a.now').removeClass('now')
    		 rDom.addClass('now')
    	 }
     }
})();
(function($){
    var methods = {
        init: function(opts){
            var defaults = {
                title: {
                    renderTo: 'h1 span:eq(0)'
                },
                dataRange: {
                    renderTo: '.daydata .data'
                },
                menu: {
                    parse: function(menus){
                        $.each(menus, function(i, item){
                            var d = $('<a></a>', {
                                text: item.title
                            })
                            item.checked ? d.addClass('now') : d.attr('href', item.url)
                            d.appendTo('.menu')
                        })
                    }
                },
                menuItem: {},
                chart: {
                    type: 'line',
                    compareItem_renderTo: '.data_select select:eq(0)',
                    //						timeType_renderTo:'.data_select select:eq(1)',
                    renderTo: '.tubiao',
                    width: '100%',
                    hight: 380
                },
                grid: {
                    grid: {
                        renderTo: '#grid',
                        agv_width:true,
                        beforeColSetVal:[],
                        page: {
                            renderTo: '.pager',
                            rowList: [20, 50, 100, 200]
                        }
                    },
                    filter: {
                        modelBtn: '#girdModel',
                        filterListRenderTo: '.ud_select div:eq(0)',
                        colModel: [{
                            colName: '唯一访客数',
                            name: 'UV'
                        }, {
                            colName: '页面浏览数',
                            name: 'PV'
                        }, {
                            colName: '新访次数',
                            name: 'F0'
                        }, {
                            colName: '每次访问页数',
                            name: 'F1'
                        }, {
                            colName: '平均网站访问时长',
                            name: 'F2'
                        }, {
                            colName: '新访占比',
                            name: 'F3',
                            hideInPie: true
                        }, {
                            colName: '访次',
                            name: 'F4'
                        }, {
                            colName: '网站跳出率',
                            name: 'F5',
                            hideInPie: true
                        }, {
                            colName: '下定商品数量',
                            name: 'F6'
                        }, {
                            colName: '下定商品金额',
                            name: 'F7'
                        }, {
                            colName: '下定订单数量',
                            name: 'F8'
                        }, {
                            colName: '下定订单金额',
                            name: 'F9'
                        }, {
                            colName: '下定订单转化率',
                            name: 'F10',
                            hideInPie: true
                        }],
                        defaultCols: ["UV", "PV", "F5", "F1", "F8", "F10"],
                        orderCols: ["UV", "PV", "F5", "F8", "F9", "F10"],
                        goodsCols: ["UV", "PV", "F5", "F6", "F7"],
                        listFilterBtn: '.data03 > .top > .userdata',
                        changeFilterBtn: '.ud_select .select div:eq(1)',
                        filterDom: '.ud_select',
                        filterModeDom: '.ud_select .select .txt',
                        cancellistFilterBtn: '.ud_select .select div:eq(0)'
                    }
                }
            
            }
            if (opts.grid.filter.defaultCols) {
                delete defaults.grid.filter.defaultCols
            }
            if (opts.grid.filter.orderCols) {
                delete defaults.grid.filter.orderCols
            }
            if (opts.grid.filter.goodsCols) {
                delete defaults.grid.filter.goodsCols
            }
            if (opts.grid.filter.colModel) {
                delete defaults.grid.filter.colModel
            }
            var setting = $.extend(true, defaults, opts)
			
			
			
			
			function Title(){
				this.setTitle=function(content){
					 $(setting.title.renderTo).html(content)
					 window.parent.document.title = content
				}
				this.init=function(){
					$(setting.title.renderTo).html(setting.title.content)
					window.parent.document.title = setting.title.content
				}
				this.init()
			}
		  function DateRange(){
                function alignDateRange(d1, d2){
                    d1 = [parseDate(d1[0], 'Y-m-d').valueOf(), parseDate(d1[1], 'Y-m-d').valueOf()]
                    d2 = [parseDate(d2[0], 'Y-m-d').valueOf(), parseDate(d2[1], 'Y-m-d').valueOf()]
                    if ((d1[1] - d1[0]) > (d2[1] - d2[0])) {
                        d1 = align_oprate(d1, d2[1] - d2[0])
                    }
                    else {
                        d2 = align_oprate(d2, d1[1] - d1[0])
                    }
                    function align_oprate(d, range){
                        return [d[1] - range, d[1]]
                    }
                    return [[formatDate(new Date(d1[0]), 'Y-m-d'), formatDate(new Date(d1[1]), 'Y-m-d')], [formatDate(new Date(d2[0]), 'Y-m-d'), formatDate(new Date(d2[1]), 'Y-m-d')]]
                }
                function getDateRange(d1, d2){
                    var d1 = parseDate(d1, 'Y-m-d').valueOf()
                    var d2 = parseDate(d2, 'Y-m-d').valueOf()
                    if (d1 === d2) {
                        return 0
                    }else {
                        return (d2 - d1) / (1000 * 60 * 60 * 24)
                    }
                }
                if ($.cookie('bae_date_range_begin') && $.cookie('bae_date_range_end')) {
                    this.begin = $.cookie('bae_date_range_begin');
                    this.end = $.cookie('bae_date_range_end');
                }else {
                    var l = new Date()
                    l.setDate(l.getDate() - 7)
                    var e = new Date()
                    e.setDate(e.getDate() - 1)
                    this.begin = formatDate(l, 'Y-m-d')
                    this.end = formatDate(e, 'Y-m-d')
                }
                var r = getDateRange(this.begin, this.end)
                this.dbBegin = parseDate(this.begin, 'Y-m-d')
                this.dbBegin.setDate(this.dbBegin.getDate() - r - 1)
                this.dbBegin = formatDate(this.dbBegin, 'Y-m-d')
                this.dbEnd = parseDate(this.end, 'Y-m-d')
                this.dbEnd.setDate(this.dbEnd.getDate() - r - 1)
                this.dbEnd = formatDate(this.dbEnd, 'Y-m-d')
                this.mode = 'single'
                $('.daydata .data').html(this.begin + "  至  " + this.end)
                $('.tushi0:eq(0) span').html('当前时间段（' + this.begin.replace('-', '.') + '-' + this.end.replace('-', '.') + '）')
                $('.day_range > p  input:checkbox').attr('checked', false)
                $('.day_range > div:eq(0)').baeDatePicker({
                    date: [this.begin, this.end],
                    lable: '选择当前时间:&nbsp;&nbsp;'
                })
                $('.day_range > div:eq(1)').baeDatePicker({
                    date: [this.dbBegin, this.dbEnd],
                    lable: '选择对比时间:&nbsp;&nbsp;'
                })
                $('.day_range > div:eq(1)').hide()
                $('.day_range').hide()
                
                $('.daydata > a').toggle(function(){
                    $('.day_range').slideDown()
                    $(setting.chart.compareItem_renderTo).hide()//ie select标签的层级
                }, function(){
                    $('.day_range').slideUp()
                    $(setting.chart.compareItem_renderTo).show()
                })
                $('.day_range > p  input:checkbox').change($.proxy(function(){
                    if ($('.day_range > p  input:checkbox').is(':checked')) {
                        var d = $('.day_range > div:eq(0)').baeDatePicker('getDate')
                        d[0] = parseDate(d[0], 'Y-m-d')
                        d[1] = parseDate(d[1], 'Y-m-d')
                        var r = getDateRange(d[0], d[1])
                        d[0].setDate(d[0].getDate() - r - 1)
                        d[1].setDate(d[1].getDate() - r - 1)
                        $('.day_range > div:eq(1)').baeDatePicker('setDate', formatDate(d[0], 'Y-m-d'), formatDate(d[1], 'Y-m-d'))
                        $('.day_range > div:eq(1)').slideDown()
                    }
                    else {
                        $('.day_range > div:eq(1)').slideUp()
                    }
                }, this))
                $('.day_range > p > button:eq(1)').click(function(){
                    $('.daydata > a').click()
                })
                $('.day_range > p > button:eq(0)').click($.proxy(function(){
					if ($('.day_range > p  input:checkbox').is(':checked')) {
					   this.mode = 'compare'
					}else{
						this.mode = 'single'
					}
                    this.begin = $('.day_range > div:eq(0)').baeDatePicker('getDate')[0]
                    this.end = $('.day_range > div:eq(0)').baeDatePicker('getDate')[1]
                    this.dbBegin = $('.day_range > div:eq(1)').baeDatePicker('getDate')[0]
                    this.dbEnd = $('.day_range > div:eq(1)').baeDatePicker('getDate')[1]
                    if (this.mode === 'compare') {
                        var alignRange = alignDateRange([this.begin, this.end], [this.dbBegin, this.dbEnd])
                        if (this.begin != alignRange[0][0] || this.end != alignRange[0][1]) {
                            this.begin = alignRange[0][0]
                            this.end = alignRange[0][1]
                            $('.day_range > div:eq(0)').baeDatePicker('setDate', this.begin, this.end)
                        }
                        if (this.dbBegin != alignRange[1][0] || this.dbEnd != alignRange[1][1]) {
                            this.dbBegin = alignRange[1][0]
                            this.dbEnd = alignRange[1][1]
                            $('.day_range > div:eq(1)').baeDatePicker('setDate', this.dbBegin, this.dbEnd)
                        }
                    }
                    
                    $.cookie('bae_date_range_begin', this.begin, {
                        path: '/'
                    })
                    $.cookie('bae_date_range_end', this.end, {
                        path: '/'
                    })
                    if (this.mode === 'single') {
                        $('.contrastpic').hide()
                        $('.daydata .data').html(this.begin + "  至  " + this.end)
                    }
                    else {
                        $('.contrastpic').show()
                        $('.tushi0:eq(0) span').html('当前时间段（' + this.begin.replace('-', '.') + '-' + this.end.replace('-', '.') + '）')
                        $('.tushi0:eq(1) span').html('对比时间段（' + this.dbBegin.replace('-', '.') + '-' + this.dbEnd.replace('-', '.') + '）')
                        $('.daydata .data').html(this.begin + " 至 " + this.end + "  VS  " + this.dbBegin + " 至 " + this.dbEnd)
                    }
                    $('.daydata > a').click()
                    this.change([this.begin, this.end], [this.dbBegin, this.dbEnd])
                }, this))
            }
			function Menu(){
				            //menu
				            $.ajax({
				                async: false,//图表要依赖当前项，所以菜单加载不能是异步
				                url: setting.menu.url,
				                data: setting.menu.data,
				                dataType: "json",
				                success: function(data){
				                    setting.menu.parse(data);
				                  //设置左侧菜单样式
				                    (function(){
				                        	 $('.r_tittle .menu > a:gt(0)').not('.now').each(function(){
				                        		 var re = /(\w+\.html)/; 
				                        		 re.test($(this).attr('href'))
				                        		 var r=RegExp.$1;
				                        		 var rDom=$(window.parent.document).find('.menulist a[href*="'+r+'"]')
				                        		 if(rDom.size()>0){
				                        	    	 if(!rDom.hasClass('now')){
				                        	    		 $(window.parent.document).find('.menulist a.now').removeClass('now')
				                        	    		 rDom.addClass('now')
				                        	    	 }
				                        	     }
				                        	 })
				                    })();
				                }
				            })
			}
			function MenuItem(){
				var self = this
                self.currentItem = {}
				var initalize=true
				this.load = function(start, end){
		                var dom
		                $.ajax({
		                        async: false,
//                                 async: true,
		                        url: setting.menuItem.url,
		                        data: $.extend(setting.menuItem.data, {
		                            begin: start,
		                            end: end
		                        }),
		                        dataType: 'json',
		                        success: $.proxy(function(data){
		                            dom = this.parse(data)
		                        }, this)
		                    })
		                    return dom
                }
				 this.parse = function(items){
                    var result = $('<tr></tr>')
                    $.each(items, function(i, item){
						var width=100/items.length
                        var d = $('<td></td>')
						d.css('width',width+'%')
                        var d1 = $('<div></div>').click(function(){
                            if (!$(this).hasClass('groupnow')) {
                                $('.z').find('tr').find('div.groupnow').removeClass('groupnow').addClass('group')
                                var index = $(this).parent().index()
                                $('.z').find('tr').find('td:eq(' + index + ') > div').addClass('groupnow')
                                self.currentItem = item
								self.change()
                            }
                        })
                        if (!$.isEmptyObject(self.currentItem) && self.currentItem.key === item.key) {
                            d1.addClass('groupnow')
                        }
                        else {
                            d1.addClass('group')
                        }
                        if (item.checked && $.isEmptyObject(self.currentItem)) {//初始化
                            self.currentItem = item
                            d1.addClass('groupnow')
                        }
                        else {
                            d1.addClass('group')
                        }
                        var title = $('<div></div>', {
                            'class': 'tittle',
                            html: '<div class="txt">' + item.title + '</div><a class="ico" href="#"></a>'
                        })
                        title.find('a').qtip({
                            content: item.desc,
                            style: {
                                name: 'blue'
                            },
                            position: {
                                corner: {
                                	 target: 'topMiddle',
                                     tooltip: i==0?'leftBottom':((i==items.length-1)?'rightBottom':'bottomMiddle')
                                }
                             },
                             style:{
//                            	 width: 150,
                            	 background: '#F0F5F9',
                                 color: '#999999',
                                 border:{
                                	 color: '#267BB6'
                                 }
                             }
                        })
                        var value = $('<div></div>', {
                            'class': 'value',
                            'text': item.value
                        })
                        if(i===items.length-1){
							d1.css('background-image','none')
						}
                        d1.append(title).append(value).appendTo(d)
                        d.appendTo(result)
                    })
                    self.items = items
					if(initalize){
						initalize=false
						self.onInitLoad()
					}
					self.onLoad()
                    return result
                }
			this.flush = function(dateRange){
                    $('.z table').empty()
                    $('.data01:eq(0) .z table').append(this.load(dateRange.begin, dateRange.end))
                    if (dateRange.mode === 'compare') {
                        $('.data01_01').show()
                        $('.data01:eq(1) .z table').append(this.load(dateRange.dbBegin, dateRange.dbEnd))
                    }
                    else {
                        $('.data01_01').hide()
                    }
                }
			}
			function MenuItemCompare(){
				var self=this
				this.dom=$(setting.chart.compareItem_renderTo)
				this.currentDbItem={}
				this.bindEvent=function(){
					$(setting.chart.compareItem_renderTo).change(function(){
						self.change()
					})
				}
				this.flush=function(items,currentItem){
					this.currentDbItem={}
					self.dom.find('option:gt(0)').remove()
                        $.each(items, $.proxy(function(i, item){
                            if (item.key != currentItem.key) {
                                $('<option></option>', {
                                    value: item.key,
                                    text: item.title
                                }).appendTo(setting.chart.compareItem_renderTo)
                            }
                        }, this))
				}
				this.init=function(){
					this.bindEvent()
				}
				this.init()
			}
			function  ChartLegend(dateRange){
				var self=this
				this.flush=function(currentItem,currentDbItem){
						if(setting.chart.type !== 'map'){
                                          $('.tushi:gt(0)').hide()
						                    $('.tushi:even span').html(currentItem.title)
						                    if (!$.isEmptyObject(currentDbItem)) {
						                        $('.tushi:odd span').html(currentDbItem.title)
						                    }
						                    if (dateRange.mode === 'compare') {
						                        $('.tushi:eq(2)').show()
						                    }
						                    if (!$.isEmptyObject(currentDbItem)) {
						                        $('.tushi:eq(1)').show()
						                    }
						                    if (dateRange.mode === 'compare' && (!$.isEmptyObject(currentDbItem))) {
						                        $('.tushi:eq(3)').show()
						                    }
					}else{
						 $('.tushi').hide()
						$('.tushi:eq(4)').show()
						$('.tushi:eq(4)').find('span:first').html(currentItem.title+":")
					} 
				}
			}
		function Chart(dateRange,a,b){
                var self = this
                this.init = function(){
                    var p = {
                        typeName: a.currentItem.key
                    }
                    if ($.isEmptyObject(b.currentDbItem)) {
                        p['dbTypeName'] = b.currentDbItem.key
                    }
                    var url = setting.chart.url + '?' +
                    $.param($.extend(true, {}, p,  {
                        begin: dateRange.begin,
                        end: dateRange.end
                    }, setting.chart.data))
                    
                    if (setting.chart.type === 'line') {
                        $(setting.chart.renderTo).baeLineChart({
                            dataSource: url,
                            width: setting.chart.width,
                            hight: setting.chart.hight
                        })
                    }
                    else 
                        if (setting.chart.type === 'pie') {
                            $(setting.chart.renderTo).baePieChart({
                                dataSource: url,
                                width: setting.chart.width,
                                hight: setting.chart.hight
                            })
                        }
                        else 
                            if (setting.chart.type === 'map') {
                                $(setting.chart.renderTo).baeMap({
                                    dataSource: url,
                                    width: setting.chart.width,
                                    hight: setting.chart.hight
                                })
                            }else if(setting.chart.type === 'column'){
								$(setting.chart.renderTo).baeColumnChart({
                                    dataSource: url,
                                    width: setting.chart.width,
                                    hight: setting.chart.hight
                                })
							}else if(setting.chart.type === 'columnline'){
								$(setting.chart.renderTo).baeColumnLineChart({
                                    dataSource: url,
                                    width: setting.chart.width,
                                    hight: setting.chart.hight
                                })
							}
                }
                this.flush = function(){
                    var temParam = {}
                    if (dateRange.mode === 'compare') {
                        temParam['dbBegin'] = dateRange.dbBegin
                        temParam['dbEnd'] = dateRange.dbEnd
                    }
                    var p = {
                        typeName: a.currentItem.key
                    }
                    if (!$.isEmptyObject(b.currentDbItem)) {
                        p['dbTypeName'] = b.currentDbItem.key
                    }
                    var url = setting.chart.url + '?' + $.param($.extend(temParam, p,  {
                        begin: dateRange.begin,
                        end: dateRange.end
                    }, setting.chart.data))
                    if (setting.chart.type === 'line') {
                        $(setting.chart.renderTo).baeLineChart('setData', url)
                    }
                    else 
                        if (setting.chart.type === 'pie') {
                            $(setting.chart.renderTo).baePieChart('setData', url)
                        }
                        else 
                            if (setting.chart.type === 'map') {
                                $(setting.chart.renderTo).baeMap('setData', url)
                            }else if(setting.chart.type === 'column'){
								 $(setting.chart.renderTo).baeColumnChart('setData', url)
							}else if(setting.chart.type === 'columnline'){
								$(setting.chart.renderTo).baeColumnLineChart('setData', url)
							}
                }
				this.init()
            };
			(function(){//注册filter区域动画
				 $(setting.grid.filter.filterDom).hide()
				 $(setting.grid.filter.listFilterBtn).click(function(){
				 	$(setting.grid.filter.filterDom).slideToggle()
				 })
				 $(setting.grid.filter.cancellistFilterBtn).click(function(){
				 	 $(setting.grid.filter.listFilterBtn).click()
				 })
			})();
			function GridFilter(toggle){
						var self=this
				 	     self.hideLabelInPieDom=$()
					 	 var filterBtn=$(setting.grid.filterBtn)
						 var filterListDom=$('<ul/>')
						 function getCols(){
						 	var result=[]
							filterListDom.find('input:checked').each(function(i){
								result.push($(this).val())
							})
							return result
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
								cols.push(setting.grid.filter['fixColModel'])
								if(setting.grid.filter['fixColModels']){
									cols=cols.concat(setting.grid.filter['fixColModels'])
								}
								filterListDom.find('input:checked').each(function(i){
																		$.each(setting.grid.filter['colModel'],$.proxy(function(i,item){
																			if($(this).val()===item['name']){
																				cols.push(item)
																			}
																		},this))
																	})
								return cols
						}
						this.getDefaultCols=function(){
							    var cols=[]
								cols.push(setting.grid.filter['fixColModel'])
								if(setting.grid.filter['fixColModels']){
									cols=cols.concat(setting.grid.filter['fixColModels'])
								}
								$.each(setting.grid.filter.defaultCols,function(i1,i1item){
											$.each(setting.grid.filter['colModel'],$.proxy(function(i,item){
																					if(i1item===item['name']){
																						cols.push(item)
																					}
																				},this))
								})
								return cols
						}
						this.resetOption=function(m){
								if(m==='list'){
									$(setting.grid.filter.filterModeDom).find('a').eq(0).click()
								}else{
									filterListDom.find('input:checkbox').prop("checked", false);
									filterListDom.find('input:checkbox').eq(0).prop("checked", true);
									$(setting.grid.filter.filterModeDom).find('a.now').removeClass('now')
								}
							}
						this.flush=function(){
							   filterListDom.empty()
								$.each(setting.grid.filter['colModel'],function(i,item){
																			var li=$('<li/>').appendTo(filterListDom)
																			if(item.hideInPie){
																				self.hideLabelInPieDom=self.hideLabelInPieDom.add(li)
																			}
																			var input = $('<input/>',{'type':'checkbox','value':item['name']})
																			.attr('checked',setting.grid.filter.defaultCols.include(item['name'])?true:false)
																			.click(function(){
																				if(toggle.model==='list'){
																					if($(this).is(':checked')&&filterListDom.find('input:checkbox:checked').size()===7){
																						alert('最多选择6项指标')
																						return false
																					}else if(filterListDom.find('input:checkbox:checked').size()===0){
																						alert('最少保留1个指标')
																						return false
																					}else{
																						$(setting.grid.filter.filterModeDom).find('a').removeClass('now')
																						if(setting.grid.filter.defaultCols.equal(getCols())){
																							$(setting.grid.filter.filterModeDom).find('a:eq(0)').addClass('now')
																						}else if(setting.grid.filter.orderCols.equal(getCols())){
																							$(setting.grid.filter.filterModeDom).find('a:eq(1)').addClass('now')
																						}else if((setting.grid.filter.goodsCols.equal(getCols()))){
																							$(setting.grid.filter.filterModeDom).find('a:eq(2)').addClass('now')
																						}else{
																						}
																					}
																				}else{
																					if(!this.checked){
																						alert('最少保留1个指标')
																						return false
																					}else{
																						filterListDom.find('input:checkbox:checked').attr('checked',false)
																					   $(this).prop("checked", true);
																					}
																				}
																			})
																			$('<label/>',{
																				text:item['colName']
																			}).appendTo(li).prepend(input)
																	})
																	filterListDom.appendTo(setting.grid.filter.filterListRenderTo)
						}
						this.init=function(){
								                                     setting.grid.filter['fixColModel']['sortable']=false
								                                     if(setting.grid.filter['fixColModels']){
								     									$.each(setting.grid.filter['fixColModels'],function(i,item){
								     										item['sortable']=false
								     									})
								     								}
								                                    $(setting.grid.filter.filterModeDom).find('a').each(function(i){
																		$(this).click(function(){
																					if(!$(this).hasClass('now')){
																					 $(setting.grid.filter.filterModeDom).find('a').removeClass('now')
																					 $(this).addClass('now')
																					 if(i===0){
																					 	setCols(setting.grid.filter.defaultCols)
																					 }else if(i===1){
																					 	setCols(setting.grid.filter.orderCols)
																					 }else{
																					 	setCols(setting.grid.filter.goodsCols)
																					 }
																				}
																		})
																	})
													this.flush()	         
													$(setting.grid.filter.changeFilterBtn).click(function(){
													 	  self.change()
													 	 $(setting.grid.filter.listFilterBtn).click()
													 })  
							}
                            this.init()
			}
			function Toggle(filter,grid){
				    var self=this
				 	var modelBtn=$(setting.grid.filter.modelBtn)
					this.model='list'
					modelBtn.toggle($.proxy(function(){
						$('.ud_select .select .txt').hide()
						modelBtn.html('数据报表模式')
						modelBtn.addClass('b_data')
						this.model='pie'
                        self.change()
					},this),$.proxy(function(){
						$('.ud_select .select .txt').show()
						modelBtn.html('饼图模式')
						modelBtn.removeClass('b_data')
						this.model='list'
                        self.change()
					},this))
				 }
				function Grid(dateRange,filter,toggle){
					this.fixColModel=[]
				 	this.flush=function(resetCol){
						var param=$.extend(true,{},setting.grid.grid, {colModel:filter.getCols()},{data:{
																						begin:dateRange.begin,
																						end:dateRange.end
																					 }})
						if(resetCol){
							param['colModel']=filter.getDefaultCols()
						}															 
						var cols=	filter.getCols()									 
						if(dateRange.mode==='compare'&&toggle.model!=='pie'){
							param.data['dbBegin']=dateRange.dbBegin
							param.data['dbEnd']=dateRange.dbEnd
							param.data['groupCol']=cols[0].name
							param.data['tansact']='dateRange'
						}															 
						if(toggle.model==='pie'){
							param['colModel'].push({
								colName:'占比',
								name:'scale',
								sortable:false
							})
							param.data['colName']=cols[cols.length-1].name
                            param.onDataLoad=function(data){
								if(data['countCol']){
									$('body').data('countCol',data['countCol'].toString())
								}
								$.each(data.stores,function(i,item){
									item['scale']=(parseFloat(item[param.data['colName']].toString().replace(/,/g,'').replace('￥',''))*100/parseFloat($('body').data('countCol'))).toFixed(2)+'%'
								})
							}
							param['fixColModel']=[{colName:'饼图','name':'pie',render:function(dom){
             																					  dom.css('vertical-align','top')
             																					  if(!$('body').data('grid_pie')){
             																						  var grid_pie_dom=$('<span></span>')
             																						  grid_pie_dom.appendTo(dom).baePieChart({
																											dataSource:setting.grid.pie.url,
																											data:$.extend(true,{},setting.grid.pie.data,{begin:dateRange.begin,
										                                                                              end:dateRange.end,
                                                                                                                      typeName:param.data['colName']})
																										})	
																									$('body').data('grid_pie',grid_pie_dom)	
																									$('body').data('chart',grid_pie_dom.data('chart'))	
             																					  }else{
             																						 var grid_pie_dom=$('body').data('grid_pie')
             																						 grid_pie_dom.data('chart',$('body').data('chart'))
             																						 var xmlurl=setting.grid.pie.url+"?"+encodeURI($.param($.extend(true,{},setting.grid.pie.data,{begin:dateRange.begin,
							                                                                              end:dateRange.end,
                                                                                                          typeName:param.data['colName']})))
             																						grid_pie_dom.appendTo(dom).baePieChart('setData',xmlurl)
             																					  }
                                                                 }}]
						}
						$.baeGrid(param)

					}
					this.init=function(){
						$.baeGrid($.extend(true,{},setting.grid.grid, {colModel:filter.getCols()},{data:{
																						begin:dateRange.begin,
																						end:dateRange.end
																					 }}))
					}
					this.init()
				 }
			
			function Report(dateRange){
//				$('.bb_down').attr('target','_blank')
				this.flush=function(){
					var url=setting.report.url+'?'+encodeURI($.param($.extend({},setting.report.data,{begin:dateRange.begin,end:dateRange.end})))
				    $('.bb_down').attr('href',url)
				}
				this.flush()
			}
			
			
			function Install(){
				var self=this
				this.install=function(){
					        if(setting.expand){
								setting.expand.call(self,setting)
							}
							self.title=new Title()
				        	self.dateRange = new DateRange()
							if(!setting.hideMenu){
						        	self.menu=new Menu()
							}
							self.menuItem=new MenuItem()
							self.menuItemCompare=new MenuItemCompare()
							
							self.chartLegend=new ChartLegend(self.dateRange)
							self.menuItem.onInitLoad=function(){
								  self.menuItemCompare.flush(self.menuItem.items,self.menuItem.currentItem)
							}
							self.menuItem.onLoad=function(){
								   self.chartLegend.flush(self.menuItem.currentItem,self.menuItemCompare.currentDbItem)
							}
							self.menuItem.flush(self.dateRange)
							
						   self.menuItem.change=function(){
								  self.menuItemCompare.flush(self.menuItem.items,self.menuItem.currentItem)
								   self.chartLegend.flush(self.menuItem.currentItem,self.menuItemCompare.currentDbItem)
							       self.chart.flush()
							}
							self.menuItemCompare.change=function(){
								   if(this.dom.val() === this.dom.find('option:first').val()){
								   	     this.currentDbItem = {}
								   }else{
								   	    $.each(self.menuItem.items, $.proxy(function(i, item){
		                                    if (this.dom.val() === item.key) {
		                                       this.currentDbItem = item
		                                    }
		                                },self.menuItemCompare))
								   }
								   self.chartLegend.flush(self.menuItem.currentItem,self.menuItemCompare.currentDbItem)
							        self.chart.flush()
							}
							self.chart = new Chart(self.dateRange,self.menuItem,self.menuItemCompare);
							self.toggle=new Toggle()
							self.filter=new GridFilter(self.toggle)
							self.grid=new Grid(self.dateRange,self.filter,self.toggle)
							self.toggle.change=function(){
								if(self.toggle.model=='pie'){
									 self.filter.hideLabelInPieDom.hide()
								     self.filter.resetOption('pie')
								}else{
									 self.filter.hideLabelInPieDom.show()
								     self.filter.resetOption('list')
								}
								   
								   self.grid.flush()
							}
							self.filter.change=function(){
								self.grid.flush()
							}
							if(setting.report){
								self.report=new Report(self.dateRange)
							}
							self.dateRange.change = function(d1, d2){
				                self.menuItem.flush(self.dateRange)
				                self.chart.flush()
				                self.grid.flush()
								if(setting.report){
								   self.report.flush()
							    }
				            }
				}
			}
			
			var install=new Install()
			install.install()
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
Array.prototype.equal=function(array){
	if((!array)||(!this)){
		return false
	}
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