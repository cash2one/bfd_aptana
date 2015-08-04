<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>选择平台</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../css/exp.css" />
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
	<script type="text/javascript" src="../../js/validateSession.js"></script>
    <script type="text/javascript" src="../../js/regulateSize.js"></script>
	<script type="text/javascript" src="../../js/SiteManager/site-selectplatform.js"></script>
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
            
			
		</div>
	</div>
	<!-- header 结束 -->
	<!-- content   开始 -->
	<div class="content" style="min-height:500px;">
		<div class="main">
			<div class="m-top">&nbsp;</div>
			<div class="m-title">添加站点</div>
			<div class="m-con mb300">
				<div class="con-5">
					<div class="add-site-tit3">
						<a href="#" class="set-btn1">验证网站</a>
						<a href="#" class="set-btn2">安装插件</a>
					</div>
					<div class="add-site-c">
						<span class="top">当前站点：&nbsp;<strong><s:property value="#session.sessionUser.address"/></strong></span>
						<div class="item">
							<label>建站平台：</label>
							<div class="select_box"><input autocomplete="off" type="text" value="请选择平台" readonly="readonly">
								<ul class="select_ul">
									<s:iterator value="sitePlatforms">
										<li data-value="<s:property value="id"/>"><s:property value="name"/></li>
									</s:iterator>
								</ul>
							</div>
						</div>
						<p class="font-color">若需要手动安装代码，请选择“代码安装”选项</p>
						<div class="btn" style="display:none">
						 <form autocomplete="off" id="form1" action="../../SiteManager/site/!selectPlatform" method="post">
						    <input autocomplete="off" type="hidden" name="site.sitePlatform.id" id="plant" value='<s:property value="sitePlatformId"/>'/> 
						 </form>
							<a class="btn3" id="sub"><span>获取插件</span></a>
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
</body>
</html>