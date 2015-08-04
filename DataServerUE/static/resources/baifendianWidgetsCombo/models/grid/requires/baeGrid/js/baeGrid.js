/**
 * @author Administrator
 */
(function($){
    var methods = {
        init: function(opts){
            var defaults = {
                fixColModel: [],
                beforeColSetVal:[],
				seq:true,
				data:{},
                page: {
                    rowList: [20, 50, 100]
                }
            }
            var setting = $.extend(true, defaults, opts)
			$(setting.renderTo).data('status','init')
            var table = $('<table></table>',{
				 width:"100%", border:"0", cellspacing:"0",cellpadding:"0" ,'class':'grid'
			})
            table.appendTo($(setting.renderTo).empty())
            function Title(seq){
                this.dom = $('<tr></tr>')
                seq ? this.dom.append($('<th style="width:30px">&nbsp;</th>')) : null
                function pendDom(i, item){
                    $('<th></th>', {
                        text: item.colName
                    }).appendTo(this.dom)
                }
				if(setting['fixColModel']&&setting['fixColInStart']){
					$.each(setting['fixColModel'], $.proxy(pendDom, this))
				}
                $.each(setting['colModel'], $.proxy(function(i,item){
					 var th= $('<th></th>', {
                        text: item.colName
                    }).appendTo(this.dom)
					if(item.sortable!=false){
						th.addClass('sortable')
						th.click($.proxy(function(){
							page.currentIndex=1
							if(th.hasClass('sort')){
								th.siblings().removeClass('sort').removeClass('sort0')
								th.removeClass('sort').addClass('sort0')
								this.sort=item.name
								this.sortModel='asc'
								loader.ajaxLoad(seq)
							}else{
								th.siblings().removeClass('sort').removeClass('sort0')
								th.removeClass('sort0').addClass('sort')
								this.sort=item.name
								this.sortModel='desc'
								loader.ajaxLoad(seq)
							}
						},this))
					}
				}, this))
				if(setting['fixColModel']&&(!setting['fixColInStart'])){
                      $.each(setting['fixColModel'], $.proxy(pendDom, this))
				}
                if(setting.agv_width){
                	seq?this.dom.find('th:gt(0)').attr('width',100/(this.dom.find('th:gt(0)').length)+'%'):this.dom.find('th').attr('width',100/(this.dom.find('th').length)+'%')
                }
				seq?this.dom.find('th:eq(1)').addClass('tb_index'):this.dom.find('th:eq(0)').addClass('tb_index')
				seq?this.dom.find('td:gt(0):odd').addClass('coloradd01'):this.dom.find('td:odd').addClass('coloradd01')
                table.append(this.dom)
            }
            function Structs(){
                this.doms = $();
                this.rmDoms = $()
                this.fixDoms = $();
                this.createRow = function(seq, group){
                    var tr = $('<tr></tr>')
                    seq ? tr.append($('<td></td>')) : null
                    if (group) {//分组模式
                        tr.append($('<td></td>', {
                            'colspan': setting['colModel'].length
                        }))
                    }
                    else {
                        $.each(setting['colModel'], function(i, item){
							var td=$('<td></td>')
							if(item['colClass']){
								td.addClass(item['colClass'])
							}
                            tr.append(td)
                        })
                    }
                    return tr
                }
                this.createStruct = function(stores, seq){
                    if (this.doms.length === 0) {
                        $.each(stores, $.proxy(function(i, item){
                            var tr = this.createRow(seq, setting.data.groupCol&&item.group)
                            if (i === 0) {
                                $.each(setting['fixColModel'], $.proxy(function(){
                                    var td = $('<td></td>')
                                    this.fixDoms = this.fixDoms.add(td)
//									if(setting['fixColModelIndex']!=undefined){
//										tr.children().eq(setting['fixColModelIndex']).insertBefore(td)
//										console.info(setting['fixColModelIndex'])
//										console.info(tr.children().eq(setting['fixColModelIndex']).length)
//									}else{
	                                    td.appendTo(tr)
//									}
                                }, this))
                            }
                            this.doms = this.doms.add(tr)
                            tr.appendTo(table)
							if(setting['fixColModel']&&i===0){
								this.fixDoms.each(function(i){
									setting['fixColModel'][i].render($(this),stores)
								})
							}
                        }, this))
                    }
                    else 
                        if (this.doms.length > stores.length) {
                            this.doms.filter(':gt(' + (stores.length-1) + ')').remove()
							this.doms=this.doms.filter(':lt(' + stores.length + ')')
                        }
                        else 
                            if (this.doms.length < stores.length) {
                                $.each(new Array(stores.length - this.doms.length), $.proxy(function(){
									var d=this.createRow(true, setting.data.groupCol&&stores[0].group)
									d.appendTo(table)
                                    this.doms=this.doms.add(d)
                                },this))
                            }
                    this.fixDoms.attr('rowspan', this.doms.length)
					seq?this.doms.find('td:gt(0):odd').addClass('coloradd02'):this.doms.find('td:odd').addClass('coloradd02')
					seq?this.doms.find('td:eq(0)').addClass('no'):null
					seq?this.doms.find('td:eq(1)').addClass('tb_index'):this.doms.find('td:eq(0)').addClass('tb_index')
                }
            }
            function LoadValue(strutor){
                this.ajaxLoad = function(seq,data){
					$(setting.renderTo).data('status','loading')
					var param=$.extend(true,{},setting.data,{
						cols:$.map(setting['colModel'],function(i){return i.name}),
						'pager.currentItem':page.currentIndex,
						'pager.rowList':page.rowList
					},data)
					title.sort?param['sort']=title.sort:null
					title.sortModel?param['sortModel']=title.sortModel:null
					if(setting.parseParam){
						param=setting.parseParam(param)
					}
                    $.ajax({
                        url: setting.url,
						cache:false,
                        dataType: "json",
						data:param,
                        success: $.proxy(function(data){
							if(setting.onDataLoad){
								setting.onDataLoad(data)
							}
							if(!data.stores||data.stores.length===0){
//								alert('没有相应数据')
								return ;
							}
                            strutor.createStruct(data.stores,seq)
							strutor.doms=strutor.doms.not( strutor.rmDoms)
                            strutor.rmDoms.remove()
                            strutor.doms.each($.proxy(function(i){
                                this.pushLine(strutor.doms.eq(i), data.stores[i], seq,i)
                            }, this))
							if(setting['fixColInStart']){
								if(setting.seq){
									strutor.fixDoms.prevAll(':last').after(strutor.fixDoms)
								}else{
								      strutor.fixDoms.prevAll(':last').before(strutor.fixDoms)
								}
							}
                            if (data.totalItem) {
                                page.total = data.totalItem
                            }
                            page.pageDom.data('currentStoresLenght', data.stores.length)
                            page.flushVal()
							$(setting.renderTo).data('status','loaded')
                        }, this) 

                    })
                }
                this.pushLine = function(dom, stores, seq,index){
					if(setting.beforePushLine){
						setting.beforePushLine(dom, stores, seq,index)
					}
                    $.each(setting['colModel'], function(i, item){
						if(item['colParse']){
							stores[item.name]=item['colParse'](stores[item.name])
						}
						$.each(setting['beforeColSetVal'],function(i,f){
							f( dom.children().eq(seq ? i + 1 : i),stores,item.name)
						})
						var coldom=$('<span></span>')
						coldom.html((stores[item.name]||stores[item.name]==0)?stores[item.name]:'')
                        dom.children().eq(seq ? i + 1 : i).empty().append(coldom)
						if(item.onRander){
							item.onRander(coldom,stores,false)
						}
                    })
                    seq? dom.children().eq(0).html(page.currentIndex+index):null
                    if (setting.data.groupCol&&stores.group) {
                        $.each(stores.group, function(i, item1){
							item1[setting.data.groupCol]=item1[setting.data.tansact]
                            var tr = strutor.createRow(true)
							
							tr.find('td:gt(0):odd').addClass('coloradd02')
//					        tr.find('td:eq(0)').addClass('no')
//					        tr.find('td:eq(1)').addClass('tb_index')
							
                            $.each(setting['colModel'], function(i, item){
								var coldom=$('<span></span>')
								coldom.html((item1[item.name]||item1[item.name]==0)?item1[item.name]:'')
                                tr.children().eq(seq ? i + 1 : i).empty().append(coldom)
								if(item.onRander){
									item.onRander(coldom,stores,true)
								}
                            })
                            dom.after(tr)
                            strutor.rmDoms = strutor.rmDoms.add(tr)
                            strutor.fixDoms.attr('rowspan', parseInt(strutor.fixDoms.attr('rowspan')) + 1)
                        })
                    }
                }
            }
            function Page(){
                this.currentIndex = 1
                this.rowList = setting['page']['rowList'][0]
                
                this.pageDom = $("<ul></ul>")
                
                //显示的条数
                var rowListDom = $('<li></li>');
                rowListDom.html('显示条数')
                this.rowListSelect = $('<select></select>').change($.proxy(function(){
                    this.rowList = this.rowListSelect.val()
					this.currentIndex=1
//                    loader.ajaxLoad(true)
					 loader.ajaxLoad(setting.seq)
                }, this))
                $.each(setting['page']['rowList'], $.proxy(function(i, item){
                    $('<option></option>').html(item).val(item).appendTo(this.rowListSelect)
                }, this))
                this.rowListSelect.appendTo(rowListDom)
                this.pageDom.append(rowListDom)
                //content
                var content = $('<li>第<span>1</span>页，共<span>1</span>页</li>')
                this.currentItemRange = content.find('span:eq(0)')//页
                this.totalItem = content.find('span:eq(1)')//总共页
                this.pageDom.append(content)
                
                var pages = $('<li></li><li></li>')
                var firstPage = pages.filter('li:first').click($.proxy(function(){
					if(this.currentIndex - parseInt(this.rowList) < 1){
						return false;
					}
                    this.currentIndex =this.currentIndex - parseInt(this.rowList)
                    //                    loader.ajaxLoad(true)
					 loader.ajaxLoad(setting.seq)
                }, this)).addClass('ico01')
                var lastPage = pages.filter('li:last').click($.proxy(function(){
					if((this.currentIndex + parseInt(this.rowList)) > this.total){
						return false;
					}
                    this.currentIndex =  (this.currentIndex + parseInt(this.rowList))
                    //                    loader.ajaxLoad(true)
					 loader.ajaxLoad(setting.seq)
                }, this)).addClass('ico02')
                
                this.pageDom.append(pages)
                this.pageDom.appendTo($(setting['page']['renderTo']).empty())
                this.flushVal = function(){
					var showLines= parseInt(this.rowListSelect.val())
                    this.totalItem.html(Math.ceil(parseInt(this.total)/showLines))
                    this.currentItemRange.html(Math.ceil(parseInt(this.currentIndex)/showLines))
                }
            }
            var title = new Title(setting.seq);
            var struct = new Structs();
            var loader = new LoadValue(struct)
            var page = new Page()
            loader.ajaxLoad(setting.seq,{'init':1})
        }
    };
    
    $.baeGrid = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else 
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            }
            else {
                $.error('Method ' + method + ' does not exist on jQuery.baeGrid');
            }
    };
})(jQuery);