var acceptClick;
var keyValue = request("keyValue");
var bootstrap = function ($, learun) {
    var selectedRow = learun.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            var e = [];
            learun.httpAsyncGet(top.$.rootUrl + "/LR_LGManager/LGType/GetList",
                function (res) {
                    if (res.data) {
                        for (var g = 0; g < res.data.length; g++) {
                            var f = '<div class="col-xs-12 lr-form-item"> <div class="lr-form-item-title">' +
                                res.data[g].F_Name +
                                '<font face="宋体">*</font></div> <input id="' +
                                res.data[g].F_Code +
                                '" type="text" class="form-control" isvalid="yes" checkexpession="NotNull" /> </div>';
                            e.push(f);
                        }
                        $("#form .lr-form-item:last").parent().append(e);
                        $("#form .lr-form-item:first").remove();
                    }
                    if (!!selectedRow) {
                        $("#form").lrSetFormData(d);
                    }
                    $("#" + keyValue).attr("disabled", "disabled");
                });
        }
    };
    acceptClick = function (callBack) {
        if (!$("#form").lrValidform()) {
            return false;
        }
        var g = "";
        var f = "";
        if (!!selectedRow) {
            f = selectedRow.F_Code;
            delete selectedRow.F_Code;
            g = JSON.stringify(d);
        }
        var h = JSON.stringify($("#form").lrGetFormData());
        $.lrSaveForm(top.$.rootUrl + "/LR_LGManager/LGMap/SaveForm?nameList=" + g + "&newNameList=" + h + "&code=" + f,
            {},
            function (i) {
                if (!!callBack) {
                    callBack();
                }
            });
    };
    page.init();
};