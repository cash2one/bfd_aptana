$(function() {
	$.ajaxSettings.traditional = true
	// var bodyheight = document.documentElement.clientHeight
	// var minHeight = bodyheight - 101
	// $(document.getElementById('function').contentWindow).resize(function(){
	// 	$("#function").height($(document.getElementById('function').contentWindow.document.body).height() > minHeight ? $(document.getElementById('function').contentWindow.document.body).height() : minHeight);
	// })
	// $(document.getElementById('function').contentWindow).trigger("resize")
	window.setInterval(function() {
		try {
			var bodyheight = document.documentElement.clientHeight
			var minHeight = bodyheight - 101
			$("#function").height($(document.getElementById('function').contentWindow.document.body).height() > minHeight ? $(document.getElementById('function').contentWindow.document.body).height() : minHeight);
			// $("#function").height($($('#function')[0].window.document.body).height() > minHeight ? $($('#function')[0].window.document.body).height() : minHeight);

			if(document.getElementById('function').contentWindow.document.title!='template'){
				document.title = document.getElementById('function').contentWindow.document.title
			}
		} catch (ex) {}
	}, 20);
});