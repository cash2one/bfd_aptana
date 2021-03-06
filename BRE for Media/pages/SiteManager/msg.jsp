<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>消息-系统通知</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../resources/baifendianWidgetsCombo/commons/lib/jquery.pagination/css/pagination.css" />
	<link rel="stylesheet" type="text/css" href="../../resources/ifmWidget/css/ifmWidget.css" />
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
    <script type="text/javascript" src="../../js/regulateSize.js"></script>
	<script type="text/javascript" src="../../resources/animate/jquery.highlightFade.js">
    </script>
    <script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/date_tools.js"></script>
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/lib/jquery.pagination/jquery.pagination.js"></script>
	<script type="text/javascript" src="../../resources/commons/list_tools.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.tmpl.min.js"></script>
		<script type="text/javascript" src="../../resources/commons/jquery.blockUI.js"></script>
	<script type="text/javascript" src="../../resources/ifmWidget/js/ifmWidget.js"></script>
	<script type="text/javascript" src="../../js/validateSession.js"></script>
	<script type="text/javascript" src="../../js/SiteManager/message.js"></script>
	<script type="text/javascript">
		function changeTab(a){
			var lis = document.getElementById('nav').getElementsByTagName("li");
			for (var i=0;i<lis.length;i++) {
				if(lis[i]==a){				
	
					lis[i].className="current";
				}else{
					lis[i].className="";
	
				}
			}
		}
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
			<div class="m-title">消息</div>
			<div class="m-con border-top">
				<div class="section">
					<div class="choose-area margin-top0">
						<ul class="choose">
							<li class="current"><a>系统通知(0)</a></li>
							<li><a>私信(0)</a></li>
						</ul>
						<a class="blacklist">黑名单 >></a>
					</div>
					<div id="m0"  style="display:none;">
					<div class="all-dialog">共有0条系统通知</div>
						<ul class="dialog-box">
						</ul>
						<div class="click" style="display:none;">
							<div class="c-left">
								<a class="check-all">全选</a>
								<a class="dele">删除</a>
							</div>
							
							<ul class="page"></ul>
							
						</div>
					</div>
					<div id="m1"  style="display:none;">
						<div class="all-dialog" >共有0条私信</div>
						<ul class="dialog-box" >
						</ul>
						<div class="click" style="display:none;">
							<div class="c-left">
								<a class="check-all">全选</a>
								<a class="dele">删除</a>
							</div>
							<ul class="page"></ul>
						</div>
					</div>
					<div class="blacklist-con" id="m2" style="display:none;">
						<h3>黑名单</h3>
						<ul style="margin-bottom:0">
							<li class="border">
								<span class="ft-b mr260">网站</span>
								<span class="ft-b">加入黑名单时间</span>
								<span class="ft-b fr">操作</span>
							</li>
						</ul>
						<ul id="blacklist-ul">	
						</ul>
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
</body>
</html>