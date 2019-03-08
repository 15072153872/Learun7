var keyValue = "";
var bootstrap = function ($, learun) {
    var d = learun.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $("#wizard").wizard().on("change",
                function (i, h) {
                    var btnFinish = $("#btn_finish");
                    var btnNext = $("#btn_next");
                    if (h.direction == "next") {
                        if (h.step == 1) {
                            if (!$("#step-1").lrValidform()) {
                                return false;
                            }
                            btnFinish.removeAttr("disabled");
                            btnNext.attr("disabled", "disabled");
                        }
                    } else {
                        btnFinish.attr("disabled", "disabled");
                        btnNext.removeAttr("disabled");
                    }
                });
            $("#selectIcon").on("click",
                function () {
                    learun.layerForm({
                        id: "iconForm",
                        title: "选择图标",
                        url: top.$.rootUrl + "/Utility/Icon",
                        height: 700,
                        width: 1000,
                        btn: null,
                        maxmin: true,
                        end: function() {
                            if (top._learunSelectIcon != "") {
                                $("#F_Icon").val(top._learunSelectIcon);
                            }
                        }
                    });
                });
            $("#F_DataSourceId").lrselect({
                url: top.$.rootUrl + "/LR_SystemModule/DatabaseLink/GetTreeList",
                type: "tree",
                placeholder: "请选择数据库"
            });
            $("#F_Proportion1").lrselect({
                placeholder: false,
                data: [{
                    id: "1",
                    text: "1/1"
                },
                {
                    id: "2",
                    text: "1/2"
                }]
            }).lrselectSet("1");
            $("#F_Proportion2").lrselect({
                placeholder: false,
                data: [{
                    id: "1",
                    text: "1/1"
                },
                {
                    id: "2",
                    text: "1/2"
                }]
            }).lrselectSet("1");
            $("#F_Proportion3").lrselect({
                placeholder: false,
                data: [{
                    id: "1",
                    text: "1/1"
                },
                {
                    id: "2",
                    text: "1/2"
                }]
            }).lrselectSet("1");
            $("#F_Proportion4").lrselect({
                placeholder: false,
                data: [{
                    id: "1",
                    text: "1/1"
                },
                {
                    id: "2",
                    text: "1/2"
                }]
            }).lrselectSet("1");
            //图表类型0饼图1折线图2柱状图
            $("#F_Type").lrselect({
                placeholder: false,
                data: [
                    {
                        id: "0",
                        text: "饼图"
                    },
                    {
                        id: "1",
                        text: "折线图"
                    }, {
                        id: "2",
                        text: "柱状图"
                    }
                ]
            }).lrselectSet("1");
            $("#btn_finish").click(function() {
                if (!$("#wizard-steps").lrValidform()) {
                    return false;
                }
                var e = $("#wizard-steps").lrGetFormData(keyValue);
                $.lrSaveForm(top.$.rootUrl + "/LR_Desktop/DTChart/SaveForm?keyValue=" + keyValue,
                    e,
                    function(f) {
                        learun.frameTab.currentIframe().refreshGirdData();
                    });
            });
        },
        initData: function () {
            if (!!d) {
                keyValue = d.F_Id;
                $("#wizard-steps").lrSetFormData(d);
            }
        }
    };
    page.init();
};