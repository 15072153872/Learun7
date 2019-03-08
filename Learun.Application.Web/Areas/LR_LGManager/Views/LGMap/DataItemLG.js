var refreshGirdData;
var selectedRow;
var formHeight;
var keyValue;
var bootstrap = function ($, learun) {
    var classify_itemCode = "";
    var page = {
        init: function () {
            page.inittree();
            page.initGrid();
            page.bind();
        }, bind: function () {
            $("#btn_Search").on("click", function () {
                var keyword = $("#txt_Keyword").val();
                page.search({
                    keyword: keyword
                });
            });
            $("#lr_refresh").on("click", function () {
                location.reload();
            });
            $("#lr_edit").on("click",
                function () {
                    selectedRow = $("#gridtable").jfGridGet("rowdata");
                    if (learun.checkrow(selectedRow)) {
                        learun.layerForm({
                            id: "form",
                            title: "编辑",
                            url: top.$.rootUrl + "/LR_LGManager/LGMap/AddForm?keyValue=" + keyValue,
                            width: 400,
                            height: formHeight,
                            callBack: function (e) {
                                return top[e].acceptClick(page.search);
                            }
                        });
                    }
                });
        }, inittree: function () {


            $("#lr_left_tree").lrtree({
                url: top.$.rootUrl + "/LR_SystemModule/DataItem/GetClassifyTree",
                nodeClick: function (e) {
                    classify_itemCode = e.value;
                    $("#titleinfo").text(e.text + "(" + classify_itemCode + ")");
                    page.search();
                }
            });




        }, initGrid: function () {
            var e = [];
            learun.httpAsyncGet(top.$.rootUrl + "/LR_LGManager/LGType/GetList",
                function (h) {
                    if (h.data) {
                        e.push({
                            label: "项目值",
                            name: h.data[0].F_Code,
                            width: 200,
                            align: "left"
                        });
                        keyValue = h.data[0].F_Code;
                        for (var f = 1; f < h.data.length; f++) {
                            var g = {
                                label: h.data[f].F_Name,
                                name: h.data[f].F_Code,
                                width: 200,
                                align: "left"
                            };
                            e.push(g);
                        }
                        $("#gridtable").jfGrid({
                            headData: e,
                            dblclick: function (i) {
                                if (learun.checkrow(i)) {
                                    selectedRow = i;
                                    i.F_Code = keyValue;
                                    learun.layerForm({
                                        id: "form",
                                        title: "编辑",
                                        url: top.$.rootUrl + "/LR_LGManager/LGMap/AddForm?keyValue=" + keyValue,
                                        width: 400,
                                        height: formHeight,
                                        callBack: function (j) {
                                            return top[j].acceptClick(page.search);
                                        }
                                    });
                                }
                            }
                        });
                        page.search();
                        if (h.data.length <= 3) {
                            formHeight = 230;
                        } else {
                            formHeight = 230 + (h.data.length - 3) * 40;
                        }
                    }
                });
        }, search: function (f) {
            var g = [];
            var e = {};
            learun.httpAsyncGet(top.$.rootUrl + "/LR_SystemModule/DataItem/GetDetailList?itemCode=" + classify_itemCode,
                function (h) {
                    learun.httpAsyncGet(top.$.rootUrl + "/LR_LGManager/LGMap/GetList",
                        function (n) {
                            if (h.data && n.data) {
                                for (var k = 0; k < h.data.length; k++) {
                                    var o = n.data.find(function (i) {
                                        return i.F_Name == h.data[k].F_ItemName;
                                    });
                                    if (typeof o != "undefined") {
                                        var m = n.data.filter(function (i) {
                                            return i.F_Code == o.F_Code;
                                        });
                                        for (var l = 0; l < m.length; l++) {
                                            e[m[l].F_TypeCode] = m[l].F_Name;
                                            e.F_Code = m[l].F_Code;
                                        }
                                    } else {
                                        e[keyValue] = h.data[k].F_ItemName;
                                        e.F_Code = "";
                                    }
                                    g.push(e);
                                    e = {}
                                }
                                $("#gridtable").jfGridSet("refreshdata", g);
                                g = [];
                            }
                        });
                });
        }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
};