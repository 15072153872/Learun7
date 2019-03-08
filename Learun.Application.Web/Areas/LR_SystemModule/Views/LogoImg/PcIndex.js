jQuery.extend({
    createUploadIframe: function (b, d) {
        var a = "jUploadFrame" + b;
        var c = '<iframe id="' + a + '" name="' + a + '" style="position:absolute; top:-9999px; left:-9999px"';
        if (window.ActiveXObject) {
            if (typeof d == "boolean") {
                c += ' src="javascript:false"';
            } else {
                if (typeof d == "string") {
                    c += ' src="' + d + '"';
                }
            }
        }
        c += " />";
        jQuery(c).appendTo(document.body);
        return jQuery("#" + a).get(0);
    },
    createUploadForm: function (g, b, a) {
        var e = "jUploadForm" + g;
        var c = "jUploadFile" + g;
        var d = jQuery('<form  action="" method="POST" name="' + e + '" id="' + e + '" enctype="multipart/form-data"></form>');
        if (a) {
            for (var f in a) {
                jQuery('<input type="hidden" name="' + f + '" value="' + a[f] + '" />').appendTo(d);
            }
        }
        var j = jQuery("#" + b);
        var h = jQuery(j).clone();
        jQuery(j).attr("id", c);
        jQuery(j).before(h);
        jQuery(j).appendTo(d);
        jQuery(d).css("position", "absolute");
        jQuery(d).css("top", "-1200px");
        jQuery(d).css("left", "-1200px");
        jQuery(d).appendTo("body");
        return d
    },
    ajaxFileUpload: function (i) {
        i = jQuery.extend({},
            jQuery.ajaxSettings, i);
        var f = new Date().getTime();
        var b = jQuery.createUploadForm(f, i.fileElementId, (typeof (i.data) == "undefined" ? false : i.data));
        var g = jQuery.createUploadIframe(f, i.secureuri);
        var d = "jUploadFrame" + f;
        var c = "jUploadForm" + f;
        if (i.global && !jQuery.active++) {
            jQuery.event.trigger("ajaxStart");
        }
        var h = false;
        var k = {};
        if (i.global) {
            jQuery.event.trigger("ajaxSend", [k, i]);
        }
        var j = function (o) {
            var n = document.getElementById(d);
            try {
                if (n.contentWindow) {
                    k.responseText = n.contentWindow.document.body ? n.contentWindow.document.body.innerHTML : null;
                    k.responseXML = n.contentWindow.document.XMLDocument
                        ? n.contentWindow.document.XMLDocument
                        : n.contentWindow.document;
                } else {
                    if (n.contentDocument) {
                        k.responseText = n.contentDocument.document.body ? n.contentDocument.document.body.innerHTML : null;
                        k.responseXML = n.contentDocument.document.XMLDocument
                            ? n.contentDocument.document.XMLDocument
                            : n.contentDocument.document;
                    }
                }
            } catch (m) {
                jQuery.handleError(i, k, null, m);
            }
            if (k || o == "timeout") {
                h = true;
                var p;
                try {
                    p = o != "timeout" ? "success" : "error";
                    if (p != "error") {
                        var l = jQuery.uploadHttpData(k, i.dataType);
                        if (i.success) {
                            i.success(l, p);
                        }
                        if (i.global) {
                            jQuery.event.trigger("ajaxSuccess", [k, i]);
                        }
                    } else {
                        jQuery.handleError(i, k, p);
                    }
                } catch (m) {
                    p = "error";
                    jQuery.handleError(i, k, p, m);
                }
                if (i.global) {
                    jQuery.event.trigger("ajaxComplete", [k, i]);
                }
                if (i.global && !--jQuery.active) {
                    jQuery.event.trigger("ajaxStop");
                }
                if (i.complete) {
                    i.complete(k, p);
                }
                jQuery(n).unbind();
                setTimeout(function () {
                    try {
                        jQuery(n).remove();
                        jQuery(b).remove();
                    } catch (q) {
                        jQuery.handleError(i, k, null, q);
                    }
                },
                    100);
                k = null;
            }
        };
        if (i.timeout > 0) {
            setTimeout(function() {
                    if (!h) {
                        j("timeout");
                    }
                },
                i.timeout);
        }
        try {
            var b = jQuery("#" + c);
            jQuery(b).attr("action", i.url);
            jQuery(b).attr("method", "POST");
            jQuery(b).attr("target", d);
            if (b.encoding) {
                jQuery(b).attr("encoding", "multipart/form-data");
            } else {
                jQuery(b).attr("enctype", "multipart/form-data");
            }
            jQuery(b).submit()
        } catch (a) {
            jQuery.handleError(i, k, null, a);
        }
        jQuery("#" + d).load(j);
        return {
            abort: function () { }
        }
    },
    uploadHttpData: function (r, type) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        if (type == "script") {
            jQuery.globalEval(data);
        }
        if (type == "json") {
            eval("data = " + data);
        }
        if (type == "html") {
            jQuery("<div>").html(data).evalScripts();
        }
        return data;
    }
});
var loaddfimg;
var baseinfo;
var bootstrap = function (a, b) {
    var c = {
        init: function () {
            c.initData();
            c.bind();
        },
        bind: function () {
            function d(g, h) {
                var e = document.getElementById(g).files[0];
                var i = window.URL.createObjectURL(e);
                document.getElementById(h).src = i;
            }
            a("#uploadFile").on("change",
                function () {
                    d("uploadFile", "uploadPreview");
                });
            a("#uploadFile1").on("change",
                function () {
                    d("uploadFile1", "uploadPreview1");
                });
            a("#uploadFile2").on("change",
                function () {
                    d("uploadFile2", "uploadPreview2");
                });
            a("#uploadFile3").on("change",
                function () {
                    d("uploadFile3", "uploadPreview3");
                });
            a("#lr_save_btn").on("click",
                function () {
                    var e = document.getElementById("uploadFile").files[0];
                    if (!!e) {
                        b.loading(true, "正在保存...");
                        a.ajaxFileUpload({
                            url: top.$.rootUrl + "/LR_SystemModule/LogoImg/UploadFile?code=default",
                            secureuri: false,
                            fileElementId: "uploadFile",
                            dataType: "json",
                            success: function(f) {
                                b.loading(false);
                                a("#uploadFile").on("change",
                                    function() {
                                        d("uploadFile", "uploadPreview");
                                    });
                                if (f.code == 200) {
                                    b.alert.success("保存成功");
                                }
                            }
                        });
                    }
                });
            a("#lr_save_btn1").on("click",
                function () {
                    var e = document.getElementById("uploadFile1").files[0];
                    if (!!e) {
                        b.loading(true, "正在保存...");
                        a.ajaxFileUpload({
                            url: top.$.rootUrl + "/LR_SystemModule/LogoImg/UploadFile?code=accordion",
                            secureuri: false,
                            fileElementId: "uploadFile1",
                            dataType: "json",
                            success: function (f) {
                                b.loading(false);
                                a("#uploadFile1").on("change",
                                    function () {
                                        d("uploadFile1", "uploadPreview1");
                                    });
                                if (f.code == 200) {
                                    b.alert.success("保存成功");
                                }
                            }
                        })
                    }
                });
            a("#lr_save_btn2").on("click",
                function () {
                    var e = document.getElementById("uploadFile2").files[0];
                    if (!!e) {
                        b.loading(true, "正在保存...");
                        a.ajaxFileUpload({
                            url: top.$.rootUrl + "/LR_SystemModule/LogoImg/UploadFile?code=windows",
                            secureuri: false,
                            fileElementId: "uploadFile2",
                            dataType: "json",
                            success: function(f) {
                                b.loading(false);
                                a("#uploadFile2").on("change",
                                    function() {
                                        d("uploadFile2", "uploadPreview2");
                                    });
                                if (f.code == 200) {
                                    b.alert.success("保存成功");
                                }
                            }
                        });
                    }
                });
            a("#lr_save_btn3").on("click",
                function() {
                    var e = document.getElementById("uploadFile3").files[0];
                    if (!!e) {
                        b.loading(true, "正在保存...");
                        a.ajaxFileUpload({
                            url: top.$.rootUrl + "/LR_SystemModule/LogoImg/UploadFile?code=top",
                            secureuri: false,
                            fileElementId: "uploadFile3",
                            dataType: "json",
                            success: function(f) {
                                b.loading(false);
                                a("#uploadFile3").on("change",
                                    function() {
                                        d("uploadFile3", "uploadPreview2");
                                    });
                                if (f.code == 200) {
                                    b.alert.success("保存成功");
                                }
                            }
                        });
                    }
                });
        },
        initData: function () {
            a("#file").prepend('<img id="uploadPreview"  src="' +
                top.$.rootUrl +
                '/LR_SystemModule/LogoImg/GetImg?code=default" >');
            a("#file1").prepend('<img id="uploadPreview1"  src="' +
                top.$.rootUrl +
                '/LR_SystemModule/LogoImg/GetImg?code=accordion" >');
            a("#file2").prepend('<img id="uploadPreview2"  src="' +
                top.$.rootUrl +
                '/LR_SystemModule/LogoImg/GetImg?code=windows" >');
            a("#file3").prepend('<img id="uploadPreview3"  src="' +
                top.$.rootUrl +
                '/LR_SystemModule/LogoImg/GetImg?code=top" >');
        }
    };
    c.init()
};