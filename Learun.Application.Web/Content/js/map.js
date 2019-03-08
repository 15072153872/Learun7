 var myChart = echarts.init(document.getElementById('main'));

function mapTooltipClick(name) {
    alert(name)
}

function tooltipCharts() {
    console.log(arguments[0]);
    var myChart = echarts.init(document.getElementById('tooltipBarId'));
    var option = {
        tooltip: {},
        dataset: {
            source: [
                ['xAxis', '201701', '201702', '201703', '201704', '201705', '201706', '201707', '201708', '201709', '20170', '201710', '20170', '201801'],
                ['amount', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 65.1, 53.3, 41.1, 30.4, 53.3, 41.1, 53.3, 83.8]
            ]
        },
        xAxis: {
            type: 'category',
            interval: true,
            axisLabel: {
                rotate: 45
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {},
        color: ['#4FA8F9', '#F5A623'],
        grid: {
            show: true,
            backgroundColor: '#FAFAFA',
            left: 30,
            right: 20,
            top: 20
        },
        series: [{
            type: 'bar',
            smooth: true,
            seriesLayoutBy: 'row',
            barWidth: 10
        }]
    };
    myChart.setOption(option);
}
option = {
    visualMap: {
        min: 0,
        max: 1000,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        calculable: false,
        orient: 'horizontal',
        inRange: {
            color: ['#e0ffff', '#006edd'],
            symbolSize: [30, 100]
        }
    },
    tooltip: {
        padding: 0,
        enterable: true,
        transitionDuration: 1,
        textStyle: {
            color: '#000',
            decoration: 'none',
        },
        // position: function (point, params, dom, rect, size) {
        //   return [point[0], point[1]];
        // },
        formatter: function(params) {
            // console.log(params)
            var tipHtml = '';
             tipHtml = '<div style="height:360px;width:400px;border-radius:5px;background:#fff;box-shadow:0 0 10px 5px #aaa">' +
                '    <div style="height:50px;width:100%;border-radius:5px;background:#F8F9F9;border-bottom:1px solid #F0F0F0">' +
                '        <span style="line-height:50px;margin-left:18px">' + params.name + '</span>' +
                '        <span style="float:right;line-height:50px;margin-right:18px;color:#5396E3;cursor:pointer" onclick="mapTooltipClick(this);">点击查看详情</span>' +
                '    </div>' +
                '    <div style="height:110px;width:100%;background:#fff">' +
                '        <div style="padding-left:18px;padding-top:22px">' +
                '            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span> ' +
                '            <span>上传表格数量</span>' +
                '            <span style="float:right;margin-right:18px">' + params.data.tipData[0] + '万</span>' +
                '        </div>' +
                '        <div style="padding-left:18px;padding-top:14px">' +
                '            <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span> ' +
                '            <span>上传数据条数</span>' +
                '            <span style="float:right;margin-right:18px">' + params.data.tipData[1] + '条</span>' +
                '        </div>' +
                '    </div>' +
                '    <div id="tooltipBarId" style="height:200px;width:100%;border-radius:0 0 5px 0;background:#fff"></div>' +
                '</div>';
            setTimeout(function() {
                tooltipCharts(params.name);
            }, 10);
            return tipHtml;
        }
    },
    series: [{
        name: 'iphone4',
        type: 'map',
        mapType: 'china',
        itemStyle: {
            normal: {
                label: {
                    show: true
                }
            },
            emphasis: {
                label: {
                    show: true
                }
            }
        },
        data: [{
                name: '北京',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '天津',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '上海',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '重庆',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '河北',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '河南',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '云南',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '辽宁',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '黑龙江',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '湖南',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '安徽',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '山东',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '新疆',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '江苏',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '浙江',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '江西',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '湖北',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '广西',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '甘肃',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '山西',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '内蒙古',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '陕西',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '吉林',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '福建',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '贵州',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '广东',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '青海',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '西藏',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '四川',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '宁夏',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '海南',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '台湾',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '香港',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '澳门',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
        ]
    }, ]
}
//var count = 0;
//var timeTicket = null;
//var dataLength = option.series[0].data.length;
//timeTicket && clearInterval(timeTicket);
//timeTicket = setInterval(function() {
//  myChart.dispatchAction({
//      type: 'downplay',
//      seriesIndex: 0,
//  });
//  myChart.dispatchAction({
//      type: 'highlight',
//      seriesIndex: 0,
//      dataIndex: (count) % dataLength
//  });
//  myChart.dispatchAction({
//      type: 'showTip',
//      seriesIndex: 0,
//      dataIndex: (count) % dataLength
//  });
//  count++;
//}, 1000);
//
//myChart.on('mouseover', function(params) {
//  console.log(params)
//  clearInterval(timeTicket);
//  myChart.dispatchAction({
//      type: 'downplay',
//      seriesIndex: 0
//  });
//  myChart.dispatchAction({
//      type: 'highlight',
//      seriesIndex: 0,
//      dataIndex: params.dataIndex
//  });
//  myChart.dispatchAction({
//      type: 'showTip',
//      seriesIndex: 0,
//      dataIndex: params.dataIndex,
//  });
//});
//myChart.on('mouseout', function(params) {
//  timeTicket && clearInterval(timeTicket);
//  timeTicket = setInterval(function() {
//      myChart.dispatchAction({
//          type: 'downplay',
//          seriesIndex: 0,
//      });
//      myChart.dispatchAction({
//          type: 'highlight',
//          seriesIndex: 0,
//          dataIndex: (count) % dataLength
//      });
//      myChart.dispatchAction({
//          type: 'showTip',
//          seriesIndex: 0,
//          dataIndex: (count) % dataLength
//      });
//      count++;
//  }, 1000);
//});



        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);