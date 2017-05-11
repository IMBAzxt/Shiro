/**
 * 内容网络-cache模块js
 * @author 郑学涛 <zhengxuetao@haohandata.com.cn>
 * @copyright 北京浩瀚深度信息技术股份有限公司
 * @createDate 2016/12/02
 * @updateDate 2017/02/16
 */
coss.cache = {}; //初始化模块

/**
 * cache模块所使用的angular的controller
 * @param {type} scope    angular的$scope对象。
 * @param {type} service  Td服务、用于请求td表的数据。
 * @param {type} echartsOption echarts图的模版
 * @param {type} commonData    公共数据
 * @returns {undefined}
 */
coss.cache.controller = function (scope, service, echartsOption, commonData, Coss) {
    //重置参数
    scope.commonParams.link_group_id = 0;
    scope.commonParams.link_group_name = "";
    scope.commonParams.interfaceId = commonData.interface.cache.id;
    //表格组件初始化
    scope.table = coss.cache.table(scope, Coss, commonData);
    //出口链路趋势图初始化
    scope.exportTrend = coss.cache.exportTrend(scope, Coss, echartsOption, commonData);
    //业务流向占比图初始化
    scope.serviceNet = coss.cache.serviceNet(scope, service, commonData);
    //TOPN出口链路趋势图初始化
    scope.topNExportTrend = coss.cache.serviceTrend(scope, service, echartsOption);

    //首次进入页面时传播时间改变时间，是为了加载各个图的数据
    scope.$broadcast('allUpdate', '');

    //结束时间改变时进行数据更新
    scope.$on('endTimeChange', function (event, data) {
        scope.$broadcast('allUpdate', data);
    });

};

/**
 * cache的链路表格组件
 * @param {type} scope  angular的$scope对象。
 * @param {type} service Td服务、用于请求td表的数据。
 * @returns 
 */
coss.cache.table = function (scope, service, commonData) {
    var _table = CommonObj.getCommonObjFactory(scope);
    _table.title.name = "链路情况：Cache链路一览图";
    _table.data.theadList = [{
            name: 'Cache',
            width: '2',
            unit: "出口链路",
            key_name: 'link_group_name'
        }, {
            name: '流量',
            unit: '(Gbps)',
            width: '1',
            key_name: 'up_add_down_gbps_d'
        }, {
            name: '访问量',
            unit: '(次)',
            width: '1',
            key_name: 'visit_count'
        }, {
            name: 'TCP建链成功率',
            unit: '(%)',
            width: '1.5',
            key_name: 'tcp_suc_rate'
        }];
    _table.data.dataList = [];
    _table.page.pageSize = 5;

    _table.data.updateStatus = scope.RQ.NODATA;

    _table.events.update = function () {
        //表格数据更新
        var _postParams = {};
        _postParams.resultColumns = ['total_bps', 'up_bps', 'down_bps', 'visit_count', 'tcp_suc_rate', "cache_id as link_group_id", "cache_name as link_group_name"];
        _postParams.wheres = [];
        _postParams.wheres.push({name: "log_time", value: scope.logTime, operator: "eq", valueType: "STRING"});
        _postParams.wheres.push({name: "cache_id", value: "0", operator: "gt", valueType: "STRING"});
        _postParams.sorts = [{name: 'total_bps', value: "desc"}];
        _postParams.page = _table.page.currentPage;
        _postParams.count = _table.page.pageSize;
        _table.data.updateStatus = scope.RQ.LOADING;
        service("TdGlobalCacheD").findDayMetrics(_postParams).$promise.then(function (data) {
            var _linkGroup = {link_group_id: -10, link_group_name: ''};     //选中的链路对象
            _table.page.totalResult = data.totalCount;
            _table.page.totalPage = data.totalPage;
            if (data !== undefined && data.data.length !== 0) {
                for (var i = 0; i < data.data.length; i++) {
                    var tempData = data.data[i];
                    tempData.up_add_down_gbps_d = parseFloat((parseFloat(tempData.up_bps) + parseFloat(tempData.down_bps)) / commonData.unit.b2Gb).toFixed(2);
                    tempData.tcp_suc_rate = parseFloat(parseFloat(tempData.tcp_suc_rate) * commonData.unit.rate).toFixed(2);
                }
                _table.data.tbodyList = data.data;
                _table.data.updateStatus = scope.RQ.SUCCESS;
            } else {
                _linkGroup = {link_group_id: -10, link_group_name: ''};
                _table.data.tbodyList = [];
                _table.data.updateStatus = scope.RQ.NODATA;
                scope.$broadcast('tableUpdateFail', _table.data.updateStatus);
            }
        }, function () {
            var _linkGroup = {link_group_id: -10, link_group_name: ''};
            scope.commonParams.link_group_id = _linkGroup.link_group_id;
            _table.data.tbodyList = [];
            _table.data.updateStatus = scope.RQ.FAIL;
            scope.$broadcast('tableUpdateFail', _table.data.updateStatus);
        });
    };
    _table.events.lineClick = function (data) {
        //表格每行点击事件
        scope.commonParams.link_group_id = data.link_group_id;
        scope.commonParams.link_group_name = data.link_group_name;
        scope.$broadcast('tableClick', data);
    };
    _table.events.registeWatch = (function () {
        //页码变动时的监听事件
        scope.$on('tablePageChange', function () {
            _table.events.update();
        });

        //全体更新的监听事件
        scope.$on('allUpdate', function (event, data) {
            _table.page.currentPage = 1;
            _table.events.update();
        });
    })();

    return _table;
};

/**
 * cache的流量和质量的趋势图组件
 * @param {type} scope    angular的$scope对象。
 * @param {type} service  Td服务、用于请求td表的数据。
 * @param {type} echartsOption echarts图的模版
 * @returns {undefined}
 */
coss.cache.exportTrend = function (scope, service, echartsOption, commonData) {
    var _app = CommonObj.getCommonObjFactory(scope);
    _app.title.name = "Cache链路的流量和质量趋势";
    _app.title.changeTitle = function (link_group_name) {
        _app.title.name = "Cache" + link_group_name + "的流量和质量趋势";
    };
    _app.data.option = echartsOption.getLineAndBar();

    _app.events.update = function () {
        //图形数据更新
        var _composite = getMetricById('tcp_success_rate');
        var _postParams = {};
        _postParams.resultColumns = ['total_bps', 'tcp_suc_rate', "log_time"];
        _postParams.wheres = [];
        if (scope.commonParams.link_group_id > 0) {
            _postParams.wheres.push({name: "cache_id", value: scope.commonParams.link_group_id, operator: "eq", valueType: "INT"});
        } else {
            _postParams.wheres.push({name: "cache_id", value: "0", operator: "eq", valueType: "INT"});
        }
        _postParams.wheres.push({name: "log_time", value: scope.startTime.replace("-", "").replace("-", ""), operator: "gte", valueType: "STRING"});
        _postParams.wheres.push({name: "log_time", value: scope.endTime.replace("-", "").replace("-", ""), operator: "lte", valueType: "STRING"});
        _postParams.sorts = [{name: "log_time", value: "asc"}];
        _postParams.count = 7;
        _app.data.updateStatus = scope.RQ.LOADING;
        service("TdGlobalCacheD").findDayMetrics(_postParams).$promise.then(function (data) {
            if (data !== undefined && data.data.length !== 0) {
                _app.data.option.xAxis[0].data = [];
                _app.data.option.yAxis[0].name = "流量(Gbps)";
                _app.data.option.yAxis[1].name = _composite.name + "(" + _composite.unit + ")";
                _app.data.option.series[0].data = [];
                _app.data.option.series[1].data = [];
                for (var i = 0; i < data.data.length; i++) {
                    _app.data.option.xAxis[0].data.push(data.data[i].log_time);
                    _app.data.option.series[0].data.push(parseFloat(data.data[i].total_bps / commonData.unit.b2Gb).toFixed(2));
                    _app.data.option.series[1].data.push(parseFloat(data.data[i].tcp_suc_rate * commonData.unit.rate).toFixed(2));
                }
                _app.data.updateStatus = scope.RQ.SUCCESS;
            } else {
                _app.data.updateStatus = scope.RQ.NODATA;
            }
        }, function () {
            _app.data.updateStatus = scope.RQ.FAIL;
        });
    };
    _app.data.updateStatus = scope.RQ.NODATA; //更新状态
    _app.events.registeWatch = (function () {
        //点击表格时图形更新
        scope.$on('tableClick', function (event, data) {
            _app.title.changeTitle(data.link_group_name);
            scope.commonParams.link_group_id = data.link_group_id;
            _app.events.update();
        });

        //表格数据更新失败事件监听
        scope.$on('tableUpdateFail', function (event, data) {
            _app.data.updateStatus = data;
        });

        //全体更新的监听事件
        scope.$on('allUpdate', function (event, data) {
            _app.events.update();
        });
    })();

    return _app;
};

/**
 * cache的业务流量和质量趋势图组件
 * @param {type} scope    angular的$scope对象。
 * @param {type} service  Td服务、用于请求td表的数据。
 * @param {type} echartsOption echarts图的模版
 * @returns {undefined}
 */
coss.cache.serviceTrend = function (scope, service, echartsOption) {
    var _app = CommonObj.getCommonObjFactory(scope);
    _app.title.name = "业务的流量和质量趋势";
    _app.title.changeTitle = function (service_name) {
        _app.title.name = service_name + "的流量和质量趋势";
    };
    _app.data.option = echartsOption.getLineAndBar();

    _app.events.update = function (service_type, service_id) {
        //格式化参数
        var _parseParamFunc = function (service_type, id) {
            var idsWhere = "";
            if (id !== undefined) {
                idsWhere = " and m2.id =" + id;
            }
            var postParams = {};
            if (service_type === "web") {
                postParams.joins = [
                    {tableName: "tr_product2webtop", tableAliasName: "m1", on: "m1.product_id=a.icp_product_id"},
                    {tableName: "tr_web_top", tableAliasName: "m2", on: "m2.id=m1.web_id" + idsWhere}
                ];
                postParams.count = 100;
                postParams.tableName = "globalusericphostwebcoss";
                postParams.ip = "host";
                postParams.service_id = "icp_id";
            } else if (service_type === "video") {
                postParams.joins = [
                    {tableName: "tr_service2videotop", tableAliasName: "m1", on: "m1.service_id=a.service_id"},
                    {tableName: "tr_video_top", tableAliasName: "m2", on: "m2.id=m1.video_id" + idsWhere}
                ];
                postParams.count = 10;
                postParams.tableName = "globalusericphostvideocoss";
                postParams.ip = "server_ip";
                postParams.service_id = "service_id";
            } else if (service_type === "game") {
                postParams.joins = [
                    {tableName: "tr_service2gametop", tableAliasName: "m1", on: "m1.service_id=a.service_id"},
                    {tableName: "tr_game_top", tableAliasName: "m2", on: "m2.id=m1.game_id" + idsWhere}
                ];
                postParams.count = 5;
                postParams.tableName = "globalusericphostgamecoss";
                postParams.ip = "server_ip";
                postParams.service_id = "service_id";
            }
            return postParams;
        };

        //图形数据更新
        var _totalFlow = getMetricById('up_add_down_mbps_d');
        var _composite = getMetricById(_app.data.qa_col);
        var _postParams = {};
        var p = _parseParamFunc(service_type, service_id);
        _postParams.resultColumns = [_totalFlow.id, _composite.id, "log_time"];
        _postParams.joins = p.joins;
        var _cacheWhere = "";
        if (scope.commonParams.link_group_id > 0) {
            _cacheWhere = " and c.id=" + scope.commonParams.link_group_id;
        }
        _postParams.joins = _postParams.joins.concat([
            {tableName: "tr_cache2ip", tableAliasName: "b", on: "a.server_ip <> '' and a.server_ip::inet BETWEEN b.beginip and b.endip"},
            {tableName: "tr_cache_manufactor", tableAliasName: "c", on: "b.cache_id=c.id" + _cacheWhere}
        ]);
        _postParams.wheres = [];
        _postParams.wheres.push({name: "start_time", value: scope.startTime});
        _postParams.wheres.push({name: "end_time", value: scope.endTime});
        _postParams.wheres.push({name: "net_id", value: "0", operator: "eq"});
        _postParams.wheres.push({name: "user_id", value: "0", operator: "eq"});
        _postParams.wheres.push({name: "link_group_id", value: "0", operator: "eq"});
        _postParams.wheres.push({name: "interface_id", value: scope.commonParams.interfaceId, operator: "eq"});
        _postParams.groups = [{name: "log_time"}];
        _postParams.sorts = [{name: "log_time", value: "asc"}];
        _postParams.count = 7;
        _app.data.updateStatus = scope.RQ.LOADING;
        service(p.tableName).findDayMetrics(_postParams).$promise.then(function (data) {
            if (data !== undefined && data.data.length !== 0) {
                _app.data.option.xAxis[0].data = [];
                _app.data.option.series[0].data = [];
                _app.data.option.series[1].data = [];
                _app.data.option.yAxis[0].name = "流量(Mbps)";
                _app.data.option.series[0].name = _app.data.option.yAxis[0].name;
                _app.data.option.yAxis[1].name = _app.data.qa_name;
                _app.data.option.series[1].name = _app.data.qa_name;
                for (var i = 0; i < data.data.length; i++) {
                    _app.data.option.xAxis[0].data.push(data.data[i].log_time);
                    _app.data.option.series[0].data.push(data.data[i][_totalFlow.id]);
                    _app.data.option.series[1].data.push(data.data[i][_app.data.qa_col]);
                }
                _app.data.updateStatus = scope.RQ.SUCCESS;
            } else {
                _app.data.updateStatus = scope.RQ.NODATA;
            }
        }, function () {
            _app.data.updateStatus = scope.RQ.FAIL;
        });
    };
    _app.data.updateStatus = scope.RQ.NODATA; //更新状态
    _app.events.registeWatch = (function () {
        //表格数据更新失败事件监听
        scope.$on('serviceNetUpdateFail', function (event, data) {
            _app.data.updateStatus = data;
        });

        //业务流向图被点击的监听事件
        scope.$on('serviceNetClick', function (event, data) {
            _app.title.changeTitle(data.service_name);
            _app.data.qa_col = data.qa_col;
            _app.data.qa_name = data.qa_name;
            _app.events.update(data.service_type, data.service_id);
        });
    })();

    return _app;
};
/**
 * cache的流向堆积图组件
 * @param {type} scope    angular的$scope对象。
 * @param {type} service  Td服务、用于请求td表的数据。
 * @param {type} commonData    公共数据
 * @returns
 */
coss.cache.serviceNet = function (scope, service, commonData) {
    var _app = CommonObj.getServiceNetFactory(scope, commonData, service);
    _app.data.updateStatus = scope.RQ.NODATA;
    _app.data.isLocal = false;
    _app.events.postParamsChange = function () {
        /** cache模块自己的joins条件 **/
        _app.data.joins = [];
        var _cacheWhere = "";
        if (scope.commonParams.link_group_id > 0) {
            _cacheWhere = " and d.id=" + scope.commonParams.link_group_id;
        }
        _app.data.joins.push({tableName: "tr_cache2ip", tableAliasName: "c", on: "a.server_ip <> '' and a.server_ip::inet BETWEEN c.beginip and c.endip"});
        _app.data.joins.push({tableName: "tr_cache_manufactor", tableAliasName: "d", on: "c.cache_id=d.id" + _cacheWhere});
        _app.data.postParams.wheres = [];
        _app.data.postParams.wheres.push({name: "user_id", value: "0", operator: "eq"});
        _app.data.postParams.wheres.push({name: "link_group_id", value: "0", operator: "eq"});
        _app.data.postParams.wheres.push({name: "interface_id", value: scope.commonParams.interfaceId, operator: "eq"});
        _app.data.postParams.wheres.push({name: "start_time", value: scope.endTime});
        _app.data.postParams.wheres.push({name: "end_time", value: scope.endTime});
        _app.data.excelName = "cache的业务流向数据";
    };
    _app.events.registeWatch = (function () {
        //全体更新的监听事件
        scope.$on('allUpdate', function (event, data) {
            _app.events.update();
        });

        //表格点击事件监听
        scope.$on('tableClick', function (event, data) {
            _app.events.update();
        });
        //表格数据更新失败事件监听
        scope.$on('tableUpdateFail', function (event, data) {
            _app.data.updateStatus = data;
        });
    })();
    return _app;
};

angular.module('cache.controller', [])
        .controller('cacheCtrl', ['$scope', 'Td', 'echartsOption', 'commonData', 'Coss', coss.cache.controller]);
