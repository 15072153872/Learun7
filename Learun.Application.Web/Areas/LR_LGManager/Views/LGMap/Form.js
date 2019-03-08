var acceptClick;
var mainType;
var keyValue = request("keyValue");
var bootstrap = function (a, b) {
    var d = b.frameTab.currentIframe().selectedRow;
    var c = {
        init: function () {
            c.bind()
        },
        bind: function () {
            var e = [];
            b.httpAsyncGet(top.$.rootUrl + "/LR_LGManager/LGType/GetList",
                function (h) {
                    if (h.data) {
                        for (var g = 0; g < h.data.length; g++) {
                            var f = '<div class="col-xs-12 lr-form-item"> <div class="lr-form-item-title">' + h.data[g].F_Name + '<font face="宋体">*</font></div> <input id="' + h.data[g].F_Code.toLowerCase() + '" type="text" class="form-control" isvalid="yes" checkexpession="NotNull" /> </div>';
                            e.push(f)
                        }
                        mainType = h.data[0].F_Code.toLowerCase();
                        a("#form .lr-form-item:last").parent().append(e);
                        a("#form .lr-form-item:first").remove()
                    }
                    if (!!d) {
                        a("#form").lrSetFormData(d)
                    }
                })
        }
    };
    acceptClick = function (e) {
        if (!a("#form").lrValidform()) {
            return false
        }
        var h = "";
        var f = "";
        if (!!d) {
            f = d.f_code;
            delete d.f_code;
            h = JSON.stringify(d)
        }
        var g = a("#form").lrGetFormData();
        var i = JSON.stringify(g);
        if (!keyValue) {
            b.httpAsyncGet(top.$.rootUrl + "/LR_LGManager/LGMap/GetListByNameAndType?keyValue=" + g[mainType] + "&typeCode=" + mainType,
                function (j) {
                    if (j.data.length != 0) {
                        b.alert.warning("主语言项不能重复！");
                        return false
                    } else {
                        a.lrSaveForm(top.$.rootUrl + "/LR_LGManager/LGMap/SaveForm?nameList=" + h + "&newNameList=" + i + "&code=" + f, {},
                            function (k) {
                                if (!!e) {
                                    e()
                                }
                            })
                    }
                })
        } else {
            if (g[mainType] != d[mainType]) {
                b.httpAsyncGet(top.$.rootUrl + "/LR_LGManager/LGMap/GetListByNameAndType?keyValue=" + g[mainType] + "&typeCode=" + mainType,
                    function (j) {
                        if (j.data.length != 0) {
                            b.alert.warning("主语言项不能重复！");
                            return false
                        } else {
                            a.lrSaveForm(top.$.rootUrl + "/LR_LGManager/LGMap/SaveForm?nameList=" + h + "&newNameList=" + i + "&code=" + f, {},
                                function (k) {
                                    if (!!e) {
                                        e()
                                    }
                                })
                        }
                    })
            } else {
                a.lrSaveForm(top.$.rootUrl + "/LR_LGManager/LGMap/SaveForm?nameList=" + h + "&newNameList=" + i + "&code=" + f, {},
                    function (j) {
                        if (!!e) {
                            e()
                        }
                    })
            }
        }
    };
    c.init()
};