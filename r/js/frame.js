$(function() {
    $.ajaxSettings.traditional = true
    window.setInterval(function(){
        try {
            var bodyheight = window.parent.document.documentElement.clientHeight
            var minHeight = bodyheight - 101
            $(window.parent.document).find("#function").height($("body").height() > minHeight ? $("body").height() : minHeight);
        } 
        catch (ex) {
        }
    }, 20);
	window.parent.document.title =window.document.title 
});