function Grid(){
		 	this.reflush=function(){
				var param=$.extend(true,setting.grid)
				$.baeGrid(param)
			}
			this.init=function(){
				$.baeGrid($.extend(true,setting.grid))
			}
			this.init()
}