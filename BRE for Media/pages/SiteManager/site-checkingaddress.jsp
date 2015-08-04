<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>添加站点</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../css/exp.css" />
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
<script type="text/javascript" src="../../js/regulateSize.js"></script>
	<script type="text/javascript"  src="../../resources/commons/jquery.form.js">
    </script>
    <script type="text/javascript"  src="../../resources/commons/jquery.validate.min.js">
    </script>
    <script type="text/javascript" src="../../js/validateSession.js"></script>
	<script type="text/javascript" src="../../js/SiteManager/site-checkingaddress.js"></script>
	<script type="text/javascript">
		function changeTab(a){
			var lis = document.getElementById('nav').getElementsByTagName("li");
			//alert("111");
			for (var i=0;i<lis.length;i++) {
				if(lis[i]==a){									lis[i].className="current";
				}else{
					lis[i].className="";				}
			}
		}
	</script><link rel="shortcut icon" href="../../favicon.ico" >
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
	<div class="content">
		<div class="main">
			<div class="m-top">&nbsp;</div>
			<div class="m-title">添加站点</div>
			<div class="m-con border-top">
								<div class="con-5">
					<div class="add-site-tit2">
						<a href="javascript:void(0)" class="set-btn3">验证网站</a>
						<a href="javascript:void(0)" class="set-btn4">安装插件</a>
					</div>
					<div class="add-site-c">
							<form id="form1" action="../../SiteManager/site/" method="post">
								<div class="item2">
									<label>请输入网址：</label>
									<span class="name">http://</span>
									<span class="input-box">
										<input type="text" id="address" name="site.address" value="<s:property value="siteName"/>"/>
									</span>
									<!--
									<strong class="wrong">域名格式错误，请重新输入</strong>
									  -->
								</div>
							</form>	
							<form id="form2" action="../../SiteManager/site/!showCheckingFile" method="post">
								<input type="hidden" name="site.address" id="address2"/>
							</form>
						<div class="btn">
							<a class="btn5" id="sub"><span>确定</span></a>
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