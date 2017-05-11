/**
 *
 * 常量定义文件，建议每种不同的常量定义不同的factory function!
 */

var Const = {
    geoMapGuangdong: function () {
        return {
            '东莞市': [113.8953, 22.901],
            '中山市': [113.4229, 22.478],
            '佛山市': [112.9555, 23.0097],
            '广州市': [113.5107, 23.2196],
            '惠州市': [114.6204, 23.1647],
            '汕头市': [116.6892, 23.3405],
            '江门市': [112.6318, 22.1484],
            '深圳市': [113.9935, 22.5439],
            '清远市': [112.9175, 24.3292],
            '珠海市': [113.4205, 22.1155],
            '肇庆市': [112.1265, 23.5822],
            '韶关市': [113.7964, 24.7028],
            '湛江市': [110.359377, 21.270708],
            '云浮市': [112.02, 22.93],
            '梅州市': [116.1, 24.05],
            '汕尾市': [115.375279, 22.986211],
            '阳江市': [111.95, 21.85],
            '茂名市': [110.88, 21.68],
            '潮州市': [116.63, 23.68],
            '揭阳市': [116.05, 23.25],
            '河源市': [114.98, 23.73]
        };
    },
    echartsOption: function () {
        return {
            getPieOption: function () {
                var option = {
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        textStyle: {
                            color: '#666666',
                            fontSize: 12
                        },
                        formatter: "{b}: {d}%"
                    },
                    legend: {
                        orient: 'vertical',
                        top: 'center',
                        itemWidth: 4,
                        itemHeight: 4,
                        align: 'left',
                        left: '60%',
                        padding: [0, 0, 5, 0],
                        textStyle: {
                            color: '#ffffff',
                            fontSize: 10
                        },
                        data: ['游戏', '视频', '网页流量', '下载', 'P2P']
                    },
                    series: [{
                            name: '年龄',
                            type: 'pie',
                            radius: ['40%', '55%'],
                            center: ['25%', '50%'],
                            animation: false,
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{value: 335, name: '游戏'},
                                {value: 310, name: '视频'},
                                {value: 234, name: '网页流量'},
                                {value: 135, name: '下载'},
                                {value: 1548, name: 'P2P'}
                            ]
                        }],
                    color: ['#58c4ef', '#2c74c2', '#0b5ca7', '#072b71', '#03134b', '#ffbb28']
                };
                return option;
            },
            getBigPieOption: function () {
                var option = {
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        textStyle: {
                            color: '#666666',
                            fontSize: 12
                        },
                        formatter: "{b}: {d}%"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        top: 'bottom',
                        itemWidth: 5,
                        itemHeight: 4,
                        left: '60%',
                                align: 'left',
                        padding: [0, 0, 10, 0],
                        textStyle: {
                            color: '#ffffff',
                            fontSize: 10
                        },
                        data: ['游戏', '视频', '网页流量', '下载', 'P2P']
                    },
                    series: [{
                            name: '业务',
                            type: 'pie',
                            radius: ['60%', '75%'],
                            center: ['30%', '50%'],
                            animation: false,
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{value: 335, name: '游戏'},
                                {value: 310, name: '视频'},
                                {value: 234, name: '网页流量'},
                                {value: 135, name: '下载'},
                                {value: 1548, name: 'P2P'}
                            ]
                        }],
                    color: ['#58c4ef', '#2c74c2', '#0b5ca7', '#072b71', '#03134b', '#ffbb28']
                };
                return option;
            },
            getLineOption: function () {
                var option = {
                    backgroundColor: '#ffffff',
                    tooltip: {
                        fontSize: 8,
                        trigger: 'axis'
                    },
//                    tooltip: {
//                        trigger: 'axis',
//                        backgroundColor: 'rgba(255,255,255,0.9)',
//                        textStyle: {
//                            color: '#666666',
//                            fontSize: 12
//                        },
//                        formatter: '{b0} <br/>{a0}: {c0}<br />{a1}: {c1}'
//                    },
                    color: ['#00cccc', '#ff9933','#BA55D3'],
                    dataZoom: [
                        
                    ],
                    legend: {
                        y: 'bottom',
                        itemWidth: 10,
                        itemHeight: 10,
                        align: 'left',
                        textStyle: {
                            color: '#666666',
                            fontSize: 12
                        },
                        data: [{
                                name: '每日挖掘',
                                icon: 'rect'
                            }, {
                                name: '每日转换',
                                icon: 'rect'
                            },{
                                name: '每日',
                                icon: 'rect'
                            }]
                    },
                    title: {
                        text: '',
                        x: 'center',
                        padding: 15,
                        textStyle: {
                            fontSize: 14,
                            fontWeight: 'bolder',
                            color: '#333333'
                        }
                    },

                    grid: {
                        x: 57,
                        x2: 17,
                        y: 49,
                        y2: 50,
                        borderWidth: 0
                    },
                    xAxis: [{
                            type: 'category',
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#999999'
                                }
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            },
                            splitArea: {
                                show: false,
                                areaStyle: {
                                    color: '#666',
                                    fontSize: 12
                                }
                            },
                            data: []
                        }],
                    yAxis: [{
                            type: 'value',
                            axisTick: {
                                show: false
                            },
                            minInterval: 1,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            },
                            nameTextStyle: {
                                fontFamily: '微软雅黑'
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#999999',
                                    fontSize: 12
                                },
                                formatter: function (value) {
                                    return parseFloat(value);
                                }
                            }
                        }],
                    series: [
                        {
                            name: '3的指数',
                            type: 'line',
                            data: []
                        },
                        {
                            name: '2的指数',
                            type: 'line',
                            data: []
                        },
                        {
                            name: '1的指数',
                            type: 'line',
                            data: []
                        }
                        
                    ]
                };
                return option;
            },
            getLineAndBar: function () {
                var option = {
                    tooltip: {
                        fontSize: 8,
                        trigger: 'axis'
                    },
                    color: ['#2c73c2', '#4bca81'], //左边数值为柱子Bar的颜色，右边的为曲线Line的颜色
                    grid: {
                        x: 80,
                        x2: 80,
                        y: 30,
                        y2: 25,
                        borderWidth: 0
                    },
                    xAxis: [{
                            type: 'category',
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    fontSize: 10,
                                    color: '#ffffff'
                                }
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
//                                    color: '#748089'  //坐标轴线的颜色
                                }
                            },
                            data: []
                        }],
                    yAxis: [{
                            type: 'value',
                            name: '流量（Gbps）',
                            nameTextStyle: {
                                color: '#ffffff',
                                fontSize: 10
                            },
                            min: 0,
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    fontSize: 10,
                                    color: '#ffffff'
                                }
                            }
                        }, {
                            type: 'value',
                            name: '质量（分）',
                            nameTextStyle: {
                                color: '#ffffff',
                                fontSize: 10
                            },
                            min: 0,
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#ffffff'
                                }
                            }
                        }],
                    series: [{
                            name: '流量',
                            type: 'bar',
                            barWidth: '3',
                            itemStyle: {
                                normal: {
//                                    color: '#2c73c1',//统一放到外面写
                                    barBorderRadius: [5, 5, 0, 0]

                                }
                            },
                            data: []
                        }, {
                            name: '质量',
                            type: 'line',
                            yAxisIndex: 1,
                            itemStyle: {
                                normal: {
//                                    color: '#2c73c1',//统一放到外面写
                                    barBorderRadius: [5, 5, 0, 0]

                                }
                            },
                            data: []
                        },{
                            name: '其他',
                            type: 'line',
                            yAxisIndex: 1,
                            itemStyle: {
                                normal: {
//                                    color: '#2c73c1',//统一放到外面写
                                    barBorderRadius: [5, 5, 0, 0]

                                }
                            },
                            data: []
                        }]
                };
                return option;
            },
            barOption: function () {
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {// 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        textStyle: {
                            color: '#666666',
                            fontSize: 12
                        },
                        formatter: '{b0} : {c0}'
                    },
                    color: ['#2c73c2', '#4bca81'], //堆积图柱子Bar的颜色？
                    grid: {
                        x: 80,
                        x2: 50,
                        y: 10,
                        y2: 10,
                        borderWidth: 0
                    },
                    xAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            }
                        }],
                    yAxis: [{
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#ffffff'
                                }
                            }
                        }, {
                            type: 'category',
                            data: [122, 133, 334, 198, 123, 125, 220],
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#ffffff'
                                }
                            }
                        }],
                    series: [{
                            type: 'bar',
                            itemStyle: {
                                normal: {
//                                    color: '#ffffff',//统一放到外面写
                                    barBorderRadius: [5, 5, 5, 5]
                                }
                            },
                            barGap: "-100%",
                            barWidth: "5",
                            barCategoryGap: "40%",
                            data: [100000, 100000, 100000, 100000, 100000, 100000, 100000]
                        }, {
                            type: "bar",
                            barBorderRadius: [5, 5, 5, 5],
                            barWidth: "5",
                            yAxisIndex: 1,
                            itemStyle: {
                                normal: {
//                                    color: "#2c74c2",//统一放到外面写
                                    barBorderRadius: [5, 5, 5, 5]
                                }
                            },
                            label: {
                                normal: {
                                    show: false,
                                    color: '#ffffff'
                                }
                            },
                            data: [122, 133, 334, 198, 123, 125, 220]
                        }]
                };
                return option;
            },
            multiBarOption: function () {
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {// 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    color: ['#2c74c2', '#8843a5', '#40c36e', '#eb4680', '#4ab7e9', '#ffbb28'],
                    legend: {
                        y: 'top',
                        itemWidth: 6,
                        itemHeight: 6,
                        align: 'left',
                        padding: [0, 0, 5, 0],
                        textStyle: {
                            color: '#ffffff',
                            fontSize: 10
                        },
                        data: []
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        top: '6%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        show: false
                    },
                    yAxis: [{
                            type: 'category',
                            zlevel: 99,
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: 10
                                }
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    width: 1,
                                    color: '#ffffff'
                                }
                            },
                            data: []
                        }, {
                            type: 'category',
                            zlevel: 99,
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: 10
                                }
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    width: 1,
                                    color: '#ffffff'
                                }
                            },
                            data: []
                        }],
                    series: [
                        {
                            name: 'IDC',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 6,
                            data: []
                        },
                        {
                            name: 'Cache',
                            type: 'bar',
                            stack: '总量',
                            data: []
                        },
                        {
                            name: '省外',
                            type: 'bar',
                            stack: '总量',
                            data: []
                        },
                        {
                            name: '直连',
                            type: 'bar',
                            stack: '总量',
                            data: []
                        },
                        {
                            name: '网外',
                            type: 'bar',
                            stack: '总量',
                            data: []
                        },
                        {
                            name: '其他',
                            type: 'bar',
                            stack: '总量',
                            data: []
                        },
                        {
                            name: '备用',
                            type: 'bar',
                            yAxisIndex: 1,
                            stack: '总量',
                            data: []
                        }
                    ]
                };
                return option;
            },
            getGaugeOpion: function () {
                var option = {
                    tooltip: {
                        formatter: "应答成功率 <br/>{b} : {c}%"
                    },
//                    seriescenter: ["100%", "50%"], //第一个参数左右偏移，第二个参数上下偏移
//                    seriesstartangle: 140, //饼图开始角度,模线是0度，左转正向，右转反向
//                    seriesendangle: -140, //饼图结束角度,模线是0度，左转正向，右转反向

                    series: [
                        {
                            //name: '业务指标',
                            type: 'gauge',
                            radius: '100%',
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 4,
                                    color: [[0.2, '#ffffff'], [0.8, '#05c1f1'], [1, '#2c74c2']]
                                }
                            },
                            title: {
                                textStyle: {// 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    fontWeight: 'bolder',
                                    fontSize: 11,
                                    color: '#ffffff'
                                }
                            },
                            pointer: {
                                //color:'#2c74c2',
                                length: '50%',
                                width: 3
                            },
                            detail: {
                                textStyle: {
                                    //color:'#2c74c2',
                                    fontSize: 10
                                },
                                formatter: '{value}%'
                            },
                            data: []
                        }
                    ]
                };
                return option;
            },
            getMapOption: function () {
                //var splitList = getMapSplitList(data);
                var option = {
//                    tooltip: {
//                        trigger: 'axis',
//                        axisPointer: {// 坐标轴指示器，坐标轴触发有效
//                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
//                        },
//                        backgroundColor: 'rgba(255,255,255,0.9)',
//                        textStyle: {
//                            color: '#666666',
//                            fontSize: 12
//                        },
//                        formatter: '{b0} : {c0}'
//                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} : {c}'
                    },
                    dataRange: {
//                        itemWidth:15,
//                        min: 0,
//                        max: 6000,
//                        left: 'left',
//                        top: 'bottom',
                        text: ['好', '差'], // 文本，默认为数值文本
//                        calculable: true,
//                        inRange: {
//                            color: ['#936509', '#284A94', '#36C1A2']
//                        },
                        textStyle: {
                            color: '#ffffff'
                        },
                        x: 'right',
                        y: '250',
                        orient: 'horizontal',
                        splitList: [
                            {start: 70, end: 100, lable: '好', color: '#36C1A2'},
                            {start: 50, end: 70, lable: '中', color: '#284A94'},
                            {start: 0, end: 50, lable: '差', color: '#936509'}
                        ]
                    },
                    series: [
                        {
                            left: '17%',
                            right: '17%',
////                            top:'10%',
////                            buttom:'100%',
//                            layoutSize: 200,
                            type: 'map',
                            mapType: '广东',
                            label: {
                                emphasis: {
                                    show: false
//                                    textStyle: {
//                                        color: '#ffffff'
//                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderColor: '#389BB7',
                                    areaColor: '#050d3b'
                                },
                                emphasis: {
                                    areaColor: '#ffffff',
                                    borderWidth: 0
                                }
                            },
                            animation: false,
                            data: []
                                    //data:[{name:'广州市',value:'10'}]
                                    // animationDurationUpdate: 1000,
                                    // animationEasingUpdate: 'quinticInOut'
                        }, {
                            name: "地图",
                            type: "effectScatter",
                            coordinateSystem: "geo",
                            data: []
                        }
                    ]
                };
                return option;
            },
            getBarRateOption: function () {
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {// 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        textStyle: {
                            color: '#666666',
                            fontSize: 12
                        },
                        formatter: '{b0} : {c0}'
                    },
                    color: ['#2c73c2', '#ffffff'], //左边百分比部分为“绿色”，右边没数据部分为“白色”
                    grid: {
                        x: 80,
                        x2: 50,
                        y: 10,
                        y2: 10,
                        borderWidth: 0
                    },
                    xAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            }
                        }],
                    yAxis: [{
                            type: 'category',
                            data: [],
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#ffffff'
                                }
                            }
                        }, {
                            type: 'category',
                            data: [],
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#ffffff'
                                }
                            }
                        }],
                    series: [{
                            type: "bar",
                            barBorderRadius: [5, 5, 5, 5],
                            barWidth: "5",
                            yAxisIndex: 0,
                            zlevel: 99,
                            itemStyle: {
                                normal: {
//                                    color: "#2c74c2", //统一放到外面写
                                    barBorderRadius: [5, 5, 5, 5]
                                }
                            },
                            label: {
                                normal: {
                                    show: false,
                                    color: '#ffffff'
                                }
                            },
                            data: []
                        }, {
                            type: 'bar',
                            yAxisIndex: 1,
                            itemStyle: {
                                normal: {
//                                    color: '#ffffff',//统一放到外面写
                                    barBorderRadius: [5, 5, 5, 5]
                                }
                            },
                            barGap: "-100%",
                            barWidth: "5",
                            barCategoryGap: "40%",
                            data: []
                        }]
                };
                return option;
            },
            getEffectScatterOption: function () {
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            if (params.seriesIndex === 0) {
                                return params.name + ":" + params.value;
                            } else {
                                return false;
                            }

                        }
                    },
                    geo: {
                        map: "广东",
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: "#323c48",
                                borderColor: "#404a59"
                            },
                            emphasis: {
                                areaColor: "#2a333d"
                            }
                        }
                    },
                    dataRange: {
//                        itemWidth:15,
//                        min: 0,
//                        max: 6000,
//                        left: 'left',
//                        top: 'bottom',
                        text: ['好', '差'], // 文本，默认为数值文本
                        textStyle: {
                            color: '#ffffff'
                        },
                        x: 'right',
                        y: 'bottom',
                        orient: 'horizontal',
                        splitList: [
                            {start: 70, end: 100, lable: '好', color: '#36C1A2'},
                            {start: 50, end: 70, lable: '中', color: '#284A94'},
                            {start: 0, end: 50, lable: '差', color: '#936509'},
                        ]
                    },
                    series: [
                        {
                            type: 'map',
                            mapType: '广东',
                            label: {
                                emphasis: {
                                    show: false,
//                                    textStyle: {
//                                        color: '#ffffff'
//                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderColor: '#389BB7',
                                    areaColor: '#050d3b',
                                },
                                emphasis: {
                                    areaColor: '#ffffff',
                                    borderWidth: 0
                                }
                            },
                            animation: false,
                            data: []
                        }, {
                            name: "地图",
                            type: "effectScatter",
                            coordinateSystem: "geo",
                            data: []
                        }
                    ]
                };
                return option;
            },
        };
    },
    commonData: function () {
        return {
            systemTitle: "链路流量核对",
            unit: {
                b2Gb: 1073741824,
                b2Mb: 1048576,
                b2Kb: 1024,
                rate: 100
            },
            focusNet: {
                idc: "IDC",
                cache: "Cache",
                cdn: "CDN",
                provinceOther: "广东移动其他",
                provinceOuter: "中国移动",
                directLink: "移动各省直连",
                netOuter: "其他"
            },
            fousIcp: [
                {icp_id: "1", icp_name: "微信"},
                {icp_id: "2", icp_name: "百度"},
                {icp_id: "3", icp_name: "支付宝"},
                {icp_id: "4", icp_name: "阿里巴巴"}
            ],
            interface: {
                total: {
                    id: -10,
                    name: '全省'
                },
                room: {
                    id: 22,
                    name: "省网",
                    uisref: "index.flowCheck.room"
                },
                dsf: {
                    id: 23,
                    name: "三方",
                    uisref: "index.flowCheck.dsf"
                },
                idc: {
                    id: 21,
                    name: "IDC",
                    uisref: "index.flowCheck.idc"
                },
                cache: {
                    id: 50,
                    name: "Cache",
                    uisref: "index.flowCheck.cache"
                },
                service: {
                    id: -10,
                    name: "总览",
                    uisref: "index.flowCheck.service"
                }
            },
            orderParam: {                
                web: {key: "resp_success_rate", name: "应答成功率(%)"},
                video: {key: "down_speed", name: "下行流速率(Kbps)"},
                game: {key: "server_delay", name: "服务端时延(ms)"}
            },
            focusNetType: 4,
            barNameShowNum: 5,
            dsfLinkgrpType: 9,
            singeLinkgrpType: 4
        };
    }
};
cossApp
        .factory('geoMapGuangdong', Const.geoMapGuangdong)
        .factory('echartsOption', Const.echartsOption)
        .factory('commonData', Const.commonData)
        ;
