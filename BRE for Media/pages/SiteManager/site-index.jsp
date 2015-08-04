<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>站点管理</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../css/exp.css" />
	<link rel="stylesheet" type="text/css" href="../../resources/ifmWidget/css/ifmWidget.css" />
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
<script type="text/javascript" src="../../js/regulateSize.js"></script>
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/lib/jquery.qtip-1.0.0.min.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.tmpl.min.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.blockUI.js"></script>
	<script type="text/javascript" src="../../resources/ifmWidget/js/ifmWidget.js"></script>
	<script type="text/javascript" src="../../js/validateSession.js"></script>
	<script type="text/javascript" src="../../js/SiteManager/site-index.js"></script> 
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
			<div class="m-title">站点管理</div>
			<div class="m-con border-top">
				<div class="con-5">
					<table class="data-tab2" cellspacing="0" cellpadding="0" border="0">
					    <thead>
							<tr class="bg">
								<th style="text-align:center;" class="w284">网站</th>
								<th style="text-align:center;" class="w200">插件安装状态</th>
								<th style="text-align:center;" class="brn">操作</th>
							</tr>
						</thead>
						<tbody>
							<s:iterator value="sites">
								<tr data-site="<s:property value="address"/>">
									<s:if test="state == 0">
										<td><span class="color"><s:property value="address"/></span></td>
										<td style="text-align:center;"><span class="red">×未安装</span></td>
										<td class="brn padding-left14">
											<span class="operate-btn "><a data-site="<s:property value="address"/>">安装插件</a></span>
											<span class="operate-btn margin0"><a data-site="<s:property value="address"/>">网站信息</a></span>
										</td>
									</s:if>
									<s:elseif test="state == 1">
										<td><span class="color"><a href="javascript:void(0)" data-site="<s:property value="address"/>"><s:property value="address"/></a></span></td>
										<td style="text-align:center;"><span class="green">√正常</span></td>
										<td class="brn padding-left14">
											<span class="operate-btn"><a>管理后台</a></span>
											<span class="operate-btn"><a data-site="<s:property value="address"/>">安装插件</a></span>
											<span class="operate-btn "><a data-site="<s:property value="address"/>">网站信息</a></span>
										</td>
									</s:elseif>
									<s:elseif test="state == 2">
										<td><span class="color"><a href="javascript:void(0)" data-site="<s:property value="address"/>"><s:property value="address"/></a></span></td>
										<td style="text-align:center;"><span class="red">×未安装</span><img align="absmiddle" src="../../images/az-bg.png" class="az" /></td>
										<td class="brn padding-left14">
										<span class="operate-btn"><a>管理后台</a></span>
										<span class="operate-btn"><a data-site="<s:property value="address"/>">安装插件</a></span>
										<span class="operate-btn "><a data-site="<s:property value="address"/>">网站信息</a></span>
										</td>
									</s:elseif>
									<s:else></s:else>
								</tr>
							</s:iterator>
						</tbody>
					</table>
					<a href="../../SiteManager/site/!showCheckingAddress" class="add-btn">添加站点</a>
					<div class="tip-w position-2">
						<p>网站异常...</p>
					</div>
					<!-- 
					<form action="../../SiteManager/site/!showSelectPlatform2" id="form1" method="post">
						<input type="hidden" name="address" id="hiddenDom"/>
					</form>
					<form action="../../SiteManager/site/!showEditInformation" id="form2" method="post">
						<input type="hidden" name="address" id="hiddenDom2"/>
					</form>
					<form action="../../ViewSetting/view/!showViewSetting" id="form3" method="post">
						<input type="hidden" name="address" id="hiddenDom3"/>
					</form>
					-->
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