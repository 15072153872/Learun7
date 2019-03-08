/* * 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架(http://www.learun.cn) 
 * Copyright (c) 2013-2018 上海力软信息技术有限公司 
 * 创建人：超级管理员
 * 日  期：2018-09-29 15:01
 * 描  述：多语言映射
 */
var refreshGirdData;
var selectedRow;
var bootstrap = function ($, learun) {
    "use strict";
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {


            $("#btn_Search").on("click", function () {
                var keyword = $("#txt_Keyword").val();
                page.search({
                    keyword: keyword
                });
            });
            // 刷新
            $('#lr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#lr_add').on('click', function () {
                selectedRow = null;
                learun.layerForm({
                    id: "form",
                    title: "新增",
                    url: top.$.rootUrl + "/LR_LGManager/LGType/Form",
                    width: 300,
                    height: 180,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#lr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (learun.checkrow(keyValue)) {
                    learun.layerForm({
                        id: "form",
                        title: "编辑",
                        url: top.$.rootUrl + "/LR_LGManager/LGType/Form?keyValue=" + keyValue,
                        width: 300,
                        height: 180,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#lr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (learun.checkrow(keyValue)) {
                    selectedRow = $("#gridtable").jfGridGet("rowdata");
                    if (selectedRow.F_IsMain === 1) {
                        learun.alert.warning("主语言不能删除！");
                        return false;
                    }
                    learun.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            learun.deleteForm(top.$.rootUrl + '/LR_LGManager/LGType/DeleteForm', { keyValue: keyValue}, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 打印
            $('#lr_print').on('click', function () {
                $('#gridtable').jqprintTable();
            });
        },
        // 初始化列表
        initGird: function () {
            $('#gridtable').lrAuthorizeJfGrid({
                url: top.$.rootUrl + '/LR_LGManager/LGType/GetPageList',
                headData: [{
                    label: "名称",
                    name: "F_Name",
                    width: 200,
                    align: "left"
                }, {
                    label: "编码",
                    name: "F_Code",
                    width: 300,
                    align: "left"
                }, {
                    label: "主语言",
                    name: "F_IsMain",
                    width: 80,
                    align: "left",
                    formatter: function (d) {
                        if (d == 1) {
                            return '<span class="label label-info" style="cursor: pointer;">是</span>';
                        } else {
                            return '<span class="label label-danger" style="cursor: pointer;">否</span>';
                        }
                    }
                }],
                mainId:'F_Id',
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#gridtable').jfGridSet('reload',{ queryJson: JSON.stringify(param) });
        }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
}
