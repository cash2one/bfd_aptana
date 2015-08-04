/**
 * @author Administrator
 */
$(function(){
	$.ajaxSettings.traditional = true
	$.baeGrid({
		seq:false,
		colModel: [{
                        colName: '来源',
                        name: 'source',
						sortable:false
                    }, {
                        colName: '访次',
                        name: 'pv',
						sortable:false
                    }, {
                        colName: '访客',
                        name: 'uv',
						sortable:false
                    }, {
                        colName: '唯一访客',
                        name: 'vistor',
						sortable:false
                    }],
					 url: '/grid/group/',
					 renderTo:'.data00 > div:eq(1)',
					  page:{
					 	rowList:[4]
					 }
	})

	function LineChart(){
		
		this.data={}
		
		this.url='/linetest1.xml'
		
		this.flush=function(){
			$('.tubiao').baeLineChart('setData',$.isEmptyObject(this.data)?this.url:(this.url+'?'+$.param(this.data)))
		}
		this.init=function(){
				$('.tubiao').baeLineChart({
					dataSource:$.isEmptyObject(this.data)?this.url:(this.url+'?'+$.param(this.data)),
					width:'100%',
					hight:380
				})
				$('select').each(function(){
					$(this).val($(this).find('option:first').val())
				})
				$('select').change($.proxy(function(event){
					if($(event.target).val()===$(event.target).find('option:first').val()){
						delete this.data[$(event.target).attr('name')]
					}else{
						this.data[$(event.target).attr('name')]=$(event.target).val()
					}
					this.flush()
				},this))
		}
		this.init()
	}
	var lineChart=new LineChart()
	
	$.baeGrid({
		seq:false,
		colModel: [{
                        colName: '来源',
                        name: 'source',
						sortable:false
                    }, {
                        colName: '访次',
                        name: 'pv',
						sortable:false
                    }, {
                        colName: '访客',
                        name: 'uv',
						sortable:false
                    }],
					 url: '/grid/group/',
					 renderTo:'.l .con > div:eq(0)',
					 page:{
					 	rowList:[10]
					 }
	})
		$.baeGrid({
		seq:false,
		colModel: [{
                        colName: '来源',
                        name: 'source',
						sortable:false
                    }, {
                        colName: '访次',
                        name: 'pv',
						sortable:false
                    }, {
                        colName: '访客',
                        name: 'uv',
						sortable:false
                    }],
					 url: '/grid/group/',
					 renderTo:'.r .con > div:eq(0)',
					  page:{
					 	rowList:[10]
					 }
	})
	
	$('.mappic_con').baeMap({
		              dataSource:"/test/map.xml",
					width:'100%',
					hight:300
	})
	$('.btpic_con').baePieChart({
		         dataSource:"/pie1.xml",
					width:'100%',
					hight:270
	})
//	$('.data00 > div:eq(1)')
})
