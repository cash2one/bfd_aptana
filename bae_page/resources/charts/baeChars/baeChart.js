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
				(function(){//linecharts
																 var methods = {
																					         init: function(opts){
																					                   var defaults = {
																									        swfUrl: funsionpath +"FusionCharts/Charts/MSCombiDY2D.swf",
																									        id: "myChartId"+(+new Date),
//																											dataFormat:'xmlurl',
																									        width: 800,
																									        hight: 600
																									    }
																									    var setting = $.extend({}, defaults, opts)
																										delete setting.dataSource
																										var param
																										if(setting.data){
																											param=$.param(setting.data)
																											delete setting.data
																										}
																									    var myChart = new FusionCharts(setting)
//																									    myChart.addParam("WMode", "Transparent");
																										param?myChart.setXMLUrl(opts.dataSource+"?"+param):myChart.setXMLUrl(opts.dataSource);
																										this.data('chart',myChart)
																									    myChart.render(this.get(0))
																					        },
																					        setData: function(dataUrl){
																					               this.data('chart').setXMLUrl(dataUrl)
																					        }
														    }
														    $.fn.baeLineChart = function(method){
																if(loadCharts===false){
																	loadScript(funsionpath +'FusionCharts/JSClass/FusionCharts.js',function(){
																		loadCharts=true
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
														                $.error('Method ' + method + ' does not exist on jQuery.baeLineChart');
														            }
														    };
				})();
				(function(){
														var methods = {
																					         init: function(opts){
																					                   var defaults = {
																									        swfUrl: funsionpath +"FusionCharts/Charts/Doughnut3D.swf",
																									        id: "myChartId"+(+new Date),
//																											dataFormat:'xmlurl',
																									        width: 800,
																									        hight: 600
																									    }
																									    var setting = $.extend({}, defaults, opts)
																										var param
																										if(setting.data){
																											param=$.param(setting.data)
																											delete setting.data
																										}
																									    var myChart = new FusionCharts(setting)
//																									    myChart.addParam("WMode", "Transparent");
																										if(setting.dataString){
																											delete setting.dataSource
																											myChart.setXMLData(opts.dataString)
																										}else if(setting.dataSource){
																											delete setting.dataSource
																											param?myChart.setXMLUrl(opts.dataSource+"?"+param):myChart.setXMLUrl(opts.dataSource);
																										}
																										this.data('chart',myChart)
																									    myChart.render(this.get(0))
																					        },
																					        setData: function(dataUrl){
																					               this.data('chart').setXMLUrl(dataUrl)
																					        },
																							setDataString:function(dataString){
																								this.data('chart').setXMLData(dataString)
																							}
														    }
														    $.fn.baePieChart = function(method){
																if(loadCharts===false){
																	loadScript(funsionpath +'FusionCharts/JSClass/FusionCharts.js',function(){
																		loadCharts=true
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
														                $.error('Method ' + method + ' does not exist on jQuery.baePieChart');
														            }
														    };
													})();
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
																									  myMap.addParam("WMode", "Transparent");
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

