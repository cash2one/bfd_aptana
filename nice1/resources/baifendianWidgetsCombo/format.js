/**
 * @author Administrator
 */
window.BfdWidget.format = {
	numFix: function(v) { //数字处理123123变为123,123 12312.22变为12,312.12
		if(null===v||v===''){
		   return 0	
		}
		var str = v+''
		str = str.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")
		return str
	},
	numFix1:function(v){
		if (isNaN(parseFloat(v))) {
			return "0.00";
		}
		return parseFloat(v).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,").replace(/\.00$/,'')
	},
	int: function(v) { //数字处理123123变为123,123 12312.22变为12,312.12
		if(null===v||v===''){
		   return 0	
		}
		var str = v+''
		str = str.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")
		return str
	},
	rate: function(v) { //百分比处理
		if (isNaN(parseFloat(v))) {
			return "0.00%";
		} else {
			var bfbValue = (parseFloat(v) * 100).toFixed(2);
			if (bfbValue > 100.00) {
				bfbValue = '100.00';
			}
			return bfbValue + '%'
		}

	},
	rate1: function(v) { //百分比处理
		if (isNaN(parseFloat(v))) {
			return "0.00%";
		} else {
			var bfbValue = (parseFloat(v)).toFixed(2);
			if (bfbValue > 100.00) {
				bfbValue = '100.00';
			}
			return bfbValue + '%'
		}

	},
	decimal: function(v) { //两位小数
		if (isNaN(parseFloat(v))) {
			return "0.00";
		} else {
			return parseFloat(v).toFixed(2)
		}

	},
	money: function(v) {
		if (isNaN(parseFloat(v))) {
			return "0.00";
		}
		return parseFloat(v).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")
	},
	money_with_yuan: function(v) {
		if (isNaN(parseFloat(v))) {
			return "￥0.00";
		}
		return "￥"+(parseFloat(v).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,"));
	},
	time: function(v) {
		var result = "";
		var s = parseFloat(v);
		if (isNaN(s)) {
			return "0:0:0";
		} else {
			if (s > 0 && s < 1) {
				s = 1;
			}
			var N = parseInt(s / 3600);
			s = parseInt(s % 3600);
			var K = parseInt(s / 60);
			s = parseInt(s % 60);
			var M = s;
			result = N + ":" + K + ":" + M;
			return result;
		}
	},
	link:function(v){
		if(v){
			return '<a target="_blank" href="'+v+'">'+v+'</a>';
		}else{
			return v
		}
	},
	hourRange:function(v){
		return v+":00:00 至 "+v+":59:59";
    },
    linkOtherItem:function(v,stores,item){
    	if(stores.group){
    		if(stores.group[0][item['linkOtherItem']]){
    			return  '<a target="_blank" href="'+stores.group[0][item['linkOtherItem']]+'">'+v+'</a>';
    		}else{
    			return v
    		}
    		
    	}else{
    		if(stores[item['linkOtherItem']]){
    			return '<a target="_blank" href="'+stores[item['linkOtherItem']]+'">'+v+'</a>';
    		}else{
    			return v
    		}
    		
    	}
    },
    dateTime:function(v){
		return (v+'').replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,'$1/$2/$3 $4:$5:$6')
	}
}