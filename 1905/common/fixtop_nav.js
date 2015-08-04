define(["../utils/videolog"], function(a) {
	var e = '<div id="site_nav"><div id="site_nav_md"><ul class="menu"><li class="noticenter" style="display:none"><a href="#notiCenter" data-toggle="tab"></a></li><li class="login-reg"><a href="#loginreg" data-toggle="tab"><s></s>登录/注册</a></li><li class="logged" style="display:none"><a href="http://passport.m1905.com/v2/" class="myusername"><s></s>欢迎你，<span></span></a> <span class="fl">|</span> <a href="#" data-btns="logout">退出</a><a class="btns" href="http://d.m1905.com/" target="_blank">进入叮叮</a></li><li class="site_all"><a href="#sitemap" data-toggle="tab"><s></s>网站导航</a></li><li class="cctv6menu"><a href="#program" data-toggle="tab"><s></s>CCTV6节目单</a></li><li class="client"><a href="#client" data-toggle="tab"><s></s>客户端</a></li><li class="media"><a href="#media" data-toggle="tab"><s></s>电影频道全媒体</a></li><li class="history"><a href="#viewlog" data-toggle="tab"><s></s>观看记录</a></li></ul></div><div class="nav_slide" id="sitemap"><div class="menubox menu_panel htauto"> <span class="slideup"><a href="#"></a></span> <em class="bsize db">网站导航</em><div class="menu_bd"><dl><h2><a href="http://www.m1905.com/vod/" target="_blank">高清影院</a></h2><dd><a href="http://www.m1905.com/vod/dp/" target="_blank">大片</a>　<a href="http://www.m1905.com/vod/nd/" target="_blank">内地</a>　<a href="http://www.m1905.com/vod/gp/" target="_blank">港片</a>　<a href="http://www.m1905.com/vod/list/a_3/o1u1p1.html" target="_blank">韩片</a>　<a href="http://www.m1905.com/vod/om/" target="_blank">欧美</a>　<a href="http://www.m1905.com/vod/list/c_178/o1u1p1.html" target="_blank">独家</a>　<a href="http://www.m1905.com/vod/rank/a99o1.shtml" target="_blank">热播</a>　<a href="http://www.m1905.com/vod/list/c_586/o1u1p1.html" target="_blank">首映</a>　<a href="http://www.m1905.com/vod/list/n_1/o1u1p1.html" target="_blank">分类索引</a></dd></dl><dl><h2><a href="http://www.m1905.com/film/" target="_blank">资讯</a></h2><dd><a href="http://www.m1905.com/film/filmnews/ch/" target="_blank">内地</a>　<a href="http://www.m1905.com/film/filmnews/hk/" target="_blank">港台</a>　<a href="http://www.m1905.com/film/filmnews/ea/" target="_blank">欧美</a>　<a href="http://www.m1905.com/film/filmnews/jk/" target="_blank">日韩</a>　<a href="http://www.m1905.com/film/filmnews/cy/" target="_blank">产业</a>　<a href="http://www.m1905.com/film/picture/" target="_blank">图片</a>　<a href="http://www.m1905.com/film/video/" target="_blank">视频</a>　<a href="http://www.m1905.com/special/index-p-typeid-1.html" target="_blank">专题</a>　<a href="http://www.m1905.com/special/index-p-typeid-2.html" target="_blank">独家</a></dd></dl><dl><h2><a href="http://www.m1905.com/mdb/film/" target="_blank">影库</a></h2><dd><a href="http://www.m1905.com/mdb/film/newfilm/c1v0d0o1p1.html" target="_blank">最新</a>　<a href="http://www.m1905.com/mdb/film/hot/list/v0d0w2p1.html" target="_blank">热映</a>　<a href="http://www.m1905.com/mdb/film/classics/y1c1v0d0o1p1.html" target="_blank">佳片</a>　<a href="http://www.m1905.com/mdb/film/comment/" target="_blank">影评</a>　<a href="http://www.m1905.com/mdb/film/search/" target="_blank">电影查询</a></dd></dl><dl><h2><a href="http://www.m1905.com/star/" target="_blank">明星</a></h2><dd><a href="http://www.m1905.com/star/starnews/" target="_blank">星闻</a>　<a href="http://www.m1905.com/mdb/star/" target="_blank">明星库</a>　<a href="http://www.m1905.com/mdb/relation/" target="_blank">关系库</a>　<a href="http://www.m1905.com/star/strongword/" target="_blank">语录</a>　<a href="http://www.m1905.com/star/video/" target="_blank">视频</a> <a href="http://www.m1905.com/star/photo/" target="_blank">写真</a>　<a href="http://www.m1905.com/star/show/" target="_blank">秀场</a></dd></dl><dl><h2><a href="http://www.m1905.com/cctv6/" target="_blank">CCTV6</a></h2><dd><a href="http://www.m1905.com/cctv6/all/columns/list/" target="_blank">栏目</a>　<a href="http://www.m1905.com/cctv6/all/film/list/w_1/p1.shtml" target="_blank">影片</a>　<a href="http://www.m1905.com/cctv6/wanhui/film/list/w_1/p1.shtml" target="_blank">晚会</a>　<a href="http://www.m1905.com/cctv6/all/presenter/list/" target="_blank">主持人</a>　<a href="http://www.m1905.com/cctv6/all/video/list/w_1/p1.shtml" target="_blank">节目查询</a>　<a href="http://www.m1905.com/list-p-catid-956-typeid-1.html" target="_blank">专题</a>　<a href="http://www.m1905.com/cctv6/live/" target="_blank">电视直播间</a>　<a href="http://www.m1905.com/cctv6/program/dypdepg/list/" target="_blank">节目表</a></dd></dl></div><div class="menu_bd"><dl><h2><a href="http://vip.m1905.com/" target="_blank">付费频道</a></h2><dd><a href="http://vip.m1905.com/list/channel-1/" target="_blank">内地</a>　<a href="http://vip.m1905.com/list/channel-2/" target="_blank">港台</a>　<a href="http://vip.m1905.com/list/channel-3/" target="_blank">韩片</a>　<a href="http://vip.m1905.com/list/channel-4/" target="_blank">欧美</a></dd></dl><dl><h2><a href="http://www.m1905.com/yx/" target="_blank">影讯</a></h2><dd><a href="http://www.m1905.com/yx/cinema/" target="_blank">影院</a>　<a href="http://www.m1905.com/yx/film/" target="_blank">热映</a>　<a href="http://www.m1905.com/yx/rank/" target="_blank">票房</a>　<a href="http://www.m1905.com/yx/comment/" target="_blank">影评</a></dd></dl><dl><h2><a href="http://www.m1905.com/video/" target="_blank">视频</a></h2><dd><a href="http://www.m1905.com/video/news/" target="_blank">视频资讯</a>　<a href="http://www.m1905.com/video/prevues/" target="_blank">预告片</a>　<a href="http://www.m1905.com/video/pfbb/" target="_blank">票房播报</a>　<a href="http://www.m1905.com/video/dypd/" target="_blank">电影盘点</a>　<a href="http://www.m1905.com/video/dykcd/" target="_blank">电影剪辑</a>　<a href="http://www.m1905.com/video/jdmx/" target="_blank">焦点明星</a>　<a href="http://www.m1905.com/video/live/" target="_blank">直播</a></dd></dl><dl><h2><a href="http://www.m1905.com/newgallery/" target="_blank">图库</a></h2><dd><a href="http://www.m1905.com/newgallery/list/c53.html" target="_blank">明星写真</a>　<a href="http://www.m1905.com/newgallery/list/c773.html" target="_blank">图片资讯</a>　<a href="http://www.m1905.com/newgallery/list/c774.html" target="_blank">秀场图片</a>　<a href="http://www.m1905.com/newgallery/list/c41.html" target="_blank">电影剧照</a>　<a href="http://www.m1905.com/newgallery/list/c35.html" target="_blank">电影海报</a></dd></dl><dl><h2><a href="http://www.m1905.com/interactive/activity/" target="_blank">互动</a> <a href="http://bbs.m1905.com/" target="_blank">论坛</a> <a href="http://blog.m1905.com/list.php" target="_blank">博客</a> <a href="http://game.m1905.com/" target="_blank">游戏</a></h2><dd><a href="http://www.m1905.com/sitemap.html" target="_blank">更多</a></dd></dl></div></div></div><div class="nav_slide" id="notiCenter"><div class="menubox"> <em class="bsize">通知中心</em><div class="nc-msg"></div></div><span class="slideup"><a href="javascript:;"></a></span> </div><div class="nav_slide" id="loginreg"> <span class="slideup"><a href="#"></a></span><div class="menubox login-regis htauto"><div class="login"> <em class="bsize">登录</em><form data-init="validation" class="form-login mb20" action="http://www.m1905.com/member/do.php?" method="post"><div class="field"><div class="controls"><label class="placeholder">用户名</label><input type="text" maxlength="32" value="" autocomplete="off" class="login-text" id="inputUsername" check-type="required" required-message="用户名不能为空！"></div></div><div class="field"><div class="controls"><label class="placeholder">密码</label><input type="password" maxlength="32" value="" autocomplete="off" class="login-text gr_input" id="inputPassword" check-type="required" required-message="请输入密码"></div></div><p class="mt15 white_f"><button type="submit" class="login_btn white_f" hidefocus="true"><span></span>立即登录</button><a href="http://home.m1905.com/do.php?ac=lostpasswd" class="ml25 underline white_f">忘记密码</a> </p></form><em class="bsize">合作网站登录</em><div class="co-login"><a class="ico-login sina" href="javascript:;" data-login="Sina"></a><a class="ico-login qq" href="javascript:;" data-login="Qq"></a><a class="ico-login baidu" href="javascript:;" data-login="Baidu"></a></div></div><div class="regis"> <em class="bsize">注册</em><form data-init="validation" class="form-reg" action="http://www.m1905.com/member/do.php?" method="post"><div class="field"><div class="controls"><label class="placeholder">用户名</label><input type="text" maxlength="32" value="" autocomplete="off" class="reg-text gr_input" id="regUsername" check-type="username"></div></div><div class="field"><div class="controls"><label class="placeholder">密码</label><input type="password" maxlength="32" value="" autocomplete="off" class="reg-text gr_input" id="regPassword" check-type="password"></div></div><div class="field"><div class="controls"><label class="placeholder">确认密码</label><input type="password" maxlength="32" value="" autocomplete="off" class="reg-text gr_input" id="confirmPassword" check-type="confirmpwd"></div></div><div class="field"><div class="controls"><label class="placeholder">邮箱</label><input type="text" maxlength="32" value="" autocomplete="off" class="reg-text gr_input" id="regMail" check-type="mail"></div></div><div class="field"> <span class="controls"><label class="placeholder">验证码</label><input type="text" value="" autocomplete="off" class="reg-code gr_input" id="regCode" check-type="seccode"></span> <span class="seccode"></span> </div><p class="white_f mt15"><button type="submit" class="login_btn white_f" hidefocus="true"><span></span>完成注册</button><label for="form_agree"><input name="agree" type="checkbox" id="form_agree" checked><a href="#" class="ml05 underline white_f">电影网服务协议</a> </label></p></form></div></div></div><div class="nav_slide" id="viewlog"> <span class="slideup"><a href="javascript:;"></a></span><div class="menubox cookie-view htauto"> <em class="bsize">观看记录</em><div class="playlog htauto"> </div></div></div><div class="nav_slide" id="media"><div class="menubox media_m htauto"> <span class="slideup"><a href="javascript:;"></a></span> <em class="bsize">电影频道全媒体</em><ul class="htauto mt30"><li><a href="http://www.m1905.com/cctv6/" class="cctv6" target="_blank" hidefocus="true"><span>电影频道</span></a></li><li><a href="http://www.chc2004.cn/" class="CHC" target="_blank" hidefocus="true"><span>CHC频道</span></a></li><li><a href="http://www.m1905.com/cmc/" class="CMC" target="_blank" hidefocus="true"><span>CMC频道</span></a></li><li><a href="http://cs.m1905.com/" class="CS" target="_blank" hidefocus="true"><span>中国银幕</span></a></li><li><a href="http://www.m1905.com/other/dm/" class="DM" target="_blank" hidefocus="true"><span>电影频道DM</span></a></li><li><a href="http://www.m1905.com/cctv6/radio/" class="radioTeam" target="_blank" hidefocus="true"><span>听电影</span></a></li><li><a href="http://www.m1905.com/special/s2010/m1905club/" class="mobileNews" target="_blank" hidefocus="true"><span>手机报</span></a></li></ul></div></div><div class="nav_slide" id="client"><div class="menubox clientbox htauto"> <span class="slideup"><a href="javascript:;"></a></span> <em class="bsize">客户端</em><ul class="htauto mt30"><li><a href="http://www.m1905.com/special/s2013/m1905browser/" class="m1905_browser" target="_blank" hidefocus="true"><span>电影浏览器</span></a></li><li><a href="http://www.m1905.com/special/s2012/mobileclient/" class="mobile_client" target="_blank" hidefocus="true"><span>手机客户端</span></a></li><li><a href="http://www.m1905.com/special/s2012/mobileclient/" class="ipad_client" target="_blank" hidefocus="true"><span>IPAD客户端</span></a></li><li><a href="http://www.m1905.com/special/s2010/m1905player/" class="pc_client" target="_blank" hidefocus="true"><span>PC客户端</span></a></li><li><a href="http://hd.m1905.com/" class="hd_client" target="_blank" hidefocus="true"><span>HD电影播放器</span></a></li></ul></div></div><div class="nav_slide" id="program"><div class="menubox htauto"></div></div></div>';
	var t = $(e).prependTo("body");
	$("label.placeholder", t).placeholder();
	M1905.noticeCenter = {
		menu: $(".noticenter > a"),
		elem: $(".nc-msg"),
		temp: '<div class="cookie_null m_yahei"></div>',
		show: function(a, e, t) {
			M1905.noticeCenter.elem.html($(M1905.noticeCenter.temp).append(a));
			M1905.noticeCenter.menu.tab("show");
			setTimeout(function() {
				l();
				t && t()
			}, e || 2500)
		}
	};

	function l() {
		$(".nav_slide").slideUp(200).removeClass("active");
		$("#site_nav_md li").removeClass("active")
	}! function(e) {
		e.fn.validation = function(a) {
			return this.each(function() {
				d = e.extend({}, e.fn.validation.defaults, a);
				u(this);
				e("input, textarea", this).each(function() {
					var a = e(this),
						t = a.attr("check-type") == undefined ? null : a.attr("check-type").split(" "),
						l = a.prev("label");
					a.parent().append('<span class="msg-box"></span>');
					if (t != null && t.length > 0) {
						a.focus(function() {
							var e = a.closest(".controls"),
								l = a.closest(".field"),
								i = e.find(".help-inline, .help-success"),
								s = l.find(".msg-box");
							var n = d.validRules;
							for (var r = 0; r < n.length; r++) {
								if (n[r].name == t && n[r].hasOwnProperty("focusMsg")) {
									s.html('<span class="help-inline"><i></i>' + n[r].focusMsg + "</span>");
									break
								}
							}
							l.attr("class", "field");
							a.removeClass("gr_input")
						});
						a.blur(function() {
							a.addClass("gr_input")
						});
						a.change(function() {
							g(this, t)
						})
					}
				})
			})
		};
		e.fn.validation.defaults = {
			validRules: [{
				name: "required",
				validate: function(a) {
					return e.trim(a) == ""
				},
				defaultMsg: "请输入内容。"
			}, {
				name: "password",
				validate: function(a) {
					if (a.length == 0) {
						return !0
					} else if (!/^[a-z0-9_-]{6,18}$/.test(a)) {
						return "请输入6-20位字符"
					}
					return false
				},
				defaultMsg: "请输入密码",
				focusMsg: "6-20位字符，字母区分大小写"
			}, {
				name: "confirmpwd",
				validate: function(a) {
					if (e.trim(a) == "") {
						return "请再次输入密码"
					}
					var t = e(this).parents(".field").prev().find('input[check-type="password"]').val();
					return !(a == t)
				},
				defaultMsg: "确认密码不一致"
			}, {
				name: "mail",
				validate: function(a) {
					if (!/^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/.test(a)) {
						return "请输入正确的邮箱地址"
					} else {
						return f("checkemail", "email=" + a, this)
					}
				},
				defaultMsg: "邮箱检测中..."
			}, {
				name: "username",
				validate: function(a) {
					var t = a.replace(/[^\x00-\xff]/g, "mm"),
						l = t.length;
					if (l == 0) {
						return "请输入用户名"
					}
					if (l < 4) {
						return "请输入4-30位字符或2-15个汉字"
					}
					if (!/^[a-zA-Z0-9_-]{4,16}$/.test(t)) {
						return "只能使用字母、数字、汉字、下划线和减号。"
					} else {
						return f("checkusername", "username=" + (e.browser.msie && document.charset == "utf-8" ? encodeURIComponent(a) : a), this)
					}
				},
				defaultMsg: "用户名检测中...",
				focusMsg: "4-30位字符"
			}, {
				name: "seccode",
				validate: function(a) {
					if (e.trim(a) == "") {
						return "请输入验证码"
					} else {
						return f("checkseccode", "seccode=" + a, this)
					}
				},
				defaultMsg: "验证码检测中..."
			}]
		};
		var s = "//passport.m1905.com/v2/api/?m=user",
			n = "//passport.m1905.com/v2/api/?m=seccodech&a=display";
		var r = false,
			o = false,
			c = false,
			m = 0,
			d = {}, h = false;
		var p = e(".regis button[type=submit]");

		function f(a, t) {
			if (h) {
				return false
			}
			m++;

			function l() {
				if (tapTime) {
					clearTimeout(tapTime)
				}
				if (m > 3) {
					return m
				}
				m = 0
			}
			tapTime = setTimeout(function() {
				l()
			}, 1e3);
			if (m > 3) {
				alert("请您休息吧，服务器忙不过来啦...");
				m = 0;
				return false
			}
			var i = e(arguments[2]),
				r = i.siblings(".msg-box"),
				o;
			r.addClass("reg-loading");
			p.siblings("img").remove();
			p.after('<img src="http://static.m1905.cn/index2012/images/loading.gif" width="20" height="20" class="mt02">');
			e.ajax({
				url: s + "&a=" + a + "&format=json",
				dataType: "jsonp",
				data: t,
				success: function(e) {
					if (e.status == 200) {
						r.html('<span class="help-success"><i></i></span>');
						i.parents(".field").removeClass("error");
						o = true
					} else {
						setTimeout(function() {
							r.html('<span class="help-inline"><i></i>' + e.info + "</span>")
						}, 300);
						if (a == "checkseccode") {
							document.getElementById("img_seccode").src = n + "&rand=" + Math.random() * 6
						}
						o = false
					}
					r.removeClass("reg-loading");
					p.siblings("img").remove()
				}
			});
			return !o
		}
		var g = function(a, t) {
			var l = e(a),
				s = false,
				n = "";
			for (i = 0; i < t.length; i++) {
				var r = true,
					o = t[i],
					c = l.attr(o + "-message") == undefined ? null : l.attr(o + "-message");
				if (o.substr(0, 1) == "!") {
					r = false;
					o = o.substr(1, o.length - 1)
				}
				var m = d.validRules;
				for (j = 0; j < m.length; j++) {
					var h = m[j];
					if (o == h.name) {
						var p = h.validate.call(a, l.val());
						if (p == r) {
							s = true;
							n = c == null ? h.defaultMsg : c;
							break
						}
						if (p) {
							s = true;
							n = p;
							break
						}
					}
				}
				if (s) {
					break
				}
			}
			var f = l.parents(".controls"),
				g = l.parents(".field"),
				u = f.find(".help-inline"),
				w = f.children(".msg-box");
			if (s) {
				if (!g.hasClass("error")) {
					w.hide();
					w.html('<span class="help-inline"><i></i>' + n + "</span>").css("margin-left", 100).animate({
						marginLeft: 0,
						opacity: "show"
					}, 500, "easeOutExpo");
					g.addClass("error")
				}
			} else {
				if (l.hasClass("login-text")) {
					w.html("")
				}
			}
			return !s
		};
		var u = function(a) {
			e(".login_btn").hover(function() {
				h = true
			}, function() {
				h = false
			});
			e(a).submit(function(t) {
				h = true;
				if (e("#form_agree").attr("checked") !== "checked") {
					return false
				}
				if (r) {
					return false
				}
				var l = false;
				e("input, textarea", this).each(function() {
					var a = e(this),
						t = a.attr("check-type") == undefined ? null : a.attr("check-type").split(" ");
					if (t != null && t.length > 0) {
						if (!g(this, t)) {
							if (c == false) {
								scrollTo(0, a[0].offsetTop - 50);
								e(a).removeClass("gr_input");
								c = true
							}
							l = true
						}
					}
				});
				c = false;
				o = true;
				if (l) {
					h = false;
					r = false;
					return false
				}
				w(a);
				return false
			})
		};

		function w(a) {
			var t = e(a).get(0);
			submit_url = t.action;
			switch (t.className.split(" ")[0]) {
				case "form-login":
					var l = e(t).find("#inputUsername").val(),
						i = e(t).find("#inputPassword").val();
					l = encodeURIComponent(l);
					var n = s + "&a=login&callback=?&username=" + l + "&password=" + i;
					v("login", n);
					break;
				case "form-reg":
					var l = e(t).find("#regUsername").val(),
						i = e(t).find("#regPassword").val();
					email = e(t).find("#regMail").val();
					checkcode = e(t).find("#regCode").val();
					l = encodeURIComponent(l);
					var n = s + "&a=register&format=json&app=www&callback=?&username=" + l + "&password=" + i + "&email=" + email + "&seccode=" + checkcode;
					b(n, l);
					break
			}
			M1905.loadingAni.addin.call(e(".login-regis"));
			t.reset()
		}

		function v(a, t) {
			e.getJSON(t, function(e) {
				if (e.status == 200) {
					if (a == "login") {
						k()
					}
				} else {
					_(e.info)
				}
			})
		}

		function b(a) {
			var t = decodeURIComponent(arguments[1]);
			e.getJSON(a, function(a) {
				if (a.status == 200) {
					M1905.Util.setcookie("username", escape(t), 360);
					M1905.noticeCenter.show(a.info + ", 您现在可以直接登录电影网了");
					e(".login-reg > a").removeAttr("data-toggle");
					setTimeout("location.reload()", 3e3)
				} else {
					M1905.noticeCenter.show(a.info);
					setTimeout(function() {
						e(".login-reg > a").tab("show")
					}, 3e3)
				}
				M1905.loadingAni.remove.call(e(".login-regis"))
			})
		}

		function _(a) {
			e(".login-regis").hide();
			var a = a ? a : "登录失败";
			M1905.noticeCenter.show(a);
			M1905.loadingAni.remove.call(e(".login-regis"))
		}

		function k() {
			M1905.noticeCenter.show("登录成功");
			r = true;
			setTimeout("location.reload()", 2e3)
		}
		e('a[data-btns="logout"]').on("click", function() {
			M1905.noticeCenter.show("退出成功");
			var a = s + "&a=logout&app=www&callback=?";
			v("logout", a);
			e(this).parent().fadeOut(800);
			setTimeout("location.reload()", 1e3)
		});
		var y = 0;
		e('.login-reg > a[data-toggle="tab"]').on("shown", function(a) {
			e(".msg-box").empty();
			e(".login-regis .field").removeClass("error");
			if (y < 1) {
				e('form[data-init="validation"]').validation()
			}
			setTimeout(function() {
				e("#loginreg").find("input")[0].focus()
			}, 500);
			y++
		});
		t.on("mouseenter", ".shake-toggle", function() {
			e(this).parent().addClass("shake")
		}).on("mouseleave", ".shake-toggle", function() {
			e(this).parent().removeClass("shake")
		}).on("click", ".playlog .closeBtn", function(a) {
			var t = e(this).parents("." + e(this).attr("anim-target").split(" "));
			t.clone().appendTo(t.parents(".playlog")).css({
				position: "absolute",
				top: 40,
				left: t.index() * t.outerWidth() + 20
			}).animate({
				top: 68,
				left: 900,
				width: t.width() * .15,
				height: t.height() * .15,
				opacity: "hide"
			}, 1200, "swing", function() {
				e(this).remove();
				C.close();
				t.animate({
					width: "hide"
				}, 500, "easeOutExpo", function() {
					t.remove()
				})
			}).addClass("rotate");
			t.empty().addClass("deleted");
			C.open();
			var l = e(this).data("delid");
			PlayList.del(l);
			a.preventDefault()
		});
		var C = {
			elem: function() {
				return e("#garbageBin")
			},
			init: function() {
				C.elem().click(function() {
					C.empty(e(".cookie-item"))
				})
			},
			open: function() {
				C.elem().addClass("open")
			},
			close: function() {
				C.elem().removeClass("open")
			},
			empty: function(a) {
				if (e(a).length == 0) {
					alert("木有记录了");
					return false
				}
				M();
				e(a).fadeOut(400, function() {
					e(this).remove();
					l()
				})
			}
		};

		function x(t, l) {
			window.PlayList = a;
			var i = PlayList.getAll();
			if (!i.length) {
				e(t).html('<div class="cookie_null m_yahei">您还未在本站观看影片</div>');
				return
			}
			M1905.loadingAni.remove.call(e(t));
			M1905.loadingAni.addin.call(e(t));
			var s = '<div class="fr mt30"><a class="recycle" id="garbageBin" href="#">清空记录</a></div><div class="cookielist"><ul class="mt15">',
				n, l;
			e.each(i, function(a, e) {
				n = e.lasttime;
				n = (parseInt(n / 3600) >= 1 ? parseInt(n / 3600) + "小时" : "") + (parseInt(n / 60) >= 1 ? parseInt(n / 60 % 60) + "分" : "") + n % 60 + "秒";
				l = "http://www.m1905.com/vod/play/" + e.videoid + ".shtml";
				thumb = e.thumb ? e.thumb.replace(/\/(\d+.(jpg|gif|png))$/, "/thumb_2_142_75_$1") : "http://image11.m1905.cn/uploadfile/nopich.gif";
				s += '<li class="cookie-item"><span class="closeBtn shake-toggle" anim-target="cookie-item" data-delid="' + e.videoid + '">×</span><a class="titile" href="' + l + '" target="_blank" title="' + e.title + '"><img src="' + thumb + '" width="142" height="75"></a><p class="playtitle"><a href="' + l + '">' + e.title + '</a></p><p class="playtime gray_f02">播放至：' + n + '</p><p class="watchBtn"><a href="' + l + '" class="orange_f">继续看</a>      <a href="' + l + '" target="_blank" class="orange_f">重看</a></p></li>'
			});
			s += "</ul></div>";
			M1905.loadingAni.remove.call(e(t));
			e(t).html(s);
			C.init()
		}

		function M() {
			PlayList.clear();
			window.setCookieAll && setCookieAll([])
		}
		e(document).on("click.hidenav", function(a) {
			var t = a.srcElement || a.target;
			if (t.className.indexOf("closeBtn") > -1 || e(t).closest("#guideBar, [act=login]").length > 0) {
				return
			}
			if (e(t).closest(".nav_slide, #site_nav_md").length == 0 || e(t).closest(".slideup").length > 0) {
				l()
			}
			return
		}).on("click", '[data-btns="ChangeCode"], #img_seccode', function() {
			var a = n + "&rand=" + Math.random() * 6;
			codeImg = document.getElementById("img_seccode");
			if (codeImg) {
				codeImg.src = a
			}
			return false
		});
		t.on("show", 'a[data-toggle="tab"]', function(a) {
			var l = e(a.target).attr("href").replace(/.*(?=#[^\s]*$)/, "");
			e(".nav_slide", t).hide();
			e(l).slideDown(300, "easeOutBack");
			if (/viewlog/.test(l)) {
				x(".playlog", "/api/m1905viewlog.php?type=1")
			}
			if (/program/.test(l)) {
				var i = e("#program").children();
				M1905.loadingAni.addin.call(i);
				e.get("/category/968.shtml", function(a) {
					i.html(a);
					M1905.loadingAni.remove.call(i)
				})
			}
		}).one("show", '.login-reg a[data-toggle="tab"]', function() {
			var a = '<img id="img_seccode" src="' + n + '" width="85" height="26" /> 看不清，<a href="javascript:;" data-btns="ChangeCode" class="white_f underline">换一张</a>';
			e(".seccode").append(a)
		})
	}(window.jQuery);
	(function s() {
		var a = M1905.Util.getcookie("mauth");
		if (a != null) {
			$(".menu .login-reg").hide();
			$(".menu .logged").show();
			$(".logged .myusername span").text(unescape(M1905.Util.getcookie("username")))
		} else {
			$(".menu .login-reg").show();
			$(".menu .logged").hide()
		}
	})()
});