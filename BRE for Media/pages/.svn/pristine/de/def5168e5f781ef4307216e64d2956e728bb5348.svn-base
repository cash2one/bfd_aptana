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
    <script type="text/javascript" src="../../js/validateSession.js"></script>
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
	<div id="content" class="content">
		<div class="main">
			<div class="m-top">&nbsp;</div>
			<div class="m-title">账号设置<span> > 修改密码</span></div>
			<div class="m-con border-top">
				<div class="con-7">
				  <form id="form1" action="../../Account/user/!update" autocomplete="off">
					<div class="mailbox">
						<label>电子邮箱：</label>
						<span><s:property value="#session.sessionUser.username" /></span>
						<input type="hidden" name="user.username" value="<s:property value="#session.sessionUser.username" />"/>
					</div>
					<div class="item2">
						<label>当前密码：</label>
						<span class="input-box"><input type="password" name="user.password" onselectstart="return false;" ondragenter="return false;" onpaste="return false;"/></span>
					</div>
					<div class="item3">
						<label>新&nbsp;密&nbsp;码：</label>
						<span class="input-box"><input type="password" name="newpassword" id="password" onselectstart="return false;" ondragenter="return false;" onpaste="return false;"/></span>
					</div>
					<p class="note">6-16个字符（字母、数字、符号）</p>
					<div class="item2">
						<label>确认密码：</label>
						<span class="input-box"><input type="password" name="renewpassword" onselectstart="return false;" ondragenter="return false;" onpaste="return false;"/></span>
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
</body>
</html>