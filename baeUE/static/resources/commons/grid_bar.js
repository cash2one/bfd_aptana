/**
 * @author Administrator
 */
function GridChart(type,rander){
    var self = this
    self.setData = function(data){
        self.chart.series[0].setData(data)
    }
    self.init = function(){
        self.chart = new Highcharts.Chart({
            chart: {
                renderTo:rander,
                type: 'pie'
            },
            title: {
                text: null
            },
            xAxis: {
                categories: [],
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                title: null
            },
            tooltip: {
                formatter: function(){
                    return this.point.name + ': ' + this.y
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                },
                pie: {
                    size: '50%',
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        formatter: function(){
                            return this.point.name + ':' + this.y;
                        }
                    }
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            series: [{
//                data: [{
//                    y: 20,
//                    color: '#f20',
//                    name: 'test'
////                }, 31, 635, 203, 2]
                   data:[]
            }]
        });
    }
    self.init()
}
