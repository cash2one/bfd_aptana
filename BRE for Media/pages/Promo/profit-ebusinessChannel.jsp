<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<meta charset="utf-8"/>
	<title>自盈利-电商频道</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../css/exp.css" />
	<link rel="stylesheet" type="text/css" href="../../resources/ifmWidget/css/ifmWidget.css" />
	<script type="text/javascript" src="../../resources/ZeroClipboard/ZeroClipboard.js"></script>
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
<%-- <script type="text/javascript" src="../../js/regulateSize.js"></script> --%>
<script type="text/javascript" src="../../js/changeSite.js"></script>
<script type="text/javascript" src="../../js/messageTip.js"></script>
	<script type="text/javascript"  src="../../resources/commons/jquery.form.js">
    </script>
    <script type="text/javascript"  src="../../resources/commons/jquery.validate.min.js">
    </script>
	<script type="text/javascript" src="../../resources/commons/jquery.tmpl.min.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.blockUI.js"></script>
	<script type="text/javascript" src="../../resources/ifmWidget/js/ifmWidget.js"></script>
	<script type="text/javascript" src="../../resources/jquery_tools/jquery.tools.min.js"></script>
	<script type="text/javascript" src="../../js/validateSession.js"></script>
	<script type="text/javascript" src="../../js/Promo/profit-ebusinessChannel.js"></script>
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
	<div id="content" class="content">
		<div class="main">
			<div class="m-top">&nbsp;</div>
			<ul class="nav2">
				<li><a href="../../DataAnalysis/stat/!income.action">收益统计</a></li>
				<li><a href="../../Promo/income/!showCps.action">收益提现</a></li>
				<li  class=""><a href="../../Promo/profit/!showRecommendedBar">商品推荐栏</a></li>
				<li class=" rbgno current"><a href="../../Promo/profit/!showWaterfall">电商频道</a></li>
			</ul>
			<div class="m-con">
				 <div class="con-1">
				 	  <div class="arrow4"></div>
					  <div class="section" style="position:relative;overflow:hidden;height:725px;">
					  	     
							 <div style="height: 20000em;position: absolute;">
							 
							   <s:if test="waterfall.createDate != null">
							   		<div class="set-box" id="pre_setbox1" style="height:725px;display:none;">
					  	      			
					  	      		</div>
							   </s:if>
							   <s:else>
							   		<div class="set-box promo-product-ad" id="pre_setbox" style="height:725px;">
					  	      	  
					  	      	          <h2>开启电商频道给您带来：</h2>
										  <div class="promo-product-ad-description">
										  	  <ul>
										  	  	    <li>丰富网站内容</li>
													<li>增加站长流量变现的渠道</li>
													<li>智能推荐网站内容相关商品</li>
										  	  </ul>
										  </div>
										  <div class="promo-product-ad-openbutton">
										     	<button id="open">立即开启</button>
										  </div>
										  <div class="promo-product-ad02"></div>
							         
					  	      </div>	
							   </s:else>
							  
							  <div class="content-box" id="content-box">
					  	      	      <div class="content-top">
					  	      	      	 <div class="top-left">
					  	      	      	 	<s:if test="waterfall.isOpen == 1"><input type="checkbox" id="isopenpromo" checked="checked" value="<s:property value="waterfall.isOpen"/>" name="waterfall.isOpen"></s:if>
									   		<s:else><input type="checkbox" id="isopenpromo" value="<s:property value="waterfall.isOpen"/>" name="waterfall.isOpen"></s:else>
											<label for="isopenpromo">开启电商频道</label>
										 </div>
										 <div class="top-right">
											开启商品流可以除了推荐商品栏有更多商品让用户浏览，可设置为独立页面。需要在您的网站增加新页面并将商品流代码嵌入。
										 </div>
					  	      	      </div>
									  <div class="add-site-c content-contentbox">
									  
									   <div class="step">
										  	 	
											  	 	<p class="p-top">
														<span class="number">1.</span>
														<span class="text">
															选择电商频道商品类型
														</span>
													</p>
													<div class="ml30" style="font-size: 14px;">
														类型:
														 <select id="promo_type">
														   	 <!-- <option value="defaults">请选择</option> -->
														   	 <s:iterator value="channels">
														   	 	<s:if test="channel.channelId == channelId"><option selected="selected" value="<s:property value="channelId"/>" ><s:property value="name"/></option></s:if>
														   	 	<s:else><option value="<s:property value="channelId"/>" ><s:property value="name"/></option></s:else>
															  
															  </s:iterator>
														   </select>
													</div>	
													
													<p class="p-top">
														<span class="number">2.</span>
														<span class="text">
															  请您现在网站中新建一个页面,用于承载电商频道。
														</span>
													</p>
													
												  	<p class="p-top">
														<span class="number">3.</span><span class="text">复制以下代码，粘贴到网站全部页面的<span
															style="background: #CCC">&lt;/body&gt;</span>标签前 </span>
													</p>
													<div class="ml30">
														<textarea class="txt"  readonly="readonly">
<script type="text/javascript" charset="utf-8" src="http://www.tuidouer.com/config/<s:property value="#session.sessionUser.address"/>/jsConfig.js"></script>
<script type="text/javascript" charset="utf-8" src="http://static.baifendian.com/lepu/tuidou/js/waterfall.unite.min.js"></script>
<script type="text/javascript">
	var parm = {};
	parm.width = 1024;
	var w = new pugao_waterfall(parm);
	w.init('2932J-ZJQ3Y-9EYKY');
</script>
														</textarea>
													</div>
													<div class="copy-btn">
														<a class="copy">复制代码</a> <span class="right" style="display:none;">复制成功</span>
													</div>
													
													<p class="p-top">
														<span class="number">4.</span>
														<span class="text">
															  增加进入“电商频道”入口；例如BANER按钮、导航中增加标签等，并指向新建页面。
														</span>
													</p>
													
													<p class="p-top">
														<span class="number">5.</span>
														<span class="text">
															  请您输入新页面URL，预览安装效果进行验证安装代码是否正确。
														</span>
													</p>
													<div class="previewbox">
														<input type="hidden" id="siteAddress4WaterfallUrl" value="http://<s:property value="site.address"/>/">
														<span>http://<s:property value="site.address"/>/</span> <input type="text" id="waterfallUrl" style="width:550px;" value="<s:property value="waterfallUrl"/>" size="20" />
													</div>
													<%-- 
													<p class="lh54 p-top" style="padding-top: 10px;">
														<span class="text">点击下方按钮检测安装是否成功，安装完毕后可进入管理后台进行自定义设置。</span>
													</p>
													--%>
													<div class="btn" style="margin-top:28px">
														  <a id="btn1" class="blue-btn1">
																<span style="color: #FFFFFF;" class="firefinder-match">保 存</span>
															</a>
															<a id="btn2" class="green-btn1">
																<span style="color: #FFFFFF;">预览效果</span>
															</a>
													</div>	
										  	 </div>
									  
									  
										   
										   
									  </div>
					  	      </div>	
							  
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