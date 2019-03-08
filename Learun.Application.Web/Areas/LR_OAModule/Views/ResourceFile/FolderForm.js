﻿/*
 * 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架
 * Copyright (c) 2013-2017 
 * 创建人：陈彬彬
 * 日 期：2017.06.20
 * 描 述：文件管理	
 */
var keyValue = request('keyValue');
var parentId = request('parentId');
var acceptClick;
var bootstrap = function ($, learun) {
    "use strict";
    var Extension = "";
    var page = {
        init: function () {
            page.initControl();
        },
        //初始化控件
        initControl: function () {
            //获取表单
            //if (!!keyValue) {
            //    $.lrSetForm(top.$.rootUrl + "/LR_OAModule/ResourceFile/GetFolderFormJson", { keyValue: keyValue }, function (data) {//
            //        $('#form').lrSetFormData(data);
            //    });
            //} else {
            //    $("#F_ParentId").val(parentId);
            //}
        }
    };
    //保存表单
    acceptClick = function (callBack) {
        if (!$('#form').lrValidform()) {
            return false;
        }
        var postData = $("#form").lrGetFormData(keyValue);
        if (!!parentId) {
            postData["F_ParentId"] = parentId;
        }
        console.log(postData);
        $.lrSaveForm(top.$.rootUrl + '/LR_OAModule/ResourceFile/SaveFolderForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    }
    page.init();
}


