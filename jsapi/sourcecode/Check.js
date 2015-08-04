/** 
 * @fileoverview GID恢复组件
 * <font color=red>依赖于BCore</font>
 * @author xiuming.wang
 * @version 0.1 
 */
;(function( window ){

	// v1.7
	// Flash Player Version Detection
	// Detect Client Browser type
	// Copyright 2005-2008 Adobe Systems Incorporated.  All rights reserved.
	var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
	var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
	var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
	/**
	 * @private
	 */
	function ControlVersion()
	{
		var version;
		var axo;
		var e;
		// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry
		try {
			// version will be set for 7.X or greater players
			axo = new ActiveXObject(unbfdString("83 104 111 99 107 119 97 118 101 70 108 97 115 104 46 83 104 111 99 107 119 97 118 101 70 108 97 115 104")+".7");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
		if (!version)
		{
			try {
				// version will be set for 6.X players only
				axo = new ActiveXObject(unbfdString("83 104 111 99 107 119 97 118 101 70 108 97 115 104 46 83 104 111 99 107 119 97 118 101 70 108 97 115 104")+".6");
				
				// installed player is some revision of 6.0
				// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
				// so we have to be careful. 
				
				// default to the first public version
				version = "WIN 6,0,21,0";
				// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
				axo.AllowScriptAccess = "always";
				// safe to call for 6.0r47 or greater
				version = axo.GetVariable("$version");
			} catch (e) {
			}
		}
		if (!version)
		{
			try {
				// version will be set for 4.X or 5.X player
				axo = new ActiveXObject(unbfdString("83 104 111 99 107 119 97 118 101 70 108 97 115 104 46 83 104 111 99 107 119 97 118 101 70 108 97 115 104")+".3");
				version = axo.GetVariable("$version");
			} catch (e) {
			}
		}
		if (!version)
		{
			try {
				// version will be set for 3.X player
				axo = new ActiveXObject(unbfdString("83 104 111 99 107 119 97 118 101 70 108 97 115 104 46 83 104 111 99 107 119 97 118 101 70 108 97 115 104")+".3");
				version = "WIN 3,0,18,0";
			} catch (e) {
			}
		}
		if (!version)
		{
			try {
				// version will be set for 2.X player
				axo = new ActiveXObject(unbfdString("83 104 111 99 107 119 97 118 101 70 108 97 115 104 46 83 104 111 99 107 119 97 118 101 70 108 97 115 104")+"");
				version = "WIN 2,0,0,11";
			} catch (e) {
				version = -1;
			}
		}
		
		return version;
	}
	
	
	/**
	 * @private
	 */
	// JavaScript helper required to detect Flash Player PlugIn version information
	function GetSwfVer(){
		// NS/Opera version >= 3 check for Flash plugin in plugin array
		var flashVer = -1;
		
		if (navigator.plugins != null && navigator.plugins.length > 0) {
			if (navigator.plugins[unbfdString("83 104 111 99 107 119 97 118 101 32 70 108 97 115 104")+" 2.0"] || navigator.plugins[unbfdString("83 104 111 99 107 119 97 118 101 32 70 108 97 115 104")+""]) {
				var swVer2 = navigator.plugins[unbfdString("83 104 111 99 107 119 97 118 101 32 70 108 97 115 104")+" 2.0"] ? " 2.0" : "";
				var flashDescription = navigator.plugins[unbfdString("83 104 111 99 107 119 97 118 101 32 70 108 97 115 104")+"" + swVer2].description;
				var descArray = flashDescription.split(" ");
				var tempArrayMajor = descArray[2].split(".");			
				var versionMajor = tempArrayMajor[0];
				var versionMinor = tempArrayMajor[1];
				var versionRevision = descArray[3];
				if (versionRevision == "") {
					versionRevision = descArray[4];
				}
				if (versionRevision[0] == "d") {
					versionRevision = versionRevision.substring(1);
				} else if (versionRevision[0] == "r") {
					versionRevision = versionRevision.substring(1);
					if (versionRevision.indexOf("d") > 0) {
						versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
					}
				}
				var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
			}
		}
		// MSN/WebTV 2.6 supports Flash 4
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
		// WebTV 2.5 supports Flash 3
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
		// older WebTV supports Flash 2
		else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
		else if ( isIE && isWin && !isOpera ) {
			flashVer = ControlVersion();
		}	
		return flashVer;
	}

	/**
	 * @private When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
	 */
	function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
	{
		versionStr = GetSwfVer();
		if (versionStr == -1 ) {
			return false;
		} else if (versionStr != 0) {
			if(isIE && isWin && !isOpera) {
				// Given "WIN 2,0,0,11"
				tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
				tempString        = tempArray[1];			// "2,0,0,11"
				versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
			} else {
				versionArray      = versionStr.split(".");
			}
			var versionMajor      = versionArray[0];
			var versionMinor      = versionArray[1];
			var versionRevision   = versionArray[2];
				// is the major.revision >= requested major.revision AND the minor version >= requested minor
			if (versionMajor > parseFloat(reqMajorVer)) {
				return true;
			} else if (versionMajor == parseFloat(reqMajorVer)) {
				if (versionMinor > parseFloat(reqMinorVer))
					return true;
				else if (versionMinor == parseFloat(reqMinorVer)) {
					if (versionRevision >= parseFloat(reqRevision))
						return true;
				}
			}
			return false;
		}
	}
	/**
	 * @private
	 */
	function AC_AddExtension(src, ext)
	{
	  if (src.indexOf('?') != -1)
		return src.replace(/\?/, ext+'?'); 
	  else
		return src + ext;
	}
	/**
	 * @private
	 */
	function AC_Generateobj(objAttrs, params, embedAttrs) 
	{ 
	  var str = '';
	  if (isIE && isWin && !isOpera)
	  {
		str += '<object ';
		for (var i in objAttrs)
		{
		  str += i + '="' + objAttrs[i] + '" ';
		}
		str += '>';
		for (var i in params)
		{
		  str += '<param name="' + i + '" value="' + params[i] + '" /> ';
		}
		str += '</object>';
	  }
	  else
	  {
		str += '<embed ';
		for (var i in embedAttrs)
		{
		  str += i + '="' + embedAttrs[i] + '" ';
		}
		str += '> </embed>';
	  }
	  var flashbox = document.createElement( "DIV" );
	  flashbox.style.zIndex = 1;
	  flashbox.id = "bfd_flbox";
	  flashbox.style.position = "absolute";
	  flashbox.bfd_ctype = true;
	  //document.body.appendChild(flashbox);
	  //document.body.insertBefore(flashbox,null);
	  document.getElementsByTagName("body")[0].insertBefore(flashbox,null);
	  flashbox.innerHTML = str;
	}
	/**
	 * @private
	 */
	function AC_FL_RunContent(){
	  var ret = 
		AC_GetArgs
		(  arguments, unbfdString("46 115 119 102"), "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
		 , unbfdString("97 112 112 108 105 99 97 116 105 111 110 47 120 45 115 104 111 99 107 119 97 118 101 45 102 108 97 115 104")
		);
	  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
	}
	/**
	 * @private
	 */
	function AC_SW_RunContent(){
	  var ret = 
		AC_GetArgs
		(  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
		 , null
		);
	  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
	}
	/**
	 * @private
	 */
	function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
	  var ret = new Object();
	  ret.embedAttrs = new Object();
	  ret.params = new Object();
	  ret.objAttrs = new Object();
	  for (var i=0; i < args.length; i=i+2){
		var currArg = args[i].toLowerCase();    
		switch (currArg){	
		  case "classid":
			break;
		  case "pluginspage":
			ret.embedAttrs[args[i]] = args[i+1];
			break;
		  case "src":
		  case "movie":	
			args[i+1] = AC_AddExtension(args[i+1], ext);
			ret.embedAttrs["src"] = args[i+1];
			ret.params[srcParamName] = args[i+1];
			break;
		  case "onafterupdate":
		  case "onbeforeupdate":
		  case "onblur":
		  case "oncellchange":
		  case "onclick":
		  case "ondblclick":
		  case "ondrag":
		  case "ondragend":
		  case "ondragenter":
		  case "ondragleave":
		  case "ondragover":
		  case "ondrop":
		  case "onfinish":
		  case "onfocus":
		  case "onhelp":
		  case "onmousedown":
		  case "onmouseup":
		  case "onmouseover":
		  case "onmousemove":
		  case "onmouseout":
		  case "onkeypress":
		  case "onkeydown":
		  case "onkeyup":
		  case "onload":
		  case "onlosecapture":
		  case "onpropertychange":
		  case "onreadystatechange":
		  case "onrowsdelete":
		  case "onrowenter":
		  case "onrowexit":
		  case "onrowsinserted":
		  case "onstart":
		  case "onscroll":
		  case "onbeforeeditfocus":
		  case "onactivate":
		  case "onbeforedeactivate":
		  case "ondeactivate":
		  case "type":
		  case "codebase":
		  case "id":
			ret.objAttrs[args[i]] = args[i+1];
			break;
		  case "width":
		  case "height":
		  case "align":
		  case "vspace": 
		  case "hspace":
		  case "class":
		  case "title":
		  case "accesskey":
		  case "name":
		  case "tabindex":
			ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
			break;
		  default:
			ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
		}
	  }
	  ret.objAttrs["classid"] = classid;
	  if (mimeType) ret.embedAttrs["type"] = mimeType;
	  return ret;
	}

	/**
	 * @private 混淆字符串
	 */
	function bfdString( str ){
		var rst = "";
		for(var i = 0;i<str.length;i++){
			rst += " "+str.charCodeAt(i);
		}
		return rst;
	}
	
	
	/**
	 * @private 混淆字符串
	 */
	function unbfdString( str ){
		var rst = "";
		var arr = str.split(" ");
		for(var i = 0;i<arr.length;i++){
			if(arr[i]){
			rst += String.fromCharCode(arr[i]);
			}
		}
		return rst;
	}

	/**
	 * @private
	 */
	function loadFlash(){
		
		var _href = window.location.href;
		var _protocol = "http://";
		if(_href.indexOf("https://")==0){
			_protocol = "https://";
		}
		
		AC_FL_RunContent(
			//'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0',
			unbfdString('99 111 100 101 98 97 115 101'), _protocol+unbfdString('100 111 119 110 108 111 97 100 46 109 97 99 114 111 109 101 100 105 97 46 99 111 109 47 112 117 98 47 115 104 111 99 107 119 97 118 101 47 99 97 98 115 47 102 108 97 115 104 47 115 119 102 108 97 115 104 46 99 97 98 35 118 101 114 115 105 111 110 61 49 48 44 48 44 48 44 48'),
			//'width', '0',
			unbfdString("119 105 100 116 104"), '0',
			//'height', '0',
			unbfdString("104 101 105 103 104 116"), '0',
			//'src', 'http://api.baifendian.com/api/js/check.swf',
			//unbfdString("115 114 99"),  _protocol +unbfdString("97 112 105 46 98 97 105 102 101 110 100 105 97 110 46 99 111 109 47 97 112 105 47 106 115 47 99 104 101 99 107 46 115 119 102"),
			//'src', 'http://www.baifendian.com/api/js/check.swf',
			//unbfdString("115 114 99"),  _protocol +unbfdString("119 119 119 46 98 97 105 102 101 110 100 105 97 110 46 99 111 109 47 97 112 105 47 106 115 47 99 104 101 99 107 46 115 119 102"),
			//'src', 'http://static.baifendian.com/api/check.swf', //static   115 116 97 116 105 99  //js47 106 115 
			//unbfdString("115 114 99"),  _protocol +unbfdString("115 116 97 116 105 99 46 98 97 105 102 101 110 100 105 97 110 46 99 111 109 47 97 112 105 47 99 104 101 99 107 46 115 119 102"),
			//'src', 'http://www.baifendian.com/api/js/bfd-cookie-factory-1.0.swf',
			unbfdString("115 114 99"), _protocol + unbfdString("119 119 119 46 98 97 105 102 101 110 100 105 97 110 46 99 111 109 47 97 112 105 47 106 115 47 98 102 100 45 99 111 111 107 105 101 45 102 97 99 116 111 114 121 45 49 46 48 46 115 119 102"),
			//'quality', 'high',
			unbfdString("113 117 97 108 105 116 121"), unbfdString("104 105 103 104"),
			//'pluginspage', 'http://www.adobe.com/go/getflashplayer_cn',
			unbfdString("112 108 117 103 105 110 115 112 97 103 101"), _protocol+unbfdString("119 119 119 46 97 100 111 98 101 46 99 111 109 47 103 111 47 103 101 116 102 108 97 115 104 112 108 97 121 101 114 95 99 110"),
			//'align', 'middle',
			unbfdString("97 108 105 103 110"), unbfdString("109 105 100 100 108 101"),
			//'play', 'true',
			unbfdString("112 108 97 121"), unbfdString("116 114 117 101"),
			//'loop', 'true',
			unbfdString("108 111 111 112"), unbfdString("116 114 117 101"),
			//'scale', 'showall',
			unbfdString("115 99 97 108 101"), unbfdString("115 104 111 119 97 108 108"),
			//'wmode', 'window',
			unbfdString("119 109 111 100 101"), unbfdString("119 105 110 100 111 119"),
			//'devicefont', 'false',
			unbfdString("100 101 118 105 99 101 102 111 110 116"), unbfdString("102 97 108 115 101"),
			//'id', 'fid',
			unbfdString("105 100"), unbfdString("98 102 100 95 99 111 111 107 105 101 95 102 97 99 116 111 114 121"),
			//'bgcolor', '#ffffff',
			unbfdString("98 103 99 111 108 111 114"),unbfdString("35 102 102 102 102 102 102"),
			//'name', 'fid',
			unbfdString("110 97 109 101"),unbfdString("98 102 100 95 99 111 111 107 105 101 95 102 97 99 116 111 114 121"),
			//'menu', 'true',
			unbfdString("109 101 110 117"), 'true',
			//'allowFullScreen', 'false',
			unbfdString("97 108 108 111 119 70 117 108 108 83 99 114 101 101 110"), unbfdString("102 97 108 115 101"),
			//'allowScriptAccess','always',
			unbfdString("97 108 108 111 119 83 99 114 105 112 116 65 99 99 101 115 115"),unbfdString("97 108 119 97 121 115"),
			//'movie', 'http://api.baifendian.com/api/js/check',   
			//unbfdString("109 111 118 105 101"),_protocol + unbfdString("97 112 105 46 98 97 105 102 101 110 100 105 97 110 46 99 111 109 47 97 112 105 47 106 115 47 99 104 101 99 107"),
			//'movie', 'http://www.baifendian.com/api/js/check',
			//unbfdString("109 111 118 105 101"),_protocol + unbfdString("119 119 119 46 98 97 105 102 101 110 100 105 97 110 46 99 111 109 47 97 112 105 47 106 115 47 99 104 101 99 107"),
			//'movie', 'http://static.baifendian.com/api/check',  //static   115 116 97 116 105 99
			//unbfdString("109 111 118 105 101"),_protocol + unbfdString("115 116 97 116 105 99 46 98 97 105 102 101 110 100 105 97 110 46 99 111 109 47 97 112 105 47 99 104 101 99 107"),
			//'movie', 'http://www.baifendian.com/api/js/bfd-cookie-factory-1.0',
			unbfdString("109 111 118 105 101"),_protocol + unbfdString("119 119 119 46 98 97 105 102 101 110 100 105 97 110 46 99 111 109 47 97 112 105 47 106 115 47 98 102 100 45 99 111 111 107 105 101 45 102 97 99 116 111 114 121 45 49 46 48"),
			//'salign', ''
			unbfdString("115 97 108 105 103 110"),''
			); //end AC code
	}
	//check.swf        99 104 101 99 107 46 115 119 102
	
	
	var SuperBCore = BCore;
	
	/**
	 * @class 新的BCore
	 */
	function NBCore(/**function*/ parm ){
		//SuperBCore.apply(this,arguments);
		SuperBCore.call(this,parm);
	}
	
	NBCore.prototype = new SuperBCore();
    
	/**
	 * 对readyHook进行重写
	 * @private
	 */
	NBCore.prototype.readyHook = function(){
		if(!this["static"].flashloaded){	
			//异步加载flash
			this["static"].flashloaded = true;
			window.setTimeout(loadFlash,0);
		}
		SuperBCore.prototype.readyHook.call(this);
	}
	
	NBCore.prototype._super = SuperBCore;
	
	//继承静态属性
	for(var key in SuperBCore){
		if(key=="prototype")continue;
		NBCore[key] = SuperBCore[key];
	}
	
	//$Core = BCore = NBCore;
	window.BCore = NBCore;
	window.$Core = NBCore;
	

})( window );