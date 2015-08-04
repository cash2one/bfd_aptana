/**
 * @author Administrator
 */
$(function(){
    var List=function(setting){
		var self =this;
		self.itemList=[]
		self.container=$(setting.container)
		self.expData={}
		self.load=function(init){
			if(setting.beforeLoad){
				setting.beforeLoad()
			}
			var param=$.extend(true,{},setting.data,self.expData)
			if(setting.page){
				param.pos=self.page.pos
				param.range=self.page.range
			}
			if(setting.testData){
				callBack(setting.testData)
			}else{
				$.ajax({
					url:setting.url,
					cache:false,
	                dataType: "json",
					data:param
				}).done(callBack)
			}
			function callBack(data){
					if(setting.onLoad){
						setting.onLoad(data)
					}
					self.itemList=[]
					self.container.empty()
					if(init){
							self.total=data.totalItem
							if(setting.page){
								self.page.flush()
							}
					}	
					$.each(data.stores,function(i,j){
						var item=new setting.Model(i,j)
						item.pos=i
						self.itemList.push(item)
						self.container.append(item.dom)
					})
					if(setting.afterLoad){
						setting.afterLoad()
					}
				}
		}
		self.flush=function(){
			
		}
		var Page=function(){
			var page=this
			if(setting.page){
				this.pos=setting.page.pos||0;
			    this.range=setting.page.range||20
			}
			page.flush=function(){
				$(setting['page']['container']).pagination(Math.ceil(parseInt(self.total)/(setting.rowList||20)),{
					current_page:0,
					items_per_page:1,
					num_edge_entries:2,
					num_display_entries:5,
					prev_text:"上一页",
                    next_text:"下一页",
					callback:function(i){
						page.pos=(i)*(setting.rowList||20)+1
						self.load()
					}
				})
			}
		}
		self.page=new Page()
		self.load(true)
	}
})
