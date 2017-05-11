var commonDirective = {
    echart: function () {
        return {
            restrict: 'A',
            scope: {
                option: '=',
                theme: "=",
                dispatchAction: "=",
                clickFunction: "&",
                dispose: '=',
                windowResize: '='
            },
            link: function (scope, element, attrs) {
                var echartInstance;
                if (scope.theme !== undefined) {
                    echartInstance = echarts.init(element[0], scope.theme);
                } else {
                    echartInstance = echarts.init(element[0]);
                }
                scope.$watch('option', function (option) {
                    //        console.log(JSON.stringify(option));
                    if (option !== undefined) {
                        echartInstance.clear();
                        echartInstance.setOption(option);
                    }
                    echartInstance.resize;
                }, true);
                scope.$watch('dispose', function (dispose) {
                    if (dispose !== {} && dispose !== undefined) {
                        echartInstance.dispose()
                        if (scope.theme !== undefined) {
                            echartInstance = echarts.init(element[0], scope.theme);
                        } else {
                            echartInstance = echarts.init(element[0]);
                        }
                        echartInstance.setOption(dispose);
                        echartInstance.resize();
                    }
                }, true);
                scope.$on('windowResize', function () {
                    echartInstance.resize();
                });
                scope.$watch('clickFunction', function (clickFunction) {
                    echartInstance.on('click', function (params) {
                        params.echarObj = echartInstance;
                        scope.$apply(function () {
                            clickFunction({
                                data: params
                            });
                        });
                    });
                }, true);
            }
        };
    },
    page: function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                currentPage: '=',
                pageSize: '=',
                totalResult: '=',
                totalPage: '=',
                showPage: '=',
                previousPage: "&",
                nextPage: "&",
                pageClick: "&"
            },
            template: '<div><div class=\"cm commonPage\" ng-click=\"previousPage()\"><img src=\"img/coss/翻页－上一页.png\" /></div>' +
                    '<div class=\"cm commonPage\" ng-class=\"{true:\'commonPageActive\', false:\'\'}[currentPage === data]\" ng-repeat=\"data in pageList\" ng-click=\"pageClick({currentPage:data})\">{{data}}</div>' +
                    '<div class=\"cm commonPage\" ng-click=\"nextPage()\"><img src=\"img/coss/翻页－下一页.png\" /></div></div>',
            link: function (scope, element, attrs) {
                if (scope.pageSize === undefined) {
                    scope.pageSize = 10;
                }
                if (scope.totalPage === undefined) {
                    if (scope.totalResult === undefined) {
                        scope.totalPage = 1;
                    } else {
                        scope.totalPage = Math.floor(scope.totalResult / scope.pageSize) + 1;
                    }
                }
                if (scope.currentPage === undefined) {
                    scope.currentPage = 1;
                }
                if (scope.showPage === undefined) {
                    scope.showPage = 5;
                }
                scope.pageList = [];
                scope.$watch('currentPage', function (currentPage) {
                    scope.pageList = [];
                    if (scope.showPage > scope.totalPage) {
                        for (var i = 1; i <= scope.totalPage; i++) {
                            scope.pageList.push(i);
                        }
                    } else {
                        var tempPage = Math.round(scope.showPage / 2);  //回显多少页
                        var startPage = 1;
                        //只要是为了让当前页在中间
                        if (tempPage < scope.currentPage) {
                            startPage = scope.currentPage - tempPage + 1;
                        }
                        for (var i = startPage; i <= scope.totalPage && (i - startPage) < scope.showPage; i++) {
                            scope.pageList.push(i);
                        }
                    }
                }, true);
                scope.$watch('totalPage', function (totalPage) {
                    scope.pageList = [];
                    if (scope.showPage > scope.totalPage) {
                        for (var i = 1; i <= scope.totalPage; i++) {
                            scope.pageList.push(i);
                        }
                    } else {
                        var tempPage = Math.round(scope.showPage / 2);  //回显多少页
                        var startPage = 1;
                        //只要是为了让当前页在中间
                        if (tempPage < scope.currentPage) {
                            startPage = scope.currentPage - tempPage + 1;
                        }
                        for (var i = startPage; i <= scope.totalPage && (i - startPage) < scope.showPage; i++) {
                            scope.pageList.push(i);
                        }
                    }
                }, true);
            }
        };
    },
    resizeheigth: function ($rootScope, $window) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var w = angular.element($window);
                scope.$watch(function () {
                    return {
                        'h': w.height()
                    };
                }, function (newValue, oldValue) {
                    $rootScope.$broadcast('heigthResize', newValue);
                }, true);
                w.bind('resize', function () {
                    scope.$apply();
                });
            }
        };
    },
    resize: function ($rootScope, $window) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var w = angular.element($window);
                scope.$watch(function () {
                    return {
                        'h': w.height(),
                        'w': w.width()
                    };
                }, function (newValue, oldValue) {
                    $rootScope.$broadcast('windowResize', newValue);
                }, true);
                w.bind('resize', function () {
                    scope.$apply();
                });
            }
        };
    },
    customScrollbar: function ($timeout) {
        return {
            restrict: 'A',
            scope: {
                boxHeight: '@',
                boxWidth: '@',
                axis: '@'
            },
            link: function (scope, element, attrs) {
                $timeout(function () {
                    element.mCustomScrollbar({
                        theme: "dark",
                        setHeight: scope.boxHeight,
                        setWidth: scope.boxWidth,
                        axis: scope.axis,
                        mouseWheel: {preventDefault: false},
                        advanced: {
                            autoExpandHorizontalScroll: true,
                            autoScrollOnFocus: false,
                            updateOnBrowserResize: false,
                            updateOnContentResize: true,
                            updateOnImageLoad: false
                        },
                        callbacks: {
                            onUpdate: function () {
                                var width = $('.mCSB_container').parent().width();
                                $('.mCSB_container').css('min-width', width);
                            }
                        }
                    });
//                element.mCustomScrollbar('update');
                });
            }
        };
    },
    netTooltips: function () {
        return {
            restrict: 'A',
            scope: {
                data: '=',
                unit: '@'
            },
            link: function (scope, element, attrs) {
                element.bind('mouseover', function ($event) {
                    if ($('#nettooltip').length === 0) {
                        var $tooltip = $('<div id="nettooltip" style = "position: absolute; display: block; border: 1px solid #272933; white-space: nowrap; \n\
                        z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1), top 0.4s cubic-bezier(0.23, 1, 0.32, 1); \n\
                        border-radius: 4px; color: #ffffff; font-size: 12px;font-style: normal; font-variant: normal; font-weight: normal; \n\
                        font-stretch: normal; font-size: 14px; font-family: \'Microsoft YaHei\'; line-height: 21px; padding: 5px; left: '
                                + $event.pageX + 10 + 'px; top: ' + $event.pageY + 10 + 'px; background-color: #272933;opacity:0.9;box-shadow: 10px #272933 10%;" ></div >');
                        $tooltip.html("<div>" + scope.data.service_name + "</div>\n\\n\
                                        <div>总流量：" + scope.data.total_mbps_d + scope.unit + "</div>\n\
                                        <div>IDC：" + scope.data.idc_mbps_d + scope.unit + "</div>\n\
                                        <div>Cache：" + scope.data.cache_mbps_d + scope.unit + "</div>\n\
                                        <div>省外：" + scope.data.province_outer_mbps_d + scope.unit + "</div>\n\
                                        <div>直连：" + scope.data.direct_link_mbps_d + scope.unit + "</div>\n\
                                        <div>网外：" + scope.data.net_outer_mbps_d + scope.unit + "</div>\n\
                                        <div>其他：" + scope.data.other_mbps_d + scope.unit + "</div>");
                        $('body').append($tooltip);
                    } else {
                        if ($event.pageY < 400) {
                            $('#nettooltip').css("top", $event.pageY + 10 + "px");
                        } else {
                            $('#nettooltip').css("top", $event.pageY - 100 + "px");
                        }
                        $('#nettooltip').css("left", $event.pageX + 10 + "px");
                        $('#nettooltip').html("<div>" + scope.data.service_name + "</div>\n\
                                        <div>总流量：" + scope.data.total_mbps_d + scope.unit + "</div>\n\
                                        <div>IDC：" + scope.data.idc_mbps_d + scope.unit + "</div>\n\
                                        <div>Cache：" + scope.data.cache_mbps_d + scope.unit + "</div>\n\
                                        <div>省外：" + scope.data.province_outer_mbps_d + scope.unit + "</div>\n\
                                        <div>直连：" + scope.data.direct_link_mbps_d + scope.unit + "</div>\n\
                                        <div>网外：" + scope.data.net_outer_mbps_d + scope.unit + "</div>\n\
                                        <div>其他：" + scope.data.other_mbps_d + scope.unit + "</div>");
                        $('#nettooltip').show();
                    }
                });

                element.bind('mouseout', function () {
                    if ($('#nettooltip').length !== 0) {
                        $('#nettooltip').hide();
                    }
                });
            }
        };
    },
    addChart: function () {
        return {
            restrict: 'A',
            scope: {
                data: '='
            },
            link: function (scope, element, attrs) {
                for (var i = 0; i < scope.data.length; i++) {
                    var e = document.createElement("div");
                    e.setAttribute("class", "lineChar cm cm-7");
//                    $("<div class=\"lineChar\"   ></div>");
                    element.before(e);
                    var echartInstance = echarts.init(e);
                    echartInstance.clear();
                    echartInstance.setOption(scope.data[i]);
                    echartInstance.resize;
//                    element.before("<div class=\"lineChar\"  resize echart option=\"" + scope.data[i] + "\" ></div>");
                }
            }
        };
    }
};
cossApp
        .directive('echart', commonDirective.echart)
        .directive('resize', commonDirective.resize)
        .directive('resizeheigth', commonDirective.resizeheigth)
        .directive('page', commonDirective.page)
        .directive('customScrollbar', commonDirective.customScrollbar)
        .directive('netTooltips', commonDirective.netTooltips)
        .directive('addChart', commonDirective.addChart)
        ;


//  --------------   家集客的导出指令 ------------------ //

//生成下载excel指令
//@param    modelFlag td类表的业务类型
//@param    postParams 查询数据的过滤条件
//@param    journal 非td表的接口
//@param    num  生成excel的条数,默认生成(不填默认10000)



cossApp.directive('downloadexcel', function ($resource, $http, $location) {
    var page = 1;
    //saveAs方法兼容ie10以上 以及其他浏览起的blob流的下载

    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {modelFlag: '=modelFlag', postParams: "=postParams", journal: "@journal", parameter: "=parameter", num: "@num", excelName: "=excelName", path: '=path'},
        template: "<div ng-click='downloadExcle()'>导出</div>",
        link: function ($scope) {
            $scope.downloadExcle = function () {
                if ($scope.postParams === undefined || $.isEmptyObject($scope.postParams)) {
                    $scope.MessageTip = COSSUtils.showMessageTips("当前日期暂无数据！", 2000);
                    return false;
                }
                $scope.MessageTip = COSSUtils.showMessageTips("正在导出,请稍候...", 3000);
                page = $scope.postParams.page;
                $scope.postParams.page = 1;
                if ($scope.num === undefined) {
                    //默认下载前1000行
                    $scope.postParams.count = 1000;
                } else {
                    $scope.postParams.count = $scope.num;
                }
                var modelFlag;
                var path;
                if ($scope.journal == 'true') {
                    modelFlag = $scope.modelFlag;
                } else {
                    modelFlag = 'td/' + $scope.modelFlag;
                }
                if ($scope.path === undefined) {
                    path = 'downloadExcel';
                }
                var url = 'api/' + modelFlag + '/' + path;
                if ($scope.parameter !== undefined) {
                    for (var i in $scope.parameter) {
                        if (i !== "remove") {
                            if (i == 0) {
                                url = url + "?" + $scope.parameter[i].name + "=" + $scope.parameter[i].value;
                            } else {
                                url = url + "&&" + $scope.parameter[i].name + "=" + $scope.parameter[i].value;
                            }
                        }
                    }
                }
                $http({
                    url: url,
                    method: "POST",
                    data: $scope.postParams, //this is your json data string
                    headers: {
                        'Content-type': 'application/json'
                    },
                    responseType: 'arraybuffer'
                }).success(function (data, status, headers, config) {
                    $scope.postParams.page = page;
                    var blob = new Blob([data], {type: "application/vnd.ms-excel"});
                    COSSUtils.hideMessageTips($scope.MessageTip);
                    COSSUtils.showMessageTips("导出已完成", 3000, "succeed");
                    if ($scope.journal == 'true') {
                        var name = $scope.excelName == undefined ? ("操作日志.xls") : ($scope.excelName + ".xls")
                        COSSUtils.saveAs(blob, name);
                    } else {
                        var name = "";
                        var startTime;
                        var endTime;
                        console.log($scope.postParams.wheres.length);
                        for (var num = 0; num < $scope.postParams.wheres.length; num++) {
                            if ($scope.postParams.wheres[num].name == "start_time") {
                                startTime = $scope.postParams.wheres[num].value;
                            } else if ($scope.postParams.wheres[num].name == "end_time") {
                                endTime = $scope.postParams.wheres[num].value;
                            }
                        }
                        name = $scope.excelName + "_" + startTime;
                        if (startTime != endTime) {
                            name = name + "_" + endTime;
                        }
                        COSSUtils.saveAs(blob, name + ".xls");
                    }
                }).error(function (data, status, headers, config) {
                    //upload failed
                });
            }
        }

////
    };
});


