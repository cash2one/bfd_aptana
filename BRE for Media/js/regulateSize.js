$(function(){
	var ie=!!window.ActiveXObject;
	var ie6=ie&&!window.XMLHttpRequest;
	var heightProperty='min-height'
	if(ie&&ie6){
		heightProperty='height'
	}	
	if($('.content').size()>0){
		$(window).resize(function(){
			try{
				var bodyheight=window.parent.document.documentElement.clientHeight
				var minHeight=bodyheight-199
				if($('.content .main').size()>0){
					$('.content .main').css(heightProperty,minHeight)
				}else{
					$('.content').css(heightProperty,minHeight)
				}
				
			}catch (ex){}
		}).resize()
	}
	if($('.content').size() && $('.main').size() && $('.header').size()){
		$(window).resize(function(){
			$('.header,.footer').width($('.main').width()>$('.content').width()?$('.main').width():$('.content').width())
		}).resize()
		$.each([200,500,1000,1500,2000,5000],function(i,item){
			setTimeout(function(){
				$(window).resize()
			},item)
		})
	}
})
