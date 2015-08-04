 function DateRange(render){
										 	var self=this
											self.mode = 'single'
											self.events=[]
											var currentYear=new Date().getFullYear ()
											var currentMonth=new Date().getMonth()
											var hideMonthDom=$()
											self.addEventListener=function(fun){
												self.events.push(fun)
											}
											function getDate(){
												 var d=new Date()
												 d.setHours(0,0,0,0) 	
												 d.setFullYear( parseInt(self.yearDom.val(),10)) 
												 d.setMonth( parseInt(self.monthDom.val(),10)) 
												 d.setDate(1)
												 return d
											}
											function buildDom(){
												  self.yearDom=$('<select></select>')
												  $.each([currentYear,currentYear-1,currentYear-2],function(i,item){
													  $('<option value="'+item+'">'+item+'</option>').appendTo(self.yearDom)
												  })
												  self.yearDom.val(currentYear)
												  self.monthDom=$('<select></select>')
												  $.each(new Array(12),function(i,item){
												  	   var option=$('<option value="'+i+'">'+(i+1)+'</option>')
													   option.appendTo(self.monthDom)
													   if(i>currentMonth){
													   	  hideMonthDom=hideMonthDom.add(option)
													   }
												  })
												  self.monthDom.val(currentMonth)
												  hideMonthDom.hide()
												  self.monthDom.css('border','1px solid #D8DFE9')
												  self.yearDom.css('border','1px solid #D8DFE9')
												  self.yearDom.appendTo(render)
												  $('<font>年</font>').appendTo(render)
												  self.monthDom.appendTo(render)
												   $('<font>月</font>').appendTo(render)
											}
											function buildEvent(){
												self.yearDom.change(function(){
													if(self.yearDom.val()==currentYear){
														  if(self.monthDom.val()>currentMonth){
														  	  self.monthDom.val(currentMonth)
														  }
														  hideMonthDom.hide()
													}else{
														 hideMonthDom.show()
													}
													onchange()
												})
												self.monthDom.change(function(){
													onchange()
												})
											}
											self.getStart=function(format){
											    var d=getDate()
												return formatDate(d, format||'Ymd')
											}
											self.getEnd=function(format){
											    if(currentYear==parseInt(self.yearDom.val(),10)&&currentMonth==parseInt(self.monthDom.val(),10)){
													return  formatDate(new Date(), format||'Ymd')
												}else{
													var d=getDate()
													d.setMonth(d.getMonth()+1)
													d.setDate(d.getDate()-1)
													return formatDate(d, format||'Ymd')
												}
											}
											var onchange =function(){
											      $.each(self.events,function(i,item){
														item(self)
													})
											}
											self.init=function(){
												buildDom()
												buildEvent()
											}
											self.init()
										 }