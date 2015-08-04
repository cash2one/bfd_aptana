/**
 * @author Administrator
 */
var send=[{
	keys:['source'],
	counts:{
		type:'normal',//asLimitDate
		content:['uv','pv','etc..']
	},
	limits:{
		init:true,//false
		date:[{
			start:1231321321,
			end:12313213213
		}],
		range:{
			type:'normal',//all
			content:{
				start:0,
				range:20
			}
		}
	}
}]
var get=[{
	totals:500,//可选 
	stores:[{
		source:'sina',
		uv:20,
		pv:20,
		ect:100
	}]
//	stores:[{//asLimitsDate
//		'2012-01-01':20,
//		'2012-01-02':20,
//		'2012-01-03':100
//	}]
}]
