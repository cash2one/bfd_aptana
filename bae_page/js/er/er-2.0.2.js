/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er.js
 * desc:    er(ecom ria)是一个用于支撑富ajax应用的框架
 * author:  erik
 */


var er = {};
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/config.js
 * desc:    er框架的默认配置
 * author:  erik
 */

///import er;

er.config = {
    CONTROL_IFRAME_ID   : 'ERHistroyRecordIframe',
    DEFAULT_INDEX       : '/',
    MAIN_ELEMENT_ID     : 'Main',
    ACTION_ROOT         : '/asset/js',
    ACTION_PATH         : {},
    ACTION_AUTOLOAD     : 0
};
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/_util.js
 * desc:    er框架内部的使用的功能函数集
 * author:  erik
 */

///import er.config;

er._util = function () { 
    /**
     * 获取配置信息
     * 
     * @inner
     * @param {string} name 配置项名称
     * @return {string}
     */
    function getConfig( name ) {
        var cfg = er.config,
            // 配置默认值
            defaultCfg = {         
                CONTROL_IFRAME_ID   : 'ERHistroyRecordIframe',
                DEFAULT_INDEX       : '/',
                MAIN_ELEMENT_ID     : 'Main',
                ACTION_ROOT         : '/asset/js',
                ACTION_PATH         : {},
                ACTION_AUTOLOAD     : 0
            },
            value = cfg[ name ];
        
        if ( !hasValue( value ) ) {
            value = defaultCfg[ name ] || null;
        }    
        
        return value;
    }

    /**
     * 判断变量是否有值。null或undefined时返回false
     * 
     * @param {Any} variable
     * @return {boolean}
     */
    function hasValue( variable ) {
        return !(variable === null || typeof variable == 'undefined');
    }
    
    var uIdMap_ = {};
    
    /**
     * 获取不重复的随机串
     * 
     * @param {number} opt_len 随机串长度，默认为10
     * @return {string}
     */
    function getUID( opt_len ) {
        opt_len = opt_len || 10;
        
        var chars    = "qwertyuiopasdfghjklzxcvbnm1234567890",
            charsLen = chars.length,
            len2     = opt_len,
            rand     = "";
            
        while ( len2-- ) {
            rand += chars.charAt( Math.floor( Math.random() * charsLen ) );
        }
        
        if ( uIdMap_[ rand ] ) {
            return getUID( opt_len );
        }
        
        uIdMap_[ rand ] = 1;
        return rand;
    }
    
    // 暴露相应的方法
    return {
        getUID      : getUID,
        hasValue    : hasValue,
        getConfig   : getConfig
    };
}();
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/config.js
 * desc:    ER框架初始化方法
 * author:  erik
 */

///import er;
///import er._util;
///import baidu.ajax.request;

/**
 * 初始化ER框架
 */
er.init = function () {
    /**
     * 初始化函数
     *
     * @inner
     */
    function init() {
        _continue();
    }

    var initers = [];
    var phase = 'ready';
    var currIndex = 0;

    function _continue() {
        var initer;
        
        switch ( phase ) {
        case 'ready':
        case 'run':
            if ( currIndex < initers.length ) { 
                phase = 'run';
                initer = initers[ currIndex++ ];
                (typeof initer == 'function') && initer();
                _continue();
            } else {
                phase = 'inited';
                typeof er.oninit == 'function' && er.oninit();
            }
            break;
        }
    }

    /**
     * 添加初始化函数
     *
     * @public 
     * @param {Function} initer 初始化函数
     * @param {number} opt_index 初始化次序
     */
    init.addIniter = function ( initer, opt_index ) {
        if ( typeof opt_index == 'number' ) {
            initers.splice( opt_index, 0, initer );
        } else {
            initers.push( initer );
        }
    };

    /**
     * 停止初始化
     *
     * @public
     */
    init.stop = function () {
        if ( phase == 'run' ) {
            phase = 'stop';
        }
    };

    /**
     * 启动初始化
     *
     * @public
     */
    init.start = function () {
        if ( phase == 'stop' ) {
            phase = 'run';
            _continue();
        }
    };

    return init;
}();
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/template.js
 * desc:    简易的、基于html注释的模板支持
 * author:  erik, mytharcher
 */

///import er.config;
///import er.init;
///import baidu.string.encodeHTML;

/**
 * 简易的模板解析器
 */
er.template = function () {
    var masterContainer = {},
        targetContainer = {},
        targetCache = {},

        // 过滤器
        filterContainer = {
            'html': function ( source ) {
                return baidu.string.encodeHTML( source );
            },
            
            'url': function ( source ) {
                return encodeURIComponent( source );
            }
        },
        isLoaded;

    /**
     * 解析模板变量的值
     * 
     * @inner
     * @param {string} varName 变量名
     * @param {string} filterName 过滤器名
     * @param {string} privateContextId 私用context环境的id
     * @return {string}
     */
    function parseVariable( varName, filterName, privateContextId ) {
        privateContextId = privateContextId || null;
        var match = varName.match( /:([a-z]+)$/ );
        var value = '';

        if ( match && match.length > 1 ) {
            value = parseVariableByType( varName.replace(/:[a-z]+$/i, ''), match[1] );
        } else {
            var variable = er.context.get( varName, { contextId: privateContextId } );
            if ( er._util.hasValue( variable ) ) {
                value = variable;
            }
        }
        
        // 过滤处理
        if ( filterName ) {
            filterName = filterContainer[ filterName.substr( 1 ) ];
            filterName && ( value = filterName( value ) );
        }

        return value;
    }
    
    /**
     * 解析带有类型的模板变量的值
     * 
     * @inner
     * @param {string} varName 变量名
     * @param {string} type 变量类型，暂时为lang|config
     * @return {string}
     */
    function parseVariableByType( varName, type ) {
        var packs           = varName.split('.'),
            len             = packs.length - 1,
            topPackageName  = packs.shift(),
            win             = window,
            objOnDef        = er._util.getConfig('DEFAULT_PACKAGE'),
            variable,
            objOnSelf,
            objOnBase;
        
        type = type.toLowerCase();

        // 多层示例假设: ${package.sub.test:lang}
        // 如果getConfig('DEFAULT_PACKAGE')的值为 "project"   
        // 查找对象:
        // project.package.sub.lang.test
        // package.sub.lang.test
        // lang.package.sub.test
        objOnDef && ( objOnDef = win[ objOnDef ] );               // object:project
        objOnSelf = win[ topPackageName ];                        // object:package
        objOnBase = win[ type ] && win[ type ][ topPackageName ]; // object:lang.package
        
        // 对于单层的值，如: ${test:lang}
        // 查找对象 project.lang.test 和 lang.test
        if ( len == 0 ) {
            objOnDef = objOnDef && objOnDef[ type ];
            return ( ( objOnDef && objOnDef[ topPackageName ] ) || objOnBase || '' );
        }
        
        objOnDef = objOnDef && objOnDef[ topPackageName ]; // object: project.package
        varName = packs.pop();
        len--;
        
        while ( len-- ) {
            variable = packs.shift();
            objOnDef = objOnDef && objOnDef[ variable ];
            objOnSelf = objOnSelf && objOnSelf[ variable ];
            objOnBase = objOnBase && objOnBase[ variable ];
        }
        
        objOnDef = objOnDef && objOnDef[ type ];    // object: project.package.sub.lang
        objOnSelf = objOnSelf && objOnSelf[ type ]; // object: package.sub.lang

        objOnDef = objOnDef && objOnDef[ varName ];    // object: project.package.sub.lang.test
        objOnSelf = objOnSelf && objOnSelf[ varName ]; // object: package.sub.lang.test
        objOnBase = objOnBase && objOnBase[ varName ]; // object: lang.package.sub.test

        if ( er._util.hasValue( objOnDef ) ) {
            return objOnDef;
        } else if ( er._util.hasValue( objOnSelf ) ) {
            return objOnSelf;
        } else if ( er._util.hasValue( objOnBase ) ) {
            return objOnBase;
        }
        
        return '';
    }
    
    /**
     * 获取节点对应的内容
     *
     * @inner
     * @param {Object} node 节点对象
     * @param {Object} target target节点对象，用于contentplaceholder替换
     * @return {string}
     */
    function getContent( node, opt_target ) {
        if ( node && typeof node == 'object' ) { 
            var list = node.content.slice(0);
            var len  = list instanceof Array && list.length;
            var segment;
            var temp;

            if ( len ) {
                while ( len-- ) {
                    segment = list[ len ];
                    
                    // 解析非文本节点
                    if ( typeof segment == 'object' ) {
                        temp = '';

                        switch ( segment.type ) {
                        // 解析import
                        case 'import':
                            temp = getTargetContent( segment.id );
                            break;

                        // 解析contentplaceholder
                        case 'contentplaceholder':
                            if ( opt_target ) {
                                temp = opt_target.contentMap[ segment.id ].content.join('');
                            }
                            break;
                        }

                        list[ len ] = temp;
                    }
                }
            }

            return list.join( '' );
        }

        return '';
    }
    
    /**
     * 获取target的内容
     *
     * @inner
     * @param {string} name target的名称
     * @return {string}
     */
    function getTargetContent( name ) {
        var targetStr = targetCache[ name ];
        var target;
        var len;
        var segment;
        var master;

        if ( targetStr ) {
            return targetStr;
        }

        target = targetContainer[ name ];
        if ( target ) {
            if ( target.master ) { 
                // target具有母版，以母版内容为解析源
                master = masterContainer[ target.master ];
                targetStr = getContent( master, target );
            } else { 
                // target不具有母版，则直接解析
                targetStr = getContent( target );
            }
            
            targetCache[ name ] = targetStr; // 缓存target内容结果
            return targetStr;
        }

        return '';
    }

    /**
     * 解析模板
     * 
     * @inner
     * @param {string} source 模板源
     */
    function parse( source ) {
        if ( typeof source != 'string' ) {
            return;
        }
        
        /**
         * 解析节点，如果是有含义的注释节点返回object
         *
         * @inner
         * @param {string} src 源字符串
         * @return {Object|string}
         */
        function parseNode( src ) {
            // 注释节点规则
            var rule = /^<!--\s*(\/)?(target|master|content|import|contentplaceholder)\s*(:\s*([a-z0-9_]+))?\s*(?:\(([^\)]+)\))?\s*-->$/i
            
            // 属性规则
            var propRule = /^\s*([0-9a-z_]+)\s*=\s*([0-9a-z_]+)\s*$/i;
            
            var node;
            var id;
            var propList;
            var propStr;
            var i, len;
            
            
            if ( rule.test( src ) ) {
                node = {};
                node.type = RegExp.$2.toLowerCase();
                
                if ( RegExp.$1 ) { 
                    // 结束标签不解析内容
                    node.endTag = 1;
                } else {
                    // 解析 ":id" 形式的id属性
                    id = RegExp.$4;
                    id && (node.id = id);
                    
                    // 解析 "(name=value,name2=value2)" 形式的其他属性
                    propStr = RegExp.$5;
                    if ( propStr ) {
                        propList = propStr.split(',');
                        for ( i = 0, len = propList.length; i < len; i++ ) {
                            if ( propRule.test( propList[ i ] ) ) {
                                node[ RegExp.$1.toLowerCase() ] = RegExp.$2;
                            }
                        }
                    }
                }

                return node;
            }
            
            // 无特殊含义字符串直接返回
            return src;
        } 

        var COMMENT_BEGIN = '<!--';
        var COMMENT_END = '-->';
        
        var len;

        var currentNode;        // 二次解析阶段的当前节点，可能为target或master
        var currentContent;     // 二次解析阶段的当前content节点

        var i;
        var str;
        var strLen;
        var node;

        // 一次解析阶段的结果字符串流，数组每项是text片段或comment片段
        var strStream = [];    
        
        // 一次解析阶段的结果指针，用于优化push的性能
        var strStreamPoint = 0; 
        
        // 对source以 <!-- 进行split
        var blocks = source.split( COMMENT_BEGIN );
        if ( blocks[0] === '' ) {
            blocks.shift();
        }
        len = blocks.length;
        
        // 开始第一阶段解析，生成strStream
        for ( i = 0; i < len; i++ ) {
            // 对 <!-- 进行split的结果
            // 进行 --> split
            // 如果split数组长度为2
            // 则0项为注释内容，1项为正常html内容
            str = blocks[ i ].split( COMMENT_END );
            strLen = str.length;

            if ( strLen == 2 || i > 0 ) {
                if ( strLen == 2 ) {
                    strStream[ strStreamPoint++ ] = COMMENT_BEGIN + str[ 0 ] + COMMENT_END;
                    strStream[ strStreamPoint++ ] = str[ 1 ];
                } else {
                    strStream[ strStreamPoint++ ] = str[ 0 ];
                }
            }
        }
        
        // 开始第二阶段解析
        // 将master和target分别存入container
        for ( i = 0; i < strStreamPoint; i++ ) {
            str = strStream[ i ];
            node = parseNode( str );

            switch ( typeof node ) {
            // 当parseNode结果为object时，针对node进行解析
            case 'object':
                switch ( node.type ) {
                case 'master':
                    currentNode = null;
                    currentContent = null;
                    if ( !node.endTag && node.id ) {
                        node.content = [];
                        currentNode = node;
                        masterContainer[ node.id ] = node;
                    }

                    break;

                case 'target':
                    currentNode = null;
                    currentContent = null;
                    if ( !node.endTag && node.id ) {
                        node.content = [];
                        if ( node.master ) {
                            node.contentMap = {};
                        }
                        currentNode = node;
                        targetContainer[ node.id ] = node;
                    }

                    break;

                case 'import':
                    if ( currentNode ) {
                        currentNode.content.push( node );
                    }

                    break;

                case 'content':
                    currentContent = null;

                    if ( 
                        !node.endTag 
                        && currentNode 
                        && currentNode.type == 'target' 
                    ) {
                        currentNode.content.push( node );
                        if ( node.id ) {
                            currentNode.contentMap[ node.id ] = node;
                        }
                        
                        node.content = [];
                        currentContent = node;
                    }
                    break;

                case 'contentplaceholder':
                    if ( currentNode && currentNode.type == 'master' ) {
                        currentNode.content.push( node );
                    }

                    break;
                }

                break;
            
            // 如果parseNode返回仍然为string
            // 将其填入当前正在解析的content或master或target中
            case 'string':
                if ( currentContent ) {
                    currentContent.content.push( str );
                } else if ( currentNode ) {
                    currentNode.content.push( str );
                }

                break;
            }
        }
    }
    
    /**
     * 加载模板
     *
     * @inner
     */
    function load() {
        er.init.stop();

        var list    = er._util.getConfig( 'TEMPLATE_LIST' ),
            len     = list instanceof Array && list.length,
            tplBuf  = [],
            i       = 0;
            
        if ( len && !isLoaded ) {
            isLoaded = 1;
            loadTemplate();
        } else {
            er.init.start();
        }
        
        /**
         * 加载模板成功的回调函数
         * 
         * @inner
         * @param {Object} xhr
         */
        function successCallback( xhr ) {
            tplBuf.push( xhr.responseText );
            loadedCallback();
        }
        
        /**
         * 每条模板加载完毕的处理函数
         * 
         * @inner
         */
        function loadedCallback() {
            i++;
            
            if ( i >= len ) {
                er.template.parse( tplBuf.join( '\n' ) );
                er.init.start();
            } else {
                loadTemplate();
            }
        }
        
        /**
         * 加载模板
         * 
         * @inner
         */
        function loadTemplate() {
            baidu.ajax.request( list[ i ], {
                'method'   : 'get',
                'onsuccess': successCallback,
                'onfailure': loadedCallback
            });
        }
    }

    er.init.addIniter( load, 0 );

    // 返回暴露的方法
    return {
        /**
         * 添加过滤器
         * 
         * @public
         * @param {string} type 过滤器类型
         * @param {Function} filter 过滤器
         */
        addFilter: function ( type, filter ) {
            filterContainer[ type ] = filter;
        },

        /**
         * 获取指定模板target的HTML片段
         * 
         * @public
         * @param {string} name
         * @return {string}
         */
        get: getTargetContent,
        
        /**
         * 解析模板
         * 
         * @public
         * @param {string} source 模板源
         */
        parse: parse,
        
        /**
         * 合并模板与数据
         * 
         * @public
         * @param {HTMLElement} output  要输出到的容器元素
         * @param {string}      tplName 视图模板
         * @param {string}      opt_privateContextId 私用context环境的id
         */
        merge: function ( output, tplName, opt_privateContextId ) {
            if ( output ) {
                output.innerHTML = er.template.get( tplName ).replace(
                    /\$\{([.:a-z0-9_]+)\s*(\|[a-z]+)?\s*\}/ig,
                    function ( $0, $1, $2 ) {
                        return parseVariable( $1, $2, opt_privateContextId );
                    });
            }
        }
    };
}();
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/router.js
 * desc:    路由器
 * author:  erik
 */

///import er;

er.router = function () {
    var routes = [];

    function router( loc ) {
        var i, len, item, rule, func, matches;

        for ( i = 0, len = routes.length; i < len; i++ ) {
            item = routes[ i ];
            rule = item.loc;
            func = item.func;

            if ( rule instanceof RegExp
                 && ( matches = rule.exec( loc ) ) !== null
            ) {
                func.apply( this, matches );
                break;

            } else if ( typeof rule == 'string' 
                        && rule == loc
            ) {
                func.apply( this, loc );
                break;

            }
        }
    }

    router.add = function ( rule, func ) {
        routes.push( {
            loc  : rule,
            func : func
        } );
    };

    return router;
}();
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/Module.js
 * desc:    er(ecom ria)是一个用于支撑富ajax应用的框架
 */

///import er;

(function () {
    
    var moduleContainer = [];
    
    /**
     * 模块构造器
     * 
     * @public
     * @param {Object} mod 模块对象
     */
    er.Module = function ( mod ) {
        moduleContainer.push( mod );
        return mod;
    };
    
    /**
     * 获取模块列表
     * 
     * @public
     * @return {Array}
     */
    er.Module.getModuleList = function () {
        return moduleContainer;
    };
    
})();
    /*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/locator.js
 * desc:    Hash定位器
 * author:  erik
 */

///import baidu.browser.ie;
///import baidu.browser.firefox;
///import er._util;
///import er.router;
///import er.init;

/**
 * Hash定位器
 * 
 * @desc
 *      Locator = [ path ] [ ~ query ]
 *      path    = "/" [ *char *( "/" *char) ]
 *      query   = *qchar
 *      char    = ALPHA | DIGIT
 *      qchar   = char | "&" | "="
 */
er.locator = function () {
    var currentLocation,
        IFRAME_CONTENT  = "<html><head></head><body><input type=\"text\" id=\"save\">"
            + "<script type=\"text/javascript\">"
            + "var loc = \"#{0}\";"
            + "document.getElementById('save').value = loc;"
            + "parent.er.locator._updateHash(loc);"
            + "parent.er.router(loc);"
            + "</script></body></html>";
    
    /**
     * 获取location信息
     * 
     * @public
     * @return {string}
     */
    function getLocation() {
        var hash;

        // firefox下location.hash会自动decode
        // 体现在：
        //   视觉上相当于decodeURI，
        //   但是读取location.hash的值相当于decodeURIComponent
        // 所以需要从location.href里取出hash值
        if ( baidu.browser.firefox ) {
            hash = location.href.match(/#(.*)$/);
            hash && (hash = hash[ 1 ]);
        } else {
            hash = location.hash;
        }

        if ( hash ) {
            return hash.replace( /^#/, '' );
        }
        
        return '';
    }
    
    /**
     * 更新hash信息
     *
     * @private
     * @param {string} loc
     */
    function updateLocation( loc ) {
        var isChange = currentLocation != loc;

        // 存储当前信息
        // opera下，相同的hash重复写入会在历史堆栈中重复记录
        // 所以需要getLocation来判断
        if ( currentLocation != loc && getLocation() != loc ) {
            location.hash = loc;
        }

        currentLocation = loc;
        return isChange;
    }

    /**
     * 控制定位器转向
     * 
     * @public
     * @param {string} loc location位置
     * @param {Object} opt_option 转向参数
     */
    function redirect( loc, opt_option ) {
        var opt = opt_option || {};

        // 非string不做处理
        if ( typeof loc != 'string' ) {
            return;
        }
       
        // 增加location带起始#号的容错性
        // 可能有人直接读取location.hash，经过string处理后直接传入
        loc = loc.replace( /^#/, '' );

        // 空string当成DEFAULT_INDEX处理
        if ( loc.length == 0 ) {
            loc = er._util.getConfig( 'DEFAULT_INDEX' ); 
        }

        // 与当前location相同时不进行route
        var isLocChanged = updateLocation( loc );
        if ( isLocChanged || opt.enforce ) {
            loc = currentLocation;

            // 触发onredirect事件
            er.locator.onredirect();
            
            // 当location未变化，强制刷新时，直接route
            if ( !isLocChanged ) {
                er.router( loc );
            } else {
                doRoute( loc );
            }
        }
    }
    
    /**
     * hash变化的事件监听器
     *
     * @private
     */
    function changeListener() {
        var loc = getLocation();

        if ( !loc ) {
            redirect( '' );
        } else if ( loc !== currentLocation ) {
            doRoute( loc );
        }
    }

    function doRoute( loc ) {
        // 权限判断以及转向
        var loc302 = authorize( loc );
        if ( loc302 ) {
            redirect( loc302 );
            return;
        }

        // ie下使用中间iframe作为中转控制
        // 其他浏览器直接调用控制器方法
        if ( baidu.ie && baidu.ie < 8 ) {
            ieRoute( loc );
        } else {
            er.router( loc );
        }
    }

    /**
     * 刷新当前地址
     * 
     * @public
     */
    function reload() {
        if ( currentLocation ) {
            redirect( currentLocation, { enforce: true } );
        }
    }
    
    /**
     * IE下调用router
     * 
     * @private
     * @param {string} loc 地址
     */
    function ieRoute( loc ) {
        var iframe = baidu.g( er._util.getConfig( 'CONTROL_IFRAME_ID' ) ),
            iframeDoc = iframe.contentWindow.document;

        iframeDoc.open( 'text/html' );
        iframeDoc.write(
            baidu.format(
                IFRAME_CONTENT, 
                escapeIframeContent( loc )
            ));
        iframeDoc.close();
    }

    /**
     * iframe内容字符串的转义
     *
     * @private
     * @param {string} 源字符串
     * @return {string}
     */
    function escapeIframeContent( source ) {
        return source.replace( /\\/g, "\\\\" ).replace( /\"/g, "\\\"" );
    }

    /**
     * 初始化locator
     *
     * @private
     */
    function init() {
        if ( baidu.ie && baidu.ie < 8 ) {
            ieCreateIframeRecorder();
            setInterval( changeListener, 100 );
        } 
        else if ( 'onhashchange' in window ) {
            window.onhashchange = changeListener;
            changeListener();
        } else {
            setInterval( changeListener, 100 );
        }
    }
    
    /**
     * ie下创建记录与控制跳转的iframe
     *
     * @private
     */
    function ieCreateIframeRecorder() {
        var iframe = document.createElement('iframe'),
            size   = 200,
            pos    = '-1000px';

        iframe.id       = er._util.getConfig( 'CONTROL_IFRAME_ID' );
        iframe.width    = size;
        iframe.height   = size;
        iframe.src      = "about:blank";

        iframe.style.position   = "absolute";
        iframe.style.top        = pos;
        iframe.style.left       = pos;

        document.body.appendChild(iframe);
    }
    
    var authorizers = [];

    /**
     * 增加权限验证器
     *
     * @public
     * @param {Function} authorizer 验证器，验证失败时验证器返回转向地址
     */
    function addAuthorizer( authorizer ) {
        if ( 'function' == typeof authorizer ) {
            authorizers.push( authorizer );
        }
    }
    
    /**
     * 权限验证
     *
     * @inner
     * @return {string} 验证失败时验证器返回转向地址
     */
    function authorize( currLoc ) {
        var i = 0;
        var len = authorizers.length;
        var loc;

        for ( ; i < len; i++ ) {
            loc = authorizers[ i ]( currLoc );
            if ( loc ) {
                return loc;
            }
        }
    }
    
    // 注册初始化函数
    er.init.addIniter( init, 2 );

    // 返回暴露的方法
    return {
        'redirect'          : redirect,
        'reload'            : reload,
        'getLocation'       : getLocation,
        '_updateHash'       : updateLocation,
        'onredirect'        : new Function(),
        'addAuthorizer'     : addAuthorizer
    };
}();

/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/permission.js
 * desc:    权限管理器
 * author:  erik
 */

///import er;
    
/**
 * 权限管理器
 * 
 * @desc
 *      权限管理器为页面提供了是否允许访问的权限控制，也能通过isAllow方法判断是否拥有权限。
 */
er.permission = function () {
    var permissible = {};
    
    return {
        /**
         * 初始化权限数据
         * 
         * @public
         * @param {Object} data 权限数据
         */
        init: function ( data ) {
            var key, item;

            for ( key in data ) {
                item = data[ key ];

                if ( 'object' == typeof item ) {
                    er.permission.init( item );
                } else if ( item ) {
                    permissible[ key ] = item;
                }
            }
        },
        
        /**
         * 判断是否拥有权限
         * 
         * @public
         * @param {string} name 权限名
         * @return {boolean}
         */
        isAllow: function ( name ) {
            return !!permissible[ name ];
        }
    };
}();

/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/controller.js
 * desc:    控制器
 * author:  erik
 */

///import er.router;
///import er.Module;
///import er.locator;
///import er.permission;
///import er.init;
///import baidu.sio.callByBrowser;
    
/**
 * 控制器
 * 
 * @desc
 *      控制器负责将对应的path转向给相应的action对象处理
 */
er.controller = function () {
    var contextContainer = {},
        configContainer  = {},
        locationRule     = /^([\/a-zA-Z0-9_-]+)(?:~(.*))?$/,
        mainActionContext,
        currentPath,
        currentLocation,
        _isEnable = 1;

    /**
     * 将参数解析为Map
     * 
     * @inner
     * @param {string} query 参数字符串
     * @return {Object}
     */
    function _parseQuery( query ) {
        query = query || '';
        var params      = {},
            paramStrs   = query.split( '&' ),
            len         = paramStrs.length,
            item,
            value;

        while ( len-- ) {
            item = paramStrs[ len ];
            if ( !item ) {
                continue;
            }
            
            item = item.split( '=' );
            value = decodeURIComponent( item[ 1 ] );
            params[ item[ 0 ] ] = value;
        }

        return params;
    }

    /**
     * 跳转视图
     * 
     * @public
     * @param {Object} path 路径
     * @param {Object} query 查询条件
     * @param {string} loc 定位器
     */
    function forward( loc, path, query ) {
        if ( !_isEnable ) { 
            return; 
        }

        /*
        // location相同时不做forward
        if ( loc == currentLocation ) {
            return;
        }
        */
        
        var arg = {  // 组合所需的argument对象
                type     : 'main',
                referer  : currentLocation,
                queryMap : _parseQuery( query ) || {},
                path     : path,
                domId    : er._util.getConfig( 'MAIN_ELEMENT_ID' )
            },
            actionConfig,
            actionName,
            actionPath,
            action;  
        
        // path未发生变化时，不卸载和重新加载
        if ( path == currentPath ) {
            arg.refresh = true;
            mainActionContext && ( mainActionContext.enter( arg ) );
        } else {
            unloadAction( mainActionContext );
            mainActionContext   = null;
            currentPath         = null;
            currentLocation     = null;
            
            // 查找action配置
            actionConfig = getActionConfigByPath( path );
            if ( !actionConfig ) {
                throw new Error('ER: the path "' + path + '" cannot bind to action.');
                return;
            }
            
            // 记录当前的path
            currentPath = path; 
            
            // 加载action
            actionName = actionConfig.action;
            action = findAction( actionName );
            actionPath = getActionPath( actionName );
            if ( action || !actionPath ) {
                _loadAction( action, arg );
            } else if ( actionPath ) {
                baidu.sio.callByBrowser( actionPath, function () {
                    _loadAction( findAction( actionName ), arg );
                });
            }
        }

        // 记录当前的locator    
        currentLocation = loc; 
        
        /**
         * 加载action
         *
         * @inner
         */
        function _loadAction( action, arg ) {
            mainActionContext = loadAction( action, arg );
        }
    }
    
    /**
     * 根据path获取action配置
     * 
     * @public
     * @param {string} path
     * @return {Object}
     */
    function getActionConfigByPath( path ) {
        return configContainer[ path ];
    }

    /**
     * 加载action
     * 
     * @private
     * @param {Object} action        action对象
     * @param {Object} arg           加载action的参数
     * @param {string} opt_privateId 私有环境id
     */
    function loadAction( action, arg, opt_privateId ) {
        if ( action && action.prototype instanceof er.IAction ) {
            var actionContextId = er._util.getUID(),
                actionContext;
            
            
            arg = arg || {};
            arg._contextId = actionContextId;
            actionContext = new action( actionContextId );
            contextContainer[ actionContextId ] = actionContext;
            actionContext.enter( arg );
            
            return actionContext;
        }

        return null;
    }

    
    /**
     * 卸载action
     * 
     * 重置会话。卸载控件并清除显示区域内容
     * @private
     */
    function unloadAction( context ) {
        if ( typeof context == 'string' ) {
            context = contextContainer[ context ];
        }

        if ( !context ) {
            return;
        }
        
        context.leave();
        delete contextContainer[ context._contextId ];
    }

    /**
     * 初始化controller
     * 
     * @public
     */
    function init() {
        var moduleContainer = er.Module.getModuleList(),
            i   = 0, 
            len = moduleContainer.length,
            j, len2,
            path,
            module, actions, actionConfig;
        
        for ( ; i < len; i++ ) {
            module = moduleContainer[ i ];
            
            // 初始化module
            if ( 'function' == typeof module.init ) {
                module.init();
            }
            
            // 注册action
            actions = module.config && module.config.action;
            if ( actions ) {
                for ( j = 0, len2 = actions.length; j < len2; j++ ) {
                    actionConfig = actions[ j ];
                    path = actionConfig.path;
                    
                    configContainer[ path ] = actionConfig;
                }
            }
        }

        // 添加route规则
        er.router.add( locationRule, er.controller.forward );

        // 添加权限验证器
        er.locator.addAuthorizer( _authJudge );
    }
    
    /**
     * 权限验证函数，验证失败时返回自动转向地址
     *
     * @inner
     * @param {string} loc location
     * @return {string} 
     */
    function _authJudge( loc ) {
        if ( !locationRule.test( loc ) ) {
            return null;
        }

        var path = RegExp.$1;
        var actionConfig = getActionConfigByPath( path );
        if ( !actionConfig ) {
            throw new Error('ER: the path "' + path + '" cannot bind to action.');
            return;
        }
        
        var actionAuth = actionConfig.authority;
        
        // 权限判断
        if ( actionAuth && !er.permission.isAllow( actionAuth ) ) {
            return actionConfig.noAuthLocation || getConfig( 'DEFAULT_INDEX' );
        }

        return null;
    }

    /**
     * 查找获取Action对象
     * 
     * @private
     * @param {string|Object} actionName action的对象路径 | action配置对象
     */
    function findAction( actionName ) {
        if ( !actionName ) {
            return null;
        } else if ( 'object' == typeof actionName ) {
            actionName = actionName.action;
        }
        
        var action = window,
            props = actionName.split('.'),
            i, len;
        
        for ( i = 0, len = props.length; i < len; i++ ) {
            action = action[ props[ i ] ];
            if ( !action ) {
                action = null;
                break;
            }
        }
        
        return action;
    }
    
    /**
     * 载入子action
     * 
     * @public
     * @param {string} domId 加载action的容器元素id
     * @param {string|Object} actionName action的对象路径 | action配置对象
     * @param {Object} opt_argMap 一些可选的arg参数
     */
    function loadSub( domId, actionName, opt_argMap ) {
        if ( !_isEnable || !actionName ) { 
            return null; 
        }

        var action,
            actionPath  = getActionPath( actionName ),
            arg         = {type: 'sub', domId: domId},
            privateId;
        
        // 查找action
        if ( typeof actionName == 'string' ) {
            action = findAction( actionName );
        }
        
        // 初始化arg参数
        if ( opt_argMap ) {
            baidu.extend( arg, opt_argMap );
        }
        
        // 加载action，action不存在时自动加载
        if ( action || !actionPath ) {
            return loadAction( action, arg );
        } else {
            privateId = er._util.getUID();
            baidu.sio.callByBrowser( actionPath, function () {
                loadAction( findAction( actionName ), arg, privateId );
            });

            return privateId;
        }
    }

    /**
     * 通过path载入子action
     * 
     * @public
     * @param {string} domId 加载action的容器元素id
     * @param {string} path 要加载的path，path需要在module中配置过action
     * @param {Object} opt_argMap 一些可选的arg参数
     */
    function loadSubByPath( domId, path, opt_argMap ) {
        var actionConfig = getActionConfigByPath( path );
        if ( !actionConfig ) {
            throw new Error('ER: the path "' + path + '" cannot bind to action.');
            return null;
        }

        return loadSub( domId, actionConfig.action, opt_argMap );
    }
    
    /**
     * 触发Action的事件
     *
     * @public
     * @param {string}        type              事件名
     * @param {Any}           eventArg          事件对象
     * @param {string|Object} opt_actionRuntime action的runtime id或对象
     */
    function fireActionEvent( type, eventArg, opt_actionRuntime ) {
        var actionCtx;

        if ( opt_actionRuntime ) {
            actionCtx = opt_actionRuntime;
            if ( typeof actionCtx == 'string' ) {
                actionCtx = contextContainer[ actionCtx ];
            }
        } else {
            actionCtx = mainActionContext;
        }

        actionCtx && actionCtx.fireEvent( type, eventArg );
    }
    
    /**
     * 设置控制器可用状态
     *
     * @inner
     * @param {boolean} isEnable
     */
    function enable( isEnable ) {
        _isEnable = isEnable;
    }

    /**
     * 获取ACTION的路径
     * 
     * @inner
     * @param {string} ACTION ACTION的名称
     * @return {string}
     */
    function getActionPath( actionName ) {
        var rootPath        = er._util.getConfig( 'ACTION_ROOT' );
        var actionPath      = er._util.getConfig( 'ACTION_PATH' );
        var autoLoadMode    = er._util.getConfig( 'ACTION_AUTOLOAD' );
        var path = rootPath + (/\/$/.test(rootPath) ? '' : '/');
        var relatePath;

        if ( autoLoadMode ) {
            relatePath = actionPath[ actionName ]; // 查找配置项

            // 根据默认规则生成path
            if ( !relatePath ) {
                switch ( String(autoLoadMode).toLowerCase() ) {
                case 'action':  // action粒度规则
                    path += actionName.replace( /\./g, '/' ) + '.js';
                    break;
                default:        // module粒度规则
                    actionName = actionName.split('.');
                    actionName.pop();
                    path += actionName.join('/') + '.js';
                    break;
                }
            } else {
                path += relatePath;
            }

            return path;
        }

        return '';
    }
    
    // 注册初始化函数
    er.init.addIniter( init, 1 );

    return {
        forward                 : forward,
        _enable                 : enable,
        loadSub                 : loadSub,
        loadSubByPath           : loadSubByPath,
        unloadSub               : unloadAction,
        fireEvent               : fireActionEvent,
        fireMain                : function (type, eventArg) {fireActionEvent(type, eventArg);}
    };
}();
    
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/context.js
 * desc:    context为上下文数据提供环境，分为public,private两个级别
 * author:  erik
 */

///import er;

/**
 * 运行时的上下文数据管理器
 */
er.context = function () {
    var publicContext = {},    // public级别数据容器
        privateContext = {},   // private级别数据容器
        changeListeners = [];  // context变化的监听器容器

    return {
        /**
         * 设置应用环境上下文
         * 
         * @name er.context.set
         * @public
         * @param {string} name 环境变量名
         * @param {Any}    value 环境变量值
         * @param {Object} [opt_arg] 设置选项
         *     @config {string} [contextId] 私有环境id
         */
        set: function ( name, value, opt_arg ) {
            opt_arg         = opt_arg || {};
            var contextId   = opt_arg.contextId;  
            var context     = contextId ? privateContext[ contextId ] : publicContext;
            var evtArg      = {};
            var newValue    = value;
            var i, len;
            
            if ( !context ) {
                throw new Error('ER: private context "' + contextId + '" is not exist.');
            }
            
            if ( !opt_arg.silence ) {
                // 初始化event argument
                contextId && ( evtArg.contextId = contextId );
                evtArg.name     = name;
                evtArg.oldValue = context[ name ] || null;
                evtArg.newValue = newValue;
                
                // change事件触发
                for ( i = 0, len = changeListeners.length; i < len; i++ ) {
                    changeListeners[ i ].call( er.context, evtArg );
                }
            }

            context[ name ] = newValue;
        },
        
        /**
         * 增加私有环境
         * 
         * @public
         * @name er.context.addPrivate
         * @param {string} contextId 私有环境id
         * @param {Object} [opt_container] 数据容器对象
         */
        addPrivate: function ( contextId, opt_container ) {
            if ( !privateContext[ contextId ] ) {
                privateContext[ contextId ] = opt_container || {};
            }
        },
        
        /**
         * 移除私有环境
         * 
         * @public
         * @name er.context.removePrivate
         * @param {string} contextId 私有环境id
         */
        removePrivate: function ( contextId ) {
            privateContext[ contextId ] = null; 
        },
        
        /**
         * 获取上下文环境变量
         * 
         * @public
         * @name er.context.get
         * @param {string} name 上下文变量名
         * @param {Object} opt_arg 读取选项
         *     @config {string} [contextId] 私有环境id
         * @return {Any}
         */
        get: function ( name, opt_arg ) {
            opt_arg = opt_arg || {};

            var contextId = opt_arg.contextId;
            var value;
            var priv;
                
            if ( 'string' == typeof contextId ) {
                priv = privateContext[ contextId ];
                value = priv && priv[ name ];
            }
            
            if ( er._util.hasValue( value ) ) {
                return value;
            }
            
            value = publicContext[ name ];
            if ( er._util.hasValue( value ) ) {
                return value;
            }
    
            return null;
        },

        /**
         * 增加context的change事件监听器
         *
         * @public
         * @name er.context.addChangeListener
         * @param {Function} listener 监听器
         */
        addChangeListener: function ( listener ) {
            changeListeners.push( listener );
        },
        
        /**
         * 移除context的change事件监听器
         *
         * @public
         * @name er.context.addChangeListener
         * @param {Function} listener 监听器
         */
        removeChangeListener: function ( listener ) {
            var len = changeListeners.length;
            while ( len-- ) {
                if ( listener === changeListeners[ len ] ) {
                    changeListeners.splice( len, 1 );
                }
            }
        }
    };
}();
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/Model.js
 * desc:    Model类
 * author:  erik
 */

///import er.context;
///import er._util;

er.Model = function () {
    function Model( extend ) {
        var construct = new Function();
        construct.prototype = extend;
        baidu.inherits( construct, Model );

        return construct;
    }

    Model.prototype = {
        /**
         * 构造model实例
         *
         * @public
         * @param {Object} options 构造参数
         */
        construct: function ( option ) {
            option = option || {};

            this._guid              = option.guid || er._util.getUID();
            this._container         = {};
            this._changeListener    = this.__getChangeListener();
            this._changeListeners   = [];
            this.action             = option.action;

            er.context.addPrivate( this._guid, this._container );
            er.context.addChangeListener( this._changeListener );
        },
        
        /**
         * 设置数据
         *
         * @public
         * @param {string} name 数据名
         * @param {Any} value 数据值
         */
        set: function ( name, value, opt_arg ) {
            var arg = baidu.object.clone( opt_arg || {} );
            arg.contextId = this._guid;

            er.context.set( name, value, arg );
        },
        
        /**
         * 获取数据
         *
         * @public
         * @param {string} name 数据名
         * @return {Any}
         */
        get: function ( name ) {
            return er.context.get( name, { contextId: this._guid } );
        },
        
        /**
         * 停止model加载动作
         *
         * @public
         */
        stop: function () {
            if ( this._phase == 'loading' ) {
                this._phase = 'waiting';
            }
        },
        
        /**
         * 开始model加载动作
         *
         * @public
         */
        start: function () {
            if ( this._phase == 'waiting' ) {
                this._phase = 'loading';
                this.__continue();
            }
        },
        
        /**
         * 加载model
         *
         * @public
         * @param {Function} finishedCallback 加载完成回调函数
         */
        load: function ( finishedCallback ) {
            this._phase = 'loading';

            this._loaderList = this.LOADER_LIST || [];
            this._loaderIndex = 0;
            this._loaderCount = this._loaderList.length;

            this._finishedCallback = finishedCallback || new Function();
            this.__continue();
        },
        

        /**
         * 继续加载model
         *
         * @private
         */
        __continue: function () {
            if ( this._phase != 'loading' ) {
                return;
            }

            if ( this._loaderIndex >= this._loaderCount ) {
                this._phase = null;
                this._finishedCallback();
                return;
            }
            
            var loader = this[ this._loaderList[ this._loaderIndex++ ] ];
            loader.setModel( this );
            loader.load();

            this.__continue();
        },
        
        /**
         * 添加数据变化的监听器
         *
         * @public
         * @param {Function} listener 监听器
         */
        addChangeListener: function ( listener ) {
            this._changeListeners.push( listener );
        },
        
        /**
         * 移除数据变化的监听器
         *
         * @public
         * @param {Function} listener 监听器
         */
        removeChangeListener: function ( listener ) {
            var changeListeners = this._changeListeners;
            var len = changeListeners.length;

            while ( len-- ) {
                if ( listener === changeListeners[ len ] ) {
                    changeListeners.splice( len, 1 );
                }
            }
        },

        /**
         * 释放model
         *
         * @public
         */
        dispose: function () {
            er.context.removePrivate( this._guid );
            er.context.removeChangeListener( this._changeListener );
            
            this.action = null;
            this._container = null;
            this._changeListener = null;
            this._changeListeners = null;
        },
        
        /**
         * 获取model唯一标识
         *
         * @public
         * @return {string}
         */
        getGUID: function () {
            return this._guid;
        },
        
        /**
         * 获取参数字符串
         *
         * @public
         * @param {Object} opt_queryMap 参数映射表，默认使用model的QUERY_MAP项
         * @return {string}
         */
        getQueryString: function ( opt_queryMap ) {
            var queryMap = opt_queryMap || this.QUERY_MAP,
                buffer   = [],
                value,
                key;
                
            if ( queryMap ) {
                for ( key in queryMap ) {
                    value = this.get( queryMap[ key ] );
                    if ( er._util.hasValue( value ) ) {
                        buffer.push( key + '=' + encodeURIComponent( value ) );
                    }
                }
                
                return buffer.join( '&' );
            }
            
            return '';
        },

        onchange: new Function(),
        
        /**
         * 获取数据模型变化的事件监听器
         *
         * @private
         * @return {Function}
         */
        __getChangeListener: function () {
            var me = this;
            return function ( event ) {
                if ( event.contextId == me._guid ) {
                    var evtArg = {
                        name    : event.name,
                        oldValue: event.oldValue,
                        newValue: event.newValue
                    };
                    var changeListeners = me._changeListeners;
                    var i = 0;
                    var len = changeListeners.length;

                    me.onchange( evtArg );
                    for ( ; i < len; i++ ) {
                        changeListeners[ i ].call( me, evtArg );
                    }
                }
            };
        }
    };

    return Model;
}();

/**
 * model加载器
 *
 * @class
 */
er.Model.Loader = function ( func, opt_option ) {
    this._func = func;
};

er.Model.Loader.prototype = {
    /**
     * 设置当前加载的model
     *
     * @public
     * @param {er.Model} model 当前加载的model
     */
    setModel: function ( model ) {
        this.model = model;
    },

    /**
     * 加载model
     *
     * @public
     */
    load: function () {
        this._func.call( this.model );
    },

    /**
     * 停止加载
     *
     * @public
     */
    stop: function () {
        this.model.stop();
    },
    
    /**
     * 启动加载
     *
     * @public
     */
    start: function () {
        this.model.start();
    },
    
    /**
     * 获取model数据
     *
     * @public
     * @param {string} name 数据名
     * @return {Any}
     */
    get: function () {
        return this.model.get.apply( 
            this.model, 
            Array.prototype.slice.call( arguments, 0 ) 
        );
    },

    /**
     * 填充model数据
     *
     * @public
     * @param {string} name 数据名
     * @param {Any} value 数据值
     */
    set: function () {
        this.model.set.apply( 
            this.model, 
            Array.prototype.slice.call( arguments, 0 ) 
        );
    },
    
    /**
     * 获取参数字符串
     *
     * @public
     * @param {Object} opt_queryMap 参数映射表，默认使用model的QUERY_MAP项
     * @return {string}
     */
    getQueryString: function ( opt_queryMap ) {
        return this.model.getQueryString( opt_queryMap );
    }
};
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/IAction.js
 * desc:    Action接口声明
 * author:  erik
 */

///import er;
    
/**
 * Action接口声明
 */
er.IAction = function () {
};

/**
 * Action接口的enter方法声明
 */
er.IAction.prototype.enter = function ( args ) {
};

/**
 * Action接口的leave方法声明
 */
er.IAction.prototype.leave = function () {
};
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/View.js
 * desc:    视图类
 * author:  erik
 */

///import er.Model;
///import er.template;
///import baidu.object.extend;
///import baidu.lang.inherits;

er.View = function () {
    var ext_ = {};

    function View( options ) {
        var construct = new Function();

        options && (construct.prototype = options);
        baidu.extend( construct.prototype, ext_ );
        baidu.inherits( construct, arguments.callee );
        return construct;
    }

    View.prototype = {
        /**
         * 构造view实例
         *
         * @public
         * @param {Object} options 构造参数
         */
        construct: function ( options ) {
            if ( options && typeof options == 'object' ) {
                this.setTarget( options.target );
                this.setTemplate( options.template );
                this.setModel( options.model );
            }
        },
        
        /**
         * 设置渲染目标
         *
         * @public
         * @param {string|HTMLElement} target 目标元素或id
         */
        setTarget: function ( target ) {
            target && (this.target = target);
        },
        
        /**
         * 设置模板名
         *
         * @public
         * @param {string} template 模板名
         */
        setTemplate: function ( template ) {
            template && ( this.template = template );
        },
        
        /**
         * 设置数据模型
         *
         * @public
         * @param {er.Model} model 数据模型
         */
        setModel: function ( model ) {
            this.model = model;
        },
        
        /**
         * 渲染视图
         *
         * @public
         */
        render: function () {
            var target = baidu.g( this.target );
            er.template.merge( target, this.template, this.model.getGUID() );
        },
        
        /**
         * 重绘视图
         *
         * @public
         */
        repaint: function () {
            this.render();
        },

        /**
         * 清空视图
         *
         * @public
         */
        clear: function () {
            var target = baidu.g( this.target );
            target && (target.innerHTML = '');
        }
    };

    /**
     * 扩展渲染功能
     *
     * @static
     * @public
     * @param {Object} ext 扩展功能
     */
    View.extend = function ( ext ) {
        baidu.extend( ext_, ext );
    };
 
    return View;
}();



/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/AbstractAction.js
 * desc:    Action的抽象类
 * author:  erik
 */

///import er.IAction;
///import er.context;
///import er.Model;
///import er.View;
///import er._util;
///import baidu.lang.inherits;

er.AbstractAction = function () {

    function AbstractAction_() {}

    // Action的基础功能
    AbstractAction_.prototype = {
        /**
         * 生命周期阶段声明
         */
        LIFECYCLE_PHASE: {
            'enter'             : 1,
            'leave'             : 1,
            'entercomplete'     : 1,
            'beforeloadmodel'   : 1,
            'afterloadmodel'    : 1,
            'beforerender'      : 1,
            'afterrender'       : 1,
            'beforerepaint'     : 1,
            'afterrepaint'      : 1
        },
        
        /**
         * 进入阶段
         *
         * @private
         * @param {string} phase 阶段名
         */
        __moveOntoPhase: function ( phase ) {
            if ( this.LIFECYCLE_PHASE[ phase ] ) {
                this._phase = phase;
                this[ '__' + phase ] && this[ '__' + phase ].call( this );
            }
        },
        
        /**
         * 进入当前action
         * 
         * @protected
         * @param {Object} arg 进入的参数
         * @desc
         *      render与repaint时都从enter入口，只有path离开才leave
         *      来易来，去难去……
         */
        enter: function ( arg ) {
            arg = arg || {};
            
            var me = this;
            var queryMap = arg.queryMap || {};
            var key;
            var viewClazz;
            var templateName;
           
            // 保存arg    
            this.arg = arg; 
            
            // 初始化guid
            if ( !this.guid ) {
                this.guid = arg._contextId;
            }

            // 初始化model
            if ( !this.hasOwnProperty( 'model' ) ) {
                this.model = new (this.model || new er.Model())();
                this.model.construct( {
                    guid    : this.guid,
                    action  : this
                } );
            }

            // 初始化视图生成器
            if ( !this.hasOwnProperty( 'view' ) ) {
                templateName = this.template || this.view || '';
                if ( typeof templateName == 'function' ) {
                    templateName = templateName.call( this );
                }
                
                viewClazz = this.view;
                if ( !viewClazz || !( viewClazz.prototype instanceof er.View ) ) {
                    viewClazz = new er.View;
                }

                this.view = new viewClazz();
                this.view.construct( {
                    target      : arg.domId,
                    template    : templateName,
                    model       : this.model
                } );
            }

            this.__moveOntoPhase( 'enter' );
            
            // 将query装填入model
            for ( key in queryMap ) {
                this.model.set( key, queryMap[ key ] );
            }

            // 初始化context
            this.__moveOntoPhase( 'beforeloadmodel' );
            this.model.load( callback );      
            
            /**
             * 初始化context后的回调，用于绘制主区域或重绘控件
             * 
             * @inner
             */
            function callback() {
                me.__moveOntoPhase( 'afterloadmodel' );
                if ( arg.refresh ) {
                    me.__moveOntoPhase( 'beforerepaint' );
                    me.view.repaint();
                    me.__moveOntoPhase( 'afterrepaint' );
                } else {
                    me.__moveOntoPhase( 'beforerender' );
                    me.view.render();
                    me.__moveOntoPhase( 'afterrender' );
                }
                me.__moveOntoPhase( 'entercomplete' );
            }
        },
        
        /**
         * 获取参数
         * 
         * @param {string} name 参数名
         * @return {string}
         */
        getQuery: function ( name ) {
            var queryMap = this.arg.queryMap || {};
            return queryMap[ name ] || '';
        },

        /**
         * 离开当前action
         * 
         * @protected
         */
        leave: function () {
            this.__moveOntoPhase( 'leave' );
            this.dispose();
        },
        
        /**
         * 执行离开时的清理动作
         * 
         * @protected
         */
        dispose: function () {
            // 释放context
            this.model = null;
            
            // 清空视图
            this.view.clear();
            this.view = null;
        }
    };

    baidu.inherits( AbstractAction_, er.IAction );
    return AbstractAction_;

}();
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/Action.js
 * desc:    Action的构造器
 * author:  erik
 */

///import er.AbstractAction;
///import er._util;
///import baidu.lang.inherits;
///import baidu.object.extend;

er.Action = function () {
    
    // 声明Action扩展对象
    var ActionBaseX_ = {};

    /**
     * Action类
     * 
     * @desc 
     *      实现action的加载与重绘以及常用列表页与表单页的基础功能
     * @param {Object} obj 业务action功能对象
     * @param {string} opt_name action名，加载默认action的基础功能
     */
    function Action_( obj, opt_name ) {
        var construct = arguments.callee;
        var superClazz = opt_name ? ( ActionBaseX_[ opt_name ] || construct ) : construct;
        
        var clazz = new Function();
        clazz.prototype = obj;
        baidu.inherits( clazz, superClazz );
        return clazz;
    };

    
    Action_.prototype = {
        /**
         * enter时的内部行为
         *
         * @protected
         */ 
        __enter: function () {
            this.__fireEvent( 'enter' );
        },

        /**
         * 开始重绘前的内部行为
         *
         * @protected
         */      
        __beforerender: function () {
            this.__fireEvent( 'beforerender' );
        },
        
        /**
         * 重绘完成后的内部行为
         *
         * @protected
         */      
        __afterrender: function () {
            this.__fireEvent( 'afterrender' );
        },

        /**
         * 开始重绘前的内部行为
         *
         * @protected
         */      
        __beforerepaint: function () {
            this.__fireEvent( 'beforerepaint' );
        },

        /**
         * 重绘完成后的内部行为
         *
         * @protected
         */      
        __afterrepaint: function () {
            this.__fireEvent( 'afterrepaint' );
        },

        /**
         * model加载完成后的内部行为
         *
         * @protected
         */      
        __afterloadmodel: function () {
            this.__fireEvent( 'afterloadmodel' );
        },

        /**
         * model加载前的内部行为
         *
         * @protected
         */      
        __beforeloadmodel: function () {
            var arg = this.arg;
            var queryMap = arg.queryMap;
            var key, value;

            for ( key in queryMap ) {
                value = queryMap[ key ];
                this.model.set( key, value );
            }
            
            this.__fireEvent( 'beforeloadmodel' );
        },

        /**
         * enter完成的内部行为
         *
         * @protected
         */
        __entercomplete: function () {
            this.__fireEvent( 'entercomplete' );
        },

        /**
         * leave的内部行为
         *
         * @protected
         */
        __leave: function () {
            this.__fireEvent( 'leave' );
        },

        /**
         * 自定义事件触发
         *
         * @public
         * @param {string} type 事件名
         * @param {Any} eventArg 事件对象
         */
        fireEvent: function ( type, eventArg ) {
            type = type.replace( /^on/i, '' );
            if ( this.LIFECYCLE_PHASE[ type ] ) {
                throw new Error("ER: Reserve event cannot be fired manually.");
                return;
            }

            this.__fireEvent( type, eventArg );
        },
        
        /**
         * 事件触发的内部方法
         *
         * @private
         * @param {string} type 事件名
         * @param {Any} eventArg 事件对象
         */
        __fireEvent: function ( type, eventArg ) {
            type = type.replace( /^on/i, '' );

            eventHandler = this[ 'on' + type ];
            if ( typeof eventHandler == 'function' ) {
                eventHandler.call( this, eventArg );
            }

            if ( this.LIFECYCLE_PHASE[ type ] ) {
                eventHandler = Action_[ 'on' + type ];
                if ( typeof eventHandler == 'function' ) {
                    eventHandler.call( this, eventArg );
                }
            }
        }
    }; 

    // 实现IAction
    baidu.inherits( Action_, er.AbstractAction );

    /**
     * 扩展Action的功能
     * 
     * @public
     * @param {Object} ext 扩展的功能对象
     * @param {string} opt_name 扩展别名，不提供则扩展默认Action
     */
    Action_.extend = function ( ext, opt_name ) {
        var key, 
            base = Action_.prototype;
        
        if ( opt_name ) {
            base = ActionBaseX_[ opt_name ];
            if ( !base ) {
                base = new Function();
                base.prototype = ext;
                baidu.inherits( base, Action_ );

                ActionBaseX_[ opt_name ] = base;
                return;
            }
            base = base.prototype;
        }
        
        for ( key in ext ) {
            base[ key ] = ext[ key ];
        }
    };
    
    return Action_;
}();
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/extend.js
 * desc:    扩展包容器声明
 * author:  erik
 */


er.extend = {};
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/extend/ui.js
 * desc:    UI扩展
 * author:  erik
 */

///import er.extend;
///import er.context;
///import er.Action;
///import er.View;

er.extend.ui = function () {
    var uiExtend = {};

    // 视图扩展
    er.View.extend( {
        /**
         * 渲染视图
         *
         * @public
         */
        render: function () {
            er.View.prototype.render.call( this );
            var dataControl = {};
            var controlData = {};
            var contextId   = this.model.getGUID();;

            function attrReplacer( attrMap ) {
                var key;
                var attrValue;
                var dataName;
                var controlId = attrMap.id;

                for ( key in attrMap ) {
                    attrValue = attrMap[ key ];
                    if ( typeof attrValue == 'string' && attrValue.indexOf('*') === 0 ) {
                        dataName = attrValue.substr( 1 );

                        // 存储数据的控件引用
                        !dataControl[ dataName ] && ( dataControl[ dataName ] = [] );
                        dataControl[ dataName ].push( controlId + ':' + key );

                        // 存储控件的数据引用
                        !controlData[ controlId ] && ( controlData[ controlId ] = [] );
                        controlData[ controlId ].push( key + ':' + dataName );

                        attrMap[ key ] = er.context.get( dataName, { contextId: contextId } );
                    }
                }
            }
            
            this._dataControl = dataControl;
            this._controlData = controlData;
            this._controlMap = uiExtend.adapter.init(
                baidu.g( this.target ), 
                this.UI_PROP, 
                attrReplacer
            );
            //console.log(
        },
        
        /**
         * 重绘视图
         *
         * @public
         * @param {Object} opt_controlMap 要重绘的控件集合，默认重绘所有控件
         */
        repaint: function ( opt_controlMap ) {
            opt_controlMap = opt_controlMap || this._controlMap;
        
            var key;
            var control;
            var refer;
            var referTmp;
            var referName;
            var referRef;
            var i;
            var len;
            var uiAdapter = uiExtend.adapter;
            var ctrlData  = this._controlData;
           
            for ( key in opt_controlMap ) {
                control = opt_controlMap[ key ];
                refer = ctrlData[ key ];

                if ( control && refer ) {
                    // 重新灌入数据
                    for ( i = 0, len = refer.length; i < len ; i++ ) {
                        referTmp = refer[ i ].split( ':' );
                        uiAdapter.setControlAttribute( 
                            control, 
                            referTmp[ 0 ],
                            this.model.get( referTmp[ 1 ] )
                        );
                    }
                    
                    // 重绘控件
                    uiAdapter.repaint( control );     
                }
            }
        },

        /**
         * 根据Model重绘视图
         *
         * @public
         * @param {string} name model数据的名称
         * @param {Any} value model新数据的值
         */
        repaintByModel: function ( name, value ) {
            var controls  = this._dataControl[ name ];
            var uiAdapter = uiExtend.adapter;
            var temp;
            var i;
            var len;
            var control;

            if ( controls ) {
                for ( i = 0, len = controls.length; i < len; i++ ) {
                    temp = controls[ i ].split( ':' );
                    control = uiAdapter.get( temp[ 0 ] );
                    uiAdapter.setControlAttribute( 
                        control, 
                        temp[ 1 ],
                        value
                    );

                    uiAdapter.repaint( control );
                }
            }
        },

        /**
         * 获取表单控件列表
         * 
         * @public
         * @return {Array}
         */
        getInputList: function () {
            var controlMap = this._controlMap,
                inputList  = [],
                key, control;
                
            // 统计input控件列表
            for ( key in controlMap ) {
                control = controlMap[ key ];
                if ( uiExtend.adapter.isInput( control ) ) {
                    inputList.push( control );
                }
            }
            
            return inputList;
        },
        
        /**
         * 清空视图
         *
         * @public
         */
        clear: function () {
            var controlMap = this._controlMap;

            if ( controlMap ) {
                for ( key in controlMap ) {
                    uiExtend.adapter.dispose( key );
                    delete controlMap[ key ];
                }
            }
            
            this._controlMap = null;
            this._dataControl = null;
            this._controlData = null;
            er.View.prototype.clear.call( this );
        }
    } );

    er.Action.extend( {
        MODEL_SILENCE: true,

        /**
         * 移除model数据变化的监听器
         *
         * @protected
         */
        __removeModelChangeListener: function () {
            if ( this._modelChangeListener && this.model ) {
                this.model.removeChangeListener( this._modelChangeListener );
            }
        },
        
        /**
         * 添加model数据变化的监听器
         *
         * @protected
         */
        __addModelChangeListener: function () {
            if ( this.MODEL_SILENCE ) {
                return;
            }

            if ( !this._modelChangeListener ) {
                this._modelChangeListener = this.__getModelChangeListener();
            }

            this.model.addChangeListener( this._modelChangeListener );
        },
        
        /**
         * 获取model数据变化的监听器
         *
         * @protected
         * @return {Function}
         */
        __getModelChangeListener: function () {
            var me = this;

            return function ( eventArg ) {
                me.view.repaintByModel( eventArg.name, eventArg.newValue );
            };
        },

        /**
         * enter时的内部行为
         *
         * @protected
         */ 
        __enter: function () {
            this.__removeModelChangeListener();
            this.__fireEvent( 'enter' );
        },
        
        /**
         * enter完成的内部行为
         *
         * @protected
         */
        __entercomplete: function () {
            this.__fireEvent( 'entercomplete' );
            this.__addModelChangeListener();
        },

        /**
         * leave的内部行为
         *
         * @protected
         */
        __leave: function () {
            this.__fireEvent( 'leave' );
            this.__removeModelChangeListener();
        }
    } );

    var adapter = {
        /**
         * 初始化一个dom内部的所有控件
         * 
         * @virtual
         * @param {HTMLElement} wrap
         * @param {Object}      propMap
         * @param {Function}    attrReplacer
         * @return {Object} 
         */
        init: function ( wrap, propMap, attrReplacer ) {
            return esui.init( wrap, propMap, attrReplacer );
        },

        /**
         * 根据id获取控件
         * 
         * @virtual
         * @param {string} id
         * @return {Control} 
         */
        get: function ( id ) {
            return esui.get( id );
        },
        
        /**
         * 释放控件
         *     
         * @virtual
         * @param {Object} key
         */
        dispose: function ( key ) { 
            esui.dispose( key );
        },
        
        /**
         * 验证控件
         * 
         * @virtual
         * @param {Object} input
         * @return {boolean}
         */
        validate: function ( input ) {
            if ( input instanceof esui.InputControl ) {
                return input.validate();
            }

            return true;
        },
        
        /**
         * 验证控件并返回错误
         * 
         * @virtual
         * @param {Object} inputCtrl
         * @param {Object} errorMessage
         */
        validateError: function ( inputCtrl, errorMessage ) { },
        
        /**
         * 是否表单控件
         * 
         * @virtual
         * @param {Object} control
         * @return {boolean}
         */
        isInput: function ( control ) { 
            return control instanceof esui.InputControl;
        },
        
        /**
         * 是否Radio或CheckBox
         * 
         * @virtual
         * @param {Object} control
         * @return {boolean}
         */
        isInputBox: function ( control ) { 
            return control instanceof esui.BoxControl;
        },

        /**
         * 控件是否禁用
         * 
         * @virtual
         * @param {Object} control
         * @return {boolean}
         */
        isDisabled: function ( control ) { 
            if ( control ) {
                return control.isDisabled();
            }

            return false;
        },
        
        /**
         * 控件是否只读
         * 
         * @virtual
         * @param {Object} control
         * @return {boolean}
         */
        isReadOnly: function ( control ) { 
            return control.isReadOnly();
        }, 
        
        /**
         * 获取表单控件的表单名
         * 
         * @virtual
         * @param {Object} control
         */
        getInputName: function ( control ) { 
            return control.getName();
        },
        
        /**
         * 设置控件所需属性
         * 
         * @virtual
         * @param {Object} control
         * @param {string} name
         * @param {Any} value
         */
        setControlAttribute: function ( control, name, value ) { 
            control[ name ] = value;
        },
        
        /**
         * 重绘控件
         * 
         * @virtual
         * @param {Object} control
         */
        repaint: function ( control ) { 
            control.render();
        },
        
        /**
         * 设置控件为禁用
         * 
         * @virtual
         * @param {Object} control
         */
        disable: function ( control ) { 
            control.disable();
        },
        
        /**
         * 设置控件为可用
         * 
         * @virtual
         * @param {Object} control
         */
        enable: function ( control ) { 
            control.enable();
        }
    };

    uiExtend.adapter = adapter;
    return uiExtend;
    
}();
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/extend/actionEnhance.js
 * desc:    Action增强包，提供额外的Action操作功能
 * author:  erik
 */

///import er.extend;
///import er.Action;
///import er._util;

er.extend.actionEnhance = (function () {
    /**
     * 状态保持器
     * 
     * @inner
     * @desc
     *      状态保持器能根据path保持相关Context狀態
     */
    var stateHolder_ = (function () {
        var stateMap = {};

        return {
            /**
             * 获取状态
             * 
             * @public
             * @param {string} path 状态名
             * @return {Object}
             */
            'get': function ( path ) {
                return stateMap[ path ] || null;
            },
            
            /**
             * 设置状态
             * 
             * @public
             * @param {string} key 状态名
             * @param {Object} state 状态對象
             */
            'set': function ( path, state ) {
                stateMap[ path ] = state;
            }
        };
    })();
    
    var enhance = {
        /**
         * 从model中获取请求参数字符串
         * 用于参数自动拼接
         * 
         * @protected
         * @param {Object} opt_queryMap 参数表
         * @return {string}
         */
        getQueryStringByModel: function ( opt_queryMap ) {
            var queryMap = opt_queryMap || this.MODEL_QUERY_MAP;
            return this.model.getQueryString( queryMap );
        },
        
        /**
         * 刷新当前action页面
         * 
         * @protected
         * @param {Object} opt_extraMap 额外参数表,(KV)queryName/contextName
         */
        refresh: function ( opt_extraMap ) {
            opt_extraMap = opt_extraMap || {};
            var key, 
                cxtKey,
                path     = this.arg.path,
                stateMap = this.STATE_MAP,
                buffer   = [],
                value;
            
            // 自动组装state    
            for ( key in stateMap ) {
                value = this.model.get( key );
                if ( !er._util.hasValue( value ) ) {
                    value = '';
                }
                buffer.push( key + '=' + encodeURIComponent( value ) );
            }
            
            // 额外参数表的组装  
            for ( key in opt_extraMap ) {
                cxtKey = opt_extraMap[ key ];
                if ( typeof cxtKey == 'string' ) {
                    value = this.model.get( cxtKey );
                    if ( !er._util.hasValue( value ) ) {
                        value = '';
                    }
                    
                    buffer.push( key + '=' + encodeURIComponent( value ) );
                }
            }
            
            er.locator.redirect( this.arg.path + '~' + buffer.join('&'), { enforce: true } );
        },

        /**
         * 重置状态值
         * 
         * @protected
         * @param {string} opt_name 需要重置的状态名，不提供时重置所有状态
         */
        resetState: function ( opt_name ) {
            var stateMap = this.STATE_MAP || {};
            var defValue;
            
            if ( !opt_name ) {
                for ( opt_name in stateMap ) {
                    this.model.set( opt_name, stateMap[ opt_name ] );
                }
            } else {
                defValue = stateMap[ opt_name ];

                if ( er._util.hasValue( defValue ) ) {
                    this.model.set( opt_name, defValue );
                }
            }
        },
        
        /**
         * 返回上一个location
         * 
         * @protected
         */
        back: function () {
            var arg = this.arg,
                referer = arg && arg.referer;
                
            if ( arg.type != 'main' ) {
                return;
            }
            
            // 沿路返回或返回配置的location
            if ( !referer || this.USE_BACK_LOCATION ) {
                referer = this.BACK_LOCATION;
            }
            er.locator.redirect( referer );
        },
        
        /**
         * model加载前的内部行为，实现状态保持
         *
         * @protected
         * @override
         */  
        __beforeloadmodel: function () {
            var arg         = this.arg;
            var path        = arg.path;
            var queryMap    = arg.queryMap;
            var stateMap    = this.STATE_MAP || {};
            var stateSaved  = stateHolder_.get( path ) || {};
            var ignoreState = this.IGNORE_STATE || (queryMap && queryMap.ignoreState);

            var key, value;
            var state = {};
            
            // 状态恢复与保存
            if ( !ignoreState ) {
                for ( key in stateMap ) {
                    value = queryMap[ key ];
                    if ( !er._util.hasValue( value ) ) {
                        value = stateSaved[ key ];

                        if ( !er._util.hasValue( value ) ) {
                            value = stateMap[ key ];
                        }
                    }

                    state[ key ] = value;
                    this.model.set( key, value );
                }

                stateHolder_.set( path, state );
            }

            this.__fireEvent( 'beforeloadmodel' );
        }
    };

    er.Action.extend( enhance );
    return enhance;
})();
/*
 * ER (Enterprise RIA)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    er/extend/actionLikeForm.js
 * desc:    Form功能的action扩展
 * author:  erik
 */

///import er.Action;
///import er.extend.ui;
///import er.extend.action_enhance;

er.extend.actionLikeForm = function () {
    var uiExtend = er.extend.ui;
    
    var actionExt = {
        /**
         * 验证表单控件的值是否合法
         * 
         * @param {Object} opt_inputList 表单控件数组
         * @return {boolean}
         */
        validateForm: function ( opt_inputList ) {
            var isValid     = true,
                inputList   = opt_inputList || this.view.getInputList(),
                i, len, input;
                
            for ( i = 0, len = inputList.length; i < len; i++ ) {
                input = inputList[ i ];

                if ( uiExtend.adapter.isDisabled( input ) ) {
                    continue;
                }
                
                if ( !uiExtend.adapter.validate( input ) ) {
                    isValid = false;
                }
            }
            
            return isValid;
        },

        /**
         * 获取返回的处理函数
         * 
         * @protected
         * return {Function}
         */
        getFormCanceler: function () {
            var me = this;
            
            return function () {
                me.back();
            };
        },

        /**
         * 获取完成提交数据的函数
         * 
         * @protected
         * return {Function}
         */
        getSubmitFinisher: function () {
            var me = this;
                
            return function ( data ) {
                var inputList   = me.view.getInputList(),
                    len         = inputList.length,
                    i, input,
                    errorMap,
                    errorMessage;
                    
                // 当后端验证失败时
                // 处理后端验证结果
                if ( data.status != 0 ) {
                    errorMap = data.statusInfo.field;
                    
                    for ( i = 0; i < len; i++ ) {
                        input = inputList[ i ];
                        errorMessage = errorMap[ uiExtend.adapter.getInputName( input ) ];
                        if ( errorMessage ) {
                            uiExtend.adapter.validateError( input, errorMessage );
                        }
                    }

                    return;
                }
                
                // onsubmitfinished事件触发
                if ( !me.onsubmitfinished || me.onsubmitfinished( data ) !== false ) {
                    me.back();
                }
            };
        },

        /**
         * 获取表单的请求参数字符串
         * 用于参数自动拼接
         * 
         * @protected
         * @param {Object} opt_inputList 控件数组
         * @param {Object} opt_queryMap 参数表
         * @return {string}
         */
        getQueryStringByForm: function ( opt_inputList, opt_queryMap ) {
            var queryMap    = opt_queryMap || this.INPUT_QUERY_MAP || {},
                inputList   = opt_inputList || this.view.getInputList(),
                finished    = {},
                uiAdapter   = uiExtend.adapter,
                i, len, 
                input,
                inputName, 
                value,
                queryString,
                queryBuf = [];
            
            for ( i = 0, len = inputList.length; i < len; i++ ) {
                input = inputList[i];
                

                if ( uiAdapter.isInput( input ) 
                     && !uiAdapter.isDisabled( input )
                ) {
                    inputName = uiAdapter.getInputName( input );

                    if ( inputName ) {
                        // 已拼接的参数不重复拼接
                        if ( finished[ inputName ] ) {
                            continue;
                        }
                        
                        // 记录拼接状态
                        finished[ inputName ] = 1;
                        
                        // 读取参数名映射
                        inputName = queryMap[ inputName ] || inputName;
                        
                        // 获取input值
                        if ( uiAdapter.isInputBox( input ) ) {
                            value = input.getGroup().getValue().join(',');
                        } else {
                            value = input.getValue();
                        }
                        
                        // 拼接参数
                        queryBuf.push( inputName + '=' + encodeURIComponent( value ) );
                    } else if ( 'function' == typeof input.getQueryString ) {
                        // 拼接参数
                        queryString = input.getQueryString();
                        if ( 'string' == typeof queryString ) {
                            queryBuf.push( queryString );
                        }
                    }
                }
            }
            
            return queryBuf.join('&');
        }
    };

    er.Action.extend( actionExt );
    return actionExt;
}();

