/** 
 * @fileoverview 提供用户向引擎输入参数的类及相关方法
 * <font color=red>依赖于BCore.js</font>
 * @author xiuming.wang
 * @version 0.1 
 */

(function( window ){
	//导入类
	//var BCore = window.BCore;
	var Request = BCore.Request;
	
	/**
	 * @namespace 该命名空间下包含用于基础的输入相关类型
	 * @memberOf BCore
	 */
	BCore.inputs = {};
	
	/**
	 * 描述：构造函数，创建一个Input实例, 参数为必选参数
	 * @class 数据采集基类
	 * @constructor
	 * @memberOf BCore.inputs
	 * @extends BCore.Request
	 * @param {String} api 请求名称
	 */
	Input = function (api) {
		Request.call(this, api);	
	}
	/* 继承自 Request */
	Input.prototype = new Request();
	
	
	/**
	 * @memberOf BCore.inputs
	 * @name JObject
	 * @class
	 * @constructor
	 * @example
	 * var json  = new JObject();
	 * json.localtion = "北京";
	 * json.age  = 23;
	 * document.write(json.toString());//{"localtion":"北京","age":23}
	 */
	function JObject() {
		
	}
	
	/**
	 * @memberOf BCore.inputs
	 * @name JObject#toString
	 * @function
	 * @example
	 * var json  = new JObject();
	 * json.localtion = "北京";
	 * json.age  = 23;
	 * document.write(json.toString());//{"localtion":"北京","age":23}
	 * @param {Object} obj 默认为自己
	 * @return {JSON}
	 */
	JObject.prototype.toString = function(obj){
		if(typeof(obj) === "undefined"){
			obj = this;
		}
		var result = "";
		switch ( Object.prototype.toString.apply( obj ) ){
			case "[object Boolean]":
				if( obj )
					result = "true";
				else
					result = "false";
				break;
			case "[object Number]":
				result = obj.toString();
				break;
			case "[object String]":
				if(obj.indexOf("$")===0){
					result = obj;
				}else{
					result = "\"" + obj + "\"";
				}
				break;
			case "[object Array]":
				var arr = new Array();
				for (var i = 0; i < obj.length; ++i ) {
					arr.push( this.toString( obj[ i ] ) );
				}
				result = "[" + arr.join( "," ) + "]";
				break;
			case "[object Object]":
				var arr = new Array();
				for (var key in obj){
					if( typeof(obj[ key ]) === "function" )continue;
					arr.push( '"' + key + '"' + ":" + this.toString( obj[ key ] ) );
				}
				result ="{" + arr.join( "," ) + "}";
				break;
			default:
				break;
		}
		
		
		//alert(result);
		return result;
		
	}
	
	
	/**
	 * @memberOf BCore.inputs
	 * @name AddItem
	 * @class
	 * @constructor
	 * @example
	 * var a  = new BCore.inputs.AddItem("354");
	 * a.name = "崔健:新长征路上的摇滚(CD 经典再版)";
	 * a.url  = "http://www.baifendian.com/ecshop/goods.php?id=354";
	 * a.img  = "http://www.baifendian.com/ecshop/images/201005/thumb_img/354_thumb_G_1273095827858.jpg";
	 * a.pid  = new Array("862", "231", "972");// 其中862，231，972 均为类别ID
	 * var json = new JObject();
	 * json.price = 16;
	 * json.brand = "LV";
	 * json.new = true;
	 * a.attr = json.toString();
	 * this.push(a,"aa");
	 * @extends BCore.inputs.Input
	 * @param {String} iid 商品ID
	 * @property {String} name 商品名称
	 * @property {String} url 商品链接
	 * @property {String} img 商品图片链接
	 * @property {Array} pid 商品类别id 
	 * @property {JSON} attr 商品描述 (brand代表品牌，price代表价格 new代表是否为新商品)
	 * @property {Number} exp 商品过期时间 （D[时间戳]或S[格式化的日期] 例如 S2011-12-30）
	 */
	function AddItem ( iid ) {
		Input.call(this, "AddItem");	
		this.iid = iid;
	}
	/* 继承自 Input */
	AddItem.prototype = new Input();
	

	/**
	 * @class 删除商品
	 * @example
	 * this.push(new BCore.inputs.RmItem("354"),"r1");
	 * @constructor
	 * @memberOf BCore.inputs
	 * @extends BCore.inputs.Input
	 * @param {String} iid 商品ID
	 * @property {Boolean} del 是否彻底删除
	 */
	function RmItem(iid) {
		Input.call(this, "RmItem");
		this.iid = iid;
	}
	/* 继承自 Input */
	RmItem.prototype = new Input();
	
	
	/**
	 * @class 添加用户
	 * @example
	 * var user = new BCore.inputs.AddUser("354");
	 * user.name = "username";
	 * var json = new JObject();
	 * json.location = "北京";
	 * json.age = 23;
	 * //user.attr = '{location:"北京",age:23}';
	 * user.attr = json.toString();
	 * this.push(user,"u1");
	 * @constructor
	 * @memberOf BCore.inputs
	 * @extends BCore.inputs.Input
	 * @param {String} uid 用户ID
	 * @property {String} name 用户名字
	 * @property {JSON} attr 用户描述
	 */
	function AddUser(uid) {
		Input.call(this, "AddUser");
		this.uid = uid;
	}
	/* 继承自 Input */
	AddUser.prototype = new Input();
	
	/**
	 * @class 删除用户
	 * @example
	 * this.push(new BCore.inputs.RmUser("354"),"ru1");
	 * @constructor
	 * @memberOf BCore.inputs
	 * @extends BCore.inputs.Input
	 * @param {String} uid 用户ID
	 * @property {Boolean} del 是否彻底删除
	 */
	function RmUser(uid) {
		Input.call(this, "RmUser");
		this.uid = uid;
	}
	/* 继承自 Input */
	RmUser.prototype = new Input();
	

	/**
	 * @class 所有用户行为相关请求的基类
	 * 注意：通常您不需要直接使用此类，以免写错必要的参数。 应尽可能使用具体的用户行为请求API。
	 * @constructor
	 * @extends BCore.inputs.Input
	 * @memberOf BCore.inputs
	 * @param {String} api 请求名称
	 * @param {String} iid 商品ID
	 */
	function UserAction(api, iid) {
		Input.call(this, api);
		if(iid!==null && iid!==undefined)
		this.iid = iid;
	}
	/* 继承自 Input */
	UserAction.prototype = new Input();

	/**
	 * @class 浏览商品
	 * @example
	 * var v = new BCore.inputs.Visit("354");
	 * @constructor
	 * @memberOf BCore.inputs
	 * @extends BCore.inputs.UserAction
	 * @param {String} iid 商品ID
	 */
	function Visit(iid) {
		UserAction.call(this, "Visit", iid);
	}
	/* 继承自 UserAction */
	Visit.prototype = new UserAction();
	

	/**
	 * @class 评论商品
	 * @example
	 * var rv = new BCore.Review("354");
	 * this.push(rv,"rv");
	 * @constructor
	 * @memberOf BCore.inputs
	 * @extends BCore.inputs.UserAction
	 * @param {String} iid 商品ID
	 * @property {Number} sc 评分
	 * @property {String} cont 评论内容
	 */
	function Review(iid) {
		UserAction.call(this, "Review", iid);
	}
	/* 继承自 UserAction */
	Review.prototype = new UserAction();
	

	/**
	 * @class 添加商品到购物车
	 * @example
	 * var ac1 = new BCore.inputs.AddCart();
	 * for(....){
	 * ac1.push("123",2,15);
	 * }
	 * this.push(ac1);
	 * this.invoke();
	 * @constructor
	 * @memberOf BCore.inputs
	 * @extends BCore.inputs.UserAction
	 */
	function AddCart() {
		UserAction.call(this, "AddCart", null);
		
	}
	/* 继承自 UserAction */
	AddCart.prototype = new UserAction();
	
	/**
	 * @function 添加购物车
	 * @example
	 * var ac1 = new BCore.inputs.AddCart();
	 * for(....){
	 * ac1.push("123",2,15);
	 * }
	 * this.push(ac1);
	 * this.invoke();
	 * @constructor
	 * @name AddCart#push
	 * @memberOf BCore.inputs
	 * @param {String} iid 商品ID
	 * @param {Number} num 数量
	 * @param {Number} prc 单价
	 */
	AddCart.prototype.push = function(iid,num,prc){
		if(!this.lst)this.lst = new Array();
		this.lst.push(iid+":"+num+":"+prc);
	}
	
	
	
	/**
	 * @class 添加商品到购物车
	 * @example 
	 * var rc1 = new BCore.inputs.RmCart();
	 * for(....){
	 * rc1.push("123",2,15);
	 * }
	 * this.push(rc1);
	 * this.invoke();
	 * @constructor
	 * @memberOf BCore.inputs
	 * @extends BCore.inputs.UserAction
	 */
	function RmCart() {
		UserAction.call(this, "RmCart", null);
	}
	/* 继承自 UserAction */
	RmCart.prototype = new UserAction();
	
	/**
	 * @function 删除购物车中的商品
	 * @example
	 * var rc1 = new BCore.inputs.RmCart();
	 * for(....){
	 * rc1.push("123",2,15);
	 * }
	 * this.push(rc1);
	 * this.invoke();
	 * @constructor
	 * @name RmCart#push
	 * @memberOf BCore.inputs
	 * @param {String} iid 商品ID
	 * @param {Number} num 数量
	 * @param {Number} prc 单价
	 */
	RmCart.prototype.push = function(iid,num,prc){
		if(!this.lst)this.lst = new Array();
		this.lst.push(iid+":"+num+":"+prc);
	}
	
	
	
	
	/**
	 * @class 添加商品到收藏夹
	 * @example
	 * var af = new BCore.inputs.AddFav("354");
	 * this.push(af,"af");
	 * @constructor
	 * @memberOf BCore.inputs
	 * @extends BCore.inputs.UserAction
	 * @param {String} iid 商品ID
	 */
	function AddFav(iid) {
		UserAction.call(this, "AddFav", iid);
	}
	/* 继承自 UserAction */
	AddFav.prototype = new UserAction();
	
	/**
	 * @class 添加商品到收藏夹
	 * @example
	 * var rf = new BCore.inputs.RmFav("354");
	 * this.push(rf,"rf");
	 * @constructor
	 * @memberOf BCore.inputs
	 * @extends BCore.inputs.UserAction
	 * @param {String} iid 商品ID
	 */
	function RmFav(iid) {
		UserAction.call(this, "RmFav", iid);
	}
	/* 继承自 UserAction */
	RmFav.prototype = new UserAction();
	

	/**
	 * @class 对请求结果的反馈
	 * @example
	 * var c = new BCore.inputs.FeedBack("354", "rid");
	 * @constructor
	 * @memberOf BCore.inputs
	 * @extends BCore.inputs.UserAction
	 * @param {String} iid 商品ID
	 * @param {String} rid 推荐请求ID，由百分点推荐引擎生成，表示具体来自哪个推荐请求的推荐结果。
	 * @property {number} sc 评价,，可以有符号表示正负反馈，默认为1
	 */
	function FeedBack( iid, rid) {
		UserAction.call(this, "FeedBack", iid);
		this.rid = rid;
	}
	/* 继承自 UserAction */
	FeedBack.prototype = new UserAction();
	
	/**
	 * @class 用户提交搜索请求。
	 * @example
	 * var c = new BCore.inputs.Search( "guitar");
	 * @constructor
	 * @memberOf BCore.inputs
	 * @extends BCore.inputs.UserAction
	 * @param {String} qstr 查询语句 字符串, 语法跟客户使
用的搜索引擎相关
	 */
	function Search( qstr) {
		UserAction.call(this, "Search", null);
		this.qstr = qstr;
	}
	/* 继承自 UserAction */
	Search.prototype = new UserAction();
	
	
	/**
	 * @class 用户下单请求
	 * @example
	 * var p1 = new BCore.inputs.Order("871825");
	 * p1.total = 1000;
	 * p1.express = "德邦物流";
	 * p1.address = "北京市 xx区 xx街 xx号";
	 * for(....){
	 * p1.push("123",2,15);
	 * }
	 * this.push(p1);
	 * this.invoke();
	 * @constructor
	 * @name Order
	 * @memberOf BCore.inputs
	 * @extends BCore.inputs.UserAction
	 * @param {String} ord 订单ID
	 * @property {Number} total 购买商品总价格
	 * @property {String} address 客户收货地址
	 * @property {String} express 快递
	 */
	function Order( ord) {
		UserAction.call(this, "Order", null);
		
		this.ord = ord;

	}
	
	/* 继承自 UserAction */
	Order.prototype = new UserAction();
	
	/**
	 * @function 添加下单的商品
	 * @example
	 * var p1 = new BCore.inputs.Order("871825");
	 * p1.total = 1000;
	 * p1.express = "德邦物流";
	 * p1.address = "北京市 xx区 xx街 xx号";
	 * for(....){
	 * p1.push("123",2,15);
	 * }
	 * this.push(p1);
	 * this.invoke();
	 * @constructor
	 * @name Order#push
	 * @memberOf BCore.inputs
	 * @param {String} iid 商品ID
	 * @param {Number} num 数量
	 * @param {Number} prc 单价
	 */
	Order.prototype.push = function(iid,num,prc){
		if(!this.lst)this.lst = new Array();
		this.lst.push(iid+":"+num+":"+prc);
	}
	
	
	
	/**
	 * @class 用户购买请求
	 * @example
	 * var p1 = new BCore.inputs.Buy("871825");
	 * p1.total = 1000;
	 * p1.express = "德邦物流";
	 * p1.address = "北京市 xx区 xx街 xx号";
	 * for(....){
	 * p1.push("123",2,15);
	 * }
	 * this.push(p1);
	 * this.invoke();
	 * @constructor
	 * @name Buy
	 * @memberOf BCore.inputs
	 * @extends BCore.inputs.UserAction
	 * @param {String} ord 订单ID
	 * @property {Number} total 购买商品总价格
	 * @property {String} address 客户收货地址
	 * @property {String} express 快递
	 */
	function Buy( ord) {
		UserAction.call(this, "Buy", null);
		
		this.ord = ord;

	}
	
	/* 继承自 UserAction */
	Buy.prototype = new UserAction();
	
	/**
	 * @function 添加购买商品
	 * @example
	 * var p1 = new BCore.inputs.Buy("871825");
	 * p1.total = 1000;
	 * p1.express = "德邦物流";
	 * p1.address = "北京市 xx区 xx街 xx号";
	 * for(....){
	 * p1.push("123",2,15);
	 * }
	 * this.push(p1);
	 * this.invoke();
	 * @constructor
	 * @name Buy#push
	 * @memberOf BCore.inputs
	 * @param {String} iid 商品ID
	 * @param {Number} num 数量
	 * @param {Number} prc 单价
	 */
	Buy.prototype.push = function(iid,num,prc){
		if(!this.lst)this.lst = new Array();
		this.lst.push(iid+":"+num+":"+prc);
	}
	
	
	

	BCore.inputs.Input 		= Input;
	BCore.inputs.UserAction = UserAction;
	BCore.inputs.JObject 	= JObject;
	BCore.inputs.AddItem 	= AddItem;
	BCore.inputs.RmItem 	= RmItem;
	BCore.inputs.AddUser 	= AddUser;
	BCore.inputs.RmUser 	= RmUser;
	BCore.inputs.Visit 		= Visit;
	BCore.inputs.Review 	= Review;
	BCore.inputs.AddCart 	= AddCart;
	BCore.inputs.RmCart 	= RmCart;
	BCore.inputs.AddFav 	= AddFav;
	BCore.inputs.RmFav 		= RmFav;
	BCore.inputs.FeedBack 	= FeedBack;
	BCore.inputs.Search 	= Search;
	BCore.inputs.Buy 		= Buy;
	BCore.inputs.Order 		= Order;
})( window );