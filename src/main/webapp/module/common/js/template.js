/**
 * 模版js
 * @author 郑学涛 <zhengxuetao@haohandata.com.cn>
 * @copyright 北京浩瀚深度信息技术股份有限公司
 * @createDate 2017/01/03
 * @updateDate 2017/01/03
 */

/**
 * CommonObj 页面所有分析元素的父类，模仿java的继承实现。
 */
var CommonObj = {}; //先初始化，避免出现undefined

/**
 * 获取CommonObj分析模版对象
 * @param {type} scope
 * @returns {CommonObj.init.tempObj|Boolean}
 */
CommonObj.getCommonObjFactory = function (scope) {
    if (typeof scope === "undefined") {
        console.error("传入的对象为undefined");
        return false;
    } else {
        var tempObj = {};

        /**  标题设置   **/
        tempObj.title = {};
        tempObj.title.name = "标题"; //标题名称

        /**
         * 改表标题的方法。
         * @returns {undefined}
         */
        tempObj.title.changeTitle = function () {
            console.log("changeTitle need to overwrite!");
        };

        /**  数据模版定义，模块使用的变量可以在此定义   **/
        tempObj.data = {
            theadList: [], //表格的表头数组
            tbodyList: [], //表格的数据数组
            option: {}, //echarts图的option
            updateStatus: ""  //控件的更新状态。
        };

        /**  数据分析模块的事件定义   **/
        tempObj.events = {};

        /**
         * 分析对象内容更新方法
         * @returns {undefined}
         */
        tempObj.events.update = function () {
            console.log("update need to overwrite!");
        };

        /**
         * 注册各种监听事件
         * @returns {undefined}
         */
        tempObj.events.registeWatch = function () {
            console.log("registeWatch need to overwrite!");
        };

        /**  数据分析模块的分页定义   **/
        tempObj.page = {
            currentPage: 1,
            pageSize: 10,
            totalResult: 0,
            totalPage: 1,
            showPage: 5
        };
        //上一页处理函数
        tempObj.page.previousPage = function () {
            if (tempObj.page.currentPage > 1) {
                tempObj.page.currentPage = tempObj.page.currentPage - 1;
                scope.$broadcast('tablePageChange', tempObj.page.currentPage);
            }
        };
        //下一页处理函数
        tempObj.page.nextPage = function () {
            if (tempObj.page.currentPage < tempObj.page.totalPage) {
                tempObj.page.currentPage = tempObj.page.currentPage + 1;
                scope.$broadcast('tablePageChange', tempObj.page.currentPage);
            }
        };
        //点击页码处理函数
        tempObj.page.pageClick = function (currentPage) {
            tempObj.page.currentPage = currentPage;
            scope.$broadcast('tablePageChange', tempObj.page.currentPage);
        };
        return tempObj;
    }
};


CommonObj.getServiceNetFactory = function (scope, commonData, service) {
    if (typeof scope === "undefined" || typeof commonData === "undefined") {
        console.error("传入的对象为undefined");
        return false;
    } else {
        var tempObj = {};

        /**  标题设置   **/
        tempObj.title = {};
        tempObj.title.name = "网页的流向一览图"; //标题名称

        /**
         * 改表标题的方法。
         * @returns {undefined}
         */
        tempObj.title.changeTitle = function (service_type) {
            tempObj.title.name = service_type + "的流向一览图";
        };

        /**  数据模版定义，模块使用的变量可以在此定义   **/
        tempObj.data = {
            option: {}, //echart配置
            serviceType: "web", //业务类型，默认web
            serviceId: -10, //当前选择业务ID,没选中时为-10
            serviceName: "", //当前选择业务名称，没选中时为空字符串
            serviceList: [], //当前图形所有的业务数组
            isDetailActive: false, //是否需要显示详细表格，默认不显示
            cityId: -10, //城市ID，没选中时-10
            cityName: "全市", //城市名称，没选中时“全市”
            theadList: [], //表格头部
            tbodyList: [], //表格数据
            needQaOrder: false, //是否需要质量排序，默认不需要
            orderByDire: "asc", //排序方向
            orderByCol: "resp_success_rate", //排序字段
            orderByShowName: "应答成功率(%)", //排序字段显示名称
            postParams: {}, //后台查询参数
            joins: [], //需要额外关联的表
            modelFlag: "", //导出时需要使用的后台查询参数
            excelName: "", //导出文件名称
            updateStatus: "", //控件的更新状态。
            isLocal: true //是否需要查询地市表
        };
        //设置表头的默认值。
        tempObj.data.theadList = [{
                name: '业务',
                width: '3',
                key_name: 'service_name'
            }, {
                name: '总流量',
                unit: '(Mbps)',
                width: '1',
                key_name: 'total_mbps_d'
            }, {
                name: 'idc',
                unit: '(Mbps)',
                width: '1',
                key_name: 'idc_mbps_d'
            }, {
                name: 'cache',
                unit: '(Mbps)',
                width: '1',
                key_name: 'cache_mbps_d'
            }, {
                name: '省外',
                unit: '(Mbps)',
                width: '1',
                key_name: 'province_outer_mbps_d'
            }, {
                name: '直连',
                unit: '(Mbps)',
                width: '1',
                key_name: 'direct_link_mbps_d'
            }, {
                name: '网外',
                unit: '(Mbps)',
                width: '1',
                key_name: 'net_outer_mbps_d'
            }, {
                name: '其他',
                unit: '(Mbps)',
                width: '1',
                key_name: 'other_mbps_d'
            }];
        //初始化值
        tempObj.data.joins = [];
        tempObj.data.wheres = [];

        /**  数据分析模块的分页定义   **/
        tempObj.page = {
            currentPage: 1,
            pageSize: 10,
            totalResult: 0,
            totalPage: 1,
            showPage: 5
        };

        /**  数据分析模块的事件定义   **/
        tempObj.events = {};

        tempObj.events.postParamsChange = function () {
        };
        /**
         * 分析对象内容更新方法
         * @returns {undefined}
         */
        tempObj.events.update = function () {
            tempObj.events.postParamsChange();
            var p = COSSUtils.parseParamFunc(tempObj.data.serviceType, tempObj.data.isLocal);
            if (tempObj.data.cityId !== -10) {
                p.joins.push({tableName: "tm_ana_usergrp", tableAliasName: "c", on: "c.id=a.user_id"});
                p.joins.push({tableName: "tr_usergrp2city", tableAliasName: "d", on: "c.id = d.usergrpid"});
                p.joins.push({tableName: "tr_city", tableAliasName: "e", on: "d.cityid=e.id"});
            }
            if (tempObj.data.joins.length > 0) {
                p.joins = p.joins.concat(tempObj.data.joins);
            }
//            tempObj.data.excelName = "业务流向数据";
            tempObj.data.modelFlag = p.tableName;

            var _total_mbps_d = getMetricById('total_mbps_d');   //总流量
            var _idc_mbps_d = getMetricById('idc_mbps_d');   //idc
            var _cache_mbps_d = getMetricById('cache_mbps_d');   //cache
            var _province_outer_mbps_d = getMetricById('province_outer_mbps_d');   //省外
            var _direct_link_mbps_d = getMetricById('direct_link_mbps_d');   //直连
            var _net_outer_mbps_d = getMetricById('net_outer_mbps_d');   //网外
            var _other_mbps_d = getMetricById('other_mbps_d');   //其他
            var _qa_rate = getMetricById(tempObj.data.orderByCol);   //质量指标
            tempObj.title.changeTitle(p.service_type_name);
            tempObj.data.postParams.joins = p.joins;
            tempObj.data.postParams.count = p.count;
            tempObj.data.postParams.resultColumns = ["m2.name as service_name", "m2.id as service_id",
                _total_mbps_d.id, _idc_mbps_d.id, _cache_mbps_d.id, _province_outer_mbps_d.id,
                _direct_link_mbps_d.id, _net_outer_mbps_d.id, _other_mbps_d.id, _qa_rate.id];

            tempObj.data.postParams.groups = [{name: "m2.name"}, {name: "m2.id"}];
            if (tempObj.data.needQaOrder === true) {
                tempObj.data.postParams.sorts = [{name: _qa_rate.id, value: tempObj.data.orderByDire}];
            } else {
                tempObj.data.postParams.sorts = [{name: _total_mbps_d.id, value: "desc"}];
            }
            tempObj.data.postParams.page = tempObj.page.currentPage;
            tempObj.data.postParams.count = tempObj.page.pageSize;
            tempObj.data.updateStatus = scope.RQ.LOADING;
            service(tempObj.data.modelFlag).findDayMetrics(tempObj.data.postParams).$promise.then(function (netData) {
                //表格分页信息更新
                tempObj.page.totalResult = netData.totalCount;
                tempObj.page.totalPage = netData.totalPage;
                if (netData !== undefined && netData.data.length !== 0) {
                    tempObj.data.tbodyList = [];
                    for (var i = 0; i < netData.data.length; i++) {
                        var _simple_name = netData.data[i].service_name;
                        if (_simple_name.length > commonData.barNameShowNum) {
                            _simple_name = _simple_name.substr(0, 4) + "...";  //左y轴数据
                        }
                        netData.data[i].simpleName = _simple_name;
                        tempObj.data.serviceId = netData.data[0].service_id;
                        tempObj.data.serviceName = netData.data[0].service_name;
                        /** 为了避免四舍五入导致数据累加超过总流量的情况，分指标保留3为小数，js再进行数据处理，保留两位小数不进行四舍五入，其余的流量归为其他 **/
                        netData.data[i].total_mbps_d = Math.floor(netData.data[i].total_mbps_d * 100) / 100;
                        netData.data[i].idc_mbps_d = Math.floor(netData.data[i].idc_mbps_d * 100) / 100;
                        netData.data[i].cache_mbps_d = Math.floor(netData.data[i].cache_mbps_d * 100) / 100;
                        netData.data[i].province_outer_mbps_d = Math.floor(netData.data[i].province_outer_mbps_d * 100) / 100;
                        netData.data[i].direct_link_mbps_d = Math.floor(netData.data[i].direct_link_mbps_d * 100) / 100;
                        netData.data[i].net_outer_mbps_d = Math.floor(netData.data[i].net_outer_mbps_d * 100) / 100;
                        netData.data[i].other_mbps_d = parseFloat(netData.data[i].total_mbps_d - netData.data[i].idc_mbps_d
                                - netData.data[i].cache_mbps_d - netData.data[i].province_outer_mbps_d - netData.data[i].direct_link_mbps_d
                                - netData.data[i].net_outer_mbps_d).toFixed(2);

                        if (netData.data[i].other_mbps_d <= 0.00) {
                            netData.data[i].other_mbps_d = 0;
                        }

                    }
                    tempObj.data.tbodyList = netData.data;
                    tempObj.data.updateStatus = scope.RQ.SUCCESS;
                    var _params = {
                        service_type: tempObj.data.serviceType,
                        service_id: tempObj.data.serviceId,
                        service_name: tempObj.data.serviceName,
                        qa_col: tempObj.data.orderByCol,
                        qa_name: tempObj.data.orderByShowName
                    };
                    scope.$broadcast('serviceNetClick', _params);
                } else {
                    tempObj.data.serviceId = -10;
                    tempObj.data.updateStatus = scope.RQ.NODATA;
                    scope.$broadcast('serviceNetUpdateFail', tempObj.data.updateStatus);
                }
                tempObj.data.needQaOrder = false;
            }, function () {
                tempObj.data.needQaOrder = false;
                tempObj.data.updateStatus = scope.RQ.FAIL;
                scope.$broadcast('serviceNetUpdateFail', tempObj.data.updateStatus);
            });
        };

        /**
         * 某个业务被点击的处理方法
         * @returns {undefined}
         */
        tempObj.events.serviceNetClick = function (data) {
            tempObj.data.serviceName = data.service_name;
            tempObj.data.serviceId = data.service_id;
            var _params = {
                service_type: tempObj.data.serviceType,
                service_id: tempObj.data.serviceId,
                service_name: tempObj.data.serviceName,
                qa_col: tempObj.data.orderByCol,
                qa_name: tempObj.data.orderByShowName
            };
            scope.$broadcast('serviceNetClick', _params);
        };

        /**
         * 业务类型被点击的处理方法
         * @returns {undefined}
         */
        tempObj.events.serviceTypeClick = function (data) {
            tempObj.data.serviceType = data;
            tempObj.data.orderByCol = commonData.orderParam[tempObj.data.serviceType].key;
            tempObj.data.orderByShowName = commonData.orderParam[tempObj.data.serviceType].name;
            scope.$broadcast('serviceTypeClick', data);
        };

        /**
         * 是否显示报表点击事件
         * @returns {undefined}
         */
        tempObj.events.serviceDetailClick = function () {
            if (tempObj.data.isDetailActive === false) {
                tempObj.data.isDetailActive = true;
            } else {
                tempObj.data.isDetailActive = false;
            }
        };

        /**
         * 点击质量指标排序方法
         * @returns {undefined}
         */
        tempObj.events.orderByQa = function () {
            tempObj.data.needQaOrder = true;
            if (tempObj.data.orderByDire === "asc") {
                tempObj.data.orderByDire = "desc";
            } else {
                tempObj.data.orderByDire = "asc";
            }
            scope.$broadcast('orderByQaClick', '');
        };

        /**
         * 注册各种监听事件
         * @returns {undefined}
         */
        tempObj.events.registeWatch = function () {
            console.log("registeWatch need to overwrite!");
        };

        tempObj.events.autoRegisteWatch = (function () {
            //业务类别点击的监听事件
            scope.$on('serviceTypeClick', function () {
                tempObj.page.currentPage = 1;
                tempObj.events.update();
            });

            //点击排序的监听事件
            scope.$on('orderByQaClick', function () {
                tempObj.page.currentPage = 1;
                tempObj.events.update();
            });

            //图形分页变动时的监听事件
            scope.$on('barPageChange', function () {
                tempObj.events.update();
            });
        })();
        /**  数据分析模块的分页定义   **/
        //上一页处理函数
        tempObj.page.previousPage = function () {
            if (tempObj.page.currentPage > 1) {
                tempObj.page.currentPage = tempObj.page.currentPage - 1;
                scope.$broadcast('barPageChange', tempObj.page.currentPage);
            }
        };
        //下一页处理函数
        tempObj.page.nextPage = function () {
            if (tempObj.page.currentPage < tempObj.page.totalPage) {
                tempObj.page.currentPage = tempObj.page.currentPage + 1;
                scope.$broadcast('barPageChange', tempObj.page.currentPage);
            }
        };
        //点击页码处理函数
        tempObj.page.pageClick = function (currentPage) {
            tempObj.page.currentPage = currentPage;
            scope.$broadcast('barPageChange', tempObj.page.currentPage);
        };
        return tempObj;
    }
};



