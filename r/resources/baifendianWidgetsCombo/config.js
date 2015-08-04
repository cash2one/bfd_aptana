/**
 * @author Administrator
 */

 var _baifendianWidgetsComboSettingURL='../../chart/initPage.action'
 var _baifendianDataURL='../../data/list.do'
 var _baifendianReportOutputURL = '../../data/export.action'
 var _baifendianWidgets={
	tabbar:{
		requires:[],
		css:['models/tabbar/requires/css/tabbar.css']
	},
 	line:{
		requires:['commons/lib/highcharts.js']
	},
	pie:{
		requires:['commons/lib/highcharts.js']
	},
	column:{
		requires:['commons/lib/highcharts.js']
	},
	grid:{
		requires:['commons/lib/highcharts.js','models/grid/requires/baeGrid/js/baeGrid.js','models/grid/requires/Grid.js'],
		css:['models/grid/requires/baeGrid/css/grid.css']
	},
	worldmap:{
		requires:['commons/lib/highcharts.js','commons/lib/highcharts.map.src.js','models/worldmap/requires/worldshape.js']
	},
	chinamap:{
		requires:['commons/lib/highcharts.js','commons/lib/highcharts.map.src.js','models/chinamap/requires/chinashape.js']
	},
	legend:{
		requires:['commons/lib/jquery.qtip-1.0.0.min.js'],
		css:['models/legend/requires/css/legend.css']
	},
	selectbox:{
		requires:[],
		css:['models/selectbox/requires/css/selectbox.css']
	},
	filtergrid:{
		requires:['commons/lib/highcharts.js','models/grid/requires/baeGrid/js/baeGrid.js','models/filtergrid/js/FilterGridPie.js'],
		css:['models/filtergrid/css/FilterGridPie.css']
	},
	chord:{
		requires:['commons/lib/d3.v2.min.js','models/chord/requires/chord.js']
	},
	forcedirected:{
		requires:['commons/lib/d3.v2.min.js','models/forcedirected/requires/forcedirected.js']
	},
	parallel:{
		requires:['commons/lib/d3.v2.min.js','models/parallel/requires/d3.parsets.js','models/parallel/requires/parallel.js'],
		css:['models/parallel/requires/css/d3.parsets.css']
	}
 }