
/* global COSSUtils, cossApp */

cossApp.factory('Area', function ($resource) {
    return $resource('api/area/:path/:id', {}, {
        findQuickSearchData: {
            method: "GET",
            isArray: true
        },
        findQuickSearchJiKeData: {
            method: "GET",
            isArray: true
        },
        findAllCity: {
            method: "GET",
            params: {path: "findAllCity"},
            isArray: true
        },
        findCountyByCityId: {
            method: "GET",
            params: {path: "findCountyByCityId"},
            isArray: true
        },
        findCommunityByCityId: {
            method: "GET",
            params: {path: "findCommunityByCityId"},
            isArray: true
        },
        findCityByCountyId: {
            method: "GET",
            params: {path: "cityByCountyId"},
            isArray: false
        },
        findCountyByCommunity: {
            method: "GET",
            params: {path: "countyByCountyId"},
            isArray: false
        }
    });
});

cossApp.factory('JiKeArea', function ($resource) {
    return $resource('api/jikearea/:path/:id', {}, {
        findQuickSearchJiKeData: {
            method: "GET",
            isArray: true,
            params: {path: "findQuickSearchJiKeData"}
        }
    });
});



////快速搜索栏组件
//@param qxHeight 组件高度
//@param qxErrorInfo 用户输入错误时的提示 缺省为："输入地市/区县/小区信息有误"
//@param qxTipInfo  用户输入内容需要用户选择联想内容的提示，缺省为："请选择查询详细地址"
//@param qxWidth 输入框的长度，如果未设置则默认设置为 70%
//@param searchBtnClass   搜索按钮样式名称，未填则默认设置为qxSs
//@param ksxzBtnClass     快速选择按钮样式名称，未填则默认设置为qxKs
//@param hideSearchBtn   是否隐藏搜索按钮，如果隐藏了搜索按钮则监听输入框的ng-change事件，未填则默认设置为false
//@param hideKsxzBtn     是否隐藏快速选择按钮，未填则默认设置为false
//@param hTime 提示信息消失时长，单位为ms，缺省为 3000
//return 选择的结果集对象
//注意事项：
//    显示搜索按钮：
//        1. 点击时如果搜索框内容为空，则传播的内容为 {"type":"all"}，代表查询全部
//    隐藏搜索按钮：
//        1. 隐藏搜索按钮，则默认监听输入框值得变化
//            空值 发送{"type":"all"} 代表查询全部
//            未匹配到的值 发送{"type":"error"} 代表输入的值未匹配到内容
//            匹配到的值 发送匹配数据的值
cossApp.directive('quicksearch', function (Area, JiKeArea, $rootScope) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {qxHeight: '@qxHeight', qxWidth: '@qxWidth', searchBtnClass: '@searchBtnClass',
            ksxzBtnClass: '@ksxzBtnClass', qxErrorInfo: '@qxErrorInfo', qxTipInfo: '@qxTipInfo',
            hideSearchBtn: '@hideSearchBtn', hideKsxzBtn: '@hideKsxzBtn',
            hTime: '@hTime'},
        template: "<div style='position:relative'><input  class='qxInput' data-placement='top' data-toggle='popover'  type='text' id='searchInput' placeholder='{{showPlaceholder}}' ng-model='searchKey' ng-change='listenInputChange()' ng-blur='myBlur()'/>" +
                "<button id='serarchBtn' type='button' ng-show='isShowSearch' class='btn btn-default' ng-click='searchClick()'></button></div>",
//        template: "<div><input class='qxInput' data-placement='top' data-toggle='popover'  type='text' id='searchInput' placeholder='输入地市/区县/小区' ng-model='searchKey' />" +
//                "<button type='button' class='btn btn-default qxSs' ng-click='searchClick()'></button><button type='button' class='btn btn-default qxKs' ng-click=''></button></div>",
        link: function (scope, element, attrs) {
            $rootScope.userGroupType = "JiaKe";//设定值，后面的代码就都不用改了。
            //根据用户组设置提示语
            scope.showPlaceholder = "地市/区县/小区";
            //判断显隐按钮
            if (undefined !== $.trim(scope.hideSearchBtn) && "" !== $.trim(scope.hideSearchBtn) && "false" !== scope.hideSearchBtn) {
                scope.isShowSearch = false;
            } else {
                scope.isShowSearch = true;
            }
            if (undefined !== $.trim(scope.hideKsxzBtn) && "" !== $.trim(scope.hideKsxzBtn) && "false" !== scope.hideKsxzBtn) {
                scope.isShowKsxz = false;
            } else {
                scope.isShowKsxz = true;
            }
            //设置组件高度
            if (undefined !== $.trim(scope.qxHeight) && "" !== $.trim(scope.qxHeight)) {
//                height = scope.qxHeight + "px";
                height = scope.qxHeight;
                $(element[0]).children(".qxInput").css("height", height);
            }
            //设置输入框长度，默认为70%
            if (undefined !== $.trim(scope.qxWidth) && "" !== $.trim(scope.qxWidth)) {
                $(element[0]).children(".qxInput").css("width", scope.qxWidth);
            }
            //搜索按钮样式
            if (undefined !== $.trim(scope.searchBtnClass) && "" !== $.trim(scope.searchBtnClass)) {
                $(element[0]).children("#serarchBtn").addClass(scope.searchBtnClass);
            } else {
                $(element[0]).children("#serarchBtn").addClass("qxSs");
            }
            //快速选择按钮样式
            if (undefined !== $.trim(scope.ksxzBtnClass) && "" !== $.trim(scope.ksxzBtnClass)) {
                $(element[0]).children("#ksxzBtn").addClass(scope.ksxzBtnClass);
            } else {
                $(element[0]).children("#ksxzBtn").addClass("qxKs");
            }

            var times;
            (undefined === scope.hTime && "" === $.trim(scope.hTime)) ? times = 3000 : times = parseInt(scope.hTime);
            /**
             *  为了达到在输入框获得焦点时才主动去获取联想数据，并且数据返回后进行数据联想
             *  所以自动联想控件，新增 customExecuteFoucsFunction 属性，目的是
             *  控制自动联想控件获得焦点时执行的主方法时机
             * @param {type} config  自动联想控件配置对象
             * @param {type} autoCompleteByFocus 自动联想控件的主方法
             */
            var customExecuteFoucsFunction = function (config, autoCompleteByFocus) {
                if ($rootScope.userGroupType === "JiaKe") {
                    //判断rootSCope中是否存在该对象，如果存在则不进行初始化操作
                    if ($rootScope.areaQuickSearchData == null && !$rootScope.areaQuickSearchQuerying) {
                        $rootScope.areaQuickSearchQuerying = true;
                        Area.findQuickSearchData({path: 'findQuickSearchData'}, function (data) {
                            $rootScope.areaQuickSearchQuerying = false;
                            $rootScope.areaQuickSearchData = COSSUtils.getAreaQuickSearchDataAppendTitle(data, 'community');

                            config.data = $rootScope.areaQuickSearchData;
                            autoCompleteByFocus();
                        }, function () {
                            $rootScope.areaQuickSearchQuerying = false;
                        });
                    } else if ($rootScope.areaQuickSearchData != null) {
                        config.data = $rootScope.areaQuickSearchData;
                        autoCompleteByFocus();
                    }
                } else {
                    //判断rootSCope中是否存在该对象，如果存在则不进行初始化操作
                    if ($rootScope.areaQuickSearchJiKeData == null && !$rootScope.areaQuickSearchJiKeQuerying) {
                        $rootScope.areaQuickSearchJiKeQuerying = true;
                        JiKeArea.findQuickSearchJiKeData(function (data) {
                            $rootScope.areaQuickSearchJiKeQuerying = false;
                            $rootScope.areaQuickSearchJiKeData = COSSUtils.getAreaQuickSearchDataAppendTitle(data, 'jike');

                            config.data = $rootScope.areaQuickSearchJiKeData;
                            autoCompleteByFocus();
                        }, function () {
                            $rootScope.areaQuickSearchJiKeQuerying = false;
                        });
                    } else if ($rootScope.areaQuickSearchJiKeData != null) {
                        config.data = $rootScope.areaQuickSearchJiKeData;
                        autoCompleteByFocus();
                    }
                }
            };

            $("#searchInput").bigAutocomplete({
                data: $rootScope.userGroupType === "JiaKe" ? $rootScope.areaQuickSearchData : $rootScope.areaQuickSearchJiKeData,
                size: 5,
                callback: function (data) {
                    scope.changeResult = undefined;
                    $('#searchInput').popover('hide');
                    if (undefined === data) {
                        scope.searchClick();
                    } else {
                        //保存用户选择的自动联想内容
                        scope.tempData = data;
                        scope.searchKey = data.title;
                        scope.$apply();
                        scope.searchClick();
                    }
                },
                customExecuteFoucsFunction: customExecuteFoucsFunction
            });

            //传播点击事件
            scope.emitSearchResult = function (data) {
                scope.$emit("eventQuickSearch", data);
            };
            //搜索按钮点击事件
            scope.searchClick = function () {
                //判断规则
                //如果用户是点击联想内容后点击搜索的则直接进行搜索
                //如果用户直接输入文字点击搜索
                //A/B/C 和 A/B 直接进行匹配 title 发现则发出事件
                //A 匹配title 找到则提示用户选择内容
                if (undefined === scope.tempData || scope.searchKey !== scope.tempData.title) {
                    if (undefined !== scope.searchKey && "" !== $.trim(scope.searchKey)) {
                        //判断输入的内容是否能匹配上
                        data = searchTextLengTH($.trim(scope.searchKey));
                        if (undefined !== data) {
//                            console.info(data);
                            scope.emitSearchResult(data);
                            return;
                        }
                        $('#searchInput').popover({
                            content: (undefined === scope.qxErrorInfo && "" === $.trim(scope.qxErrorInfo)) ? '输入' + scope.showPlaceholder + '信息有误' : scope.qxErrorInfo
                        });
                        $('#searchInput').popover('show');
                        //设置提示框三秒后消失
                        setTimeout("$('#searchInput').popover('destroy');", times);
                    } else {
//                        $('#searchInput').popover({
//                            content: "请先输入地市/区县/小区"
//                        });
//                        $('#searchInput').popover('show');
//                        //设置提示框三秒后消失
//                        setTimeout("$('#searchInput').popover('destroy');", times);
                        scope.emitSearchResult({"type": "all"});
                    }
                } else {
//                    console.info("走你");
                    scope.emitSearchResult(scope.tempData);
//                    scope.tempData = undefined;
                }

            };
            //ng-change事件
            scope.listenInputChange = function () {
                if (!scope.isShowSearch) {//如果隐藏了搜索按钮则自动监听ng-change事件
                    scope.checkChangeInputValue();
                }
            };
            //记录输入是否是错误，避免正确时也提示
            scope.changeResult = undefined;
            scope.checkChangeInputValue = function () {
                if (undefined === scope.tempData || scope.searchKey !== scope.tempData.title) {
                    if (undefined !== scope.searchKey && "" !== $.trim(scope.searchKey)) {
                        //判断输入的内容是否能匹配上
                        data = searchTextLengTH($.trim(scope.searchKey));
                        if (undefined !== data) {
                            scope.emitSearchResult(data);
                            scope.changeResult = undefined;
                            $('#searchInput').popover('hide');
                            return;
                        }
                        scope.changeResult = "error";
                        scope.emitSearchResult({"type": "error"});
                        $('#searchInput').popover({
                            content: (undefined === scope.qxErrorInfo && "" === $.trim(scope.qxErrorInfo)) ? '未查询到输入 ' + scope.showPlaceholder + ' 的信息' : scope.qxErrorInfo,
                            trigger: 'manual'//避免出现提示框不正常出现
                        });
//                        $('#searchInput').popover('show');
                        //设置提示框三秒后消失
//                        setTimeout("$('#searchInput').popover('destroy');", times);
                    } else {
                        scope.emitSearchResult({"type": "all"});
                        scope.changeResult = undefined;
                        $('#searchInput').popover('hide');
                    }
                } else {
                    scope.changeResult = undefined;
                    $('#searchInput').popover('hide');
                    scope.emitSearchResult(scope.tempData);
                }
            };

            var searchTextLengTH = function (searckKey) {
                var result = undefined;
                var lastIndex = searckKey.lastIndexOf("/");
                if (lastIndex === searckKey.length - 1) {
                    searckKey = searckKey.substr(0, lastIndex);
                }
                var type = "";
                var count = (searckKey.split("/")).length;
                if (count === 1) {
                    type = "city";
                }
                if (count === 2) {
                    type = "county";
                } else if (count === 3) {
                    type = $rootScope.userGroupType === "JiaKe" ? "community" : "jike";
                }
                if ($rootScope.userGroupType === "JiaKe") {
                    $rootScope.areaQuickSearchData.forEach(function (data) {
                        if (data.type === type && data.title === searckKey) {
                            result = data;
                        }
                    });
                } else {
                    $rootScope.areaQuickSearchJiKeData.forEach(function (data) {
                        if (data.type === type && data.title === searckKey) {
                            result = data;
                        }
                    });
                }

                return result;
            };

            scope.myBlur = function () {
                if (scope.isShowSearch || undefined === scope.searchKey
                        || "" === $.trim(scope.searchKey)) {//如果隐藏了搜索按钮则自动监听ng-change事件
                    return;
                }
//                console.info("失去焦点");
                if (undefined === scope.changeResult) {
                    return;
                }
                $('#searchInput').popover('show');
                setTimeout("$('#searchInput').popover('hide');", times);
            };
            /**
             * 在使用切换页面时，若两个页面使用同个指令，而指令中出现针对同个ID元素的操作
             * 会出现指令加载时，初始化的为旧页面的元素，而新页面的元素未进行加载的情况，
             * 所以，监听地址变化时就主动的去移除该ID的元素，以避免该种情况发生。
             */
//            scope.$on("$locationChangeSuccess", function () {
//                $("#searchInput").remove();
//                $("#ksxzBtn").remove();
//            });
        }
    };
});