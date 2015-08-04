<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>自盈利-收益统计</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../css/exp.css" />
	
	<link rel="stylesheet" type="text/css" href="../../resources/baifendianWidgetsCombo/models/grid/requires/baeGrid/theme/ifm/css/grid.css" />
	<link rel="stylesheet" type="text/css" href="../../resources/baifendianWidgetsCombo/commons/lib/jquery.pagination/css/pagination.css" />
	
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
	<script type="text/javascript" src="../../js/validateSession.js"></script>
	<script type="text/javascript" src="../../js/regulateSize.js"></script>
	<script type="text/javascript" src="../../js/changeSite.js"></script>
	<script type="text/javascript" src="../../js/messageTip.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.blockUI.js"></script>
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/load.js">
    </script>
    
    <script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/lib/jquery.pagination/jquery.pagination.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.tmpl.min.js"></script>
	<script type="text/javascript" src="../../resources/commons/list_tools.js"></script>
	<script type="text/javascript" src="../../js/DataAnalysis/income.js"></script>
    
	<script type="text/javascript">
	new BaifendianWidgets({
             pageId:'ifm_union_income',
             theme:'ifm',
             _dataUrl:'../../DataAnalysis/stat.action?__='+(+new Date),
             beforeWidgetRander:function(setting){
            	 $.each(setting.configs,function(i,item){
	      	           if(item.type==='grid'){
	      	              item.theme='ifm_mHead'
	      	           }
	      	     })
	      	     MadeList(setting.global.dateRange)
             }
		})
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
				<li>
					<a href="../../SourceShare/source/!showSoureShare">
                    <em class="icon4">&nbsp;</em>
                    <span>流量交换</span>
                    <strong>&nbsp;</strong>
                    </a>
				</li>
				<li class="current">
					<a href="#">
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
	<div id="content" class="content">
		<div class="main">
			<div class="m-top">&nbsp;</div>
			<ul class="nav2">
				<li class="current"><a href="../../DataAnalysis/stat/!income.action">收益统计</a></li>
				<li><a href="../../Promo/income/!showCps.action">收益提现</a></li>
				<li><a href="../../Promo/profit/!showRecommendedBar">商品推荐栏</a></li>
				<li class="rbgno"><a href="../../Promo/profit/!showWaterfall">电商频道</a></li>
			</ul>
			<div class="m-con">
				 <div class="con-1">
				 	  <div class="arrow"></div>
					  <div class="title">
							<h2>盈利一览</h2>
							 <div id="dateRange" class="day_select">
		                      </div>
					  </div>
					  <div class="section">
							<div class="data-chart" id="line1"></div>
		                     <div id="legend1"></div>
		                     <br/>
							 <div id="grid">
							 	<table class="grid" cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
							 		<thead>
	                                    <tr class="thline">
								 			<th class="tb_index">
								 				日期
								 			</th>
											<th>
												位置
											</th>
											<th>
												展示访客数
											</th>
											<th>
												点击访客数
											</th>
											<th>
												总点击次数
											</th>
											<th>
												 收益
											</th>
											<th class="tb_last">
												总收益
											</th>
		                                 </tr>
							 		</thead>
									<tbody>
									</tbody>
							 	</table>
								<ul class="page">
						        </ul>
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
