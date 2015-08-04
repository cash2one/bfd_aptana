/**
 * @requires jQuery v1.6 or later
 * @base by Highcharts JS
 * @author 全冠清 http://binbinstoryblog.appspot.com/ http://story.iteye.com/ 
 */
var path=document.scripts; 
path=path[path.length-1].src.substring(0,path[path.length-1].src.lastIndexOf("/")+1); 
if((path.indexOf('http')!=0&&path.indexOf('/')!=0)||path.indexOf('./')==0){
			path=window.location.href.substring(0,window.location.href.lastIndexOf("/")+1)+path
}
$(function(){
	$.ajax({
		url: path + "highcharts.js",
		dataType: "script",
		async: false,
		success: function(){
			$.fcb1899chart = function(opts){
				var defaults = {
					renderTo: 'container',
					title: '请填加title',
					backgroundImage: path+'images/bg.jpg',
					bench_color: '#B22222',
					starter_color: '#0000FF',
					goals_color: '#008000',
					yellow_color: '#FFFF00'
				}
				var setting = $.extend({}, defaults, opts)
				var chart = new Highcharts.Chart({
					chart: {
						renderTo: setting['renderTo'],
						plotBackgroundImage: setting['backgroundImage']
					},
					exporting: {
						enabled: false
					},
					title: {
						text: setting['title']
					},
					xAxis: {
						categories: setting['x']
					},
					yAxis: {
						title: {
							text: null
						}
					},
					credits: {
						text: 'http://www.fcb1899.net/',
						href: 'http://www.fcb1899.net/'
					},
					tooltip: {
						formatter: function(){
							var s;
							if (this.series.type == 'column') {
								s = '出场:' +
								this.point.stackTotal +
								'<br/>' +
								this.series.name +
								this.y;
							}
							else {
								s = this.series.name +
								': ' +
								this.y;
							}
							return '<b>' + this.x + '</b><br/>' + s
						}
					},
					plotOptions: {
						column: {
							stacking: 'normal'
						}
					},
					series: [{
						type: 'column',
						name: '替补',
						legendIndex: 2,
						color: setting['bench_color'],
						data: setting['bench']
					}, {
						type: 'column',
						color: setting['starter_color'],
						name: '首发',
						legendIndex: 1,
						data: setting['starter']
					}, {
						type: 'spline',
						name: '进球',
						legendIndex: 3,
						marker: {
							symbol: 'url('+path+'images/bg_g.gif)'
						},
						color: setting['goals_color'],
						data: setting['goals']
					}, {
						type: 'spline',
						name: '黄牌',
						legendIndex: 4,
						marker: {
							symbol: 'url('+path+'images/bg_y.gif)'
						},
						color: setting['yellow_color'],
						data: setting['yellow']
					}],
					legend:{
						enabled:false
					}
				});
				var reset=function(config){
					if(config['title']){
						chart.setTitle({text:config['title']});
					}
					if(config['x']){
						chart.xAxis[0].setCategories(config['x']) 
					}
					var array=['bench','starter','goals','yellow']
					for(var i in array){
						if(config[array[i]]){
							chart.series[i].setData(config[array[i]])
						}
					}
				}
				return {
					'reset': reset
				}
			}
		}
	})
})
