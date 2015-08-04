/*
 * Copyright (c) 2011 Nick Taylor (nick@webnick.ca)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * Based on the API provided by the ASP.NET AJAX Sys.StringBuilder class.
 * Home Page: http://nickandtheinternet.com/page/jQuery-StringBuilder-Plugin.aspx
     var builder = new $.StringBuilder();
 */
(function (A) { A.StringBuilder = function () { var C = this; var B = []; this.append = function (D) { B[B.length] = D }; this.appendFormat = function (D) { throw new Exception("Not implemented.") }; this.appendLine = function (D) { C.append(D); C.append("\n") }; this.clear = function () { B = [] }; this.isEmpty = function () { return B.length === 0 }; this.toString = function () { return B.join("") } } })(jQuery);
/* JSON���� toJsonString(obj)  evalJSON(str)*/
jQuery.extend({ evalJSON: function (strJson) { return eval("(" + strJson + ")"); } });
jQuery.extend({ toJSONString: function (object) { var type = typeof object; if ('object' == type) { if (Array == object.constructor) type = 'array'; else if (RegExp == object.constructor) type = 'regexp'; else type = 'object'; } switch (type) { case 'undefined': case 'unknown': return; break; case 'function': case 'boolean': case 'regexp': return object.toString(); break; case 'number': return isFinite(object) ? object.toString() : 'null'; break; case 'string': return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function () { var a = arguments[0]; return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : "" }) + '"'; break; case 'object': if (object === null) return 'null'; var results = []; for (var property in object) { var value = jQuery.toJSONString(object[property]); if (value !== undefined) results.push(jQuery.toJSONString(property) + ':' + value); } return '{' + results.join(',') + '}'; break; case 'array': var results = []; for (var i = 0; i < object.length; i++) { var value = jQuery.toJSONString(object[i]); if (value !== undefined) results.push(value); } return '[' + results.join(',') + ']'; break; } } });
/* cookie����  дcookie   $.cookie('name', 'test',{expires: 7});  ��cookie $.cookie('name');  ��cookie $.cookie('name', null);	*/
jQuery.cookie = function (name, value, options) { if (typeof value != 'undefined') { options = options || {}; if (value === null) { value = ''; options.expires = -1; } var expires = ''; if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) { var date; if (typeof options.expires == 'number') { date = new Date(); date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000)); } else { date = options.expires; } expires = '; expires=' + date.toUTCString(); } var path = options.path ? '; path=' + (options.path) : ''; var domain = options.domain ? '; domain=' + (options.domain) : ''; var secure = options.secure ? '; secure' : ''; document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join(''); } else { var cookieValue = null; if (document.cookie && document.cookie != '') { var cookies = document.cookie.split(';'); for (var i = 0; i < cookies.length; i++) { var cookie = jQuery.trim(cookies[i]); if (cookie.substring(0, name.length + 1) == (name + '=')) { cookieValue = decodeURIComponent(cookie.substring(name.length + 1)); break; } } } return cookieValue; } };
//拖拽
//$.extend($.fn,{getCss:function(key){var v=parseInt(this.css(key));if(isNaN(v))return false;return v;}});$.fn.Drags=function(opts){var ps=$.extend({zIndex:20,opacity:.7,handler:null,onMove:function(){},onDrop:function(){}},opts);var dragndrop={drag:function(e){var dragData=e.data.dragData;dragData.target.css({left:dragData.left+e.pageX-dragData.offLeft,top:dragData.top+e.pageY-dragData.offTop});dragData.handler.css({cursor:'move'});dragData.onMove(e);},drop:function(e){var dragData=e.data.dragData;dragData.target.css(dragData.oldCss);dragData.handler.css('cursor',dragData.oldCss.cursor);dragData.onDrop(e);$().unbind('mousemove',dragndrop.drag).unbind('mouseup',dragndrop.drop);}}return this.each(function(){var me=this;var handler=null;if(typeof ps.handler=='undefined'||ps.handler==null)handler=$(me);else
//handler=(typeof ps.handler=='string'?$(ps.handler,this):ps.handle);handler.bind('mousedown',{e:me},function(s){var target=$(s.data.e);var oldCss={};if(target.css('position')!='absolute'){try{target.position(oldCss);}catch(ex){}target.css('position','absolute');}oldCss.cursor=target.css('cursor')||'default';oldCss.opacity=target.getCss('opacity')||1;var dragData={left:oldCss.left||target.getCss('left')||0,top:oldCss.top||target.getCss('top')||0,width:target.width()||target.getCss('width'),height:target.height()||target.getCss('height'),offLeft:s.pageX,offTop:s.pageY,oldCss:oldCss,onMove:ps.onMove,onDrop:ps.onDrop,handler:handler,target:target}target.css('opacity',ps.opacity);$().bind('mousemove',{dragData:dragData},dragndrop.drag).bind('mouseup',{dragData:dragData},dragndrop.drop);});});}
//分页插件

//(function ($) { $.fn.pager = function (options) { var opts = $.extend({}, $.fn.pager.defaults, options); return this.each(function () { $(this).empty().append(renderpager(parseInt(options.pagenumber), parseInt(options.pagecount), options.buttonClickCallback)); $('.pages li').mouseover(function () { document.body.style.cursor = "pointer"; }).mouseout(function () { document.body.style.cursor = "auto"; }); }); }; function renderpager(pagenumber, pagecount, buttonClickCallback) { var $pager = $('<ul class="pages"></ul>'); $pager.append(renderButton('first', pagenumber, pagecount, buttonClickCallback)).append(renderButton('prev', pagenumber, pagecount, buttonClickCallback)); var startPoint = 1; var endPoint = 9; if (pagenumber > 4) { startPoint = pagenumber - 4; endPoint = pagenumber + 4; } if (endPoint > pagecount) { startPoint = pagecount - 8; endPoint = pagecount; } if (startPoint < 1) { startPoint = 1; } for (var page = startPoint; page <= endPoint; page++) { var currentButton = $('<li class="page-number">' + (page) + '</li>'); page == pagenumber ? currentButton.addClass('pgCurrent') : currentButton.click(function () { buttonClickCallback(this.firstChild.data); }); currentButton.appendTo($pager); } $pager.append(renderButton('next', pagenumber, pagecount, buttonClickCallback)).append(renderButton('last', pagenumber, pagecount, buttonClickCallback)); return $pager; } function renderButton(buttonLabel, pagenumber, pagecount, buttonClickCallback) { var destPage = 1; var _lableName = ""; switch (buttonLabel) { case "first": destPage = 1; _lableName = "首页"; break; case "prev": destPage = pagenumber - 1; _lableName = "上一页"; break; case "next": destPage = pagenumber + 1; _lableName = "下一页"; break; case "last": destPage = pagecount; _lableName = "尾页"; break; } var $Button = $('<li class="pgNext">' + _lableName + '</li>'); if (buttonLabel == "first" || buttonLabel == "prev") { pagenumber <= 1 ? $Button.addClass('pgEmpty') : $Button.click(function () { buttonClickCallback(destPage); }); } else { pagenumber >= pagecount ? $Button.addClass('pgEmpty') : $Button.click(function () { buttonClickCallback(destPage); }); } return $Button; } $.fn.pager.defaults = { pagenumber: 1, pagecount: 1 }; })(jQuery);

//eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(a($){$.B.5=a(k){e T=$.U({},$.B.5.G,k);j h.S(a(){e 0=k.0;e 2=k.2;$(h).W().d(O(z(0),z(2),k.3));n(0==1){$(h).g(".s,.w").E("q")}F{$(h).g(".s,.w").m("q")}n(0==2){$(h).g(".v,.u").E("q")}F{$(h).g(".v,.u").m("q")}})};a O(0,2,3){e $5=$(\'<L i="R"></L>\');$5.d(c(\'Q\',0,2,3));$5.d(c(\'I\',0,2,3));$5.d(c(\'r\',0,2,3)).d(c(\'t\',0,2,3));$5.d(c(\'A\',0,2,3)).d(c(\'C\',0,2,3));$5.d(c(\'f\',0,2,3));j $5}a c(x,0,2,3){e 7=1;e 6="";K(x){4"r":{7=1;6="<b i=\'s\'>首页</b>";8}4"t":{7=0-1;6="<b i=\'w\'>上一页</b>";8}4"A":{7=0+1;6="<b i=\'v\'>下一页</b>";8}4"C":{7=2;6="<b i=\'u\'>尾页</b>";8}4"f":{7=0;6="<f o=\'D\' H=\'"+7+"\' X=\'16:17; 13:12 Y #Z\'>&l;<f o=\'P\' H=\'转到\' />";8}4"Q":{6="总共&l;"+2+"&l;页";8}4"I":{6="当前&l;"+0+"&l;页"}}e $9=$(\'<J i="10">\'+6+\'</J>\');K(x){4"r":4"t":{0<=1?$9.m(\'M\'):$9.y(a(){3(7)});8}4"A":4"C":{0>=2?$9.m(\'M\'):$9.y(a(){3(7)});8}4"f":{$9.g("f[o=\'P\']").y(a(){e p=$9.g("f[o=\'D\']").14();n($.15(p)==""){N("请输入页面码?");j}n(!z(p)){N("请输入正整数");j}p=(p>=1?(p<=2?p:2):1);3(p)})8}V:{}}j $9}$.B.5.G={0:1,2:1}})(11);',62,70,'pagenumber||pagecount|buttonClickCallback|case|pager|_lableName|destPage|break|Button|function|span|renderButton|append|var|input|find|this|class|return|options|nbsp|addClass|if|type||hand|first|firstPage|prev|lastPage|nextPage|prevPage|buttonLabel|click|parseInt|next|fn|last|text|removeClass|else|defaults|value|currpage|li|switch|ul|pgEmpty|alert|renderpager|button|allcount|pages|each|opts|extend|default|empty|style|1px|cccccc|pgNext|jQuery|solid|border|val|trim|width|30px'.split('|'),0,{}))
//(function($){$.fn.pager=function(options){var opts=$.extend({},$.fn.pager.defaults,options);return this.each(function(){var pagenumber=options.pagenumber;var pagecount=options.pagecount;$(this).empty().append(renderpager(parseInt(pagenumber),parseInt(pagecount),options.buttonClickCallback));if(pagenumber==1){$(this).find(".firstPage,.prevPage").removeClass("hand")}else{$(this).find(".firstPage,.prevPage").addClass("hand")}if(pagenumber==pagecount){$(this).find(".nextPage,.lastPage").removeClass("hand")}else{$(this).find(".nextPage,.lastPage").addClass("hand")}})};function renderpager(pagenumber,pagecount,buttonClickCallback){var $pager=$('<ul class="pages"></ul>');$pager.append(renderButton('allcount',pagenumber,pagecount,buttonClickCallback));$pager.append(renderButton('currpage',pagenumber,pagecount,buttonClickCallback));$pager.append(renderButton('first',pagenumber,pagecount,buttonClickCallback)).append(renderButton('prev',pagenumber,pagecount,buttonClickCallback));$pager.append(renderButton('next',pagenumber,pagecount,buttonClickCallback)).append(renderButton('last',pagenumber,pagecount,buttonClickCallback));$pager.append(renderButton('input',pagenumber,pagecount,buttonClickCallback));return $pager}function renderButton(buttonLabel,pagenumber,pagecount,buttonClickCallback){var destPage=1;var _lableName="";switch(buttonLabel){case"first":{destPage=1;_lableName="<span class='firstPage'>首页</span>";break}case"prev":{destPage=pagenumber-1;_lableName="<span class='prevPage'>上一页</span>";break}case"next":{destPage=pagenumber+1;_lableName="<span class='nextPage'>下一页</span>";break}case"last":{destPage=pagecount;_lableName="<span class='lastPage'>尾页</span>";break}case"input":{destPage=pagenumber;_lableName="<input type='text' value='"+destPage+"' style='width:30px; border:solid 1px #cccccc'>&nbsp;<input type='button' value='转到' />";break}case"allcount":{_lableName="总共&nbsp;"+pagecount+"&nbsp;页";break}case"currpage":{_lableName="当前&nbsp;"+pagenumber+"&nbsp;页"}}var $Button=$('<li class="pgNext">'+_lableName+'</li>');switch(buttonLabel){case"first":case"prev":{pagenumber<=1?$Button.addClass('pgEmpty'):$Button.click(function(){buttonClickCallback(destPage)});break}case"next":case"last":{pagenumber>=pagecount?$Button.addClass('pgEmpty'):$Button.click(function(){buttonClickCallback(destPage)});break}case"input":{$Button.find("input[type='button']").click(function(){var p=$Button.find("input[type='text']").val();if($.trim(p)==""){alert("请输入页面码?");return}if(!parseInt(p)){alert("请输入正整数");return}p=(p>=1?(p<=pagecount?p:pagecount):1);buttonClickCallback(p)})break}default:{}}return $Button}$.fn.pager.defaults={pagenumber:1,pagecount:1}})(jQuery);
(function ($) {
    $.fn.pager = function (options) {
        var opts = $.extend({}, $.fn.pager.defaults, options);
        return this.each(function () {
            var pagenumber = options.pagenumber;
            var pagecount = options.pagecount;
            $(this).empty().append(renderpager(parseInt(pagenumber), parseInt(pagecount), options.buttonClickCallback));


            if (pagenumber == 1) {
                $(this).find(".first").removeClass("hand");
            }
            else {
                $(this).find(".first").addClass("hand");
            }

            if (pagenumber == pagecount) {
                $(this).find(".last").removeClass("hand");
            }
            else {
                $(this).find(".last").addClass("hand");
            }
        })
    };
    function renderpager(pagenumber, pagecount, buttonClickCallback) {
        var $pager = $('<ul class="pages"></ul>');
        $pager.append(renderButton('allcount', pagenumber, pagecount, buttonClickCallback));
        $pager.append(renderButton('currpage', pagenumber, pagecount, buttonClickCallback));

        $pager.append(renderButton('first', pagenumber, pagecount, buttonClickCallback)).append(renderButton('prev', pagenumber, pagecount, buttonClickCallback));
        $pager.append(renderButton('next', pagenumber, pagecount, buttonClickCallback)).append(renderButton('last', pagenumber, pagecount, buttonClickCallback));
        $pager.append(renderButton('input', pagenumber, pagecount, buttonClickCallback));


        return $pager
    }
    function renderButton(buttonLabel, pagenumber, pagecount, buttonClickCallback) {
        var destPage = 1;
        var _lableName = "";
        switch (buttonLabel) {
            case "first":
                {
                    destPage = 1;
                    _lableName = "首&nbsp;&nbsp;页";
                    break
                }
            case "prev":
                {
                    destPage = pagenumber - 1;
                    _lableName = "上一页";
                    break
                }
            case "next":
                {
                    destPage = pagenumber + 1;
                    _lableName = "下一页";
                    break
                }
            case "last":
                {
                    destPage = pagecount;
                    _lableName = "尾&nbsp;&nbsp;页";
                    break
                }
            case "input":
                {
                    destPage = pagenumber;
                    _lableName = "<input type='text' value='" + destPage + "' style='width:30px; border:solid 1px #cccccc;text-align:center'>&nbsp;<input type='button' value='转到' />";
                    break
                }
            case "allcount":
                {
                    _lableName = "总共&nbsp;" + pagecount + "&nbsp;页";
                    break;
                }
            case "currpage":
                {
                    _lableName = "当前&nbsp;" + pagenumber + "&nbsp;页";
                }
        }
        var $Button;

        switch (buttonLabel) {
            case "first":
            case "prev":
                {
                    $Button = $('<li class="first">' + _lableName + '</li>');
                    pagenumber <= 1 ? $Button.addClass('pgEmpty') : $Button.click(function () {
                        buttonClickCallback(destPage)
                    });
                    break;
                }
            case "next":
            case "last":
                {
                    $Button = $('<li class="last">' + _lableName + '</li>');
                    pagenumber >= pagecount ? $Button.addClass('pgEmpty') : $Button.click(function () {
                        buttonClickCallback(destPage)
                    });
                    break;
                }
            case "input":
                {
                    $Button = $("<li class='pgNext' style='border:none'>" + _lableName + '</li>');
                    $Button.find("input[type='button']").click(function () {
                        var p = $Button.find("input[type='text']").val();
                        if ($.trim(p) == "") {
                            alert("请输入页面码?");
                            return
                        }
                        if (!parseInt(p)) {
                            alert("请输入正整数");
                            return
                        }
                        p = (p >= 1 ? (p <= pagecount ? p : pagecount) : 1);
                        buttonClickCallback(p)
                    })
                    break;
                }
            default:
                {
                    $Button = $("<li class='pgNext' style='border:none'>" + _lableName + '</li>');
                }
        }

        return $Button
    }
    /*
    function renderButton(buttonLabel, pagenumber, pagecount, buttonClickCallback) {
        var destPage = 1;
        var _lableName = "";
        switch (buttonLabel) {
            case "first":
                {
                    destPage = 1;
                    _lableName = "<span class='firstPage'>首页</span>";
                    break
                }
            case "prev":
                {
                    destPage = pagenumber - 1;
                    _lableName = "<span class='prevPage'>上一页</span>";
                    break
                }
            case "next":
                {
                    destPage = pagenumber + 1;
                    _lableName = "<span class='nextPage'>下一页</span>";
                    break
                }
            case "last":
                {
                    destPage = pagecount;
                    _lableName = "<span class='lastPage'>尾页</span>";
                    break
                }
            case "input":
                {
                    destPage = pagenumber;
                    _lableName = "<input type='text' value='" + destPage + "' style='width:30px; border:solid 1px #cccccc;text-align:center'>&nbsp;<input type='button' value='转到' />";
                    break
                }
            case "allcount":
                {
                    _lableName = "总共&nbsp;" + pagecount + "&nbsp;页";
                    break;
                }
            case "currpage":
                {
                    _lableName = "当前&nbsp;" + pagenumber + "&nbsp;页";
                }
        }
        var $Button;

        switch (buttonLabel) {
            case "first":
            case "prev":
                {
                    $Button = $('<li class="pgNext">' + _lableName + '</li>');
                    pagenumber <= 1 ? $Button.addClass('pgEmpty') : $Button.click(function () {
                        buttonClickCallback(destPage)
                    });
                    break;
                }
            case "next":
            case "last":
                {
                    $Button = $('<li class="pgNext">' + _lableName + '</li>');
                    pagenumber >= pagecount ? $Button.addClass('pgEmpty') : $Button.click(function () {
                        buttonClickCallback(destPage)
                    });
                    break;
                }
            case "input":
                {
                    $Button = $("<li class='pgNext' style='border:none'>" + _lableName + '</li>');
                    $Button.find("input[type='button']").click(function () {
                        var p = $Button.find("input[type='text']").val();
                        if ($.trim(p) == "") {
                            alert("请输入页面码?");
                            return
                        }
                        if (!parseInt(p)) {
                            alert("请输入正整数");
                            return
                        }
                        p = (p >= 1 ? (p <= pagecount ? p : pagecount) : 1);
                        buttonClickCallback(p)
                    })
                    break;
                }
            default:
                {
                    $Button = $("<li class='pgNext' style='border:none'>" + _lableName + '</li>');
                }
        }

        return $Button
    }
    */
    
    
    
    
    $.fn.pager.defaults = {
        pagenumber: 1,
        pagecount: 1
    }
})(jQuery);





//加入首页和收藏
var HomepageFavorite = { Homepage: function () { if (document.all) { document.body.style.behavior = 'url(#default#homepage)'; document.body.setHomePage(window.location.href); } else if (window.sidebar) { if (window.netscape) { try { netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); } catch (e) { alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true"); } } var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch); prefs.setCharPref('browser.startup.homepage', window.location.href); } }, Favorite: function Favorite(sURL, sTitle) { try { window.external.addFavorite(sURL, sTitle); } catch (e) { try { window.sidebar.addPanel(sTitle, sURL, ""); } catch (e) { alert("加入收藏失败,请手动添加."); } } } }
//接收参数
new function (settings) {
    var $separator = settings.separator || '&'; var $spaces = settings.spaces === false ? false : true; var $suffix = settings.suffix === false ? '' : '[]'; var $prefix = settings.prefix === false ? false : true; var $hash = $prefix ? settings.hash === true ? "#" : "?" : ""; var $numbers = settings.numbers === false ? false : true; jQuery.query = new function () {
        var is = function (o, t) { return o != undefined && o !== null && (!!t ? o.constructor == t : true); }; var parse = function (path) { var m, rx = /\[([^[]*)\]/g, match = /^([^[]+)(\[.*\])?$/.exec(path), base = match[1], tokens = []; while (m = rx.exec(match[2])) tokens.push(m[1]); return [base, tokens]; }; var set = function (target, tokens, value) { var o, token = tokens.shift(); if (typeof target != 'object') target = null; if (token === "") { if (!target) target = []; if (is(target, Array)) { target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value)); } else if (is(target, Object)) { var i = 0; while (target[i++] != null); target[--i] = tokens.length == 0 ? value : set(target[i], tokens.slice(0), value); } else { target = []; target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value)); } } else if (token && token.match(/^\s*[0-9]+\s*$/)) { var index = parseInt(token, 10); if (!target) target = []; target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value); } else if (token) { var index = token.replace(/^\s*|\s*$/g, ""); if (!target) target = {}; if (is(target, Array)) { var temp = {}; for (var i = 0; i < target.length; ++i) { temp[i] = target[i]; } target = temp; } target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value); } else { return value; } return target; }; var queryObject = function (a) { var self = this; self.keys = {}; if (a.queryObject) { jQuery.each(a.get(), function (key, val) { self.SET(key, val); }); } else { jQuery.each(arguments, function () { var q = "" + this; q = q.replace(/^[?#]/, ''); q = q.replace(/[;&]$/, ''); if ($spaces) q = q.replace(/[+]/g, ' '); jQuery.each(q.split(/[&;]/), function () { var key = decodeURIComponent(this.split('=')[0] || ""); var val = decodeURIComponent(this.split('=')[1] || ""); if (!key) return; if ($numbers) { if (/^[+-]?[0-9]+\.[0-9]*$/.test(val)) val = parseFloat(val); else if (/^[+-]?[0-9]+$/.test(val)) val = parseInt(val, 10); } val = (!val && val !== 0) ? true : val; if (val !== false && val !== true && typeof val != 'number') val = val; self.SET(key, val); }); }); } return self; }; queryObject.prototype = { queryObject: true, has: function (key, type) { var value = this.get(key); return is(value, type); }, GET: function (key) { if (!is(key)) return this.keys; var parsed = parse(key), base = parsed[0], tokens = parsed[1]; var target = this.keys[base]; while (target != null && tokens.length != 0) { target = target[tokens.shift()]; } return typeof target == 'number' ? String(target) : target || ""; }, get: function (key) { var target = this.GET(key); if (is(target, Object)) return jQuery.extend(true, {}, target); else if (is(target, Array)) return target.slice(0); return target; }, SET: function (key, val) { var value = !is(val) ? null : val; var parsed = parse(key), base = parsed[0], tokens = parsed[1]; var target = this.keys[base]; this.keys[base] = set(target, tokens.slice(0), value); return this; }, set: function (key, val) { return this.copy().SET(key, val); }, REMOVE: function (key) { return this.SET(key, null).COMPACT(); }, remove: function (key) { return this.copy().REMOVE(key); }, EMPTY: function () { var self = this; jQuery.each(self.keys, function (key, value) { delete self.keys[key]; }); return self; }, load: function (url) { var hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1"); var search = url.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1"); return new queryObject(url.length == search.length ? '' : search, url.length == hash.length ? '' : hash); }, empty: function () { return this.copy().EMPTY(); }, copy: function () { return new queryObject(this); }, COMPACT: function () {
            function build(orig) {
                var obj = typeof orig == "object" ? is(orig, Array) ? [] : {} : orig; if (typeof orig == 'object') {
                    function add(o, key, value) {
                        if (is(o, Array)) o.push(value); else
                            o[key] = value;
                    } jQuery.each(orig, function (key, value) { if (!is(value)) return true; add(obj, key, build(value)); });
                } return obj;
            } this.keys = build(this.keys); return this;
        }, compact: function () { return this.copy().COMPACT(); }, toString: function () {
            var i = 0, queryString = [], chunks = [], self = this; var encode = function (str) { str = str + ""; if ($spaces) str = str.replace(/ /g, "+"); return encodeURIComponent(str); }; var addFields = function (arr, key, value) { if (!is(value) || value === false) return; var o = [encode(key)]; if (value !== true) { o.push("="); o.push(encode(value)); } arr.push(o.join("")); }; var build = function (obj, base) {
                var newKey = function (key) { return !base || base == "" ? [key].join("") : [base, "[", key, "]"].join(""); }; jQuery.each(obj, function (key, value) {
                    if (typeof value == 'object') build(value, newKey(key)); else
                        addFields(chunks, newKey(key), value);
                });
            }; build(this.keys); if (chunks.length > 0) queryString.push($hash); queryString.push(chunks.join($separator)); return queryString.join("");
        } 
        }; return new queryObject(location.search, location.hash);
    };
} (jQuery.query || {});
//解决IE 6下 png 问题
/**
* DD_belatedPNG: Adds IE6 support: PNG images for CSS background-image and HTML <IMG/>.
* Author: Drew Diller
* Email: drew.diller@gmail.com
* URL: http://www.dillerdesign.com/experiment/DD_belatedPNG/
* Version: 0.0.8a
* Licensed under the MIT License: http://dillerdesign.com/experiment/DD_belatedPNG/#license
*
* Example usage:
* DD_belatedPNG.fix('.png_bg'); // argument is a CSS selector
* DD_belatedPNG.fixPng( someNode ); // argument is an HTMLDomElement
**/
if ($.browser.msie && $.browser.version == '8.0') {
} else {
    //var DD_belatedPNG = { ns: "DD_belatedPNG", imgSize: {}, delay: 10, nodesFixed: 0, createVmlNameSpace: function () { if (document.namespaces && !document.namespaces[this.ns]) { document.namespaces.add(this.ns, "urn:schemas-microsoft-com:vml") } }, createVmlStyleSheet: function () { var b, a; b = document.createElement("style"); b.setAttribute("media", "screen"); document.documentElement.firstChild.insertBefore(b, document.documentElement.firstChild.firstChild); if (b.styleSheet) { b = b.styleSheet; b.addRule(this.ns + "\\:*", "{behavior:url(#default#VML)}"); b.addRule(this.ns + "\\:shape", "position:absolute;"); b.addRule("img." + this.ns + "_sizeFinder", "behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;"); this.screenStyleSheet = b; a = document.createElement("style"); a.setAttribute("media", "print"); document.documentElement.firstChild.insertBefore(a, document.documentElement.firstChild.firstChild); a = a.styleSheet; a.addRule(this.ns + "\\:*", "{display: none !important;}"); a.addRule("img." + this.ns + "_sizeFinder", "{display: none !important;}") } }, readPropertyChange: function () { var b, c, a; b = event.srcElement; if (!b.vmlInitiated) { return } if (event.propertyName.search("background") != -1 || event.propertyName.search("border") != -1) { DD_belatedPNG.applyVML(b) } if (event.propertyName == "style.display") { c = (b.currentStyle.display == "none") ? "none" : "block"; for (a in b.vml) { if (b.vml.hasOwnProperty(a)) { b.vml[a].shape.style.display = c } } } if (event.propertyName.search("filter") != -1) { DD_belatedPNG.vmlOpacity(b) } }, vmlOpacity: function (b) { if (b.currentStyle.filter.search("lpha") != -1) { var a = b.currentStyle.filter; a = parseInt(a.substring(a.lastIndexOf("=") + 1, a.lastIndexOf(")")), 10) / 100; b.vml.color.shape.style.filter = b.currentStyle.filter; b.vml.image.fill.opacity = a } }, handlePseudoHover: function (a) { setTimeout(function () { DD_belatedPNG.applyVML(a) }, 1) }, fix: function (a) { if (this.screenStyleSheet) { var c, b; c = a.split(","); for (b = 0; b < c.length; b++) { this.screenStyleSheet.addRule(c[b], "behavior:expression(DD_belatedPNG.fixPng(this))") } } }, applyVML: function (a) { a.runtimeStyle.cssText = ""; this.vmlFill(a); this.vmlOffsets(a); this.vmlOpacity(a); if (a.isImg) { this.copyImageBorders(a) } }, attachHandlers: function (i) { var d, c, g, e, b, f; d = this; c = { resize: "vmlOffsets", move: "vmlOffsets" }; if (i.nodeName == "A") { e = { mouseleave: "handlePseudoHover", mouseenter: "handlePseudoHover", focus: "handlePseudoHover", blur: "handlePseudoHover" }; for (b in e) { if (e.hasOwnProperty(b)) { c[b] = e[b] } } } for (f in c) { if (c.hasOwnProperty(f)) { g = function () { d[c[f]](i) }; i.attachEvent("on" + f, g) } } i.attachEvent("onpropertychange", this.readPropertyChange) }, giveLayout: function (a) { a.style.zoom = 1; if (a.currentStyle.position == "static") { a.style.position = "relative" } }, copyImageBorders: function (b) { var c, a; c = { borderStyle: true, borderWidth: true, borderColor: true }; for (a in c) { if (c.hasOwnProperty(a)) { b.vml.color.shape.style[a] = b.currentStyle[a] } } }, vmlFill: function (e) { if (!e.currentStyle) { return } else { var d, f, g, b, a, c; d = e.currentStyle } for (b in e.vml) { if (e.vml.hasOwnProperty(b)) { e.vml[b].shape.style.zIndex = d.zIndex } } e.runtimeStyle.backgroundColor = ""; e.runtimeStyle.backgroundImage = ""; f = true; if (d.backgroundImage != "none" || e.isImg) { if (!e.isImg) { e.vmlBg = d.backgroundImage; e.vmlBg = e.vmlBg.substr(5, e.vmlBg.lastIndexOf('")') - 5) } else { e.vmlBg = e.src } g = this; if (!g.imgSize[e.vmlBg]) { a = document.createElement("img"); g.imgSize[e.vmlBg] = a; a.className = g.ns + "_sizeFinder"; a.runtimeStyle.cssText = "behavior:none; position:absolute; left:-10000px; top:-10000px; border:none; margin:0; padding:0;"; c = function () { this.width = this.offsetWidth; this.height = this.offsetHeight; g.vmlOffsets(e) }; a.attachEvent("onload", c); a.src = e.vmlBg; a.removeAttribute("width"); a.removeAttribute("height"); document.body.insertBefore(a, document.body.firstChild) } e.vml.image.fill.src = e.vmlBg; f = false } e.vml.image.fill.on = !f; e.vml.image.fill.color = "none"; e.vml.color.shape.style.backgroundColor = d.backgroundColor; e.runtimeStyle.backgroundImage = "none"; e.runtimeStyle.backgroundColor = "transparent" }, vmlOffsets: function (d) { var h, n, a, e, g, m, f, l, j, i, k; h = d.currentStyle; n = { W: d.clientWidth + 1, H: d.clientHeight + 1, w: this.imgSize[d.vmlBg].width, h: this.imgSize[d.vmlBg].height, L: d.offsetLeft, T: d.offsetTop, bLW: d.clientLeft, bTW: d.clientTop }; a = (n.L + n.bLW == 1) ? 1 : 0; e = function (b, p, q, c, s, u) { b.coordsize = c + "," + s; b.coordorigin = u + "," + u; b.path = "m0,0l" + c + ",0l" + c + "," + s + "l0," + s + " xe"; b.style.width = c + "px"; b.style.height = s + "px"; b.style.left = p + "px"; b.style.top = q + "px" }; e(d.vml.color.shape, (n.L + (d.isImg ? 0 : n.bLW)), (n.T + (d.isImg ? 0 : n.bTW)), (n.W - 1), (n.H - 1), 0); e(d.vml.image.shape, (n.L + n.bLW), (n.T + n.bTW), (n.W), (n.H), 1); g = { X: 0, Y: 0 }; if (d.isImg) { g.X = parseInt(h.paddingLeft, 10) + 1; g.Y = parseInt(h.paddingTop, 10) + 1 } else { for (j in g) { if (g.hasOwnProperty(j)) { this.figurePercentage(g, n, j, h["backgroundPosition" + j]) } } } d.vml.image.fill.position = (g.X / n.W) + "," + (g.Y / n.H); m = h.backgroundRepeat; f = { T: 1, R: n.W + a, B: n.H, L: 1 + a }; l = { X: { b1: "L", b2: "R", d: "W" }, Y: { b1: "T", b2: "B", d: "H"} }; if (m != "repeat" || d.isImg) { i = { T: (g.Y), R: (g.X + n.w), B: (g.Y + n.h), L: (g.X) }; if (m.search("repeat-") != -1) { k = m.split("repeat-")[1].toUpperCase(); i[l[k].b1] = 1; i[l[k].b2] = n[l[k].d] } if (i.B > n.H) { i.B = n.H } d.vml.image.shape.style.clip = "rect(" + i.T + "px " + (i.R + a) + "px " + i.B + "px " + (i.L + a) + "px)" } else { d.vml.image.shape.style.clip = "rect(" + f.T + "px " + f.R + "px " + f.B + "px " + f.L + "px)" } }, figurePercentage: function (d, c, f, a) { var b, e; e = true; b = (f == "X"); switch (a) { case "left": case "top": d[f] = 0; break; case "center": d[f] = 0.5; break; case "right": case "bottom": d[f] = 1; break; default: if (a.search("%") != -1) { d[f] = parseInt(a, 10) / 100 } else { e = false } } d[f] = Math.ceil(e ? ((c[b ? "W" : "H"] * d[f]) - (c[b ? "w" : "h"] * d[f])) : parseInt(a, 10)); if (d[f] % 2 === 0) { d[f]++ } return d[f] }, fixPng: function (c) { c.style.behavior = "none"; var g, b, f, a, d; if (c.nodeName == "BODY" || c.nodeName == "TD" || c.nodeName == "TR") { return } c.isImg = false; if (c.nodeName == "IMG") { if (c.src.toLowerCase().search(/\.png$/) != -1) { c.isImg = true; c.style.visibility = "hidden" } else { return } } else { if (c.currentStyle.backgroundImage.toLowerCase().search(".png") == -1) { return } } g = DD_belatedPNG; c.vml = { color: {}, image: {} }; b = { shape: {}, fill: {} }; for (a in c.vml) { if (c.vml.hasOwnProperty(a)) { for (d in b) { if (b.hasOwnProperty(d)) { f = g.ns + ":" + d; c.vml[a][d] = document.createElement(f) } } c.vml[a].shape.stroked = false; c.vml[a].shape.appendChild(c.vml[a].fill); c.parentNode.insertBefore(c.vml[a].shape, c) } } c.vml.image.shape.fillcolor = "none"; c.vml.image.fill.type = "tile"; c.vml.color.fill.on = false; g.attachHandlers(c); g.giveLayout(c); g.giveLayout(c.offsetParent); c.vmlInitiated = true; g.applyVML(c) } }; try { document.execCommand("BackgroundImageCache", false, true) } catch (r) { } DD_belatedPNG.createVmlNameSpace(); DD_belatedPNG.createVmlStyleSheet(); DD_belatedPNG.fix('.pngFix');
}
//倒计时
/* http://keith-wood.name/countdown.html
Countdown for jQuery v1.5.9.
Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
Please attribute the author if you use it. */
(function ($) { function Countdown() { this.regional = []; this.regional[''] = { labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'], labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'], compactLabels: ['y', 'm', 'w', 'd'], whichLabels: null, timeSeparator: ':', isRTL: false }; this._defaults = { until: null, since: null, timezone: null, serverSync: null, format: 'dHMS', layout: '', compact: false, significant: 0, description: '', expiryUrl: '', expiryText: '', alwaysExpire: false, onExpiry: null, onTick: null, tickInterval: 1 }; $.extend(this._defaults, this.regional['']); this._serverSyncs = [] } var w = 'countdown'; var Y = 0; var O = 1; var W = 2; var D = 3; var H = 4; var M = 5; var S = 6; $.extend(Countdown.prototype, { markerClassName: 'hasCountdown', _timer: setInterval(function () { $.countdown._updateTargets() }, 980), _timerTargets: [], setDefaults: function (a) { this._resetExtraLabels(this._defaults, a); extendRemove(this._defaults, a || {}) }, UTCDate: function (a, b, c, e, f, g, h, i) { if (typeof b == 'object' && b.constructor == Date) { i = b.getMilliseconds(); h = b.getSeconds(); g = b.getMinutes(); f = b.getHours(); e = b.getDate(); c = b.getMonth(); b = b.getFullYear() } var d = new Date(); d.setUTCFullYear(b); d.setUTCDate(1); d.setUTCMonth(c || 0); d.setUTCDate(e || 1); d.setUTCHours(f || 0); d.setUTCMinutes((g || 0) - (Math.abs(a) < 30 ? a * 60 : a)); d.setUTCSeconds(h || 0); d.setUTCMilliseconds(i || 0); return d }, periodsToSeconds: function (a) { return a[0] * 31557600 + a[1] * 2629800 + a[2] * 604800 + a[3] * 86400 + a[4] * 3600 + a[5] * 60 + a[6] }, _settingsCountdown: function (a, b) { if (!b) { return $.countdown._defaults } var c = $.data(a, w); return (b == 'all' ? c.options : c.options[b]) }, _attachCountdown: function (a, b) { var c = $(a); if (c.hasClass(this.markerClassName)) { return } c.addClass(this.markerClassName); var d = { options: $.extend({}, b), _periods: [0, 0, 0, 0, 0, 0, 0] }; $.data(a, w, d); this._changeCountdown(a) }, _addTarget: function (a) { if (!this._hasTarget(a)) { this._timerTargets.push(a) } }, _hasTarget: function (a) { return ($.inArray(a, this._timerTargets) > -1) }, _removeTarget: function (b) { this._timerTargets = $.map(this._timerTargets, function (a) { return (a == b ? null : a) }) }, _updateTargets: function () { for (var i = this._timerTargets.length - 1; i >= 0; i--) { this._updateCountdown(this._timerTargets[i]) } }, _updateCountdown: function (a, b) { var c = $(a); b = b || $.data(a, w); if (!b) { return } c.html(this._generateHTML(b)); c[(this._get(b, 'isRTL') ? 'add' : 'remove') + 'Class']('countdown_rtl'); var d = this._get(b, 'onTick'); if (d) { var e = b._hold != 'lap' ? b._periods : this._calculatePeriods(b, b._show, this._get(b, 'significant'), new Date()); var f = this._get(b, 'tickInterval'); if (f == 1 || this.periodsToSeconds(e) % f == 0) { d.apply(a, [e]) } } var g = b._hold != 'pause' && (b._since ? b._now.getTime() < b._since.getTime() : b._now.getTime() >= b._until.getTime()); if (g && !b._expiring) { b._expiring = true; if (this._hasTarget(a) || this._get(b, 'alwaysExpire')) { this._removeTarget(a); var h = this._get(b, 'onExpiry'); if (h) { h.apply(a, []) } var i = this._get(b, 'expiryText'); if (i) { var j = this._get(b, 'layout'); b.options.layout = i; this._updateCountdown(a, b); b.options.layout = j } var k = this._get(b, 'expiryUrl'); if (k) { window.location = k } } b._expiring = false } else if (b._hold == 'pause') { this._removeTarget(a) } $.data(a, w, b) }, _changeCountdown: function (a, b, c) { b = b || {}; if (typeof b == 'string') { var d = b; b = {}; b[d] = c } var e = $.data(a, w); if (e) { this._resetExtraLabels(e.options, b); extendRemove(e.options, b); this._adjustSettings(a, e); $.data(a, w, e); var f = new Date(); if ((e._since && e._since < f) || (e._until && e._until > f)) { this._addTarget(a) } this._updateCountdown(a, e) } }, _resetExtraLabels: function (a, b) { var c = false; for (var n in b) { if (n != 'whichLabels' && n.match(/[Ll]abels/)) { c = true; break } } if (c) { for (var n in a) { if (n.match(/[Ll]abels[0-9]/)) { a[n] = null } } } }, _adjustSettings: function (a, b) { var c; var d = this._get(b, 'serverSync'); var e = 0; var f = null; for (var i = 0; i < this._serverSyncs.length; i++) { if (this._serverSyncs[i][0] == d) { f = this._serverSyncs[i][1]; break } } if (f != null) { e = (d ? f : 0); c = new Date() } else { var g = (d ? d.apply(a, []) : null); c = new Date(); e = (g ? c.getTime() - g.getTime() : 0); this._serverSyncs.push([d, e]) } var h = this._get(b, 'timezone'); h = (h == null ? -c.getTimezoneOffset() : h); b._since = this._get(b, 'since'); if (b._since != null) { b._since = this.UTCDate(h, this._determineTime(b._since, null)); if (b._since && e) { b._since.setMilliseconds(b._since.getMilliseconds() + e) } } b._until = this.UTCDate(h, this._determineTime(this._get(b, 'until'), c)); if (e) { b._until.setMilliseconds(b._until.getMilliseconds() + e) } b._show = this._determineShow(b) }, _destroyCountdown: function (a) { var b = $(a); if (!b.hasClass(this.markerClassName)) { return } this._removeTarget(a); b.removeClass(this.markerClassName).empty(); $.removeData(a, w) }, _pauseCountdown: function (a) { this._hold(a, 'pause') }, _lapCountdown: function (a) { this._hold(a, 'lap') }, _resumeCountdown: function (a) { this._hold(a, null) }, _hold: function (a, b) { var c = $.data(a, w); if (c) { if (c._hold == 'pause' && !b) { c._periods = c._savePeriods; var d = (c._since ? '-' : '+'); c[c._since ? '_since' : '_until'] = this._determineTime(d + c._periods[0] + 'y' + d + c._periods[1] + 'o' + d + c._periods[2] + 'w' + d + c._periods[3] + 'd' + d + c._periods[4] + 'h' + d + c._periods[5] + 'm' + d + c._periods[6] + 's'); this._addTarget(a) } c._hold = b; c._savePeriods = (b == 'pause' ? c._periods : null); $.data(a, w, c); this._updateCountdown(a, c) } }, _getTimesCountdown: function (a) { var b = $.data(a, w); return (!b ? null : (!b._hold ? b._periods : this._calculatePeriods(b, b._show, this._get(b, 'significant'), new Date()))) }, _get: function (a, b) { return (a.options[b] != null ? a.options[b] : $.countdown._defaults[b]) }, _determineTime: function (k, l) { var m = function (a) { var b = new Date(); b.setTime(b.getTime() + a * 1000); return b }; var n = function (a) { a = a.toLowerCase(); var b = new Date(); var c = b.getFullYear(); var d = b.getMonth(); var e = b.getDate(); var f = b.getHours(); var g = b.getMinutes(); var h = b.getSeconds(); var i = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g; var j = i.exec(a); while (j) { switch (j[2] || 's') { case 's': h += parseInt(j[1], 10); break; case 'm': g += parseInt(j[1], 10); break; case 'h': f += parseInt(j[1], 10); break; case 'd': e += parseInt(j[1], 10); break; case 'w': e += parseInt(j[1], 10) * 7; break; case 'o': d += parseInt(j[1], 10); e = Math.min(e, $.countdown._getDaysInMonth(c, d)); break; case 'y': c += parseInt(j[1], 10); e = Math.min(e, $.countdown._getDaysInMonth(c, d)); break } j = i.exec(a) } return new Date(c, d, e, f, g, h, 0) }; var o = (k == null ? l : (typeof k == 'string' ? n(k) : (typeof k == 'number' ? m(k) : k))); if (o) o.setMilliseconds(0); return o }, _getDaysInMonth: function (a, b) { return 32 - new Date(a, b, 32).getDate() }, _normalLabels: function (a) { return a }, _generateHTML: function (c) { var d = this._get(c, 'significant'); c._periods = (c._hold ? c._periods : this._calculatePeriods(c, c._show, d, new Date())); var e = false; var f = 0; var g = d; var h = $.extend({}, c._show); for (var i = Y; i <= S; i++) { e |= (c._show[i] == '?' && c._periods[i] > 0); h[i] = (c._show[i] == '?' && !e ? null : c._show[i]); f += (h[i] ? 1 : 0); g -= (c._periods[i] > 0 ? 1 : 0) } var j = [false, false, false, false, false, false, false]; for (var i = S; i >= Y; i--) { if (c._show[i]) { if (c._periods[i]) { j[i] = true } else { j[i] = g > 0; g-- } } } var k = this._get(c, 'compact'); var l = this._get(c, 'layout'); var m = (k ? this._get(c, 'compactLabels') : this._get(c, 'labels')); var n = this._get(c, 'whichLabels') || this._normalLabels; var o = this._get(c, 'timeSeparator'); var p = this._get(c, 'description') || ''; var q = function (a) { var b = $.countdown._get(c, 'compactLabels' + n(c._periods[a])); return (h[a] ? c._periods[a] + (b ? b[a] : m[a]) + ' ' : '') }; var r = function (a) { var b = $.countdown._get(c, 'labels' + n(c._periods[a])); return ((!d && h[a]) || (d && j[a]) ? '<span class="countdown_section"><span class="countdown_amount">' + c._periods[a] + '</span><br/>' + (b ? b[a] : m[a]) + '</span>' : '') }; return (l ? this._buildLayout(c, h, l, k, d, j) : ((k ? '<span class="countdown_row countdown_amount' + (c._hold ? ' countdown_holding' : '') + '">' + q(Y) + q(O) + q(W) + q(D) + (h[H] ? this._minDigits(c._periods[H], 2) : '') + (h[M] ? (h[H] ? o : '') + this._minDigits(c._periods[M], 2) : '') + (h[S] ? (h[H] || h[M] ? o : '') + this._minDigits(c._periods[S], 2) : '') : '<span class="countdown_row countdown_show' + (d || f) + (c._hold ? ' countdown_holding' : '') + '">' + r(Y) + r(O) + r(W) + r(D) + r(H) + r(M) + r(S)) + '</span>' + (p ? '<span class="countdown_row countdown_descr">' + p + '</span>' : ''))) }, _buildLayout: function (c, d, e, f, g, h) { var j = this._get(c, (f ? 'compactLabels' : 'labels')); var k = this._get(c, 'whichLabels') || this._normalLabels; var l = function (a) { return ($.countdown._get(c, (f ? 'compactLabels' : 'labels') + k(c._periods[a])) || j)[a] }; var m = function (a, b) { return Math.floor(a / b) % 10 }; var o = { desc: this._get(c, 'description'), sep: this._get(c, 'timeSeparator'), yl: l(Y), yn: c._periods[Y], ynn: this._minDigits(c._periods[Y], 2), ynnn: this._minDigits(c._periods[Y], 3), y1: m(c._periods[Y], 1), y10: m(c._periods[Y], 10), y100: m(c._periods[Y], 100), y1000: m(c._periods[Y], 1000), ol: l(O), on: c._periods[O], onn: this._minDigits(c._periods[O], 2), onnn: this._minDigits(c._periods[O], 3), o1: m(c._periods[O], 1), o10: m(c._periods[O], 10), o100: m(c._periods[O], 100), o1000: m(c._periods[O], 1000), wl: l(W), wn: c._periods[W], wnn: this._minDigits(c._periods[W], 2), wnnn: this._minDigits(c._periods[W], 3), w1: m(c._periods[W], 1), w10: m(c._periods[W], 10), w100: m(c._periods[W], 100), w1000: m(c._periods[W], 1000), dl: l(D), dn: c._periods[D], dnn: this._minDigits(c._periods[D], 2), dnnn: this._minDigits(c._periods[D], 3), d1: m(c._periods[D], 1), d10: m(c._periods[D], 10), d100: m(c._periods[D], 100), d1000: m(c._periods[D], 1000), hl: l(H), hn: c._periods[H], hnn: this._minDigits(c._periods[H], 2), hnnn: this._minDigits(c._periods[H], 3), h1: m(c._periods[H], 1), h10: m(c._periods[H], 10), h100: m(c._periods[H], 100), h1000: m(c._periods[H], 1000), ml: l(M), mn: c._periods[M], mnn: this._minDigits(c._periods[M], 2), mnnn: this._minDigits(c._periods[M], 3), m1: m(c._periods[M], 1), m10: m(c._periods[M], 10), m100: m(c._periods[M], 100), m1000: m(c._periods[M], 1000), sl: l(S), sn: c._periods[S], snn: this._minDigits(c._periods[S], 2), snnn: this._minDigits(c._periods[S], 3), s1: m(c._periods[S], 1), s10: m(c._periods[S], 10), s100: m(c._periods[S], 100), s1000: m(c._periods[S], 1000) }; var p = e; for (var i = Y; i <= S; i++) { var q = 'yowdhms'.charAt(i); var r = new RegExp('\\{' + q + '<\\}(.*)\\{' + q + '>\\}', 'g'); p = p.replace(r, ((!g && d[i]) || (g && h[i]) ? '$1' : '')) } $.each(o, function (n, v) { var a = new RegExp('\\{' + n + '\\}', 'g'); p = p.replace(a, v) }); return p }, _minDigits: function (a, b) { a = '' + a; if (a.length >= b) { return a } a = '0000000000' + a; return a.substr(a.length - b) }, _determineShow: function (a) { var b = this._get(a, 'format'); var c = []; c[Y] = (b.match('y') ? '?' : (b.match('Y') ? '!' : null)); c[O] = (b.match('o') ? '?' : (b.match('O') ? '!' : null)); c[W] = (b.match('w') ? '?' : (b.match('W') ? '!' : null)); c[D] = (b.match('d') ? '?' : (b.match('D') ? '!' : null)); c[H] = (b.match('h') ? '?' : (b.match('H') ? '!' : null)); c[M] = (b.match('m') ? '?' : (b.match('M') ? '!' : null)); c[S] = (b.match('s') ? '?' : (b.match('S') ? '!' : null)); return c }, _calculatePeriods: function (c, d, e, f) { c._now = f; c._now.setMilliseconds(0); var g = new Date(c._now.getTime()); if (c._since) { if (f.getTime() < c._since.getTime()) { c._now = f = g } else { f = c._since } } else { g.setTime(c._until.getTime()); if (f.getTime() > c._until.getTime()) { c._now = f = g } } var h = [0, 0, 0, 0, 0, 0, 0]; if (d[Y] || d[O]) { var i = $.countdown._getDaysInMonth(f.getFullYear(), f.getMonth()); var j = $.countdown._getDaysInMonth(g.getFullYear(), g.getMonth()); var k = (g.getDate() == f.getDate() || (g.getDate() >= Math.min(i, j) && f.getDate() >= Math.min(i, j))); var l = function (a) { return (a.getHours() * 60 + a.getMinutes()) * 60 + a.getSeconds() }; var m = Math.max(0, (g.getFullYear() - f.getFullYear()) * 12 + g.getMonth() - f.getMonth() + ((g.getDate() < f.getDate() && !k) || (k && l(g) < l(f)) ? -1 : 0)); h[Y] = (d[Y] ? Math.floor(m / 12) : 0); h[O] = (d[O] ? m - h[Y] * 12 : 0); f = new Date(f.getTime()); var n = (f.getDate() == i); var o = $.countdown._getDaysInMonth(f.getFullYear() + h[Y], f.getMonth() + h[O]); if (f.getDate() > o) { f.setDate(o) } f.setFullYear(f.getFullYear() + h[Y]); f.setMonth(f.getMonth() + h[O]); if (n) { f.setDate(o) } } var p = Math.floor((g.getTime() - f.getTime()) / 1000); var q = function (a, b) { h[a] = (d[a] ? Math.floor(p / b) : 0); p -= h[a] * b }; q(W, 604800); q(D, 86400); q(H, 3600); q(M, 60); q(S, 1); if (p > 0 && !c._since) { var r = [1, 12, 4.3482, 7, 24, 60, 60]; var s = S; var t = 1; for (var u = S; u >= Y; u--) { if (d[u]) { if (h[s] >= t) { h[s] = 0; p = 1 } if (p > 0) { h[u]++; p = 0; s = u; t = 1 } } t *= r[u] } } if (e) { for (var u = Y; u <= S; u++) { if (e && h[u]) { e-- } else if (!e) { h[u] = 0 } } } return h } }); function extendRemove(a, b) { $.extend(a, b); for (var c in b) { if (b[c] == null) { a[c] = null } } return a } $.fn.countdown = function (a) { var b = Array.prototype.slice.call(arguments, 1); if (a == 'getTimes' || a == 'settings') { return $.countdown['_' + a + 'Countdown'].apply($.countdown, [this[0]].concat(b)) } return this.each(function () { if (typeof a == 'string') { $.countdown['_' + a + 'Countdown'].apply($.countdown, [this].concat(b)) } else { $.countdown._attachCountdown(this, a) } }) }; $.countdown = new Countdown() })(jQuery); (function ($) { $.countdown.regional['zh-CN'] = { labels: ['年', '月', '周', '天', '时', '分', '秒'], labels1: ['年', '月', '周', '天', '时', '分', '秒'], compactLabels: ['年', '月', '周', '天'], compactLabels1: ['年', '月', '周', '天'], whichLabels: null, timeSeparator: ':', isRTL: false }; $.countdown.setDefaults($.countdown.regional['zh-CN']); })(jQuery);

//弹出
eval(function (B, D, A, G, E, F) { function C(A) { return A < 62 ? String.fromCharCode(A += A < 26 ? 65 : A < 52 ? 71 : -4) : A < 63 ? '_' : A < 64 ? '$' : C(A >> 6) + C(A & 63) } while (A > 0) E[C(G--)] = D[--A]; return B.replace(/[\w\$]+/g, function (A) { return E[A] == F[A] ? A : E[A] }) } ('(z(){O(v.0)n;U CX=z(N){n CS CR("DD","n Do.prototype.toString.D3(DD)==\'[Cr "+N+"]\'")},Bl=CX("Array"),Bs=CX("Do");v.0={version:"EB.I",pubDate:"2009-03-02",k:z(B,M,N){O(N)0.k(B,N);O(B&&M&&Bs(M))Z(U A BZ M)B[A]=M[A];n B},B1:[]};U Cw=["CF","f"],BK={},H;BX(H=Cw.BB())0[H]=CK("I,z(){BK."+H+"?BK."+H+".g(9):(BK."+H+"=[9])}");U BE=!+"\\v1",BT=2.compatMode=="CSS1Compat",BD=BE&&/MSIE (\\C$)\\./.Ce(navigator.userAgent)&&6(RegExp.$1)<EC,Br=!BE||(!BD&&BT),N=z(N){n 2.getElementById(N)},Bn=z(N){n 6(N.h.u)||N.Bt},3=(z(){n CS CR("BI","S","X","X=X||2;"+(v.Cg?"X.Cg(\'Dg\'+BI,S)":"X.addEventListener(BI,S,i)")+";0.B1.g([BI,S,X])")})(),$=(z(){n CS CR("BI","S","X","X=X||2;"+(v.Cg?"X.$(\'Dg\'+BI,S)":"X.removeEventListener(BI,S,i)"))})(),1=z(A,B,N){O(!A)n;O(Bs(B)){Z(U C BZ B)1(A,C,B[C]);n}O(Bl(A)||/htmlcollection|nodelist/Bd.Ce(""+A)){Z(C=A.s-J;C>=I;C--)1(A[C],B,N);n}Bq{A.h[B]=N}Bz(M){}},5=I,4,DB=I,Cq=z(E,M,D,N){O(!E)n;O(Bl(E)){U B,A=[],C={Bm:[m.Dk,"ok"],Di:[m.Dp,"cancel"]};BX(E.s)(B=E.BB())&&A[A.g(Cq.k(d,C[B]||B))-J]||A.pop();n A}N=N||"ymPrompt_btn_"+DB++;D=D==Ca?"Ca":!!D;n{Q:N,Da:"<DP type=\'button\' Q=\'"+N+"\' onclick=\'0.Cc(\\""+M+"\\","+D+")\' h=\'Db:pointer\' j=\'btnStyle Cd\' value=\'"+E+"\' />"}},DZ=z(N){O(!N)n 4="";O(!Bl(N))N=[N];O(!N.s)n 4="";4=N.CG();U M=[];BX(N.s)M.g(N.BB().Da);n M.DF("&Dj;&Dj;")},Cb={B4:"\\u5185\\u5bb9",l:300,u:185,BO:"\\u6807\\u9898",Cd:z(){},Dw:"#DX",Cp:I.J,r:i,BV:"",BG:d,Dd:a,B0:a,D9:i,CU:a,CL:a,DQ:"CQ",C_:I.ED,closeBtn:a,B$:i,BQ:i,Bo:{Ch:I.L,Cj:50},closeTxt:"\\DO\\Ds",Dk:" \\u786e \\u5b9a ",Dp:" \\u53d6 \\u6d88 ",DY:"P-content",minBtn:i,minTxt:"\\B7\\Dv\\B6",Dx:i,maxTxt:"\\B7\\De\\B6",DG:i,C0:i},m={};(z(){U o=2.Bv,CB=9.CB;O(!o||typeof o!="Cr")n 3("load",CB,v);O(BE&&2.Dr!="DV")n 3("readystatechange",z(){2.Dr=="DV"&&CB()});o=BT?2.documentElement:o;U CH=2.C8("CH").s;O(!BE&&CH)n;U Bk=z(){n m.B0&&Br?[I,I]:[o.DJ,o.D5]},B_=z(){U N=Bk();0.k(BC,{C4:6(p.h.c)-N[I],C5:6(p.h.Y)-N[J]})},CO="BF:BM;Y:I;c:I;w:b;DM-align:center",T=2.createElement("T");T.8=["<T Q=\'BL\' h=\'"+CO+";Bf-Bi:Dm;\'></T>",BD?("<r Q=\'DA\' Cl=\'D7:i\' h=\'"+CO+";Bf-Bi:9999;BJ:B3(x=I);x:I\'></r>"):"","<T Q=\'P-v\' h=\'BF:BM;Bf-Bi:10001;w:b\'>",BD?"<r Cl=\'D7:i\' h=\'l:BH%;u:BH%;BF:BM;Y:I;c:I;Bf-Bi:-J\'></r>":"","<T j=\'P-CV\' Q=\'P-CV\'><T j=\'P-tr\'><T j=\'P-DL\' h=\'Db:move;\'><T j=\'P-C2-DM\'></T><T j=\'P-C2-tools\'>","<T j=\'DE\' BO=\'\\B7\\Dv\\B6\'><BW>I</BW></T>","<T j=\'Dt\' BO=\'\\B7\\De\\B6\'><BW>J</BW></T>","<T j=\'ymPrompt_close\' BO=\'\\DO\\Ds\'><BW>DI</BW></T>","</T></T></T></T>","<T j=\'P-B9\' Q=\'P-B9\'><T j=\'P-Dq\'><T j=\'P-mc\'><T j=\'P-Bv\' h=\'BF:relative\'></T></T></T></T>","<T j=\'P-B9\' Q=\'P-Dh\'><T j=\'P-Dq\'><T j=\'P-BG\'></T></T></T>","<T j=\'P-CY\' Q=\'P-CY\'><T j=\'P-br\'><T j=\'P-bc\'></T></T></T>","</T>",BE?"<T Q=\'P-Df\' h=\'BF:BM;Bf-Bi:Dm;CT:#808080;BJ:B3(x=80) progid:DXImageTransform.Microsoft.Blur(pixelradius=K);w:b\'></T>":""].DF("");2.Bv.appendChild(T);U BL=N("BL"),p=N("P-v"),Be=N("P-Df"),BS,CC=N("P-CV"),BA=CC._._,CE=BA._,Ba=CE.CZ,y=N("P-B9")._._._,Bu=N("P-Dh"),Dc=Bu._._,DK=N("P-CY"),Bj=[BL];BD&&Bj.g(N("DA"));U q=Ba.childNodes,BC={},7="Bh",Bw=[I,I],CA=z(){U N=Bk();Bw=[6(p.h.c)-N[I],6(p.h.Y)-N[J]]},CP=z(){CA();7="V";q[J]._.8="K";q[J].BN="DC";BY(o.Bx,o.Bg,[I,I])},Cm=z(){CA();7="W";q[I]._.8="K";q[I].BN="DC";BY(I,Bn(CC),Bw)},Bp=z(N){!N&&7=="W"&&CA();7="Bh";q[I]._.8="I";q[J]._.8="J";q[I].BN="DE";q[J].BN="Dt";BY.k(this,N?[]:[I,I,Bw])},V,W;3("Ck",W=z(){7!="Bh"?Bp():Cm()},q[I]);3("Ck",V=z(){7!="Bh"?Bp():CP()},q[J]);3("dblclick",z(N){m.Dx&&(N.Cs||N.Ct).DU!=Ba&&V()},BA);3("Ck",z(){0.Cc("CW")},q[K]);U CD=z(){n[e.V(o.scrollWidth,o.Bx),e.V(o.scrollHeight,o.Bg)]},Cv=CD(),t=BA.C6&&BA,BR=z(N){!CH&&1(p,N==J&&BT?{BJ:"",x:""}:{BJ:"Dn(x="+N*BH+")",x:N})},CI=z(A){U M=BC.D0+A.C1,C=BC.D1+A.Cz;O(!m.D9){U D=Bk(),N=D[I],B=D[J];M=e.W(e.V(M,N),o.Bx-p.Cu+N);C=e.W(e.V(C,B),o.Bg-p.Bt+B)}Cy O(m.CL&&""+Cv!=""+CD())B8(a);1(BS,{c:M+"R",Y:C+"R"})},Bb=z(){BR(J);$("C9",CI,t);$("DR",Bb,t);B_();m.r&&1(BU().CZ,"w","b");t&&($("DH",Bb,t),t.releaseCapture())};3("mousedown",z(M){O((M.Cs||M.Ct).DU==Ba)n i;BR(m.C_);0.k(BC,{D0:6(p.h.c)-M.C1,D1:6(p.h.Y)-M.Cz});3("C9",CI,t);3("DR",Bb,t);O(m.r){U A={w:""},N=BU();BT&&BD&&0.k(A,{l:N.Cu,u:N.Bt});1(N.CZ,A)}t&&(3("DH",Bb,t),t.C6())},BA);U DS=z(){1(p,{c:BC.C4+o.DJ+"R",Y:BC.C5+o.D5+"R"})},D2=z(A){U M=A.DT;O(M==27)B2();O(4){U C=4.s,B;2.Dy&&2.Dy.Q!=4[5].Q&&(B=a);O(M==C3||M==39)B&&(5=-J),N(4[++5==C?(--5):5].Q).Cf();O(M==37)B&&(5=C),N(4[--5<I?(++5):5].Q).Cf();O(M==C7)n a}n Bc(A,(M>110&&M<123)||M==C3||M==C7)},Bc=z(A,M){A=A||event;O(!M&&/DP|select|textarea/Bd.Ce((A.Cs||A.Ct).tagName))n a;Bq{A.returnValue=i;A.DT=I}Bz(N){A.Du&&A.Du()}n i};BL.DW=Bc;U B8=z(N){1(Bj,"w","b");U A=CD(),M=z(){1(Bj,{l:A[I]+"R",u:A[J]+"R",w:""})};BE?N===a?M():setTimeout(M,I):M();7=="W"?Cm():7=="V"?CP():BY()},B5=z(N){O(!m.CL)n;(N===i?$:3)("resize",B8,v);O(N===i)n 1(Bj,"w","b");1(BL,{CT:m.Dw,BJ:"Dn(x="+m.Cp*BH+")",x:m.Cp});B8(a)},Dz=z(G){G=Bl(G)&&G.s==K?(G[I]+"+{K},{L}+"+G[J]):(CN[G]||CN["CQ"]);U Cx=[o.Bx-p.Cu,o.Bg-p.Bt].CG(Bk()),Ci=G.replace(/\\{(\\C$)\\}/D$,z(M,N){n Cx[N]}).split(",");n[CK(Ci[I]),CK(Ci[J])]},CN={CQ:"{I}/K+{K},{J}/K+{L}",EA:"{K},{J}/K+{L}",DI:"{I}+{K},{J}/K+{L}",H:"{I}/K+{K},{L}",D_:"{I}/K,{J}+{L}",lt:"{K},{L}",lb:"{K},{J}+{L}",rb:"{I}+{K},{J}+{L}",rt:"{I}+{K},{L}"},BY=z(N,M,A){O(p.h.w=="b")n;M=6(M)||m.u;N=6(N)||m.l;1(BS,{l:N+"R",u:M+"R",c:I,Y:I});A=Dz(A||m.DQ);1(BS,{Y:A[J]+"R",c:A[I]+"R"});B_();1(y,"u",M-Bn(CC)-Bn(Bu)-Bn(DK)+"R");BT&&BD&&m.r&&1(BU(),{u:y.Bg})},By=[],BP=[],Co=z(A){U CM=A===i?$:3;CM("scroll",m.B0&&!Br?DS:B_,v);1(BS,"BF",m.B0&&Br?"fixed":"BM");CM("keydown",D2);O(A===i){1(Be,"w","b");U C=z(){1(p,"w","b");1(By,"CJ","visible");By=[];BP.BB();O(BP.s)0.f.k(d,BP[I].CG(a))},M=z(){U A=J,M=z(){A=e.V(A-m.Bo.Ch,I);BR(A);O(A==I){B5(i);C();D4(N)}};M();U N=D6(M,m.Bo.Cj)};m.BQ?M():C();n}Z(U D=2.C8("Cr"),F=D.s-J;F>-J;F--)D[F].h.CJ!="D8"&&By.g(D[F])&&(D[F].h.CJ="D8");1([CE,Ba],"w",(m.CU?"":"b"));BA.BN="P-DL"+(m.CU?"":" P-ttc");CE.8=m.BO;Z(U F=I,B=["W","V","CW"];F<L;F++){q[F].h.w=m[B[F]+"Btn"]?"":"b";q[F].BO=m[B[F]+"Txt"]}U E="BF:BM;l:BH%;u:BH%;Y:I;c:I;x:J;BJ:B3(x=BH)";y.8=!m.r?("<T j=\\""+m.DY+"\\">"+m.B4+"</T>"):"<r h=\'"+E+"\' border=\'I\' frameborder=\'I\' Cl=\'"+m.B4+"\'></r><T h=\'"+E+";CT:#DX;x:I.J;BJ:B3(x=10);w:b\'></T>";(z(M,A){Z(U B BZ A){Bq{M[B]=A[B]}Bz(N){}}})(y._,m.r);y.BN="P-Bv "+m.BV;1(Bu,"w",((Dc.8=DZ(Cq(m.BG)))?"":"b"));!m.BQ&&m.B$&&1(Be,"w","");1(p,"w","");Bp(a);BR(m.BQ?I:J);m.BQ&&(z(){U A=I,N=z(){A=e.W(A+m.Bo.Ch,J);BR(A);O(A==J){D4(M);m.B$&&1(Be,"w","")}};N();U M=D6(N,m.Bo.Cj)})();4&&N(4[5=I].Q).Cf();p.onselectstart=m.DG?d:Bc;p.DW=m.C0?d:Bc},DN=z(){BS=[p].CG(m.B$?Be:"");B5();Co()},B2=z(){!m.BQ&&B5(i);Co(i)},BU=z(){n m.r?y._:d};0.k(0,{CW:B2,V:V,W:W,Bh:Bp,BU:BU,f:z(M,N,C){O(!C&&BP.g([M,N])&&BP.s>J)n;U A=[].slice.D3(M,I),B={},D=-J;O(!Bs(A[I])){Z(U E BZ Cb)O(A[++D])B[E]=A[D]}Cy B=A[I];0.k(m,0.k({},B,N),0.CF());Z(E BZ m)m[E]=m[E]!=d?m[E]:0.Cn[E];DN()},Cc:z(N,B,A){O(B==Ca?m.Dd:B)B2();Bq{(m.Cd)(N)}Bz(M){Dl(M.B4)}},resizeWin:BY,CF:z(N){n 0.Cn=0.k({},N,0.k({},0.Cn,Cb))},getButtons:z(){U A=4||[],M,B=[];BX(M=A.BB())B.g(N(M.Q));n B}});0.CF();U H;Z(U Bd BZ BK)BX(H=BK[Bd].BB())0[Bd].k(d,H);3("unload",z(){BX(0.B1.s)$.k(d,0.B1.BB())},v)})()})();0.k(0,{Dl:z(){0.f(9,{BV:"ymPrompt_alert",BG:["Bm"]})},succeedInfo:z(){0.f(9,{BV:"ymPrompt_succeed",BG:["Bm"]})},errorInfo:z(){0.f(9,{BV:"ymPrompt_error",BG:["Bm"]})},confirmInfo:z(){0.f(9,{BV:"ymPrompt_confirm",BG:["Bm","Di"]})},win:z(){0.f(9)}})', 'G|f|t|0|1|2|3|_|$|if|ym|id|px|fn|div|var|max|min|obj|top|for|true|none|left|null|Math|show|push|style|false|class|apply|width|curCfg|return|rootEl|ym_win|ym_ico|iframe|length|bindEl|height|window|display|opacity|ym_body|function|ymPrompt|setStyle|document|addEvent|btnCache|btnIndex|parseInt|cur_state|innerHTML|arguments|firstChild|detachEvent|ym_head|shift|dragVar|IE6|isIE|position|btn|100|env|filter|_initFn|maskLevel|absolute|className|title|cacheWin|useSlide|filterWin|ym_wins|isCompat|getPage|icoCls|strong|while|setWinSize|in|ym_hTool|uEvent|keyEvent|i|ym_shadow|z|clientHeight|normal|index|maskEl|getScrollPos|isArray|OK|$height|slideCfg|doNormal|try|useFixed|isObj|offsetHeight|ym_btn|body|cur_cord|clientWidth|_obj|catch|fixPosition|eventList|destroy|alpha|message|maskVisible|u5316|u6700|resizeMask|ml|saveWinInfo|showShadow|cal_cord|callee|ym_headbox|getWinSize|ym_hText|setDefaultCfg|concat|frameset|mEvent|visibility|eval|showMask|F|posMap|maskStyle|doMax|c|Function|new|background|titleBar|tl|close|objType|bl|nextSibling|undefined|dftCfg|doHandler|handler|test|focus|attachEvent|increment|arr|interval|click|src|doMin|cfg|winVisible|maskAlpha|mkBtn|object|srcElement|target|offsetWidth|winSize|initFn|pos|else|clientY|allowRightMenu|clientX|header|9|_offX|_offY|setCapture|13|getElementsByTagName|mousemove|winAlpha|d|maskIframe|seed|ymPrompt_normal|o|ymPrompt_min|join|allowSelect|losecapture|r|scrollLeft|ym_bottom|tc|text|init|u5173|input|winPos|mouseup|scrollEvent|keyCode|parentNode|complete|oncontextmenu|000|msgCls|joinBtn|html|cursor|ym_btnContent|autoClose|u5927|shadow|on|btnl|CANCEL|nbsp|okTxt|alert|10000|Alpha|Object|cancelTxt|mr|readyState|u95ed|ymPrompt_max|preventDefault|u5c0f|maskAlphaColor|maxBtn|activeElement|getPos|offX|offY|keydownEvent|call|clearInterval|scrollTop|setInterval|javascript|hidden|dragOut|b|g|l|4|7|8'.split('|'), 255, 259, {}, {}));
//Date.prototype.format = function (mask) { var d = this; var zeroize = function (value, length) { if (!length) length = 2; value = String(value); for (var i = 0, zeros = ""; i < (length - value.length); i++) { zeros += "0"; } return zeros + value; }; return mask.replace(/"[^"]*"|"[^"]*"|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) { switch ($0) { case "d": return d.getDate(); case "dd": return zeroize(d.getDate()); case "ddd": return ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"][d.getDay()]; case "dddd": return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()]; case "M": return d.getMonth() + 1; case "MM": return zeroize(d.getMonth() + 1); case "MMM": return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()]; case "MMMM": return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][d.getMonth()]; case "yy": return String(d.getFullYear()).substr(2); case "yyyy": return d.getFullYear(); case "h": return d.getHours() % 12 || 12; case "hh": return zeroize(d.getHours() % 12 || 12); case "H": return d.getHours(); case "HH": return zeroize(d.getHours()); case "m": return d.getMinutes(); case "mm": return zeroize(d.getMinutes()); case "s": return d.getSeconds(); case "ss": return zeroize(d.getSeconds()); case "l": return zeroize(d.getMilliseconds(), 3); case "L": var m = d.getMilliseconds(); if (m > 99) m = Math.round(m / 10); return zeroize(m); case "tt": return d.getHours() < 12 ? "am" : "pm"; case "TT": return d.getHours() < 12 ? "AM" : "PM"; case "Z": return d.toUTCString().match(/[A-Z]+$/); default: return $0.substr(1, $0.length - 2); } }); };

Date.prototype.format = function (mask) {
    var d = this;
    var zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ""; i < (length - value.length); i++) {
            zeros += "0";
        }
        return zeros + value;
    };

    return mask.replace(/"[^"]*"|"[^"]*"|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {

        switch ($0) {

            case "d": return d.getDate();

            case "dd": return zeroize(d.getDate());

            case "ddd": return ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"][d.getDay()];

            case "dddd": return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()];

            case "M": return d.getMonth() + 1;

            case "MM": return zeroize(d.getMonth() + 1);

            case "MMM": return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()];

            case "MMMM": return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][d.getMonth()];

            case "yy": return String(d.getFullYear()).substr(2);

            case "yyyy": return d.getFullYear();

            case "h": return d.getHours() % 12 || 12;

            case "hh": return zeroize(d.getHours() % 12 || 12);

            case "H": return d.getHours();

            case "HH": return zeroize(d.getHours());

            case "m": return d.getMinutes();

            case "mm": return zeroize(d.getMinutes());

            case "s": return d.getSeconds();

            case "ss": return zeroize(d.getSeconds());

            case "l": return zeroize(d.getMilliseconds(), 3);

            case "L": var m = d.getMilliseconds();

                if (m > 99) m = Math.round(m / 10);

                return zeroize(m);

            case "tt": return d.getHours() < 12 ? "am" : "pm";

            case "TT": return d.getHours() < 12 ? "AM" : "PM";

            case "Z": return d.toUTCString().match(/[A-Z]+$/);

                // Return quoted strings with the surrounding quotes removed     

            default: return $0.substr(1, $0.length - 2);
        }
    });
}; 

var par ={
	Win:function(){return window.parent.Win;},
	Alert:function(){return window.parent.Alert;},
	Close:function(){window.parent.Close();}
}

var pWin = window.parent.Win;
var pAlert = window.parent.Alert;
var pClose = function(){window.parent.Close();}







