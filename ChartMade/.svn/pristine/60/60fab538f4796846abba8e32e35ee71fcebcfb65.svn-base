var base = {
    chart: {
        renderTo: 'container', //指定生成图表的html元素
        type:'line', //缺省选项，当series中定义type会将此选项覆盖
        width:1000,//定义宽和高
        height:500
    },
    credits: {
        enabled: false //禁止credited
    },
    title: {
        text: null,//设置标题文字
        //config
        x: -20 //center
    },
    loading: {
        hideDuration:100,//淡入时间
        labelStyle: {//文字样式
            fontWeight: 'bold',
            position: 'relative',
            top: '1em'
        },
        showDuration:100,//淡出时间
        style: {//遮罩层样式
            position: 'absolute',
            backgroundColor: 'white',
            opacity: 0.5,
            textAlign: 'center'
        }
    },
    subtitle: {
        text: null,
        //config
        x: -20 //center
    },
    tooltip: {
        formatter: null//通过传入function生成提示的格式
    },
    legend: {//图例显示的相关选项,待修改部分
        enabled: true,
        floating: false,//是否浮动
        layout: 'vertical',//vertical(纵向),horizontal(横向)
        align: 'right',//left,center,right横向对齐方式
        verticalAlign: 'top',//top,middle,bottom纵向对齐方式
        x: -10,//当前位置的相对坐标
        y: 100,
        borderWidth: 1//图例面板的边框宽
    },
    plotOptions: {},//各个类型的图表项的格式
    xAxis: [],
    yAxis: [],
    series: []
};
