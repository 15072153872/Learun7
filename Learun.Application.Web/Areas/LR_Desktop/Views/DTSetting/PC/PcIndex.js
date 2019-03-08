var refreshGirdData;
var selectedRow = null;
var switchbtn = 1;
var bootstrap = function (a, d) {
    var g = {};
    var e = {};
    var b = {};
    var c = {};
    var f = {
        init: function () {
            a(".lr-desktop-panel").lrscroll();
            a("#lr_target").lrscroll();
            f.bind();
            d.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTTarget/GetPageList", {},
                function (h) {
                    f.target(h || [])
                });
            d.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTList/GetPageList", {},
                function (h) {
                    f.list(h || [])
                });
            d.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTChart/GetPageList", {},
                function (h) {
                    f.chart(h || [])
                })
        },
        target: function (j) {
            var k = 210;
            var i = 0;
            var l = a("#lr_target").width() - 10;
            var k = l / j.length;
            if (k < 210) {
                k = 210
            }
            i = k * j.length;
            var h = a("#lr_target .lr-scroll-box");
            h.css("width", i);
            g = {};
            a.each(j,
                function (n, o) {
                    g[o.F_Id] = o;
                    var m = '                <div class="lr-item-20 targetItem">                    <div class="task-stat" >                        <div class="visual">                            <i class="' + o.F_Icon + '"></i>                        </div>                        <div class="details">                            <div class="number" data-value="' + o.F_Id + '"></div>                            <div class="desc">' + o.F_Name + "</div>                        </div>";
                    if (o.F_Url) {
                        m += '<a class="more" data-Id="' + o.F_Id + '" >                            查看更多 <i class="fa fa-arrow-circle-right"></i>                        </a>'
                    }
                    m += '                    <div class="tool" data-Id="' + o.F_Id + '">                        <div>编辑</div>                        <div>删除</div>                    </div>';
                    m += "</div>                </div>";
                    h.append(m);
                    top.learun.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTTarget/GetSqlData", {
                        Id: o.F_Id
                    },
                        function (p) {
                            if (p) {
                                h.find('[data-value="' + p.Id + '"]').text(p.value)
                            }
                        })
                });
            h.find(".lr-item-20 .more").on("click",
                function () {
                    var m = a(this).attr("data-Id");
                    top.learun.frameTab.open({
                        F_ModuleId: m,
                        F_FullName: g[m].F_Name,
                        F_UrlAddress: g[m].F_Url
                    });
                    return false
                });
            h.find(".lr-item-20").css("width", k);
            a("#lr_target").resize(function () {
                var n = a("#lr_target").width() - 10;
                var m = n / j.length;
                if (m < 210) {
                    m = 210
                }
                i = m * j.length;
                h.css("width", i);
                h.find(".lr-item-20").css("width", m)
            })
        },
        list: function (i) {
            var h = a("#lr-add-list");
            e = {};
            a.each(i,
                function (k, l) {
                    e[l.F_Id] = l;
                    var j = '                <div class="col-xs-6 listItem" data-Id="' + l.F_Id + '">                    <div class="portal-panel-title">                        <i class="' + l.F_Icon + '"></i>&nbsp;&nbsp;' + l.F_Name + '<div class="tool"><div>编辑</div><div>删除</div></div>                    </div>                    <div class="portal-panel-content" style="overflow: hidden; padding-top: 20px; padding-left: 30px; padding-right: 50px;height:225px;" data-value="' + l.F_Id + '" >                    </div>                </div>';
                    h.before(j);
                    top.learun.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTList/GetSqlData", {
                        Id: l.F_Id
                    },
                        function (n) {
                            if (n) {
                                var m = a('[data-value="' + n.Id + '"]');
                                a.each(n.value,
                                    function (q, r) {
                                        var p = '                            <div class="lr-msg-line">                                <a href="#" style="text-decoration: none;" >' + r.f_title + "</a>                                <label>" + r.f_time + "</label>                            </div>";
                                        var o = a(p);
                                        o.find("a")[0].item = r;
                                        m.append(o)
                                    })
                            }
                        })
                })
        },
        chart: function (i) {
            var h = a("#lr-add-chart");
            b = {};
            c = {};
            a.each(i,
                function (k, l) {
                    c[l.F_Id] = l;
                    var j = '                <div class="col-xs-' + (12 / parseInt(l.F_Proportion1)) + '  chartItem" data-Id="' + l.F_Id + '">                    <div class="portal-panel-title">                        <i class="' + l.F_Icon + '"></i>&nbsp;&nbsp;' + l.F_Name + '<div class="tool"><div>编辑</div><div>删除</div></div>                    </div>                    <div class="portal-panel-content">                        <div id="' + l.F_Id + '" class="lr-chart-container" data-type="' + l.F_Type + '"   ></div>                    </div>                </div>';
                    h.before(j);
                    b[l.F_Id] = echarts.init(document.getElementById(l.F_Id));
                    top.learun.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTChart/GetSqlData", {
                        Id: l.F_Id
                    },
                        function (m) {
                            if (m) {
                                var p = a("#" + m.Id).attr("data-type");
                                var n = [];
                                var q = [];
                                a.each(m.value,
                                    function (r, s) {
                                        n.push(s.name);
                                        q.push(s.value)
                                    });
                                var o = {};
                                switch (p) {
                                    case "0":
                                        o.legend = {
                                            bottom: "bottom",
                                            data: n
                                        };
                                        o.series = [{
                                            name: "占比",
                                            type: "pie",
                                            radius: "75%",
                                            center: ["50%", "50%"],
                                            label: {
                                                normal: {
                                                    formatter: "{b}:{c}: ({d}%)",
                                                    textStyle: {
                                                        fontWeight: "normal",
                                                        fontSize: 12,
                                                        color: "#333"
                                                    }
                                                }
                                            },
                                            data: m.value,
                                            itemStyle: {
                                                emphasis: {
                                                    shadowBlur: 10,
                                                    shadowOffsetX: 0,
                                                    shadowColor: "rgba(0, 0, 0, 0.5)"
                                                }
                                            }
                                        }];
                                        o.color = ["#df4d4b", "#304552", "#52bbc8", "rgb(224,134,105)", "#8dd5b4", "#5eb57d", "#d78d2f"];
                                        break;
                                    case "1":
                                        o.tooltip = {
                                            trigger: "axis"
                                        };
                                        o.grid = {
                                            bottom: "8%",
                                            containLabel: true
                                        };
                                        o.xAxis = {
                                            type: "category",
                                            boundaryGap: false,
                                            data: n
                                        };
                                        o.yAxis = {
                                            type: "value"
                                        };
                                        o.series = [{
                                            type: "line",
                                            data: q
                                        }];
                                        break;
                                    case "2":
                                        o.tooltip = {
                                            trigger: "axis"
                                        };
                                        o.grid = {
                                            bottom: "8%",
                                            containLabel: true
                                        };
                                        o.xAxis = {
                                            type: "category",
                                            boundaryGap: false,
                                            data: n
                                        };
                                        o.yAxis = {
                                            type: "value"
                                        };
                                        o.series = [{
                                            type: "bar",
                                            data: q
                                        }];
                                        break
                                }
                                b[m.Id].setOption(o)
                            }
                        })
                });
            window.onresize = function (j) {
                a.each(b,
                    function (k, l) {
                        l.resize(j)
                    })
            }
        },
        bind: function () {
            a("#lr_target").on("click", ".tool>div",
                function () {
                    var h = a(this);
                    var k = h.text();
                    var i = h.parent().attr("data-Id");
                    var j = g[i];
                    selectedRow = j;
                    switchbtn = 1;
                    if (k === "编辑") {
                        d.layerForm({
                            id: "Form",
                            title: "编辑",
                            url: top.$.rootUrl + "/LR_Desktop/DTTarget/Form",
                            width: 600,
                            height: 500,
                            btn: null
                        })
                    } else {
                        d.layerConfirm("是否确认删除该项！",
                            function (l) {
                                if (l) {
                                    d.deleteForm(top.$.rootUrl + "/LR_Desktop/DTTarget/DeleteForm", {
                                        keyValue: j.F_Id
                                    },
                                        function () {
                                            refreshGirdData()
                                        })
                                }
                            })
                    }
                });
            a("#lr-add-target").on("click",
                function () {
                    selectedRow = null;
                    switchbtn = 1;
                    d.layerForm({
                        id: "Form",
                        title: "添加",
                        url: top.$.rootUrl + "/LR_Desktop/DTTarget/Form",
                        width: 600,
                        height: 500,
                        btn: null
                    })
                });
            a(".lr-desktop-panel").on("click", ".listItem .tool>div",
                function () {
                    var h = a(this);
                    var k = h.text();
                    var i = h.parents(".listItem").attr("data-Id");
                    var j = e[i];
                    selectedRow = j;
                    switchbtn = 2;
                    if (k === "编辑") {
                        d.layerForm({
                            id: "Form",
                            title: "编辑",
                            url: top.$.rootUrl + "/LR_Desktop/DTList/Form",
                            width: 600,
                            height: 500,
                            btn: null
                        })
                    } else {
                        d.layerConfirm("是否确认删除该项！",
                            function (l) {
                                if (l) {
                                    d.deleteForm(top.$.rootUrl + "/LR_Desktop/DTList/DeleteForm", {
                                        keyValue: j.F_Id
                                    },
                                        function () {
                                            refreshGirdData()
                                        })
                                }
                            })
                    }
                });
            a("#lr-add-list").on("click",
                function () {
                    selectedRow = null;
                    switchbtn = 2;
                    d.layerForm({
                        id: "Form",
                        title: "添加",
                        url: top.$.rootUrl + "/LR_Desktop/DTList/Form",
                        width: 600,
                        height: 500,
                        btn: null
                    })
                });
            a(".lr-desktop-panel").on("click", ".chartItem .tool>div",
                function () {
                    var h = a(this);
                    var k = h.text();
                    var i = h.parents(".chartItem").attr("data-Id");
                    var j = c[i];
                    selectedRow = j;
                    switchbtn = 3;
                    if (k === "编辑") {
                        d.layerForm({
                            id: "Form",
                            title: "编辑",
                            url: top.$.rootUrl + "/LR_Desktop/DTChart/Form",
                            width: 600,
                            height: 500,
                            btn: null
                        })
                    } else {
                        d.layerConfirm("是否确认删除该项！",
                            function (l) {
                                if (l) {
                                    d.deleteForm(top.$.rootUrl + "/LR_Desktop/DTChart/DeleteForm", {
                                        keyValue: j.F_Id
                                    },
                                        function () {
                                            refreshGirdData()
                                        })
                                }
                            })
                    }
                });
            a("#lr-add-chart").on("click",
                function () {
                    selectedRow = null;
                    switchbtn = 3;
                    d.layerForm({
                        id: "Form",
                        title: "添加",
                        url: top.$.rootUrl + "/LR_Desktop/DTChart/Form",
                        width: 600,
                        height: 500,
                        btn: null
                    })
                })
        }
    };
    refreshGirdData = function () {
        switch (switchbtn) {
            case 1:
                d.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTTarget/GetPageList", {},
                    function (h) {
                        a(".targetItem").remove();
                        f.target(h || [])
                    });
                break;
            case 2:
                d.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTList/GetPageList", {},
                    function (h) {
                        a(".listItem").remove();
                        f.list(h || [])
                    });
                break;
            case 3:
                d.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTChart/GetPageList", {},
                    function (h) {
                        a(".chartItem").remove();
                        f.chart(h || [])
                    });
                break
        }
    };
    f.init()
};