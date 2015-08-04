/**
 * @author Administrator
 */
function Chart(dateRange, a, b, setting){
    var self = this
    function getData(fun){
        var p = {
            typeName: a.currentItem.key
        }
        var url = setting.chart.url + '?' +
        $.param($.extend(p, {
            begin: dateRange.begin,
            end: dateRange.end
        }, setting.chart.data))
        var result
        $.ajax({
            //            async: false,
            url: url,
            dataType: 'json',
            success: function(data){
                fun(data)
            }
        })
    }
    this.flush = function(){
        getData(function(data){
        
        })
    }
	this.init = function(){
		
		this.flush()
	}
	this.init()
}
