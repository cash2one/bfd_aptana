/*index_patch.js  bulid 2013-03-01*/
mBuffer.ready(function() {
(function floorLoader() {
	if($.browser.msie && $.browser.version == '6.0') {
		$('img[data-original]').each(function(i) {
            $(this).attr('src', $(this).data('original'))
        });
	return;
	}
    var domTime = new Date(), imgTime;
	function fl_1() {
		var floorEl = $('#floor_1');
		floorEl.find('img[data-original]').imgLoader(floorEl);
		floorEl.one('loaded', function() {
            fl_2();
		    $('#mini_nav .fl-1').addClass('online');
		});
	}
	
	function fl_2() {
		var floorEl = $('#floor_2');
		floorEl.find('img[data-original]').imgLoader(floorEl);
		floorEl.one('loaded', function() {
           fl_3();
		   $('#mini_nav .fl-2').addClass('online');
		});
	}
	
	function fl_3() {
		var floorEl = $('#floor_3');
		//getData(1);	
		floorEl.find('img[data-original]').filter(function() {
            return $(this).parents('.item1, .item2, .item3').length == 0;
		}).imgLoader(floorEl);
		
		$('#carousel_data .f_out').one('active', function() {
			$(this).find('img[data-original]').imgLoader();
		})
		
		/*function getData(id) {
		var fUrl = 'http://testwww.m1905.com/api/index/getIndex3Film.php?',
		    container = $('#carousel_data >.carousel-inner');
		$.get(fUrl + 'id=' + id, function(data) {
			container.hide().html(data).show();
			container.find('img[data-original]').imgLoader();
		});
	    }*/
		
		floorEl.one('loaded', function() {
           fl_4();
		   $('#mini_nav .fl-3').addClass('online');
		});
	}
	
	function fl_4() {
		var floorEl = $('#floor_4');
		floorEl.find('img[data-original]').imgLoader(floorEl);
		floorEl.one('loaded', function() {
		    $('#mini_nav .fl-4').addClass('online');
            imgTime = new Date();
		    //$('.login-reg').html('页面加载用时'+(imgTime-domTime)/1000+'秒')
		});
	}
	
	fl_1();
})();

/*mini-nav*/
	var $body = (window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body');
	var $mininav = $('#mini_nav');
    function mininavAdap() {
	    if (document.documentElement.clientWidth < 1350) {
	        $mininav.addClass('horizontal');
	    }else {
		    $mininav.removeClass('horizontal');
	    }
		if ($(document).height() - $(window).scrollTop() < $(window).height()+100) {
		    $mininav.fadeOut(300);
	    }else{
			if(! $('html').hasClass('ie6')) {
			    $mininav.fadeIn(300);
			}
		}
    }
    $mininav.children('.go').click(function() {
        $(this).toggleClass('active').siblings('.mini-nav').toggleClass('on');
		$('.mini-floor>li').removeClass('active');
    });
	$(document).on('click', '.mini-floor li a, #doorNav li a', function(e) {
		var sh = $($(this).attr('href')).offset().top;
		$body.animate({scrollTop: sh-50}, 300, 'linear');
        e.preventDefault()
    });
	
	function mininavHide() {
		$mininav.children('.go').removeClass('active').siblings().removeClass('on');
	}
	
//effectLoad	
	function effectLoad() {
		mininavAdap();     
	    if ($('#floor_2').offset().top - $(window).scrollTop() < -200) {
		    getLivepg();
	    }
	    if ($.browser.msie && $.browser.version < 9){
		    return
	    }else{
            if ($('#floor_2').offset().top - $(window).scrollTop() < 0) {
		        dialInit();
	        }
	    }
	}
	effectLoad();
	var t;
	$(window).on('resize scroll', function() {
		clearTimeout(t);
	    t = setTimeout(effectLoad, 200);
    });
	
	
	$(document).click(function(e) {
        var target = e.srcElement || e.target;
	    if ($(target).closest('#mini_nav').length == 0 ) {
			mininavHide();
        }
	});
});

//cctv6直播间
var getLivepg = (function() {
	var isGet;
	return function() {
		if (isGet) return;
    	var seed = 0, list, timer;
    	$.ajax({
        	type:'GET',
        	url:'http://www.m1905.com/inc/2013/getEpginfo.html',
        	//cache:false,
        	dataType:'json',
        	success: function(data,status,xhr) {
            	var headers = xhr.getResponseHeader('Date');
				//当前时间nowTime
            	var nowTime = Date.parse(headers)/1000, cnt = data.length;
				list = data;
            	SetRemainTime(nowTime)
        	}
    	});
    	function SetRemainTime(nowTime){
			var listItem = '', past = -1;
        	nowTime+=60;
        	$(list).each(function(i){
            	listItem += "<li><em>"+this.time+"</em> <a href='http://www.m1905.com/cctv6/live/' target='_blank' title='"+this.title+"'>"+this.title+"</a></li>";
				if(nowTime > this.timeU) {
					past+=1;
				}
        	});
			$(".bdcast_list").html(listItem).animate({scrollTop: past*27}, past*300);
			if(timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				SetRemainTime(nowTime);
			}, 60000);
    	}

    	isGet = true;
    }
})();

/*guide-bar*/
function guideBar() {
	var guideHtml = '<div id="guideBar"><div><span class="fl">亲，把我<a onClick="addFav()">收藏</a>或者<a onClick="setHome()">设为主页</a>吧，我和你有个电影的约定！</span><b title="点击关闭" onClick="closeGuide()">×</b><span class="fl"><a onClick="$(\'.login-reg > a\').tab(\'show\')">登录电影网</a>，和大家一起分享我的电影生活。</span></div></div>';	
	$(window).on('scroll.guideBar', function() {
        if($('#floor_2').offset().top - $(window).scrollTop() < 0) {
            $('body').append(guideHtml);
	        $('#guideBar').hide().fadeIn(500);
			$(window).off('scroll.guideBar');
		}
	});
}

function addFav() {
	var sTitle = document.title, sURL = location.href;
    try {
        window.external.addFavorite(sURL, sTitle);
    }catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        }catch (e) {
            alert("请用CTRL+D手动添加收藏");
        }
    }
}

function setHome() {
	var pageURL = location.href;
	if (document.all) {
        document.body.style.behavior='url(#default#homepage)';
        document.body.setHomePage(pageURL); 
	}else if (window.sidebar) {
		if(window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}catch (e) {
				alert( "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项signed.applets.codebase_principal_support 值该为true" ); 
			} 
		}
		var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
		prefs.setCharPref('browser.startup.homepage',pageURL);
	}
}

function closeGuide() {
	$('#guideBar').fadeOut(500, function(){
		$(this).remove();
	});
	//store.set('guideUser', expires)
}

//首页4楼热门叮叮滚动效果
//or为true为自动播放，不加此参数或false就默认不自动
function DY_scroll(wraper,img,speed,or){ 
  var wraper = $(wraper);
  var img = $(img).children("#hot-dd");
  var w = img.find('li').outerHeight(true);
  var s = speed;
  function clicked(){
    for(var i=0;i<3;i++){
      img.find('li').eq(0).appendTo(img);
    }	
  }
  if (or == true){
    ad = setInterval(function() {  clicked();},s*1000);
    wraper.hover(function(){clearInterval(ad);},function(){ad = setInterval(function() {  clicked();},s*1000);});
  }
}

mBuffer(function() {
	var d = new Date(),
	    nowTime = d,
		holdTime = 0.5*24*60*60*1000; 
    d.setTime(d.getTime()+holdTime);
	var expires = d.getTime();
	var auth = M1905.Util.getcookie('mauth');
    if(auth != null ) {
		return;
	}
	var guideDate = store.get('guideUser'); 
	if(!guideDate || guideDate < parseInt(d-holdTime)) {
		guideBar();
		store.set('guideUser', expires);
	}	
//store.clear() 
});

/*浏览器兼容JS*/
$('#carousel_data .carousel-panel ul li').click(function(e) {
	if ($.browser.msie){
		$(this).siblings().andSelf().removeClass('rel')
		if($(this).next().length>0) {
	        $(this).next().addClass('rel');
		}
	}
    $(this).addClass('active').siblings().removeClass('active');
});

$('.star-item').mouseenter(function() {
   $(this).removeClass('lowlight').siblings('.star-item').addClass('lowlight') 
});
$('.col-star').mouseleave(function() {
   $(this).children().removeClass('lowlight'); 
});

if ($.browser.msie && $.browser.version < 9){
$('.score-img > .score0').each(function() {
	var $this = $(this), bgPath = 'http://static.m1905.cn/index2012/images/score/';
	var bgName = 'zhishu' + $this.attr('class').split(' ')[1].match(/[0-9]{2}/) + '.png'
    $this.css('background-image', 'url(' + bgPath + bgName + ')')
});
}

function dialInit() {
	$('.score_dial').each(function() {
        var needle = $(this).find('#needle'),
		    act = $(this).find('.act-area'),
		    score = $(this).children('.num').text(),
		    needleRotate = score/10*165-82.5,
			actRotate = score/10*165-172;
		if(!$.isNumeric(needleRotate)) {
			return;
		}
	    needle.css({'transform': 'rotate('+ needleRotate +'deg)', 'transition': '300ms'});
		act.css({'transform': 'rotate('+ actRotate +'deg)', 'transition': '300ms'});			
    });	
}

(function() {
	var hover = 0, timer = [];
    $('.carousel-panel ul li').hover(function() {
		var el = $(this);
		hover = 1;
		clearTimeout(timer[this]);
		timer[this] = setTimeout(function() {
		    if(hover == 1) {
	            el.addClass('hover');
		    }
		}, 600);
    },function() {
		hover = 0;
	    $(this).removeClass('hover');
    });
    DY_scroll('#hotTopic','#hot-dd-box',5,true);
})();

//AD
/*mBuffer('http://afp.m1905.com/asp_js/k.js', function() {
	$('.adArea').each(function(i) {
		if (this.id) {
            renderAD(this.id);
		}
    });
	function renderAD(boxid) {
	    var adArea = document.getElementById(boxid),
		    idn = boxid.split('_')[1];
	    $.ajax( '/data/js/' + idn + '.js', {
			dataType: 'html', 
			success: function(d){
				if (d.length < 10){
					return;
				}
		        var aid = d.match(/\(.*\)/g).toString().replace(/\(|\)/g, '').split(',');
		        //loadScriptStr('', adArea, 'ac_js86_'+ $.trim(aid[0].split(':')[1]))
		        aid = 'ac_js86_'+ $.trim(aid[0].split(':')[1]);
		        var script = d.replace(/async:\s*0/g, 'async: 1');
		        //loadScriptStr(d, adArea);
		        var b = document.createElement('span'); //创建触发元素
		        b.id = aid;
		        adArea.appendChild(b);
		        eval(script);
	        }
	    });
	}
});*/

if ($.browser.msie){
	if($.browser.version < 9) {
	    $('html').addClass('ie' + parseInt($.browser.version));
	}else{
		$('html').addClass('adv-ie');
	}
}else{
	$('html').addClass('non-ie');
}