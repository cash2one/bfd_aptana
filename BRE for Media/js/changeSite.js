$(function(){
	$('.site-ad .click-btn').click(function(){
		$('.site-ad > ul').slideToggle()
	})
	$('body').click(function(event){
		if($(event.target).parents('.site-ad').size()==0){
			$('.site-ad > ul').slideUp()
		}
	})
})