/**
 * 权限、登录模块
 * @author 郑学涛 <zhengxuetao@haohandata.com.cn>
 * @copyright 北京浩瀚深度信息技术股份有限公司
 * @createDate 2017/02/08
 * @updateDate 2016/02/08
 */

coss.security = {};

coss.security.securityInterceptor = function ($q, $rootScope, $location) {
    return {
        request: function (config) {
            return config;
        },
        responseError: function (response) {
//            console.log(response.status + ":" + response.data);
            if (response.status === 401) {
                $rootScope.$broadcast('errorResponse', response.data);
                $rootScope.user = {};
                $location.location = "#/login";
            } else if (response.status === 403) {
                $rootScope.$broadcast('errorResponse', response.data);
            } else if (response.status === 404) {
                $rootScope.$broadcast('errorResponse', response.data);
                alert("未找到对应链接，或访问服务器失败");
            } else if (response.status === 405) {
                $rootScope.$broadcast('errorResponse', response.data);
            } else if (response.status === 415) {
                $rootScope.$broadcast('errorResponse', response.data);
            } else if (response.status === 500) {
                $rootScope.$broadcast('errorResponse', response.data);
            }
            return $q.reject(response);
        }
    };
};

coss.security.securityconfig = function ($httpProvider) {
    $httpProvider.interceptors.push('securityInterceptor');
};

cossApp
        .factory('securityInterceptor', ["$q", "$rootScope", coss.security.securityInterceptor])
        .config(['$httpProvider', coss.security.securityconfig])
        ;


angular.element(document).ready(function () {
    setSize();

    $.ajax({
        url: "api/auth/current_user",
        type: "GET",
        dataType: 'json',
        success: function (data) {
            if (data.id === 0) {
                window.location = "#/login"; 
            }
        },
        error: function (error) {
            //错误处理跳转到登录页面
            window.location = "#/login"; // just in case
        }

    });

    angular.bootstrap(document, ['cossApp']);
});