<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<meta charset="utf-8"/>
	<title>自盈利-商品推荐栏</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../css/exp.css" />
	<link rel="stylesheet" type="text/css" href="../../resources/ifmWidget/css/ifmWidget.css" />
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
<%-- <script type="text/javascript" src="../../js/regulateSize.js"></script> --%>
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
	<script type="text/javascript" src="../../js/Promo/profit-commodityRecommendedBar.js"></script>
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
				<li>
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
				<li class="current">
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
			<ul class="nav2">
				<li><a href="../../DataAnalysis/stat/!income.action">收益统计</a></li>
				<li><a href="../../Promo/income/!showCps.action">收益提现</a></li>
				<li  class="current"><a href="../../Promo/profit/!showRecommendedBar">商品推荐栏</a></li>
				<li class="rbgno"><a href="../../Promo/profit/!showWaterfall">电商频道</a></li>
			</ul>
			<div class="m-con">
				 <div class="con-1">
				 	  <div class="arrow3"></div>
					  <div class="section" style="position:relative;overflow:hidden;height:725px;">
							   <div style="height: 20000em;position: absolute;">
							   <s:if test="recommendedBar.createDate != null">
							   		<div class="set-box" style="height:725px;display:none;">
					  	      			
					  	      		</div>
							   </s:if>
							   <s:else>
							   		<div class="set-box promo-product-ad" style="height:725px">
								   		  <h2>开启商品推荐栏给您带来：</h2>
										  <div class="promo-product-ad-description">
										  	  <ul>
										  	  	   <li>丰富网站内容，增加商品推荐</li>
												   <li>增加站长流量变现的渠道，快速变现</li>
												   <li>智能推荐网站内容相关商品，增加转化率</li>
										  	  </ul>
										  </div>
										  <div class="promo-product-ad-openbutton">
										     	<button id="open">立即开启</button>
										  </div>
										  <div class="promo-product-ad01"></div>
										  
					  	      </div>	
							   </s:else>
						  	  <div class="set-box" style="height:390px">
						  	  	   <div class="sbox-left" id="i4" style="width:800px;">
								     <form id="form1" action="../../Promo/profit/!updateRecommendedBar" class="setting-form">
									   <div class="top">
									   		<s:if test="recommendedBar.isOpen == 1"><input type="checkbox" checked="checked" value="1" name="isOpen" id="type0_c0" autocomplete="off"></s:if>
									   		<s:else><input type="checkbox" value="1" name="isOpen" id="type0_c0" autocomplete="off"></s:else>
											<label for="type0_c0">开启商品推荐栏</label><em>完成设置后您网站就可以具有个性化推荐商品功能</em>
										</div>
								        <div class="display" style="margin-left:98px;*margin-left:115px;">
										       	 <div class="item2">
													<label>商品推荐栏名称：</label>
													<div class="textbox">
														<div class="textbox-l">
															<div class="textbox-r">
																<input type="text" style="text-align: left;" class="txt-width100" name="recommendedBar.name" value="<s:property value="recommendedBar.name"/>" id="promo_label" autocomplete="off"/>			
															</div>
														</div>
													</div>
													<em>商品推荐标题，2-6个中文。</em>
												</div>
												<div class="item3" style="position:relative;z-index:100;">
													<label>商品推荐栏行数：</label>
													<div class="select_box3 select_box3_l1"><input type="text" readonly="readonly" name="recommendedBar.showLineCount" value="<s:property value="recommendedBar.showLineCount"/>" id="promo_row" autocomplete="off" class="valid">	
														<ul class="select_ul3" style="">
															<li>2</li>
															<li>1</li>
														</ul>
													</div>
													<em>1-2行商品推荐栏</em>
												</div>
												<div class="item3" style="position:relative;z-index:90;">
													<label style="width:126px;margin-left:-10px;overflow:visible;">推荐栏商品数量：</label>
													<div class="select_box3 select_box3_l1"><input type="text" readonly="readonly" name="recommendedBar.numberInLine"  value="<s:property value="recommendedBar.numberInLine"/>" id="promo_col" autocomplete="off" class="valid">	
														<ul class="select_ul3" style="">
															<li>5</li>
															<li>4</li>
															<li class="active">3</li>
														</ul>
													</div>
													<em>商品推荐栏一行放置商品数量</em>
												</div>
												<div class="item3" style="position:relative;z-index:80;">
													<label>推荐栏商品类型：</label>
													<div class="select_box3 select_box3_l1"><input type="text" readonly="readonly"  value="请选择" name="selectBox" autocomplete="off" class="valid">	
														<input type="hidden" name="channelss" value="<s:property value="channel.channelId"/>" id="promo_type" autocomplete="off"/>
														<ul class="select_ul3" style="">
															<s:iterator value="channels">
																<li data-value='<s:property value="channelId"/>'><s:property value="name"/></li>
															</s:iterator>
														</ul>
													</div>
													<em>推荐商品是根据商品类型进行展示</em>
												</div>
												<div class="item2" style="position:relative;z-index:70;">
													<label>&nbsp;</label>
													<div class="textbox">
														<!--
														<a class="btn2" style="margin-left:0; float:left;">保 存</a><a class="btn2" style="margin-left:5px; float:left;">预 览</a>
													   -->
													   <a class="blue-btn1" id="btn1">
															<span style="color: #FFFFFF;">保 存</span>
														</a>
														<a class="green-btn1" id="btn2">
															<span style="color: #FFFFFF;">预览效果</span>
														</a>
													</div>
												</div>
								       	</div>
									 </form>
								   </div>
							  <div class="set-right " style=" overflow: visible;display:none;">
								<h4>商品推荐栏动态预览：</h4>
								<div class="pre-promo-box" >
										<span class="box-title">
											<%-- dsaffffffffffff --%>
										</span>
										<ul>
										  <%-- 
											<li>
												<a href="#">
													<img src="../../images/pic-38.jpg"/>
													<label>【数码节狂促1000台】抢到赚到尼康D3000！</label>
												</a>
											</li>
											<li>
												<a href="#">
													<img src="../../images/pic-38.jpg"/>
													<label>【数码节狂促1000台】抢到赚到尼康D3000！</label>
												</a>
											</li>
											<li>
												<a href="#">
													<img src="../../images/pic-38.jpg"/>
													<label>【数码节狂促1000台】抢到赚到尼康D3000！</label>
												</a>
											</li>
											<li>
												<a href="#">
													<img src="../../images/pic-38.jpg"/>
													<label>【数码节狂促1000台】抢到赚到尼康D3000！</label>
												</a>
											</li>
											
											<li>
												<a href="#">
													<img src="../../images/pic-38.jpg"/>
													<label>【数码节狂促1000台】抢到赚到尼康D3000！</label>
												</a>
											</li>
											--%>
										</ul>
										
										<span class="box-bottom">推豆儿</span>
								</div>
							</div>
						  </div>	
						  
						  </div>
						  
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
