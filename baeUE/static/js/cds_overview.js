/**
 * @author Administrator
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
	
	Number.prototype.fixMoney = function(){
                    return this.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")
    }
	function G(){//漏斗图
		var self=this
		this.flush=function(){
			$('.tubiao07 > ul >li').find('strong:first').each(function(){
				     $(this).numberScroll({
                            random: function(){
                                return parseInt((Math.random() * 1000000)).fixMoney()
                            }
                        })
			})
			$('.tubiao07 > ul >li').find('strong:last:not(#SESSION)').each(function(){
				 $(this).numberScroll({
                            random: function(){
                                return parseInt(Math.random() * 100)+','+parseInt(Math.random() * 100) + '%'
                            }
                        })
			})
			$.ajax({
				       type: "GET",
                        url: "../grid/dataBrief.action",
                        data: {
                            'date': $('.data_select select').val(),
                            'pager.code':100018
                        },
                        dataType: "json",
                        success: function(data){
							$('.tubiao07 > ul >li').find('strong:first').each(function(){
								$(this).numberScroll('stop')
							})
							$('.tubiao07 > ul >li').find('strong:last:not(#SESSION)').each(function(){
								$(this).numberScroll('stop')
							})
							for (var k in data) {
                                $('#' + k).html(data[k])
                            }
							$('#SHOW_RATE,#CLICK_RATE,#ORDER_COUNT_RATE').each(function(){
                            	var d=$(this).html()
                            	$(this).html((parseFloat(d)*100).toFixed(2)+'%')
                            })
						}
			})
		}
		this.flush()
	}
	function C(){//chart
		var self=this
		function getUrl(){
			     var url = '../chart/dbLine.action' + '?' +
                    $.param( {
                        'date': $('.data_select select').val(),
                        'chartId': $('.data03 > .tab a.active').attr('value')
                    })
				 return url	
		}
		this.flush=function(){
			$('#chart').baeLineChart('setData', getUrl())
		}
		this.init=function(){
			$('#chart').baeLineChart({
				           dataSource: getUrl(),
                           width: '100%',
                           hight: 288
			})
		}
		this.init()
	}
	function L(){//lenged
		this.flush=function(){
			$('.data_info_header strong').each(function(){
				    $(this).numberScroll({
                            random: function(){
                                return parseInt(Math.random() * 10)+','+parseInt(Math.random() * 100)
                            }
                        })
			})
			$.ajax({
			 	type: "GET",
                url: "../grid/dataBrief.action",
                data: {
                     'date': $('.data_select select').val(),
                     'pager.code': $('.data03 > .tab a.active').attr('value')
                },
                dataType: "json",
                success: function(data){
					$('.data_info_header strong').each(function(){
						$(this).numberScroll('stop')
					})
					$('.data_info_header strong:eq(0)').html(data[1])
					$('.data_info_header strong:eq(1)').html(data[0])
					var f0=parseFloat(data[1])
					var f1=parseFloat(data[0])
                    if(f0<=f1){
						$('.baifenbi > div:eq(2)').hide()
					}else{
						$('.baifenbi > div:eq(2)').show()
					}
					$('.baifenbi > div:eq(2) span').html('推荐优化效果'+Math.round((f1/f0)*100)+'%')
					f0=(f0/(f0+f1))*100
					f1=100-f0
					$('.baifenbi > div:eq(0)').css('width',f0+'%')
					$('.baifenbi > div:eq(1)').css('width',f1+'%')
					$('.baifenbi > div:eq(2)').css('left',$('.baifenbi div:eq(0)').width()-72.5)
				}
			 })	
		}
		$(window).resize(function(){
						$('.baifenbi div:eq(2)').css('left',$('.baifenbi div:eq(0)').width()-72.5)
		})
		this.flush()
	}
	var g=new G()
	var l=new L()
	var c=new C()
	$('.tab > ul > li > a').click(function(){
		if(!$(this).hasClass('active')){
			$('.tab > ul > li > a').removeClass('active')
			$(this).addClass('active')
			$('.tushi:eq(0) span').html('推荐'+$(this).find('span').html())
			$('.tushi:eq(1) span').html('非推荐'+$(this).find('span').html())
			l.flush()
			c.flush()
		}
	})
	$('.data_select select').change(function(){
		    g.flush()
			l.flush()
			c.flush()
	})
})