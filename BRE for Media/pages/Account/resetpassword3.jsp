<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>重设密码</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/plugin.css" />
	<link rel="stylesheet" type="text/css" href="../../css/exp.css" />
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
<script type="text/javascript" src="../../js/regulateSize.js"></script>
	<script type="text/javascript" language="JavaScript" src="../../resources/commons/jquery.form.js">
    </script>
    <script type="text/javascript" language="JavaScript" src="../../resources/commons/jquery.validate.min.js">
    </script>
    <script type="text/javascript" language="JavaScript" src="../../js/Account/resetpassword3.js">
    </script>
<link rel="shortcut icon" href="../../favicon.ico" >
             </head>
<body style="background:url(../../images/bodybg.png) 0 0;position:relative;">
	<div class="page">
		<div id="login-area">
			<div class="la-logo"><a href="../../"><img src="../../images/logo03.gif" alt="返回首页"></a></div>
			<div class="la-box5">
				<h2>重设密码</h2>
				<div class="main">
					<form  id="form1" action="test">
						<div class="item">
							<label class="tr">新密码</label>
							<span class="input-box"><input type="text" name="user.password" id="password" onselectstart="return false;" ondragenter="return false;" onpaste="return false;"/></span>
						</div>
						<div class="item">
							<label>再输一次</label>
							<span class="input-box"><input type="text" name="repassword" onselectstart="return false;" ondragenter="return false;" onpaste="return false;"/></span>
						</div>
						<a href="javascript:void(0)" id="sub" class="blue-btn1">
							<span>确认新密码</span>
						</a>
					</form>
				</div>
			</div>
		</div>
		<div class="footer">
			<p><%@ include file="/foot.jsp"%></p>
		</div>
	</div>
</body>
</html>