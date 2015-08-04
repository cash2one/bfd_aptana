/** 
 * @fileoverview 自动化解析模块
 * <font color=red>依赖于BCore</font>
 * @author xiuming.wang
 * @version 0.1 
 */
;(function( window ){
	//取BCore
	var BCore = window.BCore;
	/**
	 * @namespace 该命名空间下包含一些相对复杂的解析HTML的类和方法
	 * @memberOf BCore
	 * @private
	 */
	BCore.parse = {};
	
	/**
	 * NodePath,用于解析Node路径对应的值
	 * @class 数据采集基类
	 * @constructor
	 * @memberOf BCore.parse
	 * @param {String} path 路径 
	 * @private
	 */
	function NodePath(s){
		var sarr= s.split('/');
		var len = sarr.length,i,arr=[];
		for(i=0;i<len;i++){
			var type =sarr[i].split('@')[0];
			var index=sarr[i].split('@')[4];
			arr.push(type+':eq('+index+')');
		}
		return arr.join('>');
	}
	
	
	/**
	 * BFD_parse,用于抓取页面信息及指纹信息
	 * @class 数据采集基类
	 * @name BFD_parse
	 * @constructor
	 * @memberOf BCore.parse
	 * @autor tenglong.jiang
	 * @private
	 */
	function BFD_parse(){}
	BFD_parse.prototype = {
		init:function(){
			iObj = document.getElementsByTagName('body')[0];
			this.initialize(iObj);
			this.addEvent(iObj ,'mouseover', this.getMouseNode);
			this.addEvent(iObj ,'click', this.getClickNode);
			this.addEvent(iObj ,'click', this.hrefHandler);
			this.addEvent(iObj ,'mouseout', this.getBorderDel);
		},
		arr:[],
		hrefsActive : true,//连接状态 抓取时为停用（false）
		htmlArray:[],
		html:'',
		tools : BCore.tools.Tools,//引用工具库 2012-3-9 by jack
		serverIp:'http://wit.baifendian.com/bfd_install.api.php',
		testIp:'http://wit.baifendian.com/bfd_msb.api.php',
		nodeArray:[],
		tagInfo : {
			"div":"0",
			"span":"1",
			"table":"2",
			"tr":"3",
			"td":"4",
			"tbody":"5",
			//"p":"6",
			"pre":"7",
			"h1":"8",
			"h2":"9",
			"h3":"a",
			"h4":"b",
			"h5":"c",
			"h6":"d",
			"b":"e",
			"i":"f",
			"tt":"g",
			"cite":"h",
			"em":"i",
			"strong":"j",
			"font":"k",
			//"a":"l",
			"ul":"m",
			"ol":"n",
			"hr":"o",
			"th":"p",
			"form":"q",
			"select":"r",
			"input":"s",
			"body":"t"
		},
		initialize:function(obj){
			//$(this.options.notItemBtn).unbind('click');
			//$(this.options.resetBtnId).unbind('click');		
			//BCore.(obj).find('*').unbind();		
			//创建红色边框		
			this.createRedBorder(obj);
			obj.setAttribute("style", "cursor:crosshair;padding:2px");
		},
		getClickNode:function(event){
			var self = BFD_parse.prototype,iObj =  document.getElementsByTagName('body')[0];
			var e = event|| window.event;
			var t = e.target || e.srcElement; 
			var self = BFD_parse.prototype;
			var len = self.nodeArray.length;
			
			//event.preventDefault();
			self.arr = [];
			self.getParentNode(t);
			var cookieStepid=BFD_Install.prototype.getCookie("stepid");
			var cookiePageName = BFD_Install.prototype.getCookie("pageName");		

			//背景颜色的改变
			//$(t).addClass('bfd_click_node').css('background-color','#DAE6FC');
			t.style.backgroundColor="#DAE6FC";		
			//为全局的数组元素push数据
			//self.nodeArray.push(self.arr.join('/'));

			var stext = "";
			if(t.nodeName.toLowerCase()=='img' || t.type=='img') {
				stext = t.src;
			} else if(t.type=='submit' || t.type=='button' || t.type == 'text') {
				stext = t.value;
			} else {
				stext = t.innerHTML;
			}
			
			if(stext == "") {
				alert("抓取的信息不能为空,请重新抓取！");
				return;
			}
			var slen = stext.length;
			//for(var jj=0;jj<stext.length;jj++){
			//	if(stext.charCodeAt(jj)>255){slen++;}
			//}
			//var str = (slen>25)?stext.substr(0,21)+'...':stext;
			if(confirm('确定选择"'+stext+'"?')) {			
				var para = BFD_Install.prototype.recPage[BFD_Install.prototype.getCookie("pageName")].step[BFD_Install.prototype.getCookie("stepid")].en
				var url = self.serverIp+"?pageType="+BFD_Install.prototype.getCookie("pageName")
							+"&value="+para+":"+self.arr.join('/')
							+"&callback=BFD_Install.prototype.callback"
							+"&customerId="+BFD_Install.prototype.customId;
							
				if(/USER_ID$/.test(para)) {
					self.htmlArray=[];
					self.html="";
					self.catchtree(t.parentNode,3,"");
					url += "&userpage="+para+"_PAGE:"+(self.htmlArray.join()==""?"''":self.htmlArray.join());
				}
				
				//发送到服务器
				BFD_Install.prototype.SubmitInfo(cookiePageName, cookieStepid, url, t);
				//BFD_Install.prototype.runStep(BFD_Install.prototype.getCookie("pageName"), BFD_Install.prototype.getCookie("stepid"));					 
			}
		},
		getMouseNode:function(e){
			var e = e|| window.event;
			var t = e.target || e.srcElement;
			var self = BFD_parse.prototype;

			if(t.id == 'itop' || t.id == 'ibottom' || t.id == 'ileft' || t.id == 'iright'){
				return false;
			}
			
			if(t.nodeName.toLowerCase()=='img' || t.type=='img') {
				if(t.parentNode.nodeName.toLowerCase()=='a') {
					t.parentNode.onclick = function(){return false;}
				}
			}
			
			var border = self.setPositionBoder(t);
			var bh = border.height;
			var bw = border.width;
			var bl = border.offsetLeft;
			var bt = border.offsetTop;

			leftBorderObj = document.getElementById('ileft');
			self.setActiveBorder(leftBorderObj,"#ff0000",'',bh+'px',(bl-2)+'px',(bt+2)+'px');
			
			rightBorderObj = document.getElementById('iright');
			self.setActiveBorder(rightBorderObj,"#ff0000",'',bh+'px',(Number(bl)+Number(bw))+'px',(bt+2)+'px');
			
			topBorderObj = document.getElementById('itop');
			self.setActiveBorder(topBorderObj,"#ff0000",(bw+4)+'px','',(bl-2)+'px',bt+'px');
			
			bottomBorderObj = document.getElementById('ibottom');
			self.setActiveBorder(bottomBorderObj,"#ff0000",bw+'px','',bl+'px',(Number(bt)+Number(bh))+'px');
		},
		setActiveBorder : function(obj1, bg, w, h, l, t) {
			if(obj1 && typeof(obj1)=='object') {
				obj1.style.backgroundColor = bg;
				if(w != '') {
					obj1.style.width = w;
				}			
				if(h != '') {
					obj1.style.height = h;
				}			
				obj1.style.left = l;
				obj1.style.top = t;
							
			}
		},
		getBorderDel:function(e){
			var self = BFD_parse.prototype;
			var e = e|| window.event;
			var t = e.target || e.srcElement;
		},
		setPositionBoder:function(n){
			var obj = {}
			obj.width = n.clientWidth || n.scrollWidth ;
			obj.height = n.clientHeight || n.scrollHeight;
			
			var getTop = function(node){   
				var offsetTop = node.offsetTop;   
				if(node.offsetParent != null) offsetTop+=getTop(node.offsetParent);   
				return offsetTop;   
			} 
			var getLeft = function(node){   
				var offsetLeft = node.offsetLeft;   
				if(node.offsetParent!=null) offsetLeft+=getLeft(node.offsetParent);   
				return offsetLeft;   
			}
			
			obj.offsetTop = getTop(n);
			obj.offsetLeft = getLeft(n);
			return obj;
		},
		getStyle : function (element,property) {
			var camelize = function (s) {
				return s.replace(/-(\w)/g, function (strMatch, p1){
					return p1.toUpperCase();
				});
			}		
			var value = element.style[camelize(property)];
			if (!value) {
				// Retrieve the computed style value
				if (document.defaultView && document.defaultView.getComputedStyle) {
					// The DOM method
					var css = document.defaultView.getComputedStyle(element, null);
					value = css ? css.getPropertyValue(property) : null;
				} else if (element.currentStyle) {
					// The MSIE method
					value = element.currentStyle[camelize(property)];
				}
			}
			// Return an empty string rather than auto so that you don't
			// have to check for auto values 
			return value == 'auto' ? '' : value;
		},	
		getParentNode:function(n){		
			if(n.nodeName.toLowerCase() !== '#document'){
				var node = n.nodeName.toLowerCase();
				node = (n.id)?(node + '@'+n.id):node + '@';
				node = (n.className)?(node + '@'+n.className):node + '@';
				
				if(n.parentNode.nodeName.toLowerCase() === 'body'){
					node +='@'+(this.tools.siblings(n).length-4);
				}else{
					node +='@'+this.tools.siblings(n).length;
				}
				node +='@'+this.tools.preSameTagAll(n).length;//获取当前节点同级索引
				
				this.arr.unshift(node);
				this.getParentNode(n.parentNode);
			}else{
				return this.arr;
			}
		},
		addEvent:function(element, type, listener){
			if (element.addEventListener) {
				element.addEventListener(type, listener, false );
			} else if(element.attachEvent) {
				element.attachEvent('on' + type, listener)
			} else {
				element["on" + type] = listener;
			}
		},
		delEvent:function(element, type, handler){
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false );
			} else if(element.detachEvent) {
				element.detachEvent('on' + type, handler);
			} else {
				element["on" + type] = null;
			}
		},
		//创建红边框的层
		createRedBorder : function(obj) {
			var style1 = "position:absolute;overflow:hidden;z-index:9999;width:2px;visibility:visible;";
			var style2 = "position:absolute;overflow:hidden;z-index:9999;height:2px;visibility:visible;";
			if(!document.getElementById("ileft")) {
				var leftDiv = document.createElement('div'); 
				leftDiv.setAttribute("id", "ileft");
				leftDiv.setAttribute("class", "xflag_b");
				leftDiv.setAttribute("style", style1);
				obj.appendChild(leftDiv);			
			}
			
			if(!document.getElementById("iright")) {
				var rightDiv = document.createElement('div'); 
				rightDiv.setAttribute("id", "iright");
				rightDiv.setAttribute("class", "xflag_b");
				rightDiv.setAttribute("style", style1);
				obj.appendChild(rightDiv);
			}
			
			if(!document.getElementById("itop")) {
				var topDiv = document.createElement('div'); 
				topDiv.setAttribute("id", "itop");
				topDiv.setAttribute("class", "xflag_b");
				topDiv.setAttribute("style", style2);
				obj.appendChild(topDiv);
			}
			
			if(!document.getElementById("ibottom")) {		
				var bottomDiv = document.createElement('div'); 
				bottomDiv.setAttribute("id", "ibottom");
				bottomDiv.setAttribute("class", "xflag_b");
				bottomDiv.setAttribute("style", style2);
				obj.appendChild(bottomDiv);
			}
		},
		catchtree : function(target, deep, pagehtml) {
			var self = BFD_parse.prototype;
			var fileterId = ['selfSizzleId','loader','compareBox','baifendianDiv2012','popupAddr','ileft','iright','itop','ibottom'];
			if(target.nodeType != 1) {return;}	
			
			//忽略的数据
			if (target.bfd_ctype) {
				return;
			}
			if (typeof(self.tagInfo[target.nodeName.toLowerCase()]) == "undefined") {
				return;
			}
			if(target.style.display === 'none' || target.style.visibility === 'hidden') {
				return;
			}
			if(target.innerHTML == "") {
				return;
			}
			if(target.id && typeof(target.id) == "string" && ((","+fileterId.join()+",").indexOf(","+target.id.toLowerCase()+",") != -1)) {;
				return;
			}
			
			var flag = true;
			if(target.hasChildNodes()) {
				for(var j = 0; j< target.childNodes.length; j++) {
					if(target.childNodes[j].nodeType == 1) {						
						if (self.tagInfo[target.childNodes[j].nodeName.toLowerCase()]) {
							flag = false;							
						} 
						if(!flag) {			
							if(target.childNodes[j].id && typeof(target.childNodes[j].id) == "string" && ((","+fileterId.join()+",").indexOf(","+target.childNodes[j].id.toLowerCase()+",") != -1)) {
								flag = true;								
							}					
							if (target.childNodes[j].bfd_ctype) {
								flag = true;
							}							
						}				
						if(!flag)
							break;
					}
				}
			}
			if(target.nodeName.toLowerCase() !== "body")
				pagehtml += self.tagInfo[target.nodeName.toLowerCase()];

			//验证深度
			if (pagehtml.length >= deep || flag) {		
				self.htmlArray.push(pagehtml);
				return;
			}
			
			for (var i = 0; i < target.childNodes.length; i++) {
				arguments.callee(target.childNodes[i], deep, pagehtml);
			}
		},		
		lookinfo : function(tag) {
			var self = BFD_parse.prototype;
			var rs = null;
			for(var k in self.tagInfo) {
				if(k === tag.toLowerCase()) {
					rs = self.tagInfo[k];
					break;
				}
				//if(tag === tagInfo[k]) {
				//	rs = k;
				//	break;
				//}
			}
			return rs;
		},
		getPathNum : function(target) {
			var self = BFD_parse.prototype;
			var myelement = target.parentNode.item;
			self.html = self.html +""+ self.lookinfo(target.nodeName.toLowerCase());
			if(target.parentNode.nodeName.toLowerCase() != "body") {
				arguments.callee(target.parentNode);
			} else {
				self.htmlArray[self.htmlArray.length] = self.html;
				self.html = "";
			}
		},
		hrefHandler : function(e) {
			var x =e.target || e.srcElement; // get the link tha  
			 if(x.nodeName.toLowerCase() === 'a'){
				 e.preventDefault();  
			 }  
		},
		//求两个字符串数组的相似度,返回差别字符数,Levenshtein Distance算法实现
		Levenshtein_Distance : function(s,t) {
			var self = BFD_parse.prototype;
			var n=s.length;					// length of s
			var m=t.length;					// length of t
			var d=[];						// matrix
			var i;							// iterates through s
			var j;							// iterates through t
			var s_i;						// ith character of s
			var t_j;						// jth character of t
			var cost;						// cost
			// Step 1
			if (n == 0) return m;
			if (m == 0) return n;
			// Step 2
			for (i = 0; i <= n; i++) {
				d[i]=[];
				d[i][0] = i;
			}
			for (j = 0; j <= m; j++) {
				d[0][j] = j;
			}
			// Step 3
			for (i = 1; i <= n; i++) {
				s_i = s[i - 1];
				// Step 4
				for (j = 1; j <= m; j++) {
					t_j = t[j - 1];
					// Step 5
					if (s_i == t_j) {
						cost = 0;
					}else{
						cost = 1;
					}
					// Step 6
					d[i][j] = self.Minimum (d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + cost);
				}
			}
			// Step 7
			return d[n][m];

		},
		//求两个字符串的相似度,返回相似度百分比
		Levenshtein_Distance_Percent : function(s,t){
			var l=s.length>t.length?s.length:t.length;
			var d=this.Levenshtein_Distance(s,t);
			return (1-d/l).toFixed(4);
		},
		//求三个数字中的最小值
		Minimum : function(a,b,c){
			return a<b?(a<c?a:c):(b<c?b:c);
		}		
	};
	
	BCore.parse.NodePath		= NodePath;
	BCore.parse.BFD_parse		= BFD_parse;
	
})( window );