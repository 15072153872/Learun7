/*
 * 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架
 * Copyright (c) 2013-2017 
 * 创建人：陈彬彬
 * 日 期：2018.06.05
 * 描 述：写邮件	
 */
var keyValue = request('keyValue');
var type = request('type');
var data = request('data');

var acceptClick;
var bootstrap = function ($, learun) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
        },
        initData: function () {
            if (!!keyValue) {
                if (type == '2') {
                    $.lrSetForm(top.$.rootUrl + '/LR_OAModule/Email/GetReceiveEntity?keyValue=' + keyValue, function (data) {//
                        console.log(data);
                        $('#F_frame').attr("srcdoc", data.F_BodyText);
                        $('#form').lrSetFormData(data);
                    });
                }
                else {
                    $.lrSetForm(top.$.rootUrl + '/LR_OAModule/Email/GetSendEntity?keyValue=' + keyValue, function (data) {//
                        console.log(data);
                        $('#F_frame').attr("srcdoc", data.F_BodyText);
                        $('#form').lrSetFormData(data);
                    });
                }
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        return true;
    };
    page.init();
}