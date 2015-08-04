/**
 * @author Administrator
 */
(function($){

    var methods = {
        init: function(opts){
            var defaults = {
                fixColModel: [],
				data:{},
                page: {
                    rowList: [20, 50, 100]
                }
            }
            var setting = $.extend(true, defaults, opts)
            var table = $('<table></table>',{
				 width:"100%", border:"0", cellspacing:"0",cellpadding:"0" ,'class':'grid'
			})
            table.appendTo($(setting.renderTo).empty())
            function Title(seq){
                this.dom = $('<tr></tr>')
                seq ? this.dom.append($('<th></th>')) : null
                function pendDom(i, item){
                    $('<th></th>', {
                        text: item.colName
                    }).appendTo(this.dom)
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
								loader.ajaxLoad(true)
							}else{
								th.siblings().removeClass('sort').removeClass('sort0')
								th.removeClass('sort0').addClass('sort')
								this.sort=item.name
								this.sortModel='desc'
								loader.ajaxLoad(true)
							}
						},this))
					}
				}, this))
                $.each(setting['fixColModel'], $.proxy(pendDom, this))
				this.dom.find('th:eq(1)').addClass('tb_index')
				this.dom.find('td:gt(0):odd').addClass('coloradd01')
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
                            tr.append($('<td></td>'))
                        })
                    }
                    return tr
                }
                this.createStruct = function(stores, init){
                    if (this.doms.length === 0) {
                        $.each(stores, $.proxy(function(i, item){
                            var tr = this.createRow(true, setting.data.groupCol)
                            if (i === 0) {
                                $.each(setting['fixColModel'], $.proxy(function(){
                                    var td = $('<td></td>')
                                    this.fixDoms = this.fixDoms.add(td)
                                    td.appendTo(tr)
                                }, this))
                            }
                            this.doms = this.doms.add(tr)
                            tr.appendTo(table)
							if(setting['fixColModel']&&i===0){
								this.fixDoms.each(function(i){
									setting['fixColModel'][i].render($(this))
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
									var d=this.createRow(true, setting.data.groupCol)
									d.appendTo(table)
                                    this.doms=this.doms.add(d)
                                },this))
                            }
                    this.fixDoms.attr('rowspan', this.doms.length)
					this.doms.find('td:gt(0):odd').addClass('coloradd02')
					this.doms.find('td:eq(0)').addClass('no')
					this.doms.find('td:eq(1)').addClass('tb_index')
                }
            }
            function LoadValue(strutor){
                this.ajaxLoad = function(seq,data){
					var param=$.extend(true,{},setting.data,{
						cols:$.map(setting['colModel'],function(i){return i.name}),
						'pager.currentItem':page.currentIndex,
						'pager.rowList':page.rowList
					},data)
					title.sort?param['pager.sort']=title.sort:null
					title.sortModel?param['pager.sortModel']=title.sortModel:null
                    $.ajax({
                        url: setting.url,
						cache:false,
                        dataType: "json",
						data:param,
                        success: $.proxy(function(data){
							if(setting.onDataLoad){
								setting.onDataLoad(data)
							}
							if(data.stores.length===0){
//								alert('没有相应数据')
								return ;
							}
                            strutor.createStruct(data.stores)
							strutor.doms=strutor.doms.not( strutor.rmDoms)
                            strutor.rmDoms.remove()
//							console.info(strutor.rmDoms)
//							console.info(strutor.rmDoms.length)
                            strutor.doms.each($.proxy(function(i){
                                this.pushLine(strutor.doms.eq(i), data.stores[i], true,i)
                            }, this))
//							$.each(data.stores,$.proxy(function(i,item){
//								 this.pushLine(strutor.doms.eq(i), item, true,i)
//							},this))
                            if (data.totalItem) {
                                page.total = data.totalItem
                            }
                            page.pageDom.data('currentStoresLenght', data.stores.length)
                            page.flushVal()
                            init()
                        }, this)
                    })
                }
                this.pushLine = function(dom, stores, seq,index){
					if(setting.beforePushLine){
						setting.beforePushLine(dom, stores, seq,index)
					}
                    $.each(setting['colModel'], function(i, item){
                        dom.children().eq(seq ? i + 1 : i).text(stores[item.name])
						seq? dom.children().eq(0).text(page.currentIndex+index):null
                    })
                    if (setting.data.groupCol) {
                        $.each(stores.group, function(i, item1){
							item1[setting.data.groupCol]=item1[setting.data.tansact]
                            var tr = strutor.createRow(true)
                            $.each(setting['colModel'], function(i, item){
                                tr.children().eq(seq ? i + 1 : i).text(item1[item.name])
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
                    loader.ajaxLoad(true)
                }, this))
                $.each(setting['page']['rowList'], $.proxy(function(i, item){
                    $('<option></option>').html(item).val(item).appendTo(this.rowListSelect)
                }, this))
                this.rowListSelect.appendTo(rowListDom)
                this.pageDom.append(rowListDom)
                //content
                var content = $('<li>第<input type="text" value=""/>项 第<span></span>项，共<span></span>项</li>')
                this.currentItem = content.find('input:eq(0)').keydown($.proxy(function(event){//当前项
                    if (event.keyCode == 8) {
                        return true;
                    }
                    if ( content.find('input:eq(0)').val() == '' && getNumKey(event.keyCode) == 0) {
                        return false
                    }
                    if (event.keyCode == 13) {
                        if (content.find('input:eq(0)').val() != '') {
                            this.currentIndex = parseInt(content.find('input:eq(0)').val())
                            loader.ajaxLoad(true)
                        }
                    }
                    if ((!(event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode == 8)) && (!(event.keyCode >= 96 && event.keyCode <= 105))) {
                        return false
                    }
                    if (parseInt(content.find('input:eq(0)').val() + getNumKey(event.keyCode)) > this.total) {
                        return false
                    }
                },this))
                this.currentItemRange = content.find('span:eq(0)')//项区间
                this.totalItem = content.find('span:eq(1)')//总共项
                this.pageDom.append(content)
                
                var pages = $('<li></li><li></li>')
                var firstPage = pages.filter('li:first').click($.proxy(function(){
                    this.currentIndex = (this.currentIndex - parseInt(this.rowList)) < 1 ? 1 : (this.currentIndex - parseInt(this.rowList))
                    loader.ajaxLoad(true)
                }, this)).addClass('ico01')
                var lastPage = pages.filter('li:last').click($.proxy(function(){
                    this.currentIndex = (this.currentIndex + parseInt(this.rowList)) >= this.total ? (this.total - parseInt(this.rowList)) : (this.currentIndex + parseInt(this.rowList))
                    loader.ajaxLoad(true)
                }, this)).addClass('ico02')
                
                this.pageDom.append(pages)
                this.pageDom.appendTo($(setting['page']['renderTo']).empty())
                this.flushVal = function(){
                    this.currentItem.val(this.currentIndex)
                    this.totalItem.html(this.total)
                    this.currentItemRange.html(this.currentIndex + '-' + (this.currentIndex + page.pageDom.data('currentStoresLenght') - 1))
                }
            }
            var title = new Title(true);
            var struct = new Structs();
            var loader = new LoadValue(struct)
            var page = new Page()
            loader.ajaxLoad(true,{'pager.init':1})
            function init(){
            
            }
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