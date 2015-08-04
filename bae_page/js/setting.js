/**
 * @author Administrator
 */
$(function(){
		   var misc=true
       $('.misc').toggle(function(){
		 $(this).animate({left:'0px'},'slow')
	   	  $('.left,.left > div').animate({width:'0px'},'slow')
		  misc=false
	   },function(){
		 $(this).animate({left:'150px'},'slow')
	   	 $('.left,.left > div').animate({width:'149px'},'slow')
		 misc=true
	   })                     
         $(window).scroll(function(){
		 	  if(misc){
			  	$('.misc').css('left',150-$(this).scrollLeft()+'px')
			  }else{
			  	$('.misc').css('left',0-$(this).scrollLeft()+'px')
			  }
		  }) 
		  $('.menulist > ul > li > a').click(function(){
		  	$('.menulist > ul > li > a').removeClass('now')
			$(this).addClass('now')
		  })
})
