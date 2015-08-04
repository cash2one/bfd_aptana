/**
 * @author Administrator
 */
$(function(){
	 $.ajaxSettings.traditional = true
	 
	 var dateRange1=new DateRange(document.getElementById('dateRange'),false,'right');
	 
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
//				 console.info(_setting)
//				 $('#'+setting.container).highcharts(_setting)
				 $(document.getElementById(_setting.chart.renderTo)).empty()
				 self.diagram=new Highcharts.Chart(_setting)
			}
	       self.flush()
	}
    Chart.prototype.colors=["#7dd5ed","#a3d600"]
    Chart.prototype.tooltip= {
    		formatter: function() {
    			return Highcharts.dateFormat( '%m-%d',this.x).replace(/^0/,'') + '<br/>' + this.series.name + ':' + this.y
    		}
    }
	Chart.prototype.xAxis = {
	    type: 'datetime',
	    minTickInterval: 24 * 3600 * 1000,
	    showLastLabel: true,
	    tickmarkPlacement: 'on',
		labels:{
			step: 1,
			formatter:function(){
				return Highcharts.dateFormat( '%m-%d',this.value).replace(/^0/,'')
			}
		}
	}
    Chart.prototype.getXAxis=function(){
       var range=(dateRange1.end-dateRange1.start)/86400000,step
       console.info(range)
       if(range<=14){
    	   step=1
       }else{
    	   step=Math.floor(range/7)
       }
       console.info(step)
       return {
    		    type: 'datetime',
    		    minTickInterval: 24 * 3600 * 1000,
    		    showLastLabel: true,
    		    tickmarkPlacement: 'on',
    			labels:{
    				step: 1,
    				formatter:function(){
    					return Highcharts.dateFormat( '%m-%d',this.value).replace(/^0/,'')
    				}
    			}
       }
    }
	Chart.prototype.yAxis= {
    										min:0,
											labels:{
												enabled:false
											},
											title:{
												text:null
											},
											gridLineWidth:0
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
				events:{legendItemClick:function(){return false}},
				pointStart:dateRange1.start,
				pointInterval: 24 * 3600 * 1000 // one day
			},
			line:{
				marker: {
                    enabled: false
                }
			}
		}
	}										
	
	function fullData(data,dateRange,defaultData){
		var dataHash={},result=[]
		$.each(data,function(i,item){
			dataHash[item['state_date'].toString()]=item
		})
		var  start=dateRange.start
		while(start<=dateRange.end){
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
			
//			var chart1_0 = new Chart({container:'chart1_0',dateRange:dateRange1,items:[{name:'rec_session',label:'推荐点击访次'},
//			                                                       {name:'session',label:'访次'}]},
//			                         {chart:{renderTo:'chart1_0'},legend: {enabled: false}})
		    var chart1_0 = new Chart({items:[{name:'session',label:'访次'}]},
   			                         {chart:{renderTo:'chart1_0'},legend: {enabled: false},colors:["#a3d600"]})
		    chart1_0.xAxis=$.extend(true,{},Chart.prototype.xAxis,{minorTickLength:0,tickLength:0,labels:{enabled:false},lineWidth:0,minorGridLineWidth:0})
		    
		    var chart1_1 = new Chart({items:[{name:'rec_session',label:'推荐点击访次'}]},
		            			     {chart:{renderTo:'chart1.1'},legend: {enabled: false}})
		    
		    function load(dateRange,url,callBack){
				$.ajax({
					url:url,
					type: 'GET',
					data:{
						requestId:82,
						start:dateRange.getStart(),
				        end:dateRange.getEnd(),
				        type:'line',
				        cols:['state_date','rec_session','session']
					},
	                dataType:'json',
					success:function(data){
						callBack(data.stores)
					}
				})
			}
			dateRange1.addEventListener(function(dateRange){
				chart1_0.diagram.showLoading('加载中...') 
				chart1_1.diagram.showLoading('加载中...') 
				load(dateRange,'../../DataAnalysis/stat.action?__='+(+new Date),function(data){
					chartData=fullData(data,dateRange1,{'y':0})
					chart1_0.flush()
					chart1_1.flush()
				})
			}).fireEvents()
	})();
})
