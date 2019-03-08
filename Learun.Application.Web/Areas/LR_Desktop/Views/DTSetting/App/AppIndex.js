var refreshGirdData;
var selectedRow = null;
var switchbtn = 1;
var bootstrap = function (a, b) {
    var c = {
        init: function () {
            a(".content").lrscroll();
            b.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTTarget/GetPageList", {},
                function (d) {
                    c.target(d || [])
                });
            b.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTList/GetPageList", {},
                function (d) {
                    c.list(d || [])
                });
            b.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTChart/GetPageList", {},
                function (d) {
                    c.chart(d || [])
                });
            c.bind()
        },
        target: function (e) {
            var d = a("#lr-add-target");
            a.each(e,
                function (g, h) {
                    var f = a('                    <div class="targetItem targetItem2">                        <div class="name">' + h.F_Name + '</div>                        <div class="number" data-number="' + h.F_Id + '"></div>                        <div class="tool">                            <div>编辑</div>                            <div>删除</div>                        </div>                    </div>');
                    f[0].item = h;
                    d.before(f);
                    top.learun.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTTarget/GetSqlData", {
                        Id: h.F_Id
                    },
                        function (i) {
                            if (i) {
                                a('[data-number="' + i.Id + '"]').text(i.value)
                            }
                        })
                })
        },
        list: function (e) {
            var d = a("#lr-add-list");
            a.each(e,
                function (g, h) {
                    var f = a('                <div class="lr-black-panel lr-black-panel-list">                    <div class="lr-title">' + h.F_Name + ' <div class="tool"><div>编辑</div><div>删除</div></div></div>                    <div class="lr-content" data-desktop="' + h.F_Id + '" ></div>                </div>');
                    f[0].item = h;
                    d.before(f);
                    top.learun.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTList/GetSqlData", {
                        Id: h.F_Id
                    },
                        function (j) {
                            if (j) {
                                var i = a('[data-desktop="' + j.Id + '"]');
                                a.each(j.value,
                                    function (l, m) {
                                        var k = '                                <div class="lr-list-item lr-dtlist-item">                                    <div class="lr-ellipsis">' + m.f_title + '</div>                                    <div class="date">' + b.formatDate(m.f_time, "yyyy-MM-dd") + "</div>                                </div>";
                                        i.append(k)
                                    });
                                i = null
                            }
                        })
                })
        },
        chart: function (f) {
            var d = a("#lr-add-chart");
            var e = {};
            a.each(f,
                function (h, i) {
                    var g = a('                <div class="lr-black-panel lr-black-panel-chart">                    <div class="lr-title">' + i.F_Name + '<div class="tool"><div>编辑</div><div>删除</div></div></div>                    <div class="lr-content lr-chart-content">                        <div class="lr-chart-container" id="' + i.F_Id + '"  data-desktop="' + i.F_Type + '" ></div>                    </div>                </div>');
                    g[0].item = i;
                    d.before(g);
                    e[i.F_Id] = echarts.init(document.getElementById(i.F_Id));
                    b.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTChart/GetSqlData", {
                        Id: i.F_Id
                    },
                        function (j) {
                            if (j) {
                                var m = a("#" + j.Id).attr("data-desktop");
                                var k = [];
                                var n = [];
                                a.each(j.value,
                                    function (o, p) {
                                        k.push(p.name);
                                        n.push(p.value)
                                    });
                                var l = {};
                                switch (m) {
                                    case "0":
                                        l.tooltip = {
                                            trigger: "item",
                                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                                        };
                                        l.legend = {
                                            orient: "vertical",
                                            left: "left",
                                            data: k
                                        };
                                        l.series = [{
                                            name: "占比",
                                            type: "pie",
                                            radius: ["50%", "70%"],
                                            avoidLabelOverlap: false,
                                            label: {
                                                normal: {
                                                    show: false,
                                                    position: "center"
                                                },
                                                emphasis: {
                                                    show: true,
                                                    textStyle: {
                                                        fontSize: "30",
                                                        fontWeight: "bold"
                                                    }
                                                }
                                            },
                                            labelLine: {
                                                normal: {
                                                    show: false
                                                }
                                            },
                                            data: j.value
                                        }];
                                        l.color = ["#df4d4b", "#304552", "#52bbc8", "rgb(224,134,105)", "#8dd5b4", "#5eb57d", "#d78d2f"];
                                        break;
                                    case "1":
                                    case "2":
                                        l = {
                                            grid: {
                                                top: "20px",
                                                bottom: "10px",
                                                left: "15px",
                                                right: "15px",
                                                containLabel: true
                                            },
                                            xAxis: {
                                                type: "category",
                                                data: k
                                            },
                                            yAxis: {
                                                type: "value"
                                            },
                                            series: [{
                                                data: n,
                                                type: m === "1" ? "line" : "bar"
                                            }]
                                        };
                                        break
                                }
                                e[j.Id].setOption(l)
                            }
                        })
                })
        },
        bind: function () {
            a(".lr-flex-content").on("click", ".tool>div",
                function () {
                    var d = a(this);
                    var f = d.text();
                    var e = d.parents(".targetItem2")[0].item;
                    selectedRow = e;
                    switchbtn = 1;
                    if (f === "编辑") {
                        b.layerForm({
                            id: "Form",
                            title: "编辑",
                            url: top.$.rootUrl + "/LR_Desktop/DTTarget/Form",
                            width: 600,
                            height: 500,
                            btn: null
                        })
                    } else {
                        b.layerConfirm("是否确认删除该项！",
                            function (g) {
                                if (g) {
                                    b.deleteForm(top.$.rootUrl + "/LR_Desktop/DTTarget/DeleteForm", {
                                        keyValue: e.F_Id
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
                    b.layerForm({
                        id: "Form",
                        title: "添加",
                        url: top.$.rootUrl + "/LR_Desktop/DTTarget/Form",
                        width: 600,
                        height: 500,
                        btn: null
                    })
                });
            a(".content").on("click", ".lr-black-panel-list .tool>div",
                function () {
                    var d = a(this);
                    var f = d.text();
                    var e = d.parents(".lr-black-panel-list")[0].item;
                    selectedRow = e;
                    switchbtn = 2;
                    if (f === "编辑") {
                        b.layerForm({
                            id: "Form",
                            title: "编辑",
                            url: top.$.rootUrl + "/LR_Desktop/DTList/Form",
                            width: 600,
                            height: 500,
                            btn: null
                        })
                    } else {
                        b.layerConfirm("是否确认删除该项！",
                            function (g) {
                                if (g) {
                                    b.deleteForm(top.$.rootUrl + "/LR_Desktop/DTList/DeleteForm", {
                                        keyValue: e.F_Id
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
                    b.layerForm({
                        id: "Form",
                        title: "添加",
                        url: top.$.rootUrl + "/LR_Desktop/DTList/Form",
                        width: 600,
                        height: 500,
                        btn: null
                    })
                });
            a(".content").on("click", ".lr-black-panel-chart .tool>div",
                function () {
                    var d = a(this);
                    var f = d.text();
                    var e = d.parents(".lr-black-panel-chart")[0].item;
                    selectedRow = e;
                    switchbtn = 3;
                    if (f === "编辑") {
                        b.layerForm({
                            id: "Form",
                            title: "编辑",
                            url: top.$.rootUrl + "/LR_Desktop/DTChart/Form",
                            width: 600,
                            height: 500,
                            btn: null
                        })
                    } else {
                        b.layerConfirm("是否确认删除该项！",
                            function (g) {
                                if (g) {
                                    b.deleteForm(top.$.rootUrl + "/LR_Desktop/DTChart/DeleteForm", {
                                        keyValue: e.F_Id
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
                    b.layerForm({
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
                b.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTTarget/GetPageList", {},
                    function (d) {
                        a(".lr-flex-content").find(".targetItem2").remove();
                        c.target(d || [])
                    });
                break;
            case 2:
                b.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTList/GetPageList", {},
                    function (d) {
                        a(".lr-black-panel-list").remove();
                        c.list(d || [])
                    });
                break;
            case 3:
                b.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTChart/GetPageList", {},
                    function (d) {
                        a(".lr-black-panel-chart").remove();
                        c.chart(d || [])
                    });
                break
        }
    };
    c.init()
};