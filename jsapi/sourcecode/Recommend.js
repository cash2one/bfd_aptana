/**
 * @fileoverview 推荐类以及相关方法，Recommend模块；还包括Response类以及mergeResponse方法
 * <font color=red>依赖于BCore.js</font>
 * @author weidong.nie xiuming.wang peng.zhang
 * @version 0.1
 */
 
;(function (window) {
	//导入类
	var Request = BCore.Request;
	
	/**
	 * @namespace 该命名空间下包含用于推荐的相关类型
	 * @memberOf BCore
	 */
	BCore.recommends = {};
	
	/**
	 * @namespace 该命名空间下包含用于响应的相关类型
	 * @memberOf BCore
	 */
	BCore.responses = {};
	
	/**
	 * @memberOf BCore.recommends
	 * @name Filter
	 * @class
	 * @constructor
	 * @param {String} name 属性名
	 * @param {String} operator 连接符 可以是EQ(或==)、NE(或!=)、GE(或>=)、GT(或>)、LE(或<=)、LT(或小于)、IN、LIKE。其中为LIKE的时候，value必须为正则表达式。为IN的时候，value必须为数组。
	 * @param {Mix} value 若operator为IN,则此处类型必须为数组。若operator为LKIE，此处类型必须为正则表达式(字符串)
	 * @example 
	 * var filterCat  = new Filter("cat","in",[1,2,4]);
	 * var filterPrice  = new Filter("Price",">=",1000);
	 * var cfiterconnectFilter = connectFilter(filterCat.toString(),"or",filterPrice.toString()); 
	 */
	function Filter(name, operator, value) {
		this.name = name;
		this.operator = operator.toUpperCase();
		this.value = value;
	}
	
	/**
	 * @memberOf BCore.recommends
	 * @name Filter#toString
	 * @function
	 * @return {String}
	 */
	Filter.prototype.toString = function(){
		var thisobj = this;
		
		function parse_in(connectstr,bln){
			
				if(typeof(thisobj.value)=="function") return "";
				return( (typeof(bln)!=="undefined"?bln+" ":"") + thisobj.name + " "+connectstr+" " + (typeof(thisobj.value[0])==="string"?"[\"" + thisobj.value.join("\",\"") + "\"]":"["+thisobj.value.join(",")+"]")   );
		}
		
		function parse_like(connectstr,bln){
				if(typeof(thisobj.value)=="function") return "";
				return( (typeof(bln)!=="undefined"?bln+" ":"")+thisobj.name + " "+connectstr+" " + thisobj.value  );
		}
		
		//用于比较
		function parse_sign(sign,bln){
			
			
			if(typeof(thisobj.value)=="string"){
				return( (typeof(bln)!=="undefined"?bln+" ":"") + thisobj.name + " "+ sign +" '" + thisobj.value + "'");
			}else if(typeof(thisobj.value)=="number"){
				return( (typeof(bln)!=="undefined"?bln+" ":"") + thisobj.name + " "+ sign +" " + thisobj.value);
			}else{
				return "";
			}
		}
		
		
		
		if( this.operator === "EQ" || this.operator === "==")
			return parse_sign("eq" );
		if( this.operator === "NE" || this.operator === "!=")
			return parse_sign("eq","not");
		if( this.operator === "GE" || this.operator === ">=")
			return parse_sign("ge");
		if( this.operator === "GT" || this.operator === ">")
			return parse_sign("gt");
		if( this.operator === "LE" || this.operator === "<=")
			return parse_sign("le");
		if( this.operator === "LT" || this.operator === "<")
			return parse_sign("lt");
		if( this.operator === "IN" )
			return parse_in("in");
		if( this.operator === "NI" )
			return parse_in("in","not");
		if( this.operator === "LIKE" )
			return parse_like("like");
		if( this.operator === "NL" )
			return parse_like("like","not");	

	}
	
	/**
	 * @memberOf BCore.recommends
	 * @name connectFilter
	 * @function
	 * @param {Filter} left 被连接的Filter对象
	 * @param {String} connector 连接符(and 或 or)
	 * @param {Filter} right 被连接的Filter对象
	 */
	function connectFilter(left, connector, right)
	{
		return "( " +left.toString() + " ) " + connector.toLowerCase() + " ( " + right.toString() + " )";
	}
	
	/**
	 * @class 所有店商商品类推荐相关请求的基类
	 * 注意：通常您不需要直接使用此类，以免写错必要的参数。 应尽可能使用具体的推荐请求API。
	 * @constructor
	 * @memberOf BCore.recommends
	 * @extends BCore.Request
	 * @param {String} rec_type 推荐类型
	 * @argument {Number} num 推荐结果最大数目，默认值是10
	 * @property {String} flt 过滤条件
	 * @property {String} bid Banner 表示将要展示的Banner ID
	 * @see BCore.recommends.Filter
	 */
	function Recommend(rec_type, num) {
		Request.call(this, rec_type);

		if (typeof num != "number") {
			this.num = 10;
		} else {
			this.num = num;
		}
	}
	/* 继承自 Request */
	Recommend.prototype = new Request();

	/**
	 * @class 经常跟该商品一起购买的商品
	 * @constructor
	 * @memberOf BCore.recommends
	 * @extends BCore.recommends.Recommend
	 * @param {Array} iid 商品ID列表
	 * @argument {Number} num 推荐结果最大数目，int 类型
	 * @property {String} flt 过滤条件
	 * @see BCore.recommends.Filter
	 */
	function RecFBT(iid, num) {
		Recommend.call(this, 'RecFBT', num);
		this.iid = iid;
	}
	/* 继承自 Recommend */
	RecFBT.prototype = new Recommend();
	
	/**
	 * @class 推荐请求：根据浏览和最终购买的关系进行推荐
	 * @constructor
	 * @memberOf BCore.recommends
	 * @extends BCore.recommends.Recommend
	 * @param {Array} iid 商品ID列表
	 * @argument {Number} num 推荐结果最大数目
	 * @property {String} flt 过滤条件
	 * @see BCore.recommends.Filter
	 */
	function RecVUB(iid, num) {
		Recommend.call(this, 'RecVUB', num);
		this.iid = iid;
	}
	/* 继承自 Recommend */
	RecVUB.prototype = new Recommend();
	
	/**
	 * @class 浏览过本商品的用户还浏览过哪些商品
	 * @constructor
	 * @memberOf BCore.recommends
	 * @extends BCore.recommends.Recommend
	 * @param {Array} iid 商品ID列表
	 * @argument {Number} num 推荐结果最大数目
	 * @property {String} flt 过滤条件
	 * @see BCore.recommends.Filter
	 */
	function RecVAV(iid, num) {
		Recommend.call(this, 'RecVAV', num);
		this.iid = iid;
	}
	/* 继承自 Recommend */
	RecVAV.prototype = new Recommend();
	
//	/**
//	 * @class 根据用户购买历史进行推荐
//	 * @constructor
//	 * @memberOf BCore.recommends
//	 * @extends BCore.recommends.Recommend
//	 * @param {String} uid 用户ID
//	 * @argument {Number} num 推荐结果最大数目
//	 * @property {String} flt 过滤条件
//	 * @see BCore.recommends.Filter
//	 */
//	function RecByBuy(uid, num) {
//		Recommend.call(this, 'RecByBuy', num);
//		this.uid = uid;
//	}
//	/* 继承自 Recommend */
//	RecByBuy.prototype = new Recommend();

	/**
	 * @class 根据用户浏览历史进行推荐
	 * @constructor
	 * @memberOf BCore.recommends
	 * @extends BCore.recommends.Recommend
	 * @param {Array} uid 用户名称
	 * @argument {Number} num 推荐结果最大数目
	 * @property {String} flt 过滤条件
	 * @see BCore.recommends.Filter
	 */
//	function RecByBro(uid, num) {
//		Recommend.call(this, 'RecByBro', num);
//		this.uid = uid;
//	}
//	/* 继承自 Recommend */
//	RecByBro.prototype = new Recommend();
	
	/**
	 * @class 购买过本商品的用户还购买过哪些商品
	 * @constructor
	 * @memberOf BCore.recommends
	 * @extends BCore.recommends.Recommend
	 * @param {Array} iid 商品ID列表
	 * @argument {Number} num 推荐结果最大数目
	 * @property {String} flt 过滤条件
	 * @see BCore.recommends.Filter
	 */
	function RecBAB(iid, num) {
		Recommend.call(this, 'RecBAB', num);
		this.iid = iid;
	}
	/* 继承自 Recommend */
	RecBAB.prototype = new Recommend();
	
	/**
	 * @class 个性化热销榜。推荐结果，包括一段时间内某类别商品的销量排行，并融合了基于用户购买历史，浏览历史的个性化推荐结果。
	 * @constructor
	 * @memberOf BCore.recommends
	 * @extends BCore.recommends.Recommend
	 * @argument {Number} num 推荐结果最大数目
	 * @property {String} flt 过滤条件
	 * @property {Number} dat 时间（天数，1，7，30）
	 * @property {Object} cat 指定类别及其权重
	 * @property {Number} rad 个性化比例 [0,1]之间的数值
	 * @see BCore.recommends.Filter
	 * @example
	 * var rec_hb 	= new HotBuy(12);
	 *	rec_hb.cat	= {"饮料":1,"图书":3};//若不需要填写权重，则可以是数组，例如["饮料""图书"];
	 *	rec_hb.dat	= 7;
	 *	rec_hb.rad	= 0.5;
	 *	this.push(rec_hb,"rec_hb");
	 */
	function HotBuy(num) {
		Recommend.call(this, 'HotBuy', num);
	}
	/* 继承自 Recommend */
	HotBuy.prototype = new Recommend();
	
	/**
	 * @class 为特定用户推荐资源
	 * @constructor
	 * @memberOf BCore.recommends
	 * @extends BCore.recommends.Recommend
	 * @argument {Number} num 推荐结果最大数目
	 * @property {string} typ 推荐类型default，visit，buy分别表示根据混合历史/浏览历史/购买历史进行推荐
	 * @property {String} flt 过滤条件
	 * @see BCore.recommends.Filter
	 */
	function RecForUser(num) {
		Recommend.call(this, 'RecForUser', num);
	}
	/* 继承自 Recommend */
	RecForUser.prototype = new Recommend();
	
	/**
	 * @class 根据用户购物车中商品进行推荐
	 * @constructor
	 * @memberOf BCore.recommends
	 * @extends BCore.recommends.Recommend
	 * @param {Array} iid 商品ID列表
	 * @argument {Number} num 推荐结果最大数目
	 * @property {string} typ 推荐类型default，visit，buy分别表示根据混合历史/浏览历史/购买历史进行推荐
	 * @property {String} flt 过滤条件
	 * @see BCore.recommends.Filter
	 */
	function RecByCart(iid, num) {
		Recommend.call(this, 'RecSimiI', num);
		this.typ = "simi";
		this.iid = iid;
	}
	/* 继承自 Recommend */
	RecByCart.prototype = new Recommend();
	
	/**
	 * @class 相关商品推荐
	 * @constructor
	 * @memberOf BCore.recommends
	 * @extends BCore.recommends.Recommend
	 * @param {Array} iid 商品ID列表
	 * @argument {Number} num 推荐结果最大数目
	 * @property {string} typ img,tag,vis,buy,act分别表示根据图像，tag，浏览，购买以及混合行为推荐
	 * @property {String} flt 过滤条件
	 * @see BCore.recommends.Filter
	 */
	function RecSimiI(iid, num) {
		Recommend.call(this, 'RecSimiI', num);
		this.typ = "tag";
		this.iid = iid;
	}
	/* 继承自 Recommend */
	RecSimiI.prototype = new Recommend();
	
	/**
	 * @class 个性化热览榜。推荐结果，包括一段时间内某类别商品的浏览量排行，并融合了基于用户购买历史，浏览历史的个性化推荐结果。
	 * @constructor
	 * @memberOf BCore.recommends
	 * @extends BCore.recommends.Recommend
	 * @argument {Number} num 推荐结果最大数目
	 * @property {String} flt 过滤条件
	 * @property {Number} dat 时间(天数，1，7，30)
	 * @property {Number} rad 个性化比例 [0,1]之间的数值
	 * @property {Object} cat 指定类别及其权重
	 * @see BCore.recommends.Filter
	 * @example
	 * var rec_hv 	= new HotVisit(12);
	 *	rec_hv.cat	= {"饮料":1,"图书":3};//若不需要填写权重，则可以是数组，例如["饮料""图书"];
	 *	rec_hv.dat	= 7;
	 *	rec_hv.rad	= 0.5;
	 *	this.push(rec_hv,"rec_hv");
	 */
	function HotVisit(num) {
		Recommend.call(this, 'HotVisit', num);
	}
	/* 继承自 Recommend */
	HotVisit.prototype = new Recommend();
	
	
	/**
	 * @class RecItem 一个推荐商品，用于将数组推荐结果格式化为可读结果，便于使用。
	 * @constructor
	 * @param {JSON} item_json 推荐结果中的一个推荐商品结果
	 */
	function RecItem(item_json) {
		if (typeof item_json == "string") { // 仅包含商品ID
			this.iid = item_json;
		}
		else if (Object.prototype.toString.apply(item_json) === '[object Array]') { // 数组形式的商品信息
			if (item_json.length == 2) { // only id salesnum 输出模式
				this.iid = item_json[0];
				/** 
				* 必选参数：商品销量
				* @type int
				*/
				this.salesnum = item_json[1];
			} else { // simple 输出模式
				/** 
				* 必选参数：商品ID
				* @type String
				*/
				this.iid = item_json[0];
				/** 
				 * 必选参数：商品名称
				 * @type String
				 */
				this.name = item_json[1];
				/** 
				 * 必选参数：商品链接
				 * @type String
				 */
				this.url = item_json[2];
				/** 
				 * 必选参数：商品图片链接
				 * @type String
				 */
				this.img = item_json[3];
				/** 
				 * 必选参数：商品价格
				 * @type Number
				 */
				this.price = item_json[4];
				/** 
				 * 必选参数：商品推荐指数
				 * @type Number
				 */
				this.weight = item_json[5];
			}
		}
		else { // 商品信息 complex 输出模式
			//this.iid = item_json.iid;
			//this.name = item_json.name;
			//this.url = item_json.url;
			//this.img = item_json.img;
			//this.price = item_json.price;
			//this.weight = item_json.weight;
			for(var key in item_json){
				this[key] = item_json[key];

			}
		}
	}
		
	 
	/**
	 * @class 用于格式化一个请求的返回结果，生成一个新的响应结果实例，便于使用。
	 * @name Response
	 * @memberOf BCore.responses
	 * @constructor
	 * @param {JSON} json 一个非批量请求的返回结果
	 * @property {Number} code 状态码
	 * @property {String} msg 状态信息
	 * @property {String} reqId 请求结果ID
	 * @property {Array} recs 请求结果,RecItem类型的结果集
	 * @example
	 * json.bab = new Response(json.bab);
	 * alert(json.bab.code);
	 */
	function Response(req_json) {
		
		if(Object.prototype.toString.apply(req_json) === '[object Object]'&&typeof(req_json.code)=="number"){
		//原封不动	
			this.code = req_json.code;
			this.msg  = req_json.msg;
			this.reqId = req_json.reqId;
			this.recs  = req_json.recs;
		}else{
			
			this.code = req_json[0];
			this.msg  = req_json[1];
			
			if(req_json[2]){
				this.reqId = req_json[2];
			}
			
			if(req_json[3]){
				if (Object.prototype.toString.apply(req_json[3]) === '[object Array]') {
					this.recs = new Array();
					for (var i = 0; i < req_json[3].length; ++i) {
						this.recs.push(new RecItem(req_json[3][i]));
					}
				}else{
					this.recs = req_json[3];
				}
			}
			
		}
		
		
	
	}
	
	
	/**
	 * 描述: 获取具体推荐算法权重的系数
	 * @param {String} reqId
	 * @private
	 */
	function getRecScale(reqId) {
		var result = 1;
		var rec_type = reqId.substr(40, reqId.length);
		switch (rec_type) {
		case "VAV":
			result = 0.5;
			break;
		case "BAB":
			result = 0.8;
			break;
		case "FBT":
			result = 0.8;
			break;
		case "VUB":
			result = 0.8;
			break;
		case "HotVisit":
			result = 0.5;
			break;
		case "HotBuy":
			result = 0.6;
			break;
		case "SimiI":
			result = 0.8;
			break;
		case "ForUser":
			result = 0.7;
			break;
		default:
			break;
		}
		return result;
	}
	
	//reqid   [本机host名称(16位数字)][8位16进制进程号][8为16进制推荐请求流水号][8位16进制时间][推荐请求名称]
	/**
	 * 通过更改reqid的类型，来生成其他新的REQID，由于除REQID类型的其他部分，服务器端不会生成重复的数字。只有改变了ReqId，才能保证对一个结果多次使用mergeResponse，不会重复计算系数
	 * @param {String} modelReqId 从其他推荐栏采集到的REQID
	 * @private
	 */
	function createMergeListReqId(modelReqId) {
		//对数字进行填充

		//var result = modelReqId.substr(0, 40) + "MERGE";
		var result = modelReqId.substr(0, 56) + "MERGE";
		return result;
	}
	
	/**
	 * 合并两个推荐结果的数据,注意，mergeResponse产生的结果会有新的REQID，请参考REC_TYPE_CODE.MERGE_LIST
	 * @constructor
	 * @memberOf BCore.responses
	 * @extends BCore.responses.Response
	 * @param {Response} jsonResult1 要合并的第一个原始数据，改参数需要一个RecItem类型的数组
	 * @param {Response} jsonResult2 要合并的第二个原始数据，改参数需要一个RecItem类型的数组
	 */
	function mergeResponse(jsonResult1, jsonResult2) {
		
		jsonResult1 = new Response(jsonResult1); //格式化返回结果
		jsonResult2 = new Response(jsonResult2); //格式化返回结果
		var reqId = "";
		var code = -1;
		var msg  = "";
		var result = new Array();
		
		if (jsonResult1.code === 0) {
			code = 0;
			msg = "OK";
			if (reqId === "") {
				//这里，生成自己的REQID
				reqId = createMergeListReqId(jsonResult1.reqId);
			}
			//对于结果权重进行处理
			for (var i = 0; i < jsonResult1.recs.length; i++) {
				if (typeof(jsonResult1.recs[i].weight) == "undefined") {
					result[i].weight = 1;
				}
				jsonResult1.recs[i].weight *= getRecScale(jsonResult1.reqId);
			}
			
			result = result.concat(jsonResult1.recs);
		}
		
		if (jsonResult2.code === 0) {
			code = 0;
			msg = "OK";
			if (reqId === "") {
				reqId = createMergeListReqId(jsonResult2.reqId);
			}
			//对于结果权重进行处理
			for (var i = 0; i < jsonResult2.recs.length; i++) {
				if (typeof(jsonResult2.recs[i].weight) == "undefined") {
					result[i].weight = 1;
				}
				jsonResult2.recs[i].weight *= getRecScale(jsonResult2.reqId);
			}
			result = result.concat(jsonResult2.recs);
		}
		
		//对结果去重
		var newArray = new Array();
		var provisionalTable = {};
		for (var i = 0, item; (item = result[i]) != null; i++) {
			if (!provisionalTable[item.iid]) {
				newArray.push(result[i]);
				provisionalTable[item.iid] = true;
			}
		}
		result = newArray;
		
		//对混合结果进行排序
		result.sort(function (a, b) {
				return b.weight - a.weight;
			});
		
		//生成结果类型
		var responseObj = new Object();
		if (code === 0) {
			responseObj.code = code;
			responseObj.msg = msg;
			responseObj.reqId = reqId;
			responseObj.recs = result;
		} else {
			responseObj.code = code;
			responseObj.msg = "mergeError:have not available parm!";
		}
		
		return new Response(responseObj);
	}
	
	
	BCore.recommends.Recommend = Recommend;
	BCore.recommends.RecFBT = RecFBT;
	BCore.recommends.RecVUB = RecVUB;
	BCore.recommends.RecVAV = RecVAV;
	BCore.recommends.RecByCart = RecByCart;
	BCore.recommends.RecBAB = RecBAB;
	BCore.recommends.HotBuy = HotBuy;
	BCore.recommends.RecSimiI = RecSimiI;
	BCore.recommends.RecForUser = RecForUser;
	BCore.recommends.HotVisit = HotVisit;
	BCore.recommends.Filter = Filter;
	BCore.recommends.connectFilter = connectFilter;
	
	BCore.responses.Response = Response;
	BCore.responses.mergeResponse = mergeResponse;
})(window);