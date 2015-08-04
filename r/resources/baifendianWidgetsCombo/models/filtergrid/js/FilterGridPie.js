/**
 * @author Administrator
 */
function FilterGridPie(setting, global){
    Widget.call(this)
	var level=0//初始化在第一级
    var dom = $('#' + setting.container)
	function arrayequal(array1,array2){
		if(array1.length!=array2.length){
			return false
		}
		for(var i in array1){
			if(array1[i]!=array2[i]){
				return false
			}
		}
		return true
	}
    function GridFilter(toggle){
        var self = this;
	  (function(){//注册filter区域动画
             dom.find('.ud_select').hide()
            dom.find('.top > .userdata').click(function(){
                dom.find('.ud_select').slideToggle()
            })
            dom.find('.ud_select > .select > div:eq(0)').click(function(){
                dom.find('.top > .userdata').click()
            })
        })();
        self.hideLabelInPieDom = $()
        var filterListDom = $('<ul/>')
        function getCols(){
            var result = []
            filterListDom.find('input:checked').each(function(i){
                result.push($(this).val())
            })
            return result
        }
        function setCols(array){
            filterListDom.find('input').attr('checked', false).each(function(){
			    if ( $.inArray($(this).val(),array)>=0) {
                    $(this).attr('checked', true)
                }
            })
        }
        this.getCols = function(){
            var cols = []
            cols.push(setting.option[level].filter['fixColModel'])
            if (setting.option[level].filter['fixColModels']) {
                cols = cols.concat(setting.option[level].filter['fixColModels'])
            }
//            filterListDom.find('input:checked').each(function(i){
//                $.each(setting.option[level].filter['colModel'], $.proxy(function(i, item){
//                    if ($(this).val() === item['name']) {
//                        cols.push(item)
//                    }
//                }, this))
//            })
            return cols.concat(this.getFilterCols())
        }
        this.getFilterCols=function(){
        	 var cols = []
        	 filterListDom.find('input:checked').each(function(i){
                 $.each(setting.option[level].filter['colModel'], $.proxy(function(i, item){
                     if ($(this).val() === item['name']) {
                         cols.push(item)
                     }
                 }, this))
             })
             return cols
        }
        this.getDefaultCols = function(){
            var cols = []
            cols.push(setting.option[level].filter['fixColModel'])
            if (setting.option[level].filter['fixColModels']) {
                cols = cols.concat(setting.option[level].filter['fixColModels'])
            }
            $.each(setting.option[level].filter.defaultCols, function(i1, i1item){
                $.each(setting.option[level].filter['colModel'], $.proxy(function(i, item){
                    if (i1item === item['name']) {
                        cols.push(item)
                    }
                }, this))
            })
            return cols
        }
        this.resetOption = function(m){
            if (m === 'list') {
                dom.find('.ud_select .select .txt').find('a').eq(0).click()
            }
            else {
                filterListDom.find('input:checkbox').prop("checked", false);
                filterListDom.find('input:checkbox').eq(0).prop("checked", true);
                dom.find('.ud_select .select .txt').find('a.now').removeClass('now')
            }
        }
        this.flush = function(){
            filterListDom.empty()
            $.each(setting.option[level].filter['colModel'], function(i, item){
                var li = $('<li/>').appendTo(filterListDom)
                if (item.hideInPie) {
                    self.hideLabelInPieDom = self.hideLabelInPieDom.add(li)
                }
                var input = $('<input/>', {
                    'type': 'checkbox',
                    'value': item['name']
                }).attr('checked', $.inArray(item['name'],setting.option[level].filter.defaultCols)>=0).click(function(){
                    if (toggle.model === 'list') {
                        if ($(this).is(':checked') && filterListDom.find('input:checkbox:checked').size() === 7) {
                            alert('最多选择6项指标')
                            return false
                        }
                        else 
                            if (filterListDom.find('input:checkbox:checked').size() === 0) {
                                alert('最少保留1个指标')
                                return false
                            }
                            else {
                                $(setting.option[level].filter.filterModeDom).find('a').removeClass('now')
                                if (arrayequal(setting.option[level].filter.defaultCols,getCols())) {
                                    $(setting.option[level].filter.filterModeDom).find('a:eq(0)').addClass('now')
                                }
                                else 
                                    if (arrayequal(setting.option[level].filter.orderCols,getCols())) {
                                        $(setting.option[level].filter.filterModeDom).find('a:eq(1)').addClass('now')
                                    }
                                    else 
                                        if (arrayequal(setting.option[level].filter.goodsCols,getCols())) {
                                            $(setting.option[level].filter.filterModeDom).find('a:eq(2)').addClass('now')
                                        }
                                        else {
                                        }
                            }
                    }
                    else {
                        if (!this.checked) {
                            alert('最少保留1个指标')
                            return false
                        }
                        else {
                            filterListDom.find('input:checkbox:checked').attr('checked', false)
                            $(this).prop("checked", true);
                        }
                    }
                })
                $('<label/>', {
                    text: item['colName']
                }).appendTo(li).prepend(input)
            })
            filterListDom.appendTo(dom.find('.ud_select div:eq(0)'))
        }
        this.init = function(){
            setting.option[level].filter['fixColModel']['sortable'] = false
            if (setting.option[level].filter['fixColModels']) {
                $.each(setting.option[level].filter['fixColModels'], function(i, item){
                    item['sortable'] = false
                })
            }
            dom.find('.ud_select > .select > .txt').find('a').each(function(i){
                $(this).click(function(){
                    if (!$(this).hasClass('now')) {
                        dom.find('.ud_select .select .txt').find('a').removeClass('now')
                        $(this).addClass('now')
                        if (i === 0) {
                            setCols(setting.option[level].filter.defaultCols)
                        }
                        else 
                            if (i === 1) {
                                setCols(setting.option[level].filter.orderCols)
                            }
                            else {
                                setCols(setting.option[level].filter.goodsCols)
                            }
                    }
                })
            })
            this.flush()
            dom.find('.ud_select .select div:eq(1)').click(function(){
                self.change()
                dom.find('.top > .userdata').click()
            })
        }
        this.init()
    }
    function Toggle(filter, grid){
        var self = this
        var modelBtn = dom.find('.top > a:last')
		modelBtn.click($.proxy(function(){
			if (this.model == 'list') {
				$('.ud_select .select .txt').hide()
				modelBtn.html('数据报表模式')
				modelBtn.addClass('b_data')
				this.model = 'pie'
			}
			else {
				$('.ud_select .select .txt').show()
				modelBtn.html('饼图模式')
				modelBtn.removeClass('b_data')
				this.model = 'list'
			}
			self.change()
		},this))
		self.flush=function(){
			       $('.ud_select .select .txt').show()
		            modelBtn.html('饼图模式')
		            modelBtn.removeClass('b_data')
		            this.model = 'list'
					if(setting.option[level].grid.hasPie==false){
						modelBtn.hide()
					}else{
						modelBtn.show()
					}
		}
		self.flush()	
    }
    function Grid(dateRange, filter, toggle){
        this.fixColModel = []
        this.flush = function(resetCol){
            var param = $.extend(true, {
				url:_baifendianDataURL,
                renderTo: dom.find('div.grid'),
                page: {
                    renderTo: dom.find('div.pager'),
                    rowList: [20, 50, 100, 200]
                }
            }, setting.option[level].grid, {
                colModel: filter.getCols()
            }, {
                data: {
                    start: global.dateRange.getStart(),
                    end: global.dateRange.getEnd(),
					keys:[],
			       values:[]
                }
            })
			if (!$.isEmptyObject(setting.option[level].grid.data)){
				for (var k in setting.option[level].grid.data) {
	                    param.data.keys.push(k)
	                    param.data.values.push(setting.option[level].grid.data[k])
	                }
			}
			param.data.type = 'grid'
            param.data.requestId = setting.id.split('_')[0]
			//层级
			if(setting.option.length>1){
				param.data['level']=level+1
				var levelData={}
				$.each(setting.option,function(i,item){
					if(i<level){
						var k=setting.option[i].grid.post_name?setting.option[i].grid.post_name:setting.option[i].filter.fixColModel.name;
						var v=setting.option[i].grid.item;
						levelData[k]=v;
					}
				})
				$('.bb_down > a').data('reportData',$.extend({'type':'grid','level':level+1,'requestId':param.data.requestId},levelData))
			}else{
				$('.bb_down > a').data('reportData',{'type':'grid','requestId':param.data.requestId})
			}
			
			if(setting.option.length>1&&level!=0){
				$.each(setting.option,function(i,item){
					if(i<level){
                        param.data.keys.push(setting.option[i].grid.post_name?setting.option[i].grid.post_name:setting.option[i].filter.fixColModel.name)
						param.data.values.push(setting.option[i].grid.item)
					}
				})
			}
            if (resetCol) {
                param['colModel'] = filter.getDefaultCols()
            }
            var cols = filter.getCols()
            if (dateRange.mode === 'compare' && toggle.model !== 'pie' && setting.option[level].grid.compareAble!==false) {
            	param.data.keys=param.data.keys.concat(['dbStart','dbEnd','groupCol','tansact'])
            	param.data.values=param.data.values.concat([global.dateRange.getDbStart(), 
            	      						              global.dateRange.getDbEnd(),
            	    									  setting.option[level].filter.fixColModel.name,
//            	    									  setting.cols[0].name,
            	    									   'dateRange'])
                 $.extend(true,param.data,
                		 {groupCol: setting.option[level].filter.fixColModel.name,//setting.cols[0].name,
						  tansact: 'dateRange'		   
						}
                 )
            }
            if (toggle.model === 'pie') {
                param['colModel'].push({
                    colName: '占比',
                    name: 'scale',
                    sortable: false
                })
                param.data['colName'] = cols[cols.length - 1].name
//                //饼图默认排序
//                param.data.keys.push('sort')
//                param.data.values.push(cols[cols.length - 1].name)
//                param.data.keys.push('sortModel')
//                param.data.values.push('desc')
                
				param.data.keys.push('colName')
				param.data.values.push(cols[cols.length - 1].name)
                param.onDataLoad = function(data){
                    if (data['countCol']) {
                        dom.data('countCol', data['countCol'].toString())
                    }
                    $.each(data.stores, function(i, item){
                        item['scale'] = (parseFloat(item[param.data['colName']].toString().replace(/,/g, '').replace('￥', '')) * 100 / parseFloat(dom.data('countCol'))).toFixed(2) + '%'
                    })
                }
                param['fixColModel'] = [{
                    colName: '饼图',
                    'name': 'pie',
                    render: function(dom, stores){
                        dom.css({
                            'vertical-align': 'top',
                            'min-width': '500px'
                        })
                        var data = [], other = 0
                        $.each(stores, function(i, item){
                            if (i > 9) {
                                return false
                            }
                            var v = parseFloat(item['scale'].replace('%', ''))
                            data.push({
                                name: item[cols[0].name],
                                y: v
                            })
                            other += v
                        })
                        if (other < 100) {
                            data.push({
                                name: '其他',
                                y: 100 - other
                            })
                        }
                        new Highcharts.Chart({
                            chart: {
                                renderTo: dom[0],
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false
                            },
                            credits: {
                                enabled: false
                            },
                            title: {
                                text: null
                            },
                            tooltip: {
                                formatter: function(){
                                    return this.point.name + '<br/> ' + '<b>' + this.y + ' %</b>';
                                }
                            },
                            plotOptions: {
                                pie: {
                                    size: '50%',
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: true,
                                        formatter: function(){
                                            return this.point.name + '<br/> ' + '<b>' + this.y + ' %</b>';
                                        }
                                    }
                                }
                            },
                            series: [{
                                type: 'pie',
                                name: '',
                                data: data
                            }]
                        });
                    }
                }]
            }
            if(!setting.option[level].grid.sort){
            	var filterCols=filter.getFilterCols()
            	if(filterCols.length>0){
            		param.sort=filterCols[0].name
            	}
            }
            $.baeGrid(param)
            
        }
        this.init = function(){
//            $.baeGrid($.extend(true, {
//														renderTo: dom.find('div.grid'),
//										                page: {
//										                    renderTo: dom.find('div.pager'),
//										                    rowList: [20, 50, 100, 200]
//                }}, setting.option[level].grid, {
//                colModel: filter.getCols()
//            }, {
//                data: {
//                    begin: dateRange.begin,
//                    end: dateRange.end
//                }
//            }))
               this.flush()
        }
        this.init()
    }
    function buildDom(){
        dom.addClass('data03').append('<div class="top">' +
		'<span style="float:left;">' +
		new Array(setting.option.length).join('<span style="display:none;"></span>')+
		'<a style="display:none;cursor:pointer;">[返回上级页面]</a>'	+
    	'</span>' +
        '<a class="userdata">自定义指标项</a>' +
        '<a class="b_pic">饼图模式</a>' +
        '</div>' +
        '<div  class="ud_select">' +
        '<div></div>' +
        '<div  class="select">' +
        '<div class="but">取消</div>' +
        '<div class="but">确认</div><div class="txt">' +
        '指标分析模式：<a  class="now">默认</a><a>订单</a><a>商品</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="grid">' +
        '</div>' +
        '<div class="pager">' +
        '</div>')
    }
    self.init = function(){
		 buildDom()
		$.each(setting.option,function(i,item){
			setting.option[i].filter.fixColModel.fixed=true
		})
		var pdom=dom
		if(setting.option.length>1){
			  $.each(setting.option,function(i,item){
			  	    if(i!=setting.option.length-1){
						item.filter.fixColModel.onRander=function(dom,store,ischild){
								if(ischild){
		                               return;
					            }
								if(!dom.data('content')){
									dom.data('content',dom.html())
								}
						        dom.css({
												color:'blue',
												cursor:'pointer'
										    }).click(function(){
												var lable=setting.option[level].grid.lable||(i==0?'':'>')
												 pdom.find('.top > span > a').show()
											    pdom.find('.top > span > span').eq(level).html(lable+dom.data('content')).show()
												setting.option[level++].grid.item=dom.data('content')
//												level++
												self.toggle.flush()
												self.filter.flush()
												self.grid.flush(true)
											})
						}
					}
			  })
			  pdom.find('.top > span > a').click(function(){
							 	if(level==1){
									$(this).hide()
								}
								pdom.find('.top > span > span').eq(--level).hide()
								self.toggle.flush()
								self.filter.flush()
								self.grid.flush(true)
					 })
		}
        self.toggle = new Toggle()
        self.filter = new GridFilter(self.toggle)
        self.grid = new Grid(global.dateRange, self.filter, self.toggle)
        self.toggle.change = function(){
            if (self.toggle.model == 'pie') {
                self.filter.hideLabelInPieDom.hide()
                self.filter.resetOption('pie')
            }
            else {
                self.filter.hideLabelInPieDom.show()
                self.filter.resetOption('list')
            }
            
            self.grid.flush()
        }
        self.filter.change = function(){
            self.grid.flush()
        }
		global.dateRange.addEventListener(function(){
			 self.grid.flush()
		})
    }
    self.init()
}
