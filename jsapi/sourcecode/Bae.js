/** 
 * @fileoverview 
 * BAE产品模块<font color=red>依赖于BCore</font>
 * @author xiuming.wang
 * @version 0.1 
 */
;(function( window ){
	//导入类
	var SuperBCore = BCore;
	
	/**
	 * @class 新的BCore
	 */
	function NBCore(/**function*/ parm ){
		//SuperBCore.apply(this,arguments);
		SuperBCore.call(this,parm);
	}
	
	NBCore.prototype = new SuperBCore();
	
	/**
	 * 发送请求
	 * @example
	 * this.invoke();
	 */
	NBCore.prototype.invoke = function () {
		
		//引入库
		var Request = BCore.Request;
		
		var paramter = BCore.bae.getParamter();
		
		//处理URL长度
		var _packedpool = [""];
		
	
		
		//获取options
		var _ops = [];
		for(var key in this.options){
			if(typeof(this.options[key])==="function")continue;
			if(key==="surl")continue;
			if(key==="fmt")continue;
			if(key==="api")continue;
			_ops.push(key+"="+this.options[key]);
		}
		
		var optstr = _ops.join("&");
		if(optstr!==""){
			optstr += "&";
		}
		
		//获取预留长度
		var _url_global_simple = this.options.surl + this.options.api + "?" + optstr + "callback=BCore.instances["+this.instance_id+"].jsonHook";
		
		var _url_global = _url_global_simple + "&" + paramter;

		for(var i = 0;i < this.pool.length;i++ ){
			if (typeof(this.pool[i]) !== "string")continue;
			//if(_url_global.length + 1 + this.pool[i].length>= 2048-20)continue;//单条请求过长，直接忽略.+1是为了加出连接符的长度
			
			if(_url_global.length + 1 + this.pool[i].length + 1 + _packedpool[_packedpool.length-1].length + (/**将FMT的长度预留出来*/this.options.fmt?this.options.fmt.length+5:0) >= 2048-20){//-20是为了留出随机数的位置
				if(_packedpool[_packedpool.length-1]!=""){
					_packedpool.push("");
				}
			}
			
			_packedpool[_packedpool.length-1] = (new Array(_packedpool[_packedpool.length-1], this.pool[i])).join("&");
		}
		
		//清空缓存池
		this.pool = [];
		
		
		//发送请求
		for(var i = 0; i<_packedpool.length; i++){
			var fmtstr = "";
			if(isRecomond(_packedpool[i])){
				fmtstr = "&fmt="+this.options.fmt;
			}

			if(isBAE(_packedpool[i])){
				this.jsonp( filterBAE( (new Array(_url_global + _packedpool[i])).join("&") ) + fmtstr );
			}else{
				this.jsonp( (new Array(_url_global_simple + _packedpool[i])).join("&") + fmtstr );
			}
		}
		
		//释放内存
		_url_global = null;
		_packedpool = null;
		
	}
	
	NBCore.prototype._super = SuperBCore;
	
	//继承静态属性
	for(var key in SuperBCore){
		if(key=="prototype")continue;
		NBCore[key] = SuperBCore[key];
	}
	
	//$Core = BCore = NBCore;
	window.BCore = NBCore;
	window.$Core = NBCore;
	
	
	/**
	 * 访问页面事件。同时，可以用于强制发送BAE请求
	 * @name BCore#visitPage
	 * @function
	 * @example
	 * //注:该方法必须在this.invoke()方法前调用
	 * this.visitPage();
	 * this.invoke();
	 */
	NBCore.prototype.visitPage = function (){
		var bae = new BCore.bae.BAE();
		this.push(bae);
	}
	
	/**
	 * @private 对BAE参数进行过滤
	 */
	function filterBAE(url){
		var _parmArr = url.split("&");
		var _newArr = [];
		for(var i = 0;i<_parmArr.length;i++){
			if(_parmArr[i].indexOf( "api->BAE/\\")==-1){
				_newArr.push(_parmArr[i]);
			}
		}
		return _newArr.join("&");
	}
	
	/**
	 * @private 判断是否为推荐请求
	 */
	function isRecomond(url){
		if(url.indexOf("api->GetUserBH/\\")!=-1)return true;
		if(url.indexOf("api->GetUserVH/\\")!=-1)return true;
		if(url.indexOf("api->HotBuy/\\")!=-1)return true;
		if(url.indexOf("api->HotVisit/\\")!=-1)return true;
		if(url.indexOf("api->RecBAB/\\")!=-1)return true;
		if(url.indexOf("api->RecFBT/\\")!=-1)return true;
		if(url.indexOf("api->RecForUser/\\")!=-1)return true;
		if(url.indexOf("api->RecSimiI/\\")!=-1)return true;
		if(url.indexOf("api->RecVAV/\\")!=-1)return true;
		if(url.indexOf("api->RecVUB/\\")!=-1)return true;
		return false;
	}
	
	
	/**
	 * @private 判断是否传递bae参数
	 */
	function isBAE(url){
		if(url.indexOf("api->Visit/\\")!=-1)return true;
		if(url.indexOf("api->AddFav/\\")!=-1)return true;
		if(url.indexOf("api->RmFav/\\")!=-1)return true;
		if(url.indexOf("api->AddCart/\\")!=-1)return true;
		if(url.indexOf("api->RmCart/\\")!=-1)return true;
		if(url.indexOf("api->Review/\\")!=-1)return true;
		if(url.indexOf("api->FeedBack/\\")!=-1)return true;
		if(url.indexOf("api->Order/\\")!=-1)return true;
		if(url.indexOf("api->Buy/\\")!=-1)return true;
		if(url.indexOf("api->Search/\\")!=-1)return true;
		if(url.indexOf("api->BAE/\\")!=-1)return true;
		return false;
	}
	
	var Request = BCore.Request;
	
	/**
	 * @namespace 该命名空间下包含BAE相关类和属性
	 * @memberOf BCore
	 */
	BCore.bae = {};
	
	/**
	 * @class 浏览商品
	 * @example
	 * var bae = new BCore.bae.BAE();
	 * @constructor
	 * @memberOf BCore.bae
	 * @extends BCore.Request
	 */
	function BAE() {
		Request.call(this, "BAE");
	}
	/* 继承自 UserAction */
	BAE.prototype = new BCore.Request();
	
	
	/**
	 * @private reqstatus,服务器端用来验证页面某页面的请求序数
	 */
	BCore.bae.reqstatus = 0;

	
	/**
	 * @class 参数设置
	 * @static
	 * @type Object
	 * @memberOf BCore.bae
	 * @name options
	 * @property {PAGE_TYPE} type 页面类型
	 * @property {String} signature 当前页面的说明
	 * @property {String} parent 是当前页面所属的父类
	 * @example
	 * var baeOpt =  BCore.bae.options;
	 * baeOpt.type = PAGE_TYPE.GOODS;
	 * baeOpt.signature = "LohashillBB裸妆霜"; //产品名称
	 * baeOpt.parent = "化妆用品";//类别名称
	 * @see BCore.bae.PAGE_TYPE
	 */
	BCore.bae.options = {
		"type"		:"",
		"signature"	:"",
		"parent"	:""
	};
	
	/**
	 * @class 页面类型
	 * @static
	 * @type enum 
	 * @memberOf BCore.bae
	 * @name PAGE_TYPE
	 * @example 
	 * var baeOpt =  BCore.bae.options;
	 * baeOpt.type = PAGE_TYPE.GOODS;
	 * baeOpt.signature = "LohashillBB裸妆霜"; //产品名称
	 * baeOpt.parent = "化妆用品";//类别名称
	 * @see BCore.bae.options
	 * @property {number} HOME 首页
	 * @property {number} ACTIVE 活动页
	 * @property {number} LIST 目录页
	 * @property {number} GOODS 单品页
	 * @property {number} SEARCH 搜索结果页
	 * @property {number} CART 购物车页
	 * @property {number} PURCHASE 购买页
	 * @property {number} DONE 购买成功页
	 * @property {number} MEMBER 会员页
	 * @property {number} HELP 帮助页
	 * @property {number} NEWS 资讯页
	 */ 
	BCore.bae.PAGE_TYPE = {
		HOME : 1,
		ACTIVE : 2,
		LIST : 3,
		GOODS : 4,
		SEARCH : 5,
		CART : 6,
		PURCHASE : 7,
		DONE : 8,
		MEMBER : 9,
		HELP : 10,
		NEWS : 11
	};
	
	/**
	 * @private 用来获取BAE参数
	 */
	var bf = {
		sengin :["baidu.com", "baidu.com", "google.com", "google.cn","google.com.hk", "sogou.com", "zhongsou.com", "search.yahoo.com", "one.cn.yahoo.com", "soso.com", "114search.118114.cn", "search.live.com", "youdao.com", "gougou.com", "bing.com"],
		sword : ["word", "wd", "q", "q","q","query", "w", "p", "p", "w", "kw", "q", "q", "search", "q"],
		_n:(new Date()).getTime(),// 获取现在时间
			//各个参数 解释 说明  
		//rs=分辨率 ja=java支持 oc=语言编码 ln=来源 lk=搜索引擎关键字 ep=当前页面 ct=当前页面标题 bt=浏览器类型 ot=操作系统 fv=flash版本
		_t:["rs=","ja=","oc=","ln=","lk=","ep=","ct=","bt=","ot=","fv="], // 发送的参数
		_s : 30 //session时长
			};
		
		var a=document;
		var h=a.location;
		var d=window;
		var g=navigator;
		var orderArray = orderArray||[];
		 // url 加密 
		var j=encodeURIComponent;
		
		/**
		 * @private
		 * @igone
		 */
		//获取获取网页中标签名字的信息 
		function i_(k){
			return a.getElementByTagName(k)||null;
			}

	   
		/**
		 * @private
		 * @igone
		 */
		// 存放一些标志信息 
		function f(){
			this.tag={};
			}
		//配置各个参数属性
		f.prototype={

		   // 获取屏幕的分辨率 
		   getFl:function(){
			this.tag.fl=(d.screen.width+"x"+d.screen.height);
				},
		   // 是否支持Java 
		   getJa:function(){
			this.tag.ja=(g.javaEnabled()?"1":"0");
			},
		   // 获取系统编码
		   getDs:function(){
			   var k;
			   if(g.systemLanguage){
					k=g.systemLanguage ;
				 }else{
					if(g.browserLanguage){
						  k=g.browserLanguage;
					  }else{
						if(g.language){
							k=g.language ;
						}else{
							 if(g.userLanguage){
								k=g.userLanguage;
								}else{
									k=""
								}
						 }
					}
				}
				this.tag.ds=k.toLowerCase(); // 转换成小写
			},
		  //获取网站的来源
		  getLn:function(){
				  var k=a.referrer; 
				
				this.tag.ln=k?j(k):""
				},
		  // 拆分url 
		  splitDir:function(r_,t){
					return (r_.replace("//","/")).split(t);
				},
		  // 判断来源页面是否是 搜索引擎
		  samDom:function(r,v){        	   	  
			   if(r==""||r==null){
					return false;
					}
				  var n =this.splitDir(r,"/")[1]
				var s=v.length;
				  for(var p=0;p<s;p++){
					  var o=v[p];
					  var m=n.indexOf(o);
					  if(m>-1){
					   this.tag.ref=n;
						 return true ;
					   }
				   }
				  return false;
				},
		  // 获取 搜索引擎的关键字 
	  getLo:function(r){
		if(r==""||r==null){
			this.tag.lo="" ;
			return ;
					}
				if(r.indexOf("?")>=0){
				var q=this.splitDir(r,"?");
					if(q.length>0){
						for(var z=0 ;z<q.length ;z++){
								if(q[z].indexOf("&")>=0){
									var l=q[z].split("&");
									for(var m = 0 ; m < l.length ; m++){
										var r_ = l[m].split("=");
										for(var b=0 ;b<bf.sword.length; b++){
												if(r_[0].toLowerCase()==bf.sword[b] && r.indexOf(bf.sengin[b])>=0){
														this.tag.lo=r_[1];
														return ;
													}
											}
									}
								}else{
									if(q[z].indexOf("=")>=0){
									 var r_ = q[z].split("=");
									 for(var b=0 ;b <bf.sword.length ; b++){
											if(r_[0].toLowerCase()==bf.sword[b] && r.indexOf(bf.sengin[b])>=0){
														this.tag.lo=r_[1];
														return ;
										}
										  }
								  }
									}
							}
					}else{
						this.tag.lo="" ;
						}
				 }else{
							this.tag.lo="" ;
				   }                
	 
					},
		// 获取当前页面  
		getEp:function(){
				 this.tag.ep=j(document.location.href);
				},
		//获取网页的title
		getEt:function(){
					var t=a.title;
					if(t==null){
						 var t_ =i_("title");
						 if(t_!=null&&t_.length>0){
							  t=t_[0];
							}else{
								t="";
								}
						}
					this.tag.et= j(t).substr(0,500);
				},
		// 获取操作系统和浏览器总信息 	
		getAgent:function(){
					  return g.userAgent.toLowerCase() ;
					},
		//获取浏览器 类型
		getCp:function(){        	     
		  var u=this.getAgent();                 
				  if(u.indexOf("msie")>=0){
							this.tag.cp="IE";
							this.tag.cs=document.charset;
							var m=g.appVersion.toLowerCase();
							var z="msie";
					 if(m.indexOf(z)>=0){
						   var m_=m.split(";");
						   for(var i=0 ; i<m_.length ;i++){
							   if(m_[i].indexOf(z)>-1){
								 this.tag.cp=(m_[i].replace(z,"IE"));
								 break;
								}
							}
						 }
				  }
				  if(u.indexOf("se")>0){ this.tag.cp="SoGouBrowser";  }
				  if(u.indexOf("tencenttraceler")>0){ this.tag.cp="QQTT"; }
				 
				  if(u.indexOf("360se")>0){this.tag.cp="360SE"; }
				  if(u.indexOf("theworld")>0){  this.tag.cp="TheWorld";}
					  if(u.indexOf("firefox")>=0){  this.tag.cp="Firefox" ; this.tag.cs=document.characterSet;}
					  if(u.indexOf("safari")>=0){this.tag.cp="Safari"; this.tag.cs=document.charset;}
					  if(u.indexOf("camino")>=0){this.tag.cp="Camino"; this.tag.cs=document.charset;}
					  if(u.indexOf("konqueror")>=0){this.tag.cp="Konqueror" ;this.tag.cs=document.charset;}
					  if(u.indexOf("chrome")>=0){this.tag.cp="googleBrowser" ; this.tag.cs=document.charset;}
					  if(u.indexOf("opera")>=0){this.tag.cp="Opera";this.tag.cs=document.charset;}
				  if(u.indexOf("maxthon")>0){this.tag.cp="MaxThon" ; this.tag.cs=document.charset;}
								  
					 },	
		//获取操作系统
		getCw:function(){
					 var u=this.getAgent();
					 var iw = (g.platform.toLowerCase()=="win32")||(g.platform =="windows");                                                    
				 var im = (g.platform.toLowerCase()=="mac68k")||(g.platform.toLowerCase()=="macppc")||(g.platform.toLowerCase()=="macintosh");
				   if(im) this.tag.cw="Mac";
				   var iu = (g.platform=="X11") && !iw && !im; 
					 if(iu) this.tag.cw="Unix"; 
				 var il =(String(g.platform).indexOf("Linux") > -1); 
					 if(il) this.tag.cw="Linux"; 
					 if(iw){  
							if(u.indexOf("windows nt 5.0") > -1 ||u.indexOf("windows 2000") > -1){
								  this.tag.cw="Win2000"; 
							 }
						  if(u.indexOf("windows nt 5.1") > -1 || u.indexOf("windows xp") > -1) {
								this.tag.cw="WinXP"; 
						   }
						  if(u.indexOf("windows nt 5.2") > -1 || u.indexOf("windows 2003") > -1){
								  this.tag.cw="Win2003";
							 }
							if(u.indexOf("windows nt 6.1") >-1 || u.indexOf("windows 7")>-1){
									this.tag.cw="Win7";
							   }
					 } else{
					  this.tag.cw="None";
					   } 
				},
		//获取Flash版本
		getFs:function() {
						var f = "-";
						if (g.plugins && g.plugins.length) {
							for (var ii = 0; ii < g.plugins.length; ii++) {
								  if (g.plugins[ii].name.indexOf('Shockwave Flash') != -1) {
									  f = g.plugins[ii].description.split('Shockwave Flash ')[1];
									  break;
								 }
							}
						} else if (window.ActiveXObject) {
							 for (var ii = 10; ii >= 2; ii--) {
								try {
								   var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
								   if (fl) {
									   f = ii + '.0';
									  break;
								   }
								} catch (e) {
							   }
						   }
						}
						this.tag.fs=f;
				},
		//获取服务类型
		getProtocol:function(){
					 return(h.protocol=="https:"?"https://":"http://");
					},
		// 获取域名
		getAcc:function(){
					this.tag.cf=document.domain;  
					},
		//设置 cookie  n= name  ; v = value  ;
		//k =失效时间 
		setCookie:function(n,v,k){
				var t_e = new Date();
				  t_e.setTime(t_e.getTime()+k);
				  a.cookie=n+"="+escape(v)+((k==null)?" ":";expires="+t_e.toUTCString() + ";path=/;");
					},
		//获取cookie 
		getCookie:function(l){
								var m=new RegExp("(^| )"+l+"=([^;]*)(;|\x24)");
								var k=m.exec(a.cookie);
								if(k){
				return unescape(k[2])||"" ;
										}
								return"" ;
					},
		//随机生成Cookie的值
		isRandom:function(){
					   return Math.ceil(Math.random()*100000000);
						},
		//格式化日期yyyyMMdd
		getS_d : function(t){
			var u = new Date(t);
			var m=u.getMonth()+1;
			var d=u.getDate();
			if(m<10){
				m="0"+m;
			}
			if(d<10){
				d="0"+d;
			}
			return u.getFullYear()+m+d;
		},
		//设置session超时
		setSessiontimeout : function(t){
			bf._s = t; 
		},
		//获取session超时
		getSessiontimeout : function(){
			return bf._s; 
		},
		//获取域哈希
		getH:function(f){
						  var h="";
							for(var i=0;i<f.length;i++){
							  h+=((f.charAt(i)).charCodeAt()+'').charAt(1);
							}
						   return h;
		},
		// 判断用户的 cookie 单独测试的时候需要 getAcc();
		isCookie : function() {
			var c = [];
			var c_0 = "tmf";
			var c_l = "tma";
			var c_c = "tmb";
			var c_3 = "tmc";
			var c_6 = "tmd";
			var v = this.getH(this.tag.cf) + "." + this.isRandom() + "." + bf._n;
			var cc = bf._n;
			//关闭浏览器就失效的cookie
			var timeout = this.getSessiontimeout();
			l = timeout * 60 * 1000;
			//120分失效的cookie
			if(this.getCookie(c_3) == null || this.getCookie(c_3) == "") {
				this.setCookie(c_3, "1." + v + "." + cc + "." + cc, l);
			} else {
				var ma = this.getCookie(c_3);
				var a = ma.split(".");
				try {
					a[0] = parseInt(a[0]) + 1 + "";
					__n = (new Date()).getTime();
					a[4] = a[5];
					a[5] = __n;
				} catch(e) {
					this.setCookie(c_3, "0." + v + "." + cc + "." + cc, l);
				}
				this.setCookie(c_3, a.join("."), l);
			} 
			// 设置一个 长久的 cookie 2 年   ;
			var l = 24 * 30 * 24 * 60 * 60 * 1000;
			if(this.getCookie(c_l) == null || this.getCookie(c_l) == "") {
				this.setCookie(c_l, v + "." + bf._n + "." + bf._n + "." + 1, l);
			} else {
				var ma = this.getCookie(c_l);
				var a = ma.split(".");
				if(a.length == 6) {
					__n = (new Date()).getTime();
					try {						
						if(this.getS_d(parseInt(a[4])) < this.getS_d(parseInt(__n))) {
							a[5] = parseInt(a[5]) + 1;
							a[3] = a[4];
							a[4] = __n;
						}						
					} catch(e) {
						this.setCookie(c_l, v + "." + bf._n + "." + bf._n + "." + 1, l);
					}
					this.setCookie(c_l, a.join("."), l);
				} else {
					this.setCookie(c_l, v + "." + bf._n + "." + bf._n + "." + 1, l);
				}
			}
			// alert(this.getCookie(c_l)+'cookie 两年');
			//设置一个来源的 cookie 时间 6个月
			l = 6 * 30 * 24 * 60 * 60 * 1000;
			var v__ = 0 + "." + v;
			if(this.getCookie(c_6) == "") {
				this.setCookie(c_6, "0." + v + ".", l);
			}
			var r_ = decodeURIComponent(this.tag.ln);
			if(r_ != "" && h.href.indexOf("?") >= 0) {
				if(r_.indexOf(this.tag.cf) < 0 && h.href.indexOf(this.tag.cf) >= 0) {
					var v___ = h.href.substring(h.href.indexOf("?") + 1, h.href.length);
					var ma = this.getCookie(c_6);
					var a = ma.split(".");
					if(v___.indexOf("&") >= 0) {
						var vs = v___.split("&");
						for(var i_ = 0; i_ < vs.length; i_++) {
							if(vs[i_].indexOf("t__") >= 0) {

								var t__ = vs[i_].substring(vs[i_].indexOf("=") + 1, vs[i_].length);
								if(a[a.length - 1] != t__) {
									this.setCookie(c_6, v__ + "." + t__, l);
								}

							}
						}
					} else {
						var t__ = v___.substring(v___.indexOf("=") + 1, v___.length);

						if(a[a.length - 1] != t__) {
							this.setCookie(c_6, v__ + "." + t__, l);
						}

					}

				}
			}
			if(this.getCookie(c_6)) {
				var ma = this.getCookie(c_6);
				var a = ma.split(".");
				try {
					a[0] = parseInt(a[0]) + 1 + "";
				} catch(e) {
				}
				this.setCookie(c_6, a.join("."), l);
			}
			c.push(c_l + "=" + this.getCookie(c_l));
			c.push(c_3 + "=" + this.getCookie(c_3));
			c.push(c_6 + "=" + this.getCookie(c_6));
			return c.join("&");
		},
		// 初始化
		init:function(){
					this.getFl(); 
					this.getJa();
					this.getDs();
					this.getLn(); 
					if(this.samDom(a.referrer,bf.sengin)){
						this.getLo(a.referrer);
					}else{
						this.getLo("");
					}
					this.getEp();
					this.getEt();
					this.getCp();
					this.getCw();              		
					this.getFs();
			this.getAcc();
		},               	     
		//连接服务器 
		initBridge:function(){                        
			this.init();
			//rs=分辨率 ja=java支持 oc=语言编码 ln=来源 lk=搜索引擎关键字 ep=当前页面 ct=当前页面标题 bt=浏览器类型 ot=操作系统 fv=flash版本
				return bf._t[0]+this.tag.fl+"&"+
				   bf._t[1]+this.tag.ja+"&"+
				   bf._t[2]+this.tag.ds+"&"+
				   bf._t[3]+this.tag.ln+"&"+
				   bf._t[4]+this.tag.lo+"&"+
				   bf._t[5]+this.tag.ep+"&"+
				   //bf._t[6]+this.tag.et+"&"+      //注掉获取标题
				   bf._t[7]+this.tag.cp+"&"+
				   bf._t[8]+this.tag.cw+"&"+
				   bf._t[9]+this.tag.fs+"&"+
		   this.isCookie();
		}
	}

	/**
	 * @private 写cookie
	 */
	function setCookie(name,value,expires)//两个参数，一个是cookie的名子，一个是值 
	{ 
		var Days = 1; //此 cookie 将被保存 1 天 
		var exp  = new Date();    //new Date("December 31, 9998"); 
		if(expires === null || expires === undefined){
			expires = Days*24*60*60*1000
		}
	   
		exp.setTime(exp.getTime() + expires); 
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + "path=/;"; 
	}
	/**
	 * @private 读cookie
	 */
	function getCookie(name)//取cookies函数        
	{ 
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")); 
		 if(arr != null) return unescape(arr[2]); return null; 
	} 

	//设置COOKIE
	if(getCookie("bfd_tag_id") == null){
		setCookie("bfd_tag_id","0");
	}else{
		setCookie("bfd_tag_id",new String(parseInt( getCookie( "bfd_tag_id" ) ) + 1));
	}
	
	var timestamp=(new Date()).getTime();

	/**
	 * @private 获取BAE参数
	 */
	BCore.bae.getParamter=function(){
		var status = BCore.bae.reqstatus++;
		var urlarr = new Array("status=", status);
		
		urlarr = urlarr.concat(new Array("&","tag=",getCookie("bfd_tag_id") + "_" + timestamp));
		
		var baeOpt = BCore.bae.options;
		
		//下面是获取bae中手动设置的3个参数（type，signature，parent）
		//设置PageInfo.type的默认值
		var b = new f();
		b.getEt();
		if(baeOpt.type===""){
			baeOpt.type = b.tag.et;
		}
		
		for(var key in baeOpt){
			if(typeof(baeOpt[key])==="string" || typeof(baeOpt[key])==="number"){
				var urlkey = key;
				switch(urlkey){
					case "type":
						urlkey = "_t";
						break;
					case "signature":
						urlkey = "_s";
						break;
					case "parent":
						urlkey = "_p";
						break;
					default:
						break;
				}
				
				urlarr = urlarr.concat(new Array("&"+urlkey+"=",encodeURIComponent(baeOpt[key])));
			}
			
		}
		
		
		//下面是WABI需要添加的其他参数
		var b = new f();
		if(typeof(BCore.bae.t)!="undefined"){
			b.setSessiontimeout(BCore.bae.t);
		}
		urlarr = urlarr.concat(new Array("&",b.initBridge()));
		return urlarr.join("");
	}
	
	
	/**
	 * @function 设置BAE代码中session过期时间
	 */
	BCore.bae.setSessiontimeout=function(t){
		BCore.bae.t=t;
	}
	
	BCore.bae.BAE = BAE;
	
})( window );