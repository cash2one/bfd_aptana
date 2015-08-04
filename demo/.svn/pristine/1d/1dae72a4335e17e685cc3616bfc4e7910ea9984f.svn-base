(function() {
	$.extend($.fn,{
		upAndDown : function(Select) {
			
			if($("#control-up") == null){
				return false;	
			}
			init();
			buttonEvent();
            $(window).scroll(function(event){
            $('.chapter-labels').each(function(){
                var scollHeigth = $(window).scrollTop() + 160
                var top = $(this).offset().top + 160
				//确定当前容器
				if(top <= scollHeigth && scollHeigth < (top + $(".allkj").height())){
					$(".allkj").attr("show","false");
					$(this).parent().attr("show","true");
				}
            })
			
        })
			
			
			//初始化界面
			function init(){
				var mouseHtml = '<div id="control-up" class="arrow" data-direction="up" style="left: 1014px; display: none;"></div><div id="control-down" class="arrow" data-direction="down" style="display: none; left: 913px; "></div>';
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
			
			function setScroll(next_top){
				$("html,body").animate({ scrollTop : next_top }, "slow");
			}
			//鼠标事件绑定	
			function buttonEvent(){
				var $controlUp = $("#control-up");
				var $controlDown = $("#control-down");
				
				var scrolltop = $(document).scrollTop();
				var mousearea = 100;
				var clientheight = document.documentElement.clientHeight;
				
				
				$("body").mousemove(function(event){
					var mouseY = event.pageY;
					var inTop = mouseY > scrolltop && mouseY < scrolltop + mousearea;
					var inDown = mouseY > scrolltop + clientheight -mousearea ;
					alert(inDown);
					if(inTop){
						$controlUp.fadeIn(300);
						var my = event.pageY -scrolltop - 40; 
						$controlUp.css({top:my,left:event.pageX-40});
					}else{
						$controlUp.hide();
					}
					if(inDown){
						$controlDown.fadeIn(300);
						var my = event.pageY - scrolltop-clientheight+mousearea - 40; 
						$controlDown.css({top:my,left:event.pageX-40});
					}else{
						$controlDown.hide();
					}
				});
				
				$controlUp.click(function(event){
						var Obj = $("div[show ='true']").prev("div[show='false']");
						if(Obj.attr("class") != "allkj"){
							return false;
						}
						var next_top = Obj.offset().top;
						window.top.setScroll(next_top);
				});
				$controlDown.click(function(){
						var Obj = $("div[show ='true']").next("div[show='false']");
						if(Obj.attr("class") != "allkj"){
							return false;
						}
						var next_top = Obj.offset().top;
						window.top.setScroll(next_top);
				});
				function goToIt(id){
					var Obj = $("#"+id+"");
					var next_top = Obj.offset().top;
						window.top.setScroll(next_top);
				}
			}
		}
	});	
})(jQuery);