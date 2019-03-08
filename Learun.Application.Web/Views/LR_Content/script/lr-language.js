////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架(http://www.learun.cn) 
 * Copyright (c) 2013-2018 上海力软信息技术有限公司 
 * 创建人：陈彬彬
 * 日 期：2018.05.10
 * 描 述：客户端语言包加载（菜单，tab条）
 */
(function (a, learun) {
    var learunlanguage = "no";
    var e = {};
    var miancode = null;
    var langobject = {};
    var currlang = {};
    var lang = {
        get: function (i) {
            if (localStorage) {
                return JSON.parse(localStorage.getItem("lrlt_" + i)) || {}
            } else {
                return currlang[i] || {}
            }
        }, set: function (j, i) {
            if (localStorage) {
                localStorage.setItem("lrlt_" + j, JSON.stringify(i));
            } else {
                currlang[j] = i;
            }
        }
    };
    learun.language = {
        getMainCode: function () {
            return miancode;
        }, get: function (l, i) {
            if (learunlanguage != miancode) {
                if (langobject[learunlanguage] && langobject[miancode]) {
                    var k = lang.get(miancode);
                    var j = lang.get(learunlanguage);
                    i(j.data[k.data[l]] || l);
                } else {
                    setTimeout(function () {
                        learun.language.get(l, i);
                    },
                        200);
                }
            } else {
                i(l);
            }
        }, getSyn: function (k) {
            if (learunlanguage != miancode) {
                var j = lang.get(miancode);
                var i = lang.get(learunlanguage);
                return i.data[j.data[k]] || k;
            } else {
                return k;
            }
        }
    };
    a(function () {
        learunlanguage = top.$.cookie("learun_ADMS_V2_Language") || "no";
        var i = a("#lr_lg_setting");
        if (learunlanguage == "no") {
            i.find("span").text("简体中文");
        }
        i.on("click",
            "li>a",
            function () {
                var j = a(this).attr("data-value");
                top.$.cookie("learun_ADMS_V2_Language",
                    j,
                    {
                        path: "/"
                    });
                location.reload();
            });
        learun.httpAsyncGet(top.$.rootUrl + "/LR_LGManager/LGType/GetList",
            function (m) {
                if (m.code == 200) {
                    var j = i.find("ul");
                    a.each(m.data,
                        function (n, o) {
                            e[o.F_Code] = o.F_Name;
                            if (o.F_IsMain == 1) {
                                miancode = o.F_Code;
                                if (learunlanguage == "no") {
                                    learunlanguage = miancode;
                                    top.$.cookie("learun_ADMS_V2_Language",
                                        learunlanguage,
                                        {
                                            path: "/"
                                        });
                                }
                            }
                            langobject[o.F_Code] = false;
                            var p = '<li><a href="javascript:void(0);" data-value="' +
                                o.F_Code +
                                '" >' +
                                o.F_Name +
                                "</a></li>";
                            j.append(p)
                        });
                    i.find("span").text(e[learunlanguage]);
                    if (learunlanguage != miancode) {
                        var l = lang.get(miancode);
                        var k = lang.get(learunlanguage);
                        learun.httpAsyncGet(
                            top.$.rootUrl +
                            "/LR_LGManager/LGMap/GetLanguageByCode?typeCode=" +
                            miancode +
                            "&ver=" +
                            l.ver +
                            "&isMain=true",
                            function (n) {
                                if (n.code == 200) {
                                    if (n.info != "no update") {
                                        lang.set(miancode, n.data);
                                    }
                                }
                                langobject[miancode] = true;
                            });
                        learun.httpAsyncGet(
                            top.$.rootUrl +
                            "/LR_LGManager/LGMap/GetLanguageByCode?typeCode=" +
                            learunlanguage +
                            "&ver=" +
                            k.ver +
                            "&isMain=false",
                            function (n) {
                                if (n.code == 200) {
                                    if (n.info != "no update") {
                                        lang.set(learunlanguage, n.data);
                                    }
                                }
                                langobject[learunlanguage] = true;
                            });
                    }
                }
            });
    });
})(window.jQuery, top.learun);
