//广告延迟加载

define(['../data/admap'], function(admap){
	return function(wrap) {

		var adArea = $(wrap)[0],
			adIframe;
		
		try {	
			var idn = adArea.id.split('adjs_')[1];
		} catch(er) {
			throw new Error('广告区域id不合法');
		}

		var size = $(wrap).data('size');
		if ( ! size ){
			console.log('广告' + idn + '未定义size');
			return false;
		}

		$(wrap).css({
			'font-size': 0,
			'line-height': 0
		})

		var	aid = admap[idn],
			proxy = '/coll/adproxy.html?aid=',
			size = $(wrap).data('size').toString().split(','),
			width = size[0],
			height = size[1] ? size[1] : 0;

		var createIframe = function(id, src, width, height) {
			var iframe = function () {
            	var el = document.createElement("iframe");
            	el.id = id;
            	el.name = id;
            	el.width = width;
				el.height = height || 0;
            	el.scrolling = 'no';
				el.transparency = 'true';
            	el.frameBorder = 'no';
            	el.style.border = 'none';
            	return el;
        	}();
			iframe.src = src;
			return iframe;
		}
		
		var getRequest = function (name, txt) {
			var reg = new RegExp( name + ':[\s*| ]([a-z0-9_-]+)[\s*,})]', 'i'),
			r = txt.match(reg);
			return (r!=null) ?  unescape(r[1]) : null;
		}

		return {

			getAid: function() {
				return aid;
			},

			addIframeAd: function(callback) {
				var s = adArea;
				adIframe = createIframe('m1905ad_' + aid, proxy + aid, width, height);
				setTimeout(function() {
					$(adIframe).css('transition', '500ms').appendTo(s);
					callback && callback();
				}, 500);
				return adIframe;
			},

			removeIframeAd: function() {
				adIframe.remove();
				$(wrap).trigger('adremoved');
			},

			addTimeAd: function(duration, removeCallback, adid) {
				adid = adid || aid;
				var iframe = createIframe('m1905ad_' + adid, proxy + adid, width, height),
					step = 1000,
					t = duration/step;

				$(adArea).append(iframe);

				var timeTrigger = setInterval(function(){
					t-- && $(iframe).trigger('timechange', t)
				}, step);

				setTimeout(function() {
					$(iframe).remove();
					removeCallback && removeCallback.call(iframe);
				}, duration || 10000)

				return iframe;
			},

			addJsAd: function() {
				var s = adArea,
					id = adArea.id;
				mBuffer('http://afp.m1905.com/asp_js/k.js', function(){
					console.log(id)
					_acK({ 
						aid: aid, 
						format: 0, 
						mode: 1, 
						gid: 1,
						serverbaseurl:"tga.acs86.com/",
						destid: id,  //页面定位参数
						async: 1
					});
				})
			}

		}

	}
})
