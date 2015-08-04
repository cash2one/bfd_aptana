 /**
  * Copyright (c) 2009-2011 Baifendian Information Technology Co.Ltd. All rights reserved.
  * 生成百分点推荐栏
  * @author Xiuming Wang sioomy@hotmail.com
  *
  * @version 1.1.4
  * 模板中增加了品牌容器默认ID为bfd_brand_name，建议使用A标签作为容器
  * 模板可以支持JSON数据ITEM中含有brandName和brandLink字段
  *
  * @version 1.1.3
  *	将addEvent、delEvent、getChildByClass、dispatchBFDPageEvent等方法，变成了公有方法，在外部可以引用
  *
  * @version 1.1.2
  * @whatnew
  * 增加了对buy_percent_className 标签的写入，现在客户可以在模板中定义class=buy_percent_className用来显示“购买此商品的用户有15%购买
  * 了某某商品”这样的标签
  * 现在某些必须标签即使未在模板中定义，程序也不会报错了
  * 用户可以通过设置banner实例类的page_num，使其不为零，来自定义banner每页显示的商品个数（当然也可以使用模板中控制UL中的LI个数指
  * 定）
  * 商品图片增加了鼠标悬停提示
  */
(function(window) {
	/**
	 * @namespace 该命名空间下包含用于界面展示的相关函数
	 * @memberOf BCore
	 */
	BCore.ui = {};
	
	/**
	 * @class 创建浮动框
	 */
	function FloatBanner(){
		this.template = '<div id="floatbox" class="floatbox">\
								<div class="bottombox" id="bottombox">\
									<div id="bfd_float_content" class="bfd_float_content">\
										<div id="bfd_con_main" class="bfd_con_main">\
										</div>\
									</div>\
									<div class="bfd_right" id="bfd_right">\
										<ul class="bfd_txt">\
										</ul>\
									</div>\
									<div class="bfd_logo"><a href="http://www.baifendian.com" target="_blank"></a></div>\
								</div>\
							  </div>';
	
		
		this.bannerdata = {};
		this.price_tag = unescape("%uFFE5");
		
	}
	
	
	FloatBanner.prototype.push = function(title,data){
		//判断数据是否有效
		
		var json = new BCore.responses.Response(data);
		if(!(json.recs&&json.recs.length>0)){
			return false;
		}

		this.bannerdata[title] = data;
	}
	
	FloatBanner.prototype.create = function(){
		
		//验证this.bannerdata是否有数据，若没数据则返回
		var havedata = false;
		for(var key in this.bannerdata){
			if(typeof(this.bannerdata[key])=="function")continue;
			havedata = true;
		}
		if(!havedata)return false;
		
		//逻辑开始
		
		var floatdiv = document.createElement("DIV");
		floatdiv.style.height = "68px";
		floatdiv.style.width = "100%";
		floatdiv.innerHTML = this.template;
		document.body.appendChild(floatdiv);
		var i = 0;
		for(var key in this.bannerdata){
			if(typeof(this.bannerdata[key])=="function")continue;
			
			var json = new BCore.responses.Response(this.bannerdata[key]);
			
			if(json.code==0&&json.recs.length>0){
				var myul = document.createElement("UL");
				
				for(var j=0;j<json.recs.length;j++){
					var myli = document.createElement("LI");
					var item = json.recs[j];
					if(item.name==null)continue;
					
					// 注意在购买链接上加了"reqId"一项参数，用于表示此次展示是否来自推荐
					// 这是百分点在实现自己的演示站点时的经验，作为您的参考	
					if (item.url.indexOf("req_id=") == -1) {
						if ( item.url.indexOf( "?" ) < 0 ) {
							item.url = item.url + "?req_id=" + json.reqId;
						} else {
							item.url = item.url + "&req_id=" + json.reqId;
						}
					}
					
					
					var htmlstr = '<A href="'+item.url+'"><IMG class=bfd_small alt="'+item.name+'" src="'+item.img+'"/></A><P>'+item.name+'</P><DIV><A href="'+item.url+'" target=_blank>\
									<IMG alt="'+item.name+'" src="'+item.img+'" width="100%"></A>\
									<H3><A href="'+item.url+'">'+item.name+'</A></H3><P>'+this.price_tag+item.price+'</P></DIV>';
					myli.innerHTML = htmlstr;
					myul.appendChild(myli);
				}
				getChildByClass(floatdiv,"bfd_con_main")[0].appendChild(myul);
			}
			
			var mytitle = document.createElement("LI");
			mytitle.innerHTML = key;
			getChildByClass(floatdiv,"bfd_txt")[0].appendChild(mytitle);
			i++;
		}
		
		//执行各种事件
		var box = document.getElementById("floatbox");
		var bottombox = document.getElementById("bottombox");
		var bfd_float_content = document.getElementById("bfd_con_main");
		var bfd_right = document.getElementById("bfd_right");
		var bfd_con_ul = bfd_float_content.getElementsByTagName("ul");
		var bfd_img_small = bfd_float_content.getElementsByTagName("li");
		var bfd_rg_li = bfd_right.getElementsByTagName("li");
		var bfd_img_big = bfd_float_content.getElementsByTagName("div"); 
		var i = 0,len = bfd_img_small.length,oTimer = null,now = 0,autoPlayTimer = null,isTrue = true,outIndex = null;
		bfd_rg_li[0].style.display = "block";
		
		
		
		for(i=0; i<len; i++){
			var bfd_img = bfd_img_small[i].getElementsByTagName('img')[0];
			bfd_img.index = i;
			bfd_img_big[i].index = i;
			bfd_img.onmouseover = function(){
				clearInterval(autoPlayTimer);
				bottombox.className = "bottombox";
				var index = this.index;
				if(index != outIndex){
					doZoom(index);
				}else{
					bfd_img_big[index].style.display = 'block';
				}
			};
			bfd_img.onmouseout = function(){
				var index = this.index;
				oTimer = setTimeout(function(){
					bfd_img_big[index].style.display = "none";
					oTimer=null;
				},100);
				autoPlay();
			};
			bfd_img_big[i].onmouseover = function(ev){
				clearInterval(autoPlayTimer);
				bottombox.className = "bottombox";
				clearTimer();
			};
			bfd_img_big[i].onmouseout = function(ev){
				var oEvent=ev||event;
				outIndex = this.index;
				if(isMouseLeaveOrEnter(oEvent, this)){
					doHide(outIndex);
				}
				autoPlay();
			};
		}
		
		
		
		//阻止事件冒泡
		function isMouseLeaveOrEnter(e, handler) {    
			if (e.type != 'mouseout' && e.type != 'mouseover') return false;    
			var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;    
			while (reltg && reltg != handler)    
				reltg = reltg.parentNode;
			return (reltg != handler);
		}
		//鼠标移入小图片
		function doZoom(index){
			//初始化弹出层及大图片的宽高及位置
			var sL = bfd_img_small[index].offsetLeft;
			bfd_img_big[index].style.width = 0;
			bfd_img_big[index].style.height = 0;
			bfd_img_big[index].style.left = (sL+50)+"px";
			bfd_img_big[index].style.top = "-30px";
			var bW = 145, bH = 188, bT = -190, bL = sL-50;
			if(bL<0) bL = 0;
			bfd_img_big[index].style.display = "block";
			startMove(bfd_img_big[index],{width:bW, height:bH, left:bL, top:bT, opacity:100});
		}
		//鼠标离开弹出层
		function doHide(index){
			bfd_img_big[index].style.display = "none";
		}
		//清除定时器
		function clearTimer(){
			if(oTimer){
				clearTimeout(oTimer);
				oTimer=null;
			}
		}
		//自动播放
		function gotoPlay(index){
			
			now=index;
			var iHeight=index*bfd_con_ul[0].offsetHeight;
			startMove(bfd_float_content,{top:-iHeight});
			bottombox.className = "bottombox_active";
			for(i=0;i<bfd_con_ul.length;i++){
				bfd_con_ul[i].style.visibility = "hidden";
				bfd_rg_li[i].style.display = "none";
			}
			bfd_con_ul[index].style.visibility = "visible";
			bfd_rg_li[index].style.display = "block";
		}
		function autoPlay(){
			autoPlayTimer = setInterval(function (){
				gotoPlay((now + 1) % bfd_con_ul.length);
			}, 3000);
		}
		autoPlay();
		//动画效果
		function startMove(obj,json){
			if(obj.timer){
				clearInterval(obj.timer);
			}
			obj.timer=setInterval(function (){
				doMove(obj,json);
			}, 30);
		}
		function getStyle(obj,attr){
			return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj, false)[attr];
		}
		function doMove(obj,json){
			var iCur=0,attr='',bStop=true;
			for(attr in json){
				if(attr=='opacity'){
					iCur=parseInt(100*parseFloat(getStyle(obj, 'opacity')));
				}
				else{
					iCur=parseInt(getStyle(obj, attr));
				}
				
				var iSpeed=(json[attr]-iCur)/2;
				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
				if(json[attr]!=iCur){
					bStop=false;
				}
				if(attr=='opacity'){
					obj.style.filter="alpha(opacity:"+(iCur+iSpeed)+")";
					obj.style.opacity=(iCur+iSpeed)/100;
				}else{
					obj.style[attr]=iCur+iSpeed+'px';
				}
			}
			if(bStop){
				clearInterval(obj.timer);
				obj.timer=null;
			}
		}
		//执行结束
	}
	
	
	
	
	
	
	
	function BFDBanner(id,title,json){
		json = new BCore.responses.Response(json);
		this.id = id;
		this.title = title;
		this.json = json;
		
	}
	BFDBanner.prototype.create = function(){
		//if (this.json.code != "0"||this.json.recs||this.json.recs.length == 0) return;
		var obj = new Object();
		obj[this.title] = this.json;
		var banner = new BannerEx(this.id,obj);
	}
	
	
	
	function BannerEx(id,obj){
		
		var template = '<div class="tab_box">\
    <ul class="title_label">\
    </ul>\
    <div class="box">\
    </div>\
</div>';
		
		//var boxobj = document.getElementById(id);
		
		var boxobj = document.createElement("DIV");
		boxobj.innerHTML = template;
		
		var oDiv	=getChildByClass(boxobj,'tab_box')[0];
		//var aLi		=getChildByClass(oDiv,"title_label")[0].getElementsByTagName('li');
		//var aDiv	=getChildByClass(oDiv,"bfd_box");
		
		var theul = getChildByClass(boxobj, "title_label")[0];
		
		var i = 0;
		for(var key in obj){
			if(typeof(obj[key])==="function")continue;
			
			//判断是否含有数据
			var _data = new BCore.responses.Response(obj[key]);
			if (_data.code != "0"||typeof(_data.recs)=="undefined"||_data.recs.length == 0) continue;
			
			
			var li = document.createElement("LI");
			//li.innerText = "title"+i;
			li.className = "tab_title_up";
			li.innerHTML = key;
			theul.appendChild(li);
			
		
			var box= getChildByClass(boxobj, "box")[0];
			var bfdbox = document.createElement("DIV");//<div class="bfd_box">
			bfdbox.className = "bfd_box";
			box.appendChild(bfdbox);
			
			new BannerBase(bfdbox,_data).create();
			
			//--------------
			

			
			li.miaovIndex=i;
			li.className='tab_title_up';
			li.onmouseover=function ()
			{
				var aLi		=getChildByClass(oDiv,"title_label")[0].getElementsByTagName('li');
				var aDiv	=getChildByClass(oDiv,"bfd_box");
				for(var j=0;j<aLi.length;j++)
				{
					aLi[j].className='tab_title_up';
					aDiv[j].style.display='none';
				}
				
				this.className='tab_title_down';
				aDiv[this.miaovIndex].style.display='block';
			};
			
			i++;
			
		}
		
		if(i>0){
			var aLi		=getChildByClass(oDiv,"title_label")[0].getElementsByTagName('li');
			var aDiv	=getChildByClass(oDiv,"bfd_box");
			for(var j=0;j<aLi.length;j++)
			{
				aLi[j].className='tab_title_up';
				aDiv[j].style.display='none';
			}
			aLi[0].className='tab_title_down';
			aDiv[0].style.display='block';
			document.getElementById(id).appendChild(boxobj);
		}
		
		
		
	}
	
	
	
	
	/**
	 * @class BFDBannerBase
	 * @constructor
	 * @param {String} banner_div_id HTML页面上的推荐栏相应的div ID, 推荐内容将放置在该div中
	 * @param {String} title 推荐栏的标题
	 * @param {String} json 从百分点推荐引擎获得的某一推荐结果，JSON格式数据
	 * @returns BFDBanner
	 注：
	 1.模板的结构可以根据需要随意变化但是，
	 2.若自定义模板，默认模板中含有的 className一定要包含在内，
	 3.如果,需要修改模板标签中的classname那么，需要设置对象属性，如this.title_className = 你的新名称)，
	 4.class=bfd_item的标签，一定要放在class=bfd_content标签中
	 5.程序根据模板中的bfd_item的个数，来生成每页的产品数
	 */
	 
	function BannerBase(target, json) {
		json = new BCore.responses.Response(json);
		this.template = '<div class="bfd_pre_btn"></div>\
			<ul class="bfd_content">\
			  <li class="bfd_item">\
			  <span class="bfd_product_img"><a href="#" class="bfd_thumb_link" target="_blank" ><img class="bfd_thumb" src="" width="100" height="100"/></a></span>\
			  <span class="bfd_price">price</span>\
			  <span class="bfd_percent_box"><div class="bfd_buy_percent">5%</div>&nbsp;会买</span>\
			  <span class="bfd_name"><a href="#" class="bfd_item_name" target="_blank">ItemName</a></span>\
			  </li>\
			  <li class="bfd_item">\
			  	<!--bypass-->\
			  </li>\
			  <li class="bfd_item">\
			  	<!--bypass-->\
			  </li>\
			  <li class="bfd_item">\
			  	<!--bypass-->\
			  </li>\
			  <li class="bfd_item">\
			  	<!--bypass-->\
			  </li>\
			</ul>\
			<div class="bfd_next_btn" style=" float:right"></div>\
			<a href="http://www.baifendian.com/" target="_blank"  class="bfd_img_logo"></a>\
		';
		
		this.self = target;
		
		
		
		
		this.data = json;
		
		
		this.next_btn = null;
		
		this.pre_btn = null;
		
		this.content = null;
		
		this.bfd_item = null;
		
		this.page_label = null;
		
		
		this.page = 0;
		
		this.page_max = 0;
		
		this.page_num = 0;
		
		this.record_max = 0;
		
		
		//public 可以更改一下参数，来更改模版的名称
		
		/** 
		 * @String 货币符号
		 */
		this.price_tag = unescape("%uFFE5");
		
		/** 
		 * @String 翻页信息class名称
		 */
		this.page_label_className = "bfd_page";
		
		/** 
		 * @String 产品容器class名称
		 */
		this.content_className = "bfd_content";
		
		/** 
		 * @String 上一页按钮class名称
		 */
		this.pre_btn_className = "bfd_pre_btn"; 
		
		/** 
		 * @String 下一页按钮class名称
		 */
		this.next_btn_className = "bfd_next_btn";
		
		/** 
		 * @String 商品class名称
		 */
		this.item_className = "bfd_item";
		
		/** 
		 * @String 商品链接class名称
		 */
		this.thumb_link_className = "bfd_thumb_link";
		
		/** 
		 * @String 商品图片class名称
		 */
		this.thumb_className = "bfd_thumb";
		
		/** 
		 * @String 商品价格class名称
		 */
		this.price_className = "bfd_price";
		
		/** 
		 * @String 商品名称class名称
		 */
		this.item_name_className = "bfd_item_name";
		
		/** 
		 * @String 商品品牌class名称
		 */
		this.item_brand_className = "bfd_brand_name";
		
		/** 
		 * @String 购买按钮class名称
		 */
		this.buy_link_className = "bfd_buy_link";
		
		/** 
		 * @String 原价class名称
		 */
		this.original_price_className = "bfd_original_price";
		
		/** 
		 * @String 买了还买了百分比
		 */
		this.buy_percent_className = "bfd_buy_percent";
	}
	
	/**
	 * 公共方法 添加事件方法 侦听翻页事件    callbackHander 回调函数
	 */
	BannerBase.addListenerBFDEvent = function(callbackHander) {
		if (window.attachEvent) {//ie
			if (document.getElementById("BFD_PAGE_CHANGE")==null) {
				var bfd_page_event = document.createElement( "DIV" );
				bfd_page_event.style.display = "none";
				bfd_page_event.id = "BFD_PAGE_CHANGE";
				document.body.appendChild(bfd_page_event);
			}
			document.getElementById("BFD_PAGE_CHANGE").onclick = function(event) {
				var target = BCore.ui.bfdcurrentTarget;
				callbackHander(target);
			};
		} else {
			document.addEventListener("BFD_PAGE_CHANGE", function(event) {
				var target = event.bfdcurrentTarget;
				callbackHander(target);
			}, false);
		}
	}

	/**
	 * 私有方法，用于翻页
	 */
	BannerBase.prototype.showRecord = function(){
		//清空content
		if (this.content) {
			this.content.innerHTML = "";
		}
		
		//更改翻页标签
		if (this.page_label) {
			this.page_label.innerHTML = (this.page+1) + "/" + this.page_max;
		}
		
		//显示第一页记录
		for (var i=this.page*this.page_num; i<Math.min(this.record_max, ((this.page+1)*this.page_num)); i++) {
			
			var is_available = true;
			
			for(var key in this.data.recs[i]){
				if(!this.data.recs[i][key]){
					is_available = false;
					break;
				}
			}
			if(!is_available){
				continue;
			}
			
			var item = this.data.recs[i];	// 一项完整的推荐结果
			// 注意在商品链接上加了"reqId"一项参数，用于表示此次展示是否来自推荐
			// 这是百分点在实现自己的演示站点时的经验，作为您的参考	
			if (item.url.indexOf("req_id=") == -1) {
				if ( item.url.indexOf( "?" ) < 0 ) {
					item.url = item.url + "?req_id=" + this.data.reqId;
				} else {
					item.url = item.url + "&req_id=" + this.data.reqId;
				}
			}
			
			if (!this.bfd_item) continue;

			var tmpitem = this.bfd_item.cloneNode(10);
			var quotes_reg=new RegExp("&quot;","g");//引号正则
			if (this.thumb_link_className) {
				var thumblink = getChildByClass(tmpitem, this.thumb_link_className)[0];
				thumblink.setAttribute("href", item.url);
				thumblink.setAttribute("href", item.url);
				thumblink.setAttribute("title", item.name.replace(quotes_reg,"\""));
			}
			if (this.thumb_className) {
				var thumb = getChildByClass(tmpitem, this.thumb_className)[0];
				thumb.setAttribute("src", item.img);
				thumb.setAttribute("title", item.name.replace(quotes_reg,"\""));
				thumb.setAttribute("alt", item.name.replace(quotes_reg,"\""));
			}
			if (this.price_className) {
				var price = getChildByClass(tmpitem, this.price_className)[0];
				price.innerHTML = this.price_tag + item.price;
			}
			if (this.item_name_className) {
				var item_name = getChildByClass(tmpitem, this.item_name_className)[0];
				item_name.innerHTML = item.name;
				item_name.setAttribute("href", item.url);
				item_name.setAttribute("title", item.name.replace(quotes_reg,"\""));
			}
			//alert(this.buy_percent_className);
			if (this.buy_percent_className) {
				var percent = getChildByClass(tmpitem, this.buy_percent_className)[0];
				//alert(item.weight);
				if (percent) {
					percent.innerHTML = parseInt(parseFloat(item.weight)*100)+"%";
				}
			}
			
			if (this.item_brand_className) {
				var brand_name = getChildByClass(tmpitem, this.item_brand_className)[0];
				//alert(item.weight);
				if (brand_name) {
					brand_name.innerHTML = item.brandName;
					brand_name.setAttribute("href", item.brand);
					brand_name.setAttribute("title", item.brand.replace(quotes_reg,"\""));
				}
			}
			
			if (this.buy_link_className) {
				var buy_link = getChildByClass(tmpitem, this.buy_link_className)[0];
				if (buy_link) {
					
					
					// 注意在购买链接上加了"reqId"一项参数，用于表示此次展示是否来自推荐
					// 这是百分点在实现自己的演示站点时的经验，作为您的参考	
					if (item.buyLink.indexOf("req_id=") == -1) {
						if ( item.buyLink.indexOf( "?" ) < 0 ) {
							item.buyLink = item.buyLink + "?req_id=" + this.data.reqId;
						} else {
							item.buyLink = item.buyLink + "&req_id=" + this.data.reqId;
						}
					}
					
					buy_link.setAttribute("href", item.buyLink);
				}
			}
			
			if (this.original_price_className) {
				var original_price = getChildByClass(tmpitem, this.original_price_className)[0];
				if (original_price) {
					original_price.innerHTML = unescape("%uFFE5")+item.originalPrice;
				}
			}
			
			this.content.appendChild(tmpitem);
		}
		
		dispatchBFDPageEvent(this);
	}
	
	/**
	 * 设置模板
	 * @param {String} tmp_html 模板HTML代码
	 */
	BannerBase.prototype.setTemplate = function(tmp_html) {
		this.template = tmp_html;
	}
	
	/**
	 * 生成控件
	 */
	BannerBase.prototype.create = function() {
		
		var thisObj = this;
		
		
		this.self.innerHTML = this.template;
		
		var pre_btns = getChildByClass(this.self, this.pre_btn_className);
		this.pre_btn = pre_btns.length>0 ? pre_btns[0] : undefined;
		
		var next_btns = getChildByClass(this.self, this.next_btn_className);
		this.next_btn = next_btns.length>0 ? next_btns[0] : undefined;
		
		var contents = getChildByClass(this.self, this.content_className);
		this.content = contents.length>0 ? contents[0] : undefined;
		
		var bfd_items = getChildByClass(this.self, this.item_className);
		this.bfd_item = bfd_items.length>0 ? bfd_items[0].cloneNode(10) : undefined;//先克隆10层
		
		var page_labels = getChildByClass(this.self, this.page_label_className);
		this.page_label = page_labels.length>0 ? page_labels[0] : undefined;
		
		//计算页数
		this.page_num = this.page_num!=0 ? this.page_num : getChildByClass(this.self, this.item_className).length;//每页显示的条数
		this.record_max = this.data.recs.length;
		this.page_max = Math.ceil(this.record_max / this.page_num);
		
		this.showRecord();
		
		//添加按钮事件
		if (this.pre_btn) {
			addEvent(this.pre_btn, "click", function(event) {
				if(thisObj.page > 0)
					thisObj.page--;
				thisObj.showRecord();
			});
		}
		if (this.next_btn) {
			addEvent(this.next_btn, "click", function(event) {
				if(thisObj.page<thisObj.page_max-1)
					thisObj.page++;
				thisObj.showRecord();
			});
		}
	}
	
	/**
	 * 派发事件
	 */
	function dispatchBFDPageEvent(target) {
		//派发事件
		if (!window.attachEvent) {
			var changeEvent = document.createEvent("Events");
			changeEvent.initEvent("BFD_PAGE_CHANGE", true, true);
			changeEvent.bfdcurrentTarget = target;
			document.dispatchEvent(changeEvent);
		} else { //IE
			if (document.getElementById("BFD_PAGE_CHANGE") == null) {
				var bfd_page_event = document.createElement("DIV");
				bfd_page_event.style.display = "none";
				bfd_page_event.id = "BFD_PAGE_CHANGE";
				document.body.appendChild(bfd_page_event);
			}
			if (document.getElementById("BFD_PAGE_CHANGE") != null) {
				//document.getElementById("BFD_PAGE_CHANGE").bfdcurrentTarget = target;
				BCore.ui.bfdcurrentTarget = target;
				document.getElementById("BFD_PAGE_CHANGE").fireEvent("onclick");
			}
		}
	}
	
	/**
	 * 私有方法：查找目标中Class=value的标签 若没找到，则返回空数组
	 */
	function getChildByClass(target, value){
		var result = new Array();
		for (var i = 0; i < target.childNodes.length; i++) {
			var myelement = target.childNodes.item(i);
			//如果该节点有属性
			if (myelement.nodeType == 1) {//1为dom
				if (myelement.className == value) {
					result.push(myelement);
				}
			}
			
			//如果有子节点 则查询子节点
			if(myelement.hasChildNodes()) {
				var tmp = getChildByClass(myelement,value);
				if (tmp.length != 0) {
					result = result.concat(tmp);
				}
			}
		}
		
		return result;
	}
	
	/**
	 * 私有方法：添加事件方法
	 */
	function addEvent(target, eventName, callbackHander) {
		if (window.attachEvent) {
			target.attachEvent("on" + eventName, callbackHander);
		} else {
			target.addEventListener(eventName, callbackHander, false);
		}
	}

	/**
	 * 私有方法：删除事件方法
	 */
	function delEvent(target, eventName) {
		if (window.attachEvent) {
			target.detachEvent("on"+eventName, target["on"+eventName]);
		} else {
			target.removeEventListener(eventName,target[eventName], false);
		}
	}
	
	//------------------------百分点云导购推荐栏-----------------------------
	function CloudBanner(json, key) {
		var jsons = new BCore.responses.Response(json[key]);
	    CloudBanner.prototype.json = jsons;  
		CloudBanner.prototype.setTemplate(jsons);		
    }
    CloudBanner.prototype.template = '';        
    CloudBanner.prototype.contentTemplet = ''

    CloudBanner.prototype.push = function(title,data){
        //判断数据是否有效
        
        var json = new BCore.responses.Response(data);
        if(!(json.recs&&json.recs.length>0)){
            return false;
        }

        this.bannerdata[title] = data;
    }
    CloudBanner.prototype.setTemplate = function(json) {
		var item1 = json.recs[0];
		var item2 = json.recs[1];
		var item3 = json.recs[2];
		if(item1 && item2 && item3)
        CloudBanner.prototype.template = '<DIV id=pd0u2 style="position:absolute; left:0px; top:0px; width:1px; height:1px;">'+
            '<DIV id=u3_container class="u3_container">'+
               '<DIV id="u3_img" class="u3_original"></DIV>'+
                    '<DIV id=u4 class="u4" >'+
                        '<DIV id=u4_rtf>&nbsp;</DIV>'+
                    '</DIV>'+
                '</DIV>'+
                '<IMG id=u3 src="http://static.baifendian.com/themes/float/images/transparent.gif" class="u3" />'+        
        
                '<DIV id=u5 class="u5" >'+
                    '<DIV id=u5_rtf>'+
                        '<p style="text-align:left;"><span style="font-family:微软雅黑;font-size:18px;font-weight:normal;font-style:normal;text-decoration:none;color:#333333;">陪你逛</span></p>'+
                    '</DIV>'+
                '</DIV>'+
                '<DIV id=u6_container class="u6_container">'+
                    '<DIV id="u6_img" >'+
                        '<IMG src="'+item1.img+'" class="raw_image"/>'+
                    '</DIV>'+
                    '<DIV id=u7 class="u7" >'+
                        '<DIV id=u7_rtf>&nbsp;</DIV>'+
                    '</DIV>'+
                '</DIV>'+
                '<IMG id=u6 src="http://static.baifendian.com/themes/float/images/transparent.gif" class="u6"/>'+
        
                '<DIV id=u8_container class="u8_container">'+
                    '<DIV id="u8_img" >'+
                        '<IMG src="'+item2.img+'" class="raw_image"/>'+
                    '</DIV>'+
                '<DIV id=u9 class="u9" >'+
                    '<DIV id=u9_rtf>&nbsp;</DIV>'+
                '</DIV>'+
            '</DIV>'+
            '<IMG id=u8 src="http://static.baifendian.com/themes/float/images/transparent.gif" class="u8"/>'+
        
            '<DIV id=u10_container class="u10_container">'+
                '<DIV id="u10_img" >'+
                    '<IMG src="'+item3.img+'" class="raw_image">'+
                '</DIV>'+
                '<DIV id=u11 class="u11" >'+
                    '<DIV id=u11_rtf>&nbsp;</DIV>'+
                '</DIV>'+
            '</DIV>'+
            '<IMG id=u10 src="http://static.baifendian.com/themes/float/images/transparent.gif" class="u10"/>'+
        
            '<DIV id=u12_container class="u12_container">'+
                '<DIV id="u12_img" class="u12_original"></DIV>'+
                '<DIV id=u13 class="u13" >'+
                '<DIV id=u13_rtf>&nbsp;</DIV>'+
            '</DIV>'+
        '</DIV>'+
        '<INPUT type="image" id=u12 src="http://static.baifendian.com/themes/float/images/transparent.gif" class="u12" />'+
        
        '<DIV id=u14_text class="u14_text" >'+
            '<DIV id=u14_rtf>'+
                '<p style="text-align:left;"><span style="font-family:微软雅黑;font-size:13px;font-weight:normal;font-style:normal;text-decoration:none;color:#333333;">百分点云导购</span></p>'+
            '</DIV>'+
        '</DIV>'+
        '<INPUT type="image" id=u14 src="http://static.baifendian.com/themes/float/images/transparent.gif" class="u14"/ >'+
        
        '<DIV id=u15_text class="u15_text" >'+
            '<DIV id=u15_rtf>'+
                '<p style="text-align:left;"><span style="font-family:微软雅黑;font-size:13px;font-weight:bold;font-style:normal;text-decoration:none;color:#990000;">￥'+item1.price+'</span></p>'+
            '</DIV>'+
        '</DIV>'+
        '<IMG id=u15 src="http://static.baifendian.com/themes/float/images/transparent.gif" class="u15"/>'+
        
        '<DIV id=u16_text class="u16_text" >'+
            '<DIV id=u16_rtf>'+
                '<p style="text-align:left;"><span style="font-family:微软雅黑;font-size:13px;font-weight:bold;font-style:normal;text-decoration:none;color:#990000;">￥'+item2.price+'</span></p>'+
            '</DIV>'+
        '</DIV>'+
        '<IMG id=u16 src="http://static.baifendian.com/themes/float/images/transparent.gif" class="u16"/>'+
        
        '<DIV id=u17_text class="u17_text" >'+
            '<DIV id=u17_rtf>'+
                '<p style="text-align:left;"><span style="font-family:微软雅黑;font-size:13px;font-weight:bold;font-style:normal;text-decoration:none;color:#990000;">￥'+item3.price+'</span></p>'+
            '</DIV>'+
        '</DIV>'+
        '<IMG id=u17 src="http://static.baifendian.com/themes/float/images/transparent.gif" class="u17"/>'+ 
        ((item1.marketprice && item1.marketprice !== 0) ? 
		'<DIV id=u18_container class="u18_container">'+
            '<DIV id="u18_img" class="u18_original"></DIV>'+
            '<DIV id=u19 class="u19" >'+
                '<DIV id=u19_rtf>'+
                    '<p style="text-align:center;"><span style="font-family:微软雅黑;font-size:12px;font-weight:normal;font-style:normal;text-decoration:none;color:#FFFFFF;">'+(parseFloat(item1.price)/parseFloat(item1.marketprice)*10).toFixed(0)+'折</span></p>' +
                '</DIV>'+
            '</DIV>'+
        '</DIV>'+
        '<IMG id=u18 src="http://static.baifendian.com/themes/float/images/transparent.gif" class="u18"/>'
		: '') + 
		((item2.marketprice && item2.marketprice !== 0) ? 
        '<DIV id=u20_container class="u20_container">'+
            '<DIV id="u20_img" class="u20_original"></DIV>'+
            '<DIV id=u21 class="u21" >'+
                '<DIV id=u21_rtf>'+
                    '<p style="text-align:center;"><span style="font-family:微软雅黑;font-size:12px;font-weight:normal;font-style:normal;text-decoration:none;color:#FFFFFF;">'+(parseFloat(item2.price)/parseFloat(item2.marketprice)*10).toFixed(0)+'折</span></p>'+
                '</DIV>'+
            '</DIV>'+
        '</DIV>'+
        '<IMG id=u20 src="http://static.baifendian.com/themes/float/images/transparent.gif" class="u20"/>'
		: '') +
		((item3.marketprice && item3.marketprice !== 0) ? 
        '<DIV id=u22_container class="u22_container">'+
            '<DIV id="u22_img" class="u22_original"></DIV>'+
            '<DIV id=u23 class="u23" >'+
                '<DIV id=u23_rtf><p style="text-align:center;"><span style="font-family:微软雅黑;font-size:12px;font-weight:normal;font-style:normal;text-decoration:none;color:#FFFFFF;">'+(parseFloat(item3.price)/parseFloat(item3.marketprice)*10).toFixed(0)+'折</span></p></DIV>'+
            '</DIV>'+
        '</DIV>'+
        '<IMG id=u22 src="http://static.baifendian.com/themes/float/images/transparent.gif" class="u22"/>'
        : '') +
		'</DIV>';	
    }
	
	CloudBanner.prototype.setContentTemplate = function(target) {
		if(!target) return;
		var item;
		var reqId = CloudBanner.prototype.json.reqId;
		if(target.id == "u6") {
			item = CloudBanner.prototype.json.recs[0];
		} else if(target.id == "u8") {
			item = CloudBanner.prototype.json.recs[1];
		} else if(target.id == "u10") {
			item = CloudBanner.prototype.json.recs[2];
		} else{
			return;
		}
		// 注意在购买链接上加了"reqId"一项参数，用于表示此次展示是否来自推荐
		// 这是百分点在实现自己的演示站点时的经验，作为您的参考	
		if (item.url.indexOf("req_id=") == -1) {
			if ( item.url.indexOf( "?" ) < 0 ) {
				item.url = item.url + "?req_id=" + reqId;
			} else {
				item.url = item.url + "&req_id=" + reqId;
			}
		}
		CloudBanner.prototype.contentTemplet = '<div style="position:absolute; left:0px; top:0px; width:1px; height:1px;" id="pd0u24">'+
            '<div class="u25_container" id="u25_container">'+
                '<div class="u25_original" id="u25_img"></div>'+
                '<div class="u26" id="u26">'+
                    '<div id="u26_rtf">&nbsp;</div>'+
                '</div>'+
            '</div>'+
            '<img class="u25" src="http://static.baifendian.com/themes/float/images/transparent.gif" id="u25">'+
    
            '<div class="u27_text" id="u27_text">'+
                '<div id="u27_rtf">'+
                    '<p style="text-align:left;"><span style="font-family:微软雅黑;font-size:18px;font-weight:normal;font-style:normal;text-decoration:none;color:#333333;">陪你逛</span></p>'+
                '</div>'+
            '</div>'+
            '<img class="u27" src="http://static.baifendian.com/themes/float/images/transparent.gif" id="u27">'+
    
            '<div class="u28_container" id="u28_container">'+
                '<div id="u28_img">'+
                    '<img class="raw_image" src="'+item.img+'"/>'+
                '</div>'+
                '<div class="u29" id="u29">'+
                    '<div id="u29_rtf">&nbsp;</div>'+
                '</div>'+
            '</div>'+
            '<a href="'+item.url+'"><input type="image" class="u28" src="http://static.baifendian.com/themes/float/images/transparent.gif" id="u28"/></a>'+
    
            '<div class="u30_container" id="u30_container">'+
                '<div class="u30_original" id="u30_img"></div>'+
                '<div class="u31" id="u31">'+
                    '<div id="u31_rtf">&nbsp;</div>'+
                '</div>'+
            '</div>'+
            '<input type="image" class="u30" src="http://static.baifendian.com/themes/float/images/transparent.gif" id="u30">'+
    
            '<div class="u32_text" id="u32_text">'+
                '<div id="u32_rtf">'+
                    '<p style="text-align:left;"><span style="font-family:微软雅黑;font-size:13px;font-weight:normal;font-style:normal;text-decoration:none;color:#333333;">百分点云导购</span></p>'+
                '</div>'+
            '</div>'+
            '<input type="image" class="u32" src="http://static.baifendian.com/themes/float/images/transparent.gif" id="u32">'+
    
            '<div class="u33_text" id="u33_text">'+
                '<div id="u33_rtf">'+
                    '<p style="text-align:left;"><span style="font-family:微软雅黑;font-size:13px;font-weight:normal;font-style:normal;text-decoration:underline;color:#0000FF;">'+item.name+'</span></p>'+
                '</div>'+
            '</div>'+
            '<A href="'+item.url+'"><input type="image" class="u33" src="http://static.baifendian.com/themes/float/images/transparent.gif" id="u33"/></a>'+
			((item.marketprice && item.marketprice!==0) ? 
            '<div class="u34_text" id="u34_text">'+
                '<div id="u34_rtf">'+
                    '<p style="text-align:left;"><span style="font-family:微软雅黑;font-size:14px;font-weight:bold;font-style:normal;text-decoration:none;color:#666666;">￥'+item.marketprice+'</span></p>'+
                '</div>'+
            '</div>'+
            '<img class="u34" src="http://static.baifendian.com/themes/float/images/transparent.gif" id="u34">'+
			
            '<div class="u35_text" id="u35_text">'+
                '<div id="u35_rtf">'+
                    '<p style="text-align:left;"><span style="font-family:微软雅黑;font-size:16px;font-weight:bold;font-style:normal;text-decoration:none;color:#3300FF;">'+(parseFloat(item.price)/parseFloat(item.marketprice)*10).toFixed(0)+'折</span></p>'+
                '</div>'+
            '</div>'+
            '<img class="u35" src="http://static.baifendian.com/themes/float/images/transparent.gif" id="u35">'+
			
            '<div class="u36_line" id="u36_line"></div>'+
			
            '<img class="u36" src="http://static.baifendian.com/themes/float/images/transparent.gif" id="u36">'
			: '') +
            '<div class="u37_container" id="u37_container">'+
                '<div class="u37_original" id="u37_img"></div>'+
                '<div class="u38" id="u38">'+
                    '<div id="u38_rtf"><p style="text-align:center;"><span style="font-family:微软雅黑;font-size:16px;font-weight:bold;font-style:normal;text-decoration:none;color:#990000;">￥'+item.price+'</span></p></div>'+
                '</div>'+
            '</div>'+
            '<A href="'+item.url+'"><input type="image" class="u37" src="http://static.baifendian.com/themes/float/images/transparent.gif" id="u37"></a>'+            
        '</div>';  
		
	
	}
    CloudBanner.prototype.getTemplate = function() {
        return this.template;        
    }
    CloudBanner.prototype.getContentTemplate = function(){
        return this.contentTemplet;        
    }
    CloudBanner.prototype.create = function(){
   
        //逻辑开始        
        var floatdiv = document.createElement("DIV");
        floatdiv.id="u2";
        floatdiv.style.position="absolute";
        //floatdiv.style.left="1250px";
        floatdiv.style.right="0px";
        floatdiv.style.top="40px";
        floatdiv.style.overflow="hidden";
        floatdiv.style.height = "341px";
        floatdiv.style.width = "100px";
        floatdiv.innerHTML = this.template;
        document.body.appendChild(floatdiv);
	}
	
	/**
     * 遍历访问上级节点获取目标对象
     * @type    method
     * @param   currNode   当前节点对象
     * @param   targetNode 目标节点对象
     * @private
     * @return  Object     返回节点对象
    */
    CloudBanner.prototype.getParentNode = function(currNode, targetNode){
        var result = false;
        if(currNode === targetNode) return true;
        if(currNode)
            result = this.getParentNode(currNode.parentNode, targetNode);
        return result;
    }
	
	CloudBanner.prototype.handler = function(event,node) {
	    var u2 = document.getElementById("u2");
        var e = event || window.event;
		var target = window.event?window.event.srcElement:e.target 
        var relatedTarget = e.toElement || e.relatedTarget;
		
        switch(e.type) {
        case "mouseover":
			CloudBanner.prototype.setContentTemplate(target);
            u2.innerHTML = CloudBanner.prototype.getContentTemplate();
            var fn = function(e){var __this = CloudBanner.prototype;__this.handler(e,this)}
            u2.style.width = "201px";
            u2.style.right="0px";
            CloudBanner.prototype.addEvent(u2, 'mouseout',fn);
            break;
        case "mouseout" :               
            if(!(relatedTarget === node || 
                CloudBanner.prototype.getParentNode(relatedTarget, node))) {

                u2.innerHTML = CloudBanner.prototype.getTemplate();
                u2.style.width = "100px";
                u2.style.right="0px";
                var fn = function(e){var __this = CloudBanner.prototype;__this.handler(e,this)}
                var u6_container = document.getElementById("u6");
                var u8_container = document.getElementById("u8"); 
                var u10_container = document.getElementById("u10");
                CloudBanner.prototype.addEvent(u6_container, 'mouseover',fn);
                CloudBanner.prototype.addEvent(u8_container, 'mouseover',fn);
                CloudBanner.prototype.addEvent(u10_container, 'mouseover',fn);
            }               
            break;
        }
    }
	
	CloudBanner.prototype.addEvent = function(element, type, listener){
        if (element.addEventListener) {
            element.addEventListener(type, listener, false );
        } else if(element.attachEvent) {
            element.attachEvent('on' + type, listener)
        } else {
            element["on" + type] = listener;
        }
    }
    CloudBanner.prototype.delEvent = function(element, type, handler){
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false );
        } else if(element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
	
	CloudBanner.prototype.init = function(){
	
		this.setTemplate(CloudBanner.prototype.json);
	           
	    var u6_container = document.getElementById("u6");
	    var u8_container = document.getElementById("u8"); 
	    var u10_container = document.getElementById("u10");

	    var fn = function(e){var __this = CloudBanner.prototype;__this.handler(e,this)}
	    CloudBanner.prototype.addEvent(u6_container, 'mouseover',fn);
	    CloudBanner.prototype.addEvent(u8_container, 'mouseover',fn);
	    CloudBanner.prototype.addEvent(u10_container, 'mouseover',fn);	    
	}

	/*******************赢客宝推荐栏***********************/
	YkbBanner = function() {}
	YkbBanner.prototype.unexpandTemplate = '<input name="" onclick="YkbBanner.prototype.max()" type="image" style="margin-top:1px; float:left;"  src="http://static.baifendian.com/themes/ykb_float/images/bfd_br_min_01.gif" /><a href="http://www.baifendian.com" target="_blank" ><img src="http://static.baifendian.com/themes/ykb_float/images/bfd_br_min_logo.gif" style="float:right;" width="107" height="15" alt="百分点推荐引擎" border="0"/></a>';
	YkbBanner.prototype.expandAllTemplate = {
		main:'<p><input name="" onclick="YkbBanner.prototype.min(event)" type="image" style="margin-top:7px; float:right;"  src="http://static.baifendian.com/themes/ykb_float/images/bfd_br_nom_02.gif" />猜你喜欢</p><div>{#content}</div><span><a href="http://www.baifendian.com" target="_blank" ><img src="http://static.baifendian.com/themes/ykb_float/images/bfd_br_nom_logo.gif" style="float:right;" width="107" height="15" alt="百分点推荐引擎" border="0" /></a></span>',
		content:'<dl style="display:none" id="{$bfd6}"><dt><a href="{$bfd5}" target="_blank"><img src="{$bfd1}" title="{$bfd2}" width="120" height="120" class="bfd_goods_img" border="0"/></a>{#rebate}</dt><dd class="name"><a href="{$bfd5}" target="_blank" title="{$bfd2}">{$bfd2}</a></dd><dd class="price">¥{$bfd3}</dd></dl>',
		rebate:'<b>{$bfd4}折</b>',
		num:4,
		ids:[],
		html:''
	};
	YkbBanner.prototype.displayNum = 0;	
	YkbBanner.prototype.getExpandAllTemplate = function(json) {
		if(!json || json == "" || !json.recs || json.recs.length < 1) return "";
		var arrContent = [],reqId = json.reqId;
		for(var i=0; i<json.recs.length; i++) {
			var item = json.recs[i];
			if(!item) continue;
			var name = item.name,
			url = item.url,
			img = item.img,		
			price = item.price;
			var marketprice = item.marketprice ? item.marketprice : 0;
			if(img == "" && name == "" && price == "" && url == "") continue;
			if (url.indexOf("req_id=") == -1) {
				if (url.indexOf( "?" ) < 0 ) {
					url = url + "?req_id=" + reqId;
				} else {
					url = url + "&req_id=" + reqId;
				}
			}
			var content = YkbBanner.prototype.expandAllTemplate.content;
			if(parseInt(marketprice) !== 0) {
				content = content.replace("{#rebate}", YkbBanner.prototype.expandAllTemplate.rebate);
				content = content.replace(/\{\$bfd4\}/g, (parseFloat(price)/parseFloat(marketprice)*10).toFixed(0))
			} else {
				content = content.replace("{#rebate}", "");
			}	
			var ids = "bfd_img_block"+i;
			YkbBanner.prototype.expandAllTemplate.ids.push(ids);
			content = content.replace(/\{\$bfd6\}/g, ids);
			content = content.replace(/\{\$bfd1\}/g, img).replace(/\{\$bfd2\}/g, name).replace(/\{\$bfd3\}/g, price).replace(/\{\$bfd5\}/g, url);
			arrContent.push(content);
			if(arrContent.length == YkbBanner.prototype.expandAllTemplate.num) break;
		}
		var html = YkbBanner.prototype.expandAllTemplate.main;
		html = html.replace("{#content}", arrContent.join(""));
		YkbBanner.prototype.expandAllTemplate.html = html;
		return html;
	}
	YkbBanner.prototype.intervalId = 0;
	YkbBanner.prototype.intervalSlideId = 0;
	YkbBanner.prototype.seconds = 2000;
	YkbBanner.prototype.mouseoverFn = function(e) {
		var ykbrecommend = document.getElementById("ykbrecommend");
		clearInterval(YkbBanner.prototype.intervalId);  
		if(YkbBanner.prototype.checkHover(e, ykbrecommend)) {
			if(ykbrecommend.className !== "bfd_br_nom bfd_br_max") {
				ykbrecommend.className = "bfd_br_nom bfd_br_max";
			}
			YkbBanner.prototype.DisplayAllImg();
		}
	}
	
	YkbBanner.prototype.mouseoutFn = function(e) {
		var ykbrecommend = document.getElementById("ykbrecommend");
		if(YkbBanner.prototype.checkHover(e, ykbrecommend)) {
			if(ykbrecommend.className !== "bfd_br_nom") {
				ykbrecommend.className = "bfd_br_nom";
				YkbBanner.prototype.changeImg();
			}			
		}
		clearInterval(YkbBanner.prototype.intervalId);
		YkbBanner.prototype.intervalId = window.setInterval(YkbBanner.prototype.changeImg,YkbBanner.prototype.seconds)
	}
	
	YkbBanner.prototype.clickFn = function(event) {
		var ykbrecommend = document.getElementById("ykbrecommend");
		if(ykbrecommend.className == "bfd_br_nom bfd_br_max") {
			ykbrecommend.className = "bfd_br_nom";
			YkbBanner.prototype.changeImg();
			YkbBanner.prototype.intervalId = window.setInterval(YkbBanner.prototype.changeImg,YkbBanner.prototype.seconds);
		} else {
			clearInterval(YkbBanner.prototype.intervalId); 
			YkbBanner.prototype.max();
		}
	}

	YkbBanner.prototype.min = function(event) {
		clearInterval(YkbBanner.prototype.intervalId); 
		var ykbrecommend = document.getElementById("ykbrecommend");
		CloudBanner.prototype.delEvent(ykbrecommend, 'mouseover',YkbBanner.prototype.mouseoverFn);
		CloudBanner.prototype.delEvent(ykbrecommend, 'mouseout',YkbBanner.prototype.mouseoutFn);
		ykbrecommend.innerHTML = YkbBanner.prototype.unexpandTemplate;
		ykbrecommend.className = "bfd_br_min";
		if (YkbBanner.prototype.isIpad()) {
			event = YkbBanner.prototype.getEvent(event);
			if (event.stopPropagation) {
				event.stopPropagation();
			} else if (window.event) {
				window.event.cancelBubble = true;
			}
		}
	}
	
	YkbBanner.prototype.max = function() {
		var json = YkbBanner.prototype.json;
		var key = YkbBanner.prototype.key;
		var jsons = new BCore.responses.Response(json[key]);
		var content = YkbBanner.prototype.getExpandAllTemplate(jsons);
		var ykbrecommend = document.getElementById("ykbrecommend");
		ykbrecommend.innerHTML = content;
		if (ykbrecommend.className !== "bfd_br_nom bfd_br_max") {
			ykbrecommend.className = "bfd_br_nom bfd_br_max"
		}
		YkbBanner.prototype.DisplayAllImg();
		if (YkbBanner.prototype.isIpad()) {
			var pObj = ykbrecommend.getElementsByTagName("p")[0];
			CloudBanner.prototype.addEvent(pObj, "click", YkbBanner.prototype.clickFn);
		}
		CloudBanner.prototype.addEvent(ykbrecommend, "mouseover", YkbBanner.prototype.mouseoverFn);
		CloudBanner.prototype.addEvent(ykbrecommend, "mouseout", YkbBanner.prototype.mouseoutFn);
	};
	YkbBanner.prototype.isIpad = function(){
		var ua = navigator.userAgent.toLowerCase();
		if(/ipad/i.test(ua)) {
			return true;
		} else{
			return false;
		}
	};
	YkbBanner.prototype.create = function(json,key) {
		var jsons = new BCore.responses.Response(json[key]); 
		YkbBanner.prototype.json = json;
		YkbBanner.prototype.key = key;
		var content = YkbBanner.prototype.getExpandAllTemplate(jsons);
		if(content == "") return;
		
		var ykbrecommend = document.getElementById("ykbrecommend");
		if(!ykbrecommend) {
			ykbrecommend = document.createElement("DIV");
			ykbrecommend.id="ykbrecommend";
			ykbrecommend.style.bottom = "0px";
			document.body.appendChild(ykbrecommend);
		}
		ykbrecommend.innerHTML = content;
		if(YkbBanner.prototype.isIpad()) {
			ykbrecommend.className = "bfd_br_nom bfd_br_max";
			YkbBanner.prototype.DisplayAllImg();
			YkbBanner.prototype.intervalId = window.setInterval(YkbBanner.prototype.DisplayAllImg,YkbBanner.prototype.seconds);			
			var pObj = ykbrecommend.getElementsByTagName("p")[0];
			CloudBanner.prototype.addEvent(pObj, 'click',YkbBanner.prototype.clickFn);
		} else {
			ykbrecommend.className = "bfd_br_nom";
			YkbBanner.prototype.changeImg();
			YkbBanner.prototype.intervalId = window.setInterval(YkbBanner.prototype.changeImg,YkbBanner.prototype.seconds);		
		}
		
	    CloudBanner.prototype.addEvent(ykbrecommend, 'mouseover',YkbBanner.prototype.mouseoverFn);
		CloudBanner.prototype.addEvent(ykbrecommend, 'mouseout',YkbBanner.prototype.mouseoutFn);
		YkbBanner.prototype.intervalSlideId = window.setInterval("YkbBanner.prototype.heartBeat()",1);		
	};
	YkbBanner.prototype.changeImg = function() {
		var arr = YkbBanner.prototype.expandAllTemplate.ids;
		for(var j=0; j<arr.length; j++) {
			var obj = document.getElementById(arr[j]);
			obj.style.display = "none";
		}
		for(var i=0; i<arr.length; i++) {
			if(YkbBanner.prototype.displayNum >= YkbBanner.prototype.expandAllTemplate.num) 
					YkbBanner.prototype.displayNum = 0;
			if(i == YkbBanner.prototype.displayNum) {
				var obj = document.getElementById(arr[i]);
				obj.style.display = "";
				YkbBanner.prototype.displayNum += 1;				
				break;
			}
		}
	};
	YkbBanner.prototype.DisplayAllImg = function() {
		var arr = YkbBanner.prototype.expandAllTemplate.ids;
		for(var j=0; j<arr.length; j++) {
			var obj = document.getElementById(arr[j]);
			obj.style.display = "";
		}
	};
	YkbBanner.prototype.lastScrollY = 0;
	YkbBanner.prototype.heartBeat = function(){ 
		var diffY;
		if (document.documentElement && document.documentElement.scrollTop)
			diffY = document.documentElement.scrollTop;
		else if (document.body)
			diffY = document.body.scrollTop
		else
			{/*Netscape stuff*/}

		percent=0.1*(diffY-YkbBanner.prototype.lastScrollY); 
		if(percent>0)percent=Math.ceil(percent); 
		else percent=Math.floor(percent);		
		var n = document.getElementById("ykbrecommend");		
		
		if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g,"")=="MSIE6.0") { 
			n.style.bottom=percent+"px";
		} else {
			n.style.bottom=parseInt(n.style.bottom)-percent+"px";
		}
		YkbBanner.prototype.lastScrollY=YkbBanner.prototype.lastScrollY+percent;
	}
	
	YkbBanner.prototype.checkHover=function(e, target) {  
		if (this.getEvent(e).type == "mouseover") {  
			return !this.contains(target, this.getEvent(e).relatedTarget  
					|| this.getEvent(e).fromElement)  
					&& !((this.getEvent(e).relatedTarget || this.getEvent(e).fromElement) === target);  
		} else {
			return !this.contains(target, this.getEvent(e).relatedTarget  
					|| this.getEvent(e).toElement)  
					&& !((this.getEvent(e).relatedTarget || this.getEvent(e).toElement) === target);  
		}  
	}  
	  
	YkbBanner.prototype.contains=function(parentNode, childNode) {  
		if (parentNode.contains) {  
			return parentNode != childNode && parentNode.contains(childNode);  
		} else {  
			return !!(parentNode.compareDocumentPosition(childNode) & 16);  
		}  
	}  
	//取得当前window对象的事件   
	YkbBanner.prototype.getEvent=function(e) {  
		return e || window.event;  
	} 
	/**
	 * 根据过滤条件去重
	 * @name Tools.filterData
	 * @memberOf BCore.tools
	 * @function filterData
	 * @param {array} data
	 * @param {array} filter condition
	 * @author tenglong.jiang on 2012-4-12
	 * @example
	 * //引入tools类
	 * var Tools = BCore.tools.Tools;
	 * Tools.filterData([{"name":"多彩人生多彩裤","price":99},{"name":"多彩人生多彩裤","price":99}],["name", "price"])
	 */
	YkbBanner.prototype.filterData = function(data, filter) {
		if ((data instanceof Array) && (filter instanceof Array)) {
			for(var i=0; i<data.length; i++) {
				for(var j=i+1; j<data.length; j++) {
					var flag = false;
					for(var k=0; k<filter.length; k++) {
						var f = filter[k];
						if(data[i][f] === undefined || data[i][f] !== data[j][f]) {
							flag = false;
							break;						
						} 
						flag = true;
					}
					if(flag) {
						data.splice(j,1);    
						j--; 
					}							
				}					
			}				
		}
	}

	BCore.ui.FloatBanner = FloatBanner;
	BCore.ui.BannerEx = BannerEx;
	BCore.ui.BFDBanner = BFDBanner;
	BCore.ui.BannerBase = BannerBase;
	BCore.ui.CloudBanner = CloudBanner;
	BCore.ui.YkbBanner = YkbBanner;
}) (window);
