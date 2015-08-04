$(function(){
	
	$("#searchButton").click(function(){
		var nameText = $("#searchContent").val();
		if(nameText == ""||$.trim(nameText) == ""){
			alert("请输入搜索内容！");
			return;
		}
		
		 $.getJSON("http://192.168.11.12/javademo/search.jsp?callback=?", 
					{
			 			name:encodeURI(nameText,"utf-8")
					},
					function(data){
						var html = '<ul>';
						$("#index").html("").html("您索索的关键字“"+ nameText +"”百分点个性化着陆页为您提供以下推荐!");
						$.each( data ,function(dataIndex, data) {
							if(dataIndex == 3){
								html += '<li><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td> <div class="ls"><div class="mark" style="height: 0px; "></div><img width="160" height="160" src="'+ data["img"] +'"> <div class="lsico">看过</div></div></td></tr><tr><td><div style="height:32px;overflow-y: hidden;">产品名称:'+ data["name"] +'</div></td></tr><tr><td>来源网站：'+ data["cid"] +' </td></tr><tr> <td>操作：<a onclick="buy({\"cid\":\"'+ data["cid"] +'\",\"iid\":\"'+ data["iid"] +'\"});" style="cursor:pointer"><img align="absmiddle" src="images/buy.png"></a></td></tr></tbody></table></li></ul><ul>';
							}else{
								html += '<li><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td> <div class="ls"><div class="mark" style="height: 0px; "></div><img width="160" height="160" src="'+ data["img"] +'"> <div class="lsico">看过</div></div></td></tr><tr><td><div style="height:32px;overflow-y: hidden;">产品名称:'+ data["name"] +'</div></td></tr><tr><td>来源网站：'+ data["cid"] +' </td></tr><tr> <td>操作：<a onclick="buy({\"cid\":\"'+ data["cid"] +'\",\"iid\":\"'+ data["iid"] +'\"});" style="cursor:pointer"><img align="absmiddle" src="images/buy.png"></a></td></tr></tbody></table></li>';
							}
							});
							
						html += '</ul>';	
						$("#content").html(" ").html(html);
						autoToNext();
	                });
	});
	
});
function autoToNext(){
	var Obj = $("#ldp");
	var next_top = Obj.offset().top;
	window.top.setScroll(next_top);
}
function buy(obj){
	var URL = "http://scenario.baifendian.com:8008/DemoBuy.do?cid="+ obj.cid +"&iid="+ obj.iid +"";
	alert(URL);
	$.ajax({
		  url: URL,
		  dataType:'json',
		  success: function(json) {
		    alert(json);
		  }
		});
}