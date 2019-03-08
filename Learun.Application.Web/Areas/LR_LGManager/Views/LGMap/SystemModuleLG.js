var refreshGirdData;
var selectedRow;
var formHeight;
var keyValue;
var moduleType = true;
var bootstrap = function (a, b) {
    var c = "0";
    var d = {
        init: function () {
            d.inittree();
            d.initGrid();
            d.bind()
        },
        bind: function () {
            a("#btn_Search").on("click",
                function () {
                    var e = a("#txt_Keyword").val();
                    d.search({
                        parentId: c,
                        keyword: e
                    })
                });
            a("#lr_refresh").on("click",
                function () {
                    location.reload()
                });
            a("#lr_edit").on("click",
                function () {
                    selectedRow = a("#gridtable").jfGridGet("rowdata");
                    if (b.checkrow(selectedRow)) {
                        b.layerForm({
                            id: "form",
                            title: "编辑",
                            url: top.$.rootUrl + "/LR_LGManager/LGMap/AddForm?keyValue=" + keyValue,
                            width: 400,
                            height: formHeight,
                            callBack: function (e) {
                                return top[e].acceptClick(function () {
                                    d.search({
                                        parentId: c
                                    })
                                })
                            }
                        })
                    }
                })
        },
        inittree: function () {
            a("#module_tree").lrtree({
                url: top.$.rootUrl + "/LR_SystemModule/Module/GetModuleTree",
                nodeClick: d.treeNodeClick
            })
        },
        treeNodeClick: function (e) {
            c = e.id;
            moduleType = e.hasChildren;
            a("#titleinfo").text(e.text);
            d.search({
                parentId: c
            })
        },
        initGrid: function () {
            var e = [];
            b.httpAsyncGet(top.$.rootUrl + "/LR_LGManager/LGType/GetList",
                function (h) {
                    if (h.data) {
                        e.push({
                            label: "名称",
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
                            e.push(g)
                        }
                        a("#gridtable").jfGrid({
                            headData: e,
                            dblclick: function (i) {
                                if (b.checkrow(i)) {
                                    selectedRow = i;
                                    b.layerForm({
                                        id: "form",
                                        title: "编辑",
                                        url: top.$.rootUrl + "/LR_LGManager/LGMap/AddForm?keyValue=" + keyValue,
                                        width: 400,
                                        height: formHeight,
                                        callBack: function (j) {
                                            return top[j].acceptClick(function () {
                                                d.search({
                                                    parentId: c
                                                })
                                            })
                                        }
                                    })
                                }
                            }
                        });
                        d.search({
                            parentId: c
                        });
                        if (h.data.length <= 3) {
                            formHeight = 230
                        } else {
                            formHeight = 230 + (h.data.length - 3) * 40
                        }
                    }
                })
        },
        search: function (f) {
            var g = [];
            var e = {};
            if (moduleType) {
                b.httpAsyncGet(top.$.rootUrl + "/LR_SystemModule/Module/GetModuleListByParentId?parentId=" + f.parentId,
                    function (h) {
                        b.httpAsyncGet(top.$.rootUrl + "/LR_LGManager/LGMap/GetList",
                            function (n) {
                                if (h.data && n.data) {
                                    for (var k = 0; k < h.data.length; k++) {
                                        var o = n.data.find(function (i) {
                                            return i.F_Name == h.data[k].F_FullName
                                        });
                                        if (typeof o != "undefined") {
                                            var m = n.data.filter(function (i) {
                                                return i.F_Code == o.F_Code
                                            });
                                            for (var l = 0; l < m.length; l++) {
                                                e[m[l].F_TypeCode] = m[l].F_Name;
                                                e.F_Code = m[l].F_Code
                                            }
                                        } else {
                                            e[keyValue] = h.data[k].F_FullName;
                                            e.F_Code = ""
                                        }
                                        g.push(e);
                                        e = {}
                                    }
                                    a("#gridtable").jfGridSet("refreshdata", g);
                                    g = []
                                }
                            })
                    })
            } else {
                b.httpAsyncGet(top.$.rootUrl + "/LR_SystemModule/Module/GetFormData?keyValue=" + f.parentId,
                    function (h) {
                        b.httpAsyncGet(top.$.rootUrl + "/LR_LGManager/LGMap/GetList",
                            function (n) {
                                if (h.data && n.data) {
                                    for (var k = 0; k < h.data.moduleButtons.length; k++) {
                                        var o = n.data.find(function (i) {
                                            return i.F_Name == h.data.moduleButtons[k].F_FullName
                                        });
                                        if (typeof o != "undefined") {
                                            var m = n.data.filter(function (i) {
                                                return i.F_Code == o.F_Code
                                            });
                                            for (var l = 0; l < m.length; l++) {
                                                e[m[l].F_TypeCode] = m[l].F_Name;
                                                e.F_Code = m[l].F_Code
                                            }
                                        } else {
                                            e[keyValue] = h.data.moduleButtons[k].F_FullName;
                                            e.F_Code = ""
                                        }
                                        g.push(e);
                                        e = {}
                                    }
                                    for (var k = 0; k < h.data.moduleColumns.length; k++) {
                                        var o = n.data.find(function (i) {
                                            return i.F_Name == h.data.moduleColumns[k].F_FullName
                                        });
                                        if (typeof o != "undefined") {
                                            var m = n.data.filter(function (i) {
                                                return i.F_Code == o.F_Code
                                            });
                                            for (var l = 0; l < m.length; l++) {
                                                e[m[l].F_TypeCode] = m[l].F_Name;
                                                e.F_Code = m[l].F_Code
                                            }
                                        } else {
                                            e[keyValue] = h.data.moduleColumns[k].F_FullName;
                                            e.F_Code = ""
                                        }
                                        g.push(e);
                                        e = {}
                                    }
                                    for (var k = 0; k < h.data.moduleFields.length; k++) {
                                        var o = n.data.find(function (i) {
                                            return i.F_Name == h.data.moduleFields[k].F_FullName
                                        });
                                        if (typeof o != "undefined") {
                                            var m = n.data.filter(function (i) {
                                                return i.F_Code == o.F_Code
                                            });
                                            for (var l = 0; l < m.length; l++) {
                                                e[m[l].F_TypeCode] = m[l].F_Name;
                                                e.F_Code = m[l].F_Code
                                            }
                                        } else {
                                            e[keyValue] = h.data.moduleFields[k].F_FullName;
                                            e.F_Code = ""
                                        }
                                        g.push(e);
                                        e = {}
                                    }
                                    a("#gridtable").jfGridSet("refreshdata", g);
                                    g = []
                                }
                            })
                    })
            }
        }
    };
    refreshGirdData = function () {
        d.search({
            parentId: c
        })
    };
    d.init()
};