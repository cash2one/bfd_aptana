/**
 * @author Administrator
 */
$(function(){
//	                            var n = [{
//			                                "title": "根目录",
//			                                "url": "null",
//			                                "children": [{
//			                                    "title": "分组",
//			                                    "children": [{
//			                                        "title": "基本分组",
//			                                        "url": "grid-group.html"
//			                                    }, {
//			                                        "title": "过滤分组",
//			                                        "url": "grid-group-Filter.html"
//			                                    }]
//			                                },{
//				                                    "title": "子项加载",
//				                                    "children": [{
//				                                        "title": "基本子项加载",
//				                                        "url": "grid-treeDeep.html"
//				                                    }, {
//				                                        "title": "过滤子项加载",
//				                                        "url": "grid-treeDeep-Filter.html"
//				                                    }]
//			                              },{
//										  	"title": "饼图模式",
//											 "url": "grid-pie.html"
//										  },{
//										  	"title": "地图",
//											 "url": "map1.html"
//										  }]
//                                     }]
//							  $('.menulist').baeLeftBar({
//                                nodes: n[0]['children']
//                            })		 
                            
                            $.ajax({
								url:'./menu/list.action',
								dataType: "json",
								success:function(data){
									$('.menulist').baeLeftBar({
										    linkTarget:'function',
			                                nodes: data[0]['children']
			                            })	
								}
							})
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
})
