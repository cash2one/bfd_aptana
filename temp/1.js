(function (window, undefined) {
    var document = window.document;
    var location = document.location;
    var Meitu = {
        currentUrl: location.href,
        reCodeType: /(xiuxiu\.embedSWF\s*?\(.*?,\s*?)(\d)(\s*?,.*?\))/mi,
        sampleHTML: function (type) {
            return '<!DOCTYPE html><html><head><title>美图WEB开放平台</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><script src="http://open.web.meitu.com/sources/xiuxiu.js"><\/script><script type="text/javascript">window.onload=function(){xiuxiu.embedSWF("altContent",' + type + ',"100%","100%");xiuxiu.setUploadURL("http://imgkaka.meitu.com/picsave.php");xiuxiu.onInit = function (){xiuxiu.loadPhoto("http://open.web.meitu.com/sources/images/1.jpg");}}<\/script><style type="text/css">html,body{height:100%;overflow:hidden;}body{margin:0;}</style></head><body><div id="altContent"></div></body></html>'
        },
        getCodeType: function (code) {
            var result = this.reCodeType.exec(code);
            return result[2]
        },
        getQueryValue: function (key) {
            var result = (new RegExp("[&|?]" + key + "=([^&]*)&?", "ig")).exec(this.currentUrl);
            return result ? result[1].replace(/#.*/gi, "") : ""
        },
        htmlEncode: function (str) {
            var s = "";
            if (str.length == 0) {
                return ""
            }
            s = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            return s
        },
        htmlDecode: function (str) {
            var s = "";
            if (str.length == 0) {
                return ""
            }
            s = str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            return s
        },
        runCode: function (code) {
            var type = this.getCodeType(code);
            if (type == 3) {
                var win = window.open("", "", "");
                win.opener = null;
                win.document.write(code);
                win.document.close()
            } else {
                function closePopwin() {
                    $(ifr).css({
                        width: 0,
                        height: 0
                    }).remove();
                    popwin.remove();
                    $("body").css("overflow", "auto")
                }
                var popw = 660,
                    poph = type == 5 ? 440 : 520;
                var popwin = '<div><div class="masker"></div><div class="popwin"><iframe frameborder="0" width="' + popw + '" height="' + poph + '" allowtransparency="false"></iframe></div></div>';
                popwin = $(popwin).appendTo(document.body);
                var mask = popwin.find(".masker");
                var ifr = popwin.find("iframe")[0];
                var win = ifr.contentWindow;
                var ifrload = function () {
                    var xiuxiu = win.window.xiuxiu;
                    if (xiuxiu) {
                        xiuxiu.onClose = closePopwin
                    }
                };
                if (ifr.attachEvent) {
                    ifr.attachEvent("onload", ifrload)
                } else {
                    ifr.onload = ifrload
                }
                win.document.write(code);
                win.document.close();
                var availH = document.documentElement.clientHeight;
                var availW = document.documentElement.clientWidth;
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
                popwin.find(".popwin").css({
                    top: availH <= poph ? scrollTop : (scrollTop + (availH - poph) / 2),
                    left: availW <= popw ? scrollLeft : (scrollLeft + (availW - popw) / 2)
                });
                $("body").css("overflow", "hidden");
                mask.css({
                    width: document.body.scrollWidth || document.documentElement.scrollWidth,
                    height: document.body.scrollHeight || document.documentElement.scrollHeight
                });
                mask.on("click", closePopwin)
            }
        }
    };
    window.Meitu = Meitu
})(window);
$(function () {
    var body = $(document.body);
    var sidelinks = $(".sidebar a,.cases a");
    if (body.hasClass("p-products") || body.hasClass("p-wiki")) {
        sideClick(sidelinks);
        var mainwrap = $(".mainwrap"),
            sidebar = $(".sidebar"),
            mainpos = mainwrap.offset(),
            sideheight = sidebar.find("ul").outerHeight(true);
        $(window).scroll(function (e) {
            var scrolltop = document.body.scrollTop || document.documentElement.scrollTop,
                availheight = document.documentElement.clientHeight,
                availbottom = document.body.offsetHeight - scrolltop - sideheight;
            if (scrolltop > 168 && availbottom > 58) {
                sidebar.css({
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    overflow: "auto",
                    left: mainpos.left
                })
            } else {
                if (availbottom <= 58) {
                    sidebar.css({
                        position: "absolute",
                        top: mainwrap.height() - sideheight,
                        bottom: "auto",
                        left: 0
                    })
                } else {
                    sidebar.css({
                        position: "static",
                        top: "auto",
                        bottom: "auto",
                        left: "auto"
                    })
                }
            }
        });
        if (location.hash) {
            var target = sidelinks.filter("a[href=" + location.hash + "]");
            changeCurrent(target)
        } else {
            changeCurrent(sidelinks.eq(0))
        }
    }
    if (body.hasClass("p-index")) {
        var pics = $(".products .pic img");
        pics.on("click", function () {
            var type = this.getAttribute("data-type");
            Meitu.runCode(Meitu.sampleHTML(type), type)
        })
    }
    if (body.hasClass("p-products")) {
        var re = Meitu.reCodeType;

        function changeCode(type) {
            switch (type) {
            case "#M1":
                type = 3;
                break;
            case "#M2":
                type = 1;
                break;
            case "#M3":
                type = 2;
                break;
            case "#M4":
                type = 5;
                break;
            default:
                type = 3
            }
            var html = HTMLCode.replace(re, function (res, r1, r2, r3) {
                return r1 + type + r3
            });
            var js = JSCode.replace(re, function (res, r1, r2, r3) {
                return r1 + type + r3
            });
            htmlcode.val(html);
            htmlbtn.attr("data-clipboard-text", html);
            jscode.text(js);
            jsbtn.attr("data-clipboard-text", js);
            window.prettyPrint()
        }
        sidelinks.on("click", function () {
            changeCode(this.hash)
        });
        $("#RunCode").on("click", function () {
            var code = htmlcode.val();
            Meitu.runCode(code)
        });
        var htmlcode = $("#Code"),
            jscode = $("#JSCode"),
            HTMLCode = htmlcode.val(),
            JSCode = Meitu.htmlDecode(jscode.html()),
            htmlbtn = $("#CopyCode"),
            jsbtn = $("#CopyJS");
        htmlbtn.attr("data-clipboard-text", HTMLCode);
        htmlcode.on("blur", function () {
            htmlbtn.attr("data-clipboard-text", htmlcode.val())
        });
        jsbtn.attr("data-clipboard-text", JSCode);
        window.prettyPrint();
        if (window.clipboardData) {
            function copy(txt) {
                window.clipboardData.clearData();
                window.clipboardData.setData("Text", txt);
                alert("代码已复制到剪贴板")
            }
            htmlbtn.add(jsbtn).on("click", function () {
                copy(this.getAttribute("data-clipboard-text"))
            })
        } else {
            if (window.ZeroClipboard) {
                ZeroClipboard.setMoviePath("/js/ZeroClipboard.swf");
                var clip = new ZeroClipboard.Client("#CopyCode,#CopyJS");
                clip.on("complete", function (client, args) {
                    alert("代码已复制到剪贴板")
                })
            }
        } if (location.hash) {
            changeCode(location.hash)
        }
    }
    if (body.hasClass("p-wiki")) {
        scroll(sidelinks)
    }
    if (body.hasClass("p-faq")) {
        var catlink = $("#J_Catlink"),
            catcon = $("#J_Catcon");
        $("#J_Catlink").click(function () {
            catcon.toggle("fast");
            catlink.html(catlink.html() == "[隐藏]" ? "[显示]" : "[隐藏]")
        });
        scroll(catcon.find("a"))
    }
    if (body.hasClass("p-cases")) {
        sideClick(sidelinks);
        play(sidelinks);
        if (location.hash) {
            var target = sidelinks.filter("a[data-id=" + location.hash.substring(1) + "]");
            target.click()
        } else {
            sidelinks.eq(0).click()
        }
    }

    function sideClick(links) {
        links.on("click", function () {
            changeCurrent($(this))
        })
    }

    function changeCurrent(a) {
        sidelinks.removeClass("cur");
        a.addClass("cur")
    }

    function scroll(links) {
        links.on("click", function () {
            var $this = $(this);
            var top = $(this.hash).offset().top;
            $("html,body").animate({
                scrollTop: top
            }, 1000);
            return false
        })
    }

    function play(links) {
        links.on("click", function () {
            $("#Player").attr("src", this.href);
            return false
        })
    }
});