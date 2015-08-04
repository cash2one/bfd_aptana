// JavaScript Document
function mover(object){
  $(object).parent().find("dt").each(function(i){
		
		if(this==object){
			$(this).addClass("now");
			$("#s"+$(this).attr("id")).show();
		}else{
			$(this).removeClass("now");
			$("#s"+$(this).attr("id")).hide();
		}						  
	});
  
}