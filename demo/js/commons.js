/**
 * @author Administrator
 */
$.template('product', '<table cellspacing="0" cellpadding="0" border="0">' +
'<tbody><tr>' +
'<td>' +
' <div class="ls"><div class="mark"><div class="quanzhong"></div></div><img width="160" height="160" src="${img_src}"> <div class="lsico">${opration}</div></div>' +
'</td>' +
'</tr>' +
'<tr>' +
'<td>' +
'<div style="height:32px;overflow-y: hidden;">产品名称:${name}</div>'+
'</td>' +
'</tr>' +
'<tr>' +
'<td>' +
'来源网站：${source}' +
' </td>' +
'</tr>' +
'<tr>' +
' <td>' +
'操作：<a style="cursor:pointer"><img align="absmiddle" src="images/buy.png"></a>' +
'</td>' +
'</tr>' +
'</tbody></table>');
var pruduct_oprations={
	'purchaseitem':'购买过',
	'visititem':'浏览过'
}
function Product(item){
	var self = this
	self.init=function(){
		if(item['opration']){
				if(pruduct_oprations[item['opration']]){
					item['opration']=pruduct_oprations[item['opration']]
				}else{
					item['opration']='未知'
				}
		}
		self.dom=$.tmpl( 'product', item)
		if(item['tag']){
			var tag=$()
			var tags=$.map( item['tag'], function(i){
				   for(var k in i){
				     	return k
				   }
			})
			$.each(tags,function(i,item){
				$('<h'+(i+1)+'>'+item+'</h'+(i+1)+'>').appendTo(self.dom.find('.quanzhong'))
			})
		}
		if(!item['opration']){
			self.dom.find('.lsico').remove()
		}
		self.dom.find('div.ls').hover(function(){
			$(this).data('status','in')
			setTimeout($.proxy(function(){
				if($(this).data('status')=='in'){
					$(this).find('.mark').animate({height:'160px'})
				}
			},this),200)
		},function(){
			$(this).data('status','out')
			setTimeout($.proxy(function(){
				if($(this).data('status')=='out'){
					$(this).find('.mark').animate({height:'0px'})
				}
			},this),200)
		})
		self.dom.find('a').one('click',function(){
			$.getJSON("http://scenario.baifendian.com:8008/DemoBuy.do?callback=?", 
									{
										cid:item.cid,
										iid:item.iid 
									},
									function(data){
					                     if(data&&data[0]==0&&data[1]=='OK'){
										 	self.afterBuy()
										 }
					                });
		})
	}
	self.init()
}
