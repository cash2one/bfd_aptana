/**
 * @author Administrator
 */
$.ajaxSettings.traditional = true
$(function(){
	var siteId = $('#siteId').val();
    $('.choose2 > li').click(function(){
        if (!$(this).hasClass('current')) {
            document.title = '流量交换-' + $(this).find('a').html()
            $(this).siblings().removeClass('current')
            $(this).addClass('current')
            $('.section').hide().eq($(this).index()).show()
        }
    })
	$('.select_box:not(#notcontentselect) input:text').click(function(){
		$('.select_box3').find('ul').not($(this).parents('.select_box3').find('ul')).slideUp()
		$(this).parents('.select_box').find('ul').slideToggle()
	})
	$('.select_box:not(#notcontentselect) ul li').click(function(){
			$(this).parents('.select_box').find('input:text').val($(this).html())
			$(this).parents('.select_box').find('ul li.active').removeClass('active')
			$(this).addClass('active')
			$(this).parents('.select_box').find('ul').slideUp()
			$(this).parents('.select_box').find('input:hidden').val($(this).data('value'))
	})
	
	$('body').click(function(event){
		if(!$(event.target).is('.select_box:not(#notcontentselect)')&&$(event.target).parents('.select_box:not(#notcontentselect)').size()==0){
			$('.select_box:not(#notcontentselect)').find('ul').slideUp()
		}
	})
	
	$('.select_box:not(#notcontentselect) input:hidden').each(function(){
			var value=$(this).val()
			if(value!==''){
				$(this).parents('.select_box').find('li').each(function(){
					if ($(this).data('value') === value) {
					     $(this).click()
					}
				})
			}
		})
})
$(function(){
	   var siteId = $('#siteId').val();
	   $.template('t1','<tr>'+
								'<td style="text-align:center;"><span class="blue"><a href="../../SourceShare/source/!showSiteInformation?myselfId='+siteId+'&otherId=${id}">${site_name}</a></span><span class="site">${site_address}</span></td>'+
								'<td style="text-align:center;"><span>${type}</span></td>'+
								'<td class="pl14"><span>${desc}</span></td>'+
								'<td style="text-align:center;"><span>${sim_rate}</span></td>'+
								'<td class="brn">{{html operate}}<!--<a href="#" class="apply">申请交换</a>--></td>'+
								'</tr>')
	   $.template('t2','<tr>'+
			   					'<td style="text-align:center;"><span class="blue"><a href="../../SourceShare/source/!showSiteInformation?myselfId='+siteId+'&otherId=${id}">${site_name}</a></span><span class="site">${site_address}</span></td>'+
								'<td style="text-align:center;"><span>${type}</span></td>'+
								'<td class="pl14"><span>${desc}</span></td>'+
								'<td  class="brn" style="text-align:center;"><span>${sim_rate}</span></td>'+
								'</tr>')	
	   							
		function madeList(index,opts,template,operate){
		    var result,q
			var defaults={
									container: '.section:eq('+index+') > table > tbody',
									rowList:10,
									getData:(function(){
									    var q=$.trim($('.section:eq('+index+') input:text:last').val())
										var type=$.trim($('.section:eq('+index+') input:hidden').val())
										$('.section:eq('+index+') .type-search a:contains("筛选")').click(function(){
											if(type===$.trim($('.section:eq('+index+') input:hidden').val())){
												$.ifmWidget("alertFail",{
								       	    		title:'请修改筛选内容',
								       	    		content:'请修改网站类型'
								       	    	})
											}else{
												type=$.trim($('.section:eq('+index+') input:hidden').val())
												result.reset()
											}
										})
										$('.section:eq('+index+') .type-search a:last').click(function(){
											if(q===$.trim($('.section:eq('+index+') input:text:last').val())){
												$.ifmWidget("alertFail",{
								       	    		title:'请修改查询信息',
								       	    		content:'请修改查询信息'
								       	    	})
											}else{
												q=$.trim($('.section:eq('+index+') input:text:last').val())
												$('.section:eq('+index+') .type-search .ts-left').hide()
												$('.section:eq('+index+') .type-search > span').show()
												result.reset()
											}
										})
										$('.section:eq('+index+') .type-search > span a').click(function(){
											$('.section:eq('+index+') .type-search .ts-left').show()
											$('.section:eq('+index+') .type-search > span').hide()
											$('.section:eq('+index+') input:text:last').val('')
											q=''
											result.reset()
										})
										return function(){
											if($('.section:eq('+index+') .type-search .ts-left').is(':visible')){
												return {'site.type.id':type}
											}else{
												return {q:q}
											}
										}
									}(index)),
									Model: function(i, item){
							            var self = this
										item.operate=operate
							            self.dom = $.tmpl(template, item)
							            i % 2 == 0 ? null : self.dom.addClass('color')
										self.dom.data('item',item)
							        },
							        beforeLoad:function(){
										$.ifmWidget("loading",{
								    		title:'加载中',
								    		content:'加载中...'
										})
									},
									afterLoad:function(){ 
										$.ifmWidget("unloading")
									},
									 page: {
							            container: '.section:eq('+index+') > ul'
							        }
			}
			var setting=$.extend(true,defaults,opts)
			result= new List(setting)
		    return result
		}
		 var t0//=madeList(0,{url:'../../SourceShare/source/!getNoExchange',data:{}},'t1','<a class="apply">申请交换</a>')
		 var t1//=madeList(1,{url:'../../SourceShare/source/!getYetExchange',data:{}},'t1','<a class="apply">申请交换</a>')
		 var t2//=madeList(2,{url:'../../SourceShare/source/!getIngBExchange',data:{}},'t1','<a class="pass" href="#">通过</a><a class="refuse" href="#">拒绝</a>');		
		 var t3//=madeList(3,{url:'../../SourceShare/source/!getIngAExchange',data:{}},'t2');	
		 $('.choose2 > li:eq(0)').click(function(){
			 if(!t0){
				 t0=madeList(0,{url:'../../SourceShare/source/!getNoExchange',data:{}},'t1','<a class="apply">申请交换</a>')
			 } 
		 }).click()
//		 $('.choose2 > li:eq(1)').one('click',function(){
		 $('.choose2 > li:eq(1)').click(function(){
			 if(!t1){
				 t1=madeList(1,{url:'../../SourceShare/source/!getYetExchange',data:{}},'t1','<a class="apply">取消交换</a>')
			 }
		 })
//		 $('.choose2 > li:eq(2)').one('click',function(){
		 $('.choose2 > li:eq(2)').click(function(){
			 if(!t2){
				 t2=madeList(2,{url:'../../SourceShare/source/!getIngBExchange',data:{},
					 onLoad:function(data){
						 if(data.totalItem||data.totalItem==0){
							 $('.choose2 > li:eq(2) a').html('等待您回应('+data.totalItem+')')
						 }
					 }},'t1','<a class="pass">通过</a><a class="refuse">拒绝</a>');		
			 }
		 })
//		 $('.choose2 > li:eq(3)').one('click',function(){
		 $('.choose2 > li:eq(3)').click(function(){
			 if(!t3){
				 t3=madeList(3,{url:'../../SourceShare/source/!getIngAExchange',data:{},
					 onLoad:function(data){
						 if(data.totalItem||data.totalItem==0){
							 $('.choose2 > li:eq(3) a').html('等待对方回应('+data.totalItem+')')
						 }
					 }},'t2');	
			 }
		 })
		 function disableLoading_single(m,opts){
			 var defaults={
					 beforeLoad:$.noop,
					 afterLoad:$.noop
			 }
			 
			 var setting=m.getSetting()	
			 var result={
    			beforeLoad:setting.beforeLoad,
    			afterLoad:setting.afterLoad
			 }
			 
//			 setting.beforeLoad=$.noop
//		     setting.afterLoad=$.noop
		     
		     $.extend(setting,$.extend(defaults,opts))
		     
			 return function(){
				    setting.beforeLoad=result.beforeLoad
		    		setting.afterLoad=result.afterLoad
			 }
		 }
		 function disableLoading(opts){
			 if($('.choose2 li:first').is('.current')){
                 t1=null
                 t2=null
                 t3=null
                 return disableLoading_single(t0,opts)
			 }else if($('.choose2 li:eq(1)').is('.current')){
				 t2=null
				 t0=null
				 return disableLoading_single(t1,opts)
			 }else if($('.choose2 li:eq(2)').is('.current')){
				 t1 = null;
				 t0 = null;
				 return disableLoading_single(t2,opts)
			 }else if($('.choose2 li:eq(3)').is('.current')){
				 t0 = null
				 return $.noop;
			 }
		 }
		 function def_oprate(def){
			 $.ifmWidget("loading",{
		    		title:'正在操作',
		    		content:'正在操作...'
			})
			def.done(function(data){
				var enableLoading=disableLoading({
					afterLoad:function(){
						enableLoading()
						$.ifmWidget("tip",{'content':'操作成功'})
					}
				})
		    	if($('.choose2 li:first').is('.current')){
					 t0.flush()
				 }else if($('.choose2 li:eq(1)').is('.current')){
					 t1.flush()
				 }else if($('.choose2 li:eq(2)').is('.current')){
					 t2.flush()
				 }
			}).fail(function(){
	    		$.ifmWidget("alertFail",{
		    		title:'操作失败',
		    		content:'操作失败'
		    	})
	    	})
		 }
		 $('.section').delegate('td a:contains("申请交换")','click',function(){
		 	var d=$(this).parent()
   			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
					def_oprate($.post('../../SourceShare/source/!applyExchangeFlow',{'applicationId':siteId,'beApplicationId':d.parent().data('item')['id']}))
//					d.html('<span class="apply">已提交申请</span>')
				},
				title:"确认申请交换",
				content:"确定要申请交换吗?"
			})
		 })	
		 $('.section').delegate('td a:contains("取消交换")','click',function(){
		 	var d=$(this).parent()
   			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
					def_oprate($.post('../../SourceShare/source/!cancelExchangeFlow',{'applicationId':d.parent().data('item')['id']}))
//					d.html('<span class="apply">已提交申请</span>')
				},
				title:"确认取消交换",
				content:"确定要取消交换吗?"
			})
		 })
		  $('.section').delegate('td a:contains("通过")','click',function(){
		 	var d=$(this).parent()
   			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
					def_oprate($.post('../../SourceShare/source/!agreeExchangeFlow',{'beApplicationId':siteId,'applicationId':d.parent().data('item')['id']}))
					//d.html('<span class="apply">已通过申请</span>')
				},
				title:"确认通过申请",
				content:"确定要通过申请吗?"
			})
		 })	
		  $('.section').delegate('td a:contains("拒绝")','click',function(){
		 	var d=$(this).parent()
   			$.ifmWidget("confirmNormal",{
				yesCallBack:function(){
					def_oprate($.post('../../SourceShare/source/!refuseExchangeFlow',{'beApplicationId':siteId,'applicationId':d.parent().data('item')['id']}))
					//d.html('<span class="apply">已拒绝申请</span>')
				},
				title:"确认拒绝申请",
				content:"确定要拒绝申请吗?"
			})
		 })											
})

$(function(){
	var siteId = $('#siteId').val();
	$('.amend').click(function(){
		$.blockUI({ message:$('.page-area'),
			                    css:{ border: 'none',
								         width: '588px',
										 top:  ($(window).height() -577) /2>0?($(window).height() -577) /2:0 + 'px',
										 left: ($(window).width() -554) /2 + 'px'
										},
								overlayCSS:{opacity: 0}		 
							})
	})
	$('.p-title a').click(function(){
		$.unblockUI()
	})
})
$(function(){
	var siteId = $('#siteId').val();
	if($('#nameinput').val()!==''){
		$('#namelabel').hide()
	}
	$('#nameinput').focus(function(){
		$('#namelabel').hide()
	}).blur(function(){
		if($(this).val()==''){
			$('#namelabel').show()
		}
	})
	$('#namelabel').click(function(){
		$(this).hide()
		$('#nameinput').focus()
	})
	if($('#qq').val()!==''){
		$('#qqlabel').hide()
	}
	$('#qq').focus(function(){
		$('#qqlabel').hide()
	}).blur(function(){
		if($(this).val()==''){
			$('#qqlabel').show()
		}
	})
	$('#qqlabel').click(function(){
		$(this).hide()
		$('#qq').focus()
	})
	$('#notcontentselect input:text').click(function(){
		$('.select_box3').find('ul').not($(this).parents('.select_box3').find('ul')).slideUp()
		$('#notcontentselect ul').slideToggle()
	})//.val('请选择')
	$('#notcontentselect ul li').click(function(){
			$('#notcontentselect input:text').val($(this).html())
			$('#notcontentselect ul').find('li.active').removeClass('active')
			$(this).addClass('active')
			$('#notcontentselect ul').slideUp()
			$('.btn').show()
			$('#notcontentselect input:hidden:last').val($(this).data('value'))
			 $("#form1").valid()
	});
	$('body').click(function(event){
		if(!$(event.target).is('#notcontentselect')&&$(event.target).parents('#notcontentselect').size()==0){
			$('#notcontentselect').find('ul').slideUp()
//			$("#form1").valid()
		}
	});
	(function(){
		var value=$('#notcontentselect input:hidden:last').val()
		$('#notcontentselect').find('li').each(function(){
					if ($(this).data('value') == value) {
						$('#notcontentselect input:text').val($(this).html())
						$('#notcontentselect ul').find('li.active').removeClass('active')
					     $(this).addClass('active')
					}
		})
	})();
})
$(function(){
	var siteId = $('#siteId').val();
	$('#sub').click(function(){
			$('#form1').submit()
		})
		$('#form1').keyup(function(event){
			if(event.keyCode===13){
				$('#form1').submit();
				}
		})
		$.validator.addMethod("checkboxchecked", function(value,element) { 
	          return $('.cbox:checked').size()>0;   
	 	 }, "请选择联系方式");
//		 $.validator.addMethod("qqrequire", function(value,element) { 
//	          if($('.cbox:eq(1)').is(':checked')&&$('#qq').val()===''){
//			  	   return false
//			  }
//			  return true
//	 	 }, "请输入qq号码");
		 $.validator.addMethod("qqchecked", function(value,element) { 
	         if($.trim($('#qq').val())!=''&&!/^[1-9]\d{4,11}$/.test($.trim($('#qq').val()))){
			  	   return false
			  }
			  return true
	 	 }, "请输入正确的qq号码");
		 $.validator.addMethod("sitetype", function(value,element) { 
	         return $('#sitetype').val()!=='请选择'
	 	 }, "请选择网站类型");
		var validater = $('#form1').validate({
		submitHandler: function(form){
			$(form).ajaxSubmit({
				success:function(responseText, statusText, xhr, $form){
					if(responseText=='0' ){
					  //window.document.location.href = "url";
						$.ifmWidget("alertSuccess",{
				    		title:'操作成功',
				    		content:'操作成功'
				    	})
					} else if(responseText == '1'){
						validater.showErrors({'site.name':'操作失败'});
					} 
				}
			})
			return false
			//form.submit()
		},
        rules: {
			'site.name': {
        		required:true
             },
             'site.describe':{
            	 required:true
             },
//        	'site.isPrivateLetter': {
//            	 checkboxchecked: true
//             },
			 'site.qqNumber':{
//			 	qqrequire:true,
				qqchecked:true
			 },
			 'sitetype':{
			 	sitetype:true
			 }
         },
		 messages: {
        	 'site.name': {
                 required: '请输入网站名称'
             },
             'site.describe':{
            	 required:'请输入网站描述'
             }
         },
         focusInvalid:true,
         onkeyup: false,
         wrapper:null,
         errorElement:'span',
		 errorClass:'site_info_error_f',
         errorPlacement: function(error, element){
		 	 if(element.is('textarea')){
			 	 error.appendTo(element.parent());
			 }else{
			 	 error.appendTo(element.parent().parent());
			 }
         }
     })
})

