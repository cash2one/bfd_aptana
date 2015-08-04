define(['recorder'], function (Recorder) {
    var vodplayed = Recorder('vodplayed'),
        videolist = Recorder('videolist');

    var cookie = {
        set : function (name,value,days,path,domain) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            if(path==undefined || path ==null || path==""){path="/";}
            if(domain==undefined || domain ==null || domain==""){domain=".m1905.com";}
            document.cookie = name+"="+value+expires+";domain="+domain+";path="+path;
        },
        get : function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }
    }

    return {
        initData: function() {
            var records = vodplayed.loadLocal();
            !records.length && (records = cookie.get('vodplayed'), vodplayed.saveLocal(records))
        },
        getAll: function() {
            return vodplayed.loadLocal();
        },
        add: function (o) {
            var items = vodplayed.loadLocal(),
                old,
                i = 0;
            //{{{check unique
            for (; i < items.length; i++) {
                old = items[i];
                if (old.videoid == o.videoid) {
                    //覆盖旧属性
                    o = $.extend(old, o );
                    items.splice(i, 1);
                    break;
                }
            }
            //}}}
            items.unshift(o);
            items = items.splice(0,50);
            vodplayed.saveLocal(items);
            //console.log(JSON.stringify( vodplayed.loadLocal()))
        },
        del: function(id){
            var items = this.getAll(),
                i = 0
            for (; i < items.length; i++) {
                if( id && items[i].videoid == id ){
                    items.splice(i,1);
                    break;
                }
            }
            vodplayed.saveLocal(items);
        },
        clear: function() {
            vodplayed.removeAll();
        }
    }
    /*window.PlayList = {

    }*/
})