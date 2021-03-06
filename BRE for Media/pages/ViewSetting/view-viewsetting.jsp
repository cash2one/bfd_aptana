<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>展示设置-关键词浮层</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../css/exp.css" />
	<link rel="stylesheet" type="text/css" href="../../resources/ifmWidget/css/ifmWidget.css" />
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
<script type="text/javascript" src="../../js/regulateSize.js"></script>
<script type="text/javascript" src="../../js/changeSite.js"></script>
<script type="text/javascript" src="../../js/messageTip.js"></script>
	<script type="text/javascript"  src="../../resources/commons/jquery.form.js">
    </script>
    <script type="text/javascript"  src="../../resources/commons/jquery.validate.min.js">
    </script>
	<script type="text/javascript" src="../../resources/commons/jquery.tmpl.min.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.blockUI.js"></script>
	<script type="text/javascript" src="../../resources/ifmWidget/js/ifmWidget.js"></script>
	<script type="text/javascript" src="../../resources/jquery_tools/jquery.tools.min.js"></script>
	<script type="text/javascript" src="../../js/validateSession.js"></script>
	<script type="text/javascript" src="../../js/ViewSetting/view-viewsetting.js"></script>
<link rel="shortcut icon" href="../../favicon.ico" >
             </head>
<body>
	<!-- header 开始 -->
	<div class="header">
		<div class="w970">
			<div class="top">
				<ul class="t-group">
					<li>你好,<s:property value="#session.sessionUser.username" /></li>
					<li><a href="../../SiteManager/msg/!index.action">消息</a></li>
					<li><a href="../../SiteManager/site/!index">站点管理</a></li>
					<li><a href="../../Account/user/!showUpdatePassword">账号设置</a></li>
					<li><a href="../../help.html" target="_blank">帮助中心</a></li>
					<li class="no-bg"><a href="../../Account/user/!loginOut">退出</a></li>
				</ul>
			</div>
			<a href="../../DataAnalysis/stat/!synthetical.action">
                <div class="logo">
                    <strong>media</strong>
                </div>
            </a>
            
			<ul class="nav" id="nav">
				<li>
					<a href="../../DataAnalysis/stat/!synthetical.action">
                    <em class="icon1">&nbsp;</em>
                    <span>数据分析</span>
                    <strong>&nbsp;</strong>
                    </a>
				</li>
				<li>
					<a href="../../ContentManager/content/!showEmbodyStatistics">
                     <em class="icon3">&nbsp;</em>
                    <span>内容管理</span>
                    <strong class="position">&nbsp;</strong>
                    </a>
				</li>
				<li class="current">
					<a href="../../ViewSetting/view/!showViewSetting">
                    <em class="icon2">&nbsp;</em>
                    <span>展示设置</span>
                    <strong>&nbsp;</strong>
                    </a>
				</li>
				<li>
					<a href="../../SourceShare/source/!showSoureShare">
                    <em class="icon4">&nbsp;</em>
                    <span>流量交换</span>
                    <strong>&nbsp;</strong>
                    </a>
				</li>
				<li>
					<a href="../../Promo/profit/!showRecommendedBar">
                    <em class="icon5">&nbsp;</em>
                    <span>自盈利</span>
                    <strong>&nbsp;</strong>
                    </a>
				</li>
			</ul>
		</div>
	</div>
	<!-- header 结束 -->
	<!-- content   开始 -->
	<div id="content" class="content">
		<div class="main">
			<div class="m-top">&nbsp;</div>
			<div class="m-title">展示设置</div>
			<div class="m-con border-top">
				<div class="con-5">
					<div class="section">
						<div class="choose-area margin-top0">
							<ul class="choose">
							<s:if test="site.sitePlatform.keySupernatant == 1"><li><a>关键词浮层</a></li></s:if>
							<s:if test="site.sitePlatform.flushBonading == 1"><li><a>嵌入式</a></li></s:if>
							<s:if test="site.sitePlatform.floatWindow == 1"><li><a>浮窗式</a></li></s:if>	
							<s:if test="site.sitePlatform.tagCloude == 1"><li><a>标签云</a></li></s:if>	
							<s:if test="site.sitePlatform.individuationArtical == 1"><li><a>个性化热文榜</a></li></s:if>
							</ul>
						</div>
						<s:if test="site.sitePlatform.keySupernatant == 1"><div class="set-box" id="i0" style="display:none;">
							<div class="sbox-left">
							   <form autocomplete="off"  id="form0" action="../../ViewSetting/view/!updateKeySupernatant">
							   	<%-- <input autocomplete="off"  autocomplete="off"  type="hidden" name="site.keySupernatant.id" value="<s:property value="site.keySupernatant.id"/>"/>  --%>
								<div class="top">
									<s:if test="site.keySupernatant.isOpen == 0">
									 <input autocomplete="off"  id="type0_c0" type="checkbox" name="site.keySupernatant.isOpen" value="1"/>
									</s:if>
									<s:elseif test="site.keySupernatant.isOpen == 1">
									 <input autocomplete="off"  id="type0_c0" type="checkbox" name="site.keySupernatant.isOpen" value="1" checked="checked"/>
									</s:elseif>	
									<label for="type0_c0">开启关键词浮层</label>
								</div>
								<div class="display">
									<div class="item1">
										<label>显示模式：</label>
										<s:if test="site.keySupernatant.showModel == 2">
											<span>
											<input autocomplete="off"  id="type0_r0" type="radio" checked="checked" name="site.keySupernatant.showModel" value="2" />
										    <label for="type0_r0" style="cursor:pointer;">图片模式</label>
											</span>
											<span>
												<input autocomplete="off"  id="type0_r1" type="radio"  name="site.keySupernatant.showModel" value="1" />
											    <label for="type0_r1" style="cursor:pointer;">文字模式</label>
											</span>
										</s:if>
										<s:elseif test="site.keySupernatant.showModel == 1">
											<span>
											<input autocomplete="off"  id="type0_r0" type="radio"  name="site.keySupernatant.showModel" value="2" />
										    <label for="type0_r0" style="cursor:pointer;">图片模式</label>
											</span>
											<span>
												<input autocomplete="off"  id="type0_r1" type="radio" checked="checked"  name="site.keySupernatant.showModel" value="1" />
											    <label for="type0_r1" style="cursor:pointer;">文字模式</label>
											</span>
										</s:elseif>
									</div>
									<div class="item3" style="position:relative;z-index:100">
										<label>显示条数：</label>
										<div class="select_box3"><input autocomplete="off"  id="myselect" type="text" value="<s:property value="site.keySupernatant.showNumberCount"/>" name="site.keySupernatant.showNumberCount" readonly="readonly">	
											<ul class="select_ul3">
												<li>5</li>
												<li>4</li>
												<li>3</li>
												<li>2</li>
												<li>1</li>
											</ul>
										</div>
										<span>条</span>
										<em>（1-5条）</em>
									</div>
									<div class="item2" style="position:relative;z-index:90">
										<label>图片宽度：</label>
										<div class="textbox">
											<div class="textbox-l">
												<div class="textbox-r">
													<input autocomplete="off"  type="text" class="txt-width60" value="<s:property value="site.keySupernatant.pictureWide"/>" name="site.keySupernatant.pictureWide" />				
												</div>
											</div>
										</div>
										<span>px</span>
										<em>（60px - 120px）</em>
									</div>
								</div>
								<a  class="btn2">保 存</a>
								</form>
							</div>
							<div class="sbox-right">
								<h4>预览</h4>
								<div class="preview" style="height:425px;">
									<div class="v_items">
										<img src="../../images/yulan0101.jpg" alt="" />
										<img src="../../images/yulan0102.jpg" alt="" />
									</div>	
								</div>
							</div>
						</div></s:if>
						<s:if test="site.sitePlatform.flushBonading == 1">						
						<div class="set-box" id="i1" style="display:none;">
							<div class="sbox-left">
								<form autocomplete="off" id="form1" action="../../ViewSetting/view/!updateFlushBonading">
								<%-- <input autocomplete="off"  type="hidden" name="site.flushBonading.id" value="<s:property value="site.flushBonading.id"/>"/>  --%>
								<div class="top">
									<s:if test="site.flushBonading.isOpen == 0"><input autocomplete="off"  id="type1_c0" name="site.flushBonading.isOpen" type="checkbox" value="1"/></s:if>
									<s:elseif test="site.FlushBonading.isOpen == 1"><input autocomplete="off"  id="type1_c0" name="site.flushBonading.isOpen" type="checkbox" value="1" checked="checked"/></s:elseif>	
									<label for="type1_c0">开启嵌入式</label>
								</div>
								<div class="display">
									<div class="item1">
										<label>显示模式：</label>
										<s:if test="site.flushBonading.showModel == 2">
										<span>
											<input autocomplete="off"  id="type1_r0" type="radio" checked="checked" name="site.flushBonading.showModel" value="2" />
										    <label for="type1_r0" style="cursor:pointer;">图片模式</label>
										</span>
										<span>
											<input autocomplete="off"  id="type1_r1" type="radio"  name="site.flushBonading.showModel" value="1" />
										    <label for="type1_r1" style="cursor:pointer;">文字模式</label>
										</span>
										</s:if>
										<s:elseif test="site.flushBonading.showModel == 1">
										<span>
											<input autocomplete="off"  id="type1_r0" type="radio" name="site.flushBonading.showModel" value="2" />
										    <label for="type1_r0" style="cursor:pointer;">图片模式</label>
										</span>
										<span>
											<input autocomplete="off"  id="type1_r1" type="radio" checked="checked"  name="site.flushBonading.showModel" value="1" />
										    <label for="type1_r1" style="cursor:pointer;">文字模式</label>
										</span>
										</s:elseif>
									</div>
									<div class="item3" style="position:relative;z-index:100">
										<label>显示行数：</label>
										<div class="select_box3">
										<s:if test="site.flushBonading.showModel == 2">
										<input autocomplete="off"  id="myselect" type="text" value="<s:property value="site.flushBonading.showLineCount"/>" name="site.flushBonading.showLineCount" readonly="readonly">
										</s:if>
										<s:else>
										<input autocomplete="off"  id="myselect" type="text" value="2" name="site.flushBonading.showLineCount" readonly="readonly">
										</s:else>
											<ul class="select_ul3">
												<li>2</li>
												<li>1</li>
											</ul>
										</div>
										<span>行</span>
										<em>（1-2行）</em>
									</div>
									<div class="item3" style="position:relative;z-index:100">
										<label>显示行数：</label>
										<div class="select_box3">
										<s:if test="site.flushBonading.showModel == 1">
										<input autocomplete="off"  id="myselect" type="text" value="<s:property value="site.flushBonading.showLineCount"/>" name="showLineCount" readonly="readonly">
										</s:if>
										<s:else>
										<input autocomplete="off"  id="myselect" type="text" value="6" name="showLineCount" readonly="readonly">
										</s:else>
											<ul class="select_ul3">
												<li>10</li>
												<li>9</li>
												<li>8</li>
												<li>7</li>
												<li>6</li>
												<li>5</li>
												<li>4</li>
												<li>3</li>
												<li>2</li>
												<li>1</li>
											</ul>
										</div>
										<span>行</span>
										<em>（1-10行）</em>
									</div>
									<div class="item3" style="position:relative;z-index:90">
										<label>显示列数：</label>
										<div class="select_box3">
										<input autocomplete="off"  id="myselect" type="text" value="<s:property value="site.flushBonading.showListCount"/>" name="site.flushBonading.showListCount" readonly="readonly">
											<ul class="select_ul3">
												<li>2</li>
												<li>1</li>
											</ul>
										</div>
										<span>列</span>
										<em>（1-2列）</em>
									</div>
									<div class="item2" style="position:relative;z-index:80">
										<label>图片宽度：</label>
										<div class="textbox">
											<div class="textbox-l">
												<div class="textbox-r">
													<input autocomplete="off"  type="text" class="txt-width60" value="<s:property value="site.flushBonading.pictureWide"/>" name="site.flushBonading.pictureWide" />			
												</div>
											</div>
										</div>
										<span>px</span>
										<em>（60px - 120px）</em>
									</div>
								</div>
								<a  class="btn2">保 存</a>
								</form>
							</div>
							<div class="sbox-right">
								<h4>预览</h4>
								<div class="preview">
									<div class="v_items">
										<img src="../../images/yulan0201.jpg" alt="" />
										<img src="../../images/yulan0202.jpg" alt="" />
									</div>	
								</div>
							</div>
						</div></s:if>
						<s:if test="site.sitePlatform.floatWindow == 1">						<div id="i2" class="set-box" style="display:none;">
							<div class="sbox-left">
								<form autocomplete="off" id="form2" action="../../ViewSetting/view/!updateFloatWindow">
								<div class="top">
									<s:if test="site.floatWindow.isOpen == 0"><input autocomplete="off"  id="type2_c0" type="checkbox" value="1" name="site.floatWindow.isOpen"/></s:if>
									<s:elseif test="site.floatWindow.isOpen == 1"><input autocomplete="off"  id="type2_c0" type="checkbox" value="1" name="site.floatWindow.isOpen" checked="checked"/></s:elseif>	
									<label for="type2_c0">开启浮窗式</label>
									<%-- <input autocomplete="off"  type="hidden" name="site.floatWindow.id" value="<s:property value="site.floatWindow.id"/>"/>  --%>
								</div>
								<div class="display">
									<div class="item1">
										<label>显示模式：</label>
										<s:if test="site.floatWindow.showModel == 2">
											<span>
											<input autocomplete="off"  id="type2_r0" type="radio" checked="checked" name="site.floatWindow.showModel" value="2" />
										    <label for="type2_r0" style="cursor:pointer;">图片模式</label>
											</span>
											<span>
												<input autocomplete="off"  id="type2_r1" type="radio"  name="site.floatWindow.showModel" value="1" />
											    <label for="type2_r1" style="cursor:pointer;">文字模式</label>
											</span>
										</s:if>
										<s:elseif test="site.floatWindow.showModel == 1">
											<span>
											<input autocomplete="off"  id="type2_r0" type="radio" name="site.floatWindow.showModel" value="2" />
										    <label for="type2_r0" style="cursor:pointer;">图片模式</label>
											</span>
											<span>
												<input autocomplete="off"  id="type2_r1" type="radio" checked="checked"  name="site.floatWindow.showModel" value="1" />
											    <label for="type2_r1" style="cursor:pointer;">文字模式</label>
											</span>
										</s:elseif>
									</div>
									<div class="item1" style="position:relative;z-index:100">
										<label>显示位置：</label>
										<s:if test="site.floatWindow.showlocation == 0">
										    <span>
											    <input autocomplete="off"  id="type2_r3" type="radio" checked="checked" name="site.floatWindow.showlocation" value="0"  />
												<label for="type2_r3" style="cursor:pointer;">底部通栏</label>
										    </span> 
											<span>
												<input autocomplete="off"  id="type2_r4" type="radio"  name="site.floatWindow.showlocation" value="1" />
												<label for="type2_r4" style="cursor:pointer;">右侧</label>
											</span>
										</s:if>
										<s:elseif test="site.floatWindow.showlocation == 1">
										
											 <span>
											    <input autocomplete="off"  id="type2_r3" type="radio" name="site.floatWindow.showlocation" value="0"  />
												<label for="type2_r3" style="cursor:pointer;">底部通栏</label>
										    </span> 
											<span>
												<input autocomplete="off"  id="type2_r4" type="radio"  checked="checked" name="site.floatWindow.showlocation" value="1" />
												<label for="type2_r4" style="cursor:pointer;">右侧</label>
											</span>
											
										</s:elseif>
									</div>
									<div class="item3" style="position:relative;z-index:90">
										<label>显示条数：</label>
										<div class="select_box3"><input autocomplete="off"  id="myselect" type="text" value='<s:property value="site.floatWindow.showNumberCount"/>' name="site.floatWindow.showNumberCount" readonly="readonly">
											<ul class="select_ul3">
												<li>10</li>
												<li>9</li>
												<li>8</li>
												<li>7</li>
												<li>6</li>
												<li>5</li>
												<li>4</li>
												<li>3</li>
												<li>2</li>
												<li>1</li>
											</ul>
										</div>
										<span>条</span>
										<em>（1-10条）</em>
									</div>
									<!--行数-->
									<div class="item3" style="position:relative;z-index:80">
										<label>显示行数：</label>
										<div class="select_box3"><input autocomplete="off"  id="myselect" type="text" value='<s:property value="site.floatWindow.showLineCount"/>' name="site.floatWindow.showLineCount" readonly="readonly">
											<ul class="select_ul3">
												<li>4</li>
												<li>3</li>
												<li>2</li>
												<li>1</li>
											</ul>
										</div>
										<span>行</span>
										<em>（1-4行）</em>
									</div>
									<!--列数-->
									<div class="item3" style="position:relative;z-index:70">
										<label>显示列数：</label>
										<div class="select_box3"><input autocomplete="off"  id="myselect" type="text" value='<s:property value="site.floatWindow.showListCount"/>' name="site.floatWindow.showListCount" readonly="readonly">
											<ul class="select_ul3">
												<li>4</li>
												<li>3</li>
												<li>2</li>
												<li>1</li>
											</ul>
										</div>
										<span>列</span>
										<em>（1-4列）</em>
									</div>
									<div class="item2" style="position:relative;z-index:60">
										<label>图片宽度：</label>
										<div class="textbox">
											<div class="textbox-l">
												<div class="textbox-r">
													<input autocomplete="off"  type="text" class="txt-width60" value="<s:property value="site.floatWindow.pictureWide"/>" name="site.floatWindow.pictureWide" />			
												</div>
											</div>
										</div>
										<span>px</span>
										<em>（60px - 120px）</em>
									</div>
								</div>
								<a  class="btn2">保 存</a>
								</form>
							</div>
							<div class="sbox-right">
								<h4>预览</h4>
								<div class="preview" style="height:480px;">
									<div class="l_items">
										<img src="../../images/yulan0301.jpg" alt="" />
										<img src="../../images/yulan0303.jpg" alt="" />
										<img src="../../images/yulan0302.jpg" alt="" />
										<img src="../../images/yulan0304.jpg" alt="" />
									</div>	
								</div>
							</div>
						</div></s:if>
						<s:if test="site.sitePlatform.tagCloude == 1"><div id="i3" class="set-box" style="display:none;">
							<div class="sbox-left">
								<form autocomplete="off" id="form3" action="../../ViewSetting/view/!updateTagCloude">
								<%-- <input autocomplete="off"  type="hidden" name="site.tagCloude.id" value="<s:property value="site.tagCloude.id"/>"/>  --%>
								<div class="top">
									<s:if test="site.tagCloude.isOpen == 0"><input autocomplete="off"  id="type3_c0" name="site.tagCloude.isOpen" type="checkbox" value="1" /></s:if>
									<s:elseif test="site.tagCloude.isOpen == 1"><input autocomplete="off"  id="type3_c0" name="site.tagCloude.isOpen" type="checkbox" value="1" checked="checked"/></s:elseif>	
									<label for="type3_c0">开启标签云</label>
								</div>
								<div class="display">
									<div class="item3">
										<label>显示条数：</label>
										<div class="select_box3"><input autocomplete="off"  id="myselect" type="text" value='<s:property value="site.tagCloude.showNumberCount"/>' name="site.tagCloude.showNumberCount" readonly="readonly">
											<ul class="select_ul3" style="overflow-y:scroll;">
												<li>20</li>
												<li>19</li>
												<li>18</li>
												<li>17</li>
												<li>16</li>
												<li>15</li>
												<li>14</li>
												<li>13</li>
												<li>12</li>
												<li>11</li>
												<li>10</li>
												<li>9</li>
												<li>8</li>
												<li>7</li>
												<li>6</li>
												<li>5</li>
												<li>4</li>
												<li>3</li>
												<li>2</li>
												<li>1</li>
											</ul>
										</div>
										<span>条</span>
										<em>（1-20条）</em>
									</div>
								</div>
								<a  class="btn2">保 存</a>
								</form>
							</div>
							<div class="sbox-right">
								<h4>预览</h4>
								<div class="preview" style="height:480px;">
									<img src="../../images/yulan0401.jpg" alt="" />
								</div>
							</div>
						</div></s:if>
						<s:if test="site.sitePlatform.individuationArtical == 1"><div id="i4" class="set-box" style="display:none;">
							<div class="sbox-left">
								<form autocomplete="off" id="form4" action="../../ViewSetting/view/!updateIndividuationArtical">
								<%-- <input autocomplete="off"  type="hidden" name="site.individuationArtical.id" value="<s:property value="site.individuationArtical.id"/>"/>  --%>
								<div class="top">
									<s:if test="site.individuationArtical.isOpen == 0"><input autocomplete="off"  id="type4_c0" name="site.individuationArtical.isOpen" type="checkbox" value="1" /></s:if>
									<s:elseif test="site.individuationArtical.isOpen == 1"><input autocomplete="off"  id="type4_c0" name="site.individuationArtical.isOpen" type="checkbox" value="1" checked="checked"/></s:elseif>	
									<label for="type4_c0">开启个性化热文榜</label>
								</div>
								<div class="display">
									<div class="item1">
										<label>显示模式：</label>
										<s:if test="site.individuationArtical.showModel == 2">
											<span>
												<input autocomplete="off"  id="type3_r0" type="radio" checked="checked" name="site.individuationArtical.showModel" value="2" />
											    <label for="type3_r0" style="cursor:pointer;">图片模式</label>
											</span>
											<span>
												<input autocomplete="off"  id="type3_r1" type="radio"  name="site.individuationArtical.showModel" value="1" />
											    <label for="type3_r1" style="cursor:pointer;">文字模式</label>
											</span>
										</s:if>
										<s:elseif test="site.individuationArtical.showModel == 1">
											<span>
												<input autocomplete="off"  id="type3_r0" type="radio"  name="site.individuationArtical.showModel" value="2" />
											    <label for="type3_r0" style="cursor:pointer;">图片模式</label>
											</span>
											<span>
												<input autocomplete="off"  id="type3_r1" type="radio" checked="checked"  name="site.individuationArtical.showModel" value="1" />
											    <label for="type3_r1" style="cursor:pointer;">文字模式</label>
											</span>
										</s:elseif>
									</div>
									<div class="item3" style="position:relative;z-index:100">
										<label>显示条数：</label>
										<div class="select_box3"><input autocomplete="off"  id="myselect" type="text" value="<s:property value="site.individuationArtical.showNumberCount"/>" name="site.individuationArtical.showNumberCount" readonly="readonly">
											<ul class="select_ul3" style="overflow-y:scroll;">
												<li>20</li>
												<li>19</li>
												<li>18</li>
												<li>17</li>
												<li>16</li>
												<li>15</li>
												<li>14</li>
												<li>13</li>
												<li>12</li>
												<li>11</li>
												<li>10</li>
												<li>9</li>
												<li>8</li>
												<li>7</li>
												<li>6</li>
												<li>5</li>
												<li>4</li>
												<li>3</li>
												<li>2</li>
												<li>1</li>
											</ul>
										</div>
										<span>条</span>
										<em>（1-20条）</em>
									</div>
									<div class="item2" style="position:relative;z-index:90">
										<label>图片宽度：</label>
										<div class="textbox">
											<div class="textbox-l">
												<div class="textbox-r">
													<input autocomplete="off"  type="text" class="txt-width60" value="60" readonly="true"  <%--value="<s:property value="site.individuationArtical.pictureWide"/>"--%> name="site.individuationArtical.pictureWide" />				
												</div>
											</div>
										</div>
										<span>px</span>
										<%-- <em>（60px - 120px）</em>--%>
									</div>
								</div>
								<a  class="btn2">保 存</a>
								</form>
							</div>
							<div class="sbox-right">
								<h4>预览</h4>
								<div class="preview" style="height:440px;">
									<div class="v_items">
										<img style="height:440px" src="../../images/yulan0501.jpg" alt="" />
										<img style="height:440px" src="../../images/yulan0502.jpg" alt="" />
									</div>	
								</div>
							</div>
						</div></s:if>
						
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- content   结束 -->
	<!-- footer  开始 -->
	<div class="footer">
		<p><%@ include file="/foot.jsp"%></p>
	</div>
	<!-- footer  结束 -->
    <!-- 站点设置 -->
    <div class="site_setting_container">
       <div class="site_setting_wrap">
                <!-- site-ad  开始 -->
                <div class="site-ad">
                    <div class="click-btn"><s:property value="#session.sessionUser.address"/></div>
                    <ul class="this">
                        <s:iterator value="#session.sessionUser.sites"><li class="site"><a class="bg" href="../../SiteManager/site/!changeSiteOfSessionUser?siteId=<s:property value="id"/>"><s:property value="address"/></a></li></s:iterator>
                        <li class="site admin">
                            <span class="add-s"><a href="../../SiteManager/site/!showCheckingAddress">+添加站点</a></span>
                            <span class="s-ad"><a href="../../SiteManager/site/!index">站点管理></a> </span>
                        </li>
                    </ul>
                </div>
             <!-- site-ad 结束 -->
       </div>
    </div>
    <!-- 站点设置结束 -->
</body>
</html>