/**
 * @author Administrator
 */
$(function(){
	Highcharts.setOptions({
		global: {
			useUTC: false
		}
	})
	 var Chart = function(setting,opts){
		var self=this
		var  properties=['chart','credits','exporting','labels','legend','loading','navigation','pane','plotOptions','subtitle','title','tooltip','xAxis','yAxis','colors','series']
		self.flush=function(){
		     var _setting={}
			 for(var i in properties){
			 	self[properties[i]]?_setting[properties[i]]=self[properties[i]]:null
			 	var methodName='get'+properties[i].substring(0,1).toUpperCase()+properties[i].substring(1)
				self[methodName]? _setting[properties[i]]=self[methodName](setting):null
			 }
			 for(var i in opts){
			 	_setting[i]=opts[i]
			 }
			 for(var i in properties){
			 	if(self.hasOwnProperty(properties[i])){
					_setting[properties[i]]=self[properties[i]]
				}
				var methodName='get'+properties[i].substring(0,1).toUpperCase()+properties[i].substring(1)
				if(self.hasOwnProperty(methodName)){
					 _setting[properties[i]]=self[methodName](setting)
				}
			 }
//			 console.info(_setting)
			 $('#'+setting.container).highcharts(_setting)
		}
       self.flush()
	}

	Chart.prototype.xAxis = {
	    type: 'datetime',
	    minTickInterval: 24 * 3600 * 1000,
	    showLastLabel: true,
	    tickmarkPlacement: 'between',
		labels:{
			step: 2,
			formatter:function(){
				return Highcharts.dateFormat( '%m-%d',this.value).replace(/^0/,'')
			}
		}
	}
	Chart.prototype.yAxis= {
											labels:{
												enabled:false
											},
											title:{
												text:null
											}
										}

	Chart.prototype.title={
												text:null
											}
	Chart.prototype.credits={
		enabled:false
	}
	Chart.prototype.getPlotOptions=function(setting){
		return {
			series: { 
			    marker: {
                    enabled: true
                },
				pointStart:setting.dateRange.start,
				pointInterval: 24 * 3600 * 1000 // one day
			}
		}
	}										
	
	function fullData(data,dateRange,defaultData){
		var dataHash={},result=[]
		$.each(data,function(i,item){
			dataHash[item['state_date'].toString()]=item
		})
		var  start=dateRange.start
		while(start<dateRange.end){
			var k=Highcharts.dateFormat( '%Y%m%d',start)
			if(dataHash[k]){
				result.push(dataHash[k])
			}else{
				result.push(defaultData)
			}
			start+=86400000
		}
		return result
	}
	
	var dateRange1=new DateRange(document.getElementById('dateRange'),false,'left')
	
	console.info(dateRange1)
	
	console.info(fullData([{state_date:20130510,pv:1231},{state_date:20130511,pv:1231}],dateRange1,{}));
	
//	var chart = new Chart({
//		container:'container',
//		dateRange:dateRange1
//	})
	(function(){
		  
		    var chartData=[]//fullData([],dateRange1,{'y':0})
			
		    function fixMarker(d){return d}
			
		    Chart.prototype.getSeries=function(setting){
				var result=[]
				$.each(setting.items,function(i,item){
					var serie={}
					serie.name=item.label
//					serie.label=item.label
                    
					serie.data=fixMarker($.map(chartData,function(n){
						if(n[item.name]){
							return {y:n[item.name]}
						}else{
							return {y:0}
						}
					}))
					result.push(serie)
				})
				return result
			}
			
			var chart0=new Chart({container:'chart0',dateRange:dateRange1,items:[{name:'uv',label:'测试0'},{name:'pv',label:'测试1'}]})
			var chart1=new Chart({container:'chart1',dateRange:dateRange1,items:[{name:'uv',label:'测试0'}]})
			var chart2=new Chart({container:'chart2',dateRange:dateRange1,items:[{name:'uv',label:'测试0'}]})
			function load(dateRange,url,callBack){
				$.ajax({
					url:url,
					type: 'GET',
	                dataType:'json',
					success:function(data){
						callBack(fullData(data,dateRange,{}))
					}
				})
			}
			dateRange1.addEventListener(function(dateRange){
				load(dateRange,'../../DataAnalysis/stat.action?__='+(+new Date),function(){
					chartData=fullData([],dateRange1,{'y':0})
					
				})
			})
	})();
})

