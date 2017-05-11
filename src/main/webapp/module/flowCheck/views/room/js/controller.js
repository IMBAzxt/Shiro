
coss.room = {}; //初始化模块



coss.room.controller = function (scope, service, echartsOption) {
    var gbps = 1000000000;
    scope.optionList = [];
    scope.serverOptionList = [];
    scope.linkOptionList = [];
    scope.server = {};
    scope.server.page = {
        currentPage: 1,
        pageSize: 4,
        totalResult: 0,
        totalPage: undefined,
        showPage: 5
    };
    //上一页处理函数
    scope.server.page.previousPage = function () {
        if (scope.server.page.currentPage > 1) {
            scope.server.page.currentPage = scope.server.page.currentPage - 1;
            scope.$broadcast('serverPageChange', scope.server.page.currentPage);
        }
    };
    //下一页处理函数
    scope.server.page.nextPage = function () {
        if (scope.server.page.currentPage < scope.server.page.totalPage) {
            scope.server.page.currentPage = scope.server.page.currentPage + 1;
            scope.$broadcast('serverPageChange', scope.server.page.currentPage);
        }
    };
    //点击页码处理函数
    scope.server.page.pageClick = function (currentPage) {
        scope.server.page.currentPage = currentPage;
        scope.$broadcast('serverPageChange', scope.server.page.currentPage);
    };

    scope.link = {};
    scope.link.page = {
        currentPage: 1,
        pageSize: 4,
        totalResult: 0,
        totalPage: undefined,
        showPage: 5
    };
    //上一页处理函数
    scope.link.page.previousPage = function () {
        if (scope.link.page.currentPage > 1) {
            scope.link.page.currentPage = scope.link.page.currentPage - 1;
            scope.$broadcast('linkPageChange', scope.link.page.currentPage);
        }
    };
    //下一页处理函数
    scope.link.page.nextPage = function () {
        if (scope.link.page.currentPage < scope.link.page.totalPage) {
            scope.link.page.currentPage = scope.link.page.currentPage + 1;
            scope.$broadcast('linkPageChange', scope.link.page.currentPage);
        }
    };
    //点击页码处理函数
    scope.link.page.pageClick = function (currentPage) {
        scope.link.page.currentPage = currentPage;
        scope.$broadcast('linkPageChange', scope.link.page.currentPage);
    };

    scope.findRoomList = function (entrance) {
        //图形数据更新
        var _postParams = {};
        _postParams.resultColumns = ["time", 'rname', '"\上行总流量"\ as upflow', '"\下行总流量"\ as downflow', '"\上行FF上报流量"\ as upffflow', '"\下行FF上报流量"\ as downffflow', '"\UAS上行流量"\ as upuasflow', '"\UAS下行流量"\ as downuasflow'];
        _postParams.wheres = [];
        _postParams.wheres.push({name: "time", value: scope.logTime, operator: "eq", valueType: "STRING"});
        _postParams.wheres.push({name: "en_", value: entrance, operator: "eq", valueType: "STRING"});
        if (scope.serverType !== undefined && scope.serverType !== "") {
            _postParams.wheres.push({name: "ptype", value: scope.serverType, operator: "eq", valueType: "STRING"});
        }
        _postParams.sorts = [{name: "rname", value: "asc"}, {name: "time", value: "asc"}];
        _postParams.count = 100000;
        scope.status = 0;
        service("RoomList").findDayMetrics(_postParams).$promise.then(function (result) {
            var data = result.data;
            scope.optionList = [];
            for (var j = 0; j < data.length; j++) {
                var option = echartsOption.getLineOption();
                option.xAxis[0].data = [];
                option.yAxis[0].name = "Gbps";
                option.series[0].data = [];
                option.series[1].data = [];
                option.series[2].data = [];
                option.series[0].name = "上下行总流量";
                option.series[1].name = "上下行FF上报流量";
                option.series[2].name = "UAS上下行流量";
                option.title.text = data[j].name;
                for (var i = 0; i < data[j].dataList.length; i++) {
                    var date = new Date(data[j].dataList[i].time).format('hh:mm');
                    var localeString = date.toLocaleString();
                    option.xAxis[0].data.push(localeString);
                    option.legend.data[0].name = "上下行总流量";
                    option.legend.data[1].name = "上下行FF上报流量";
                    option.legend.data[2].name = "UAS上下行流量";
                    option.series[0].data.push(parseFloat(data[j].dataList[i].upflow / gbps + data[j].dataList[i].downflow / gbps).toFixed(2));
                    option.series[1].data.push(parseFloat(data[j].dataList[i].upffflow / gbps + data[j].dataList[i].downffflow / gbps).toFixed(2));
                    option.series[2].data.push(parseFloat(data[j].dataList[i].upuasflow / gbps + data[j].dataList[i].downuasflow / gbps).toFixed(2));
                }
                scope.optionList.push(option);
            }
            scope.status = 1;
        }, function (a) {
            console.log(a);
        });
    };

    scope.findLinkList = function (rname) {
        //图形数据更新
        var _postParams = {};
        _postParams.resultColumns = ["time", 'lname', '"\上行总流量"\ as upflow', '"\下行总流量"\ as downflow', '"\上行FF上报流量"\ as upffflow', '"\下行FF上报流量"\ as downffflow', '"\UAS上行流量"\ as upuasflow', '"\UAS下行流量"\ as downuasflow'];
        _postParams.wheres = [];
        _postParams.wheres.push({name: "time", value: scope.logTime, operator: "eq", valueType: "STRING"});
        _postParams.wheres.push({name: "rname", value: rname, operator: "eq", valueType: "STRING"});
        if (scope.serverType !== undefined && scope.serverType !== "") {
            _postParams.wheres.push({name: "ptype", value: scope.serverType, operator: "eq", valueType: "STRING"});
        }
        _postParams.sorts = [{name: "lname", value: "asc"}, {name: "time", value: "asc"}];
        _postParams.count = 100000;
        scope.status = 0;
        service("LinkList").findDayMetrics(_postParams).$promise.then(function (result) {
            var data = result.data;
            scope.server.page.currentPage = 1;
            scope.link.page.totalResult = data.length;
            scope.link.page.totalPage = scope.totalPage = Math.floor(scope.link.page.totalResult / scope.link.page.pageSize) + 1;
            scope.linkOptionList = [];
            for (var j = 0; j < data.length; j++) {
                var option = echartsOption.getLineOption();
                option.xAxis[0].data = [];
                option.yAxis[0].name = "Gbps";
                option.series[0].data = [];
                option.series[1].data = [];
                option.series[2].data = [];
                option.series[0].name = "上下行总流量";
                option.series[1].name = "上下行FF上报流量";
                option.series[2].name = "UAS上下行流量";
                option.title.text = data[j].name;
                for (var i = 0; i < data[j].dataList.length; i++) {
                    var date = new Date(data[j].dataList[i].time).format('hh:mm');
                    var localeString = date.toLocaleString();
//                    console.log(localeString);
                    option.xAxis[0].data.push(localeString);
                    option.legend.data[0].name = "上下行总流量";
                    option.legend.data[1].name = "上下行FF上报流量";
                    option.legend.data[2].name = "UAS上下行流量";

                    option.series[0].data.push(parseFloat(data[j].dataList[i].upflow / gbps + data[j].dataList[i].downflow / gbps).toFixed(2));
                    option.series[1].data.push(parseFloat(data[j].dataList[i].upffflow / gbps + data[j].dataList[i].downffflow / gbps).toFixed(2));
                    option.series[2].data.push(parseFloat(data[j].dataList[i].upuasflow / gbps + data[j].dataList[i].downuasflow / gbps).toFixed(2));

                }
                scope.linkOptionList.push(option);
            }
            scope.$broadcast('linkPageChange', "1");
            scope.status = 1;
        }, function () {
        });
    };

    scope.findServerList = function (rname) {
        //图形数据更新
        var _postParams = {};
        _postParams.resultColumns = ["time", 'pname', '"\上行总流量"\ as upflow', '"\下行总流量"\ as downflow', '"\上行FF上报流量"\ as upffflow', '"\下行FF上报流量"\ as downffflow', '"\UAS上行流量"\ as upuasflow', '"\UAS下行流量"\ as downuasflow'];
        _postParams.wheres = [];
        _postParams.wheres.push({name: "time", value: scope.logTime, operator: "eq", valueType: "STRING"});
        _postParams.wheres.push({name: "rname", value: rname, operator: "eq", valueType: "STRING"});
        if (scope.serverType !== undefined && scope.serverType !== "") {
            _postParams.wheres.push({name: "ptype", value: scope.serverType, operator: "eq", valueType: "STRING"});
        }
        _postParams.sorts = [{name: "pname", value: "asc"}, {name: "time", value: "asc"}];
        _postParams.count = 100000;
        scope.status = 0;
        service("ServerList").findDayMetrics(_postParams).$promise.then(function (result) {
            var data = result.data;
            scope.server.page.currentPage = 1;
            scope.server.page.totalResult = data.length;
            scope.server.page.totalPage = scope.totalPage = Math.floor(scope.server.page.totalResult / scope.server.page.pageSize) + 1;
            scope.serverOptionList = [];
            for (var j = 0; j < data.length; j++) {
                var option = echartsOption.getLineOption();
                option.xAxis[0].data = [];
                option.yAxis[0].name = "Gbps";
                option.series[0].data = [];
                option.series[1].data = [];
                option.series[2].data = [];
                option.series[0].name = "上下行总流量";
                option.series[1].name = "上下行FF上报流量";
                option.series[2].name = "UAS上下行流量";
                option.title.text = data[j].name;
                for (var i = 0; i < data[j].dataList.length; i++) {
                    var date = new Date(data[j].dataList[i].time).format('hh:mm');
                    var localeString = date.toLocaleString();
//                    console.log(localeString);
                    option.xAxis[0].data.push(localeString);
                    option.legend.data[0].name = "上下行总流量";
                    option.legend.data[1].name = "上下行FF上报流量";
                    option.legend.data[2].name = "UAS上下行流量";

                    option.series[0].data.push(parseFloat(data[j].dataList[i].upflow / gbps + data[j].dataList[i].downflow / gbps).toFixed(2));
                    option.series[1].data.push(parseFloat(data[j].dataList[i].upffflow / gbps + data[j].dataList[i].downffflow / gbps).toFixed(2));
                    option.series[2].data.push(parseFloat(data[j].dataList[i].upuasflow / gbps + data[j].dataList[i].downuasflow / gbps).toFixed(2));

                }
                scope.serverOptionList.push(option);
            }
            scope.$broadcast('serverPageChange', "1");
            scope.status = 1;
        }, function () {
        });
    };

    scope.findServerTypeList = function () {
        //图形数据更新
        var _postParams = {};
        _postParams.resultColumns = ["ptype"];
        _postParams.wheres = [];
        _postParams.wheres.push({name: "time", value: scope.logTime, operator: "eq", valueType: "STRING"});
        _postParams.groups = [{name: "ptype"}];
        _postParams.sorts = [{name: "ptype", value: "asc"}];
        _postParams.count = 100000;
        service("TdProbeStatic").findDayMetrics(_postParams).$promise.then(function (data) {
            scope.serverTypeList = data.data;
            scope.serverTypeList.splice(0, 0, {ptype: "全部"});
        }, function () {
        });
    };

    scope.selectServerType = function ($item, $model, $select) {
        if ($item.ptype === "全部") {
            scope.serverType = "";
        } else {
            scope.serverType = $item.ptype;
        }
        if (scope.menu.data.level === 1) {
            scope.$broadcast('roomUpdate', '');
        } else {
            scope.$broadcast('linkUpdate', '');
        }
    };

    scope.$on('roomUpdate', function (event, data) {
        scope.findRoomList(scope.menu.data.name);
        scope.findServerTypeList();
    });

    scope.$on('linkUpdate', function (event, data) {
        scope.findLinkList(scope.menu.data.name);
        scope.findServerList(scope.menu.data.name);
        scope.findServerTypeList();
    });

    scope.$on('serverPageChange', function (event, data) {
        if (scope.serverOptionList.length >= data * scope.server.page.pageSize) {
            scope.serverChartList = scope.serverOptionList.slice((data - 1) * scope.server.page.pageSize, data * scope.server.page.pageSize);
        } else {
            scope.serverChartList = scope.serverOptionList.slice((data - 1) * scope.server.page.pageSize, scope.serverOptionList.length);
        }
    });

    scope.$on('linkPageChange', function (event, data) {
        if (scope.linkOptionList.length >= data * scope.link.page.pageSize) {
            scope.linkChartList = scope.linkOptionList.slice((data - 1) * scope.link.page.pageSize, data * scope.link.page.pageSize);
        } else {
            scope.linkChartList = scope.linkOptionList.slice((data - 1) * scope.link.page.pageSize, scope.linkOptionList.length);
        }
    });

    scope.$broadcast('roomUpdate', '');
//    scope.findServerTypeList();
};

/**
 * angular的各种模块注册
 */
angular.module('room.controller', [])
        .controller('roomCtrl', ['$scope', 'Coss', 'echartsOption', coss.room.controller]);
