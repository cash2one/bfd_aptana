/** 
 * @fileoverview 混合推荐模块
 * <font color=red>依赖于BCore, Recommend</font>
 * @author xiuming.wang
 * @version 0.1 
 */
;(function( window ){
	
	//导入BCore;
	
	var Recommend = BCore.recommends.Recommend;
	var mergeResponse = BCore.responses.mergeResponse;
	var Response = BCore.responses.Response;

	
	
	
	/**
	 * @namespace 该命名空间下包含混合推荐的相关类
	 * @memberOf BCore
	 */
	BCore.blends = {};

	
	/**
	 * @class 混合推荐。
	 * @constructor
	 * @name RecByYourFavorite
	 * @memberOf BCore.blends
	 * @param {number} num 请求结果的个数，默认可以不填写
	 */
	function RecByYourFavorite(num){
		this.num = null;
		if(num != undefined){
			this.num = num;
		}

		this.tag = "YF";
		this.cat = null;
		//this.uncat = null;
		this.cfg = {"RecVAV":40,"RecBAB":40};
		
		//推荐结果依据的参数
		this.iid = null;
		
	}
	RecByYourFavorite.prototype = new Recommend();
	RecByYourFavorite.prototype.index = 0;
	
	/**
	 * @function 获取混合推荐的字符串
	 * @constructor
	 * @name RecByYourFavorite#toString
	 * @memberOf BCore.blends
	 */
	RecByYourFavorite.prototype.toString = function (assign_symbol, and_symbol) {
		
		//求出配置文件中商品数的合
		var sumItem = 0;
		for(var key in this.cfg ){
			if(typeof this.cfg[key] !== "number" )continue;
			sumItem = sumItem + parseInt(this.cfg[ key ]);
		}
		
		//处理number
		if(this.num !== null){//若number不为空，则重新定义cfg
			
			for(var key in this.cfg ){
				if(typeof this.cfg[key] !== "number" )continue;
				this.cfg[key] = Math.round(this.num * this.cfg[key]/sumItem);
			}
		}
		
		numbers[ this.tag ] = this.cfg;
		
		sumItem = 0;
		for(var key in this.cfg ){
			if(typeof this.cfg[key] !== "number"  )continue;
			sumItem += parseInt(this.cfg[ key ]);
		}
		
		
		//sumItem += 10;//额外加载的请求结果数量，每个请求多加载10条，用于填充过滤掉的内容的位置
		
		var _query = new Array();
		//对混合结果进行生成字符串
		for(var key in this.cfg){
			if (typeof this.cfg[key] =="function")continue;
			var rec = new Recommend(key,sumItem);
			rec.iid = this.iid;
			
			if(this.cat!=undefined&&this.cat!=null){
				rec.cat = this.cat;
			}
			
			if(this.flt!=undefined&&this.flt!=null){
				rec.flt = this.flt;
			}
			
			var reqName =  this.tag + "_part" + this.index;
			
			this.index++;
			
			_query.push((new Array(reqName, "=", "api->", key, "/\\",rec.getQueryString("->", "/\\"))).join(""));
		}
		return _query.join("&");
	}
	
	
	
	/**
	 * 描述：对Response数组进行合并
	 * @private
	 * @parm Response[] response
	 * @return Response
	 */
	function merge( response ){
		//将结果集进行合并
		while( response.length > 1 ){
			var tmpRequest = mergeResponse( response[ response.length - 2],response[ response.length - 1 ] );
			response.splice( response.length - 2, 2);
			response.push( tmpRequest );
		}
		return response[0];
	}
	
	/**
	 * 描述：对Response数组进行去重
	 * @private
	 * @parm rec_Items[] response
	 * @parm string tag 
	 * @return Response[]
	 */
	function clean( response ,tag ){
		
		//存储去重结果的数组
		var newArray = new Array();
		var provisionalTable = {}; 
		//取出response中结果集length的最大值
		var maxRequset = 0;
		for(var i = 0; i < response.length; i++){
			//顺便对结果进行格式化
			response[ i ] = new Response( response[i] );
			//数遍对newArray初始化
			newArray.push(new Array());
			if( response[ i ].code != 0 )continue;//如果没有结果则跳过
			if( response[ i ].recs.length > maxRequset ){
				maxRequset = response[ i ].recs.length;
			}
		}
		
		//想象一下将遍历数组矩阵的方向顺时针旋转90度
		for(var i = 0,item; i < maxRequset; i++){
			for(var j = 0; j < response.length; j++){
				if( response[ j ].code != 0 )continue;//如果没有结果则跳过
				if( response[ j ].recs.length <= i )continue;
				
				item = response[ j ].recs[ i ];
				if( !provisionalTable[ item.itemId ]){
					newArray[ j ].push( item );
					provisionalTable[ item.itemId ] = true;
				}
			}
		}
		
		
		//先截取，然后将空余位置用剩下的结果补充
		//创建一个假的结果，用于装剩余的结果
		var Obj = new Object();
		Obj.recs = new Array();
		Obj.code = -1;
		
		var i = 0;
		var hollow = 0;
		for(var key in numbers[ tag ]){
			if(typeof numbers[ tag ][key] === "function" )continue;
			//归还newArray到response
			var endIndex = 0;
			var cfgLength = parseInt(numbers[ tag ][key] );
			if( cfgLength > newArray[ i ].length ){
				endIndex = newArray[ i ].length;
				hollow += cfgLength - endIndex;
			}else{
				endIndex = cfgLength;
			}
			
			if( response[ i ].code == 0 ){//顺便借个reqId
				Obj.reqId = response[ i ].reqId;
				Obj.code = response[ i ].code;//为了避免所有结果为空的时候，那么剩余结果页一定为空
			}
			response[ i ].recs = newArray[ i ].slice(0,endIndex);
			
			//将所有剩余结果都填充到临时结果集中
			Obj.recs = Obj.recs.concat( newArray[i].slice( endIndex, newArray[i].length ) );
			
			i++;
		}
		Obj.recs = Obj.recs.slice( 0, hollow );
		var hollowResponse = new Response( Obj );
		response.push( hollowResponse );

		return response;
	}
	
	/**
	 * 描述：返回结果加入价格因素
	 * @private
	 * @parm Response response
	 * @return Response
	 */
	function orderByPrice( response ){
		if(!response.recs)return response;
		
		var weightOrder = {};
		var priceOrder  = {};
		var priceArray  = response.recs.concat();

		priceArray.sort( function( a, b){ return parseFloat(b.itemPrice) - parseFloat(a.itemPrice) } );
		for(var i = 0; i < priceArray.length; i++){
			weightOrder[ response.recs[ i ].itemId ] = priceArray.length - i;
			priceOrder[ priceArray[ i ].itemId ]     = priceArray.length - i;
		}
		
		//W = a * W1 + （1 - a)W2
		response.recs.sort( function( a , b ){
			var wa = weightOrder[ a.itemId ]*orderArgument + ( 1 - orderArgument )*priceOrder[ a.itemId ];
			var wb = weightOrder[ b.itemId ]*orderArgument + ( 1 - orderArgument )*priceOrder[ b.itemId ];
			return wb - wa;
		});
		
		return response;
	}
	
	
	
	
	//导入BCore;
	var SuperBCore = BCore;
	var orderArgument = 0.4;//若指为1则完全按照权重排序，若值为0则完全按照价格
	
	var numbers = {};//用于存储请求结果的数量
	
	
	/**
	 * @class 新的BCore
	 */
	function NBCore(/**function*/ parm ){
		//SuperBCore.apply(this,arguments);
		SuperBCore.call(this,parm);
	}
	NBCore.prototype = new SuperBCore();
	NBCore.prototype.jsonHook = function( /**json*/json ){
		//对返回结果进行处理，合并带_part的结果
		var _mixobj = {};
		for(var key in json){
			if(typeof(json[key]) === "function")continue;
			//判断key是否包含_part
			if(key.indexOf("_part") === -1 || key.indexOf("_part") === 0)continue;
			
			var _mix_key = key.substr(0, key.indexOf("_part"));
			
			if(!_mixobj[_mix_key]){
				_mixobj[_mix_key] = [];
			}
			_mixobj[_mix_key].push( json[key] );
			delete json[key];
		}
		
		for(var key in _mixobj){
			if(Object.prototype.toString.apply( _mixobj[key] ) !== "[object Array]")continue;
			_mixobj[key] = clean(_mixobj[key],key);
			var result = merge(_mixobj[key]);
			
			//对结果进行价格排序
			result = orderByPrice(result);
			
			json[key] = result;
		}
		
		
		//调用super方法
		SuperBCore.prototype.jsonHook.call(this, json );
	}
	
	NBCore.prototype.push = function(/**Request*/request, /**String*/reqName){
		if(request instanceof RecByYourFavorite){
			request.tag = reqName;
			this.pool.push(request.toString());
			return;
		}
		//调用super方法
		SuperBCore.prototype.push.call(this, request, reqName);
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

	BCore.blends.RecByYourFavorite = RecByYourFavorite;
	
})( window );