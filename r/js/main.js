$(function(){
		   var misc=true
       $('.misc').toggle(function(){
		 $(this).animate({left:'1px'},'slow')
	   	  $('.left,.left > div').animate({width:'1px'},'slow')
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
		$('.menulist a').click(function(){
			if(!$(this).hasClass('now')){
				$('.menulist a.now').removeClass('now')
				$(this).addClass('now')
			}
		})
})