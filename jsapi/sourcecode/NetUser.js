/**
 * @fileoverview 获取用户信息相关方法，NetUser模块
 * <font color=red>依赖于BCore.js</font>
 * @author weidong.nie xiuming.wang peng.zhang
 * @version 0.1
 */
 
;(function (window) {
	//导入类
	var Request = BCore.Request;
	
	/**
	 * @class 获取用户的浏览信息。
	 * @constructor
	 * @memberOf BCore.netuser
	 * @extends BCore.Request
	 * @property {Number} num 浏览历史数目，默认为10
	 */
	function GetUserVH(num) {
		Request.call(this, 'GetUserVH');
		this.num = num;
	}
	/* 继承自 Request */
	GetUserVH.prototype = new Request();
	
	/**
	 * @class 获取用户的浏览信息。
	 * @constructor
	 * @memberOf BCore.netuser
	 * @extends BCore.Request
	 * @property {Number} num 购买历史数目，默认为10
	 */
	function GetUserBH(num) {
		Request.call(this, 'GetUserBH');
		this.num = num;
	}
	/* 继承自 Request */
	GetUserBH.prototype = new Request();

	/**
	 * @namespace 该命名空间下包含用户的相关方法
	 * @memberOf BCore
	 */
	BCore.netuser = {};
	
	BCore.netuser.GetUserVH = GetUserVH;
	BCore.netuser.GetUserBH = GetUserBH;

})(window);