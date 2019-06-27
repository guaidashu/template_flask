//弹出框只显示一个的判断变量
var alert_boolean = true;//普通弹出框
var yy_time_boolean = true;//时间类提示弹出框
;(function ($) {//自定义包装函数
    var yy_function = function () {
        var self = this;
        this.body = $(document.body);
        this.body.delegate(".yy_alert_exit,.yy_alert_close", "click", function () {
            self.alert_exit();
        });
        this.body.delegate(".time_remind_exit,.time_remind_close", "click", function () {
            self.yy_time_exit();
        });
        this.body.delegate(".validate_close_btn,.validate_popup_close", "click", function () {
            self.validate_close();
        });
        this.body.delegate("#validate_img", "click", function () {
            self.validate_change();
        });
        this.body.delegate(".login_statement_btn,.login_statement_close", "click", function () {
            self.envelopFadeOut();
        })
        this.body.delegate(".content_input", "focus", function () {
            $(".self_placeholder").css("display", "none");
        });
        // 自定义富文本编辑器多余标签处理
        this.body.delegate(".content_input", "blur", function () {
            var content = document.getElementById("content_input").innerHTML;
            content = $.trim(content);
            content = content + "";
            if (content == "" || content == "<br>") {
                document.getElementById("content_input").innerHTML = "";
                $(".self_placeholder").css("display", "block");
            } else {
                //yy_init(content);
                $(".self_placeholder").css("display", "none");
            }
        });
        $(document).keydown(function (e) {
            if (e.keyCode == 13) {
                self.alert_exit();
                self.yy_time_exit();
            }
        });
    };
    yy_function.prototype = {//继承
        alert_exit: function () {//自定义弹出框退出函数
            var self = this;
            $(".yy_envelop").fadeOut(500);
            $(".yy_alert").fadeOut(500, function () {
                $(".yy_envelop").remove();
                $(".yy_alert").remove();
                alert_boolean = true;
                sleep_boolean = true;
            });
        },
        yy_time_exit: function () {
            var self = this;
            $(".time_remind_envelop").fadeOut(500);
            $(".time_remind").fadeOut(500, function () {
                $(".time_remind_envelop").remove();
                $(".time_remind").remove();
                yy_time_boolean = true;
                sleep_boolean = true;
            });
        },
        validate_close: function () {//验证码关闭函数
            var self = this;
            $(".validate_envelop").fadeOut(500);
            $(".validate_popup").fadeOut(500, function () {
                $(".validate_envelop").remove();
                $(".validate_popup_container").remove();
            });
        },
        validate_change: function () {//验证码刷新
            var self = this;
            document.getElementById("validate_img").src = "/validate.html?r=" + Math.random() * 10000000;
        },
        envelopFadeOut: function () {
            var self = this;
            $(".login_statement").fadeOut();
            $(".login_statement_envelop").fadeOut();
        }
    }
    window['yy_function'] = yy_function;
})(jQuery);
$(function () {
    var yy = new yy_function();
});

function yy_init(content) {//弹出框调用以及初始化
    yy_alert_exit();
    if (!content) {
        content = "";
    }
    content = content + "";
    content = content.replace(/\ /g, '&nbsp;');
    content = content.replace(/\</g, '&lt;');
    content = content.replace(/\>/g, '&gt;');
    content = content.replace(/\n/g, '<br/>');
    var str = $('<div class="yy_envelop">' +
        '</div>' +
        '<div class="yy_alert" id="yy_alert">' +
        '<div class="yy_alert_remind">小提示' +
        '<div class="yy_alert_close cursor_pointer"></div>' +
        '</div>' +
        '<div class="yy_alert_content">' +
        content +
        '</div>' +
        '<div class="yy_alert_exit cursor_pointer">&nbsp;确定</div>' +
        '</div>');
    if (alert_boolean) {
        alert_boolean = false;
        str.appendTo('body');
        yy_alert(content);
    }
}

function yy_alert_exit() {//弹出框随时退出函数
    $(".yy_envelop").fadeOut(500);
    $(".yy_alert").fadeOut(500, function () {
        $(".yy_envelop").remove();
        $(".yy_alert").remove();
        alert_boolean = true;
        sleep_boolean = true;
    });
    return true;
}

function yy_alert(str) {//弹出框样式设置及其弹出动画
    var width = parseInt($(document).width());
    if (width <= 372) {
        $(".yy_alert").css({
            "width": (width - 50) + "px",
            "min-height": "150px",
            "top": "-300px",
            "left": "50%"
        });
        if (parseInt($(".yy_alert_content").css("height")) > 120) {
            $(".yy_alert_content").css({
                "height": "120px",
                "overflow": "auto"
            });
        }
        $(".yy_alert").css({
            "margin-left": -parseInt($(".yy_alert").css("width")) / 2 + "px"
        });
        $(".yy_alert").animate({
            "top": "50%",
            "margin-top": -parseInt($(".yy_alert").css("height")) / 2 + "px"
        });
    } else {
        $(".yy_alert").css({
            "width": "300px",
            "min-height": "150px",
            "top": "-300px",
            "left": "50%"
        });
        if (parseInt($(".yy_alert_content").css("height")) > 120) {
            $(".yy_alert_content").css({
                "height": "120px",
                "overflow": "auto"
            });
        }
        $(".yy_alert").css({
            "margin-left": -parseInt($(".yy_alert").css("width")) / 2 + "px"
        });
        $(".yy_alert").animate({
            "top": "50%",
            "margin-top": -parseInt($(".yy_alert").css("height")) / 2 + "px"
        });
    }
}

// 使用自定义可变标题弹出框时，content为内容。title为标题，
// flag为是否进行字符过滤 ，true为过滤，false或不填为不过滤
function yy_time_init(content, title, flag) {
    if (flag) {
        content = content.replace(/\ /g, '&nbsp;');
        content = content.replace(/\</g, '&lt;');
        content = content.replace(/\>/g, '&gt;');
        content = content.replace(/\n/g, '<br/>');
    }
    var str = $('<div class="time_remind_envelop">' +
        '</div>' +
        '<div class="time_remind" id="yy_alert">' +
        '<div class="time_remind_remind">' + title +
        '<div class="time_remind_close cursor_pointer"></div>' +
        '</div>' +
        '<div class="time_remind_content">' +
        content +
        '</div>' +
        '<div class="time_remind_exit cursor_pointer">&nbsp;确定</div>' +
        '</div>');
    if (yy_time_boolean) {
        yy_time_boolean = false;
        str.appendTo('body');
        yy_time_alert(content);
    }
}


function yy_time_alert(str) {//弹出框样式设置及其弹出动画
    var width = parseInt($(document).width());
    if (width <= 372) {
        $(".time_remind").css({
            "width": (width - 50) + "px",
            "min-height": "150px",
            "top": "-300px",
            "left": "50%"
        });
        if (parseInt($(".time_remind_content").css("height")) > 120) {
            $(".time_remind_content").css({
                "height": "120px",
                "overflow": "auto"
            });
        }
        $(".time_remind").css({
            "margin-left": -parseInt($(".time_remind").css("width")) / 2 + "px"
        });
        $(".time_remind").animate({
            "top": "50%",
            "margin-top": -parseInt($(".time_remind").css("height")) / 2 + "px"
        });
    } else {
        $(".time_remind").css({
            "width": "300px",
            "min-height": "150px",
            "top": "-300px",
            "left": "50%"
        });
        if (parseInt($(".time_remind_content").css("height")) > 120) {
            $(".time_remind_content").css({
                "height": "120px",
                "overflow": "auto"
            });
        }
        $(".time_remind").css({
            "margin-left": -parseInt($(".time_remind").css("width")) / 2 + "px"
        });
        $(".time_remind").css({
            "top": "50%",
            "margin-top": -parseInt($(".time_remind").css("height")) / 2 + "px"
        });
    }
}

function yy_time_exit() {
    $(".time_remind_envelop").fadeOut(500);
    $(".time_remind").fadeOut(500, function () {
        $(".time_remind_envelop").remove();
        $(".time_remind").remove();
        yy_time_boolean = true;
        sleep_boolean = true;
    });
}

/*
//图片上传
//此函数需要jquery做基础
//id为要传送的form表单id，urlTmp为要传递的后台
//返回的内容为json，有需求自行修改源码
//多图片上传或者单图片都可
//需要传递数据直接传送dataName,为一个数组,其中保存额外要添加的值的name
//dataValue也为一个数组，其中保存额外要传输的值
//flag为判断是否有图片要传递的布尔值,
//fun为一个函数，在返回得到结果后运行
*/
function upload(id, urlTmp, dataName, dataValue, flag, fun) {
    var form = document.getElementById(id);
    var formdata = new FormData(form);
    formdata.append("flag", flag);
    var len = dataName.length;
    for (var i = 0; i < len; i++) {
        formdata.append(dataName[i], dataValue[i]);
    }
    $.ajax({
        url: urlTmp,
        type: "POST",
        processData: false,
        contentType: false,
        dataType: "json",
        data: formdata,
        success: function (data) {
            yy_init(data.text + "," + data.content);
            //fun();
        },
        error: function (data, status, e) {
            console.log(e);
        }
    });
}

function uploadTmp(id, urlTmp, fun) {
    var form = document.getElementById(id);
    var formdata = new FormData(form);
    $.ajax({
        url: urlTmp,
        type: "POST",
        processData: false,
        contentType: false,
        dataType: "json",
        data: formdata,
        success: function (data) {//返回的data
            fun(data);
        },
        error: function (data, status, e) {
            console.log(e);
        }
    });
}


/* 定位光标位置在文本最后的函数，真对开启了编辑模式的块级元素 */

//获取输入框长度函数
function inputGetLength(input) {
    var len = (input.innerHTML + "").length;
    return len;
}

//移动光标函数
function moveSelect(obj, len) {
    obj.focus();

    if (document.selection) {
        var sel = document.selection.createRange();
        sel.moveStart('character', len);
        sel.collapse();
        sel.select();
    }
    else {                                                 /* IE11 特殊处理 */
        var sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(obj);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

/* 定位光标位置在文本最后的函数，真对开启了编辑模式的块级元素 end */


function validate_show() {//验证码
    var str = $('<div class="validate_envelop">' +
        '</div>' +
        '<div class="validate_popup_container">' +
        '<div class="validate_popup">' +
        '<div class="validate_popup_remind">' +
        '&nbsp;验证码' +
        '</div>' +
        '<div class="validate_popup_close">' +
        '</div>' +
        '<div class="validate_img">' +
        '<img src="/validate.html?r=' + Math.random() * 10000000 + '" width="100px" height="30px" class="cursor_pointer" id="validate_img" />' +
        '<span>' +
        '点图换一张' +
        '</span>' +
        '</div>' +
        '<div class="validate_input">' +
        '<input type="text" name="validate" id="validate_input" />' +
        '</div>' +
        '<div class="validate_btn cursor_pointer">' +
        '&nbsp;确定' +
        '</div>' +
        '<div class="validate_close_btn cursor_pointer">' +
        '&nbsp;关闭' +
        '</div>' +
        '</div>' +
        '</div>');
    str.appendTo("body");
}

function validateClose() {
    $(".validate_envelop").fadeOut(500);
    $(".validate_popup").fadeOut(500, function () {
        $(".validate_envelop").remove();
        $(".validate_popup_container").remove();
    });
}

// 判断邮箱，若是不是一个正确的邮箱 ，则返回true
function emailCheck(email) {
    var patternEmail = /^\S([a-zA-Z0-9]*)(@)(163|126|sina|sohu|139|gmail|hotmail|21cn|qq)(\.com)$/;
    if (!patternEmail.test(email)) {
        return false;
    } else {
        return true;
    }
}

function phoneCheck(phone) {
    var pattern = /^1([0-9]){10}$/;
    if (!pattern.test(phone) || phone.length != 11) {
        return false;
    } else {
        return true;
    }
}

function yearCheck(year) {
    var patternYear = /^([0-9]){4}$/;
    if (!patternYear.test(year)) {
        return false;
    } else {
        return true;
    }
}

function js_GET() {
    var url = window.document.location.href.toString();
    var u = url.split("?");
    if (typeof(u[1]) == "string") {
        u = u[1].split("&");
        var get = {};
        for (var i in u) {
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
}


function Base64() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}


// id 为表单id
// tag 为要获取的标签对象(可以为数组，不传就默认为input)
// typeName 为要获取的input对象的类型(可以为数组)
// flag为1则表示获取innerHTML的值(默认为 0，不获取)
function getFormData(id, tag, typeName, flag) {
    if (!typeName) {
        typeName = "text";
    }
    if (!tag) {
        tag = ["input"];
    }
    // name数组
    var nameArr = new Array();
    // value数组
    var valueArr = new Array();
    var j = 0;
    var tmp;
    var obj = document.getElementById(id);
    var tagLen = tag.length;
    for (var m = 0; m < tagLen; m++) {
        var list = obj.getElementsByTagName(tag[m]);
        var len = list.length;
        for (var i = 0; i < len; i++) {
            if (tag[m] == "input") {
                if (isArray(typeName)) {
                    if (typeName.indexOf(list[i].getAttribute("type")) != -1 || list[i].getAttribute("type") == "password") {
                        nameArr[j] = list[i].getAttribute("name");
                        tmp = $.trim(list[i].value);
                        if (!tmp) {
                            return 1;
                        }
                        valueArr[j++] = tmp;
                    }
                } else {
                    if (list[i].getAttribute("type") == typeName || list[i].getAttribute("type") == "password") {
                        nameArr[j] = list[i].getAttribute("name");
                        tmp = $.trim(list[i].value);
                        if (!tmp) {
                            return 1;
                        }
                        valueArr[j++] = tmp;
                    }
                }
            } else {
                nameArr[j] = list[i].getAttribute("name");
                if (flag) {
                    tmp = $.trim(list[i].innerHTML);
                    if (!tmp) {
                        return 1;
                    }
                    valueArr[j++] = tmp;
                } else {
                    tmp = $.trim(list[i].value);
                    if (!tmp) {
                        return 1;
                    }
                    valueArr[j++] = tmp;
                }
            }
        }
    }
    return new Array(nameArr, valueArr);
}

function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}
