

coss.dsf = {};  //初始化模块


coss.dsf= {

    controller: function (scope,service,echartsOption) {

        //图形
        scope.checkLinkStatistics = coss.dsf.checkLinkStatistics(scope,service,echartsOption);
        scope.checkProbeStatistics = coss.dsf.checkProbeStatistics(scope,service,echartsOption);





        //首次进入页面时传播时间改变时间，是为了加载各个图的数据
        scope.$broadcast('queryUpdate', '');
        
        //开始时间改变时进行数据更新
        scope.$on('endTimeChange', function (event, data) {
            scope.$broadcast('queryUpdate', '');
        });

    },
    //链路核对
    checkLinkStatistics: function (scope,service,echartsOption) {
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

                _postParams.resultColumns = ["v_time","tpupbyte","tpdnbyte","ffupbyte","ffdnbyte","uasupbyte","uasdnbyte"];             
                _postParams.wheres = [];
                _postParams.wheres.push({name: "v_time", value: scope.logTime, operator: "eq", valueType: "STRING"});
//                _postParams.wheres.push({name: "time", value: scope.time +  " 23:59:59", operator: "lte", valueType: "DATETIME"});
                //_postParams.wheres.push({name: "lname", value:"省网", operator: "eq", valueType: "STRING"});
                // _postParams.wheres.push({name: "type", value: scope.params.type, operator: "eq"});
               
//                _postParams.wheres.push({name: "city", value: scope.params.city, operator: "eq"});

//                _postParams.groups = [{name: "time"},{name:"type"}];
                _postParams.sorts = [{name: "v_time", value: "asc"}];
                //_postParams.count = 7;
                _events.updateStatus = scope.RQ.LOADING;
                service("TdLinkStatic").findDayMetrics(_postParams).$promise.then(function (data) {
                    if (data !== undefined && data.data.length !== 0) {
                        console.log(data);
                        _data.option.xAxis[0].data = [];

                        _data.option.yAxis[0].name = "Gbps";
                        _data.option.series[0].data = [];
                        _data.option.series[1].data = [];
                        //_data.option.series[2].data = [];
                        _data.option.series[0].name = "上下行总流量";
                        _data.option.series[1].name = "上下行FF上报流量";
                        _data.option.series[2].name = "UAS上下行流量";
                        //_data.option.series[1].name = _data.option.yAxis[1].name;
                        //var _unit = 86400 / 8 / 1024; //Mbps
                        for (var i = 0; i < data.data.length; i++) {
                            var date = new Date(data.data[i].v_time).format('yyyy-MM-dd hh:mm:ss');
                            var localeString = date.toLocaleString();
                            console.log(localeString);
                            _data.option.xAxis[0].data.push(localeString);
                            _data.option.legend.data[0].name = "上下行总流量";
                            _data.option.legend.data[1].name = "上下行FF上报流量";
                            _data.option.legend.data[2].name = "UAS上下行流量";
                            console.log(data.data[i])
                            console.log(data.data[i].upflow);
                            console.log(data.data[i].downflow);
                            var gbps = 8/5/60/1024/1024/1024;
                            _data.option.series[0].data.push(parseFloat(data.data[i].tpupbyte * gbps + data.data[i].tpdnbyte * gbps).toFixed(2));
                            _data.option.series[1].data.push(parseFloat(data.data[i].upffflow * gbps + data.data[i].ffdnbyte * gbps).toFixed(2));
                            _data.option.series[2].data.push(parseFloat(data.data[i].upuasflow * gbps + data.data[i].uasdnbyte * gbps).toFixed(2));

                        }
//                        var legend = {x: 'left',y:'top'};
                        var dataZoom = {show:'true'};
                        var title = {text: '省网'};
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
    //设备核对
    checkProbeStatistics: function (scope,service,echartsOption) {
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

                _postParams.resultColumns = ["time",'"\上行总流量"\ as upflow','"\下行总流量"\ as downflow','"\上行FF上报流量"\ as upffflow','"\下行FF上报流量"\ as downffflow','"\UAS上行流量"\ as upuasflow','"\UAS下行流量"\ as downuasflow'];                          
                _postParams.wheres = [];
                _postParams.wheres.push({name: "time", value: scope.logTime, operator: "eq", valueType: "STRING"});
//                _postParams.wheres.push({name: "time", value: scope.logTime + " 23:59:59", operator: "lte", valueType: "STRING"});
                //_postParams.wheres.push({name: "pname", value:"三方", operator: "eq", valueType: "STRING"});
                // _postParams.wheres.push({name: "type", value: scope.params.type, operator: "eq"});
               
//                _postParams.wheres.push({name: "city", value: scope.params.city, operator: "eq"});

                //_postParams.groups = [{name: "time"},{name:"type"}];
                _postParams.sorts = [{name: "time", value: "asc"}];
                //_postParams.count = 7;
                _events.updateStatus = scope.RQ.LOADING;
                service("TdProbeStatic").findDayMetrics(_postParams).$promise.then(function (data) {
                    if (data !== undefined && data.data.length !== 0) {
                        console.log(data);
                        _data.option.xAxis[0].data = [];

                        _data.option.yAxis[0].name = "Gbps";
                        _data.option.series[0].data = [];
                        _data.option.series[1].data = [];
                        //_data.option.series[2].data = [];
                        _data.option.series[0].name = "上下行总流量";
                        _data.option.series[1].name = "上下行FF上报流量";
                        _data.option.series[2].name = "UAS上下行流量";
                        //_data.option.series[1].name = _data.option.yAxis[1].name;
                        //var _unit = 86400 / 8 / 1024; //Mbps
                        for (var i = 0; i < data.data.length; i++) {
                            var date = new Date(data.data[i].time).format('yyyy-MM-dd hh:mm:ss');
                            var localeString = date.toLocaleString();
                            console.log(localeString);
                            _data.option.xAxis[0].data.push(localeString);
                            _data.option.legend.data[0].name = "上下行总流量";
                            _data.option.legend.data[1].name = "上下行FF上报流量";
                            _data.option.legend.data[2].name = "UAS上下行流量";
                            console.log(data.data[i])
                            console.log(data.data[i].upflow);
                            console.log(data.data[i].downflow);
                            var gbps = 8/5/60/1024/1024/1024;
                            _data.option.series[0].data.push(parseFloat(data.data[i].upflow * gbps + data.data[i].downflow * gbps).toFixed(2));
                            _data.option.series[1].data.push(parseFloat(data.data[i].upffflow * gbps + data.data[i].downffflow * gbps).toFixed(2));
                            _data.option.series[2].data.push(parseFloat(data.data[i].upuasflow * gbps + data.data[i].downuasflow * gbps).toFixed(2));

                        }
//                        var legend = {x: 'left',y:'top'};
                        var dataZoom = {show:'true'};
                        var title = {text: '三方'};
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


    };

/**
 * angular的各种模块注册
 */
angular.module('dsf.controller', [])
        .controller('dsfCtrl', ['$scope', 'Coss', 'echartsOption', coss.dsf.controller]);
