<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>流量交换-设置</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../css/exp.css" />
	<link rel="stylesheet" type="text/css" href="../../resources/ifmWidget/css/ifmWidget.css" />
	
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
<script type="text/javascript" src="../../js/regulateSize.js"></script>
<script type="text/javascript" src="../../js/changeSite.js"></script>
<script type="text/javascript" src="../../js/messageTip.js"></script>

	 <!-- 
	<script type="text/javascript" src="http://code.jquery.com/jquery.js"></script>
	 -->
	<script type="text/javascript"  src="../../resources/commons/jquery.form.js">
    </script>
    <script type="text/javascript"  src="../../resources/commons/jquery.validate.min.js">
    </script>
	<script type="text/javascript" src="../../resources/commons/jquery.tmpl.min.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.blockUI.js"></script>
	<script type="text/javascript" src="../../resources/ifmWidget/js/ifmWidget.js"></script>
	<script type="text/javascript" src="../../resources/jquery_tools/jquery.tools.min.js"></script>
	<script type="text/javascript" src="../../js/validateSession.js"></script>
	<script type="text/javascript" src="../../js/SourceShare/source-setting.js"></script>
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
				<li class="current">
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
	<div id="content" class="content" style="min-height:560px;">
		<div class="main">
			<div class="m-top">&nbsp;</div>
			<ul class="nav2">
				<li class=""><a href="../../SourceShare/source/!showSoureShare">网站列表</a></li>
				<li class="rbgno current"><a href="../../SourceShare/source/!showExchangeSetting">设置</a></li>
			</ul>
			<div class="m-con">
				<div class="con-2">
					<div class="arrow3">&nbsp;</div>
					<div class="section">
					  <div class="set-box">
						<div class="sbox-left" id="i4" style="width:400px;">
						<form action="../../SourceShare/source/!updateTrafficSetting" id="form1" autocomplete="off" >
							<input type="hidden" name="siteId" value='<s:property value="site.id"/>'>
							<input type="hidden" name="site.trafficExchange.id" value='<s:property value="site.trafficExchange.id"/>'>
							<input type="hidden" name="site.trafficExchange.isOpen" value='1'>
							<div class="display">
								<div class="item1">
									<s:if test="site.trafficExchange.showModel == 2">
											<span>
											<input id="type0_r0" type="radio" checked="checked" name="site.trafficExchange.showModel" value="2" />
										    <label for="type0_r0" style="cursor:pointer;">图片模式</label>
											</span>
											<span>
												<input id="type0_r1" type="radio"  name="site.trafficExchange.showModel" value="1" />
											    <label for="type0_r1" style="cursor:pointer;">文字模式</label>
											</span>
										</s:if>
										<s:elseif test="site.trafficExchange.showModel == 1">
											<span>
											<input id="type0_r0" type="radio"  name="site.trafficExchange.showModel" value="2" />
										    <label for="type0_r0" style="cursor:pointer;">图片模式</label>
											</span>
											<span>
												<input id="type0_r1" type="radio" checked="checked"  name="site.trafficExchange.showModel" value="1" />
											    <label for="type0_r1" style="cursor:pointer;">文字模式</label>
											</span>
										</s:elseif>
								</div>
								<!-- 新填加 -->
								<div class="item3">
										<label>显示行数：</label>
										<div class="select_box3"><input id="myselect" type="text" value="<s:property value="site.trafficExchange.showLineCount"/>" name="site.trafficExchange.showLineCount" readonly="readonly">
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
									<div class="item3">
										<label>显示列数：</label>
										<div class="select_box3"><input id="myselect" type="text" value="<s:property value="site.trafficExchange.showListCount"/>" name="site.trafficExchange.showListCount" readonly="readonly">
											<ul class="select_ul3">
												<li>2</li>
												<li>1</li>
											</ul>
										</div>
										<span>列</span>
										<em>（1-2列）</em>
									</div>
									<div class="item2">
										<label>图片宽度：</label>
										<div class="textbox">
											<div class="textbox-l">
												<div class="textbox-r">
													<input type="text" class="txt-width60" value="<s:property value="site.trafficExchange.pictureWide"/>" name="site.trafficExchange.pictureWide" />			
												</div>
											</div>
										</div>
										<span>px</span>
										<em>（60px - 120px）</em>
									</div>
								<!-- 
								<div class="item2">
									<label>显示条数：</label>
									<div class="select_box2">
									<input id="myselect" type="text" value="请选择" readonly="readonly" autocomplete="off" >
									<input  type="hidden" value="<s:property value="site.trafficExchange.showNumberCount"/>" name="site.trafficExchange.showNumberCount" >	
										<ul class="select_ul2">
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
								</div>
								<div class="item3">
									<label>图片宽度：</label>
									<div class="textbox">
										<div class="textbox-l">
											<div class="textbox-r">
												<input type="text" class="txt-width50" value="<s:property value="site.trafficExchange.pictureWide"/>" name="site.trafficExchange.pictureWide" />				
											</div>
										</div>
									</div>
									<span>px</span>
								</div>
								-->
							</div>
							<div class="display">
								<dl>
									<dt>流量交换验证方式：</dt>
									<dd>
									<s:if test="site.trafficExchange.changeType == 1">
									      <div class="traffic_type_lable">
									         <input type="radio" id="t01" value="1" name="site.trafficExchange.changeType" checked="checked">
									         <label for="t01" style="cursor:pointer;">手动审核</label>
									      </div>
									</s:if>
									<s:elseif test="site.trafficExchange.changeType == 0">
									      <div class="traffic_type_lable">
									         <input type="radio" id="t01" value="1" name="site.trafficExchange.changeType">
									         <label for="t01" style="cursor:pointer;">手动审核</label>
									      </div>
									</s:elseif>
										<p>
											<em>该选项用于控制流量交换网站的质量</em>
										</p>
									</dd>
									<dd>
									<s:if test="site.trafficExchange.changeType == 0">
									         <div class="traffic_type_lable">
									         	<input type="radio" id="t02" checked="checked" value="0" name="site.trafficExchange.changeType">
									            <label for="t02" style="cursor:pointer;">自动通过</label>
									         </div> 
								    </s:if>
						            <s:elseif test="site.trafficExchange.changeType == 1">
						                     <div class="traffic_type_lable">
									         	<input type="radio" id="t02" value="0" name="site.trafficExchange.changeType">
									            <label for="t02" style="cursor:pointer;">自动通过</label>
									         </div> 
						             </s:elseif>
										<p>
											<!-- <span>自动通过</span> -->
											<em>该选项用于提高交换效率</em>
										</p>
									</dd>
								</dl>
							</div>
							<a class="btn">保 存</a>
							</form>
							<div class="notice">
								<span class="blue-tit" id="tit">停用流量交换</span>
								<p>注意：停用流量交换后，与其他网站建立的关系将全部清除，<em class="red">无法恢复</em>，请谨慎使用。</p>
							</div>
						</div>
						<div class="set-right ">
							<h4>预览：</h4>
							<div class="preview" style="height:345px;">
									<div class="v_items">
										<img src="../../images/yulan0601.jpg" alt="" />
										<img src="../../images/yulan0602.jpg" alt="" />
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