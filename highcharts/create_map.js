/**
 * @author FXS
 */

function createMap() {
	var data = {}

	for (var i in china_shapes) {//随机的数据
		data[i] = Math.ceil(Math.random() * 100)
	}
	var tempArray = []
	for (var i in data) {
		tempArray.push(data[i])
	}
	var max = Math.max.apply(Math, tempArray)
	var min = Math.min.apply(Math, tempArray)
	var range = max - min
	for (var i in data) {
		data[i] = {
			value : data[i]
		}
		var v = Number(255 - (Math.ceil((data[i]['value'] - min) * 255 / range))).toString(16)
		v = v.length > 1 ? v : ('0' + v)
		data[i]['color'] = "#20" + v + "FF"
	}
	var chart_options = {
		chart : {
			renderTo : 'container',
			type : 'map',
			borderWidth : 0
		},
		title : {
			text : null
		},
		legend : {
			enabled : false
		},
		credits : {
			enabled : false
		},
		tooltip : {
			formatter : function() {
				return "<b>" + this.point.name + "</b><br/><span>值：" + this.point.y + "</span>";
			}
		},
		series : [{
				data : []//,
//			closestPointRange:true
		}],
		dataLabels : {
				enabled : true,
				color : 'white',
				formatter : function(dataLabelOptions) {
					return this.point.options.key.toUpperCase();
				},
				style : {
					fontWeight : 'bold'
				}
			},
		name : '',
		cursor : 'pointer'
	};
	var d=[]
	$.each(china_shapes, function(n, i) {
		d.push({
			path : Highcharts.pathToArray(i.path),
			name : i.name,
			key : n,
			y : data[n]['value']
//			color : data[n]['color']
		});
	});
	chart_options.series[0].data=d
	var chart = new Highcharts.Map(chart_options);
	var s=chart.series[0]
//	s['data'][0].color='#F60'
//	s['data'][0].update()
//	console.info(s)
    $.each(chart.series[0]['data'],function(i,item){
		item['color']='#F60'
		item['y']=20
		try{
			item.update({
				color:'#f60',
				y:'20'
			})
		}catch(e){
		}
	})
	chart.redraw()
	
	return chart;
}