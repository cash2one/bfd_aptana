/**
 * @author Administrator
 */
$(function(){
	                $(window).scroll(function(){
                    $('.chapter-labels').each(function(){
                        var contentHeight = document.documentElement.clientHeight;//+99
                        var contentWidth = document.documentElement.clientWidth;
                        var leftMargin = (contentWidth - 980) / 2;
                        var scollHeigth = $(window).scrollTop();
                        var top = $(this).offset().top + 160;
                        if (top >= scollHeigth && top <= scollHeigth + contentHeight + 99) {
                            var scale = 1 - ((top - scollHeigth) / contentHeight)
                            $(this).css('margin-right', leftMargin + 430 - ((leftMargin + 430 + 248) * scale) + 'px')
                            
                        }
						
                    });
                });
});