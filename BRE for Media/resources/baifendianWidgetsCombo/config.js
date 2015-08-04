/**
 * @author Administrator
 */

 var _baifendianWidgetsComboSettingURL='/chartServer/chart/initPage.action'
 var _baifendianDataURL='../../data/list.do'
 var _baifendianReportOutputURL = '../../data/export.action'
 var _baifendianWidgets={
	tabbar:{
		requires:[],
		css:['models/tabbar/requires/css/tabbar.css']
	},
 	line:{
		requires:['commons/lib/highcharts.js'],
		theme:{
			'default':{
				js:['models/line/theme/default/createChart.js']
			},
			'ifm':{
				js:['commons/jquery.function.tool.js','models/line/theme/ifm/createChart.js','models/line/theme/ifm/ifmEvent.js']
			},
			'ifm_syn':{
				js:['commons/jquery.function.tool.js','models/line/theme/ifm/createChart.js','models/line/theme/ifm_syn/fullDate.js']
			}
		}
	},
	pie:{
		requires:['commons/lib/highcharts.js']
	},
	column:{
		requires:['commons/lib/highcharts.js']
	},
	grid:{
		requires:['commons/lib/jquery.qtip-1.0.0.min.js','models/grid/requires/baeGrid/js/baeGrid.js','models/grid/requires/Grid.js'],
		theme:{
			'default':{
				css:['models/grid/requires/baeGrid/theme/default/css/grid.css'],
				js:['commons/lib/highcharts.js']
			},
			'ifm':{
				css:['models/grid/requires/baeGrid/theme/ifm/css/grid.css','commons/lib/jquery.pagination/css/pagination.css'],
				js:['commons/lib/jquery.pagination/jquery.pagination.js']
			},
			'webbus':{
				css:['models/grid/requires/baeGrid/theme/webbus/css/grid.css','commons/lib/jquery.pagination/css/pagination.css'],
				js:['models/grid/requires/baeGrid/theme/webbus/js/type_format.js','commons/lib/jquery.pagination/jquery.pagination.js','models/grid/requires/baeGrid/theme/webbus/js/pagination_fix.js']
			}
		}
	},
	worldmap:{
		requires:['commons/lib/highcharts.js','commons/lib/highcharts.map.src.js','models/worldmap/requires/worldshape.js']
	},
	chinamap:{
		requires:['commons/lib/highcharts.js','commons/lib/highcharts.map.src.js','models/chinamap/requires/chinashape.js']
	},
	legend:{
		theme:{
			'default':{
				css:['models/legend/theme/default/css/legend.css'],
				js:['commons/lib/jquery.qtip-1.0.0.min.js','models/legend/theme/default/buildDom.js']
			},
			'ifm':{
				css:['models/legend/theme/ifm/css/legend.css'],
				js:['commons/lib/jquery.qtip-1.0.0.min.js','models/legend/theme/ifm/buildDom.js']
			},
			'bus':{
				css:['models/legend/theme/bus/legend.css'],
				js:['models/legend/theme/bus/buildDom.js']
			},
			'bus_detail':{
				css:['models/legend/theme/bus_detail/legend.css'],
				js:['models/legend/theme/bus_detail/buildDom.js']
			},
			'webbus':{
				css:['models/legend/theme/webbus/legend.css'],
				js:['models/legend/theme/webbus/buildDom.js','models/legend/theme/webbus/format_fix.js']
			}
		}
	},
	selectbox:{
		requires:[],
		css:['models/selectbox/requires/css/selectbox.css']
	},
	queryfactor:{
		requires:[],
		theme:{
			'default':{

			},
			'bus':{
				js:['models/queryfactor/requires/Stylish-Select/jquery.stylish-select.js'],
				css:['models/queryfactor/requires/theme/bus/queryfactor.css']
			}
		}
	},
	filtergrid:{
		requires:['commons/lib/jquery.qtip-1.0.0.min.js','commons/lib/highcharts.js','models/grid/requires/baeGrid/js/baeGrid.js','models/filtergrid/js/FilterGridPie.js'],
		css:['models/filtergrid/css/FilterGridPie.css'],
		theme:{
			'default':{
				css:['models/grid/requires/baeGrid/theme/default/css/grid.css']
			},
			'ifm':{
				css:['models/grid/requires/baeGrid/theme/ifm/css/grid.css','commons/lib/jquery.pagination/css/pagination.css'],
				js:['commons/lib/jquery.pagination/jquery.pagination.js']
			}
		}
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