<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>安装插件</title>
	<meta name="keywords" content=""/>
	<meta name="description" content=""/>
	<link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
	<link rel="stylesheet" type="text/css" href="../../resources/ifmWidget/css/ifmWidget.css" />
	<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
	<script type="text/javascript" src="../../js/validateSession.js"></script>
    <script type="text/javascript" src="../../js/regulateSize.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.blockUI.js"></script>
	<script type="text/javascript" src="../../resources/commons/jquery.tmpl.min.js"></script>
	<script type="text/javascript" src="../../resources/ifmWidget/js/ifmWidget.js"></script>
	<script type="text/javascript" src="../../js/SiteManager/site-installplug2.js"></script>
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
	<div class="content">
		<div class="main">
			<div class="m-top">&nbsp;</div>
			<div class="m-title">添加站点<em class="font-c"> > 安装插件 </em></div>
			<div class="m-con border-top">
				<div class="con-5">
					<div class="add-site-c p-left55">
						<div class="tit">
							<h3><s:property value="sitePlatform.name"/>安装插件教程</h3>
							<a id="modifySitePlatform" href="../../SiteManager/site/!showSelectPlatform2"><span>[修改建站平台]</span></a>
						</div>
						<s:if test="sitePlatform.id == 1">
							<div class="step">
						        <p class="p-top"><span class="number">1.</span><span class="text">验证您的网站后，下载下方插件(tuidouer_wordpress.zip)，并且保存到你的电脑里</span></p>
						        <a href="<s:property value="sitePlatform.downloadPath"/>" class="btn_1 ml30"><span>点击下载</span></a>
						        <p class="p-top"><span class="number">2.</span><span class="text">进入WordPress后台， 插件—&gt; 安装插件—&gt;上传—&gt;选择文件（tuidouer_wordpress.zip），点击"现在安装"</span></p>
						        <div class="pic"><img class="ml30" src="../../images/wp02.gif" alt="" /></div>
						        <p class="p-top"><span class="number">3.</span><span class="text">启用插件（如下图）</span></p>
						        <div class="pic"><img class="ml30" src="../../images/wp03.gif" alt="" /></div>
						        <p class="p-con">在已安装的插件中将看到推豆儿相关文章插件（如下图）</p>
						        <div class="pic"><img class="ml30" src="../../images/wp04.gif" alt="" /></div>
						        <p class=" p-top"><span class="number">4.</span><span class="text">点击 外观—&gt; 小工具（如下图）</span></p>
						        <div class="pic"><img class="ml30" src="../../images/wp05.gif" alt="" /></div>
						        <p class=" p-top"><span class="number">5.</span><span class="text">找到"推豆儿热文榜"和"推豆儿标签云"两个小工具，拖拽到右侧边栏小工具区中（如下图）</span></p>
						        <div class="pic"><img class="ml30" src="../../images/wp06.gif" alt="" /></div>                          
						        <p class="lh54 p-top"><span class="text">安装完毕后可进入管理后台进行自定义设置。</span></p>
						    </div>
						
						</s:if>
						<s:elseif test="sitePlatform.id == 2">
							 <div class="step">
						        <p class="p-top"><span class="number">1.</span><span class="text">验证您的网站后，下载下方插件(tuidouer_discuzx2.zip)，并且保存到你的电脑里</span></p>
						        <a href="<s:property value="sitePlatform.downloadPath"/>" class="btn_1 ml30"><span>点击下载</span></a>
						        <p class="p-top"><span class="number">2.</span><span class="text">将其解压到discuz插件目录中<span style="background:#CCC">source/plugin</span></span></p>
						        <div class="pic"><img class="ml30" src="../../images/dz201.gif" alt="" /></div>
						        <p class="p-top"><span class="number">3.</span><span class="text">登录到您的discuz后台，应用—>插件，找到"推豆儿相关文章插件"，点击"安装"</span></p>
						        <div class="pic"><img class="ml30" src="../../images/dz202.gif" alt="" /></div>
						        <p class="p-con">安装成功页面</p>
						        <div class="pic"><img class="ml30" src="../../images/dz2503.gif" alt="" /></div>
						        <p class=" p-top"><span class="number">4.</span><span class="text">点击"启用"</span></p>
						        <div class="pic"><img src="../../images/dz203.gif" alt="" width="783" height="357" class="ml30" /></div>
						        <p class=" p-top"><span class="number">5.</span><span class="text">启用成功后你会看到左侧会出现"推豆儿相关文章插件"</span></p>
						        <div class="pic"><img class="ml30" src="../../images/dz2505.gif" alt="" /></div>                          
						        <p class="lh54 p-top"><span class="text">安装完毕后可进入管理后台进行自定义设置。</span></p>
						      </div>
						
						</s:elseif>
						<s:elseif test="sitePlatform.id == 3">
							 <div class="step">
							      <p class="p-top"><span class="number">1.</span><span class="text">验证您的网站后，下载下方插件(tuidouer_discuzx2.5.zip)，并且保存到你的电脑里</span></p>
							      <a href="<s:property value="sitePlatform.downloadPath"/>" class="btn_1 ml30"><span>点击下载</span></a>
							      <p class="p-top"><span class="number">2.</span><span class="text">将其解压到discuz插件目录中<span style="background:#CCC">source/plugin</span></span></p>
							      <div class="pic"><img class="ml30" src="../../images/dz2501.gif" alt="" /></div>
							      <p class="p-top"><span class="number">3.</span><span class="text">登录到您的discuz后台，应用—>插件，你会看到未安装的插件列表中的"推豆儿相关文章插件"</span></p>
							      <div class="pic"><img class="ml30" src="../../images/dz2502.gif" alt="" /></div>
							      <p class="p-con">安装成功页面</p>
							      <div class="pic"><img class="ml30" src="../../images/dz2503.gif" alt="" /></div>
							      <p class=" p-top"><span class="number">4.</span><span class="text">点击"启用"（如下图）</span></p>
							      <div class="pic"><img src="../../images/dz2504.gif" alt="" width="797" height="130" class="ml30" /></div>
							      <p class=" p-top"><span class="number">5.</span><span class="text">启用成功后你会看到左侧会出现"推豆儿相关文章插件"</span></p>
							      <div class="pic"><img class="ml30" src="../../images/dz2505.gif" alt="" /></div>                          
							      <p class="lh54 p-top"><span class="text"> 安装完毕后可进入管理后台进行自定义设置。</span></p>
							  </div>
						
						</s:elseif>
						<s:elseif test="sitePlatform.id == 4">
							 <div class="step">
						        <p class="p-top"><span class="number">1.</span><span class="text">验证您的网站后，下载下方插件(tuidouer_discuz7.1.zip)，并且保存到你的电脑里</span></p>
						        <a href="<s:property value="sitePlatform.downloadPath"/>" class="btn_1 ml30"><span>点击下载</span></a>
						        <p class="p-top"><span class="number">2.</span><span class="text">将其解压到discuz插件目录中<span style="background:#CCC">source/plugin</span></span></p>
						        <div class="pic"><img class="ml30" src="../../images/dz7101.gif" alt="" /></div>
						        <p class="p-top"><span class="number">3.</span><span class="text">登录到您的discuz后台，应用—>插件，你会看到未安装的插件列表中的"推豆儿相关文章插件"</span></p>
						        <div class="pic"><img src="../../images/dz7102.gif" alt="" width="787" height="358" class="ml30" /></div>
						        <p class="p-con">安装成功页面</p>
						        <div class="pic"><img class="ml30" src="../../images/dz2503.gif" alt="" /></div>
						        <p class=" p-top"><span class="number">4.</span><span class="text">选择"推豆儿相关文章插件"前面的复选框，点击"提交"（如下图）</span></p>
						        <div class="pic"><img src="../../images/dz7103.gif" alt="" width="792" height="436" class="ml30" /></div>
						        <p class=" p-top"><span class="number">5.</span><span class="text">启用成功后你会看到左侧会出现"推豆儿相关文章插件"</span></p>
						        <div class="pic"><img class="ml30" src="../../images/dz2505.gif" alt="" /></div>                          
						        <p class="lh54 p-top"><span class="text">安装完毕后可进入管理后台进行自定义设置。</span></p>
						      </div>
						
						</s:elseif>
						
						<s:elseif test="sitePlatform.id == 5">
							 <div class="step">
						        <p class="p-top"><span class="number">1.</span><span class="text">验证您的网站后，下载下方插件(tuidouer_discuz7.2.zip)，并且保存到你的电脑里</span></p>
						        <a href="<s:property value="sitePlatform.downloadPath"/>" class="btn_1 ml30"><span>点击下载</span></a>
						        <p class="p-top"><span class="number">2.</span><span class="text">将其解压到discuz插件目录中<span style="background:#CCC">source/plugin</span></span></p>
						        <div class="pic"><img class="ml30" src="../../images/dz7201.gif" alt="" /></div>
						        <p class="p-top"><span class="number">3.</span><span class="text">登录到您的discuz后台，应用—>插件，你会看到未安装的插件列表中的"推豆儿相关文章插件"</span></p>
						        <div class="pic"><img class="ml30" src="../../images/dz7102.gif" alt="" /></div>
						        <p class="p-con">安装成功页面</p>
						        <div class="pic"><img class="ml30" src="../../images/dz2503.gif" alt="" /></div>
						        <p class=" p-top"><span class="number">4.</span><span class="text">选择"推豆儿相关文章插件"前面的复选框，点击"提交"（如下图）</span></p>
						        <div class="pic"><img src="../../images/dz7103.gif" alt="" width="792" height="436" class="ml30" /></div>
						        <p class=" p-top"><span class="number">5.</span><span class="text">启用成功后你会看到左侧会出现"推豆儿相关文章插件"</span></p>
						        <div class="pic"><img class="ml30" src="../../images/dz2505.gif" alt="" /></div>                          
						        <p class="lh54 p-top"><span class="text">安装完毕后可进入管理后台进行自定义设置。</span></p>
						      </div>
						
						</s:elseif>
						<s:elseif test="sitePlatform.id == 6">
							  <div class="step">
						          <p class="p-top"><span class="number">1.</span><span class="text">验证您的网站后，下载下方插件(tuidouer_dedecms.zip)，并且保存到你的电脑里</span></p>
						          <a href="<s:property value="sitePlatform.downloadPath"/>" class="btn_1 ml30"><span>点击下载</span></a>
						          <p class="p-top"><span class="number">2.</span><span class="text">解压下载的文件，将看到 tuidouer_dedecms.xml 文件</span></p>
						          <p class="p-top"><span class="number">3.</span><span class="text">进入DedeCMS后台，  插件—&gt; 安装插件—&gt;上传—&gt;选择文件—&gt;选择您刚解压的xml文件，点击"确定"</span></p>                            
						          <div class="pic"><img class="ml30" src="../../images/dede01.gif" alt="" /></div>
						          <p class="p-top"><span class="number">4.</span><span class="text">点击"安装"（如下图）</span></p>
						          <div class="pic"><img class="ml30" src="../../images/dede02.gif" alt="" /></div>
						          <p class=" p-top"><span class="number">5.</span><span class="text">安装完成后，点击下方的"确定"（如下图）</span></p>
						          <div class="pic"><img class="ml30" src="../../images/dede03.gif" alt="" /></div>
						          <p class=" p-top"><span class="number">6.</span><span class="text">模版—&gt; 默认模版管理—&gt;找到<strong style="background:#CCC">article.article.htm</strong>，点击"修改"（如下图）</span></p>
						          <div class="pic"><img src="../../images/dede04.gif" class="ml30" /></div>
						          <p class=" p-top"><span class="number">7.</span><span class="text">在内容内搜索<span style="background:#CCC">&lt;!-- /pages --&gt;</span>，在上方加入代码<span style="background: #3CF;">{dede:include filename='bfd_ifm.htm'/}</span></span></p>
						        <div class="pic"><img src="../../images/dede05.gif" class="ml30" /></div>
						         <p class=" p-top"><span class="number">8.</span><span class="text">在内容内搜索<span style="background:#CCC">id=&quot;contentRtPicAD2&quot;</span>，</span></p>
						          <p class="p-con" style="padding-top:0;line-height:20px; height:80px; display: block; clear:both;">在标签下方加入代码，<br/>
						          <span style="background: #3CF; ">{dede:include filename='bfd_ifm_cloud.htm'/}<br/>{dede:include filename='bfd_ifm_hot.htm'/}</span></p>
						        <div class="pic"><img src="../../images/dede06.gif" class="ml30" /></div> 
						        <p class=" p-top"><span class="number">9.</span><span class="text">找到<strong style="background:#CCC">index.htm</strong>，点击"修改"（如下图）</span></p>
						        <div class="pic"><img src="../../images/dede07.gif" class="ml30" /></div> 
						        <p class=" p-top"><span class="number">10.</span><span class="text">在内容内搜索<strong style="background:#CCC">&lt;!-- /footer --&gt;</strong>，在上方加入代码<span style="background: #3CF;">{dede:include filename='bfd_ifmscript.htm'/}</span></span></p>
						        <div class="pic"><img src="../../images/dede08.gif" class="ml30" /></div>
						        <p class=" p-top"><span class="number">10.</span><span class="text">生成—&gt;更新文档HTML—&gt;开始生成HTML</span></p>
						        <div class="pic"><img src="../../images/dede09.gif" class="ml30" /></div>
						        <p class=" p-top"><span class="number">11.</span><span class="text">模块—&gt;辅助插件—&gt;推豆儿，可进行插件设置。</span></p>
						        <div class="pic"><img src="../../images/dede10.gif" class="ml30" /></div>
						        <p class="lh54 p-top"><span class="text">安装完毕后可进入管理后台进行自定义设置。</span></p>
						        
						    </div>
						
						</s:elseif>
						<s:else>
							<div class="step">
								暂无
							</div>
						</s:else>
<%-- 						<div class="step">
							<p class="p-top"><span class="number">1.</span><span class="text">下载下方插件(<s:if test="sitePlatform.id == 1">tuidouer_wordpress.zip</s:if><s:elseif test="sitePlatform.id == 2">tuidouer_discuzx2.zip</s:elseif><s:elseif test="sitePlatform.id == 3">tuidouer_discuzx2.5.zip</s:elseif><s:elseif test="sitePlatform.id == 4">tuidouer_discuz7.1.zip</s:elseif><s:elseif test="sitePlatform.id == 5">tuidouer_discuz7.2.zip</s:elseif><s:elseif test="sitePlatform.id == 6">tuidouer_dedecms.zip</s:elseif><s:else>无此插件</s:else>)，并且保存到你的电脑里</span></p>
							<a href="<s:property value="sitePlatform.downloadPath"/>" class="btn_1 ml30"><span>点击下载</span></a>
					    <p class="p-top"><span class="number">2.</span><span class="text">将其解压到<s:property value="sitePlatform.name"/>插件目录中<span style="background:#CCC">source/plugin</span></span></p>
                        <div class="pic"><img class="ml30" src="../../images/dz2501.gif" alt="" /></div>
                            <p class="p-top"><span class="number">3.</span><span class="text">登录到您的<s:property value="sitePlatform.name"/>后台，应用—>插件，你会看到未安装的插件列表中的"推豆儿相关文章插件"</span></p>
                            <div class="pic"><img class="ml30" src="../../images/dz2502.gif" alt="" /></div>
                            <p class="p-con">安装成功页面</p>
                        <div class="pic"><img class="ml30" src="../../images/dz2503.gif" alt="" /></div>
							<p class=" p-top"><span class="number">4.</span><span class="text">点击“启用”（如下图）</span></p>
							<div class="pic"><img src="../../images/dz2504.gif" alt="" width="797" height="130" class="ml30" /></div>
							<p class=" p-top"><span class="number">5.</span><span class="text">启用成功后你会看到左侧会出现"推豆儿相关文章插件"</span></p>
							<div class="pic"><img class="ml30" src="../../images/dz2505.gif" alt="" /></div>                          
                            <p class="lh54 p-top"><span class="text">点击下方按钮检测安装是否成功，安装完毕后可进入管理后台进行自定义设置。</span></p>
						</div> --%>
						<div class="btn">
							<a class="btn1"><span>检测是否安装成功</span></a>
							<a class="btn2" href="../../SiteManager/site/!showSelectPlatform2"><span>上一步</span></a>
							<form id="form1" action="../../SiteManager/site/!showSelectPlatform2" method="post">
								<input type="hidden" name="address" id="address2" value="session.sessionUser.address"/>
							</form>
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