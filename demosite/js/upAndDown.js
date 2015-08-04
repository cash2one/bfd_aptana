(function() {
	$.extend($.fn,{
		upAndDown : function() {
			if($("#control-up").hasClass("arrow")){
				return false;	
			}
			init();
			var $controlUp = $("#control-up");
			var $controlDown = $("#control-down");
			var $controlUpc = $(".control-up");
			var $controlDownc = $(".control-down");
			
			var mousearea = 100;
			var clientheight = document.documentElement.clientHeight;
			
			buttonEvent();
            $(window).scroll(function(event){
            $('.allkj').each(function(){
                var scollHeigth = $(window).scrollTop() + 101;
                var top = $(this).offset().top;
				//确定当前容器
				if(top <= scollHeigth && scollHeigth < (top + $(".allkj").height())){
					var id = $(this).attr("id");
					$(".navigate").removeClass("tabg");
					$(".allkj").attr("show","false");
					$(this).attr("show","true");
					$("#tab-"+id+"").addClass("tabg");
				}
            });
            //buttonMoveMouse(event);
			
        });
			
			
			//初始化界面
			function init(){
				var mouseHtml = '<div class="control-up"><div id="control-up" class="arrow" data-direction="up" style="left: 1014px; display: none;"></div></div><div class="control-down"><div id="control-down" class="arrow" data-direction="down" style="display: none; left: 913px; "></div></div>';
				$("body").append(mouseHtml);
				
				$(".allkj").each(function(i){
					var obj = $(this);
					if(i == 0){
						obj.attr("show","true");
					}else{
						obj.attr("show","false");
					}
					
				});
			}
			
            //页面滚动方法
			function setScroll(next_top){
				$("html,body").animate({ scrollTop : next_top - 100 }, "slow");
			}
			//浮动按钮跟随鼠标方法
			/*function buttonMoveMouse(event){
				
				var scrolltop = $(document).scrollTop();
				var mouseY = event.pageY;
				var inTop = mouseY > scrolltop + 80 && mouseY < scrolltop + 80 + mousearea && mouseY > 700;
				var inDown = mouseY > scrolltop + clientheight - mousearea  && mouseY > 700;
				if(inTop){
					$controlUp.fadeIn(300);
					var my = event.pageY - 40; 
					$controlUp.css({top:my,left:event.pageX-40});
				}else{
					$controlUp.hide();
				}
				if(inDown){
					$controlDown.fadeIn(300);
					var my = event.pageY - 40; 
					$controlDown.css({top:my,left:event.pageX-40});
				}else{
					$controlDown.hide();
				}
				
			}*/
			//鼠标事件绑定	
			function buttonEvent(){
				
				$controlUpc.hover(
				function(){ $controlUp.fadeIn(500); },
				function(){ $controlUp.fadeOut(500);}
				);
				
				$controlDownc.hover(
				function(){ $controlDown.fadeIn(500); },
				function(){ $controlDown.fadeOut(500);}
				);
				
				$controlUp.click(function(event){
						var Obj = $("div[show ='true']").prev("div[show='false']");
						if(!Obj.hasClass ("allkj")){
							return false;
						}
						var next_top = Obj.offset().top;
						setScroll(next_top);
				});
				$controlDown.click(function(){
						var Obj = $("div[show ='true']").next("div[show='false']");
						if(!Obj.hasClass ("allkj")){
							return false;
						}
						var next_top = Obj.offset().top;
						setScroll(next_top);
				});
			}
		}
	});	
})(jQuery);