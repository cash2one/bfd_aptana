/** 
 * @fileoverview 这个文件是BCore的核心文件，提供BCore的代码风格以及通信相关的方法
 * @author xiuming.wang
 * @version 0.1 
 */

(function( window ){
	
	/**
	 * BCore 核心库，用于开辟一个程序入口
	 * @class
	 * @namespace BCore命名空间
	 * @constructor
	 * @name BCore
	 * @param {function} parm 页面加载成功后的回调函数
	 * @example
	 * new $Core(function(){
	 *     //引入相关库
	 *     var Request = $Core.Request;
	 *     this.options.uid	= "bfd_test_user";        //设置这个页面的用户名信息
	 *     this.push(new Request("visitItem"),"v1");
	 *     this.invoke();                             //提交请求
	 * });
	 */
	function BCore( /**function*/ parm ){
		//初始化
		this.instance_id = this["static"]["index"];
		this.pool = [];
		this["static"]["index"]++;
		BCore.instances[this.instance_id] = this;
		
		if ( typeof( parm ) === "function" ) {
			this.ready = parm;
			if(this["static"].pageReady)
				this.readyHook();
			else
				DOMContentLoaded(this);
		}
	}
	
	
	/**
	 * 缓存池
	 * @type Array
	 * @private
	*/
	BCore.prototype.pool = null;
	
	/**
	 * 记录实例编号
	 * @type Number
	 */
	BCore.prototype.instance_id = null;
	
	/**
	 * instance实例列表
	 * @type Array
	 * @static
	 */
	BCore.instances = [];
	
	/**
	 * BCore静态属性，只可以实例内部调用！
	 * @static	仅供实例调用
	 * @type Object
	 * @example
	 * this.static["id"]++;
	 */
	BCore.prototype["static"] = {
		"index"	:0,			//自动增长ID
		"pageReady":false		//页面是否加载完成
	};
	
	/**
	 * 参数设置
	 * @static	仅供实例调用
	 * @type Object
	 * @example
	 * this.options.cid = "customer_id";//设置百分点账户
	 * this.options.uid = "test_user";  //设置网站的当前用户
	 */
	BCore.prototype.options = {
		"cid"	:"",
		"surl"	:"http://ds.baifendian.com/",
		"uid"	:"",
		"sid"	:"",
		"fmt"	:'{"iid":$iid,"name":$name,"price":$attr.price,"url":$url,"img":$img}',
		"api":"Pack.do"
	};
	
	/**
	 * 回调函数
	 * @private
	 * @return void
	 */
	BCore.prototype.ready = function ( ) {
		
	}
	
	
	
	
	/**
	 * 页面加载完成钩子
	 * @private
	 */
	BCore.prototype.readyHook = function ( ) {
		this.ready();
	}
	
	/**
	 * 是否完成调用
	 * @private
	 */
	BCore.prototype.isLoaded = false;
	
	/**
	 * 过滤器
	 * @private
	 */
	var readyFilter = function (_core) {
		
		if(_core.isLoaded){
			return;
		}
		
		_core.isLoaded = true;
		_core["static"].pageReady = true;
		_core.readyHook();
	}
	
	
	/**
	 * 页面加载完成执行
	 * @private
	 */
	var DOMContentLoaded = function ( _core ) {
		
		var _this = _core;
	
	
		//如果页面已经准备好则立即执行
		if ( document.readyState === "complete" ) {
			return setTimeout( function(){readyFilter(_this);}, 0 );
		}
	
		// Mozilla, Opera and webkit
		if ( document.addEventListener ) {
			document.addEventListener( "DOMContentLoaded", function() {	
				document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
				(function(){  
					if ( !document.body ) {
						return setTimeout( arguments.callee, 1  );
					}
					setTimeout( function(){readyFilter(_this);}, 0 );
				})(); 
			}, false );

			// 补漏
			window.addEventListener( "load", function(){
				document.removeEventListener( "load", arguments.callee, false );
				setTimeout( function(){readyFilter(_this);}, 0 );
			}, false );

		//IE
		} else if ( document.attachEvent ) {
			//如果页面已经准备好则立即执行
			
			document.attachEvent( "onreadystatechange", function() {
				// 监听完成
				if ( document.readyState === "complete" ) {
					document.detachEvent( "onreadystatechange", arguments.callee );
					setTimeout( function(){readyFilter(_this);}, 0 );
				}
			} );

			// 补漏
			window.attachEvent( "onload", function(){
				document.detachEvent( "onload", arguments.callee );
				setTimeout( function(){readyFilter(_this);}, 0 );
			});

			// IE, 不在iframe中
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {  

				(function(){  
					try{  
						document.documentElement.doScroll('left');  
					}catch(e){  
						return setTimeout( arguments.callee, 1 );
					}  
					setTimeout( function(){readyFilter(_this);}, 0 );
				})();  

			}  
		}

	}
	
	/**
	 * 发送请求
	 * @example
	 * this.invoke();
	 */
	BCore.prototype.invoke = function ( ) {

		//引入库
		var Request = BCore.Request;
		
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
		var _url_global = this.options.surl + this.options.api +"?" + optstr + "callback=BCore.instances["+this.instance_id+"].jsonHook";

		for(var i = 0;i < this.pool.length;i++ ){
			if (typeof(this.pool[i]) !== "string")continue;
			//if(_url_global.length + 1 + this.pool[i].length>= 2048)continue;//单条请求过长，直接忽略.+1是为了加出连接符的长度
			
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
			
			this.jsonp( (new Array(_url_global + _packedpool[i])).join("&") + fmtstr );
		}
		
		//释放内存
		_url_global = null;
		_packedpool = null;
		
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
	 * JSONP方法
	 * @param {String} url 要请求的URL
	 */
	BCore.prototype.jsonp = function ( /**String*/url ) {
		//修改HTTPS模式url
		var _href = window.location.href;
		if(_href.indexOf("https://")==0){
			url = url.replace("http://","https://");
		}

		
		//URL中增加时间戳，避免缓存
		if(url.indexOf("?") ===-1 ){
			url+="?random="+(new Date()).getTime();
		}else{
			url+="&random="+(new Date()).getTime();
		}
		
		// 动态添加JS脚本，是JSONP技术的核心
		var script = document.createElement( 'script' );
		script.setAttribute( 'src', url );
		script.setAttribute( 'charset', "utf-8" );
	
		// 执行脚本，这个脚本实际上是百分点推荐引擎返回的一个回调函数，回调函数名
		// 已经由url中的callback参数指定，回调函数的参数则是此次请求返回的JSON数据结果
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( script );
		
	}
	
	/**
	 * 钩子函数
	 * @private
	 * @param {json} json 返回结果json
	 */
	BCore.prototype.jsonHook = function( /**json*/json ){
		this.jsonCallBack( json );
	}
	
	/**
	 * 用户的回调函数
	 * @private
	 * @param {json} json 返回结果json
	 */
	BCore.prototype.jsonCallBack = function( json ){}
	
	/**
	 * 设置百分点请求的回调函数
	 * @param {function} callBack
	 * @example
	 * new $Core(function(){
	 *   //引入相关库
	 *   var Request = $Core.Request;
	 *   this.options.uid	= "bfd_test_user";        //设置这个页面的用户名信息
	 *   this.push(new Request("visitItem"),"v1");
	 *   this.invoke();                             //提交请求
	 *   this.setCallBack(function(json){
	 *     if(json.v1){
	 *       alert(json.v1);
	 *     }
	 *   });
	 * });
	 */
	BCore.prototype.setCallBack = function( /**function*/callBack ){
		this.jsonCallBack = callBack;
	}
	
	
	/**
	 * 向缓存池里PUSH数据
	 * @param {Request} request
	 * @arguments {String} reqName 对应返回结果中的json 属性名 。若不指定则随机产生
	 * @example
	 * new $Core(function(){
	 *   //引入相关库
	 *   var Request = $Core.Request;
	 *   this.push(new Request("visitItem"),"v1");
	 * });
	 */
	BCore.prototype.push = function( /**Request*/request, /**String*/reqName){
		if(reqName===null||reqName===undefined){
			reqName = request.getRequestName() + "_" + Math.ceil(Math.random()*999999);
		}
	
		if(request instanceof BCore.Request){
			this.pool.push((new Array(reqName, "=", "api->", request.getRequestName(), "/\\",request.getQueryString("->", "/\\"))).join(""));
		}
	}
	
	


	/**
	 * @class 所有请求的基类，此类的主要功能是定义了生成各种请求URL的规则。<br>
	 * 注意：通常您不需要直接使用此类，以免写错必要的参数。 应尽可能使用具体的请求API。<br>
	 * @constructor
	 * @memberOf BCore
	 * @param {String} api 请求名称，字符串类型
	 */
	BCore.Request = function( /**String*/api ) {
		 
		 //初始化
		 this.api = api;
	}
	
	/** 
	 * 请求名称，字符串类型
	 * @type String
	 */	
	BCore.Request.prototype.api = null;
	

	/**
	 * 获取请求对应的URL中的QueryString 即：键值对参数。
	 * @param {String} assign_symbol 键值对参数符(默认:"=")
	 * @param {String} and_symbol 键值对连接符(默认: "&")
	 * @return {String} 请求对应的QueryString
	 * @example
	 * var Request = BCore.Request;
	 * var r = new Request("addItem");
	 * r.price = 1;
	 * alert(r.getQueryString()); //api=addItem&price=1
	 */
	BCore.Request.prototype.getQueryString = function( /**String*/assign_symbol, /**String*/and_symbol ) {
		if (assign_symbol === undefined || assign_symbol === null) {
			assign_symbol = "=";
		}
		if (and_symbol === undefined || and_symbol === null) {
			and_symbol = "&";
		}
		var keyvalue_array = new Array();
		for (var key in this) {
			if ( typeof this[ key ] !== "function" && key !== "api" ) {
				
				keyvalue_array.push((new Array(key, assign_symbol, this.combineStr(this[key])  )).join(""));
			}
		}
		return keyvalue_array.join( and_symbol );
	};
	
	
	
	
	/**
	 * 获取请求名称
	 * @return {String} 请求名称
	 * @example
	 * var Request = BCore.Request;
	 * var r = new Request("addItem");
	 * alert(r.getRequestName()); //addItem
	 */
	BCore.Request.prototype.getRequestName = function() {
		return this.api;
	};
	
	/**
	 * 将多个字符串用connector连接起来，与Array.join的唯一区别在于连接之前会做URI转换
	 * @param {Array|number|String} str_arr 字符串数组(若字符串则只做trim)
	 * @param {String} connector 字符串连接符号，默认值是 "|"
	 * @return {String} 将str_arr数组中的所有字符串经过URI编码，用connector连接后的字符串
	 */
	BCore.Request.prototype.combineStr = function(str_arr, connector) {
		
		if(typeof(str_arr)=="undefined")return "undefined";
		if(str_arr==null)return "null";
		
		function trim(str){
			//str = str.replace(new RegExp("\"","g"),"&quot;");
			str = str.replace(new RegExp("^\\s*","g"),"");
			str = str.replace(new RegExp("\\s*$","g"),"");
			return str;
		}
		
		if (connector === undefined || connector === null) {
			connector = "|";
		}
		
		var result = "";
		
		switch ( Object.prototype.toString.apply( str_arr ) ){
			case "[object Boolean]":
				if(str_arr){
					result = "true";
				}else{
					result = "false";
				}
				break;
			case "[object Number]":
				result = str_arr;
				break;
			case "[object String]":
				str_arr = trim( str_arr );
				result = encodeURIComponent( str_arr );
				break;
			case "[object Array]":
				var arr = new Array();
				for (var i = 0; i < str_arr.length; ++i ) {
					if( typeof(str_arr[ i ]) === "object" )continue;
					arr.push( this.combineStr( str_arr[ i ] ) );
				}
				result = arr.join( connector );
				break;
			case "[object Object]":
				var arr = new Array();
				for (var key in str_arr){
					if( typeof(str_arr[ key ]) === "function" )continue;
					if( typeof(str_arr[ key ]) === "object" )continue;
					arr.push( this.combineStr( key ) + ":" + this.combineStr( str_arr[ key ] ) );
				}
				result = arr.join( connector );
				break;
			default:
				break;
		}
		
		return result;
	};
	
	
	
	
	window.BCore = BCore;
	window.$Core = BCore;
})( window );
