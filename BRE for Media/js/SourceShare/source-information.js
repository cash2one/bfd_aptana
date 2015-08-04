$(function(){
	var siteId = $("#siteId").val();
    $.template('t','<div class="article-list">'+
							'<div class="con">'+
							'<span class="article-list-img">'+
							'<a ><img  src="${img_url}"></a>'+
							'</span>'+
							'<div class="article-list-content">'+
							'<h3><a href="${url}" target="_blank">${title}</a></h3>'+
							'<p class="summary2">${content}</p>'+
							'</div>'+
							'</div>'+
							'</div>')
	var url='';						
	$('.nav3 > ul > li:not(.ml24)').each(function(){
		$('#list > div').append('<div style="float:left;width:873px;min-height:1005px;"></div>')
	})
	$('#list').scrollable()
	var api=$('#list').data('scrollable')
	function madeList(opts){
		var setting={
				 	  url:"../../SourceShare/source/!getArticleListByTag?siteId="+siteId,
				 	  async:false,
					  beforeLoad:function(){
										$.ifmWidget("loading",{
								    		title:'加载中',
								    		content:'加载中...'
										})
									},
					  afterLoad:function(self){ 
										$.ifmWidget("unloading")
										$('#list').css('height',self.container.children().size()*201+'px')
									},
					  Model: function(i, item){
					  	                var self = this
							            self.dom = $.tmpl('t', item)
					  }				
		}
		result= new List($.extend(setting,opts))
		return result
	}
	 $('.nav3 > ul > li:not(.ml24)').click(function(){
		if(!$(this).find('a').hasClass('curr')){
			 $('.nav3 > ul > li:not(.ml24)').find('a').removeClass('curr')
			 $(this).find('a').addClass('curr')
		}
	})
   $('.nav3 > ul > li:not(.ml24)').each(function(i){
	   		  $(this).click(function(){
	   			        if(!$(this).data('c_list')){
	   			        	$(this).data('c_list',madeList({ container:$('#list > div > div').eq(i),data:{q:$(this).find('a').html()}}))
	   			        }
	   			        $('#list').css('height',$('#list > div >div').eq(i).children().size()*201+'px')
						api.seekTo(i)
			  })
			  
   })
   $('.nav3 > ul > li:not(.ml24)').eq(0).data('c_list',madeList({ container:$('#list > div > div').eq(0),data:{q:'热门文章'}}))
   /*//wyx
   $('.s-title').delegate('a.contains("申请交换")','click',function(){

	   
	 })	*/
   
})

$(function(){
    function renderArc(rander, value){
        var v=(-0.5+2*value)*Math.PI
        var renderer = new Highcharts.Renderer(rander[0], 172, 172);
        renderer.arc(86, 86, 86, 54, -Math.PI / 2, Math.PI * 1.5).attr({
            fill: '#ECECEC',
            stroke: 'black',
            'stroke-width': 0
        }).add();
        renderer.arc(86, 86, 86, 54, -Math.PI / 2, v).attr({
            fill: '#03A4DA',
            stroke: 'black',
            'stroke-width': 0
        }).add();
       renderer.text(Math.round(value * 100) + '%',Math.round(value * 100)>10?60:70, 96).css({
                        fontSize: '30px'
                    }).add()
    }
   renderArc($('#chart'),parseFloat($('#chart').data('value')))
})

/*var siteId = $("#siteId").val();
function applyExchangeFlow(a) {
	
	$.post("../../SourceShare/source/!applyExchangeFlow", {"beApplicationId":siteId}, function(data) {
		alert(data);
	})
}

function cancleExchangeFlow(a) {
	
	//$.post("../../SourceShare/source/!applyExchangeFlow", {"beApplicationId":siteId}, function(data) {
		alert("dd");
	//})
}*/

$(function(){
	var sendDom=$('#sendMessageDialog')
	$('#sendMessage').click(function(){
		$.blockUI({
			message:sendDom,
			css:{
				width:'374px',
				border: 'none',
			    top:  ($(window).height() - 234) /2 + 'px'
			},
			overlayCSS:{opacity: 0}	
		})
	})
	function getLength(value){
		var length = value.length;
        for (var i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) > 255){ // 127) {
                length++;
            }
        }
        return length
	}
	function letterEvent(dom,opts){
		var defaults={postData:{},callback:$.noop}
		var setting=$.extend(defaults,opts)
		dom.find('textarea').keyup(function(){
			  var l=getLength($.trim($(this).val()))
			  if(l<=600&&l!=0){
			  	   dom.find('.tex').text('还可以输入'+Math.floor((600-l)/2)+'字').css('color','#B8B7B7')
			       dom.find('.fr > a').removeClass('grey-btn1').addClass('blue-btn1')
			  }else{
				  if(l>600){
					  dom.find('.tex').text('已超过'+Math.ceil((l-600)/2)+'字').css('color','#E44443')
				  }else{
					  dom.find('.tex').text('还可以输入300字')
				  }
				  dom.find('.fr > a').removeClass('blue-btn1').addClass('grey-btn1')
			  }
		}).keyup().focus()
		dom.find('.fr > a').click(function(){
				var textarea=dom.find('textarea')
				if(getLength($.trim(textarea.val()))<=600&&$.trim(textarea.val()).length!=0){
					$.ifmWidget("loading",{
			    		title:'正在操作',
			    		content:'正在操作...'
					})
					$.post('../../SiteManager/msg/!sendMsg',{'content':textarea.val(),'siteid':$('#sendMessage').data('siteid')}).done(function(data){
						 if(data.success){
							  $.ifmWidget("alertSuccess",{
						    		title:'发送成功',
						    		content:'发送成功',
						    		callBack:function(){
						    			dom.find('textarea').val('').keyup()
						    		}
						    	})
						  }else{
							  $.ifmWidget("alertFail",{
						    		title:'发送失败',
						    		content:'发送失败'
						    	})
						  }
					})
				}else{
					textarea.highlightFade({
						                            	 start:'#E44443',
						                            	 speed:500,
														 complete:function(){
														 	textarea.highlightFade({
																start:'#E44443',
						                            	        speed:500
															})
														 }
						                             })
				}
			})
			dom.find('.fl-title > a').add(dom.find('em')).click($.unblockUI)
	}
	letterEvent($('#sendMessageDialog'))
})
$(function(){
	$('.fl-content3 > div').eq($('#sendMessage').data('blackstatu')).show()
	$('.fl-content3 > div:eq(1) a.link').click(function(){
		  var dom=$(this)
		  $.ifmWidget("confirmNormal",{
				yesCallBack:function(){
					$.ifmWidget("loading",{
			    		title:'正在操作',
			    		content:'正在操作...'
					})
					$.post('../../SiteManager/black/!removeBlack',{'siteid':$('#sendMessage').data('siteid')},function(data){
						if(data.success||data.code==0){
							$('.fl-content3 > div').hide().eq(0).show()
							$('#sendMessage').click()
						}else{
							$.ifmWidget("alertFail",{
					    		title:'解除失败',
					    		content:'解除失败'
					    	})
						}
					})
				},
				title:"确认解除",
				content:"确认解除?"
			})
	})
	$('.fl-content3 > div:last a.link').click(function(){
		  var dom=$(this)
		  $.ifmWidget("confirmNormal",{
				yesCallBack:function(){
					$.ifmWidget("loading",{
			    		title:'正在操作',
			    		content:'正在操作...'
					})
					$.post('../../SiteManager/black/!removeBlack',{'siteid':$('#sendMessage').data('siteid')},function(data){
						if(data.success||data.code==0){
							$('.fl-content3 > div').hide().eq(2).show()
							$('#sendMessage').click()
						}else{
							$.ifmWidget("alertFail",{
					    		title:'解除失败',
					    		content:'解除失败'
					    	})
						}
					})
				},
				title:"确认解除",
				content:"确认解除?"
			})
	})
})
$(function(){	
	$('.s-title').delegate('span','click',function(){
		var dom=$(this)
		var text=dom.find('a').html()
		if(text=='申请交换'){
			 $.ifmWidget("confirmNormal",{
					yesCallBack:function(){
						$.ifmWidget("loading",{
				    		title:'正在操作',
				    		content:'正在操作...'
						})
						$.post('../../SourceShare/source/!applyExchangeFlow',{'beApplicationId':dom.parent().data('siteid')},function(data){
							if(data.success||data==0){
								$.ifmWidget("unloading")
								var newDom=$('<span class="white-btn"><a>已申请</a></span>')
								newDom.appendTo(dom.parent())
	                            dom.remove()
							}else{
								$.ifmWidget("alertFail",{
						    		title:'申请交换失败',
						    		content:'申请交换失败'
						    	})
							}
						})
					},
					title:"确认申请交换",
					content:"确认申请交换?"
			})
		}else if(text=='取消交换'){
			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
					$.ifmWidget("loading",{
			    		title:'正在操作',
			    		content:'正在操作...'
					})
					$.post('../../SourceShare/source/!cancelExchangeFlow',{'applicationId':dom.parent().data('siteid')},function(data){
						if(data.success||data==0){
							$.ifmWidget("unloading")
							var newDom=$('<span class="white-btn"><a>已取消</a></span>')
							newDom.appendTo(dom.parent())
                            dom.remove()
						}else{
							$.ifmWidget("alertFail",{
					    		title:'取消失败',
					    		content:'取消失败'
					    	})
						}
					})
				},
				title:"确认取消交换",
				content:"确认取消交换?"
			})
		}else if(text=='通过'){
			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
					$.ifmWidget("loading",{
			    		title:'正在操作',
			    		content:'正在操作...'
					})
					$.post('../../SourceShare/source/!agreeExchangeFlow',{'applicationId':dom.parent().data('siteid')},function(data){
						if(data.success||data==0){
							$.ifmWidget("unloading")
							var newDom=$('<span class="white-btn"><a>已通过</a></span>')
							var parent = dom.parent()
							parent.find("span").remove()
							newDom.appendTo(parent)
						}else{
							$.ifmWidget("alertFail",{
					    		title:'通过交换申请失败',
					    		content:'通过交换申请失败'
					    	})
						}
					})
				},
				title:"确认通过交换申请",
				content:"确认通过交换申请?"
			})
		}else if(text=='拒绝'){
			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
					$.ifmWidget("loading",{
			    		title:'正在操作',
			    		content:'正在操作...'
					})
					$.post('../../SourceShare/source/!refuseExchangeFlow',{'applicationId':dom.parent().data('siteid')},function(data){
						if(data.success||data=="0"){
							$.ifmWidget("unloading")
							var newDom=$('<span class="white-btn"><a>已拒绝</a></span>')
							var parent = dom.parent()
							parent.find("span").remove()
							newDom.appendTo(parent)
						}else{
							$.ifmWidget("alertFail",{
					    		title:'拒绝失败',
					    		content:'拒绝失败'
					    	})
						}
					})
				},
				title:"确认拒绝交换",
				content:"确认拒绝交换?"
			})
		}
	})
})