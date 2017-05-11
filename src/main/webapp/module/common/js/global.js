//$(document).ready(function () {
//    setSize();
//});

var setSize = function () {
    windowResize = Math.random();
    var rem_w = 18; // 1rem=40px, 720px/40px=18rem;
    var min_w = 240; // min 240px
    var max_w = 999999; // max 1080px
    var fix_id = document.getElementById('resizeid');
    var win_w = document.documentElement.clientWidth;
    if (win_w <= min_w) {
        fix_id.style.fontSize = min_w / rem_w + 'px';
    } else if (win_w > min_w && win_w < max_w) {
        fix_id.style.fontSize = win_w / rem_w + 'px';
    } else {
        fix_id.style.fontSize = max_w / rem_w + 'px';
    }
};

function deepClone(obj) {
    var result, objClass = isClass(obj);
    //确定result的类型
    if (objClass === "Object") {
        result = {};
    } else if (objClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (var key in obj) {
        var copy = obj[key];
        if (isClass(copy) == "Object") {
            result[key] = arguments.callee(copy); //递归调用
        } else if (isClass(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}
//返回传递给他的任意对象的类
function isClass(o) {
    if (o === null)
        return "Null";
    if (o === undefined)
        return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}

String.prototype.parseDate = function () {//val格式必须为"yyyy-mm-dd"
    return new Date(this.replace(/-/g, "/"));
    //  【（/-/g, "/"）】表示将所有短横线"-"替换为斜杠"/",
    //  "/g"意思就是：global可选标志，带这个标志表示替换将针对每一行中每个匹配的串进行，否则则只替换行中第一个匹配串。
    //  如：we.fdffddfwe.加上/g后，则2个we都会出来；
};

//获取当月的天数
Date.prototype.getMonthDays = function () {
    var monthStartDate = new Date(this.getYear(), this.getMonth(), 1);
    var monthEndDate = new Date(this.getYear(), this.getMonth() + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
};

//获取上月开始时间
Date.prototype.getLastMonthStartDate = function () {
    var nowDay = this.getDate(); //当前日
    var nowMonth = this.getMonth(); //当前月
    var nowYear = this.getFullYear(); //当前年
    var lastMonthStartDate = new Date(nowYear, nowMonth, nowDay);
    lastMonthStartDate.setDate(1);
    lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);
    return lastMonthStartDate;
};

//获取上月结束时间
Date.prototype.getLastMonthEndDate = function () {
    var lastmonthdate = this.getLastMonthStartDate();
    var nowDay = lastmonthdate.getDate(); //当前日
    var nowMonth = lastmonthdate.getMonth(); //当前月
    var nowYear = lastmonthdate.getFullYear(); //当前年
    var lastMonthEndDate = new Date(nowYear, nowMonth, nowDay);
    lastMonthEndDate.setDate(lastMonthEndDate.getMonthDays());
    lastMonthEndDate.setMonth(lastMonthEndDate.getMonth());
    return lastMonthEndDate;
};


Date.prototype.format = function (fmt)
{
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

//获取AddDayCount天前的日期,最后以format格式输出日期,format为空则不格式化
Date.prototype.getbeforeday = function (addDayCount, format) {
    this.setDate(this.getDate() + addDayCount);//获取AddDayCount天后的日期
    if (format != undefined) {
        return this.format(format);
    } else {
        return this;
    }
};

//获取AddHourCount小时前的日期,最后以format格式输出日期,format为空则不格式化
Date.prototype.getbeforehour = function (AddHourCount, format) {
    this.setHours(this.getHours() + AddHourCount);
    if (format != undefined) {
        return this.format(format);
    } else {
        return this;
    }
};


//saveAs方法兼容ie10以上 以及其他浏览起的blob流的下载
var saveAs = saveAs || (function (view) {
    "use strict";
    // IE <10 is explicitly unsupported
    if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return;
    }
    var doc = view.document
            // only get URL when necessary in case Blob.js hasn't overridden it yet
            , get_URL = function () {
                return view.URL || view.webkitURL || view;
            }
    , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
            , can_use_save_link = "download" in save_link
            , click = function (node) {
                var event = doc.createEvent("MouseEvents");
                event.initMouseEvent(
                        "click", true, false, view, 0, 0, 0, 0, 0
                        , false, false, false, false, 0, null
                        );
                node.dispatchEvent(event);
            }
    , webkit_req_fs = view.webkitRequestFileSystem
            , req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
            , throw_outside = function (ex) {
                (view.setImmediate || view.setTimeout)(function () {
                    throw ex;
                }, 0);
            }
    , force_saveable_type = "application/octet-stream"
            , fs_min_size = 0
            // See https://code.google.com/p/chromium/issues/detail?id=375297#c7 and
            // https://github.com/eligrey/FileSaver.js/commit/485930a#commitcomment-8768047
            // for the reasoning behind the timeout and revocation flow
            , arbitrary_revoke_timeout = 500 // in ms
            , revoke = function (file) {
                var revoker = function () {
                    if (typeof file === "string") { // file is an object URL
                        get_URL().revokeObjectURL(file);
                    } else { // file is a File
                        file.remove();
                    }
                };
                if (view.chrome) {
                    revoker();
                } else {
                    setTimeout(revoker, arbitrary_revoke_timeout);
                }
            }
    , dispatch = function (filesaver, event_types, event) {
        event_types = [].concat(event_types);
        var i = event_types.length;
        while (i--) {
            var listener = filesaver["on" + event_types[i]];
            if (typeof listener === "function") {
                try {
                    listener.call(filesaver, event || filesaver);
                } catch (ex) {
                    throw_outside(ex);
                }
            }
        }
    }
    , auto_bom = function (blob) {
        // prepend BOM for UTF-8 XML and text/* types (including HTML)
        if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
            return new Blob(["\ufeff", blob], {type: blob.type});
        }
        return blob;
    }
    , FileSaver = function (blob, name) {
        blob = auto_bom(blob);
        // First try a.download, then web filesystem, then object URLs
        var
                filesaver = this
                , type = blob.type
                , blob_changed = false
                , object_url
                , target_view
                , dispatch_all = function () {
                    dispatch(filesaver, "writestart progress write writeend".split(" "));
                }
        // on any filesys errors revert to saving with object URLs
        , fs_error = function () {
            // don't create more object URLs than needed
            if (blob_changed || !object_url) {
                object_url = get_URL().createObjectURL(blob);
            }
            if (target_view) {
                target_view.location.href = object_url;
            } else {
                var new_tab = view.open(object_url, "_blank");
                if (new_tab == undefined && typeof safari !== "undefined") {
                    //Apple do not allow window.open, see http://bit.ly/1kZffRI
                    view.location.href = object_url
                }
            }
            filesaver.readyState = filesaver.DONE;
            dispatch_all();
            revoke(object_url);
        }
        , abortable = function (func) {
            return function () {
                if (filesaver.readyState !== filesaver.DONE) {
                    return func.apply(this, arguments);
                }
            };
        }
        , create_if_not_found = {create: true, exclusive: false}
        , slice
                ;
        filesaver.readyState = filesaver.INIT;
        if (!name) {
            name = "download";
        }
        if (can_use_save_link) {
            object_url = get_URL().createObjectURL(blob);
            save_link.href = object_url;
            save_link.download = name;
            click(save_link);
            filesaver.readyState = filesaver.DONE;
            dispatch_all();
            revoke(object_url);
            return;
        }
        // Object and web filesystem URLs have a problem saving in Google Chrome when
        // viewed in a tab, so I force save with application/octet-stream
        // http://code.google.com/p/chromium/issues/detail?id=91158
        // Update: Google errantly closed 91158, I submitted it again:
        // https://code.google.com/p/chromium/issues/detail?id=389642
        if (view.chrome && type && type !== force_saveable_type) {
            slice = blob.slice || blob.webkitSlice;
            blob = slice.call(blob, 0, blob.size, force_saveable_type);
            blob_changed = true;
        }
        // Since I can't be sure that the guessed media type will trigger a download
        // in WebKit, I append .download to the filename.
        // https://bugs.webkit.org/show_bug.cgi?id=65440
        if (webkit_req_fs && name !== "download") {
            name += ".download";
        }
        if (type === force_saveable_type || webkit_req_fs) {
            target_view = view;
        }
        if (!req_fs) {
            fs_error();
            return;
        }
        fs_min_size += blob.size;
        req_fs(view.TEMPORARY, fs_min_size, abortable(function (fs) {
            fs.root.getDirectory("saved", create_if_not_found, abortable(function (dir) {
                var save = function () {
                    dir.getFile(name, create_if_not_found, abortable(function (file) {
                        file.createWriter(abortable(function (writer) {
                            writer.onwriteend = function (event) {
                                target_view.location.href = file.toURL();
                                filesaver.readyState = filesaver.DONE;
                                dispatch(filesaver, "writeend", event);
                                revoke(file);
                            };
                            writer.onerror = function () {
                                var error = writer.error;
                                if (error.code !== error.ABORT_ERR) {
                                    fs_error();
                                }
                            };
                            "writestart progress write abort".split(" ").forEach(function (event) {
                                writer["on" + event] = filesaver["on" + event];
                            });
                            writer.write(blob);
                            filesaver.abort = function () {
                                writer.abort();
                                filesaver.readyState = filesaver.DONE;
                            };
                            filesaver.readyState = filesaver.WRITING;
                        }), fs_error);
                    }), fs_error);
                };
                dir.getFile(name, {create: false}, abortable(function (file) {
                    // delete file if it already exists
                    file.remove();
                    save();
                }), abortable(function (ex) {
                    if (ex.code === ex.NOT_FOUND_ERR) {
                        save();
                    } else {
                        fs_error();
                    }
                }));
            }), fs_error);
        }), fs_error);
    }
    , FS_proto = FileSaver.prototype
            , saveAs = function (blob, name) {
                return new FileSaver(blob, name);
            }
    ;
    // IE 10+ (native saveAs)
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        return function (blob, name) {
            return navigator.msSaveOrOpenBlob(auto_bom(blob), name);
        };
    }

    FS_proto.abort = function () {
        var filesaver = this;
        filesaver.readyState = filesaver.DONE;
        dispatch(filesaver, "abort");
    };
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;

    FS_proto.error =
            FS_proto.onwritestart =
            FS_proto.onprogress =
            FS_proto.onwrite =
            FS_proto.onabort =
            FS_proto.onerror =
            FS_proto.onwriteend =
            null;

    return saveAs;
}(
        typeof self !== "undefined" && self
        || typeof window !== "undefined" && window
        || this.content
        ));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
    module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
    define([], function () {
        return saveAs;
    });
}

var COSSUtils = {};

COSSUtils.saveAs = saveAs;

var messageTipIndex = 0;

var topValue = $(window).height() / 2 - 150;
COSSUtils.showMessageTips = function (value, time, icon) {
    //如果提示重复删除已有提示
    var span = document.getElementById(value);
    if (span != undefined) {
        $(span).parent().remove();
    }
    if (undefined === time) {
        time = 1000;
    }
    if (icon == undefined) {
        icon = " ";
    } else {
        icon = "<img height='24' width='24' style='vertical-align:middle;'src='img/" + icon + ".png'>&nbsp;";
    }
    var index = messageTipIndex;
    var MessageTips = "MessageTips" + index;
    if (!$("#MessageTip").length > 0) {
        $('body').append("<div id='MessageTip' style='position:fixed;margin:0 auto;left:0;right:0;top:" + topValue + "px;z-index: 4000;width:400px'></div>");
    }
    $('#MessageTip').append("<div id='" + MessageTips + "' style='margin-top:10px;margin-left:10px;margin-right:10px;margin-bottom:10px;padding:20px 30px 20px 30px;width:400px;border-radius:3px;color:#ffffff;background:#000000;opacity: 0.6;left:0;right:0;z-index: 4000;text-align:center;font-size:15px;'><span id='" + value + "'>" + icon + value + "</span></div>");
    //var height = parseInt($('#' + MessageTips).css("height").replace("px", ""));
    //topValue = topValue + height + 10;
    messageTipIndex++;
    setTimeout(function () {
        $("#" + MessageTips).fadeOut();
        $("#" + MessageTips).fadeOut(1000);
        setTimeout(function () {
            $("#" + MessageTips).remove();
        }, 1001);
    }, time);
    return MessageTips;
};
//删除指定的tip，并且高度恢复 ，数组格式：(0：tip的id，1：tip的高度)
COSSUtils.hideMessageTips = function (MessageTipid) {
    $('#' + MessageTipid).remove();
};


// 向快速搜索栏数据中添加对应title
COSSUtils.getAreaQuickSearchDataAppendTitle = function (areaQuickSearchData, thirdType) {
    var cities = {};
    var counties = {};
    var thirdDatas = {};
    areaQuickSearchData.forEach(function (data) {
        if ("city" === data.type) {
            data.title = data.name;
            cities[data.id] = data;
        } else if ("county" === data.type) {
            counties[data.id] = data;
        } else if (thirdType === data.type) {
            thirdDatas[data.id] = data;
        }
    });
    for (var i in counties) {
        var county = counties[i];
        // 服务端已过滤关联city为null的county数据，community一样
        var city = cities[county.cityId];
        county.title = city.name + "/" + county.name;
    }
    for (var i in thirdDatas) {
        var thirdData = thirdDatas[i];
        var city = cities[thirdData.cityId];
        var county = counties[thirdData.countyId];
        thirdData.title = city.name + "/" + county.name + "/" + thirdData.name;
    }
    return areaQuickSearchData;
};



//格式化参数
COSSUtils.parseParamFunc = function (serviceType, isLocal) {
    var tableType = "global";
    if (isLocal) {
        tableType = "local";
    }
    var postParams = {};
    if (serviceType === "web") {
        postParams.joins = [
            {tableName: "tr_product2webtop", tableAliasName: "m1", on: "m1.product_id=a.icp_product_id"},
            {tableName: "tr_web_top", tableAliasName: "m2", on: "m2.id=m1.web_id"}
        ];
        postParams.count = 100;
        postParams.tableName = tableType + "usericphostwebcoss";
        postParams.ip = "host";
        postParams.service_id = "icp_id";
        postParams.service_type_name = "网页";
    } else if (serviceType === "video") {
        postParams.joins = [
            {tableName: "tr_service2videotop", tableAliasName: "m1", on: "m1.service_id=a.service_id"},
            {tableName: "tr_video_top", tableAliasName: "m2", on: "m2.id=m1.video_id"}
        ];
        postParams.count = 10;
        postParams.tableName = tableType + "usericphostvideocoss";
        postParams.ip = "server_ip";
        postParams.service_id = "service_id";
        postParams.service_type_name = "视频";
    } else if (serviceType === "game") {
        postParams.joins = [
            {tableName: "tr_service2gametop", tableAliasName: "m1", on: "m1.service_id=a.service_id"},
            {tableName: "tr_game_top", tableAliasName: "m2", on: "m2.id=m1.game_id"}
        ];
        postParams.count = 5;
        postParams.tableName = tableType + "usericphostgamecoss";
        postParams.ip = "server_ip";
        postParams.service_id = "service_id";
        postParams.service_type_name = "游戏";
    }
    return postParams;
};