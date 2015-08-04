/**
 * @author Administrator
 */

var send1 = {
	cols: ['uv', 'pv'],//需要的查询
	groupBy: ['s1', 's2'],//分组条件，可选，没有则返回格式是get1
	limits: {//限制条件
		dataRange: {
			start: 123132,//开始时间
			end: 12313132//结束时间
		},
		range: {//可选，用于返回格式get2或get3，没有则返回全部
			start: 12,//开始的位置
			range: 20//个数
		},
		init:true,//是否是第一次
		option:{
              //自定义参数组
		}
	}
}
var get1 = {
	uv: 1321,
	pv: 2112321
}
var get2 = {
	total: 500,//在init为True时返回，为false或不存在时无需返回
	stores: [{
		s1: 'www.sina.com.cn',//分组条件1
		s2: 'www.qq.com',//分组条件1
		uv: 1321,//查询1
		pv: 2112321//查询2
	}]
}
var get3 = {
	//total: 500,
	stores: [{
		date: '2012年01月',//分组条件1
		uv: 123,//查询1
		pv: 234//查询2
	}, {
		date: '2012年02月',
		uv: 123,
		pv: 234
	}]
}