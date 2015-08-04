/**
 * @author Administrator
 */
MQ.widgets.Checkbox=function(setting){
	MQ.Question.call(this)
	var self=this
	self.getValue=function(){
		var result=[]
		self.page.find(':checkbox:checked').each(function(){
			result.push($(this).val())
		})
		return result
	}
	self.init=function(){
		self.page=self.renderPage($.extend({id:'widget'+setting.index},setting.commonData))
		$('<p data-role="button" style="text-align:left;">'+setting.data.question+'</p>').appendTo(self.page.find('div[data-role="content"]'))
		$('<fieldset data-role="controlgroup"></fieldset>').appendTo(self.page.find('div[data-role="content"]'))
		$.each(setting.data.data,function(i,item){
			$("<input>", {
			    type: "checkbox",
			    val: item.value?item.value:i,
				id:"checkbox"+setting.index+i}).appendTo(self.page.find('fieldset'))
				$('<label for="'+("checkbox"+setting.index+i)+'">'+item.label+'</label>').appendTo(self.page.find('fieldset'))
		})
//		$('body').append(self.page)
	}
	self.init()
}
