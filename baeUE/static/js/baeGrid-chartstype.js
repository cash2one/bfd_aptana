/**
 * @author Administrator
 */
//
$(function(){
	$.baeGridTypes=$.baeGridTypes||{}
	$.baeGridTypes.pieType=function(item,td,finalQueue){
	item['attr']=item['attr']||{}
	item['attr']['rowspan']=item['attr']['rowspan']||'all'
	item['attr']['colspan']=item['attr']['colspan']||1
	finalQueue.push(function(){
		var myChart = new FusionCharts("/resources/charts/FusionCharts/Charts/Pie2D.swf", "myChartID");
		var objJSON = {"data":item.data}
		 myChart.setJSONData( objJSON ); 
			 myChart.render(td.get(0));
	})
    }
})
