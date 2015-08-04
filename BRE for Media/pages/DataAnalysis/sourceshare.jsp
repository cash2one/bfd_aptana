<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>数据分析-流量交换分析</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../css/exp.css" />
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
	<script type="text/javascript" src="../../js/validateSession.js"></script>
	<script type="text/javascript" src="../../js/regulateSize.js"></script>
<script type="text/javascript" src="../../js/changeSite.js"></script>
<script type="text/javascript" src="../../js/messageTip.js"></script>
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/load.js">
    </script>
	<script type="text/javascript">
	new BaifendianWidgets({
		beforeWidgetRander:function(setting){
			//setting.configs.
			window.BfdWidget.format.sourceshare=function(v,stores,item){
				//var array=stores.GROUPNAME.split('___')
				return '<span class="text">'+stores.sitename+'</span>'+'<span class="site">'+stores.address+'</span>'
				//return '<a href="./sourceshare_details.html?dynamicParam='+array[1]+'">'+array[2]+'</a>'+'<p style="color:#bababa;">'+array[0]+'</p>'
			}
			 setting.configs[1].option.seq=true
			 var re=/^(\d{4})(\d{2})(\d{2})$/
			setting.configs[1]['cols'].splice(2,0,{
                      name:'start_date',
                      colName:'时长',
                      sortable:true,
                      onRander:function(dom,item){
                              var result=re.exec(item['start_date'])
                              var now =new Date()
                              var end=now.getTime()
                              now.setFullYear(parseInt(result[1],10))
                              now.setMonth(parseInt(result[2],10)-1)
                              now.setDate(parseInt(result[3],10))
                              var start=now.getTime()
                              dom.html((end-start)/3600000/24)

                       }
				})
			setting.configs[1]['cols'][0]['type'] = 'sourceshare'
			setting.configs[1]['cols'].push({
			          name:'manage',
                      colName:'操作',
                      sortable:false,
                      onRander:function(dom,item){
                         dom.html('<a href="../../DataAnalysis/stat/!sourceshareDetails?dynamicParam='+item.cid+'&sitename='+item.sitename+'">详细流量数据</a>&nbsp;&nbsp;&nbsp;<a href="../../SourceShare/source/!showSiteInformation?otherId='+item.otherId+'">网站信息</a>')
                      }
			})
		},
        pageId:'ifm_union_traffic_swap',
        theme:'ifm',
        _dataUrl:'../../DataAnalysis/stat/!traffic.action?__='+(+new Date)
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
	<!-- header 结束 -->
	<!-- main   开始 -->
	<div class="content">
	<div class="main">
		<div class="m-top">&nbsp;</div>
		<ul class="nav2">
		<li><a href="../../DataAnalysis/stat/!synthetical.action">概况</a></li>
			<li><a href="../../DataAnalysis/stat/!articles.action">文章分析</a></li>
			<li><a href="../../DataAnalysis/stat/!articlesRecommand.action">推荐栏分析</a></li>
			<li class="rbgno current"><a href="#">流量交换分析</a></li>
		</ul>
		
		<div class="m-con">
			<div class="con-4">
				<div class="arrow"></div>
				<div class="title">
					<h2>流量交换分析</h2>
					 <div id="dateRange" class="day_select">
                      </div>
				</div>
				<div class="section">
					<div class="data-chart" id="chart"></div>
					 <div id="grid"></div>
				</div>
			</div>
		</div>
	</div>
	</div>
	<!-- main   结束 -->
	<!-- footer  开始 -->
	<div class="footer">
		<p><%@ include file="/foot.jsp"%></p>
	</div>
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
<style type="text/css">
	.grid th.tb_index {
	    padding-left: 20px;
	    text-align: left;
	}
	.grid th.tb_last {
		text-align: center;
	}
	.grid td.tb_index .text {
			display: block;
			font-size: 12px;
			color: #444;
			height: 18px;
			}
	.grid td.tb_index .site {
			display: block;
			font-family: "宋体";
			font-size: 12px;
			color: #999;
			}
	.grid td.tb_last{
	  width:130px;
	 }				
	</style>
</html>

