if (!window.Nova) window.Nova={};

Nova.PlayerCookie = {
    set : function (name,value,days,path,domain) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
		if(path==undefined || path ==null || path==""){path="/";}
		domain=".m1905.com";
		//if(domain==undefined || domain ==null || domain==""){domain=".m1905.com";}
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

Nova.Cookie = {
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

var setCookieAll = function(items) {
    try{
	    Nova.PlayerCookie.set("videolist",JSON.stringify(items),7);
    }catch(e){}
} 
 
var getCookieAll = function() {
	try{
		var value = Nova.PlayerCookie.get("videolist");	
		var items=JSON.parse(value);
		if (items instanceof Array){
			return items;
		}else{
			return new Array();
		}
	}catch(e){
		return new Array();
	}
}

//{{{class define
function item(){
	this.videoid="";
}

function item_watch(){
	this.cid="";
	this.index="";
	this.playTime="";
	this.totalTime="";
	this.isAuto="";
}

function PlayList(){}

PlayList.cacheTag= new Array();
//PlayList.imageQls=new Image;
//PlayList.imageQls.src="";
//PlayList.imageQlh=new Image;
//PlayList.imageQlh.src="";
//PlayList.imageQlsed=new Image;
//PlayList.imageQlsed.src="";

PlayList.setPosition = function(videoid,position,callback){
	position=parseInt(position);
	var items = this.getAll();
	var items_new = new Array();
	var flag=false;
	var added=false;
	if(position>0 && position<items.length+1){
		for(i=0;i<=items.length;i++){
			if(!added){
				if(flag){
					if(i==position){
						var it = new item;
						it.videoid=videoid;
						items_new.push(it);
						added=true;
					}
				}else{
					if(i+1==position){
						var it = new item;
						it.videoid=videoid;
						items_new.push(it);
						added=true;
					}
				}
			}
			try{
				if(videoid != items[i].videoid){
					items_new.push(items[i]);
				}else{
					flag=true;
				}
			}catch(e){}
		}
		this.setAll(items_new);
		if(callback != undefined && callback !=""){
			try{
				callback();
			}catch(e){
			}
		}
	}else{
		alert("你输入的位置超过了范围");
		return false;
	}
}

PlayList.isRemoveOnPlayComplete="";
PlayList.setRemove = function(){
	var isRemoveOnPlayComplete = Nova.Cookie.get("isRemoveOnPlayComplete");
	if(isRemoveOnPlayComplete != "true"){
		isRemoveOnPlayComplete = true;
	}else{
		isRemoveOnPlayComplete = false;
	}
	this.isRemoveOnPlayComplete = isRemoveOnPlayComplete;
	Nova.Cookie.set("isRemoveOnPlayComplete",isRemoveOnPlayComplete,360);

}
//设置为默认删除
PlayList.initRemove = function(){
	var isRemoveOnPlayComplete = Nova.Cookie.get("isRemoveOnPlayComplete");
	if(isRemoveOnPlayComplete != "true" && isRemoveOnPlayComplete!="false"){
		isRemoveOnPlayComplete = true;
		this.isRemoveOnPlayComplete = isRemoveOnPlayComplete;
		Nova.Cookie.set("isRemoveOnPlayComplete",isRemoveOnPlayComplete,360);
	}

}

PlayList.isAutoNextOnPlayComplete="";
PlayList.setAutoNext = function(){
	var isAutoNextOnPlayComplete = Nova.Cookie.get("isAutoNextOnPlayComplete");
	if(isAutoNextOnPlayComplete != "true"){
		isAutoNextOnPlayComplete = true;
	}else{
		isAutoNextOnPlayComplete = false;
	}
	this.isAutoNextOnPlayComplete = isAutoNextOnPlayComplete;
	Nova.Cookie.set("isAutoNextOnPlayComplete",isAutoNextOnPlayComplete,360);

}
//设置为默认连续播放
PlayList.initAutoNext = function(){
	var isAutoNextOnPlayComplete = Nova.Cookie.get("isAutoNextOnPlayComplete");
	if(isAutoNextOnPlayComplete != "true" && isAutoNextOnPlayComplete!="false"){
		isAutoNextOnPlayComplete = true;
		this.isAutoNextOnPlayComplete = isAutoNextOnPlayComplete;
		Nova.Cookie.set("isAutoNextOnPlayComplete",isAutoNextOnPlayComplete,360);
	}
}

PlayList.next = function (videoid){

}
//增加一个视频到用户点播单
PlayList.add = function(videoid,title,logo){
	var items = this.getAll();
	try{
		var i = new item;
		i.videoid=videoid;
		items.push(i);
                //$("#PlayListFlag_" + videoid).attr('class','picvi_active');
	}catch(e){
	}
	this.setAll(items);

}
PlayList.getAll = function(){
	try{
		var items=JSON.parse(Nova.Cookie.get("PlayList"));
		if (items instanceof Array){
			return items;
		}else{
			throw "false";
		}
	}catch(e){
		return new Array();
	}
}
PlayList.setAll = function(items){
	try{
		Nova.Cookie.set("PlayList",JSON.stringify(items),360);
	}catch(e){
	}
}
PlayList.check = function(videoid){
	var items = this.getAll();
	for(i=0;i<items.length;i++){
		if(videoid == items[i].videoid){
			return true;
		}
	}
	return false;
}
PlayList.getNext = function(videoid)
{
	var index = -1;
	var items = this.getAll();
	for(i=0;i<items.length;i++){
		if(videoid == items[i].videoid){
			index = i;
			break;
		}
	}
	index = index+1;
	if(index>=items.length)
		return false;
	
	return items[index].videoid;
}
PlayList.del = function(videoid,callback){
	var items = this.getAll();
	var items_new = new Array();
	for(i=0;i<items.length;i++){
		if(videoid != items[i].videoid){
			items_new.push(items[i]);
		}
	}
	this.setAll(items_new);
	if(callback != undefined && callback !=""){
		try{
			callback();
                        //$("#PlayListFlag_" + videoid).attr('class','picvi_a');
		}catch(e){
		}
	}
}
PlayList.clean = function(callback){
	var items_new = new Array();
	this.setAll(items_new);
	if(callback != undefined && callback !=""){
		try{
			callback();
		}catch(e){
		}
	}
}
PlayList.list = function (start,end){}
//获取用户的点播单数目
PlayList.getNum = function(){
}
PlayList.render = function(img,callback){
		
		if(img.id==undefined){
			//参数是直接的ID，兼容以前模式
			var videoid = img;
		}else{
			var tmp=img.id.split("_");
			if(tmp[1]==undefined || tmp[1]==""){return;}
			var videoid = tmp[1];
		}
		if(!this.check(videoid)){
			this.add(videoid,img.title,img.src);
		}else{
			this.del(videoid);
		}
		PlayList.init();
		if(callback != undefined && callback !=""){
			try{
				callback();
			}catch(e){}
		}
		
}
PlayList.init = function(module){
	try{
		if(PlayList.cacheTag.length==0){
			var list=[document.getElementsByTagName('div')];
			var f=true;
		}else{
			var list = [PlayList.cacheTag];
			var f=false;
		}
		var items = this.getAll();
		var n = list.length;
		while(n-- > 0) {
			var n2=list[n].length;
			while(n2-->0){
				var inPlayList =false;
				var o= list[n][n2];
				if( o.id == undefined || o.id =="" )continue;
				
				var tmp =o.id.split("_");
				if(tmp[0]!="PlayListFlag" || tmp[1]==undefined || tmp[1]=="")continue;
				var videoId= tmp[1];
				if(f)PlayList.cacheTag=PlayList.cacheTag.concat(o);

				for(var i=0;i<items.length;i++){
					if(videoId == items[i].videoid){
						inPlayList=true;
						break;
					}
				}

				if(o.onclick == undefined || o.onclick == "") {
					o.onclick = function(){
						PlayList.render(this,PlayListIndexCallback);
					}
				}
				if(inPlayList){
					o.title="从点播单移除";
					o.onmouseout=function(){}
					o.onmouseover=function(){}
					if(o.nodeName.toLowerCase()=="img"){
						//if(o.src.indexOf("qlus.gif")>-1)continue;
						//o.style.display="block";
						//o.src=PlayList.imageQlsed.src;
					}else if(o.nodeName.toLowerCase()=="div"){
						o.className = 'picvi_active';
						o.innerHTML = '已经加入播放列表';
					}
				}else{
					o.title="添加到点播单";
					if(o.nodeName.toLowerCase()=="img"){
						//if(o.src.indexOf("qlus.gif")>-1)continue;
						//o.style.display="block";
						//o.src=PlayList.imageQls.src;
						//o.onmouseout=function(){ this.src=PlayList.imageQls.src;}
						//o.onmouseover=function(){ this.src=PlayList.imageQlh.src;}
					}else if(o.nodeName.toLowerCase()=="div"){
						o.className = 'picvi_a';
						o.onmouseout = function(){this.className = 'picvi_a';this.innerHTML = '';};
						o.onmouseover = function(){this.className = 'picvi_ahover';this.innerHTML = '加入播放列表';};
					}
				}
			}
		}
	}catch(e){}
	this.initAutoNext();
	this.initRemove();
}
//{{{user interface
function PlayListIndexCallback(){
	
}
function PlayListIndexAdd(item) {
    var g = document.createElement("a");
    g.href="/v/show/id/"+item.videoid;
    g.innerHTML='<img style="margin:2px; padding:2px" src="'+item.logo+'" width="36" height="27" border="0" />';
    document.getElementById("PlayListIndexContenter").appendChild(g);
}

function PlayListSave(){
		if(islogin()){
		PlayListSaveDialog();
		}else{
		login(PlayListSaveDialog);
		}
}
function PlayListSaveDialog(r){
	try{
	Dialog.cancelCallback()
	}catch(e){}
    if(pop!=null)pop.close();
    pop=new Popup({contentType:1,isSupportDraging:false,isReloadOnClose:false,width:580,height:480});
    pop.setContent("title","");
    pop.setContent("contentUrl", "/v/showPlayListSave");
    pop.build();
    pop.show();
}

function addHotVideoToQuickList(){
	
	if(!PlayList) setTimeout(this.addHotVideoToQuickList, 1000);
	var hotVideos = document.getElementsByName('hotVideoList');
	if(undefined == hotVideos || hotVideos.length == 0) return;
	
	for(var i=0; i<hotVideos.length; ++i){
		var videoId = hotVideos[i].id;
		
		if(!PlayList.check(videoId)) {
			PlayList.add(videoId);
		}
	}
	PlayListIndexCallback();
	
	// 得到开始播放的视频ID
	var items = PlayList.getAll();
	if(items.length <= 0) return;
	
	// 开始播放
	window.location.href='/video/play/'+items[0].videoid+'.shtml';
}

//{{{记录已经播放的视频
PlayList.addPlayed = function(o){
	var key="PlayListPlayed";
	var items = new Array();
	try{
		var items_tmp = JSON.parse(Nova.Cookie.get(key));
		if (items_tmp instanceof Array){
			items = items_tmp;
		}
	}catch(e){}
	//{{{check unique
	for(var i=0;i<items.length;i++){
			if(	
				(items[i].folderid!=undefined && items[i].folderid == o.folderid)|| 
				(items[i].showid!=undefined && items[i].showid== o.showid)|| 
				items[i].videoid == o.videoid
			){
					items.splice(i,1);
					break;
			}
	}
	//}}}
	try{
		var i = new item;
		i.videoid=o.videoid;
		if(o.folderid){ i.folderid = o.folderid }
		if(o.showid){ i.showid= o.showid}
		if(o.order){ i.order= o.order}
		if(o.pos){ i.pos = o.pos}
		items.unshift(i);
		items = items.slice(0,10);
	}catch(e){}
	Nova.Cookie.set(key,JSON.stringify(items),360);
}
PlayList.delPlayed = function(o){
	var items = getCookieAll();
    var len =items.length;
    for(var i=0;i<len;i++){
	  if((o && items[i][0] == o)){
	    items.splice(i,1);
		break;
	  }
	}
	setCookieAll(items);
}
//}}}
//{{{记录视频书签
PlayList.tag="PlayListTag";
PlayList.addTag= function(o){
	if(!o || !o.ns || !o.ns.time || !o.ns.alltime)return;
	o.ns.time = parseInt(o.ns.time); o.ns.alltime = parseInt(o.ns.alltime);
	if(o.ns.time<180 || o.ns.alltime<600)return;
	if(o.ns.time>o.ns.alltime-180)return;
	//if(o.ns.time>o.ns.alltime-10)return;
	var items = new Array();
	try{
		var items_tmp = JSON.parse(Nova.Cookie.get(PlayList.tag));
		if (items_tmp instanceof Array){
			items = items_tmp;
		}
	}catch(e){}
	//{{{check unique
	for(var i=0;i<items.length;i++){
			if(	
				(items[i].folderid!=undefined && items[i].folderid == o.folderid)|| 
				(items[i].showid!=undefined && items[i].showid== o.showid)|| 
				items[i].videoid == o.videoid
			){
					items.splice(i,1);
					break;
			}
	}
	//}}}
	try{
		var i = new item;
		i.videoid=o.videoid;
		if(o.folderid){ i.folderid = o.folderid }
		if(o.showid){ i.showid= o.showid}
		if(o.order){ i.order= o.order}
		if(o.pos){ i.pos = o.pos}
		if(o.ns.time){ i.sec= o.ns.time}//seconds
		items.unshift(i);
		items = items.slice(0,10);
	}catch(e){}
	Nova.Cookie.set(PlayList.tag,JSON.stringify(items),15);
}
PlayList.delTag= function(o){
	var items = new Array();
	try{
		var items_tmp = JSON.parse(Nova.Cookie.get(PlayList.tag));
		if (items_tmp instanceof Array){
			items = items_tmp;
		}
	}catch(e){}
	for(var i=0;i<items.length;i++){
			if((o.folderid && items[i].folderid== o.folderid) || (o.videoid && items[i].videoid == o.videoid)){
					items.splice(i,1);
					break;
			}
	}
	Nova.Cookie.set(PlayList.tag,JSON.stringify(items),15);
}
//{{{点播过的视频
PlayList.addVodPlayed = function(o){
	var key="vodplayed";
	var items = new Array();
	try{
		var items_tmp = JSON.parse(Nova.Cookie.get(key));
		if (items_tmp instanceof Array){
			items = items_tmp;
		}
	}catch(e){}
	//{{{check unique
	for(var i=0;i<items.length;i++){
			if(	
				(items[i].folderid!=undefined && items[i].folderid == o.folderid)|| 
				(items[i].showid!=undefined && items[i].showid== o.showid)|| 
				items[i].videoid == o.videoid
			){
					items.splice(i,1);
					break;
			}
	}
	//}}}
	try{
		var i = new item;
		i.videoid=o.videoid;
		if(o.dt){ i.dt = o.dt }
		
		items.unshift(i);
		items = items.slice(0,10);
	}catch(e){}
	Nova.Cookie.set(key,JSON.stringify(items),360);
}
$(function(){
	try{
		PlayList.init();
		PlayListIndexCallback();
		if(undefined != typeof($("#addPlaylistRDVideo")))
		{
			$("#addPlaylistRDVideo").click(function(){
				addHotVideoToQuickList();
				return false;
			});
			}
		
	}catch(e){}
});