/**
 * @author Administrator
 */

 var _baifendianWidgetsComboSettingURL='../test_pages/setting.json'
 var _baifendianDataURL=['../test_pages/data0.json','../test_pages/data1.json','../test_pages/data2.json','../test_pages/data3.json', '../test_pages/data4.json', '../test_pages/data5.json']
 
 var _baifendianWidgets={
 	chart:{
		requires:['commons/lib/highcharts.js']
	},
	grid:{
		requires:[]
	},
	worldmap:{
		requires:['commons/lib/highcharts.js','commons/lib/highcharts.map.src.js','models/worldmap/requires/worldshape.js']
	},
	chinamap:{
		requires:['commons/lib/highcharts.js','commons/lib/highcharts.map.src.js','models/chinamap/requires/chinashape.js']
	},
	menuitem:{
		requires:[]
	}
 }
