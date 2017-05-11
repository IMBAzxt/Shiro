/**
 * 路由控制
 * @param {type} $stateProvider      ui-router插件
 * @param {type} $urlRouterProvider  ui-router插件
 * @param {type} $ocLazyLoadProvider 懒加载插件
 * @returns {undefined}
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/flowCheck");
    $ocLazyLoadProvider.config({
        debug: false
    });
    $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "module/login/login.html",
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: ['module/login/login.css']
                            }, {
                                name: 'login.controller',
                                files: ['module/login/login.js']
                            }]);
                    }
                }
            })
            .state('index', {
                url: "/index",
                templateUrl: "module/main.html",
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{}]);
                    }
                }
            })
            .state('index.flowCheck', {
                url: "/flowCheck",
                templateUrl: "module/flowCheck/index.html",
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                serie: true,
                                files: ['module/flowCheck/css/flowCheck.css']
                            }, {
                                name: 'flowCheck.controller',
                                files: ['module/flowCheck/js/controller.js']
                            }]);
                    }
                }
            })
            .state('index.flowCheck.room', {
                url: "/room",
                templateUrl: "module/flowCheck/views/room/index.html",
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                serie: true,
                                files: ['module/flowCheck/views/room/css/room.css']
                            }, {
                                name: 'room.controller',
                                files: ['module/flowCheck/views/room/js/controller.js']
                            }]);
                    }
                }
            })
            .state('index.flowCheck.dsf', {
                url: "/dsf",
                templateUrl: "module/flowCheck/views/dsf/index.html",
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                serie: true,
                                files: ['module/flowCheck/views/dsf/css/dsf.css']
                            }, {
                                name: 'dsf.controller',
                                files: ['module/flowCheck/views/dsf/js/controller.js']
                            }]);
                    }
                }
            })
            .state('index.flowCheck.idc', {
                url: "/idc",
                templateUrl: "module/flowCheck/views/idc/index.html",
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                serie: true,
                                files: ['module/flowCheck/views/idc/css/idc.css']
                            }, {
                                name: 'idc.controller',
                                files: ['module/flowCheck/views/idc/js/controller.js']
                            }]);
                    }
                }
            })
            .state('index.flowCheck.cache', {
                url: "/cache",
                templateUrl: "module/flowCheck/views/cache/index.html",
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                serie: true,
                                files: ['module/flowCheck/views/cache/css/cache.css']
                            }, {
                                name: 'cache.controller',
                                files: ['module/flowCheck/views/cache/js/controller.js']
                            }]);
                    }
                }
            })
            .state('index.flowCheck.service', {
                url: "/service",
                templateUrl: "module/flowCheck/views/service/index.html",
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                serie: true,
                                files: ['module/flowCheck/views/service/css/service.css']
                            }, {
                                name: 'service.controller',
                                files: ['module/flowCheck/views/service/js/controller.js']
                            }]);
                    }
                }
            })
            ;
}

cossApp
        .config(config)
        .run(function ($rootScope, $state, $templateCache, $location) {
            $rootScope.$state = $state;
            $rootScope.$on('$stateChangeStart', function (event, next, current) {
                //禁止html模板页面缓存，如果页面有其他api请求可以去掉，如果没有，angularjs对于静态的html页面会缓存
                if (current !== undefined) {
                    $templateCache.remove(current.templateUrl);
                }

                // 如果用户不存在
                if (!$rootScope.user || !$rootScope.user.name || !$rootScope.user.id) {
//                    event.preventDefault();// 取消默认跳转行为
                    $location.location = "#/login"; //跳转到登录界面
                }
            });
        });
