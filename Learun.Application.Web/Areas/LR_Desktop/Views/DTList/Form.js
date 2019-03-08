var keyValue = "";
var bootstrap = function (a, b) {
    var d = b.frameTab.currentIframe().selectedRow;
    var c = {
        init: function () {
            c.bind();
            c.initData()
        },
        bind: function () {
            a("#wizard").wizard().on("change",
                function (i, h) {
                    var f = a("#btn_finish");
                    var g = a("#btn_next");
                    if (h.direction == "next") {
                        if (h.step == 1) {
                            if (!a("#step-1").lrValidform()) {
                                return false
                            }
                            f.removeAttr("disabled");
                            g.attr("disabled", "disabled")
                        }
                    } else {
                        f.attr("disabled", "disabled");
                        g.removeAttr("disabled")
                    }
                });
            a("#selectIcon").on("click",
                function () {
                    b.layerForm({
                        id: "iconForm",
                        title: "选择图标",
                        url: top.$.rootUrl + "/Utility/Icon",
                        height: 700,
                        width: 1000,
                        btn: null,
                        maxmin: true,
                        end: function () {
                            if (top._learunSelectIcon != "") {
                                a("#F_Icon").val(top._learunSelectIcon)
                            }
                        }
                    })
                });
            a("#F_DataSourceId").lrselect({
                url: top.$.rootUrl + "/LR_SystemModule/DatabaseLink/GetTreeList",
                type: "tree",
                placeholder: "请选择数据库",
            });
            a("#btn_finish").click(function () {
                if (!a("#wizard-steps").lrValidform()) {
                    return false
                }
                var e = a("#wizard-steps").lrGetFormData(keyValue);
                a.lrSaveForm(top.$.rootUrl + "/LR_Desktop/DTList/SaveForm?keyValue=" + keyValue, e,
                    function (f) {
                        b.frameTab.currentIframe().refreshGirdData()
                    })
            })
        },
        initData: function () {
            if (!!d) {
                keyValue = d.F_Id;
                a("#wizard-steps").lrSetFormData(d)
            }
        }
    };
    c.init()
};