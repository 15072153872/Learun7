/*
 * 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架(http://www.learun.cn) 
 * Copyright (c) 2013-2018 上海力软信息技术有限公司 
 * 创建人：陈彬彬
 * 日 期：2017.04.11
 * 描 述：微信企业号设置	
 */
var bootstrap = function ($, learun) {
    "use strict";

    var page = {
        init: function () {
            $('#btn_RevisePassword').on('click', function () {
                if (!$('#form').lrValidform()) {
                    return false;
                }
                var postData = $('#form').lrGetFormData();
                $.lrSaveForm(top.$.rootUrl + '/LR_WebChatModule/Token/SaveForm', postData, null, true);
            });
        }
    };
    page.init();
}