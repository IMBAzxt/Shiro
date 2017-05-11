
// 产品代号
// jjk 家集客
// coss 内容运营支撑平台
// vta 视频专题分析
var product = "jjk";

// 项目代号，默认test（开发演示使用）
var project = "test";

// 产品版本号
var version = "3.4";

//获得cookie数据
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//设置cookie
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/jiajike";
}
//如果cookie中存在产品代号则使用cookie中的
var productTmp = getCookie("product");
if (null != productTmp) {
    product = productTmp;
} else {
    setCookie("product", product);
}

var serviceTypes = [
    {id: "flow", name: "基础流", metrics: [
            'composite', 'server_delay', 'client_delay', 'up_speed', 'down_speed', 'up_total_bytes', 'down_total_bytes', 'up_retry_rate',
            'down_retry_rate', 'tcp_success_rate', 'up_max_speed', 'down_max_speed'
        ]},
    {id: "web", name: "网页", metrics: [
            'composite', 'server_delay', 'client_delay', 'resp_delay', 'first_resp_pkt_delay',
            'download_duration', 'download_speed', 'upload_speed', 'resp_success_rate2', 'resp_success_rate', 'resp_fail_rate',
            'resp_timeout_rate', 'resp_server_fail_rate', 'resp_client_fail_rate'
        ]},
    {id: "game", name: "游戏", metrics: [
            'composite', 'server_delay', 'client_delay', 'up_speed', 'down_speed', 'up_total_bytes', 'down_total_bytes', 'up_retry_rate',
            'down_retry_rate', 'login_delay', 'access_delay'
        ]},
    {id: "video", name: "视频", metrics: [
            'composite', 'video_down_speed', 'video_play_delay', 'video_success_play_rate', 'video_content_retry_rate', 'video_block_times',
//            'video_buffer_duration','video_buffer_speed'
        ]}
];

//timeliness    及时性
//stability     稳定性
//reliability   可靠性
var metrics = [
    // isPercent 是否是百分比，category综合评分指标类型（及时性/稳定性/可靠性），max百分比进度条最大值，unit显示单位，qd质差依据是升序还是降序，invalidValue条件过滤时过滤无效值，middleValue关联话单时中间值（高低箭头不同）
    {id: "composite", name: "综合评分", isPercent: true, category: "", max: "100", unit: "", qd: "asc", invalidValue: "0", middleValue: 95},
    {id: "server_delay", name: "服务端时延", isPercent: false, category: "timeliness", max: "100", unit: "ms", qd: "desc", invalidValue: "-1", middleValue: 50},
    {id: "client_delay", name: "客户端时延", isPercent: false, category: "timeliness", max: "100", unit: "ms", qd: "desc", invalidValue: "-1", middleValue: 50},
    {id: "up_speed", name: "上行流速率", isPercent: false, category: "stability", max: "100", unit: "kbps", qd: "asc", invalidValue: "0", middleValue: 500},
    {id: "down_speed", name: "下行流速率", isPercent: false, category: "stability", max: "100", unit: "kbps", qd: "asc", invalidValue: "0", middleValue: 500},
    {id: "up_total_bytes", name: "上行总流量", isPercent: false, max: "100", unit: "GB", qd: "asc", invalidValue: "-1", middleValue: 1},
    {id: "down_total_bytes", name: "下行总流量", isPercent: false, max: "100", unit: "GB", qd: "asc", invalidValue: "-1", middleValue: 1},
    {id: "up_add_down_byte", name: "上下行总流量", isPercent: false, max: "100", unit: "GB", qd: "asc", invalidValue: "-1", middleValue: 1},
    {id: "up_total_bytes_k", name: "上行总流量", isPercent: false, max: "100", unit: "KB", qd: "asc", invalidValue: "-1", middleValue: 10},
    {id: "down_total_bytes_k", name: "下行总流量", isPercent: false, max: "100", unit: "KB", qd: "asc", invalidValue: "-1", middleValue: 10},
    {id: "up_add_down_byte_k", name: "上下行总流量", isPercent: false, max: "100", unit: "KB", qd: "asc", invalidValue: "-1", middleValue: 10},
    {id: "up_retry_rate", name: "上行重传率", isPercent: true, category: "reliability", max: "100", unit: "%", qd: "desc", invalidValue: "-1", middleValue: 10},
    {id: "down_retry_rate", name: "下行重传率", isPercent: true, category: "reliability", max: "100", unit: "%", qd: "desc", invalidValue: "-1", middleValue: 10},
    {id: "tcp_success_rate", name: "TCP连接成功率", isPercent: true, category: "reliability", max: "100", unit: "%", qd: "asc", invalidValue: "-1", middleValue: 80},
    {id: "up_max_speed", name: "上行峰值流速率", isPercent: false, category: "stability", max: "100", unit: "kbps", qd: "asc", invalidValue: "0", middleValue: 500},
    {id: "down_max_speed", name: "下行峰值流速率", isPercent: false, category: "stability", max: "100", unit: "kbps", qd: "asc", invalidValue: "0", middleValue: 500},
    {id: "download_duration", name: "页面显示时延", isPercent: false, category: "timeliness", max: "100", unit: "ms", qd: "desc", invalidValue: "-1", middleValue: 500},
    {id: "resp_delay", name: "页面响应时延", isPercent: false, category: "timeliness", max: "100", unit: "ms", qd: "desc", invalidValue: "-1", middleValue: 100},
    {id: "first_resp_pkt_delay", name: "页面首包时延", isPercent: false, category: "timeliness", max: "100", unit: "ms", qd: "desc", invalidValue: "-1", middleValue: 100},
    {id: "download_speed", name: "页面下载速率", isPercent: false, category: "stability", max: "100", unit: "kbps", qd: "asc", invalidValue: "0", middleValue: 500},
    {id: "upload_speed", name: "页面上传速率", isPercent: false, category: "stability", max: "100", unit: "kbps", qd: "asc", invalidValue: "0", middleValue: 500},
    {id: "resp_success_rate2", name: "页面响应成功率", isPercent: true, category: "", max: "100", unit: "%", qd: "asc", invalidValue: "-1", middleValue: 80},
    {id: "resp_success_rate", name: "页面显示成功率", isPercent: true, category: "reliability", max: "100", unit: "%", qd: "asc", invalidValue: "-1", middleValue: 80},
    {id: "resp_timeout_rate", name: "页面应答超时率", isPercent: true, category: "reliability", max: "100", unit: "%", qd: "desc", invalidValue: "-1", middleValue: 10},
    {id: "resp_fail_rate", name: "页面应答失败率", isPercent: true, category: "reliability", max: "100", unit: "%", qd: "desc", invalidValue: "-1", middleValue: 10},
    {id: "resp_server_fail_rate", name: "服户端错误率", isPercent: true, category: "reliability", max: "100", unit: "%", qd: "desc", invalidValue: "-1", middleValue: 10},
    {id: "resp_client_fail_rate", name: "客户端错误率", isPercent: true, category: "reliability", max: "100", unit: "%", qd: "desc", invalidValue: "-1", middleValue: 10},
    {id: "login_delay", name: "登录时延", isPercent: false, category: "timeliness", max: "100", unit: "ms", qd: "desc", invalidValue: "-1", middleValue: 100},
    {id: "login_success_rate", name: "登录成功率", isPercent: true, category: "reliability", max: "100", unit: "%", qd: "asc", invalidValue: "-1", middleValue: 80},
    {id: "access_delay", name: "访问时延", isPercent: false, category: "timeliness", max: "100", unit: "ms", qd: "desc", invalidValue: "-1", middleValue: 100},
    {id: "video_down_speed", name: "视频下载速率", isPercent: false, category: "stability", max: "100", unit: "kbps", qd: "asc", invalidValue: "0", middleValue: 500},
    {id: "video_play_delay", name: "视频初始缓冲时延", isPercent: false, category: "timeliness", max: "100", unit: "ms", qd: "desc", invalidValue: "-1", middleValue: 100},
    {id: "video_buffer_duration", name: "视频缓冲时长", isPercent: false, category: "timeliness", max: "100", unit: "ms", qd: "desc", invalidValue: "-1", middleValue: 500},
    {id: "video_buffer_speed", name: "视频缓冲速率", isPercent: false, category: "stability", max: "100", unit: "kbps", qd: "asc", invalidValue: "0", middleValue: 500},
    {id: "video_success_play_rate", name: "视频初始播放成功率", isPercent: true, category: "reliability", max: "100", unit: "%", qd: "asc", invalidValue: "-1", middleValue: 80},
    {id: "video_content_retry_rate", name: "视频内容重传率", isPercent: true, ategory: "reliability", max: "100", unit: "%", qd: "desc", invalidValue: "-1", middleValue: 10},
    {id: "video_block_times", name: "视频卡顿频次", isPercent: false, category: "stability", max: "100", unit: "次", qd: "desc", invalidValue: "-1", middleValue: 5},
    {id: "log_count", name: "记录数", unit: "个", invalidValue: "-1", middleValue: 100},
    {id: "tcp_count", name: "访问量", unit: "次", invalidValue: "-1", middleValue: 100},
    {id: "up_add_down_speed", name: "访问速率", unit: "kbps", invalidValue: "0", middleValue: 100},
    {id: "city_name", name: "地市", unit: ""},
    {id: "county_name", name: "区县", unit: ""},
    {id: "community_name", name: "小区", unit: ""},
    {id: "jike_name", name: "集客", unit: ""},
    {id: "up_mbps_d", name: "上行总流量", isPercent: false, max: "100", unit: "Mbps", qd: "asc", invalidValue: "-1", middleValue: 1},
    {id: "down_mbps_d", name: "下行总流量", isPercent: false, max: "100", unit: "Mbps", qd: "asc", invalidValue: "-1", middleValue: 1},
    {id: "up_add_down_mbps_d", name: "上下行总流量", isPercent: false, max: "100", unit: "Mbps", qd: "asc", invalidValue: "-1", middleValue: 1},
    {id: "up_add_down_gbps_d", name: "上下行总流量", isPercent: false, max: "100", unit: "Gbps", qd: "asc", invalidValue: "-1", middleValue: 1},
    {id: "total_mbps_d", name: "上下行总流量", isPercent: false, max: "100", unit: "Mbps", qd: "asc", invalidValue: "-1", middleValue: 1},
    {id: "idc_mbps_d", name: "IDC流量", isPercent: false, max: "100", unit: "Mbps", qd: "asc", invalidValue: "-1", middleValue: 1},
    {id: "cache_mbps_d", name: "省外流量", isPercent: false, max: "100", unit: "Mbps", qd: "asc", invalidValue: "-1", middleValue: 1},
    {id: "province_outer_mbps_d", name: "Cache流量", isPercent: false, max: "100", unit: "Mbps", qd: "asc", invalidValue: "-1", middleValue: 1},
    {id: "direct_link_mbps_d", name: "直连流量", isPercent: false, max: "100", unit: "Mbps", qd: "asc", invalidValue: "-1", middleValue: 1},
    {id: "net_outer_mbps_d", name: "网外流量", isPercent: false, max: "100", unit: "Mbps", qd: "asc", invalidValue: "-1", middleValue: 1},
    {id: "other_mbps_d", name: "其他流量", isPercent: false, max: "100", unit: "Mbps", qd: "asc", invalidValue: "-1", middleValue: 1}
];

var initMetrics = function () {
    metrics.forEach(function (metric) {
        var metricStrs = metric.id.split("_");
        var attrId = metricStrs[0];
        for (var i = 1; i < metricStrs.length; i++) {
            var str = metricStrs[i];
            attrId += str.replace(/(\w)/, function (v) {
                return v.toUpperCase()
            });
        }
        metric.attrId = attrId;
    });
};
//根据指标ID获得具体指标
var getMetricById = function (id) {
    var metric
    for (var i = 0; i < metrics.length; i++) {
        if (metrics[i].id === id) {
            metric = metrics[i];
            break;
        }
    }
    return metric;
}

//initMetrics();
//重点游戏列表
var importanceGame = [
    {id: "2082", name: "英雄联盟"},
    {id: "2140", name: "穿越火线"},
    {id: "2055", name: "地下城与勇士"}
];
//重点视频列表
var importanceVideo = [
    {id: "780", name: "优酷"},
    {id: "787", name: "乐视"},
    {id: "795", name: "爱奇艺"},
    {id: "1541", name: "和视频"},
    {id: "802", name: "腾讯视频"},
    {id: "809", name: "风行"},
    {id: "796", name: "搜狐视频"},
    {id: "799", name: "芒果TV"},
//    {id: "530", name: "迅雷"},
    {id: "794", name: "暴风影音"},
    {id: "771", name: "PPTV"},
];

// （账号）用户组Id
var userGroupTypes = [
    {id: "JiaKe", name: "家客"},
    {id: "JiKe", name: "集客"},
]

// 出口列表，下面顺序不能变，是显示顺序
var interfaces = [
    {id: 22, name: "省网出口"},
    {id: 21, name: "IDC出口"},
    {id: 50, name: "Cache出口"},
    {id: 23, name: "三方出口"},
];
//根据出口id获得名称
var getInterfaceNameById = function (id) {
    var interface
    for (var i = 0; i < interfaces.length; i++) {
        if (interfaces[i].id === id) {
            interface = interfaces[i];
            break;
        }
    }
    if (interface != undefined) {
        return interface.name;
    }
    return tostring(id);
}

//ServiceException 自定义错误代码映射关系
// msg          提示信息
// custom     是否由自定义函数处理，如果为True则统一逻辑不进行任何处理
var exceptionTypes = {
    "userNameIsExist": {msg: "用户名已存在！", custom: false},
    "groupNameIsExist": {msg: "角色名称已存在！", custom: false},
    "permissionDenied": {msg: "无效请求，请重试。", custom: false},
    "reportCreateSqlError": {msg: "建表SQL语法错误，请检查后重试...", custom: false},
    "reportInsertSqlError": {msg: "报表数据函数语法错误，请检查后重试...", custom: false},
    "reportConvergeSqlError": {msg: "合计SQL语法错误，请检查后重试...", custom: false},
}

//话单数据对应关系
var csvFileMapping = [
    {id: 1, name: 'Length'},
    {id: 2, name: 'City'},
    {id: 3, name: 'Interface'},
    {id: 4, name: 'xDR ID'},
    {id: 5, name: 'UL TMAID'},
    {id: 6, name: 'UL LINK Index'},
    {id: 7, name: 'DL TMAID'},
    {id: 8, name: 'DL LINK Index'},
    {id: 9, name: 'App Type Code'},
    {id: 10, name: 'Procedure Start Time'},
    {id: 11, name: 'Procedure End Time'},
    {id: 12, name: 'Protocol Type'},
    {id: 13, name: 'App Type'},
    {id: 14, name: 'App Sub-type'},
    {id: 15, name: 'App Content'},
    {id: 16, name: 'App Status'},
    {id: 17, name: 'USER_IPv4'},
    {id: 18, name: 'USER_IPv6'},
    {id: 19, name: 'USER_PORT'},
    {id: 20, name: 'L4 protocal'},
    {id: 21, name: 'App Server IP_IPv4'},
    {id: 22, name: 'App Server IP_IPv6'},
    {id: 23, name: 'App Server Port'},
    {id: 24, name: 'UL Data'},
    {id: 25, name: 'DL Data'},
    {id: 26, name: 'UL IP Packet'},
    {id: 27, name: 'DL IP Packet'},
    {id: 28, name: '上行TCP乱序报文数'},
    {id: 29, name: '下行TCP乱序报文数'},
    {id: 30, name: '上行TCP重传报文数'},
    {id: 31, name: '下行TCP重传报文数'},
    {id: 32, name: 'TCP建链响应时延（ms）'},
    {id: 33, name: 'TCP建链确认时延（ms）'},
    {id: 34, name: 'UL_IP_FRAG_PACKETS'},
    {id: 35, name: 'DL_IP_FRAG_PACKETS'},
    {id: 36, name: 'TCP建链成功到第一条事务请求的时延（ms）'},
    {id: 37, name: '第一条事务请求到其第一个响应包时延（ms）'},
    {id: 38, name: '窗口大小'},
    {id: 39, name: 'MSS大小'},
    {id: 40, name: 'TCP建链尝试次数'},
    {id: 41, name: 'TCP连接状态指示'},
    {id: 42, name: '会话是否结束标志'},
    {id: 43, name: 'TOS'},
    {id: 44, name: 'ADSL账号'},
    {id: 45, name: 'BAS_IPv4'},
    {id: 46, name: 'BAS_IPv6'},
    {id: 47, name: 'BRAS名称'},
    {id: 48, name: '话单输出条件标识'},
    {id: 49, name: '上行 SessionID'},
    {id: 50, name: '下行 SessionID'},
    {id: 51, name: 'HTTP版本'},
    {id: 52, name: '请求方向'},
    {id: 53, name: '事务类型'},
    {id: 54, name: 'HTTP/WAP事务状态'},
    {id: 55, name: '第一个HTTP响应包时延(MS)'},
    {id: 56, name: '最后一个HTTP内容包的时延(MS)'},
    {id: 57, name: '最后一个ACK确认包的时延（ms）'},
    {id: 58, name: 'HOST'},
    {id: 59, name: 'URI'},
    {id: 60, name: 'X-Online-Host'},
    {id: 61, name: 'User-Agent'},
    {id: 62, name: 'HTTP_content_type'},
    {id: 63, name: 'refer_URI'},
    {id: 64, name: 'Cookie'},
    {id: 65, name: 'Content-Length'},
    {id: 66, name: '目标行为'},
    {id: 67, name: 'Wtp中断类型'},
    {id: 68, name: 'wtp中断原因'},
    {id: 69, name: 'title'},
    {id: 70, name: 'key word'},
    {id: 71, name: '业务行为标识'},
    {id: 72, name: '业务完成标识'},
    {id: 73, name: '业务时延(ms)'},
    {id: 74, name: '浏览工具'},
    {id: 75, name: '门户应用集合'},
    {id: 76, name: '流控标识'},
    {id: 77, name: '最后一个HTTP内容包的时延（下行非对称）'},
    {id: 78, name: 'TCP三次握手时延（上行非对称）'},
    {id: 79, name: '第一条事务请求到其第一个响应包时延（上行非对称）'},
    {id: 80, name: '第一个HTTP响应包时延（上行非对称）'},
    {id: 81, name: '最后一个HTTP内容包的时延（上行非对称）'},
    {id: 82, name: '是否HTTP业务'},
    {id: 83, name: 'GameUserAccount'},
    {id: 84, name: '登录开始时间'},
    {id: 85, name: '登录完成时间'},
    {id: 86, name: '通信方式'},
    {id: 87, name: '是否付费'},
    {id: 88, name: '是否登录成功'},
    {id: 89, name: '过程状态'},
];