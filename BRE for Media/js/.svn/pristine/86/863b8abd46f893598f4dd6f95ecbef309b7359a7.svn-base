$(function(){
	    function bindClip(){
			ZeroClipboard.setMoviePath('../../resources/ZeroClipboard/ZeroClipboard.swf')
			var clip = new ZeroClipboard.Client();
			clip.glue($('.copy')[0]);
			clip.setText($.trim($('textarea').text()))
			$(this).data('clip',clip)
			clip.addEventListener('complete', function(client, text) {
								$('.right').show()
		            });
		}
		$('.section').scrollable({vertical: true,onSeek:function(){
			bindClip()
			$('.section').css('height','540px')
		}})
		if($('.set-box').is(':hidden')){
			$('.section').css('height','540px')
		}
		if($('#pre_setbox1').is(':hidden')){
			bindClip()
		}
		var api=$('.section').data('scrollable')
		$('#open').click(function(){
			$.post('../../Promo/profit/!createWaterfall',{},function(data){
				if(data=="0"){
					api.seekTo(1)
			}
			},'json')
		});
		function saveChange(success){
//			if($('#promo_type').val()=='defaults'){
//				return
//			}
			$.ifmWidget("loading",{
		    		title:'正在保存',
		    		content:'正在保存...'
			})
			var waterfallUrl = $.trim($('#siteAddress4WaterfallUrl').val()) + $.trim($('#waterfallUrl').val());
			$.post('../../Promo/profit/!updateWaterfall',{'waterfall.isOpen':$('#isopenpromo').prop('checked')?'1':'0','channelss':$('#promo_type').val(),'waterfall.waterfallUrl':waterfallUrl},function(data){
				if(data == '0'){
					success()
				}else{
					$.ifmWidget("alertFail",{
			    		title:'操作失败',
			    		content:'操作失败'
			    	})
				}
			},'json')
		}
		$('#btn1').click(function(){
			if($('#promo_type').val()=='defaults'){
				$.ifmWidget("alertFail",{
		    		title:'操作失败',
		    		content:'请选择电商频道商品类型'
		    	})
			}else{
				saveChange(function(){
					$.ifmWidget("tip",{'content':'操作成功'})
				})
			}
		})
		
		$('#isopenpromo').change(function(){
			if($(this).prop('checked')){
				$('.step').find('input,select').prop('disabled',false)
			}else{
				$('.step').find('input,select').prop('disabled',true)
			}
		})
		if($('#promo_type').val()=='defaults'){
			$('#promo_type').one('change',function(){
				$('#promo_type').find('option:first').remove()
			})
		}
		
		$('#btn2').click(function(){
			var value=$.trim($('#waterfallUrl').val())
			var value2 = $.trim($('#siteAddress4WaterfallUrl').val());
			value = value2 + value;
			
			var urlre= /(((http|https):\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig; 
//			var urlre= /(((http|https):\/\/)?[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig; 
			
			if(urlre.test(value)){
				saveChange(function(){
					//$.ifmWidget("tip",{'content':'操作成功'})
					$.ifmWidget("tip",{'content':'操作成功'})
					window.open('http://'+value.replace('http://',''))
				})
			}else{
				$.ifmWidget("alertFail",{
		    		title:'操作失败',
		    		content:'请填写正确的预览地址'
		    	})
			}
		})
})
$(function(){
	$('.content-box').find('input:checkbox').change(function(){
		if($(this).is(':checked')){
			$(this).parents('form').find('.display input').attr('disabled',false)
		}else{
			$(this).parents('form').find('.display input').attr('disabled',true)
		}
	}).change()
})
