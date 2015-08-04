/**
 * @fileoverview 这个文件的功能是对JS动态生成的标签进行标记（API）
 * <font color=red>与所有模块没有依赖关系，在BCore.js模块后加载即可</font>
 * @author xiuming.wang
 * @version 0.1
 */
//;	(function(){
//	
//		function doExtends(Element){
//			var _appendChild = Element.prototype.appendChild;
//			var _appendChildNew = function(newChild){
//				newChild.ctype = "append"; 
//				_appendChild.call(this,newChild);
//			}
//			
//			var _insertBefore = Element.prototype.insertBefore;
//			var _insertBeforeNew = function(oNewNode,oChildNode){
//				oNewNode.ctype = "child-insertbefore";
//				oChildNode.ctype = "node-insertbefore";
//				_insertBefore.call(this,oNewNode,oChildNode);
//			}
//			
//			var _replaceChild = Element.prototype.replaceChild;
//			var _replaceChildNew = function(oNewChild, oChild){
//				oNewChild.ctype = "child-insertbefore";
//				oChild.ctype = "node-insertbefore";
//				_replaceChild.call(this,oNewChild,oChild);
//			}
//			Element.prototype.appendChild = _appendChildNew;
//			Element.prototype.insertBefore = _insertBeforeNew;
//			Element.prototype.replaceChild = _replaceChildNew;
//			
//		}
//		
//		if(typeof(HTMLAnchorElement)!=="undefined")doExtends(HTMLAnchorElement);
//		if(typeof(HTMLAppletElement)!=="undefined")doExtends(HTMLAppletElement);
//		if(typeof(HTMLAreaElement)!=="undefined")doExtends(HTMLAreaElement);
//		if(typeof(HTMLBaseElement)!=="undefined")doExtends(HTMLBaseElement);
//		if(typeof(HTMLBaseFontElement)!=="undefined")doExtends(HTMLBaseFontElement);
//		//if(typeof(HTMLBlockquoteElement)!=="undefined")doExtends(HTMLBlockquoteElement);			//ie FF 不支持
//		if(typeof(HTMLBodyElement)!=="undefined")doExtends(HTMLBodyElement);
//		if(typeof(HTMLBRElement)!=="undefined")doExtends(HTMLBRElement);
//		if(typeof(HTMLButtonElement)!=="undefined")doExtends(HTMLButtonElement);
//		if(typeof(HTMLDirectoryElement)!=="undefined")doExtends(HTMLDirectoryElement);
//		if(typeof(HTMLDivElement)!=="undefined")doExtends(HTMLDivElement);
//		if(typeof(HTMLDListElement)!=="undefined")doExtends(HTMLDListElement);
//		if(typeof(HTMLFieldSetElement)!=="undefined")doExtends(HTMLFieldSetElement);
//		if(typeof(HTMLFontElement)!=="undefined")doExtends(HTMLFontElement);
//		if(typeof(HTMLFormElement)!=="undefined")doExtends(HTMLFormElement);
//		if(typeof(HTMLFrameElement)!=="undefined")doExtends(HTMLFrameElement);
//		if(typeof(HTMLFrameSetElement)!=="undefined")doExtends(HTMLFrameSetElement);
//		
//		if(typeof(HTMLHeadElement)!=="undefined")doExtends(HTMLHeadElement);
//		if(typeof(HTMLHeadingElement)!=="undefined")doExtends(HTMLHeadingElement);
//		if(typeof(HTMLHRElement)!=="undefined")doExtends(HTMLHRElement);
//		if(typeof(HTMLHtmlElement)!=="undefined")doExtends(HTMLHtmlElement);
//		if(typeof(HTMLIFrameElement)!=="undefined")doExtends(HTMLIFrameElement);
//		if(typeof(HTMLImageElement)!=="undefined")doExtends(HTMLImageElement);
//		if(typeof(HTMLInputElement)!=="undefined")doExtends(HTMLInputElement);
//		if(typeof(HTMLIsIndexElement)!=="undefined")doExtends(HTMLIsIndexElement);
//		if(typeof(HTMLLabelElement)!=="undefined")doExtends(HTMLLabelElement);
//		//if(typeof(HTMLLayerElement)!=="undefined")doExtends(HTMLLayerElement);			//ie FF chrome 不 支持
//		if(typeof(HTMLLegendElement)!=="undefined")doExtends(HTMLLegendElement);
//		if(typeof(HTMLLIElement)!=="undefined")doExtends(HTMLLIElement);
//		if(typeof(HTMLLinkElement)!=="undefined")doExtends(HTMLLinkElement);
//		if(typeof(HTMLMapElement)!=="undefined")doExtends(HTMLMapElement);
//		if(typeof(HTMLMenuElement)!=="undefined")doExtends(HTMLMenuElement);
//		if(typeof(HTMLMetaElement)!=="undefined")doExtends(HTMLMetaElement);
//		//if(typeof(HTMLModElement)!=="undefined")doExtends(HTMLModElement);				//ff 不支持
//		if(typeof(HTMLObjectElement)!=="undefined")doExtends(HTMLObjectElement);
//		if(typeof(HTMLOListElement)!=="undefined")doExtends(HTMLOListElement);
//		if(typeof(HTMLOptGroupElement)!=="undefined")doExtends(HTMLOptGroupElement);
//		if(typeof(HTMLOptionElement)!=="undefined")doExtends(HTMLOptionElement);
//		if(typeof(HTMLParagraphElement)!=="undefined")doExtends(HTMLParagraphElement);
//		if(typeof(HTMLParamElement)!=="undefined")doExtends(HTMLParamElement);
//		if(typeof(HTMLPreElement)!=="undefined")doExtends(HTMLPreElement);
//		if(typeof(HTMLQuoteElement)!=="undefined")doExtends(HTMLQuoteElement);
//		if(typeof(HTMLScriptElement)!=="undefined")doExtends(HTMLScriptElement);
//		if(typeof(HTMLSelectElement)!=="undefined")doExtends(HTMLSelectElement);
//		if(typeof(HTMLStyleElement)!=="undefined")doExtends(HTMLStyleElement);
//		if(typeof(HTMLTableCaptionElement)!=="undefined")doExtends(HTMLTableCaptionElement);
//		if(typeof(HTMLTableCellElement)!=="undefined")doExtends(HTMLTableCellElement);
//		if(typeof(HTMLTableColElement)!=="undefined")doExtends(HTMLTableColElement);
//		if(typeof(HTMLTableElement)!=="undefined")doExtends(HTMLTableElement);
//		if(typeof(HTMLTableRowElement)!=="undefined")doExtends(HTMLTableRowElement);
//		if(typeof(HTMLTableSectionElement)!=="undefined")doExtends(HTMLTableSectionElement);
//		if(typeof(HTMLTextAreaElement)!=="undefined")doExtends(HTMLTextAreaElement);
//		if(typeof(HTMLTitleElement)!=="undefined")doExtends(HTMLTitleElement);
//		if(typeof(HTMLUListElement)!=="undefined")doExtends(HTMLUListElement);
//
//	})();
	
;	(function(){
		var _createElement = document.createElement;
		var _elem;
		document.createElement = function(type){
			if(navigator.userAgent.indexOf("MSIE") > 0  && navigator.userAgent.indexOf("MSIE 9.0") < 0){
				_elem = _createElement(type);
			}else{
				_elem = _createElement.call(document,type);
			}
			_elem.bfd_ctype = true;
			return _elem;
		}
	})();
	