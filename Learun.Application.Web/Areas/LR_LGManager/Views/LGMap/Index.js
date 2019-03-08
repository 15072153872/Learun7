var selectedRow;
var refreshGirdData;
var formHeight;
var bootstrap = function (a, b) {
    var c = {
        init: function () {
            c.initGrid();
            c.bind()
        },
        bind: function () {
            a("#btn_Search").on("click",
                function () {
                    var d = a("#txt_Keyword").val();
                    c.search({
                        keyword: d
                    })
                });
            a("#lr_refresh").on("click",
                function () {
                    location.reload()
                });
            a("#lr_add").on("click",
                function () {
                    selectedRow = null;
                    b.layerForm({
                        id: "form",
                        title: "新增",
                        url: top.$.rootUrl + "/LR_LGManager/LGMap/Form",
                        width: 400,
                        height: formHeight,
                        callBack: function (d) {
                            return top[d].acceptClick(c.search)
                        }
                    })
                });
            a("#lr_edit").on("click",
                function () {
                    selectedRow = a("#gridtable").jfGridGet("rowdata");
                    if (b.checkrow(selectedRow)) {
                        b.layerForm({
                            id: "form",
                            title: "编辑",
                            url: top.$.rootUrl + "/LR_LGManager/LGMap/Form?keyValue=" + selectedRow.f_code,
                            width: 400,
                            height: formHeight,
                            callBack: function (d) {
                                return top[d].acceptClick(c.search)
                            }
                        })
                    }
                });
            a("#lr_delete").on("click",
                function () {
                    selectedRow = a("#gridtable").jfGridGet("rowdata");
                    if (b.checkrow(selectedRow)) {
                        b.layerConfirm("是否确认删除该项！",
                            function (d) {
                                if (d) {
                                    b.deleteForm(top.$.rootUrl + "/LR_LGManager/LGMap/DeleteForm", {
                                        keyValue: selectedRow.f_code
                                    },
                                        function () {
                                            c.search()
                                        })
                                }
                            })
                    }
                })
        },
        initGrid: function () {
            var d = [];
            b.httpAsyncGet(top.$.rootUrl + "/LR_LGManager/LGType/GetList",
                function (g) {
                    if (g.data) {
                        var h = [];
                        for (var e = 0; e < g.data.length; e++) {
                            var f = {
                                label: g.data[e].F_Name,
                                name: g.data[e].F_Code.toLowerCase(),
                                width: 200,
                                align: "left"
                            };
                            d.push(f);
                            h.push(g.data[e].F_Code)
                        }
                        a("#gridtable").jfGrid({
                            url: top.$.rootUrl + "/LR_LGManager/LGMap/GetPageList?typeList=" + h,
                            headData: d,
                            isPage: true,
                        });
                        c.search();
                        if (g.data.length <= 3) {
                            formHeight = 230
                        } else {
                            formHeight = 230 + (g.data.length - 3) * 40
                        }
                    }
                })
        },
        search: function (d) {
            d = d || {};
            a("#gridtable").jfGridSet("reload", {
                queryJson: JSON.stringify(d)
            })
        }
    };
    refreshGirdData = function () {
        c.search()
    };
    c.init()
};