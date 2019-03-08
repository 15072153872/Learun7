var dbAllTable = [];
var databaseLinkId = "";
var dbTable = "";
var dbTablePk = "";
var mapField = {};
var queryAllComponts = [];
var queryAllCompontMap = {};
var bootstrap = function ($, learun) {
    var rootDirectory = $("#rootDirectory").val();
    var postData = {};
    var f = function () {
        var g = true;
        $.each(dbTable,
            function (h, i) {
                if (!mapField[databaseLinkId + i.name]) {
                    g = false;
                    return false;
                }
            });
        if (g) {
            tableFieldTree.length = 0;
            $.each(dbTable,
                function (h, i) {
                    var o = {
                        id: i.name,
                        text: i.name,
                        value: i.name,
                        hasChildren: true,
                        isexpand: true,
                        complete: true,
                        ChildNodes: []
                    };
                    for (var l = 0,
                        m = mapField[databaseLinkId + i.name].length; l < m; l++) {
                        var k = mapField[databaseLinkId + i.name][l];
                        var n = {
                            id: o.text + k.f_column,
                            text: k.f_column,
                            value: k.f_column,
                            title: k.f_remark,
                            hasChildren: false,
                            isexpand: false,
                            complete: true,
                            showcheck: true
                        };
                        o.ChildNodes.push(n);
                    }
                    tableFieldTree.push(o);
                });
        } else {
            setTimeout(function () {
                f();
            },
                100);
        }
    };
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            $("#lr_refresh").on("click",
                function () {
                    location.reload();
                });
            $("#wizard").wizard().on("change",
                function (w, v) {
                    var h = $("#btn_finish");
                    var k = $("#btn_next");
                    if (v.direction == "next") {
                        if (v.step == 1) {
                            dbTable = $("#dbtablegird").jfGridValue("name");
                            dbTablePk = $("#dbtablegird").jfGridValue("pk");
                            console.log(dbTable, dbTablePk);
                            if (dbTable == "") {
                                learun.alert.error("请选择数据表");
                                return false;
                            }
                            $("#step-2").lrCustmerFormDesigner("updatedb", {
                                dbId: databaseLinkId,
                                dbTable: [{
                                    name: dbTable
                                }]
                            });
                            if (mapField[databaseLinkId + dbTable]) {
                                $("#queryDatetime").lrselectRefresh({
                                    data: mapField[databaseLinkId + dbTable]
                                });
                            } else {
                                if (!mapField[databaseLinkId + dbTable]) {
                                    learun.httpAsync("GET", top.$.rootUrl + "/LR_SystemModule/DatabaseTable/GetFieldList", {
                                        databaseLinkId: databaseLinkId,
                                        tableName: dbTable
                                    },
                                        function (i) {
                                            mapField[databaseLinkId + dbTable] = i;
                                            $("#queryDatetime").lrselectRefresh({
                                                data: i
                                            });
                                        });
                                }
                            }
                        } else {
                            if (v.step == 2) {
                                if (!$("#step-2").lrCustmerFormDesigner("valid")) {
                                    return false;
                                }
                                var E = $("#step-2").lrCustmerFormDesigner("get");
                                queryAllComponts = [];
                                for (var x = 0,
                                    C = E.data.length; x < C; x++) {
                                    var u = E.data[x].componts;
                                    for (var A = 0,
                                        B = u.length; A < B; A++) {
                                        var z = u[A];
                                        if (z.type != "gridtable" && z.table != "" && z.field != "") {
                                            queryAllComponts.push(z);
                                            queryAllCompontMap[z.table + z.field] = z;
                                        }
                                    }
                                }
                                if (queryAllComponts.length == 0) {
                                    learun.alert.error("请设置表单字段！");
                                    return false;
                                }
                                $("#treefieldRe").lrselectRefresh({
                                    data: queryAllComponts
                                });
                                var t = [];
                                var D = $("#col_gridtable").jfGridGet("rowdatas");
                                if (D.length > 0) {
                                    a.each(D,
                                        function (i, j) {
                                            if (queryAllCompontMap[j.id]) {
                                                t.push(j);
                                            }
                                        });
                                    $("#col_gridtable").jfGridSet("refreshdata", t)
                                }
                                if (t.length == 0) {
                                    a.each(queryAllComponts,
                                        function (i, j) {
                                            var l = {
                                                id: j.table + j.field,
                                                field: j.field,
                                                align: "left",
                                                width: 100
                                            };
                                            t.push(l);
                                        });
                                    $("#col_gridtable").jfGridSet("refreshdata", t);
                                }
                            } else {
                                if (v.step == 3) { } else {
                                    if (v.step == 4) {
                                        var y = $('[name="isViewTree"]:checked').val();
                                        if (y == "1") {
                                            var J = $("#treeDataSource").lrselectGet();
                                            if (J == "1") {
                                                var K = $("#treeDataSourceId").lrselectGet();
                                                if (K == "") {
                                                    learun.alert.error("请选择数据源！");
                                                    return false;
                                                }
                                            } else {
                                                var L = $("#treesql").val();
                                                if (L == "") {
                                                    learun.alert.error("请填写sql语句！");
                                                    return false;
                                                }
                                            }
                                            var F = $("#treefieldId").lrselectGet();
                                            if (F == "") {
                                                learun.alert.error("请选择字段ID！");
                                                return false;
                                            }
                                            var I = $("#treefieldParentId").lrselectGet();
                                            if (I == "") {
                                                learun.alert.error("请选择父级字段！");
                                                return false;
                                            }
                                            var H = $("#treefieldShow").lrselectGet();
                                            if (H == "") {
                                                learun.alert.error("请选择显示字段！");
                                                return false;
                                            }
                                            var G = $("#treefieldRe").lrselectGet();
                                            if (G == "") {
                                                learun.alert.error("请选择关联字段！");
                                                return false;
                                            }
                                        }
                                    } else {
                                        if (v.step == 5) {
                                            if (!$("#step-5").lrValidform()) {
                                                return false;
                                            }
                                            postData = {};
                                            postData.databaseLinkId = databaseLinkId;
                                            postData.dbTable = dbTable;
                                            postData.dbTablePk = dbTablePk;
                                            var E = $("#step-2").lrCustmerFormDesigner("get");
                                            postData.formData = JSON.stringify(E.data);
                                            var n = $("#query_girdtable").jfGridGet("rowdatas");
                                            var o = [];
                                            a.each(n,
                                                function (i, j) {
                                                    if (j.id) {
                                                        o.push(j);
                                                    }
                                                });
                                            var p = {
                                                width: $("#queryWidth").val(),
                                                height: $("#queryHeight").val(),
                                                isDate: $('[name="queryDatetime"]:checked').val(),
                                                DateField: $("#queryDatetime").lrselectGet(),
                                                fields: o
                                            };
                                            postData.queryData = JSON.stringify(p);
                                            var s = [];
                                            $("#btnlist .lbtn.active").each(function () {
                                                var i = $(this).attr("data-value");
                                                s.push(i);
                                            });
                                            var r = [];
                                            $("#btnlistex .lbtn.active").each(function () {
                                                var j = $(this).text();
                                                var i = $(this).attr("data-value");
                                                r.push({
                                                    id: i,
                                                    name: j
                                                })
                                            });
                                            var m = {
                                                isPage: $('[name="isPage"]:checked').val(),
                                                fields: $("#col_gridtable").jfGridGet("rowdatas"),
                                                btns: s,
                                                btnexs: r,
                                                isTree: $('[name="isViewTree"]:checked').val(),
                                                treeSource: $("#treeDataSource").lrselectGet(),
                                            };
                                            if (m.isTree == "1") {
                                                if (m.treeSource == "1") {
                                                    m.treeSourceId = $("#treeDataSourceId").lrselectGet();
                                                } else {
                                                    m.treeSql = $("#treesql").val();
                                                }
                                                m.treefieldId = $("#treefieldId").lrselectGet();
                                                m.treeParentId = $("#treefieldParentId").lrselectGet();
                                                m.treefieldShow = $("#treefieldShow").lrselectGet();
                                                m.treefieldRe = $("#treefieldRe").lrselectGet();
                                            }
                                            postData.colData = JSON.stringify(m);
                                            var q = $("#step-5").lrGetFormData();
                                            postData.baseInfo = JSON.stringify(q);
                                            learun.httpAsyncPost(top.$.rootUrl + "/LR_CodeGeneratorModule/TemplatePC/LookGridEditCode", d,
                                                function (i) {
                                                    if (i.code == 200) {
                                                        a.each(i.data,
                                                            function (j, l) {
                                                                $("#" + j).html('<textarea name="SyntaxHighlighter" class="brush: c-sharp;"></textarea>');
                                                                $("#" + j + ' [name="SyntaxHighlighter"]').text(l);
                                                            });
                                                        SyntaxHighlighter.highlight();
                                                    }
                                                })
                                        } else {
                                            if (v.step == 6) {
                                                h.removeAttr("disabled");
                                                k.attr("disabled", "disabled");
                                            } else {
                                                h.attr("disabled", "disabled");
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        h.attr("disabled", "disabled");
                        k.removeAttr("disabled");
                    }
                });
            $("#dbId").lrselect({
                url: top.$.rootUrl + "/LR_SystemModule/DatabaseLink/GetTreeList",
                type: "tree",
                placeholder: "请选择数据库",
                allowSearch: true,
                select: function (h) {
                    if (h.hasChildren) {
                        databaseLinkId = "";
                        $("#dbtablegird").jfGridSet("refreshdata", []);
                    } else {
                        if (dbId != h.id) {
                            databaseLinkId = h.id;
                            page.dbTableSearch();
                        }
                    }
                }
            });
            $("#btn_Search").on("click",
                function () {
                    var h = $("#txt_Keyword").val();
                    page.dbTableSearch({
                        tableName: h
                    });
                });
            $("#dbtablegird").jfGrid({
                url: top.$.rootUrl + "/LR_SystemModule/DatabaseTable/GetList",
                headData: [{
                    label: "表名",
                    name: "name",
                    width: 300,
                    align: "left"
                },
                {
                    label: "记录数",
                    name: "sumrows",
                    width: 100,
                    align: "center",
                    formatter: function (h) {
                        return h + "条";
                    }
                },
                {
                    label: "使用大小",
                    name: "reserved",
                    width: 100,
                    align: "center"
                },
                {
                    label: "索引使用大小",
                    name: "index_size",
                    width: 120,
                    align: "center"
                },
                {
                    label: "说明",
                    name: "tdescription",
                    width: 350,
                    align: "left"
                }],
                mainId: "name",
                isSubGrid: true,
                subGridExpanded: function (i, h) {
                    $("#" + i).jfGrid({
                        url: top.$.rootUrl + "/LR_SystemModule/DatabaseTable/GetFieldList",
                        headData: [{
                            label: "列名",
                            name: "f_column",
                            width: 300,
                            align: "left"
                        },
                        {
                            label: "数据类型",
                            name: "f_datatype",
                            width: 80,
                            align: "center"
                        },
                        {
                            label: "长度",
                            name: "f_length",
                            width: 57,
                            align: "center"
                        },
                        {
                            label: "允许空",
                            name: "f_isnullable",
                            width: 50,
                            align: "center",
                            formatter: function (j) {
                                return j == 1 ? '<i class="fa fa-toggle-on"></i>' : '<i class="fa fa-toggle-off"></i>';
                            }
                        },
                        {
                            label: "标识",
                            name: "f_identity",
                            width: 50,
                            align: "center",
                            formatter: function (j) {
                                return j == 1 ? '<i class="fa fa-toggle-on"></i>' : '<i class="fa fa-toggle-off"></i>';
                            }
                        },
                        {
                            label: "主键",
                            name: "f_key",
                            width: 50,
                            align: "center",
                            formatter: function (j) {
                                return j == 1 ? '<i class="fa fa-toggle-on"></i>' : '<i class="fa fa-toggle-off"></i>';
                            }
                        },
                        {
                            label: "说明",
                            name: "f_remark",
                            width: 200,
                            align: "left"
                        }]
                    });
                    $("#" + i).jfGridSet("reload", {
                        databaseLinkId: databaseLinkId,
                        tableName: h.name
                    });
                }
            });
            $("#step-2").lrCustmerFormDesigner("init", {
                components: ["text", "radio", "checkbox", "select", "datetime"]
            });
            $("#queryDatetime").lrselect({
                value: "f_column",
                text: "f_column",
                title: "f_remark",
                allowSearch: true
            });
            $("#query_girdtable").jfGrid({
                headData: [{
                    label: "",
                    name: "btn1",
                    width: 50,
                    align: "center",
                    formatter: function (k, j, i, h) {
                        h.on("click",
                            function () {
                                var m = parseInt(h.attr("rowindex"));
                                var l = $("#query_girdtable").jfGridSet("moveUp", m);
                                return false;
                            });
                        return '<span class="label label-info" style="cursor: pointer;">上移</span>';
                    }
                },
                {
                    label: "",
                    name: "btn2",
                    width: 50,
                    align: "center",
                    formatter: function (k, j, i, h) {
                        h.on("click",
                            function () {
                                var m = parseInt(h.attr("rowindex"));
                                var l = $("#query_girdtable").jfGridSet("moveDown", m);
                                return false;
                            });
                        return '<span class="label label-success" style="cursor: pointer;">下移</span>';
                    }
                },
                {
                    label: "字段项名称",
                    name: "compontId",
                    width: 300,
                    align: "left",
                    formatter: function (k, j, i, h) {
                        if (queryAllCompontMap[j.id]) {
                            return queryAllCompontMap[j.id].title;
                        } else {
                            return "";
                        }
                    },
                    edit: {
                        type: "select",
                        init: function (i, h) {
                            h.lrselectRefresh({
                                data: queryAllComponts
                            });
                        },
                        op: {
                            value: "id",
                            text: "title",
                            title: "title",
                            allowSearch: true
                        },
                        change: function (i, j, h) {
                            if (h != null) {
                                i.id = h.table + h.field;
                            } else {
                                i.id = "";
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
                    formatter: function (k, j, i, h) {
                        if (!!k) {
                            return "1/" + k;
                        } else {
                            return "";
                        }
                    }
                }],
                onAddRow: function (h, i) {
                    h.portion = "1";
                },
                mainId: "id",
                isEdit: true,
                isMultiselect: true
            });
            $("#treesetting").lrscroll();
            $("#btnlist>div").on("click",
                function () {
                    var h = $(this);
                    if (h.hasClass("active")) {
                        h.removeClass("active");
                    } else {
                        h.addClass("active");
                    }
                    h = null;
                });
            $("#btnlistex").delegate("div", "click",
                function () {
                    $(this).remove();
                });
            $("#lr_btnlistex_add").on("click",
                function () {
                    learun.layerForm({
                        id: "AddBtnForm",
                        title: "添加按钮",
                        url: top.$.rootUrl + "/LR_CodeGeneratorModule/TemplatePC/AddBtnForm",
                        height: 230,
                        width: 400,
                        callBack: function (h) {
                            return top[h].acceptClick(function (i) {
                                $("#btnlistex").append('<div class="lbtn active" data-value="' + i.btnId + '" ><i class="fa fa-plus"></i>&nbsp;' + i.btnName + "</div>")
                            });
                        }
                    });
                });
            $("#treefieldId").lrselect({
                title: "text",
                text: "text",
                value: "value",
                allowSearch: true,
                select: function (h) {
                    if (h) { }
                }
            });
            $("#treefieldParentId").lrselect({
                title: "text",
                text: "text",
                value: "value",
                allowSearch: true,
                select: function (h) {
                    if (h) { }
                }
            });
            $("#treefieldShow").lrselect({
                title: "text",
                text: "text",
                value: "value",
                allowSearch: true,
                select: function (h) {
                    if (h) { }
                }
            });
            $("#treefieldRe").lrselect({
                title: "title",
                text: "title",
                value: "field",
                allowSearch: true
            });
            $("#treeDataSource").lrselect({
                data: [{
                    id: "1",
                    text: "数据源"
                },
                {
                    id: "2",
                    text: "sql语句"
                }],
                placeholder: false,
                select: function (h) {
                    if (h) {
                        if (h.id == "1") {
                            $(".DataSourceType1").hide();
                            $(".DataSourceType2").show();
                        } else {
                            $(".DataSourceType1").show();
                            $(".DataSourceType2").hide();
                        }
                        $("#treefieldId").lrselectRefresh({
                            data: []
                        });
                        $("#treefieldParentId").lrselectRefresh({
                            data: []
                        });
                        $("#treefieldShow").lrselectRefresh({
                            data: []
                        });
                    }
                }
            });
            $("#treeDataSourceId").lrselect({
                allowSearch: true,
                url: top.$.rootUrl + "/LR_SystemModule/DataSource/GetList",
                value: "F_Code",
                text: "F_Name",
                title: "F_Name",
                select: function (h) {
                    if (!!h) {
                        learun.httpAsync("GET", top.$.rootUrl + "/LR_SystemModule/DataSource/GetDataColName", {
                            code: h.F_Code
                        },
                            function (j) {
                                var k = [];
                                for (var m = 0,
                                    o = j.length; m < o; m++) {
                                    var n = j[m];
                                    var p = {
                                        value: n,
                                        text: n
                                    };
                                    k.push(p);
                                }
                                $("#treefieldId").lrselectRefresh({
                                    data: k
                                });
                                $("#treefieldParentId").lrselectRefresh({
                                    data: k
                                });
                                $("#treefieldShow").lrselectRefresh({
                                    data: k
                                });
                            });
                    } else { }
                }
            });
            $('[name="isViewTree"]').on("click",
                function () {
                    var h = $(this).val();
                    if (h == 1) {
                        $(".treesetting").show();
                        $("#treeDataSource").lrselectSet("2");
                    } else {
                        $(".treesetting").hide();
                        $("#treeDataSource").lrselectSet("");
                    }
                });
            $("#lr_treesql_set").on("click",
                function () {
                    $("#treefieldId").lrselectRefresh({
                        data: []
                    });
                    $("#treefieldParentId").lrselectRefresh({
                        data: []
                    });
                    $("#treefieldShow").lrselectRefresh({
                        data: []
                    });
                    var h = $("#treesql").val();
                    learun.httpAsync("GET", top.$.rootUrl + "/LR_SystemModule/DatabaseTable/GetSqlColName", {
                        databaseLinkId: databaseLinkId,
                        strSql: h
                    },
                        function (j) {
                            var k = [];
                            for (var m = 0,
                                o = j.length; m < o; m++) {
                                var n = j[m];
                                var p = {
                                    value: n,
                                    text: n
                                };
                                k.push(p);
                            }
                            $("#treefieldId").lrselectRefresh({
                                data: k
                            });
                            $("#treefieldParentId").lrselectRefresh({
                                data: k
                            });
                            $("#treefieldShow").lrselectRefresh({
                                data: k
                            });
                        });
                });
            $("#col_gridtable").jfGrid({
                headData: [{
                    label: "",
                    name: "btn1",
                    width: 50,
                    align: "center",
                    formatter: function (k, j, i, h) {
                        h.on("click",
                            function () {
                                var m = parseInt(h.attr("rowindex"));
                                var l = $("#col_gridtable").jfGridSet("moveUp", m);
                                return false
                            });
                        return '<span class="label label-info" style="cursor: pointer;">上移</span>';
                    }
                },
                {
                    label: "",
                    name: "btn2",
                    width: 50,
                    align: "center",
                    formatter: function (k, j, i, h) {
                        h.on("click",
                            function () {
                                var m = parseInt(h.attr("rowindex"));
                                var l = $("#col_gridtable").jfGridSet("moveDown", m);
                                return false;
                            });
                        return '<span class="label label-success" style="cursor: pointer;">下移</span>';
                    }
                },
                {
                    label: "列名",
                    name: "field",
                    width: 300,
                    align: "left",
                    formatter: function (k, j, i, h) {
                        if (queryAllCompontMap[j.id]) {
                            j.fieldName = queryAllCompontMap[j.id].title;
                            return queryAllCompontMap[j.id].title;
                        } else {
                            return "";
                        }
                    },
                    edit: {
                        type: "select",
                        init: function (i, h) {
                            h.lrselectRefresh({
                                data: queryAllComponts
                            });
                        },
                        op: {
                            value: "field",
                            text: "title",
                            title: "title",
                            allowSearch: true
                        },
                        change: function (i, j, h) {
                            if (h != null) {
                                i.id = h.table + h.field;
                            } else {
                                i.id = "";
                            }
                        }
                    }
                },
                {
                    label: "对齐",
                    name: "align",
                    width: 80,
                    align: "left",
                    edit: {
                        type: "select",
                        op: {
                            placeholder: false,
                            data: [{
                                id: "left",
                                text: "靠左"
                            },
                            {
                                id: "center",
                                text: "居中"
                            },
                            {
                                id: "right",
                                text: "靠右"
                            }]
                        }
                    }
                },
                {
                    label: "宽度",
                    name: "width",
                    width: 80,
                    align: "left",
                    edit: {
                        type: "input"
                    }
                }],
                isEdit: true,
                isMultiselect: true,
                onAddRow: function (h, i) {
                    h.align = "left";
                    h.width = 100;
                },
            });
            var g = learun.clientdata.get(["userinfo"]);
            $("#createUser").val(g.realName);
            $("#outputArea").lrDataItemSelect({
                code: "outputArea"
            });
            $("#mappingDirectory").val(rootDirectory + $("#_mappingDirectory").val());
            $("#serviceDirectory").val(rootDirectory + $("#_serviceDirectory").val());
            $("#webDirectory").val(rootDirectory + $("#_webDirectory").val());
            $("#nav_tabs").lrFormTabEx();
            $("#F_ParentId").lrselect({
                url: top.$.rootUrl + "/LR_SystemModule/Module/GetExpendModuleTree",
                type: "tree",
                maxHeight: 280,
                allowSearch: true
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
                        end: function () {
                            if (top._learunSelectIcon != "") {
                                $("#F_Icon").val(top._learunSelectIcon);
                            }
                        }
                    });
                });
            $("#btn_finish").on("click", page.save);
        },
        dbTableSearch: function (g) {
            g = g || {};
            g.databaseLinkId = databaseLinkId;
            $("#dbtablegird").jfGridSet("reload", g);
        },
        save: function () {
            if (!$("#step-7").lrValidform()) {
                return false;
            }
            var g = $("#step-7").lrGetFormData();
            g.F_EnabledMark = 1;
            postData.moduleEntityJson = JSON.stringify(g);
            $.lrSaveForm(top.$.rootUrl + "/LR_CodeGeneratorModule/TemplatePC/CreateGridEditCode", d,
                function (h) { },
                true);
        }
    };
    page.init();
};