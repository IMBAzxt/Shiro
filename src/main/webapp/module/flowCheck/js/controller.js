/**
 * 流量核对模块js
 * @author 郑学涛 <zhengxuetao@haohandata.com.cn>
 * @copyright 北京浩瀚深度信息技术股份有限公司
 * @createDate 2017/04/20
 * @updateDate 2017/04/20
 */

coss.flowCheck = {};

coss.flowCheck.menu = function (scope, service) {
    var _app = CommonObj.getCommonObjFactory(scope);
    _app.data.dataList = [];
    _app.data.updateStatus = scope.RQ.NODATA;

    _app.events.findEntranceList = function () {
        //表格数据更新
        var _postParams = {};
        _postParams.resultColumns = ['en_'];
        _postParams.wheres = [];
        _postParams.wheres.push({name: "time", value: scope.logTime, operator: "eq", valueType: "STRING"});
        _postParams.sorts = [{name: 'en_', value: "desc"}];
        _postParams.groups = [{name: "en_"}];
        _postParams.count = 10000;
        _app.data.updateStatus = scope.RQ.LOADING;
        service("TdEntranceStatic").findDayMetrics(_postParams).$promise.then(function (data) {
            var havaMenu = false;
            for (var i = 0; i < data.data.length; i++) {
                for (var j = 0; j < _app.data.dataList.length; j++) {
                    if (data.data[i]["en_"] === _app.data.dataList[j]["name"]) {
                        havaMenu = true;
                        break;
                    }
                }
                if (!havaMenu) {
                    _app.data.dataList.push({name: data.data[i]["en_"], subMenu: []});
                } else {
                    havaMenu = false;
                }
            }
            console.log(_app.data.dataList);
        }, function () {
        });
    };

    _app.events.update = function () {
        var _postParams = {};
        _postParams.resultColumns = ['en_', 'rname'];
        _postParams.wheres = [];
        _postParams.wheres.push({name: "time", value: scope.logTime, operator: "eq", valueType: "STRING"});
        _postParams.sorts = [{name: 'en_', value: "desc"}];
        _postParams.groups = [{name: "en_"}, {name: "rname"}];
        _postParams.count = 10000;
        _app.data.updateStatus = scope.RQ.LOADING;
        service("TdRoomStatic").findDayMetrics(_postParams).$promise.then(function (data) {
            _app.data.dataList = [];
            var menuObj = {
                name: "",
                subMenu: []
            };
            var tempObj = {};
            var menuObj = {};
            for (var i = 0; i < data.data.length; i++) {
                if (i === 0) {
                    tempObj = data.data[i];
                    menuObj.name = data.data[i]["en_"];
                    menuObj.subMenu = [];
                    menuObj.subMenu.push({name: data.data[i]["rname"]});
                } else {
                    if (tempObj["en_"] === data.data[i]["en_"]) {
                        menuObj.subMenu.push({name: data.data[i]["rname"]});
                    } else {
                        _app.data.dataList.push(menuObj);
                        tempObj = data.data[i];
                        var menuObj = {};
                        menuObj.name = data.data[i]["en_"];
                        menuObj.subMenu = [];
                        menuObj.subMenu.push({name: data.data[i]["rname"]});
                    }
                }
            }
            _app.data.dataList.push(menuObj);
            scope.$broadcast('updateDataSuccess', _app.data.dataList);
        }, function () {
            console.log("findRoomList error!");
        });
    };
    _app.events.menuClick = function (name, parentName, level) {
        //表格每行点击事件
        _app.data.name = name;
        _app.data.parentName = parentName;
        _app.data.level = level;
        if (_app.data.level === 1) {
            scope.$broadcast('roomUpdate', '');
        } else {
            scope.$broadcast('linkUpdate', '');
        }
    };
    _app.events.registeWatch = (function () {
        //页码变动时的监听事件

        //全体更新的监听事件
        scope.$on('updateData', function (event, data) {
            _app.events.update();
            if (_app.data.level === 1) {
                scope.$broadcast('roomUpdate', '');
            } else {
                scope.$broadcast('linkUpdate', '');
            }
        });
        scope.$on('updateDataSuccess', function (event, data) {
            _app.events.findEntranceList();
        });
    })();

    return _app;
};

/**
 * cache模块所使用的angular的controller
 * @param {type} scope    angular的$scope对象。
 * @param {type} service  Td服务、用于请求td表的数据。
 * @param {type} echartsOption echarts图的模版
 * @param {type} commonData    公共数据
 * @returns {undefined}
 */
coss.flowCheck.controller = function (scope, Coss) {
    //菜单功能
    scope.menu = coss.flowCheck.menu(scope, Coss);

    //首次进入页面时传播时间改变时间，是为了加载各个图的数据
    scope.$broadcast('updateData', '');

    //开始时间改变时进行数据更新
    scope.$on('endTimeChange', function (event, data) {
        scope.$broadcast('updateData', '');
    });
};

angular.module('flowCheck.controller', [])
        .controller('flowCheckCtrl', ['$scope', 'Coss', coss.flowCheck.controller]);