/** 
 * @fileoverview Sid生成组件
 * <font color=red>依赖于BCore</font>
 * @author xiuming.wang
 * @version 0.1 
 */
;(function( window ){
	

	
	
	var timestamp=(new Date()).getTime();
	
	//用户获取域名的根域
	function getRootDomain(str){
		//去掉结尾的/
		str = str.replace(/\/$/ig,"");
		//去掉http://
		str = str.replace(/^(http|ftp|https|ssh):\/\//ig,"");
		//替换掉域名结尾
		str = str.replace(/(.com|.info|.net|.org|.me|.mobi|.us|.biz|.xxx|.ca|.mx|.tv|.ws|.com.ag|.net.ag|.org.ag|.ag|.am|.asia|.at|.be|.com.br|.net.br|.com.bz|.net.bz|.bz|.cc|.com.co|.net.co|.com.co|.co|.de|.com.es|.nom.es|.org.es|.es|.eu|.fm|.fr|.gs|.co.in|.firm.in|.gen.in|.ind.in|.net.in|.org.in|.in|.it|.jobs|.jp|.ms|.com.mx|.nl|.nu|.co.nz|.net.nz|.org.nz|.se|.tc|.tk|.com.tw|.idv.tw|.org.tw|.tw|.co.uk|.me.uk|.org.uk|.vg|.com.cn|.gov|.gov.cn|.cn)$/ig,"%divide%$1");
		
		var tail = str.split("%divide%")[1];
		if(typeof(tail)==="undefined")tail="";
		str = str.split("%divide%")[0];
		
		var strarr = str.split(".");
		
		return "."+strarr[strarr.length-1]+tail;
	}

	function getDomain(){
		var _url = window.location.href;
		//去掉http://
		_url = _url.replace(/^(http|ftp|https|ssh):\/\//ig,"");
		
		_url = _url.split("/")[0];
		//去掉端口号
		_url = _url.replace(/\:\d+$/ig,"");
		
		return _url;
	}

	
	//写cookies函数 
	function setCookie(name,value,expires)//两个参数，一个是cookie的名子，一个是值 
	{ 
		var exp  = new Date();    //new Date("December 31, 9998"); 
		if(expires === null || expires === undefined){
			expires = 60*60*1000
		}
	    
		var rootdomain = getRootDomain(getDomain());
		var domain_ex =  "";
		if(rootdomain.match(/^(\.[\d\w]+)+$/ig)!=null){
			
			domain_ex = "domain="+rootdomain+";";
			
		}
		
		exp.setTime(exp.getTime() + expires); 
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() +";path=/;" +domain_ex; 
	} 
	function getCookie(name)//取cookies函数        
	{ 
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")); 
		if(arr != null) return unescape(arr[2]); return null; 
	}
	
	//设置百分点sessionid
	if(!getCookie("bfd_sessionid_id")){
		setCookie("bfd_sessionid_id" ,timestamp+""+parseInt(Math.random()*9999999999999999) ,60*60*1000);//1小时过期
	}else{
		setCookie("bfd_sessionid_id" ,getCookie("bfd_sessionid_id") ,60*60*1000);//1小时过期
	}
	
	
	var SuperBCore = BCore;
	
	/**
	 * @class 新的BCore
	 */
	function NBCore(/**function*/ parm ){
		
		if(this.options.sid==""){
			this.options.sid = getCookie("bfd_sessionid_id");
		}
		if(this.options.sid == null || this.options.sid == undefined || this.options.sid == ""){
			this.options.sid = timestamp+""+parseInt(Math.random()*9999999999999999);
		}
		
		//SuperBCore.apply(this,arguments);
		SuperBCore.call(this,parm);
	}
	
	NBCore.prototype = new SuperBCore();
	
	NBCore.prototype._super = SuperBCore;
	
	//继承静态属性
	for(var key in SuperBCore){
		if(key=="prototype")continue;
		NBCore[key] = SuperBCore[key];
	}
	
	//$Core = BCore = NBCore;
	window.BCore = NBCore;
	window.$Core = NBCore;
})( window );