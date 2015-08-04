/*BfdWidget.line.prototype.fullDate = function(dateRange) {
		var dates = []
		var start = dateRange.start + '';
		var end = dateRange.end + '';
		function formatDate(str) {
			return str.substr(4, 2) + '/' + str.substr(6, 2) + '/' + str.substr(0, 4)
		}
//		if(start.length == 8 && end.length == 8) {
			var startdate = new Date(Date.parse(formatDate(start)));
			var enddate = new Date(Date.parse(formatDate(end)));
			var i = startdate.getTime()
			var day = 24 * 60 * 60 * 1000
			while(i <= enddate.getTime()) {
				var d = new Date(i)
				var num =  (d.getMonth() + 1) + '.'+ (d.getDate()<10?('0'+d.getDate()):d.getDate())
				dates.push(num)
				i += day;
			}
//		}
		return dates
};*/
BfdWidget.line.prototype.format_xAxis=function(i){
	if(typeof(i)=='number'){
		var result=/^(\d{4})(\d{2})(\d{2})$/.exec(i)
		return parseInt(result[2])+'-'+result[3]
	}
	return i
}