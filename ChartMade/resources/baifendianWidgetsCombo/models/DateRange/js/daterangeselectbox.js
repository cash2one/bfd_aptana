/**
 * @author Administrator
 */
window.DateRange=function(domwarp,setting){
    var self=this
     self.mode = 'single'
     var dom=$('<select></select>')
     dom.appendTo(domwarp)
     var store={}
     $.each(setting,function(i,item){
        store[item.name]=item
        $('<option value="'+item.name+'">'+item.name+'</option>').appendTo(dom)
     })
     
     self.events=[]
     self.addEventListener=function(fun){
        self.events.push(fun)
    }
     self.change=function(){}
     dom.change(function(){
        self.start=store[$(this).val()]['start']
        self.end=store[$(this).val()]['end']
        $.each(self.events,function(i,item){
            item(self)
        })
        self.change(self)
     })
     self.start=setting[0]['start']
     self.end=setting[0]['end']
	 self.getStart=function(){
	 	return self.start
	 }
	 self.getEnd=function(){
	 	return self.end
	 }
}