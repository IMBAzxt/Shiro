(function () {

    /**
     * 最顶层controller
     * @param {type} $scope
     * @param {type} $rootScope
     * @param {type} $state
     * @returns {undefined}
     */
    function MainCtrl($scope, $rootScope, $state, commonData) {
        //网站标题
        $scope.systemTitle = commonData.systemTitle;
        //请求状态
        $scope.RQ = {
            SUCCESS: 'SUCCESS',
            NODATA: 'NODATA',
            FAIL: 'FAIL',
            LOADING: 'LOADING'
        };

        //用于窗口高度变化时，页面内容高度自适应的系数。
        $scope.heightCoefficient = 1;
        $scope.$on('heigthResize', function (event, data) {
            $scope.heightCoefficient = data.h / 100;
        });

        /*---------- begin 时间控件配置 -----------*/
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
//        $scope.endTime = "2017-04-09";
//        var startday = new Date("2017-04-09");
//        $scope.logTime = new Date(startday).format("yyyyMMdd");
//        startday.getbeforeday(-6, "yyyy-MM-dd");
        $scope.endTime = new Date(yesterday).format("yyyy-MM-dd");
        var startday = new Date();
        startday.setDate(yesterday.getDate() - 7);
        $scope.startTime = new Date(startday).format("yyyy-MM-dd");
        $scope.logTime = $scope.endTime;
        laydate.skin('yalan');
        $scope.endTimeClick = function () {
            laydate({
                elem: '#endTime', //指定input框的id；如果不设置，火狐不兼容。
                istime: false, //是否需要小时、分钟、秒的选择
                format: 'YYYY-MM-DD', //时间格式
                max: new Date(yesterday).format("yyyy-MM-dd"), //最大时间
                choose: function (datas) { //选择日期完毕的回调
                    $scope.endTime = datas;
                    var startTime = new Date(datas);
                    $scope.logTime = new Date(startTime).format("yyyyMMdd");
                    startTime.setDate(startTime.getDate() - 7);
                    $scope.startTime = new Date(startTime).format("yyyy-MM-dd");
                    $rootScope.$broadcast('endTimeChange', $scope.endTime);
                }
            });
        };
        /*---------- end 时间控件配置 -----------*/
    }

    cossApp
            .controller('MainCtrl', MainCtrl);
})();
