$(function(){
	$('.section').scrollable({vertical: true})
	var api=$('.section').data('scrollable')
	$('#open').click(function(){
		$.post('../../Promo/profit/!createRecommendedBar',{},function(data){
			api.seekTo(1)
		},'json')
		
		$('.set-box').css('height','auto')
		$('.section').css('height','380px')
	});
	if($('.set-box:first').is(':hidden')){
		$('.set-box').css('height','auto')
		$('.section').css('height','380px')
	}
	var loadPromo=(function(){
		$.template('good',  '<li>'+
				
//										'<a href="${link}">'+
				                         '<a>'+
				                         
										'<img src="${imgSrc}"/>'+
										'<label>${label}</label>'+
										'</a>'+
										'</li>')
		var buildProdut=function(item){
			return $.tmpl('good',item).hover(function(){//ie 6背景
				$(this).css('background-color','#f0f0f0')
			},function(){
				$(this).css('background-color','#fff')
			})
		}
		var showLoading=function(){
			$('.set-right').block({
				message:'loading',
				css:{
					 border: 'none'
				},
				overlayCSS: { backgroundColor: '#fff',opacity: 1 }
			})
		}
		var unLoading=function(){
			$('.set-right').unblock({fadeOut:1000})
		}
		var loadData=function(param){
			//return 
            /*var data=[]
			for(var i=0; i<20;i++){
				data.push({
					link:'',
					imgSrc:'../../images/pic-38.jpg',
					label:'【数码节狂促1000台】抢到赚到尼康D3000！'
				})
			}
			return {
				done:function(fun){
					fun({items:data})
				}
				{items:[{},{}]}
			}*/
		}
		var parseData=function(list,row,col){
			  var oldUL=$('.pre-promo-box > ul')
			  for(var i=0;i<row;i++){
			  	   var ul=$('<ul></ul>')
				   for(var j=0;j<col;j++){
                    var d=buildProdut(list[i*col+j])
					if(col==3){
						d.css({
							'margin-left':'36px',
							'margin-right':'36px'
						})
					}
					if(col==4){
						d.css({
							'margin-left':'14px',
							'margin-right':'12px'
						})
					}
					ul.append(d)
				   }
				   $('.pre-promo-box  > .box-title').html($.trim($('#promo_label').val())).after(ul)
			  }
			  
			  if(row==1){
			  	$('.section').css('height','580px')
			  }else{
			  	$('.section').css('height','720px')
			  }
			  
			  oldUL.remove()
//			  $('.pre-promo-box').css({width:col*110+'px',height:160*row+60+2+'px'})
              $('.pre-promo-box').css({width:5*110+'px',height:160*row+60+2+'px'})
		}
		return function (){
		    showLoading()
			var row=parseInt($('#promo_row').val(),10)
			var col=parseInt($('#promo_col').val(),10)
			$.ajax({
				url:'../../Promo/profit/!getRecommendedBarList',
	            dataType: "json",
	            data: {
					row:row,
					col:col,
					type:$('#promo_type').val()
				},
	            success:function(data){
	            	parseData(data.items,row,col)
	            	unLoading()
	            }
			})
			
	    }
	})();
//	loadPromo()

	$('.select_box3 input:text').click(function(){
		$('.select_box3').find('ul').not($(this).parents('.select_box3').find('ul')).slideUp()
		$(this).parents('.select_box3').find('ul').slideToggle()
	})
	$('.select_box3:lt(2) ul li').click(function(){
			$(this).parents('.select_box3').find('input:text').val(parseInt($(this).html(),10))
			$(this).parents('.select_box3').find('ul li.active').removeClass('active')
			$(this).addClass('active')
			$(this).parents('.select_box3').find('ul').slideUp()
//			$(this).parents('.select_box3').find('input:hidden').val($(this).data('value'))
	})
	$('.select_box3:lt(2) input:text').each(function(){
		var value=$(this).val()
		$(this).parents('.select_box3').find('li').each(function(){
			if($(this).html()==value){
				$(this).addClass('active')
			}
		})
	})
	$('.select_box3:last ul li').click(function(){
			$(this).parents('.select_box3').find('input:text').val($(this).html())
			$(this).parents('.select_box3').find('ul li.active').removeClass('active')
			$(this).addClass('active')
			$(this).parents('.select_box3').find('ul').slideUp()
			$(this).parents('.select_box3').find('input:hidden').val($(this).data('value'))
			$("#form1").valid()
	});
	(function(){
		var value = $('.select_box3:last input:hidden').val()
		$('.select_box3:last').find('li').each(function(){
				if($(this).data('value')==value){
					$(this).addClass('active')
					$('.select_box3:last input:text').val($(this).html())
				}
			})
	})();
	$('body').click(function(event){
		if(!$(event.target).is('.select_box3')&&$(event.target).parents('.select_box3').size()==0){
			$('.select_box3').find('ul').slideUp()
		}
	})
	$('#btn2').click(function(){
		if(!$('.set-box').find('input:checkbox').prop('checked')){
			$('.set-right').hide()
			return;
		}
		if(validater.form()){
			if($('.set-right').is(':hidden')){
//				$('.set-right').show()
				$('.set-right').fadeIn(2000)
			}
			loadPromo()
		}
	})
	//表单验证
	$('#btn1').click(function(event){
		$('#form1').submit()
		return false
	})
	$('#form1').keyup(function(event){
		if(event.keyCode===13){
			$('#form1').submit();
			}
	})
	$.validator.addMethod("selectBox", function(value,element) { 
		return value!='请选择'
	}, "请选择推荐栏商品类型");
	
	$.validator.addMethod("titleType", function(value,element) { 
		return /^[\u4e00-\u9fa5]{2,6}$/.test($.trim(value))
	}, "请输入正确的商品推荐栏名称，2-6个中文");
	var validater = $('#form1').validate({
		submitHandler:function(form){
			$(form).ajaxSubmit({
				success:function(responseText, statusText, xhr, $form){
					if(responseText=='0' ){
						if(!$('.set-box').find('input:checkbox').prop('checked')){
							$('.set-right').hide()
						}
						$.ifmWidget("alertSuccess",{
				    		title:'操作成功',
				    		content:'操作成功'
				    	})
					} else {
						$.ifmWidget("alertFail",{
										    		title:'操作失败',
										    		content:'操作失败'
										    	})
					} 
				}
			})
			return false
		},
		rules: {
        	'recommendedBar.name': {
            	 required: true,
				 titleType:true
             },
             'selectBox':{
             	 selectBox: true
             }
             
         },
         messages: {
        	 'recommendedBar.name': {
                 required: "请输入商品推荐栏名称，2-6个中文"
             }
         },
         showErrors: function (errorMap, errorList) {
     	    this.defaultShowErrors();
     	    $.each(errorList, function (i, error) {
     	    	$(error.element).parent().parent().next().css("display", "inline-block").find('span').css("display", "inline-block");
     	    });
     	    
         },
         onfocusout: function(element, event) {
				this.element(element);
		 },
         onkeyup: false,
         wrapper:'span',
         errorElement:'span',
         errorClass:'_undefineClass',
//		 success:function(label){
//		 	label.parent().parent().find('em').show()
//		 	label.parent().parent().find('span.error').remove()
//		 },
         errorPlacement: function(error, element){
		 	  error.css({
			  	'margin-left':0,
				left:'auto',
				'background-color':'#fff'
			  })
			  if(element.parents('.textbox').size()>0){
//			     element.parents('.textbox').parent().find('em').hide()
			  	 error.addClass('error').appendTo(element.parents('.textbox'))
			  }else{
//			  	element.parent().parent().find('em').hide()
				 element.parent().append(error.addClass('error'))
			  }
//        	 element.parent().append(error.addClass('error'))
             //error.addClass('error').appendTo(element.parent()).find('span').css('display','block');
         }
	})
})
$(function(){
	$('.set-box').find('input:checkbox').change(function(){
		if($(this).is(':checked')){
			$(this).parents('form').find('.display input').attr('disabled',false)
		}else{
			$(this).parents('form').find('.display input').attr('disabled',true)
		}
	}).change()
})
