/**
 * 共享数据监控模块js
 * @author 陈泽通 <czt@haohandata.com.cn>
 * @copyright 北京浩瀚深度信息技术股份有限公司
 * @createDate 2016/03/09
 */

        



coss.kafkaMonitor = {
    controller: function (scope,service,echartsOption) {

        //基础数据，下拉框
        scope.data = coss.kafkaMonitor.data(scope);
        //图形
        scope.shareStatistics = coss.kafkaMonitor.shareStatistics(scope,service,echartsOption);
        //全局变量
        scope.params = {
            type: '1',
            city:'gz',
            begintime:'2017-03-10 08:00:00',
            endtime:'2017-03-10 11:00:00',
            flag:'1'

        };
        
        /*---------- begin 时间控件配置 -----------*/
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var startday = new Date("2017-03-10 08:00:00");
        //$scope.logTime = new Date(startday).format("yyyyMMdd");
        startday.getbeforeday(-6, "yyyy-MM-dd hh:mm:ss");
//        $scope.endTime = new Date(yesterday).format("yyyy-MM-dd");
//        var startday = new Date();
//        startday.setDate(yesterday.getDate() - 7);
        scope.params.begintime = new Date(startday).format("yyyy-MM-dd hh:mm:ss");

        laydate.skin('yalan');
        scope.beginTimeClick = function () {
            laydate({
                elem: '#beginTime', //指定input框的id；如果不设置，火狐不兼容。
                istime: true, //是否需要小时、分钟、秒的选择
                format: 'YYYY-MM-DD hh:mm:ss', //时间格式
                max: new Date(yesterday).format("yyyy-MM-dd hh:mm:ss"), //最大时间
                choose: function (datas) { //选择日期完毕的回调
                    scope.params.begintime = datas;
                    var beginTime = new Date(datas);
                    //$scope.logTime = new Date(startTime).format("yyyyMMdd");
                    //beginTime.setDate(beginTime.getDate() - 7);
                    scope.params.begintime = new Date(beginTime).format("yyyy-MM-dd hh:mm:ss");
                    scope.$broadcast('beginTimeChange', scope.params.beigntime);
                }
            });
        };
        scope.endTimeClick = function () {
            laydate({
                elem: '#endTime', //指定input框的id；如果不设置，火狐不兼容。
                istime: true, //是否需要小时、分钟、秒的选择
                format: 'YYYY-MM-DD hh:mm:ss', //时间格式
                min:scope.params.begintime,
                max: new Date(yesterday).format("yyyy-MM-dd hh:mm:ss"), //最大时间
                choose: function (datas) { //选择日期完毕的回调
                    scope.params.endtime = datas;
                    var endTime = new Date(datas);
                    //$scope.logTime = new Date(startTime).format("yyyyMMdd");
                    //endTime.setDate(startTime.getDate() - 7);
                    scope.params.endtime = new Date(endTime).format("yyyy-MM-dd hh:mm:ss");
                    scope.$broadcast('endTimeChange', scope.params.endtime);
                }
            });
        };
        /*---------- end 时间控件配置 -----------*/
        
        //tip选择
        scope.FlagClick = function (data) {
            scope.params.flag = data;
        }



        //首次进入页面时传播时间改变时间，是为了加载各个图的数据
        scope.$broadcast('queryUpdate', '');
        
        //开始时间改变时进行数据更新
        scope.$on('endTimeChange', function (event, data) {
            scope.params.endtime = data;
        });

        //结束时间改变时进行数据更新
        scope.$on('beginTimeChange', function (event, data) {
            scope.params.endtime = data;
        });

    },
    shareStatistics: function (scope,service,echartsOption) {
        //趋势图
        var _data = new Object();  //数据
        var _events = new Object();  //事件


        //数据
        _data = (function () {
            var _option = echartsOption.getLineOption();
            return {
                option: _option
            };
        })();

        _events = {
            update: function (params) {


                //图形数据更新


                var _postParams = {};

                               
                if (scope.params.city == "gz") {
                    _postParams.resultColumns = ["time", "type", "flag", "gz"];
                } else if (scope.params.city == "fs") {
                    _postParams.resultColumns = ["time", "type", "flag", "fs"];
                } else if (scope.params.city == "sz") {
                    _postParams.resultColumns = ["time", "type", "flag", "sz"];
                } else if (scope.params.city == "dg") {
                    _postParams.resultColumns = ["time", "type", "flag", "dg"];
                } else if (scope.params.city == "qy") {
                    _postParams.resultColumns = ["time", "type", "flag", "qy"];
                } else if (scope.params.city == "st") {
                    _postParams.resultColumns = ["time", "type", "flag", "st"];
                } else if (scope.params.city == "cz") {
                    _postParams.resultColumns = ["time", "type", "flag", "cz"];
                } else if (scope.params.city == "jy") {
                    _postParams.resultColumns = ["time", "type", "flag", "jy"];
                } else if (scope.params.city == "mz") {
                    _postParams.resultColumns = ["time", "type", "flag", "mz"];
                } else if (scope.params.city == "hy") {
                    _postParams.resultColumns = ["time", "type", "flag", "hy"];
                } else if (scope.params.city == "sg") {
                    _postParams.resultColumns = ["time", "type", "flag", "sg"];
                } else if (scope.params.city == "jm") {
                    _postParams.resultColumns = ["time", "type", "flag", "jm"];
                } else if (scope.params.city == "yj") {
                    _postParams.resultColumns = ["time", "type", "flag", "yj"];
                } else if (scope.params.city == "mm") {
                    _postParams.resultColumns = ["time", "type", "flag", "mm"];
                } else if (scope.params.city == "zj") {
                    _postParams.resultColumns = ["time", "type", "flag", "zj"];
                } else if (scope.params.city == "zh") {
                    _postParams.resultColumns = ["time", "type", "flag", "zh"];
                } else if (scope.params.city == "zq") {
                    _postParams.resultColumns = ["time", "type", "flag", "zq"];
                } else if (scope.params.city == "yf") {
                    _postParams.resultColumns = ["time", "type", "flag", "yf"];
                } else if (scope.params.city == "zs") {
                    _postParams.resultColumns = ["time", "type", "flag", "zs"];
                } else if (scope.params.city == "hz") {
                    _postParams.resultColumns = ["time", "type", "flag", "hz"];
                } else if (scope.params.city == "sw") {
                    _postParams.resultColumns = ["time", "type", "flag", "sw"];
                } else if (scope.params.city == "unknow") {
                    _postParams.resultColumns = ["time", "type", "flag", "unknow"];
                } else {
                    _postParams.resultColumns = ["time", "type", "flag", "total"];
                }
                _postParams.wheres = [];
                _postParams.wheres.push({name: "time", value: scope.params.begintime, operator: "gte", valueType: "STRING"});
                _postParams.wheres.push({name: "time", value: scope.params.endtime, operator: "lte", valueType: "STRING"});
                // _postParams.wheres.push({name: "type", value: scope.params.type, operator: "eq"});
                if(scope.params.type == "1"){
                    _postParams.wheres.push({name: "type", value: "2,4", operator: "in"});
                    //_postParams.wheres.push({name: "type", value: "4", operator: "eq"});
                }else{
                    _postParams.wheres.push({name: "type", value: "1,3", operator: "in"});
                    //_postParams.wheres.push({name: "type", value: "3", operator: "eq"});
                }
                
                _postParams.wheres.push({name: "flag", value: scope.params.flag, operator: "eq"});
                
//                _postParams.wheres.push({name: "city", value: scope.params.city, operator: "eq"});

                //_postParams.groups = [{name: "time"},{name:"type"}];
                _postParams.sorts = [{name: "time", value: "asc"}];
                //_postParams.count = 7;
                _events.updateStatus = scope.RQ.LOADING;
                service("TdkafkaMonitor").findDayMetrics(_postParams).$promise.then(function (data) {
                    if (data !== undefined && data.data.length !== 0) {
                        console.log(data);
                        _data.option.xAxis[0].data = [];
                        if(scope.params.type == "1"){
                            _data.option.yAxis[0].name = "话单量";
                        }else{
                            _data.option.yAxis[0].name = "记录数";
                        }
                        
                        _data.option.series[0].data = [];
                        _data.option.series[1].data = [];
                        _data.option.series[0].name = "100话单";
                        _data.option.series[1].name = "103话单";
                        //_data.option.series[1].name = _data.option.yAxis[1].name;
                        //var _unit = 86400 / 8 / 1024; //Mbps
                        for (var i = 0; i < data.data.length; i++) {
                            var date = new Date(data.data[i].time).format('yyyy-MM-dd hh:mm:ss');
                            var localeString = date.toLocaleString();
                            console.log(localeString);
                            _data.option.xAxis[0].data.push(localeString);
                            _data.option.legend.data[0].name = "100话单";
                            _data.option.legend.data[1].name = "103话单";
                            //_data.option.series[0].data.push(data.data[i][scope.params.city]);
                            if(data.data[i].type=="1"||data.data[i].type=="2"){
                                _data.option.series[0].data.push(data.data[i][scope.params.city]);
                            }else{
                                _data.option.series[1].data.push(data.data[i][scope.params.city]);
                            }
                        }
                        var legend = {x: 'left',y:'top'};
                        var dataZoom = {show:'true'};
                        var title = {text: ''};
                        var grid = {x: 110, x2: 110, y: 80, y2: 80, borderWidth: 0};
                        angular.extend(_data.option.legend, legend);
                        angular.extend(_data.option.dataZoom[0], dataZoom);
                        angular.extend(_data.option.title, title);
                        angular.extend(_data.option.grid, grid);
                        _events.updateStatus = scope.RQ.SUCCESS;

                        
                    } else {
                        _events.updateStatus = scope.RQ.NODATA;
                    }
                }, function () {
                    _events.updateStatus = scope.RQ.FAIL;
                });
            },
            
            updateStatus: scope.RQ.NODATA, //更新状态
            registeWatch: (function () {
                //更新事件监听
                scope.$on('queryUpdate', function (event, data) {
                    _events.update();
                });
            })()
        };

        return {
            events:_events,
            data: _data,
        };
    },

    data: function (scope) {


        var _events = new Object();  //事件
        var _data = new Object();

        _data = (function () {
            var _type = new Object();
            var _city = new Object();

            _type = [
                {id: "1", name: '话单量'},
                {id: "2", name: '记录数'},
            ]
            _city = [
                {id:"gz",name:'广州市'},
                {id:"fs",name:'佛山市'},
                {id:"sz",name:'深圳市'},
                {id:"dg",name:'东莞市'},
                {id:"qy",name:'清远市'},
                {id:"st",name:'汕头市'},
                {id:"cz",name:'潮州市'},
                {id:"jy",name:'揭阳市'},
                {id:"mz",name:'梅州市'},
                {id:"hy",name:'河源市'},
                {id:"sg",name:'韶关市'},
                {id:"jm",name:'江门市'},
                {id:"yj",name:'阳江市'},
                {id:"mm",name:'茂名市'},
                {id:"zj",name:'湛江市'},
                {id:"zh",name:'珠海市'},
                {id:"zq",name:'肇庆市'},
                {id:"yf",name:'云浮市'},
                {id:"zs",name:'中山市'},
                {id:"hz",name:'惠州市'},
                {id:"sw",name:'汕尾市'},
                {id:"unknow",name:'地市未匹配'},
                {id:"total",name:'总记录'},
                
            ]

            return {
                type: _type,
                city:_city,
            }
        })();
        _events = {
            
            search: function () {
                scope.$broadcast('queryUpdate', '');
            },

            registeWatch: (function () {
                scope.$on('queryUpdate', function () {
                });



            })()

        };
        return {
            data: _data,
            events: _events,
        };
    },
};


angular.module('kafkaMonitor.controller', [])

        .controller('kafkaMonitorCtrl', ['$scope', 'Coss','echartsOption', coss.kafkaMonitor.controller]);
