/**
 * @author Administrator
 */
$(function(){
					var contentHeight = document.documentElement.clientHeight;//+99
                    var contentWidth = document.documentElement.clientWidth;
                    var leftMargin = (contentWidth - 980) / 2;
					$(".allkj").css("min-height",contentHeight);
					$("body").upAndDown();
	                $(window).scroll(function(){
                    $('.chapter-labels').each(function(){
                        var scollHeigth = $(window).scrollTop();
                        var top = $(this).offset().top;
                        if (top >= scollHeigth +101 && top <= scollHeigth + contentHeight) {
                            var scale = 1 - ((top - scollHeigth - 99) / (contentHeight - 99))
							if(scale < 0){
							}else{
								 $(this).css('margin-right', leftMargin + 430 - ((leftMargin + 430) * scale) + 'px');
							}
                            
                        }
						if(top < scollHeigth + 100){
							 $(this).css('margin-right', '0px');
						}
						
                    });
                });
				
				var folatHtnl = "";
				$('.allkj').each(function(){
					var id = $(this).attr("id");
					if(id != undefined){
						folatHtnl += '<li><a data-link="'+ id +'" class="navigate" id="tab-'+ id +'"></a><div class="tip" style="display: none; opacity: 0; ">'+ $(this).find(".cttl").text() +'</div></li>';
					}
            	});
				
				$("#floatButton").append(folatHtnl);
				
				$(".header ul li").each(function(){
					var thisli = $(this);
					var alink = thisli.children("a");
					alink.hover(
					function(){ thisli.children(".tip").toggle().animate({opacity:"1"},500);alink.addClass("tabg") },
					function(){ thisli.children(".tip").toggle().animate({opacity:"0"},500);alink.removeClass("tabg") });
					
					alink.click(function(){
						GoToScroll(alink.attr("data-link"));
					});
				});
				$(".arrow-down").click(function(){
					GoToScroll("infocontent");
				});	
});
function GoToScroll(id){
		var Obj = $("#"+id+"");
		var next_top = Obj.offset().top;
		var $controlUp = $("#control-up");
		var $controlDown = $("#control-down");
		$("html,body").animate({ scrollTop : next_top - 100 }, "slow");
		$controlUp.fadeIn(500).fadeOut(1000);
		$controlDown.fadeIn(500).fadeOut(1000);
}