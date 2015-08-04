/**
 * @author Administrator
 */
$(document).ready(function(){
		 	$.mobile.loading( 'show', {
								text: 'foo',
								textVisible: true,
								theme: 'z',
								html: "请稍等..."
							});
			var data;
			$.ajax({
						  type: "GET",
						  async:false,
						  url: "testData.json",
						  dataType: "json",
						  success:function(d){
						  	data=d
						  }
						});
            /* var data=[
							   {
							   	type:"Checkbox",
								question:'操你妈共产党',
								data:[{
									value:"123123",
									label:'123321312'
								},{
									value:"123123",
									label:'123321312'
								},{
									value:"123123",
									label:'123321312'
								}]
							   },
							   {
							   	type:"Radio",
								question:'操你妈共产党',
								data:[{
									value:"123123",
									label:'123321312'
								},{
									value:"123123",
									label:'123321312'
								},{
									value:"123123",
									label:'123321312'
								}]
							   }
						 ]*/
				var ws=[]
				$.each(data,function(i,item){
					var w=new MQ.widgets[item.type]({
																			data:item,
																			commonData:{'some':'i donot know'},
																			index:i
																		})
					ws.push(w)
					w.page.appendTo('body')
				})	
				var index=0,max=data.length-1
				$("body > div").bind("swipeleft",function(){
					if(index<max){
						index++
						$.mobile.changePage(ws[index].page,{transition: "slide",changeHash: true});
						if(index==max){
							$('div[data-role="button"][data-icon="arrow-l"][data-iconpos="left"]').show()
							$('div[data-role="button"][ data-icon="arrow-r"][data-iconpos="right"]').hide()
						}
					}
				});
				$("body > div").bind("swiperight",function(){
					if(index!=0){
						index--
						$.mobile.changePage(ws[index].page,{transition: "slide",changeHash: true,reverse: true});
						if(index==0){
							$('div[data-role="button"][ data-icon="arrow-r"][data-iconpos="right"]').show()
							$('div[data-role="button"][data-icon="arrow-l"][data-iconpos="left"]').hide()
						}
					}
				});
				$('div[data-role="button"][data-icon="arrow-l"][data-iconpos="left"]').hide()
				$('div[data-role="button"][data-icon="arrow-l"][data-iconpos="left"]').click(function(){
					$("body > div").trigger('swiperight')
				})
				$('div[data-role="button"][ data-icon="arrow-r"][data-iconpos="right"]').click(function(){
					$("body > div").trigger('swipeleft')
				})
				$.mobile.loading( 'hide')
				$.mobile.changePage(ws[0].page,{transition: "pop",changeHash: true});
		 })