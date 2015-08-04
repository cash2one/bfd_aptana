/** 
 * @fileoverview 提供新闻资讯类推荐的类及相关方法
 * <font color=red>依赖于BCore</font>
 * @author peng.zhang
 * @version 0.1 
 */
 ;(function( window ){

	var HotBuy   = BCore.recommends.HotBuy;
	var HotVisit = BCore.recommends.HotVisit;

	/**
	 * @namespace 该命名空间下包含用于新闻的相关推荐
	 * @memberOf BCore
	 */
	BCore.news = {};

	/**
	 * @class 浏览过该类资讯的用户喜欢哪些商品
	 * @memberOf BCore.news
	 * @example
	 * HYNC = new BCore.news.HotBuyByNewsCat();
	 * HYNC.cat = ['童装'];
	 * 表示希望推荐：类别为童装的10个热销商品
	 * @constructor
	 * @extends BCore.recommends.HotBuy
	 * @param {int} num 推荐结果最大数目 默认为10
	 * @property {Array} cat 类别列表
	 */
	function HotBuyByNewsCat(num) {
		HotBuy.call(this, num);
	}
	/* 继承自 HotBuy */
	HotBuyByNewsCat.prototype = new HotBuy();

	
	/**
	 * @class 浏览过该类资讯的用户喜欢哪些商品
	 * @memberOf BCore.news
	 * @example
	 * HVNC = new BCore.news.HotVisitByNewsCat();
	 * HVNC.cat = ['童装'];
	 * 表示希望推荐：类别为童装的10个热览商品
	 * @constructor
	 * @extends BCore.recommends.HotVisit
	 * @param {int} num 推荐结果最大数目 默认为10
	 * @property {Array} cat 类别列表
	 */
	
	function HotVisitByNewsCat(num) {
		HotVisit.call(this, num);
	}
	/* 继承自 HotVisit */
	HotVisitByNewsCat.prototype = new HotVisit();
	
	BCore.news.HotBuyByNewsCat   = HotBuyByNewsCat;
	BCore.news.HotVisitByNewsCat = HotVisitByNewsCat;
})( window );