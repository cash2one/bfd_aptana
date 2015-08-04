$.ajaxSettings.traditional = true
$(function(){
    $('.choose > li').click(function(){
        if (!$(this).hasClass('current')) {
            document.title = '内容管理-' + $(this).find('a').html()
            $(this).siblings().removeClass('current')
            $(this).addClass('current')
            $('.section').hide().eq($(this).index()).show()
        }
        if($(this).index()===2){
        	$('.reset > .left-btn').html('<a class="btn-1">取消屏蔽</a>')
        }else{
        	$('.reset > .left-btn').html('<a class="btn-1">重新采集</a><a class="btn-2">屏蔽</a>')
        }
    })
    $('.reveal > a').click(function(){
    	$('.reveal').slideUp()
    	$('.bg').css('background-image','none')
    })
})
$(function(){
	var siteId = $('#siteId').val();
	var saveImgUrl='../../ContentManager/content/!updateArticleThumbImage'//保存图片修改url
	var getImgsUrl='../../ContentManager/content/!getArticleImageList'//获取文章内图片url
	var uploadImgUrl='../../ContentManager/content/!uploadArticleThumbImage'//;jsessionid='+document.cookie.replace('JSESSIONID','')//上传图片url
	//alert(uploadImgUrl)
	var reAcUrl='../../ContentManager/content/!reCollectArticle'//重新采集url
	var shieldUrl='../../ContentManager/content/!shieldingArticle'//屏蔽url
	var unshieldUrl='../../ContentManager/content/!deshieldingArticle'//取消屏蔽url
    $.template('t0', '<tr>' +
    '<td class="center"><input type="checkbox" class="" /></td>' +
    '<td><span class="border"><img src="${img_url}" alt="" /></span></td>' +
    '<td>' +
    '<a href="${url}" class="topic" target="_blank">' +
    '<p class="info">${title}</p>' +
    '<p class="link">${uri}</p>' +
    '</a>' +
    '</td>' +
    '<td class="brn">' +
    '<a  class="btn1">更换图片</a>' +
    '<a  class="btn2">重新采集</a>' +
    '<a  class="btn3">屏蔽</a>' +
    '</td>' +
    '</tr>')
	$.template('t1', '<tr>' +
    '<td class="center"><input type="checkbox" class="" /></td>' +
    '<td><span class="border"><img src="${img_url}" alt="" /></span></td>' +
    '<td>' +
    '<a href="${url}" class="topic" target="_blank">' +
    '<p class="info">${title}</p>' +
    '<p class="link">${uri}</p>' +
    '</a>' +
    '</td>' +
    '<td class="brn">' +
    '<a  class="btn1">更换图片</a>' +
    '<a  class="btn2">重新采集</a>' +
    '<a  class="btn3">屏蔽</a>' +
    '</td>' +
    '</tr>')
	$.template('t2', '<tr>' +
    '<td class="center"><input type="checkbox" class="" /></td>' +
    '<td><span class="border"><img src="${img_url}" alt="" /></span></td>' +
    '<td>' +
    '<a href="${url}" class="topic" target="_blank">' +
    '<p class="info">${title}</p>' +
    '<p class="link">${uri}</p>' +
    '</a>' +
    '</td>' +
    '<td class="brn">' +
    '<a class="btn4">取消屏蔽</a>' +
    '</td>' +
    '</tr>')
    $.template('t3', '<tr>' +
   // '<td class="center"><input type="checkbox" class="" /></td>' +
    '<td><span class="border"><img src="${img_url}" alt="" /></span></td>' +
    '<td>' +
    '<a href="${url}" class="topic" target="_blank">' +
    '<p class="info">${title}</p>' +
    '<p class="link">${uri}</p>' +
    '</a>' +
    '</td>' +
    '<td class="brn">' +
    '{{html operate_html}}' +
    '</td>' +
    '</tr>')
	function madeList(index,opts){
		var result
		var setting={
							        container: '.section:eq('+index+') > table > tbody',
									rowList:10,
									beforeLoad:function(){
										$.ifmWidget("loading",{
								    		title:'加载中',
								    		content:'加载中...'
										})
										$('.section:eq('+index+') > table  th input:checkbox').prop('checked',false)
									},
									afterLoad:function(){ 
										$.ifmWidget("unloading")
									},
							        Model: function(i, item){
							            var self = this
							            var url = item.url
							            item.img_url=item.img_url+'?'+(+new Date)
							            item.uri = (url.indexOf("?") > 0 && url.indexOf("?") < url.indexOf("/", 7)) ? url.substring(url.indexOf("?") + 1, url.length) : url.substring(url.indexOf("/", 7), url.length)
							            self.dom = $.tmpl('t'+index, item)
							            i % 2 == 0 ? null : self.dom.addClass('color')
										self.dom.data('item',item)
							        },
							        page: {
							            container: '.section:eq('+index+') > ul'
							        },
									onPage:function(){
										$('.section:eq('+index+') > table  th:eq(0) :checkbox').attr('checked',false)
									}
							    }
		result= new List($.extend(setting,opts))
		return result
	}
    var t0=madeList(0,{url:'../../ContentManager/content/!getArticlesByPage',data:{'start':0, 'count':10}})
	var t1//=madeList(1,{url:'../../ContentManager/content/!getNoPictureArticlesByPage',data:{}})
	var t2//=madeList(2,{url:'../../ContentManager/content/!getShieldingArticlesByPage',data:{}});
    var t3
    $('.choose > li:eq(0)').click(function(){
    	if(!t0){
    		t0=madeList(0,{url:'../../ContentManager/content/!getArticlesByPage',data:{'start':0, 'count':10}})
    	}
    })
    $('.choose > li:eq(1)').click(function(){
    	if(!t1){
    		t1=madeList(1,{url:'../../ContentManager/content/!getNoPictureArticlesByPage',data:{}})
    	}
    })
    $('.choose > li:eq(2)').click(function(){
    	if(!t2){
    		t2=madeList(2,{url:'../../ContentManager/content/!getShieldingArticlesByPage',data:{}});
    	}
    })
//	$('.choose > li:eq(1)').one('click',function(){
//    	t1=madeList(1,{url:'../../ContentManager/content/!getNoPictureArticlesByPage',data:{}})
//    })
//    $('.choose > li:last').one('click',function(){
//    	t2=madeList(2,{url:'../../ContentManager/content/!getShieldingArticlesByPage',data:{}});
//    })
    /*function disableLoading(){
    	var setting
    	if($('.choose li:first').is('.current')){
    		setting=t0.getSetting()	    		
    	}else if($('.choose li:eq(1)').is('.current')){
    		setting=t1.getSetting()	   
    	}else{
    		setting=t2.getSetting()	   
    	}
    	var result={
    			beforeLoad:setting.beforeLoad,
    			afterLoad:setting.afterLoad
    	}
    	setting.beforeLoad=$.noop
    	setting.afterLoad=$.noop
    	return function(){
    		setting.beforeLoad=result.beforeLoad
    		setting.afterLoad=result.afterLoad
    	}
    }*/
	function def_oprate(def,tip,callback,unFlush){
		$.ifmWidget("loading",{
    		title:'正在操作',
    		content:'正在操作...'
		})
		def.done(function(data){
			//var enableLoading=disableLoading()
    		$.ifmWidget("tip",tip)
	    	if(!unFlush){
	    		if($('.section:first').is(':visible')){
		    		t0.flush()
		    	}else if($('.section:eq(1)').is(':visible')){
			    	t1.flush()
		    	}else if($('.section:eq(2)').is(':visible')){
		    		t2.flush()
		    	}else if($('.section:eq(3)').is(':visible')){
		    		t3.flush()
		    	}
	    	}
    		if(callback){
    			callback()
    		}
			//$('.section:visible :checkbox').attr('checked',false)
    	}).fail(function(){
    		$.ifmWidget("alertFail",{
	    		title:'操作失败',
	    		content:'操作失败'
	    	})
    	})
	}
	$('.reset > .left-btn').delegate('a:contains("重新采集")','click',function(){
		var checkedboxes=$('.section:visible').find('td :checkbox:checked')
		if(checkedboxes.size()>0){
			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
				    var ids=[],articleUrls=[]
				    checkedboxes.each(function(){
						ids.push($(this).parent().parent().data('item')['id'])
						articleUrls.push($(this).parent().parent().data('item')['url'])
//						$(this).parent().siblings(':last').html('正在重新采集...')
					})
					def_oprate($.post(reAcUrl,{ids:ids,articleUrls:articleUrls}),
							   {content:'已开始重新采集文章，<br>&nbsp;&nbsp;&nbsp;请稍后刷新页面查看。',
								muti:true
							   },$.noop,true)
				},
				title:"确认重新采集",
				content:"确定要重新采集这些篇文章吗?"
			})
		}else{
			$.ifmWidget("alertFail",{
				title:'请选择文章',
				content:'请选择文章'
			})
		}
	})
	$('.reset > .left-btn').delegate('a:contains("屏蔽"):not(a:contains("取消屏蔽"))','click',function(){
		var checkedboxes=$('.section:visible').find('td :checkbox:checked')
		if(checkedboxes.size()>0){
			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
				    var ids=[]
				    checkedboxes.each(function(){
						ids.push($(this).parent().parent().data('item')['id'])
//						$(this).parent().siblings(':last').html('<a class="btn4">取消屏蔽</a>')
					})

					def_oprate($.post(shieldUrl,{ids:ids}),{'content':'已屏蔽'},function(){
						 t2 = null
					})
				},
				title:"确认屏蔽",
				content:"确定要屏蔽这些篇文章吗?"
			})
		}else{
			$.ifmWidget("alertFail",{
				title:'请选择文章',
				content:'请选择文章'
			})
		}
	})
   $('.reset > .left-btn').delegate('a:contains("取消屏蔽")','click',function(){
		var checkedboxes=$('.section:visible').find('td :checkbox:checked')
		if(checkedboxes.size()>0){
			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
				    var ids=[]
				    checkedboxes.each(function(){
						ids.push($(this).parent().parent().data('item')['id'])
						$(this).parent().siblings(':last').html('<a class="btn1">更换图片</a><a class="btn2">重新采集</a><a class="btn3">屏蔽</a>')
					})
					def_oprate($.post(unshieldUrl,{ids:ids}),{'content':'操作成功'},function(){
						 t0 = null
					     t1 = null
					})
				},
				title:"取消屏蔽",
				content:"确定要取消屏蔽这些篇文章吗?"
			})
		}else{
			$.ifmWidget("alertFail",{
				title:'请选择文章',
				content:'请选择文章'
			})
		}
	})
	$('.section').delegate('td a:contains("取消屏蔽")','click',function(){
   			var item=$(this).parent().parent().data('item')
			 var d=$(this).parent()
   			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
					def_oprate($.post(unshieldUrl,{ids:d.parent().data('item')['id']}),{'content':'操作成功'},function(){
						 t0 = null
						 t1 = null
					})
				},
				title:"确认取消屏蔽",
				content:"确定要取消屏蔽这篇文章吗?"
			})
   })
	$('.section').delegate('td a:contains("更换图片")','click',function(){
   			var item=$(this).parent().parent().data('item')
			var d=$(this).parent()
			var albulmSetting={
				                data: $.extend({iid:item.id},sessionData),
				                q: item.title,
				                uploadUrl:uploadImgUrl,
				                defaultImage: item.img_url,
			//	                listImageUrl:getImgsUrl,
				                saveUrl:saveImgUrl,
								onSave:function(imgurl){
									item.img_url=imgurl
									d.parent().find('>td >span.border > img').attr('src',imgurl)
								}
	           }
   			if(item.defaultImages){
   				albulmSetting['defaultImages']=item.defaultImages
   			}
            d.ifmAlbum(albulmSetting)
   })
   $('.section').delegate('td span.border','click',function(){
	   if($(this).parents('tr:first').find('a:contains("更换图片")')){
		   $(this).parents('tr:first').find('a:contains("更换图片")').click()
	   }
   })
   $('.section').delegate('td a:contains("屏蔽"):not(a:contains("取消屏蔽"))','click',function(){
   	        var d=$(this).parent()
   			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
//					d.html('<a class="btn4">取消屏蔽</a>')
				    	$.ifmWidget("loading",{
				    		title:'正在操作',
				    		content:'正在操作...'
				    	})
				    	def_oprate($.post(shieldUrl,{ids:d.parent().data('item')['id']}),
								   {content:'已屏蔽'},function(){
										 t2 = null
									})
				},
				title:"确认屏蔽",
				content:"确定要屏蔽这篇文章吗?"
			})
   })
   $('.section').delegate('td a:contains("重新采集")','click',function(){
	   var dom=$(this)
	   $.ifmWidget("confirmNormal",{
			yesCallBack:function(){
				def_oprate($.post(reAcUrl,{ids:dom.parent().parent().data('item')['id'],articleUrls:dom.parent().parent().data('item')['url']}),
							{content:'已开始重新采集文章，<br>&nbsp;&nbsp;&nbsp;请稍后刷新页面查看。',
							muti:true
						   },$.noop,true)
			},
			title:"确认重新采集",
			content:"确定要重新采集这篇文章吗?"
		})
   })
   $('.section').delegate('th :checkbox','change',function(){
   	      if($(this).is(':checked')){
		  		$(this).parents('table').find('td :checkbox').attr('checked',true)
		 }else{
				$(this).parents('table').find('td :checkbox').attr('checked',false)
		}
   })
    $('.section').delegate('td :checkbox','change',function(){
   	      if($(this).is(':checked')){
		  		if($(this).parents('table').find('td :checkbox').not(':checked').size()==0){
					$(this).parents('table').find('th :checkbox').attr('checked',true)
				}
		 }else{
				$(this).parents('table').find('th :checkbox').attr('checked',false)
		}
   });
   (function(){
	   var q
	   $('.search-box2 a').click((function(){
	        q=$.trim($('.reset .search-box2 input:text').val())
					return	function(){
//			        	   if($.trim($('.reset .search-box2 input:text').val())==q){
//			        		   $.ifmWidget("alertFail",{
//				       	    		title:'请修改查询信息',
//				       	    		content:'请修改查询信息'
//				       	    	})
//			        		   return 
//			        	   }else{
			        		   q=$.trim($('.reset .search-box2 input:text').val())
//			        	   }
						   if(!t3){
							   t3=madeList(3,{url:'../../ContentManager/content/!getArticlesByTitleByPage',
								              data:{},
								              onLoad:function(data){
								            	    $.each(data.stores,function(i,item){
								            	    	if(item.isShield){
									                    	item.operate_html = '<a  class="btn1">更换图片</a>' +
														                        '<a  class="btn2">重新采集</a>' +
														                        '<a  class="btn3">屏蔽</a>'
									                    }else{
									                    	item.operate_html='<a class="btn4">取消屏蔽</a>'
									                    }
								            	    })
							                  },
							                  getData:function(){
							                	  return {q:q}
							                  }
//											  getData:(function(){
//													var q=$.trim($('.reset .search-box2 input:text').val())
//													$('.reset .search-box2 a').click(function(){
//														q=$.trim($('.reset .search-box2 input:text').val())							
//													})
//													return function(){
//														return {q:q}
//													}
//											   }()),
								             });
						   }else{
							   t3.reset()
						   } 
						   $('.choose-area').hide()
						   $('.reset .left-btn').hide()
						   $('.reset .collect').show()
						   $('.section').hide()
						   $('.section:last').show()
					   }
					})()
		  )
		  $('.collect a').click(function(){
			   $('.choose-area').show()
			   $('.reset .left-btn').show()
			   $('.reset .collect').hide()
			   $('.section').hide()
			   $('.reset .search-box2 input:text').val('')
			   q=''
			   $('.section').eq($('.choose li.current').index()).show()
		  })
		  $('.reset .search-box2 input:text').keyup(function(event){
				if(event.keyCode===13){
					$('.search-box2 a').click();
				}
			})
   })();
  
})
