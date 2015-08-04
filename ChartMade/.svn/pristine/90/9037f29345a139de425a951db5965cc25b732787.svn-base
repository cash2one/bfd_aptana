BfdWidget.prototype.menuitem = function(setting){
	this.parseSetting = function(){
		var $table = $('<table style="text-align:center;margin:0 auto;"><tbody><tr></tr></tbody></table>').appendTo("#"+setting.container);
		$.each(setting.cols,function(n,i){
			$('<td style="width:140px;height:100px;border:1px solid #000;">'+i+'</td>').appendTo($table);
			$table.find("td").click(function(){
				$table.find("td").css({
					background:"white"
				});
				$(this).css({
					background:"red"
				});
			});
		});
	}
	this.mergeParam = function(){
		return {
			id: setting.id,
			cols: setting.cols,
			groupBy: setting.groupBy,
			limits: {
				dataRange: {
					start: setting.start,
					end: setting.end
				},
				range: {
					start: 12,
					range: 20
				},
				option: {
					id: setting.id
				}
			}
		};
	}
	this.parseData = function(item) {

	}
}