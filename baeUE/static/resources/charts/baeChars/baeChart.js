/**
 * @author Administrator
 */
var path=document.scripts;   
path=path[path.length-1].src.substring(0,path[path.length-1].src.lastIndexOf("/")+1);   
if ((path.indexOf('http') != 0 && path.indexOf('/') != 0) || path.indexOf('./') == 0) {
	path = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1) + path
}
var funsionpath=path.substring(0,path.lastIndexOf("baeChars"))
$(function(){
                var loadMap=false
				var loadCharts=false
				function loadScript(url,callback){
							$.ajax({
							     url: url,  
						        dataType: "script",  
								cache:true,
						        async: false, 
								success:callback
								 })
				}
				var createPlugin=function(pluginname,swfname){
					var methods = {
																					         init: function(opts){
																					        	       var chartID="myChartId"+(+new Date)+Math.round(Math.random()*1000000)
																					                   var defaults = {
																									        swfUrl: funsionpath +"FusionCharts/Charts/"+swfname,
																									        id:chartID ,
																									        width: 800,
																									        hight: 600,
																									        name:chartID,
																									        WMode: "transparent"
																									    }
																									    var setting = $.extend({}, defaults, opts)
																										delete setting.dataSource
																										var param
																										if(setting.data){
																											param=encodeURI($.param(setting.data))
																											delete setting.data
																										}
																									    var myChart = new FusionCharts(setting)
																									    myChart.configure("ChartNoDataText", "暂无数据");
																									    myChart.configure("XMLLoadingText", "加载中...");
//																									    myChart.addParam("WMode", "Transparent");
																										param?myChart.setXMLUrl(opts.dataSource+"?"+param):myChart.setXMLUrl(opts.dataSource);
																										this.data('chart',myChart)
																									    myChart.render(this.get(0))
																					        },
																					        setData: function(dataUrl){
																					               this.data('chart').setXMLUrl(dataUrl)
																					        }
														    }
														    $.fn[pluginname] = function(method){
																if(loadCharts===false){
																	loadScript(funsionpath +'FusionCharts/JSClass/FusionCharts.js',function(){
																		 loadCharts=true
//																		loadScript(funsionpath+'FusionCharts/JSClass/highcharts.js',function(){
//																		     loadCharts=true
//																	    	FusionCharts.setCurrentRenderer('javascript');
//																		})
																	})
																}
														        if (methods[method]) {
														            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
														        }
														        else 
														            if (typeof method === 'object' || !method) {
														                return methods.init.apply(this, arguments);
														            }
														            else {
														                $.error('Method ' + method + ' does not exist on jQuery'+pluginname+'.');
														            }
														    };
				}
				createPlugin('baeLineChart','MSCombiDY2D.swf');
                createPlugin('baeColumnChart','Column3D.swf');
//				createPlugin('baePieChart','Doughnut3D.swf');
                createPlugin('baePieChart','Pie2D.swf');
                createPlugin('baeBarChart','Bar2D.swf');
				createPlugin('baeColumnLineChart','StackedColumn3DLineDY.swf');
									(function(){
														var methods = {
																					         init: function(opts){
																					                   var defaults = {
																									        swfUrl: funsionpath +"FusionMaps/Maps/FCMap_China2.swf",
																									        id: "myChartId"+(+new Date),
																									        width:800,
																									        hight: 600
																									    }
																									    var setting = $.extend({}, defaults, opts)
																										var param
																										if(setting.data){
																											param=$.param(setting.data)
																											delete setting.data
																										}
																										var myMap=new FusionMaps(setting.swfUrl, "Map1Id", setting.width, setting.hight, "0", "1");
																									  myMap.addParam("WMode", "opaque");
																										this.data('map',myMap)
																										param?myMap.setDataURL(encodeURIComponent(opts.dataSource+"?"+param)):myMap.setDataURL(encodeURIComponent(opts.dataSource));
//																										this.baeMap('setData',encodeURIComponent(param?(opts.dataSource+"?"+param):(opts.dataSource)))
																										if(!this.attr('id')){
																											this.attr('id','fusionmap'+(+new Date))
																										}
																									    myMap.render(this.attr('id'))
																					        },
																					        setData: function(dataUrl){
																								$.ajax({
																									url: dataUrl,  
																							        dataType: "text",  
																									cache:true,
																							        async: false, 
																									success:$.proxy(function(data){
																										this.baeMap('setDataString',data)
																									},this)
																								})
																					        },
																							setDataString:function(dataString){
																								this.data('map').setDataXML(dataString)
																							}
														    }
														    $.fn.baeMap = function(method){
															  if(loadMap===false){
																	loadScript(funsionpath +'FusionMaps/JSClass/FusionMaps.js',function(){
																		loadMap=true
																	})
																}
														        if (methods[method]) {
														            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
														        }
														        else 
														            if (typeof method === 'object' || !method) {
														                return methods.init.apply(this, arguments);
														            }
														            else {
														                $.error('Method ' + method + ' does not exist on jQuery.baeMap');
														            }
														    };
													})();
})

