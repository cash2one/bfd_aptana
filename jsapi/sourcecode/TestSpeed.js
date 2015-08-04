/** 
 * @fileoverview 这个文件是测试速度的JS文件
 * @author weidong.nie
 * @version 0.1 
 */
(function(window){
	/**
	 * _Timer 测试JS文件下载的速度 和 请求百分点服务器的速度
	 * @class
	 * @namespace _Timer命名空间
	 * @constructor
	 * @name _Timer
	 * @example
	 * _Timer.start('loadapi');
	 * _Timer.complate('loadapi')
	 * @private
	 */
	_Timer = {
		_date:{},
		flag:[],
		start :function(key){
			this._date[key] = new Date();
		},
		complate:function(key){
			var time = this._date[key];
			if(time){
				this._date[key] = new Date() - time;
			}
			return this._date[key];
		},
		getTime:function(key){
			return this._date[key];
		},
		createNode :function(node,url){
			var ss = document.createElement(node);
			ss.setAttribute('charset', "utf-8");
			ss.setAttribute('src', url);
			document.getElementsByTagName('head')[0].appendChild(ss);
			var self = this;
			ss.onload = function(){
				self.flag.push(self.complate('loadapi'));
			}
			ss.onerror = function(){
				self.flag.push(999999)
			}
		}
	}
	_Timer.start('loadapi');
	_Timer.createNode('script','http://www.baifendian.com/api/js/baifendian-bbbb.js');
	

	/**
	 * 从写JSONP方法
	 * @param {String} url 要请求的URL
	 */
	BCore.prototype.jsonp = function ( /**String*/url ) {
		_Timer.start('invoke');
		
		//URL中增加时间戳，避免缓存
		if(url.indexOf("?") ===-1 ){
			url+="?random="+(new Date()).getTime();
		}else{
			url+="&random="+(new Date()).getTime();
		}
		
		var _Timer_cid = (url.indexOf('.do?customer_id=') !== -1)?url.split('?')[1].split('&')[0].split('=')[1]:'';
		
		// 动态添加JS脚本，是JSONP技术的核心
		var script = document.createElement( 'script' );
		script.setAttribute( 'src', url );
		script.setAttribute( 'charset', "utf-8" );
	
		// 执行脚本，这个脚本实际上是百分点推荐引擎返回的一个回调函数，回调函数名
		// 已经由url中的callback参数指定，回调函数的参数则是此次请求返回的JSON数据结果
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( script );
		script.onerror = function(){
		_Timer.flag.push(999998);
		
		};
		script.onload=function(){
			var a = _Timer.flag,key='';
			if(a.length == 1 ){
				a.push(_Timer.complate('invoke'));
				for(var i=0;i<a.length;i++){
					var astr = a[i].toString(),_key = '',z = '';
					if(astr.length<7){
						var bb = 6 - astr.length;
						for(var j =0;j<bb;j++){
							z += '0';
						}
						_key = z + astr;
					}
					key += _key
				}
				var url = 'http://test.baifendian.com/x.php?c='+ key+'&customer_id='+_Timer_cid;
				var script = document.createElement('script');
				script.setAttribute('src', url);
				script.setAttribute('charset', "utf-8");
				document.getElementsByTagName('head')[0].appendChild(script);
			}
		}
	}
})(window);