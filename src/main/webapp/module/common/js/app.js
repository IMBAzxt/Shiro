/**
 * 项目angularjs模块加载文件
 * 项目的基本模块加载在此文件中添加
 */
var coss = {}; //全局模块的根节点
var cossApp = {}; //全局angular对象
(function () {
    cossApp = angular.module('cossApp', [
        'ngResource',
        'ngAnimate',
        'ngSanitize',
        'ui.router', // angularjs路由器
        'oc.lazyLoad', // js文件按需加载
        'ui.bootstrap', // bootstrap界面
        'ui.select'
    ]);
})();