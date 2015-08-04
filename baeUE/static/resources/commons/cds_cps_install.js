/**
 * @author 宁彬彬
 */
$(function(){
	$.ajaxSettings.traditional = true
	 	window.setInterval(function(){
				try{
				    $(window.parent.document).find("#function").height($("body").height());
				}catch (ex){}
			}, 20);
});
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
                grid0: {
						seq:false,
                        renderTo: '.data03:eq(0)',
                        agv_width:true,
                        beforeColSetVal:[]
                },
                grid1: {
						seq:false,
                        renderTo:  '.data03:eq(2)',
                        agv_width:true,
                        beforeColSetVal:[],
						page: {
                            renderTo: '.pager',
                            rowList: [20, 50, 100, 200]
                        }
                }
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
                $('.day_range > p > input:checkbox').attr('checked', false)
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
                }, function(){
                    $('.day_range').slideUp()
                })
                $('.day_range > p > input:checkbox').change($.proxy(function(){
                    if ($('.day_range > p > input:checkbox').is(':checked')) {
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
					if ($('.day_range > p > input:checkbox').is(':checked')) {
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
		 function Grid(dateRange,chart_setting,grid_setting){
				 	this.flush=function(resetCol){
						var param=$.extend(true,{},grid_setting,{data:{
																						begin:dateRange.begin,
																						end:dateRange.end
																					 }})										 
						$.baeGrid(param)
					}
					this.init=function(){
						this.flush()
					}
					this.init()
				 }
			
			function Install(){
				var self=this
				this.install=function(){
					        if(setting.expand){
								setting.expand.call(self,setting)
							}
							self.title=new Title()
				        	self.dateRange = new DateRange()
							self.grid0=new Grid(self.dateRange,setting.grid0.chart,setting.grid0)
							self.grid1=new Grid(self.dateRange,setting.grid1.chart,setting.grid1)							
							self.dateRange.change = function(d1, d2){
								self.grid0.flush()
								self.grid1.flush()
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
