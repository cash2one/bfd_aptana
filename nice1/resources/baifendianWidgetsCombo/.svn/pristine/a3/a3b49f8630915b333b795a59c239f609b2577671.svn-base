;(function($){
	var typeFix = {
		money: function(v) {
			if (isNaN(parseFloat(v))) {
				return "￥0.00";
			}
			return "￥"+(parseFloat(v).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,"));
		},
		'bus_':function(v){
			switch(v){
				default:
					return '未知';
			};
		},
		bus_operateType:function(v){
			switch(v){
				case 1:
					return '充值';
				case 2:
					return '提现';
				default:
					return '未知';
			};
		},
		bus_operateWay:function(v){
			switch(v){
				case 1:
					return '银行转账';
				case 2:
					return '网银转账';
				default:
					return '未知';
			};
		},
		'bus_status':function(v){
			switch(v){
				case 0:
					return '未审核';
				case 1:
					return '已处理';
				case 2:
					return '已关闭';
				default:
					return '未知';
			};
		},
		'bus_userType':function(v){
			switch(v){
				case 1:
					return '网站主';
				case 2:
					return '广告主';
				case 3:
					return '财务人员';
				default:
					return '未知';
			};
		}
	}
	$.extend(window.BfdWidget.format,typeFix);
})(jQuery);