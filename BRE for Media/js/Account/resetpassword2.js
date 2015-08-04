$(function(){
	var hash={ 
			'qq.com': 'http://mail.qq.com', 
			'gmail.com': 'http://mail.google.com', 
			'sina.com': 'http://mail.sina.com.cn', 
			'163.com': 'http://mail.163.com', 
			'126.com': 'http://mail.126.com', 
			'yeah.net': 'http://www.yeah.net/', 
			'sohu.com': 'http://mail.sohu.com/', 
			'tom.com': 'http://mail.tom.com/', 
			'sogou.com': 'http://mail.sogou.com/', 
			'139.com': 'http://mail.10086.cn/', 
			'hotmail.com': 'http://www.hotmail.com', 
			'live.com': 'http://login.live.com/', 
			'live.cn': 'http://login.live.cn/', 
			'live.com.cn': 'http://login.live.com.cn', 
			'189.com': 'http://webmail16.189.cn/webmail/', 
			'yahoo.com.cn': 'http://mail.cn.yahoo.com/', 
			'yahoo.cn': 'http://mail.cn.yahoo.com/', 
			'eyou.com': 'http://www.eyou.com/', 
			'21cn.com': 'http://mail.21cn.com/', 
			'188.com': 'http://www.188.com/', 
			'foxmail.coom': 'http://www.foxmail.com' 
			}; 
	function request(paras){
	    var url = location.href;
	    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	    var paraObj = {}
	    for (i = 0; j = paraString[i]; i++) {
	        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
	    }
	    var returnValue = paraObj[paras.toLowerCase()];
	    if (typeof(returnValue) == "undefined") {
	        return "";
	    }
	    else {
	        return returnValue;
	    }
	}
	var mail = request('username').split('@')[1]
	$('.main p em').html(request('username'))
	$('.blue-btn1').attr('href',hash[mail]||('http://mail.'+mail))
	
	$(window).resize(function(){
		 var bodyheight=document.documentElement.clientHeight
    	 var margintop=((bodyheight-268)/2>120)?((bodyheight-268)/2-50):((bodyheight-268)/2)
    	 $('#login-area').css('margin-top',margintop+'px')
	 }).resize()
})