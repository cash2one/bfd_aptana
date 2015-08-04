/**
 * @author Administrator
 */
$.template('product', '<table cellspacing="0" cellpadding="0" border="0">' +
'<tbody><tr>' +
'<td>' +
' <div class="ls hotpoint"><div class="mark"><div class="quanzhong"></div></div><img width="100" height="100" src="${img_src}"> <div class="lsico ${opration}"></div></div>' +
'</td>' +
'</tr>' +
/*'<tr>' +
'<td>' +
'<div style="height:32px;overflow-y: hidden;" class="hotpoint">产品名称:${name}</div>'+
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
'</tr>' +*/
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
					item['opration_text']=pruduct_oprations[item['opration']]
				}else{
					item['opration_text']='未知'
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
			var ls = $(this)
			setTimeout($.proxy(function(){
				if($(this).data('status')=='in'){
					$(this).find('.mark').animate({height:ls.height()})
				}
			},this),200)
		},function(){
			$(this).data('status','out')
			setTimeout($.proxy(function(){
				if($(this).data('status')=='out'){
					$(this).find('.mark').animate({height:'0px'})
				}
			},this),200)
		});
		self.dom.find('.hotpoint').click(function(){
			$.getJSON("http://192.168.11.53/javademo/item.jsp?callback=?", 
									{
										cid:item.cid,
										iid:item.iid 
									},
									function(jsondata){
					                    self.detail(jsondata);
					                });
		});
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
		});
	}
	self.init()
}

function SearchItem(item){
	var self = this
	self.init=function(){
		if(item['opration']){
				if(pruduct_oprations[item['opration']]){
					item['opration_text']=pruduct_oprations[item['opration']]
				}else{
					item['opration_text']='未知'
				}
		}
		self.dom=$('<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="hotpoint"> <div class="ls"><div class="mark" style="height: 0px; "></div><img width="100" height="100" src="'+ item["img"] +'" ></div></td></tr></tbody></table>')
		if(item['tags']){
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
			var ls = $(this);
			setTimeout($.proxy(function(){
				if($(this).data('status')=='in'){
					$(this).find('.mark').animate({height:ls.height()})
				}
			},this),200)
		},function(){
			$(this).data('status','out')
			setTimeout($.proxy(function(){
				if($(this).data('status')=='out'){
					$(this).find('.mark').animate({height:'0px'})
				}
			},this),200)
		});
		self.dom.find('.hotpoint').click(function(){
			$.getJSON("http://192.168.11.53/javademo/item.jsp?callback=?", 
									{
										cid:item.cid,
										iid:item.iid 
									},
									function(item){
					                    self.detail(item);
					                });
		});
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
		});
	}
	self.init()
}




function detail(model) {
	$.template('productDetail', '<div style="width:550px;"><div class="floatL"><img style="width:250px;" src="${img}"/></div><div class="floatR"><div class="showText">名称：${name}</div><div class="showText">品牌：${brd}</div><div class="showText">价格：${prc}</div><div class="showText">类目：${cat}</div><div class="showText">标签：${name}</div><div class="buyDiv" onclick=\'GoToBuy({"cid":"${cid}","iid":"${iid}"})\'><img  align="absmiddle" src="images/buy.png"></div></div></div>');
	$.fancybox($.tmpl('productDetail', model),{
		enableEscapeButton:true
	});
}
function GoToBuy(obj){
	$.getJSON("http://scenario.baifendian.com:8008/DemoBuy.do?callback=?", 
									{
										cid:obj.cid,
										iid:obj.iid 
									},
									function(data){
					                     if(data&&data[0]==0&&data[1]=='OK'){
										 	//self.afterBuy()
										 }
					                });
}
