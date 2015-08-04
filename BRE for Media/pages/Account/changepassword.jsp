<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>账号设置</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../css/exp.css" />
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
<script type="text/javascript" src="../../js/regulateSize.js"></script>
	<script type="text/javascript" language="JavaScript" src="../../resources/commons/jquery.form.js">
    </script>
    <script type="text/javascript" language="JavaScript" src="../../resources/commons/jquery.validate.min.js">
    </script>
    <script type="text/javascript" language="JavaScript" src="../../js/Account/changepassword.js">
    </script>
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
					<li><a href="#">帮助中心</a></li>
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
				<li class="">
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
			</ul>
		</div>
	</div>
	<!-- header 结束 -->
	<!-- content   开始 -->
	<div id="content" class="content">
		<div class="main">
			<div class="m-top">&nbsp;</div>
			<div class="m-title">账号设置<span> > 修改密码</span></div>
			<div class="m-con border-top">
				<div class="con-7">
				  <form id="form1" action="/ifm/Account/user/!update">
					<div class="mailbox">
						<label>电子邮箱：</label>
						<span>ceshi@163.com</span>
					</div>
					<div class="item2">
						<label>当前密码：</label>
						<span class="input-box"><input type="password" name="'user.password'"/></span>
					</div>
					<div class="item3">
						<label>新&nbsp;密&nbsp;码：</label>
						<span class="input-box"><input type="password" name="newpassword"/></span>
					</div>
					<p class="note">6-16个字符（字母、数字、符号）</p>
					<div class="item2">
						<label>确认密码：</label>
						<span class="input-box"><input type="password" name="renewpassword"/></span>
					</div>
					<a class="save-btn" id="sub">保存修改</a>
					</form>
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