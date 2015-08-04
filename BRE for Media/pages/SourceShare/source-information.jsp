<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8"/>
	<title>流量交换-详情页</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../resources/ifmWidget/css/ifmWidget.css" />
	<link rel="stylesheet" type="text/css" href="../../css/plugin.css" />
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
<script type="text/javascript" src="../../js/regulateSize.js"></script>
<script type="text/javascript" src="../../js/changeSite.js"></script>
<script type="text/javascript" src="../../js/messageTip.js"></script>
	 <script type="text/javascript" src="../../resources/animate/jquery.highlightFade.js">
   </script>
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/lib/highcharts.js"></script>
	<script type="text/javascript" src="../../resources/commons/list_tools.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.tmpl.min.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.blockUI.js"></script>
	<script type="text/javascript" src="../../resources/ifmWidget/js/ifmWidget.js"></script>
	<script type="text/javascript" src="../../resources/jquery_tools/jquery.tools.min.js"></script>
		<script type="text/javascript" src="../../js/validateSession.js"></script>
	<script type="text/javascript" src="../../js/SourceShare/source-information.js"></script>
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
	<div class="content">
		<div class="main">
			<div class="m-top">&nbsp;</div>
			<ul class="nav2">
				<li class="current"><a href="../../SourceShare/source/!showSoureShare">网站列表</a></li>
				<li class="rbgno"><a href="../../SourceShare/source/!showExchangeSetting">设置</a></li>
			</ul>
			<div class="m-con padding-bottom16">
			<input type="hidden" name="siteId" id="siteId" value="<s:property value="site.id"/>">
				<div class="con-4">
					<div class="arrow2"></div>
					<div class="summary">
						<div class="s-left">
							<a href="../../SourceShare/source/!showSoureShare" class="return">流量交换&nbsp;></a> 
							<div class="s-title" data-siteid="<s:property value="site.id"/>">
								<h2><s:property value="site.name"/></h2>
								<s:if test="appBeApplicaion.state == 0">
								    <span class="green-btn"><a>申请交换</a></span>
								</s:if>
								<s:elseif test="appBeApplicaion.state == 1">
									<s:if test="appBeApplicaion.application.id == site.id">
									    <span class="green-btn"><a>通过</a></span>
									    <span class="white-btn"><a>拒绝</a></span>
									</s:if>
									<s:else>
									    <span class="white-btn"><a>申请中</a></span>
									</s:else>
								</s:elseif>
								<s:elseif test="appBeApplicaion.state == 2">
									<span class="white-btn"><a>取消交换</a></span>
								</s:elseif>
								<s:else></s:else>
							</div>
							<span class="site"><s:property value="site.address"/></span>
							<div class="s-main">
								<div class="line">
									<span class="name">网站类型：</span>
									<p><s:property value="site.type.name"/></p>
								</div>
								<div class="line">
									<span class="name">网站描述：</span>
									<p><s:property value="site.describe"/></p>
								</div>
								<div class="line">
									<span class="name">联系方式：</span>
									<p>
									      <em class="m" id="sendMessage" data-blackstatu="<s:property value="blackStatu"/>" data-siteid="<s:property value="site.id"/>">&nbsp;</em>
									      <!--<em class="qq">&nbsp;</em>-->
									    <s:if test='%{site.qqNumber != null && site.qqNumber !=""}'>
									    	<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=<s:property value="site.qqNumber"/>&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:<s:property value="site.qqNumber"/>:41" alt="点击这里给我发消息" title="点击这里给我发消息"></a>
									    </s:if> 
									</p>
								</div>
							</div>
						</div>
						<div class="s-right">
							<div>与您文章内容相似度：</div>
							<div data-value="<s:property value="similasite"/>" id="chart" style="margin: 10px 0 0 80px;width:172px;height:172px; position: relative;">
							</div>
						</div>
					</div>
					<div class="nav3">
						<ul class="">
							<li class="br-no"><a  class="curr">热门文章</a></li>
							<li class="ml24 br-no">猜你感兴趣：</li>
							<s:iterator value="tags" var="tag" >
								<li><a  class=""><s:property value="tag"/></a></li>
							</s:iterator>
						</ul>
					</div>
					<div id="list" style="overflow:hidden;position:relative;width:873px;min-height:201px;">
						<div style="width:90000%;height:100%;position:absolute;">
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
	<div class="float-layer w372" id="sendMessageDialog" style="display:none;">
			<div class="fl-title">
				<h4>写信</h4>
				<a>&nbsp;</a>
			</div>
			<div class="fl-content3">
				<div style="display:none;height:200px;">
					<div class="item">
						<label>发给：</label>
						<span class="text"><s:property value="site.name"/></span>
					</div>
					<div class="item2">
						<label>内容：</label>
						<textarea node-type="textEl" tabindex="1" ></textarea>
					</div>
					<div class="fot">
						<span class="tex">还可以输入300字</span>
						<div class="fr">
							<em>取消</em>
							<a class="blue-btn1" href="#">
								<span>发 送</span>
							</a>
						</div>
					</div>
				</div>
				<div style="display:none;">
				    <span class="d-tip" style="margin:25px 0 25px 0px;">提示：已将对方加入黑名单[<a  class="link">解除</a>]
				</div>
				<div  style="display:none;">
					<span class="d-tip"  style="margin:25px 0 25px 0px;">提示：抱歉，根据对方设置，你暂时<br/>不能给对方发送私信哦~</span>
				</div>
				<div style="display:none;">
				    <span class="d-tip"  style="float:left;width:320px;margin:25px 0 0 0px;">提示1：抱歉，根据对方设置，你暂时不能给对方发送私信哦~</span>
				    <span class="d-tip"  style="float:left;margin:0 0 25px 0px;">&nbsp;提示2：已将对方加入黑名单[<a  class="link">解除</a>]'</span>
				</div>
			</div>
		</div>
</body>
</html>