/**
 * @author Administrator
 */
var MQ={widgets:{}}
MQ.Question=function(){
	this.renderPage=function(data,onRander){
		   var r=$.tmpl('<div data-role="page" data-theme="b" data-url="${id}" id="${id}">'+
								'<div data-role="header" data-theme="b">'+
								'<a href="index.html" data-theme="b" data-icon="delete">Cancel</a>'+
								'<h1>Edit Contact</h1>'+
								'<a href="index.html" data-theme="b" data-icon="check">Save</a>'+
								'</div><!-- /header -->'+
								'<div data-role="content" data-theme="c">	'+
//								'<p data-role="button" style="text-align:left;">你幸福吗</p>'+
//								'<fieldset data-role="controlgroup">'+
//								
//								'</fieldset>'+
								'</div><!-- /content -->'+
'<div class="ui-grid-a">'+
'<div class="ui-block-a">'+
'<div data-role="button"  data-icon="arrow-l" data-iconpos="left">'+
'上一题目'+
'</div>'+
'</div>'+
'<div class="ui-block-b">'+
'<div data-role="button"  data-icon="arrow-r" data-iconpos="right">'+
'下一题目'+
'</div>'+
'</div>'+
'</div>'+
								'<div data-role="footer" data-position="fixed"  data-theme="b"> '+
								'<h4>底部</h4> '+
								'</div> '+
								'</div><!-- /page -->', data)
		if(onRander){
			onRander(r)
		}
		return r
	}
}
