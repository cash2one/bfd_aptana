/**
 * @author Administrator
 */
var formatGrid={
	numFix:function(dom){//数字处理123123变为123,123 12312.22变为12,312.12
		dom.html(dom.html().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,"$1,"))
	},
	scale:function(dom){//百分比处理
		 if(isNaN(parseFloat(dom.html())))
		 {
			 dom.html("0.00%");
		 }
		 else{
			 dom.html((parseFloat(dom.html())*100).toFixed(2)+'%')
		 }
	     
	},
	scale1:function(dom){//百分比处理
		 if(isNaN(parseFloat(dom.html())))
		 {
			 dom.html("0.00%");
		 }
		 else{
			 dom.html((parseFloat(dom.html())).toFixed(2)+'%')
		 }
	     
	},
	decimal:function(dom){//两位小数
		if(isNaN(parseFloat(dom.html())))
		{
			 dom.html("0.00%");
		}
		else{
			dom.html(parseFloat(dom.html()).toFixed(2))
		}
		
	},
	money:function(dom){
		if(isNaN(parseFloat(dom.html())))
		 {
			 dom.html("0.00");
		 }
		dom.html(parseFloat(dom.html()).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,"$1,"))
	},
	time:function(dom){
		var result="";
		var s=parseInt(dom.html());
		if(isNaN(s))
		{
			dom.html("0:0:0");
		}
		else{
			var N = parseInt(s / 3600);
			s = parseInt(s % 3600);
			var K = parseInt(s / 60);
			s = parseInt(s % 60);
			var M = s;
			result=N+":"+K+":"+M;
			dom.html(result);
		}
		
	}
	
	
	


}
