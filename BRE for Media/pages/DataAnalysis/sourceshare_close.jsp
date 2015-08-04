<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>数据分析-概况2</title>
        <meta name="keywords" content=""/>
        <meta name="description" content=""/>
        <link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
        <link rel="stylesheet" type="text/css" href="../../css/exp.css" />
		<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
		<script type="text/javascript" src="../../js/validateSession.js"></script>
<script type="text/javascript" src="../../js/regulateSize.js"></script>
<script type="text/javascript" src="../../js/changeSite.js"></script>
<script type="text/javascript" src="../../js/messageTip.js"></script>
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
				<li class="current" >
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
        <!-- header 结束 --><!-- main   开始 -->
        <div class="content">
            <div class="main" style="height:530px;">
                <div class="m-top">
                    &nbsp;
                </div>
                <ul class="nav2">
                   <li><a href="../../DataAnalysis/stat/!synthetical.action">概况</a></li>
			<li><a href="../../DataAnalysis/stat/!articles.action">文章分析</a></li>
			<li><a href="../../DataAnalysis/stat/!articlesRecommand.action">文章推荐插件</a></li>
			<li class="rbgno current"><a href="../../DataAnalysis/stat/!sourcshare.action">流量交换</a></li>
                </ul>
					<div class="m-con p0">
						<div class="con-4">
							<div class="arrow"></div>
						</div>
					</div>
					<div class="not-found">
						<span class="the"><img src="../../images/sorry.png" alt="抱歉"></span>
						<p class="text">您的网站暂未开通流量交换功能，无法查看数据。<br><a href="../../SourceShare/source/!showSoureShare">【了解流量交换】</a></p>
					</div>
            </div>
        </div>
        <!-- main   结束 -->
        <!-- footer  开始 -->
        <div class="footer">
            <p>
               <%@ include file="/foot.jsp"%>
            </p>
        </div>
        <!-- footer  结束 -->
	<!-- footer  结束 -->
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