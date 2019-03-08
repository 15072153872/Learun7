/*
 * 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架(http://www.learun.cn) 
 * Copyright (c) 2013-2018 上海力软信息技术有限公司 
 * 创建人：陈彬彬
 * 日 期：2017.04.17
 * 描 述：报表开发模板
 */
var bootstrap = function (a, c) {
    var b = "";
    var h = a("#rootDirectory").val();
    var e = {};
    var g = [];
    var f = {};
    var d = {
        init: function () {
            d.bind()
        },
        bind: function () {
            a("#wizard").wizard().on("change",
                function (q, p) {
                    var j = a("#btn_finish");
                    var k = a("#btn_next");
                    if (p.direction == "next") {
                        if (p.step == 1) {
                            var s = a("#strSql").val();
                            if (b == "") {
                                c.alert.error("请选择数据库！");
                                return false
                            }
                            if (s == "") {
                                c.alert.error("请填写SQL语句！");
                                return false
                            }
                            a("#colgrid").jfGridSet("refreshdata", []);
                            c.httpAsync("GET", top.$.rootUrl + "/LR_SystemModule/DatabaseTable/GetSqlColName", {
                                databaseLinkId: b,
                                strSql: s
                            },
                                function (t) {
                                    var u = [];
                                    for (var v = 0,
                                        x = t.length; v < x; v++) {
                                        var w = t[v];
                                        var y = {
                                            name: w,
                                            field: w,
                                            width: "100"
                                        };
                                        u.push(y)
                                    }
                                    a("#colgrid").jfGridSet("refreshdata", u)
                                })
                        } else {
                            if (p.step == 2) {
                                var p = a("#colgrid").jfGridGet("rowdatas");
                                a("#queryDatetime").lrselectRefresh({
                                    data: p
                                });
                                g = p;
                                f = {};
                                a.each(g,
                                    function (t, u) {
                                        f[u.field] = u.name
                                    })
                            } else {
                                if (p.step == 3) { } else {
                                    if (p.step == 4) {
                                        if (!a("#step-4").lrValidform()) {
                                            return false
                                        }
                                        e.databaseLinkId = b;
                                        e.strSql = a("#strSql").val();
                                        var o = a("#colgrid").jfGridGet("rowdatas");
                                        e.colData = JSON.stringify(o);
                                        var r = a("#query_girdtable").jfGridGet("rowdatas");
                                        var l = [];
                                        a.each(r,
                                            function (t, u) {
                                                if (u.field) {
                                                    var v = {
                                                        field: u.field,
                                                        name: f[u.field],
                                                        portion: u.portion
                                                    };
                                                    l.push(v)
                                                }
                                            });
                                        var m = {
                                            width: a("#queryWidth").val(),
                                            height: a("#queryHeight").val(),
                                            isDate: a('[name="queryDatetime"]:checked').val(),
                                            DateField: a("#queryDatetime").lrselectGet(),
                                            fields: l
                                        };
                                        e.queryData = JSON.stringify(m);
                                        var n = a("#step-4").lrGetFormData();
                                        e.baseInfo = JSON.stringify(n);
                                        c.httpAsyncPost(top.$.rootUrl + "/LR_CodeGeneratorModule/TemplatePC/LookReportCode", e,
                                            function (t) {
                                                if (t.code == 200) {
                                                    a.each(t.data,
                                                        function (u, v) {
                                                            console.log("#" + u);
                                                            a("#" + u).html('<textarea name="SyntaxHighlighter" class="brush: c-sharp;">' + v + "</textarea>")
                                                        });
                                                    SyntaxHighlighter.highlight()
                                                }
                                            })
                                    } else {
                                        if (p.step == 5) {
                                            j.removeAttr("disabled");
                                            k.attr("disabled", "disabled")
                                        } else {
                                            j.attr("disabled", "disabled")
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        j.attr("disabled", "disabled");
                        k.removeAttr("disabled")
                    }
                });
            a("#dbId").lrselect({
                url: top.$.rootUrl + "/LR_SystemModule/DatabaseLink/GetTreeList",
                type: "tree",
                placeholder: "请选择数据库",
                allowSearch: true,
                select: function (j) {
                    if (j.hasChildren) {
                        b = ""
                    } else {
                        if (dbId != j.id) {
                            b = j.id
                        }
                    }
                }
            });
            a("#colgrid").jfGrid({
                headData: [{
                    label: "",
                    name: "btn1",
                    width: 52,
                    align: "center",
                    formatter: function (m, l, k, j) {
                        j.on("click",
                            function () {
                                var o = parseInt(j.attr("rowindex"));
                                var n = a("#colgrid").jfGridSet("moveUp", o);
                                return false
                            });
                        return '<span class="label label-info" style="cursor: pointer;">上移</span>'
                    }
                },
                {
                    label: "",
                    name: "btn2",
                    width: 52,
                    align: "center",
                    formatter: function (m, l, k, j) {
                        j.on("click",
                            function () {
                                var o = parseInt(j.attr("rowindex"));
                                var n = a("#colgrid").jfGridSet("moveDown", o);
                                return false
                            });
                        return '<span class="label label-success" style="cursor: pointer;">下移</span>'
                    }
                },
                {
                    label: "名称",
                    name: "name",
                    width: 200,
                    align: "left",
                    edit: {
                        type: "input"
                    }
                },
                {
                    label: "字段",
                    name: "field",
                    width: 160,
                    align: "left",
                    edit: {
                        type: "input"
                    }
                },
                {
                    label: "宽度",
                    name: "width",
                    width: 160,
                    align: "left",
                    edit: {
                        type: "input"
                    }
                },
                ],
                mainId: "field"
            });
            a("#queryDatetime").lrselect({
                value: "field",
                text: "name",
                title: "name",
                allowSearch: true
            });
            a("#query_girdtable").jfGrid({
                headData: [{
                    label: "",
                    name: "btn1",
                    width: 50,
                    align: "center",
                    formatter: function (m, l, k, j) {
                        j.on("click",
                            function () {
                                var o = parseInt(j.attr("rowindex"));
                                var n = a("#query_girdtable").jfGridSet("moveUp", o);
                                return false
                            });
                        return '<span class="label label-info" style="cursor: pointer;">上移</span>'
                    }
                },
                {
                    label: "",
                    name: "btn2",
                    width: 50,
                    align: "center",
                    formatter: function (m, l, k, j) {
                        j.on("click",
                            function () {
                                var o = parseInt(j.attr("rowindex"));
                                var n = a("#query_girdtable").jfGridSet("moveDown", o);
                                return false
                            });
                        return '<span class="label label-success" style="cursor: pointer;">下移</span>'
                    }
                },
                {
                    label: "字段项名称",
                    name: "field",
                    width: 300,
                    align: "left",
                    formatter: function (m, l, k, j) {
                        return f[l.field] || ""
                    },
                    edit: {
                        type: "select",
                        init: function (k, j) {
                            j.lrselectRefresh({
                                data: g
                            })
                        },
                        op: {
                            value: "field",
                            text: "name",
                            title: "name",
                            allowSearch: true
                        },
                        change: function (k, l, j) {
                            if (j != null) {
                                k.id = j.table + j.field
                            } else {
                                k.id = ""
                            }
                        }
                    }
                },
                {
                    label: "所占行比例",
                    name: "portion",
                    width: 150,
                    align: "left",
                    edit: {
                        type: "select",
                        op: {
                            placeholder: false,
                            data: [{
                                id: "1",
                                text: "1/1"
                            },
                            {
                                id: "2",
                                text: "1/2"
                            },
                            {
                                id: "3",
                                text: "1/3"
                            },
                            {
                                id: "4",
                                text: "1/4"
                            },
                            {
                                id: "6",
                                text: "1/6"
                            }]
                        }
                    },
                    formatter: function (m, l, k, j) {
                        if (!!m) {
                            return "1/" + m
                        } else {
                            return ""
                        }
                    }
                }],
                onAddRow: function (j, k) {
                    j.portion = "1"
                },
                mainId: "id",
                isEdit: true,
                isMultiselect: true
            });
            var i = c.clientdata.get(["userinfo"]);
            a("#createUser").val(i.realName);
            a("#outputArea").lrDataItemSelect({
                code: "outputArea"
            });
            a("#mappingDirectory").val(h + a("#_mappingDirectory").val());
            a("#serviceDirectory").val(h + a("#_serviceDirectory").val());
            a("#webDirectory").val(h + a("#_webDirectory").val());
            a("#nav_tabs").lrFormTabEx();
            a("#tab_content>div").lrscroll();
            a("#F_ParentId").lrselect({
                url: top.$.rootUrl + "/LR_SystemModule/Module/GetExpendModuleTree",
                type: "tree",
                maxHeight: 280,
                allowSearch: true
            });
            a("#selectIcon").on("click",
                function () {
                    c.layerForm({
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
            a("#btn_finish").on("click", d.save)
        },
        save: function () {
            var i = a("#step-6").lrGetFormData();
            i.F_EnabledMark = 1;
            e.moduleEntityJson = JSON.stringify(i);
            a.lrSaveForm(top.$.rootUrl + "/LR_CodeGeneratorModule/TemplatePC/CreateReportCode", e,
                function (j) { })
        }
    };
    d.init()
};