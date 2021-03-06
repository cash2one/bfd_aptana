<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>流量交换-未交换</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../css/exp.css" />
	<link rel="stylesheet" type="text/css" href="../../resources/baifendianWidgetsCombo/commons/lib/jquery.pagination/css/pagination.css" />
	<link rel="stylesheet" type="text/css" href="../../resources/ifmWidget/css/ifmWidget.css" />
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
<script type="text/javascript" src="../../js/regulateSize.js"></script>
<script type="text/javascript" src="../../js/changeSite.js"></script>
<script type="text/javascript" src="../../js/messageTip.js"></script>
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/lib/jquery.pagination/jquery.pagination.js"></script>
	<script type="text/javascript" src="../../resources/commons/list_tools.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.tmpl.min.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.blockUI.js"></script>
	<script type="text/javascript" src="../../resources/ifmWidget/js/ifmWidget.js"></script>
	<script type="text/javascript"  src="../../resources/commons/jquery.form.js">
    </script>
    <script type="text/javascript"  src="../../resources/commons/jquery.validate.min.js">
    </script>
    <script type="text/javascript" src="../../js/validateSession.js"></script>
	<script type="text/javascript" src="../../js/SourceShare/source-all.js"></script>
	<script type="text/javascript">
	function changeSite() {
		$.post("../../SiteManager/site/!changeSiteOfSessionUser",{"siteId":16},function(data) {
			window.location.href= "../../SourceShare/source/!showSoureShare";
		});
	}
	</script>
<link rel="shortcut icon" href="../../favicon.ico" >
             </head>
<body>
	<input type="hidden" name="siteId" id="siteId" autocomplete="off" value="<s:property value="#session.sessionUser.siteId" />">
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
			<div class="m-con<s:if test="site.flowExchangeState == 5"> bg2</s:if>">
			    <!-- 输出警告信息 以及上面的bg2-->
			    <s:if test="site.flowExchangeState == 5 or site.flowExchangeState == 4">
			    <div class="top-tip">系统未检测到插件，请您检查插件是否安装正确，以免影响使用流量交换功能。</div>
			    </s:if>
				<!-- 输出警告信息结束 -->
				<div class="con-2">
					<div class="arrow2">&nbsp;</div>
					<div class="title">
						<h2>网站列表</h2>
					</div>
					<div class="choose-area">
							<ul class="choose2">
								<li class="w98 current"><a href="#">未交换</a></li>
								<li class="w98"><a href="#">已通过</a></li>
								<li class="w128"><a href="#">等待您回应(<s:property value="myResponseNum"/>)</a></li>
								<li class="w138"><a href="#">等待对方回应(<s:property value="ohterResponseNum"/>)</a></li>
							</ul>
							<a  class="amend" >修改网站信息 >> </a>
					</div>
					<div class="section">
						<div class="type-search">
							<div class="ts-left">
								<span class="tit">网站类型：</span>
								<div class="select_box">
								<input type="text" readonly="readonly" value="全部" id="myselect">
									<ul class="select_ul">
										<li data-value='0'>全部</li>
										<s:iterator value="dataDictionarys">
										<li data-value='<s:property value="id"/>'><s:property value="name"/></li>
										</s:iterator>
									</ul>
									<input type="hidden" value="1" autocomplete="off">
								</div>
								<a  class="btn">筛选</a>
							</div>
							<span class="collect pt6" style="display:none;">
								<a  class="">收录统计</a>
								<span class="tex"> &gt; 搜索结果</span>
							</span>
							<div class="ts-right">
								<input type="text" class=""  autocomplete="off"/>
								<a  class="btn">搜 索</a>
							</div>
						</div>
						<table class="data-tab5" cellspacing="0" cellpadding="0" border="0">
							<thead>
							<tr class="bg">
								<th class="w182">网站</th>
								<th class="w80 center">类型</th>
								<th class="w400">描述</th>
								<th class="w89">文章相似度</th>
								<th class="w144 brn">操作</th>
							</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						<ul class="page">
						</ul>
					</div>
					<div class="section" style="display:none;">
						<div class="type-search">
							<div class="ts-left">
								<span class="tit">网站类型：</span>
								<div class="select_box"><input type="text" readonly="readonly" value="全部" id="myselect">
									<ul class="select_ul">
										<li data-value="0">全部</li>
										<s:iterator value="dataDictionarys">
										<li data-value='<s:property value="id"/>'><s:property value="name"/></li>
										</s:iterator>
									</ul>
									<input type="hidden" value="0" autocomplete="off">
								</div>
								<a  class="btn">筛选</a>
							</div>
							<span class="collect pt6" style="display:none;">
								<a  class="">收录统计</a>
								<span class="tex"> &gt; 搜索结果</span>
							</span>
							<div class="ts-right">
								<input type="text" class=""  autocomplete="off"/>
								<a  class="btn">搜 索</a>
							</div>
						</div>
						<table class="data-tab5" cellspacing="0" cellpadding="0" border="0">
							<thead>
							<tr class="bg">
								<th class="w182">网站</th>
								<th class="w80 center">类型</th>
								<th class="w400">描述</th>
								<th class="w89">文章相似度</th>
								<th class="w144 brn">操作</th>
							</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						<ul class="page">
				    	</ul>
					</div>
					<div class="section" style="display:none;">
						<div class="type-search">
							<div class="ts-left">
								<span class="tit">网站类型：</span>
								<div class="select_box"><input type="text" readonly="readonly" value="全部" id="myselect">
									<ul class="select_ul">
										<li data-value="0">全部</li>
										<s:iterator value="dataDictionarys">
										<li data-value='<s:property value="id"/>'><s:property value="name"/></li>
										</s:iterator>
									</ul>
									<input type="hidden" value="0" autocomplete="off">
								</div>
								<a  class="btn">筛选</a>
							</div>
							<span class="collect pt6" style="display:none;">
								<a  class="">收录统计</a>
								<span class="tex"> &gt; 搜索结果</span>
							</span>
							<div class="ts-right">
								<input type="text" class=""  autocomplete="off"/>
								<a  class="btn">搜 索</a>
							</div>
						</div>
						<table class="data-tab5" cellspacing="0" cellpadding="0" border="0">
							<thead>
							<tr class="bg">
								<th class="w182">网站</th>
								<th class="w80 center">类型</th>
								<th class="w400">描述</th>
								<th class="w89">文章相似度</th>
								<th class="w144 brn">操作</th>
							</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						<ul class="page">
						</ul>
					</div>
					<div class="section" style="display:none;">
						<div class="type-search">
							<div class="ts-left">
								<span class="tit">网站类型：</span>
								<div class="select_box"><input type="text" readonly="readonly" value="全部" id="myselect">
									<ul class="select_ul">
										<li data-value="0">全部</li>
										<s:iterator value="dataDictionarys">
										<li data-value='<s:property value="id"/>'><s:property value="name"/></li>
										</s:iterator>
									</ul>
									<input type="hidden" value="0" autocomplete="off">
								</div>
								<a  class="btn">筛选</a>
							</div>
							<span class="collect pt6" style="display:none;">
								<a  class="">收录统计</a>
								<span class="tex"> &gt; 搜索结果</span>
							</span>
							<div class="ts-right">
								<input type="text" class=""  autocomplete="off"/>
								<a  class="btn">搜 索</a>
							</div>
						</div>
						<table class="data-tab5" cellspacing="0" cellpadding="0" border="0">
							<thead>
							<tr class="bg">
								<th class="w182">网站</th>
								<th class="w80 center">类型</th>
								<th class="w480">描述</th>
								<th class="w163 brn">文章相似度</th>
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
	<div class="page-area" style="display:none;">
			<div class="p-title">
				<h1>完善网站信息</h1>
				<a>&nbsp;</a>
			</div>
			<div class="p-content">
				<form action="../../SiteManager/site/!update" method="post" id="form1">
				<input type="hidden" autocomplete="off" name="site.id" value="<s:property value="site.id"/>">
				<input type="hidden" autocomplete="off" name="site.flowExchangeState" value="<s:property value="site.flowExchangeState"/>">
				<input type="hidden" autocomplete="off" name="site.address" value="<s:property value="site.address"/>">
				<div class="item1">
					<label class="mi">网站地址：</label>
					<span class="text"><s:property value="site.address"/></span>
				</div>
				<div class="item1">
					<label class="mi">网站名称：</label>
					<span class="input-box w270 site_info_inputouter">
							    <label id="namelabel" style="left: 10px;  width: 147px;  color: rgb(186, 186, 186); position: absolute; overflow-x: hidden; font-size-adjust: none; font-stretch: normal;" >请输入文字...</label>
							   	<input id="nameinput" type="text" value="<s:property value="site.name"/>" name="site.name"/>
					</span>
				</div>
				<div class="item2">
					<label class="mi">网站描述：</label>
					<textarea class="w348" name="site.describe" ><s:property value="site.describe"/></textarea>
				</div>
				<div class="item3" style="z-index:100;">
					<label class="mi">网站类型：</label>
					<div class="select_box" id="notcontentselect">
					<input id="sitetype" type="text" name="sitetype" value="请选择" readonly="readonly">
							    <input type="hidden" id="site_type" name="site.type.id" value="<s:property value="site.type.id"/>"/>
						<ul class="select_ul">
							<s:iterator value="dataDictionarys">
								<li data-value='<s:property value="id"/>'><s:property value="name"/></li>
							</s:iterator>
						</ul>
					</div>
				</div>
				<div class="item1" style="z-index:90;">
							<label>联系方式：</label>
							<!-- 
							<span class="text">
							<s:if test="site.isPrivateLetter == 0">
								 <input type="checkbox" name="site.isPrivateLetter" value="1" id="letter" class="cbox">
							</s:if>
							<s:else>
								<input type="checkbox" checked="checked" class="cbox" id="letter" value="1" name="site.isPrivateLetter"/>
							</s:else>
								<label style=" width: auto;" for="letter">私信</label></span>
							 -->	
							<span class="text">QQ</span>
							<span class="input-box w120 site_info_inputouter">
								<label style="left: 10px; width: 147px; color: rgb(186, 186, 186); position: absolute; overflow-x: hidden; font-size-adjust: none; font-stretch: normal;" id="qqlabel">QQ号码</label>
								<input type="text" value="<s:property value="site.qqNumber"/>" name="site.qqNumber" id="qq">
							</span>
				</div>
				<!-- 
				<p class="pl66">(该信息仅用于流量交换页面)</p>
				 -->
				<div class="dot-line">&nbsp;</div>
				<dl>
					<dt class="mi">流量交换验证方式：</dt>
								<dd>
									<s:if test="site.trafficExchange.changeType == 1">
									      <div class="traffic_type_lable">
									         <input type="radio" id="t01" value="1" name="site.trafficExchange.changeType" checked="checked">
									         <label for="t01" style="cursor:pointer;">手动审核</label>
									      </div>
									</s:if>
									<s:elseif test="site.trafficExchange.changeType == 0">
									      <div class="traffic_type_lable">
									         <input type="radio" id="t01" value="1" name="site.trafficExchange.changeType">
									         <label for="t01" style="cursor:pointer;">手动审核</label>
									      </div>
									</s:elseif>
										<p>
											<em>该选项用于控制流量交换网站的质量</em>
										</p>
								</dd>
								<dd>
									<s:if test="site.trafficExchange.changeType == 0">
									         <div class="traffic_type_lable">
									         	<input type="radio" id="t02" checked="checked" value="0" name="site.trafficExchange.changeType">
									            <label for="t02" style="cursor:pointer;">自动通过</label>
									         </div> 
								    </s:if>
						            <s:elseif test="site.trafficExchange.changeType == 1">
						                     <div class="traffic_type_lable">
									         	<input type="radio" id="t02" value="0" name="site.trafficExchange.changeType">
									            <label for="t02" style="cursor:pointer;">自动通过</label>
									         </div> 
						             </s:elseif>
										<p>
											<!-- <span>自动通过</span> -->
											<em>该选项用于提高交换效率</em>
										</p>
									</dd>
				</dl>
				<span class="submit-btn"><input type="button" id="sub" value="提 交"></span>
		      </form>
			</div>
		</div>
</body>
</html>