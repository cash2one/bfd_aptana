$.ajaxSettings.traditional = true
$(function(){
  $('.section > div:gt(1)').hide();
  $('.choose > li').click(function(){
	  if(!$(this).hasClass('current')){
		  var t = $(this).find('a').html()
		  if(t.indexOf("(")>0){
			  t = t.substr(0,t.indexOf("("));
		  }
		  document.title = '消息-' + t
		  $(this).siblings().removeClass('current')
		  $(this).addClass('current')
		  $('.blacklist').removeClass('current')
		  $('.section > div:gt(0)').hide().eq($(this).index()).show()
	  }
  })
  $('.blacklist').click(function(){
		  document.title = '消息-黑名单'
  })
//  $('.blacklist').click(function(){
//	  if(!$(this).hasClass('current')){
//		  $('.choose > li').removeClass('current')
//		  $(this).addClass('current')
//		  $('.section > div:gt(0)').hide();
//		  $('#m2').show();
//	  }
//  })
  $.template('sysMessage', '<li>'
		    		+'<div class="dialog">'
		    		+'<div>'
		    		+'<input type="checkbox">'
		    		+'</div>'
		    		+'<p>${content} </p>'
		    		+'<span class="date">${date}</span>'
		    		+'<span class="time">${time}</span>'
		    		+'</div>'
		    		+'<span class="d-right">'
		    		+'<a class="x" style="display:none;">&nbsp;</a>'
		    		+'</span>'
		    		+'</li>');
  $.template('letter','<li>'+
					  '<span class="d-left">'+
					  '<div>'+
					  '<input type="checkbox">'+
					  '<span class="name"><a href="../../SourceShare/source/!showSiteInformation?otherId=${siteid}">${sitename}</a>(<span>${msgNum}</span>)</span>'+
					  '</div>'+
					  '<p>${content}</p>'+
					  '</span>'+
					  '<span class="d-right">'+
					  '<span class="date">${date}</span>'+
			    	  '<span class="time">${time}</span>'+
					  '<a style="display:none;" class="x">&nbsp;</a>'+
					  '</span>'+
					  '</li>')
  $.template('letter_sent','<div style="display: block;">'+
				  '<div class="all-dialog"><a> &lt;&lt; 返回所有私信 </a></div>'+
				  '<ul class="dialog-box padding-bottom39">'+
				  '<li class="h266">'+
				  '<div style="display:none;">'+
				  '<div class="top">'+
				  '<span class="send">发私信给：${sitename}</span>'+
				  '<a class="join">加入黑名单</a>'+
				  '</div>'+
				  '<textarea class=""></textarea>'+
				  '<div class="bottom">'+
				  '<em>还可以输入300字</em>'+
				  '<a class="send-btn" style="margin-right:0px;">发 送</a>'+
				  '</div>'+
				  '</div>'+
				  '<div  style="display:none;">'+
				  '<span class="d-tip">提示：已将对方加入黑名单[<a  class="link">解除</a>]'+
				  '</span>'+
				  '</div>'+
				  '<div  style="display:none;">'+
				  '<span class="d-tip">提示：抱歉，根据对方设置，你暂时不能给对方发送私信哦~'+
				  '</span>'+
				  '</div>'+
				  '<div  style="display:none;">'+
				  '<span class="d-tip">提示1：抱歉，根据对方设置，你暂时不能给对方发送私信哦~&nbsp;&nbsp;&nbsp;&nbsp;提示2：已将对方加入黑名单[<a  class="link">解除</a>]'+
				  '</span>'+
				  '</div>'+
				  '</li>'+
				//  '<li>loading</li>'+
				  '</ul>'+
				  '<div class="show-more">显示更早记录 ↓</div>'+
				  '</div>')						  
  $.template('letter_detail','<li>'+
							  '<span class="d-left">'+
							  '<div>'+
							  '<span class="name">{{html sendername}}</span>'+
							  '</div>'+
							  '<p>${content}</p>'+
							  '</span>'+
							  '<span class="d-right">'+
							  '<span class="date">${date}</span>'+
							  '<span class="time">${time}</span>'+
							 // '<a style="visibility:hidden;" class="x" style="display:none;">&nbsp;</a>'+
							  '</span>'+
							  '</li>')
  function watch(obj,proty,listener,rate){
		var value=obj[proty]
		setInterval(function(){
			if(obj[proty] != value){
				listener(value,obj[proty])
				value=obj[proty]
			}
		},rate||500);
  };
  var mc;
  var mergeMC=function(messagesCount,unReadMessagesCount,lettersCount,unReadLettersCount){
	  var buildMC=function(messagesCount,unReadMessagesCount,lettersCount,unReadLettersCount){
			var _mc={}
			watch(_mc,'messagesCount',function(oldval,newval){
				$('#m0 > div.all-dialog').html('共有'+newval+'条系统通知')
			})
			watch(_mc,'unReadMessagesCount',function(oldval,newval){
				$('ul.choose > li:first > a').html('系统通知('+newval+')')
				if(_mc['unReadMessagesCount']<1&&_mc['unReadLettersCount']<1){
					 $('.top > ul > li > a:contains("消息")').removeClass('bg')
				}else{
					$('.top > ul > li > a:contains("消息")').addClass('bg')
				}
			})
			watch(_mc,'lettersCount',function(oldval,newval){
				$('#m1 > div.all-dialog').html('共有'+newval+'条私信')
			})
			watch(_mc,'unReadLettersCount',function(oldval,newval){
				$('ul.choose > li:last > a').html('私信('+newval+')')
				if(_mc['unReadMessagesCount']<1&&_mc['unReadLettersCount']<1){
					 $('.top > ul > li > a:contains("消息")').removeClass('bg')
				}else{
					$('.top > ul > li > a:contains("消息")').addClass('bg')
				}
			})
		   _mc['messagesCount']=messagesCount
		   _mc['unReadMessagesCount']=unReadMessagesCount
		   _mc['lettersCount']=lettersCount
		   _mc['unReadLettersCount']=unReadLettersCount
		   return _mc
	  }
	  if(!mc){
		  mc=buildMC(messagesCount,unReadMessagesCount,lettersCount,unReadLettersCount)
	  }else{
		  mc['messagesCount']=messagesCount
		  mc['unReadMessagesCount']=unReadMessagesCount
		  mc['lettersCount']=lettersCount
		  mc['unReadLettersCount']=unReadLettersCount
	  }
  }
  function getLength(value){
		var length = value.length;
      for (var i = 0; i < value.length; i++) {
          if (value.charCodeAt(i) > 255){ // 127) {
              length++;
          }
      }
      return length
  }
  function buildSendDom(item,parentDom){
	  var oprateString=[]
	  var dom = $.tmpl('letter_sent',item)
	  dom.find('textarea').keyup(function(){
		      var l=getLength($.trim($(this).val()))
			  if(l<=600&&l!=0){
			  	   dom.find('.bottom > em').text('还可以输入'+Math.floor((600-l)/2)+'字').css('color','#B8B7B7')
			       //没有灰色按钮,所以注掉了下面一往
			  	   // dom.find('.bottom > a').removeClass('grey-btn1').addClass('send-btn')
			  }else{
				  if(l>600){
					  dom.find('.bottom > em').text('已超过'+Math.ceil((l-600)/2)+'字').css('color','#E44443')
				  }else{
					  dom.find('.bottom > em').text('还可以输入300字')//.text('输入文字')
				  }
				//没有灰色按钮,所以注掉了下面一往
				 // dom.find('.bottom > a').addClass('grey-btn1').removeClass('send-btn')
			  }
		}).keyup().focus()
	  dom.find('a.send-btn').click(function(){
		  var textarea=dom.find('textarea')
			if(getLength($.trim(textarea.val()))<=600&&$.trim(textarea.val()).length!=0){
				$.ifmWidget("loading",{
		    		title:'正在操作',
		    		content:'正在操作...'
				})
				$.post('../../SiteManager/msg/!sendMsg',{'content':textarea.val(),'siteid':item['site.id']}).done(function(data){
					 if(data.success){
						 $.ifmWidget('unloading')
						    var d=new Date() 
					    	var newLetterDetailDom=$.tmpl('letter_detail',{
					    		sendername:'我',
					    		content:textarea.val(),
					    		date:formatDate(d,'Y/m/d').replace(/\/(0)(\d)\//,'/$2/'),
					    		time:formatDate(d,'H:M')	
					    	})
					    	
					        parentDom.find('span.date').text(formatDate(d,'Y/m/d').replace(/\/(0)(\d)\//,'/$2/'))
					    	parentDom.find('span.time').text(formatDate(d,'H:M'))
					        
					    	item.content= "我："+$.trim(textarea.val())
					    	parentDom.find('span > p').text(item.content)
					    	
					    	item.msgNum+=1
					    	parentDom.find('span.name > span').html(item.msgNum)
					    	
					    	textarea.val('').keyup()
					    	dom.find('ul > li:first').after(newLetterDetailDom)
					    	dom.find('ul').find('li:gt(0)').removeClass('color')
					    	dom.find('ul').find('li:gt(0):odd').addClass('color')
					    	
					    	newLetterDetailDom.highlightFade({
									                           	 start:'#1d953f',
									                        	 speed:500,
																 complete:function(){
																	 newLetterDetailDom.highlightFade({
																		start:'#1d953f',
									                        	        speed:500
																	})
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
	  dom.find('a.join').click(function(){
		  $.ifmWidget("loading",{
	    		title:'正在操作',
	    		content:'正在操作...'
			})
		  $.post('../../SiteManager/black/!addBlack',
				  {'siteid':item['site.id']},
				  function(data){
					  if(data.success||data.code==0){
						  $.ifmWidget("alertSuccess",{
					    		title:'加入成功',
					    		content:'已将对方加入黑名单',
				    			callBack:function(){
					    			dom.find('li.h266 > div').hide().eq(1).show()
					    		}
					    	})
					  }
					  else{
						  $.ifmWidget("alertFail",{
					    		title:'加入失败',
					    		content:'加入失败'
					    	})
					  }
				  })
	  })
	  dom.find('a.link').click(function(){
		  $.ifmWidget("loading",{
	    		title:'正在操作',
	    		content:'正在操作...'
			})
		  $.post('../../SiteManager/black/!removeBlack',
				  {'siteid':item['site.id']},
				  function(data){
					  if(data.success||data.code==0){
						  $.ifmWidget("alertSuccess",{
					    		title:'解除成功',
					    		content:'已将对方解除黑名单',
					    		callBack:function(){
					    			dom.find('li.h266 > div').hide().eq(0).show()
					    		}
					    	})
					  }else{
						  $.ifmWidget("alertFail",{
					    		title:'解除失败',
					    		content:'解除失败'
					    	})
					  }
				  })
	  })
	  dom.find('li.h266 > div').eq(item.blackStatu).show()
	  var ctime
	  function getDetail(url){
		  var loadingDom=$('<li>loading</li>')
		  dom.find('ul').append(loadingDom)
		  $.get(url||'../../SiteManager/msg/!getMsgDetail',{'siteid':item['site.id'],timeline:ctime}).done(function(data){
			  loadingDom.remove()
			  $.each(data.stores,function(i,item){
				  if(i==data.stores.length-1){
					  ctime=item.time.time
				  }
				  var date=(item.time.year+1900)+'/'+(item.time.month+1)+'/'+item.time.date
				    var time=item.time.hours+':'+item.time.minutes
				    item.date=date
				    item.time=time
				  item.senderid=item['sender.id']
				  item.sendername=item.fromMe?'我':('<a href="../../SourceShare/source/!showSiteInformation?otherId='+item.senderid+'">'+item['sender.name']+'</a>')
			  })
			  if(data.stores.length<20){
				  dom.find('.show-more').unbind().html('没有更早的记录了')
			  }
			  if(data.stores.length>0){
				  $.tmpl('letter_detail',data.stores).appendTo(dom.find('ul'))
				  dom.find('ul').find('li:gt(0):odd').addClass('color')
			  }
		  })
	  }
	  getDetail()
	  dom.find('.show-more').click(function(){
		  getDetail('../../SiteManager/msg/!getMoreMsg')
	  })
	 
	  return dom
  }
  var m0,m1,m2
  function MadeM0(){
	  m0=new List({
		  container:'#m0 > ul',
		  url:'../../SiteManager/msg/!systemMsg',
		  rowList:10,
		  onLoad:function(data){
			  /*$('#m0 > div.all-dialog').html('共有'+data.totalItem+'条系统通知')
			  if(data.unreadNum==0){
				  $('ul.choose > li:first > a').html('系统通知')
			  }else{
				  $('ul.choose > li:first > a').html('系统通知('+data.unreadNum+')')
			  }*/
			  data.totalItem=data.mc
			  mergeMC(data.mc,data.umc,data.lc,data.ulc)
			  if(data.stores&&data.stores.length>0){
				  $('#m0 > div.click').show()
			  }else{
				  $('#m0 > div.click').hide()
			  }
		  },
		  Model:function(i,item){
			    var self=this
			    var date=(item.time.year+1900)+'/'+(item.time.month+1)+'/'+item.time.date
			    var time=item.time.hours+':'+item.time.minutes
			    item.date=date
			    item.time=time
			    self.dom=$.tmpl('sysMessage',item)
			    self.dom.data('item',item)
			   i%2==0?null:self.dom.addClass('color')
			   if(item.state===0){
				   self.dom.addClass('unread')
			   }		   
		  },
		  page:{
			  container:'#m0 > .click ul'
		  }
	  })
  }
  function MadeM1(){
	  m1=new List({
		  container:'#m1 > ul',
		  url:'../../SiteManager/msg/!privateMsg',
		  onLoad:function(data){
			  /*
			  $('#m1 > div.all-dialog').html('共有'+data.totalItem+'条私信')
			  if(data.unreadNum==0){
				  $('ul.choose > li:last > a').html('私信')
			  }else{
				  $('ul.choose > li:last > a').html('私信('+data.unreadNum+')')
			  }
			  */
			  data.totalItem=data.lc
			  mergeMC(data.mc,data.umc,data.lc,data.ulc)
			  
			  if(data.stores&&data.stores.length>0){
				  $('#m1 > div.click').show()
			  }else{
				  $('#m1 > div.click').hide()
			  }
		  },
//		  testData:{"totalItem":100,"stores": [{"content":'测试测试测试'},{"content":10},{"content":10}]},
		  Model:function(i,item){
			    var self=this
			    var date=(item.time.year+1900)+'/'+(item.time.month+1)+'/'+item.time.date
			    var time=item.time.hours+':'+item.time.minutes
			    item.date=date
			    item.time=time
			    item.siteid=item['site.id']
			    item.sitename=item['site.name']
			    if(item.fromMe){
			    	item.content= "我："+item['content'];
			    }
			    self.dom=$.tmpl('letter',item)
			    self.dom.data('item',item)
			   i%2==0?null:self.dom.addClass('color') 
			    if(item.unreadNum){
			    	self.dom.addClass('unread')
			    }
		  },
		  page:{
			  container:'#m1 > .click ul'
		  }
	  })
  }
  if($('.choose > li:first').hasClass('current')){
	  $('#m0').show()
	  MadeM0()
//	  $('.choose > li:last').one('click',function(){
//		  MadeM1()
//	  })
  }else{
	  $('#m').show()
	  MadeM1()
	  $('.choose > li:first').one('click',function(){
		  MadeM0()
	  })
  }
  //每次切到私信都重新加载,以防黑名单解除问题
  $('.choose > li:last').click(function(){
	  if(!m1){
		  MadeM1()
	  }else{
		  m1.reset()
	  }
  })
  
  $('#m0 >ul').delegate('a.x','click',function(){
//	  var checkedboxes=$(this).parents('.ul').find('td :checkbox:checked')
	  var pdom=$(this).parents('li')
//	  if(pdom.find(':checkbox:first').is(':checked')){
		  $.ifmWidget("confirmNormal",{
				yesCallBack:function(){
					
				    $.post('../../SiteManager/msg/!delMsgs',{ids:pdom.data('item')['id']},function(){
//				    	pdom.remove()
				    	
//				    	mergeMC(messagesCount,unReadMessagesCount,lettersCount,unReadLettersCount)
				    	m0.flush()
				    })
				    
				},
				title:"确认要删除该条系统通知吗",
				content:"确认要删除该条系统通知吗?"
			})
//	  }
  })
  $('#m0 a.dele').click(function(){
	  var checkedboxes=$('#m0 ul').find('li :checkbox:checked')
	  if(checkedboxes.size()>0){
			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
				    var ids=[]
				    checkedboxes.each(function(){
						ids.push($(this).parents('li').data('item')['id'])
						//$(this).parents('li').remove()
					})
					$.post('../../SiteManager/msg/!delMsgs',{ids:ids},function(){
						m0.flush()
					})
				},
				title:"确认要删除所选系统通知吗",
				content:"确认要删除所选系统通知吗?"
			})
		}else{
			$.ifmWidget("alertFail",{
				title:'请选择要删除的通知',
				content:'请选择要删除的通知'
			})
		}
  })
    $('#m1 >ul').delegate('a.x','click',function(){
//	  var checkedboxes=$(this).parents('.ul').find('td :checkbox:checked')
	  var pdom=$(this).parents('li')
//	  if(pdom.find(':checkbox:first').is(':checked')){
		  $.ifmWidget("confirmNormal",{
				yesCallBack:function(){
				    $.post('../../SiteManager/msg/!delPrivateMsgs',{ids:pdom.data('item')['site.id']},function(){
//				    	pdom.remove()
				    	m1.flush()
				    })
				    
				},
				title:"确认要删除与该网站的对话吗",
				content:"确认要删除与该网站的对话吗?"
			})
//	  }
  })
  $('#m1 a.dele').click(function(){
	  var checkedboxes=$('#m1 ul').find('li :checkbox:checked')
	  if(checkedboxes.size()>0){
			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
				    var ids=[]
				    checkedboxes.each(function(){
						ids.push($(this).parents('li').data('item')['site.id'])
					})
					$.post('../../SiteManager/msg/!delPrivateMsgs',{ids:ids},function(){
						m1.flush()
					})
				},
				title:"确认要删除所选的对话吗",
				content:"确认要删除所选的对话吗?"
			})
		}else{
			$.ifmWidget("alertFail",{
				title:'请选择要删除的对话',
				content:'请选择要删除的对话'
			})
		}
  })
  
  $('.click .c-left').delegate('a:first','click',function(){
   	      if($(this).hasClass('check-all')){
   	    	    $(this).removeClass('check-all').addClass('un-check-all').html('全部取消')
   	    	   $(this).parents('.click').parent().find('li :checkbox').attr('checked',true)
		 }else{
			    $(this).removeClass('un-check-all').addClass('check-all').html('全选')
			    $(this).parents('.click').parent().find('li :checkbox').attr('checked',false)
		}
   })
  $('.dialog-box').delegate(':checkbox','change',function(){
   	      if($(this).is(':checked')){
		  		if($(this).parents('.dialog-box').find(':checkbox').not(':checked').size()==0){
		  			$(this).parents('.dialog-box').parent().find('.click .c-left a:first').removeClass('check-all').addClass('un-check-all').html('全部取消')
				}
		 }else{
			 $(this).parents('.dialog-box').parent().find('.click .c-left a:first').removeClass('un-check-all').addClass('check-all').html('全选')
		}
   });
  
  $('.section').delegate('.all-dialog > a:contains("返回所有私信")','click',function(event){
	  $('.section > div:gt(0)').hide();
	  $('#m1').show();
  })
  $('#m1').delegate('li','click',function(event){
	  if(!$(event.target).is('input:checkbox,span.name,a.x,a')){
		  $('.section > div:gt(0)').hide();
		  if(!$(this).data('sendDom')){
			  $(this).data('sendDom',buildSendDom($(this).data('item'),$(this)).appendTo('.section'))
			  if($(this).hasClass('unread')){
				  $(this).removeClass('unread')
				  
				  mc['unReadLettersCount'] -= $(this).data('item')['unreadNum'];
			  }
		  }
		  $(this).data('sendDom').show()
	  }
  })
  $('#m0').delegate('li','hover',function(event){
	  if( event.type === 'mouseenter' ){
		  $(this).data('m_status','in')
		  setTimeout($.proxy(function(){
				if($(this).hasClass('unread')&&$(this).data('m_status')=='in'){
					var dom=$(this)
					dom.removeClass('unread')
				    mc['unReadMessagesCount']>0?mc['unReadMessagesCount']--:null
					$.get('../../SiteManager/msg/!readSystemMsg',{siteid:$(this).data('item')['id']}).done(function(){
						  
					  })
				}
		},this),500)
	  }else{
		  $(this).data('m_status','out')
	  } 
  })
  $('.main').delegate('li','hover',function(event){
	  if( event.type === 'mouseenter' ){
		  $(this).find('a.x').show()
	  }else{
		  $(this).find('a.x').hide()
	  }
  });
  (function(){
	  $.template('blacklist','<li>'+
						  '<a class="text" href="../../SourceShare/source/!showSiteInformation?otherId=${siteid}">${sitename}</a>'+
						  '<span class="ft-l">${date} ${time}</span>'+
						  '<a class="btn">解除</a>'+
						  '</li>')
	  var l;
	  $('a.blacklist').click(function(){
			if(!$('#m2').is(':visible')){
				if(!l){
					l=new List({  url:'../../SiteManager/black/!list',
						          container:'#m2 >ul:eq(1)',
								  beforeLoad:function(){
										$.ifmWidget("loading",{
								    		title:'加载中',
								    		content:'加载中...'
										})
									},
								  afterLoad:function(){ 
													$.ifmWidget("unloading")
												},
								  Model: function(i, item){
								  	                var self = this
									  	            var date=(item.addtime.year+1900)+'/'+(item.addtime.month+1)+'/'+item.addtime.date
									  			    var time=item.addtime.hours+':'+item.addtime.minutes
									  			    item.date=date
									  			    item.time=time
										            self.dom = $.tmpl('blacklist', item)
										            self.dom.data('item',item)
								  }								
					})
				}else{
					l.reset()
				}
			}else{
				return 
			}
			$('.choose > li').removeClass('current')
			$('.section > div:gt(0)').hide();
			$('#m2').show()
	  })
	  $('#m2').delegate('a:contains("解除")','click',function(){
		  var dom=$(this)
		  $.ifmWidget("confirmNormal",{
				yesCallBack:function(){
					$.ifmWidget("loading",{
			    		title:'正在操作',
			    		content:'正在操作...'
					})
					$.post('../../SiteManager/black/!removeBlack',{'siteid':dom.parent().data('item')['siteid']},function(data){
						if(data.success||data.code==0)
							l.flush()
						else
							$.ifmWidget("alertFail",{
					    		title:'解除失败',
					    		content:'解除失败'
					    	})
					})
				},
				title:"确认解除",
				content:"确认解除?"
			})
	  })
  })(); 
 
})
