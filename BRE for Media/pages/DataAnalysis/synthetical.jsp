<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>数据分析-概况</title>
        <meta name="keywords" content=""/>
        <meta name="description" content=""/>
        <meta http-equiv="Expires " content= "0"/> 
        <link rel="stylesheet" type="text/css" href="../../css/style-1.css" />
        <link rel="stylesheet" type="text/css" href="../../css/exp.css" />
        <script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/jquery.js"></script>
		<script type="text/javascript" src="../../resources/baifendianWidgetsCombo/commons/lib/jquery.qtip-1.0.0.min.js"></script>
		<script type="text/javascript" src="../../js/validateSession.js"></script>
		<script type="text/javascript" src="../../js/regulateSize.js"></script>
<script type="text/javascript" src="../../js/changeSite.js"></script>
<script type="text/javascript" src="../../js/messageTip.js"></script>
		<script type="text/javascript" src="../../resources/commons/jquery.blockUI.js"></script>
        <script type="text/javascript" src="../../resources/baifendianWidgetsCombo/load.js">
        </script>
        <script type="text/javascript">
        new BaifendianWidgets({
        	pageId:'ifm_union_index',
        	theme:"ifm",
        	 _dataUrl:'../../DataAnalysis/stat.action?__='+(+new Date),
        	 beforeWidgetRander:function(setting){
        	     $.each(setting.configs,function(i,item){
        	           if(item.type==='line'){
        	              item.theme='ifm_syn'
        	           }
        	           if(item.type==="legend"){
        	           	item.theme='ifm_syn'
        	           }
        	     })
        		 var rate =function(v) { //百分比处理
        				if (isNaN(parseFloat(v))) {
        					return "0.00%";
        				} else {
        					var bfbValue = (parseFloat(v) * 100).toFixed(2);
        					return bfbValue + '%'
        				}

        			}
        		 function pushLegend(array,requestId){
                     var push = function(){
                     var cols=[]
					 function pushTip(dom,content){
					 	dom.qtip({
									                    content: content,
									                    style: {
									                        name: 'blue'
									                    },
									                    position: {
									                        corner: {
									                            target: 'topMiddle',
									                            tooltip: 'bottomMiddle'
									                        }
									                    },
									                    style:  {
												                        background: '#eefcff',
												                        color: '#000',
																		'font-size': '12px',
												                        border: {
												                            color: '#d2eaea'
												                        },
													                    tip:{
													                      corner:'bottomMiddle',
																		  color:'#d2eaea',
																		  size:{
																		  	x:10,
																			y:4
																		  }
													                    }
												                    }
									                })
					 }                     
                     $.each(array,function(i,item){
                           $('#'+item[0]+',#'+item[1]+',#'+item[2]).html('<span style="font-size: 16px;">loading...</span>')
                           	cols.push(item[0],item[1]);
                           	pushTip($('#'+item[0]).parent().parent().find('a'),item[3])
                           	pushTip($('#'+item[1]).parent().parent().find('a'),item[4])
                            
                       })
                     var param={
                           cols:cols,
                           start:setting.global.dateRange.getStart(),
                           end:setting.global.dateRange.getEnd(),
                           type:'legend',
                           requestId:requestId
                       }
                       $.get('../../DataAnalysis/stat.action?__='+(+new Date),param,function(data){
                           $.each(array,function(i,item){
                           $('#'+item[0]).html(BfdWidget.format[item[5]||'numFix1'](data.stores[0][item[0]]))
                           $('#'+item[1]).html(BfdWidget.format[item[5]||'numFix1'](data.stores[0][item[1]]))
                           $('#'+item[2]).html(rate(data.stores[0][item[0]]/data.stores[0][item[1]]))
                           })
                       },'json')
                     }
                     setting.global.dateRange.addEventListener(push)
                     push()
               }
					pushLegend([['rec_session','session','visits_1','点击过推荐栏的访问次数','访客从网站上浏览的第一个页面为起始至访客离站或闲置时间超过30分钟限制而结束的一连串访问活动'],
					            ['rec_stay_time','stay_time','visits_2','点击过推荐栏的访次在网站的平均停留时间','平均每个访次浏览网站的时长；网站访问时间为访客在一个访次中，浏览第一个页面到浏览最后一个页面的时间差','time'],
								['rec_visit_articles_avg','visit_articles_avg','visits_3','点击过推荐栏的访次所访问的文章总数','平均每个访次浏览的文章数量'],
								['rec_visit_articles','visit_articles','visits_4','点击过推荐栏的访客所访问的文章总数','被访客浏览过的文章总数'],
								['rec_uv','uv','visits_5','点击过推荐栏的访客','以天为统计单位进行计算的，网站唯一访客数量，单日内同一用户的多次访问只计算一个访客'],
								['rec_visit_depth_avg','visit_depth_avg','visits_6','点击过推荐栏的访次，平均浏览的页面数量','平均每个访次浏览的页面数量'],
								['rec_click_num','rec_show_num','visits_7','访客点击推荐栏中内容的次数','推荐栏被展示的次数，当一个页面包含多种推荐栏类型时，只记作1次']],'62')
					
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
                <div class="m-top">
                    &nbsp;
                </div>
                <ul class="nav2">
                   <li class="current"><a href="#">概况</a></li>
					<li><a href="../../DataAnalysis/stat/!articles.action">文章分析</a></li>
					<li class=""><a href="../../DataAnalysis/stat/!articlesRecommand.action">推荐栏分析</a></li>
					<li class="rbgno"><a href="../../DataAnalysis/stat/!sourceshare.action">流量交换分析</a></li>
                </ul>
                <div class="m-con plr20">
                    <div class="con-1">
                        <div class="arrow">
                        </div>
                        <div class="title">
                            <h2>概况</h2>
                            <div id="dateRange" class="day_select">
                            </div>
                        </div>
                        <div class="section">
                            <div class="data-l">
                                <div class="databox">
                                    <div class="data-img" id="chart1.0" style="height:116px">
                                    </div>
                                     <div class="data-img" id="chart1.1" style="height:116px">
                                    </div>
                                    <div style="height:38px;width:100%;margin:0 auto;text-align:center;">
                                        <img alt="图列" src="../../images/sync_le1.png"  style="cursor:pointer"/>
                                    </div>
                                    <div class="data-c">
                                        <div class="d mr56">
                                            <div>
                                                <p>
                                                    推荐点击访次<a></a>
                                                </p>
                                                <span id="rec_session"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                        <div class="d">
                                            <div>
                                                <p>
                                                    访次<a></a>
                                                </p>
                                                 
                                                <span id="session"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                           
                                        </div>
                                        <div class="d fr">
                                            <div>
                                                <p>
                                                    推荐点击访次/访次
                                                </p>
                                                <span id="visits_1"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="databox">
                                    <div class="data-img" id="chart2">
                                    </div>
                                    <div class="data-c">
                                        <div class="d">
                                            <div>
                                                <p>
                                                    推荐影响网站平均停留时间<a></a>
                                                </p>
                                                <span id="rec_stay_time"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                        <div class="d fr">
                                            <div>
                                                <p>
                                                    网站平均停留时间<a></a>
                                                </p>
                                                <span id="stay_time"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="data-c">
                                        <div class="d ml70">
                                            <div>
                                                <p>
                                                    推荐影响网站平均停留时间/网站平均停留时间
                                                </p>
                                                <span id="visits_2"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="databox">
                                    <div class="data-img" id="chart3">
                                    </div>
                                    <div class="data-c">
                                        <div class="d">
                                            <div>
                                                <p>
                                                    推荐影响人均浏览文章数<a></a>
                                                </p>
                                                <span id="rec_visit_articles_avg"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                        <div class="d fr">
                                            <div>
                                                <p>
                                                    人均浏览文章数<a></a>
                                                </p>
                                                <span id="visit_articles_avg"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="data-c">
                                        <div class="d ml70">
                                            <div>
                                                <p>
                                                    推荐影响人均浏览文章数/人均浏览文章数
                                                </p>
                                                <span id="visits_3"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="databox">
                                    <div class="data-img" id="chart4">
                                    </div>
                                    <div class="data-c">
                                        <div class="d">
                                            <div>
                                                <p>
                                                    推荐影响浏览文章总数<a></a>
                                                </p>
                                                <span id="rec_visit_articles"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                        <div class="d fr">
                                            <div>
                                                <p>
                                                    访客浏览文章总数<a></a>
                                                </p>
                                                <span id="visit_articles"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="data-c">
                                        <div class="d ml70">
                                            <div>
                                                <p>
                                                    推荐影响浏览文章总数/访客浏览文章总数
                                                </p>
                                                <span id="visits_4"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="data-r">
                                <div class="databox">
                                    <div class="data-img" id="chart5.0" style="height:116px">
                                    </div>
                                     <div class="data-img" id="chart5.1" style="height:116px">
                                    </div>
                                    <div style="height:38px;width:100%;margin:0 auto;text-align:center;">
                                        <img alt="图列" src="../../images/sync_le2.png" style="cursor:pointer">
                                    </div>
                                    <div class="data-c">
                                        <div class="d mr56">
                                            <div>
                                                <p>
                                                    推荐点击访客<a></a>
                                                </p>
                                                <span id="rec_uv"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                        <div class="d">
                                            <div>
                                                <p>
                                                    访客<a></a>
                                                </p>
                                                <span id="uv"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                        <div class="d fr">
                                            <div>
                                                <p>
                                                    推荐点击访客/访客
                                                </p>
                                                <span id="visits_5"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="databox">
                                    <div class="data-img" id="chart6">
                                    </div>
                                    <div class="data-c">
                                        <div class="d">
                                            <div>
                                                <p>
                                                    推荐影响人均浏览深度<a></a>
                                                </p>
                                                <span id="rec_visit_depth_avg"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                        <div class="d fr">
                                            <div>
                                                <p>
                                                    人均浏览深度<a></a>
                                                </p>
                                                <span id="visit_depth_avg"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="data-c">
                                        <div class="d ml70">
                                            <div>
                                                <p>
                                                    推荐影响人均浏览深度/人均浏览深度
                                                </p>
                                                <span id="visits_6"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="databox">
                                    <div class="data-img" id="chart7.0" style="height:116px">
                                    </div>
                                     <div class="data-img" id="chart7.1" style="height:116px">
                                    </div>
                                    <div style="height:38px;width:100%;margin:0 auto;text-align:center;">
                                        <img alt="图列" src="../../images/sync_le3.png" style="cursor:pointer">
                                    </div>
                                    <div class="data-c">
                                        <div class="d">
                                            <div>
                                                <p>
                                                    推荐点击次数<a></a>
                                                </p>
                                                <span id="rec_click_num"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                        <div class="d fr">
                                            <div>
                                                <p>
                                                    推荐栏展示次数<a></a>
                                                </p>
                                                <span id="rec_show_num"><span style="font-size: 16px;">loading...</span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="data-c">
                                        <div class="d ml110">
                                            <div>
                                                <p>
                                                    推荐点击次数/推荐栏展示次数
                                                </p>
                                                <span id="visits_7"><span style="font-size: 16px;">loading...</span></span>
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
        <!-- main   结束 -->
        <!-- footer  开始 -->
        <div class="footer">
            <p>
              <%@ include file="/foot.jsp"%>
            </p>
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
