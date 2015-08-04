var List=function(options){
		var defaults={data:{},getData:function(){return {}},async:true,fixPageParam:$.noop}
		var setting = $.extend(true, defaults, options)
		var self =this;
		self.itemList=[]
		self.container=$(setting.container)
		self.expData={}
		var currentPage=0
		self.getSetting=function(){
			return setting
		}
		self.load=function(init){
			if(setting.beforeLoad){
				setting.beforeLoad()
			}
			var param=$.extend(true,{},setting.data,self.expData,setting.getData())
			if(init){
				param['init']=true
			}
			if(setting.page){
				param.pos=self.page.pos
				param.range=self.page.range
				setting.fixPageParam(param,self.page)
			}
			if(setting.testData){
				callBack(setting.testData)
			}else{
				$.ajax({
					url:setting.url,
					async:setting.async,
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
					$.each($.isArray(data)?data:data.stores,function(i,j){
						var item=new setting.Model(i,j)
						item.pos=i
						self.itemList.push(item)
						self.container.append(item.dom)
					})
					if(setting.afterLoad){
						setting.afterLoad(self)
					}
				}
		}
		self.flush=function(){
			self.page.init()
			self.load(true)
		}
		self.reset=function(){
			self.page.first=true
			self.load(true)
		}
		var Page=function(){
			var page=this
			page.init=function(){
				page.first=true
				currentPage=0
				if(setting.page){
					this.pos=setting.page.pos||0;
				    this.range=setting.rowList||20
				};
			}
			page.init()
			page.flush=(function(cPage){
				 return function(){
				 	   var totalPage=Math.ceil(parseInt(self.total) / (setting.rowList || 20))
				 	    if((totalPage-1) <= currentPage){
							currentPage=totalPage-1
						}
						if(parseInt(self.total) > (setting.rowList || 20)){
							$(setting['page']['container']).pagination(totalPage, {
								current_page: currentPage,
								items_per_page: 1,
								num_edge_entries: 2,
								num_display_entries: 5,
								prev_text: "上一页",
								next_text: "下一页",
								callback: function(i){
									currentPage=i
									if (!page.first) {
										if(setting.onPage){
											setting.onPage()
										}
										page.pos = (i) * (setting.rowList || 20)// + 1
										self.load()
									}
									page.first=false
								}
							})
						}else{
							$(setting['page']['container']).empty()
						}
					}
			})();
		}
		self.page=new Page()
		self.load(true)
}