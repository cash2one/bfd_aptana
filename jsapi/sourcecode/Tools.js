/**
 * @fileoverview 这个文件是工具类以及相关方法（API），Tools模块
 * <font color=red>与所有模块没有依赖关系，在BCore.js模块后加载即可</font>
 * @author weidong.nie
 * @version 0.1
 */
;(function(window){
	/**
	 * Tools 工具库
	 * @class
	 * @constructor
	 * @namespace Tools命名空间
	 * @constructor
	 * @name Tools
	 * @memberOf BCore.tools
	 */
	var Tools = function(){
	
	};
	
	Tools.prototype = {
		/**
		 * @name Tools.$
		 * @memberOf BCore.tools
		 * @function 查找标签
		 * @param {string} ElementId 标签id
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var div1 = Tools.$("bfd_div");
		 * div1.innerText = "hello!";
		 */
		$:function(){
			for(var i = 0;i<arguments.length;i++){
				var ele = argument[i]
				if(typeof arguments[0] == 'string'){
					ele = document.getElementById(arguments[0]);
				}
				if(arguments.length == 1){
					return ele;
				}else{
					return 'not support';
				}
			}
		},
		
		/**
		 * @name Tools.jsonp
		 * @memberOf BCore.tools
		 * @function jsonp
		 * @param {String} url 要请求的URL
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var Tools.jsonp("http://127.0.0.1/api.php?parm1=1&parm2=2&callback=mycallback");
		 * function mycallback(data){
		 * 	console.log(data);
		 * }
		 */
		jsonp:function ( /**String*/url) {
			
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
			
		},
		/**
		 * @name Tools.getChildByClass
		 * @memberOf BCore.tools
		 * @function getChildByClass
		 * @argument {DOM} target 要查找的DOM标签
		 * @argument {String} name 标签Class属性名·
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var mydiv = Tools.getChildByClass(document.getElementById("test"),"cname");//在ID为test的标签中查找class=cname的标签
		 */
		getChildByClass:function(target, value){
			var result = new Array();
			for (var i = 0; i < target.childNodes.length; i++) {
				var myelement = target.childNodes.item(i);
				//如果该节点有属性
				if (myelement.nodeType == 1) {//1为dom
					if (myelement.className == value) {
						result.push(myelement);
					}
				}
				
				//如果有子节点 则查询子节点
				if(myelement.hasChildNodes()) {
					var tmp = this.getChildByClass(myelement,value);
					if (tmp.length != 0) {
						result = result.concat(tmp);
					}
				}
			}
			
			return result;
		},
		/**
		 * @name Tools.cookie
		 * @memberOf BCore.tools
		 * @function getCookie
		 * @param {string} name cookie名
		 * @argument {string} value 值 ，如果value为null则删除cookie
		 * @argument {string} exp 过期时间
		 * @example
		 * //引入tools类 
		 * var Tools = BCore.tools.Tools;
		 * var coo = Tools.cookie("session_id");
		 */
		cookie:function(name){
			var value = undefined;
			if(arguments.length>=2){
				value = arguments[1];
			}
			
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+1);//默认为1天过期时间
			exp = exdate;
			if(arguments.length>=3){
				var exdate=new Date();
				exdate.setDate(exdate.getDate()+parseInt(arguments[2]));
				
				exp = exdate;
			}
			
			if(typeof(value)=="undefined"){		
				//alert("设置");
				if(name){
					var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
					if (arr != null){
						return decodeURI(arr[2]);
					}
					return null;
				}else{
					return document.cookie;
				}
			}else{//设置
				
				if(value!==null){//设置
				
					document.cookie = name+'='+value+';expires='+exp+';path=/;';
				}else{//删除
					//暂时为实现
					document.cookie = name+'=;expires=-1;path=/;';
				}
			}
		},
		/**
		 * @name Tools.setCookie
		 * @memberOf BCore.tools
		 * @function setCookie
		 * @param {string} Cookie name 
		 * @param {string} Cookie value 
		 * @param {string}or{number} days
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * Tools.setCookie('BFDcartItems','http://xxx.xxx.x|1',365)
		 */
		setCookie:function(cname,cval,days){
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+Number(days));
			document.cookie=cname+'='+encodeURI(cval)+";expires="+exdate.toUTCString()+';path=/;domain='+this.getRootDomain(this.getDomain())+";";
		},
		/**
		 * 用户获取域名的根域
		 * @name Tools.getRootDomain
		 * @memberOf BCore.tools
		 * @function
		 * @param {string} str 要处理的域名，例如:www.baifendian.com
		 * @return {String} 根域名 例如:.baifendian.com
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * Tools.getRootDomain('www.baifendian.com');
		 */
		getRootDomain:function (str){
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
		},
		/**
		 * 获取浏览器中的域名
		 * @name Tools.getDomain
		 * @memberOf BCore.tools
		 * @function
		 * @return {String} 根域名 例如:www.baifendian.com
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * Tools.getDomain();//www.baifendian.com
		 */
		getDomain:function (){
			var _url = window.location.href;
			//去掉http://
			_url = _url.replace(/^(http|ftp|https|ssh):\/\//ig,"");
			
			_url = _url.split("/")[0];
			//去掉端口号
			_url = _url.replace(/\:\d+$/ig,"");
			
			return _url;
		},
		/**
		 * @name Tools.childElements
		 * @memberOf BCore.tools
		 * @function 获取元素的所有子元素
		 * @author xiuming.wang
		 * @param {nodeObject} nodeObject
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * Tools.childElements(document.getElementById('xid'))
		 */
		childElements:function(elem){	
			var n = elem.firstChild;
			var r = [];
			if ( n && n.nodeType === 1) {
				r.push( n );
			}
			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1) {
					r.push( n );
				}
			}
			return r;
		},
		
		/**
		 * @name Tools.siblings
		 * @memberOf BCore.tools
		 * @function get siblings Array
		 * @param {nodeObject} nodeObject.nextSibling
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * Tools.siblings(document.getElementById('xid'))
		 */
		siblings:function(elem){	
			var n = elem.parentNode.firstChild;
			var r = [];
			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					r.push( n );
				}
			}
			return r;
		},
		/**
		 * @name Tools.prevAll
		 * @memberOf BCore.tools
		 * @function get prevAll Array
		 * @param {nodeObject} nodeObject.previousSibling
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * Tools.prevAll(document.getElementById('xid'))
		 */
		prevAll: function(elem) {
			var matched = [],
				cur = elem.previousSibling;

			while ( cur && cur.nodeType !== 9 && cur.nodeType !== 1 ) {
				matched.push( cur );
				cur = cur.previousSibling;
			}
			return matched;
		},
		/**
		 * 获取同级之前的相同元素
		 * @name Tools.preSameTagAll
		 * @memberOf BCore.tools
		 * @function preSameTagAll
		 * @param {nodeObject} elem nodeObject.previousSibling
		 * @author tenglong.jiang on 2012-2-21
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * Tools.preSameTagAll(document.getElementById('xid'))
		 */
		preSameTagAll : function(elem) {
			var matched = [],
			cur = elem.previousSibling;
			
			while (cur) {
				if(cur.nodeType == 1 && cur.nodeName == elem.nodeName) 
					matched.push( cur );
				
				cur = cur.previousSibling;
				
			}
			return matched;
		},
		/**
		 * 获取同级相同元素
		 * @name Tools.preSameTagsAll
		 * @memberOf BCore.tools
		 * @function preSameTagsAll
		 * @param {nodeObject} elem nodeObject.nextSibling
		 * @param {String} div span
		 * @author tenglong.jiang on 2012-3-4
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * Tools.preSameTagsAll(document.getElementById('xid'))
		 */
		preSameTagsAll:function(elem, name) {
			var matched = [];
			cur = elem;
			var i=0;
			while (cur) {
				if(cur.nodeType == 1 && cur.nodeName.toLowerCase() == name) {
					i++;
					matched.push( cur );
				}
				cur = cur.nextSibling;				
			}
			return matched;
		},
		/**
		 * 将复杂的字符串转换成Number
		 * @name Tools.toNumber
		 * @memberOf BCore.tools
		 * @function toNumber
		 * @param {string} str 需要转化的字符串
		 * @argument {string} 'http://' or 'https://'
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var price = Tools.toNumber("$120.00 ');
		 */
		toNumber:function (str){
			str = str.replace(/[^\d\.]/gi,'');
			return parseFloat(str);
		},
		/**
		 * @name Tools.fillPath
		 * @memberOf BCore.tools
		 * @function fillPath
		 * @param {string} URL String
		 * @argument {string} 'http://' or 'https://'
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var coo = Tools.fillPath("http://xxx.xxx.x",'http://');
		 */
		fillPath:function(u,hType){
			if(/^(https|http|ftp|sftp|ssh)/.test(u))return u;
			var _host = location.host,
				_href = location.href,
				_href = _href.replace(/^(http:\/\/|https:\/\/)/,''),
				type  = hType||'http://';
			
			if(u.indexOf('/')===0){
				var bb =type+_host+u;
				return bb;
			}else if(u.indexOf('./')===0){
				u = u.replace(/^.\//,'');
				var b=_href.split('/');
				var ho=b[0];
				b.pop();b.shift();
				var bb=type+ho+'/'+b.join('/')+'/'+u;
				return bb;
			}else if(u.indexOf('../')===0){
				while(u.indexOf("../")===0){
					u = u.replace(/^..\//,'');
				}
				var b=_href.split('/');
				var ho=b[0];
				b.pop();b.shift();
				var bb=type+ho+'/'+b.join('/')+'/'+u;
				return bb;
			}else{
				var b=_href.split('/');
				var ho=b[0];
				var bb=type+ho+'/'+u;
				return bb;
			}
		},
		/**
		 * @name Tools.trim
		 * @memberOf BCore.tools
		 * @function 去掉字符串的前后空白字符
		 * @param {string} str 文字
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var str = Tools.trim(" balabala.  ");
		 * alert(str) //输出"balabala."
		 */
		trim:function(){
			if(arguments[0] && typeof arguments[0] == "string"){
				return arguments[0].replace(/(^\s*)|(\s*$)/g,'');
			}else{
				return null;
			}
		},
		/**
		 * @name Tools.ltrim
		 * @memberOf BCore.tools
		 * @function 去掉字符串的左边空白字符
		 * @param {string} str 文字
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var str = Tools.ltrim(" balabala.  ");
		 * alert(str) //输出"balabala.  "
		 */
		ltrim:function(){
			if(arguments[0] && typeof arguments[0] == "string"){
				return arguments[0].replace(/(^\s*)/g,'');
			}else{
				return null;
			}
		},
		/**
		 * @name Tools.rtrim
		 * @memberOf BCore.tools
		 * @function 去掉字符串的右边空白字符
		 * @param {string} str 文字
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var str = Tools.rtrim(" balabala.  ");
		 * alert(str) //输出" balabala."
		 */
		rtrim:function(){
			if(arguments[0] && typeof arguments[0] == "string"){
				return arguments[0].replace(/(\s*$)/g,'');
			}else{
				return null;
			}
		},
		/**
		 * @name Tools.show
		 * @memberOf BCore.tools
		 * @function 让元素显示
		 * @param {string} Element id 
		 * @argument {string} str 显示形式
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var str = Tools.show('id','block');
		 */
		show:function(node,value){
			if(!(node = $(node))){return false;}
			node.style.display = value || '';
		},
		/**
		 * @name Tools.hide
		 * @memberOf BCore.tools
		 * @function 让元素隐藏
		 * @param {string} Element id 
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var str = Tools.hide('id');
		 */
		hide:function(node){
			if(!(node = $(node))){return false;}
			node.style.display = 'none';
		},
		/**
		 * @name Tools.toggle
		 * @memberOf BCore.tools
		 * @function 使元素改变显示状态
		 * @param {string} Element id
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var str = Tools.toggle('id');
		 */
		toggle:function(node){
			if(!(node = $(node))){return false;}
			if(node.style.display != 'none'){
				node.style.display = 'none'
			}else{
				node.style.display = value || '';
			}
		},
		/**
		 * @name Tools.bind
		 * @memberOf BCore.tools
		 * @function 为元素bind事件
		 * @param {string} Element id 
		 * @param {string} Event type 
		 * @param {function} Callback 
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var str = Tools.bind('id','click',function(){...});
		 */
		bind:function(node, type, listener){
			if(node.addEventListener){
				node.addEventListener(type,listener,false);
				return true;
			}else if(node.attachEvent){
				node.attachEvent('on' + type,listener);
				return true;
			}
			return false;
		},
		/**
		 * @name Tools.removeRepeatArr
		 * @memberOf BCore.tools
		 * @function 
		 * @param {array} arr 
		 * @author hongmei.qi
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var str = Tools.removeRepeatArr(['服装','男装','']);
		 */
		removeRepeatArr:function(arr){
			var obj = {};
			var arrNew = [];
			for(var i=0; i<arr.length; i++){
				if(!obj[arr[i]]){
					if(arr[i]!=''){
						arrNew.push(arr[i]);
					}
					obj[arr[i]]=1;
				}
			}
			return arrNew
		},
		/**
		 * @name Tools.mergeRepeat
		 * @memberOf BCore.tools
		 * @function 
		 * @param {array} arr 
		 * @author hongmei.qi
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var str = Tools.mergeRepeat([['23',1,34.5],['23',2,35]]);
		 */
		mergeRepeat:function(arr){
			var new_arr=[];
			var len=arr.length;
			for (var i=0;i<len;i++){
				for(var j=i+1;j<len;j++){
					if(arr[i][0]===arr[j][0]){
						var amount1 = arr[i][1];
						var price1 = arr[i][2];
						var amount2 = arr[j][1];
						var price2 = arr[j][2];
						var new_price = ((amount1 * price1 + amount2 * price2) / (amount1 + amount2)).toFixed(2);
						var new_amount = amount1 + amount2;
						arr[j] = [arr[j][0],new_amount, new_price];
						j = ++i;
					}
				}
				new_arr.push(arr[i]);
			}
			return new_arr;
			
		},
		/**
		 * @name Tools.getReqId
		 * @memberOf BCore.tools
		 * @function 
		 * @param {string} url 
		 * @author hongmei.qi
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var str = Tools.getReqId('http://www.baifendian.com?req_id=0213123wrwer324');
		 */
		getReqId:function(url){
			var str = "req_id=";
			var idx = url.indexOf(str);
			var ReqId = url.slice(idx + str.length);
			var re = /[a-zA-Z0-9]+/;
			return ReqId.match(re);
		},
		/**
		 * @name Tools.isFromRecommend
		 * @memberOf BCore.tools
		 * @function 
		 * @param {string} url 
		 * @author hongmei.qi
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var str = Tools.isFromRecommend('http://www.baifendian.com?req_id=0213123wrwer324');
		 */
		isFromRecommend:function(url){
			if(url.indexOf("req_id=") == -1){
				return false;
			}else{
				return true;
			}
		},
		/**
		 * @name Tools.getByteLen
		 * @memberOf BCore.tools
		 * @function 为元素bind事件
		 * @param {string} str 
		 * @param {string} len 
		 * @author hongmei.qi
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * var str = Tools.getByteLen('测试长度','10');
		 */
		getByteLen:function(str, len){
			var returnValue = '';
			var byteValLen = 0; 
			for (var i = 0; i < str.length; i++) { 
				if(str.charAt(i).match(/[^\x00-\xff]/ig) != null){
					byteValLen += 2;
				}else{
					byteValLen += 1;
				}
				returnValue += str.charAt(i);
				if(byteValLen > len) {
					break;
				}
			}
			return returnValue; 
		},
		/**
		 * 根据特殊的元素路径，获取页面元素。
		 * @name Tools.getNodeByBFDPath
		 * @memberOf BCore.tools
		 * @function getNodeByBFDPath
		 * @param {string} elem path
		 * @author tenglong.jiang on 2012-3-14
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * Tools.getNodeByBFDPath('html@@@0@0/body@@@2@0/div@@block@0@0/div@@flowBox@3@0')
		 */
		getElByBFDPath : function (s) {
			if(s == "" || typeof s!="string") return null;
			var arr = s.split("/");
			var el;
			for(var i=1; i<arr.length; i++) {		
				if((i+1) < arr.length) {
					if(i == 1)
						el = document.getElementsByTagName("body")[0];
					el = function(parent, node) {
						if(!parent) return;
						narr = node.split("@");
						if(narr[4] != "") {
							var n = Tools.prototype.preSameTagsAll(parent.firstChild, narr[0]);
							return n[narr[4]];
						} else
							return;	
					}(el, arr[i+1]);
				}
			}
			return el;
		},
		/**
		 * 根据过滤条件去重
		 * @name Tools.filterData
		 * @memberOf BCore.tools
		 * @function filterData
		 * @param {array} data
		 * @param {array} filter condition
		 * @author tenglong.jiang on 2012-4-12
		 * @example
		 * //引入tools类
		 * var Tools = BCore.tools.Tools;
		 * Tools.filterData([{"name":"多彩人生多彩裤","price":99},{"name":"多彩人生多彩裤","price":99}],["name", "price"])
		 */
		filterData : function(data, filter) {
			if ((data instanceof Array) && (filter instanceof Array)) {
				for(var i=0; i<data.length; i++) {
					for(var j=i+1; j<data.length; j++) {
						var flag = false;
						for(var k=0; k<filter.length; k++) {
							var f = filter[k];
							if(data[i][f] === undefined || data[i][f] !== data[j][f]) {
								flag = false;
								break;						
							} 
							flag = true;
						}
						if(flag) {
							data.splice(j,1);    
							j--; 
						}							
					}					
				}				
			}
		}
	};
	
	/**
	 * @class
	 * @name Repeat
	 * @memberOf BCore.tools
	 * @param {array} arr 
	 * @author hongmei.qi
	 * @example
	 * //引入tools类
	 * var var rept = new BCore.tools.Repeat();
	 * var str = rept.dedup([{"iid":"1"...},{"iid":"2"...}]);
	 */
	var Repeat = function (){
		this.obj = {};
	};
	
	/**
	 * @name Repeat#dedup
	 * @memberOf BCore.tools
	 * @function 
	 * @param {array} arr 
	 * @author hongmei.qi
	 * @example
	 */
	Repeat.prototype.dedup = function (arr){
		var arrNew = [];
		for (var i = 0; i < arr.length; i++) {
			if (!this.obj[arr[i].iid]) {
				arrNew.push(arr[i]);
				this.obj[arr[i].iid] = true;
			}
		}
		return arrNew;
	};
	
	
	
	/**
	 * @namespace 该命名空间下包含用于基础的输入相关类型
	 * @memberOf BCore
	 */
	BCore.tools = {};
	BCore.tools.Tools =  new Tools();
	BCore.tools.Repeat = Repeat;
})(window);