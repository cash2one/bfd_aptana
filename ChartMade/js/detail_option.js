var xAxis0 = {
    lineWidth: 1,
    gridLineWidth: 1
}
var xAxis1 = {
    lineWidth: 1,
    gridLineWidth: 1,//X轴按刻度生成网线
    tickWidth: 1,
    startOnTick: true,
    opposite: true //在X轴Y轴对面显示轴
}
var yAxis0 = {
    lineWidth: 1,
    gridLineWidth: 1,//Y轴按刻度生成网线
    title: {
        text: 'Temperature (°C)'
    }
}
var yAxis1 = {
    lineWidth: 1,
    gridLineWidth: 0,
    title: {
        text: 'Sea-Level Pressure'
    }
}
var yAxis2 = {
    lineWidth: 1,
    gridLineWidth: 0,
    title: {
        text: 'Pressure'
    },
    opposite: true,
    tickLength: 10,//刻度间隔（单位px）
    tickWidth: 2,
    min: 8,//该轴的最大值和最小值
    max: 22
}
/*axis:{
    line 轴
    gridLine 网格
    minorGridLine 小网格
    tick 小刻度
    minorTick 小刻度
    http://www.highcharts.com/ref/#xAxis
    调用page:/reportservices/line.html
}*/