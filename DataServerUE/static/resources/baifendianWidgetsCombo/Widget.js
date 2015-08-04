/**
 * @author Administrator
 */
function Widget(){//接口方法 flush,getCurrenItem
	this.setParam=function(param){
		this.flush.call(this,param)
	}
	this._events={}//实际执行所有
    this._bindEvents={}// 外部填加
	this.addEvent=function(eventName,eventFun){
		    this._bindEvents[eventName]=[]
			this[eventName]=function(fun){
				  	  this._bindEvents[eventName].push(fun)
				  }
			this._events[eventName]=function(){
				  eventFun.apply(this,arguments)
				  for(var m in this._bindEvents[eventName]){
				  	     this._bindEvents[eventName][m].apply(this,arguments)
				  }
			}
	}
	this.fireEvent=function(eventName){
		this._events[eventName].apply(this,$.grep( arguments, function(n,i){
			  return n > 0;
			}))
	}

} 

