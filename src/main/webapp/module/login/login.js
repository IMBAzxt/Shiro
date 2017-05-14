
(function () {
    var loginAPP = angular.module('login', [
        'ngResource',
        'ngAnimate',
        'ngSanitize',
        'ui.router', // angularjs路由器
        'oc.lazyLoad', // js文件按需加载
        'ui.bootstrap' // bootstrap界面
    ]);


    var login = {};

    login.loginCtrl = function ($scope, $rootScope, $http, $location, $resource) {
        $scope.login = function () {
            $http({
                method: 'POST',
                url: 'api/account/login',
                data: $("form").serialize(),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function () {
                var url = $location.absUrl();
                console.log(url.substring(0, url.indexOf("login.html")));
                window.location.href = url.substring(0, url.indexOf("login.html"));
            }).error(function (data) {
                console.log("登录失败");
            });
        };

    };

    login.logoutCtrl = function ($scope, $resource) {
        $scope.logout = function () {
            $resource('api/account/logout', {}, {
                logout: {method: 'GET', params: {action: 'logout'}}
            }).logout({}, function (data) {
                //这里用reload是因为用$location的话，会出现2个窗口，第二个窗口无法登出到Login页面的问题。
                window.location.reload();
            }, function (error) {
                console.log(error);
            });
        };
    };


    loginAPP
            .controller('loginCtrl', login.loginCtrl)
            .controller('logoutCtrl', login.logoutCtrl)
            ;

})();