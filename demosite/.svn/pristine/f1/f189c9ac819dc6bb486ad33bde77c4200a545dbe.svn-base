/**
 * @author FXS
 */
function parseData(data,type){
	var obj;
	if(type=='hown'){
		$('#hown > .txtcon01 > .cp01 > ul > li').each(function(i) {
			if (data['his'] && data['his'][i]) {
				var product = new Product(data['his'][i])
				product.afterBuy = afterBuy
				product.detail = detail
				product.dom.appendTo($(this).empty());
			}
		});
	}else if(type=='edm'){
		$.template('edmslider', '<div>' + '<span class="bfb"><img src="./images/se/b035.jpg"/></span>' + '<span style="width: 450px;" class="jdt"><em>${name}</em><a style="display:none;" class="mailico"></a></span>' + '</div><div class="clear"></div>');
		$('#projedm').empty()
		$.each(data['scenario'], function(i, item) {
			if ($.isEmptyObject(item)) {
				return
			}
			$.tmpl('edmslider', item).appendTo('#projedm')
			var p = $('<div style="display:none;" class="edm_txt"><div class="close"><a>关闭&nbsp;X</a></div>' + '<h1>标题：用户F0A6EFF3-BBB4-E3BD您好，根据你的以往偏好，百分点为您推荐</h1>' + '<p>亲爱的F0A6EFF3-BBB4-E3BD:</p>' + '<p>根据你以往的关注历史和您个人的偏好与兴趣，百分点为您推荐：</p>' + '<div class="cp03">' + '<ul>' + '</ul>' + '</div></div>')
			$.each(item['products'], function(i1, item1) {
				var product = new Product(item1)
				product.afterBuy = afterBuy
				product.dom.appendTo($('<li></li>').appendTo(p.find('ul')))
				product.detail = detail
			})
			p.appendTo('#projedm')
		})
	}else if(type=='rec'){
		$.template('recslider', '<div>' + '<span class="bfb"><img src="./images/se/b037.jpg"/></span>' + '<span style="width: 450px;" class="jdt"><em>${name}</em></span>' + '</div><div class="clear"></div>');
		$('#projrec').empty();
		$.each(data['scenario'], function(i, item) {
			if ($.isEmptyObject(item)) {
				return
			}
			$.tmpl('recslider', item).appendTo('#projrec');
			var p = $('<div style="display:none;" class="cp03"><ul><li class="line"><img src="images/line.png"> </li><li class="cplogo">' + '<img width="80" height="31" src="' + item.logo_src + '">' + '</li></ul></div>')
			$.each(item['products'], function(i1, item1) {
				var product = new Product(item1)
				product.afterBuy = afterBuy
				product.dom.appendTo($('<li></li>').appendTo(p.find('ul')))
				product.detail = detail
			})
			p.appendTo('#projrec')
		})
		//$('#projrec').css('height', (data['scenario'].length * 92 + 285) + 'px')
	}else if(type=='ldp'){
		$.template('ldpslider', '<div>' + '<span class="bfb"><img src="./images/se/b036.jpg"/></span>' + '<span style="width: 450px;" class="jdt"><em>${name}</em><a style="display:none;" class="mailico"></a></span>' + '</div><div class="clear"></div>');
		//$('#projldp').empty();
		obj = $.tmpl('ldpslider', {name:'您搜索的关键字“'+$("#searchContent").val()+'”百分点个性化着陆页为您提供以下推荐!'}).appendTo('#projrec');
		var p = $('<div style="display:none;" class="cp03"><ul><li class="line"><img src="images/line.png"> </li></ul></div>')
		$.each(data, function(i, item) {
			if ($.isEmptyObject(item)) {
				return
			}
			var sItem = new SearchItem(item)
			sItem.afterBuy = afterBuy
			sItem.dom.appendTo($('<li></li>').appendTo(p.find('ul')))
			
			sItem.detail = detail
			
		})
		p.appendTo('#projrec')
		
		//$('#projldp').css('height', (data['scenario'].length * 92 + 285) + 'px')
	}else if(type=='ad'){
		
	}
	$('#se .jdt').each(function() {
		$(this).data('width', '450px');
	})
	loaded();
	return obj;
}
function Edm(data){
	var init = true
	var current
	$('#projedm .jdt').each(function() {
		$(this).hover(function() {
			$(this).data('m_status', 'in')
		}, function() {
			$(this).data('m_status', 'out')
		})
	})
	var blocked = false
	$('#projedm .jdt').each(function(i) {
		$(this).mouseover(function() {
			setTimeout($.proxy(function() {
				if ($(this).data('m_status') == 'out') {
					return
				}
				if (blocked) {
					return
				}
				blocked = true
				$(this).find('a').show()
				$(this).animate({
					'width' : '800px'
				}, function() {
					$.blockUI({
						message : $('#projedm .edm_txt').eq(i),
						fadeIn : 700,
						fadeOut : 7,
						css : {
							border : 'none',
							'-webkit-border-radius' : '10px',
							'-moz-border-radius' : '10px',
							top : ($(window).height() - 470) / 2 + 'px',
							left : ($(window).width() - 920) / 2 + 'px',
							width : '920px'
						}
					})
				})
			}, this), 400)
		})
	})
	$('#projedm .edm_txt .close').each(function(i) {
		$(this).click(function() {
			$.unblockUI()
			blocked = false
			$('#projedm .jdt').each(function() {
				if ($(this).width() == 800) {
					$(this).animate({
						'width' : $(this).data('width')
					}, function() {
						$(this).find('a').hide()
					})
				}
			})
		})
	})
}
function loaded(){
	var init = true
	var current
	var animating = false
	$('#projrec .jdt').each(function() {
		$(this).hover(function() {
			$(this).data('m_status', 'in')
		}, function() {
			$(this).data('m_status', 'out')
		})
	})
	$('#projrec').find('.jdt').each(function(i) {
		$(this).mouseover(function() {
			setTimeout($.proxy(function() {
				if ($(this).data('m_status') == 'out') {
					return
				}
				if ($('#projrec .cp03').eq(i).is(':visible') || animating) {
					return
				}
				animating = true
				var self = $(this)
				$('#projrec .cp03').each(function(){
					$(this).slideUp();
				});
				$('#projrec .jdt').each(function(){
					$(this).animate({
						'width' : $(this).data('width')
					},function(){
						self.animate({
							'width' : '800px'
						});
						$('#projrec .cp03').eq(i).slideDown(function() {
							animating = false
						});
					})
				});
				current = i
			}, this), 400)
		});
	})
}
