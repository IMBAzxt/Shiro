coss.login = {};

coss.login.loginCtrl = function ($scope, $rootScope, $http, $location, $resource, commonData) {
    $scope.login = function () {
        $http({
            method: 'POST',
            url: 'api/auth/login',
            data: $("form").serialize(),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function () {
            //登录完后立刻重新刷新用户的信息，请求后面加s参数，规避ie下相同的url获取换成的问题。
            $resource("api/auth/current_user?s=" + new Date().getTime(), {}, {}).get({}, function (data) {
                if (data.id === 0) {
                    $location.location = "#/login"; 
                } else {
                    $rootScope.user = data;
                    $location.path("#/index/flowCheck");
                }
            }, function (error) {
                console.log("获取用户失败");
            });
        }).error(function (data) {
            console.log("登录失败");
        });
    };

};

coss.login.logoutCtrl = function ($scope, $resource) {
    $scope.logout = function () {
        $resource('api/auth/logout', {}, {
            logout: {method: 'GET', params: {action: 'logout'}}
        }).logout({}, function (data) {
            //这里用reload是因为用$location的话，会出现2个窗口，第二个窗口无法登出到Login页面的问题。
            window.location.reload();
        }, function (error) {
            console.log(error);
        });
    };
};


angular.module('login.controller', [])
        .controller('loginCtrl', coss.login.loginCtrl)
        .controller('logoutCtrl', coss.login.logoutCtrl)
        ;