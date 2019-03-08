
$(function () {
    var f = {};
    var d = {};
    function e(i) {
        if (i.length > 0) {
            $("#lr_target").lrscroll();
            var j = 210;
            var h = 0;
            var k = $("#lr_target").width() - 10;
            var j = k / i.length;
            if (j < 210) {
                j = 210
            }
            h = j * i.length;
            var g = $("#lr_target .lr-scroll-box");
            g.css("width", h);
            $.each(i,
                function (m, n) {
                    f[n.F_Id] = n;
                    var l = '                <div class="lr-item-20">                    <div class="task-stat" >                        <div class="visual">                            <i class="' + n.F_Icon + '"></i>                        </div>                        <div class="details">                            <div class="number" data-value="' + n.F_Id + '"></div>                            <div class="desc">' + n.F_Name + "</div>                        </div>";
                    if (n.F_Url) {
                        l += '<a class="more" data-Id="' + n.F_Id + '" >                            查看更多 <i class="fa fa-arrow-circle-right"></i>                        </a>'
                    }
                    l += "</div>                </div>";
                    g.append(l);
                    top.learun.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTTarget/GetSqlData", {
                        Id: n.F_Id
                    },
                        function (o) {
                            if (o) {
                                g.find('[data-value="' + o.Id + '"]').text(o.value)
                            }
                        })
                });
            g.find(".lr-item-20 .more").on("click",
                function () {
                    var l = $(this).attr("data-Id");
                    top.learun.frameTab.open({
                        F_ModuleId: l,
                        F_FullName: f[l].F_Name,
                        F_UrlAddress: f[l].F_Url
                    });
                    return false
                });
            g.find(".lr-item-20").css("width", j);
            $("#lr_target").resize(function () {
                var m = $("#lr_target").width() - 10;
                var l = m / i.length;
                if (l < 210) {
                    l = 210
                }
                h = l * i.length;
                g.css("width", h);
                g.find(".lr-item-20").css("width", l)
            })
        }
    }
    function c(h) {
        if (h.length > 0) {
            var g = $(".lr-desktop-panel>.lr-scroll-box");
            $.each(h,
                function (j, k) {
                    d[k.F_Id] = k;
                    var i = '                <div class="col-xs-6" data-Id="' + k.F_Id + '">                    <div class="portal-panel-title">                        <i class="' + k.F_Icon + '"></i>&nbsp;&nbsp;' + k.F_Name + '                        <span class="menu" title="更多">                        <span class="point"></span>                        <span class="point"></span>                        <span class="point"></span>                        </span>                    </div>                    <div class="portal-panel-content" style="overflow: hidden; padding-top: 20px; padding-left: 30px; padding-right: 50px;height:225px;" data-value="' + k.F_Id + '" >                    </div>                </div>';
                    g.append(i);
                    top.learun.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTList/GetSqlData", {
                        Id: k.F_Id
                    },
                        function (m) {
                            if (m) {
                                var l = g.find('[data-value="' + m.Id + '"]');
                                $.each(m.value,
                                    function (p, q) {
                                        var o = '                            <div class="lr-msg-line">                                <a href="#" style="text-decoration: none;" >' + q.f_title + "</a>                                <label>" + q.f_time + "</label>                            </div>";
                                        var n = $(o);
                                        n.find("a")[0].item = q;
                                        l.append(n)
                                    });
                                l.find(".lr-msg-line>a").on("click",
                                    function () {
                                        var n = $(this).parents(".col-xs-6");
                                        var o = n.attr("data-Id");
                                        var p = $(this)[0].item;
                                        if (d[o].F_ItemUrl) {
                                            top.learun.frameTab.open({
                                                F_ModuleId: "dtlist" + p.f_id,
                                                F_FullName: p.f_title,
                                                F_UrlAddress: d[o].F_ItemUrl + p.f_id
                                            })
                                        } else {
                                            top["dtlist" + p.f_id] = p;
                                            top.learun.frameTab.open({
                                                F_ModuleId: "dtlist" + p.f_id,
                                                F_FullName: p.f_title,
                                                F_UrlAddress: "/Utility/ListContentIndex?id=" + p.f_id
                                            })
                                        }
                                        return false
                                    })
                            }
                        })
                });
            g.find(".portal-panel-title>.menu").on("click",
                function () {
                    var i = $(this).parents(".col-xs-6");
                    var j = i.attr("data-Id");
                    top.learun.frameTab.open({
                        F_ModuleId: j,
                        F_FullName: d[j].F_Name,
                        F_UrlAddress: d[j].F_Url
                    });
                    return false
                });
            if (h.length % 2 > 0) {
                g.find('[data-value="' + h[h.length - 1].F_Id + '"]').css("height", 425)
            }
        }
    }
    var b = {};
    function a(h) {
        if (h.length > 0) {
            var g = $(".lr-desktop-panel>.lr-scroll-box");
            $.each(h,
                function (j, k) {
                    var i = '                <div class="col-xs-' + (12 / parseInt(k.F_Proportion1)) + '">                    <div class="portal-panel-title">                        <i class="' + k.F_Icon + '"></i>&nbsp;&nbsp;' + k.F_Name + '                    </div>                    <div class="portal-panel-content">                        <div id="' + k.F_Id + '" class="lr-chart-container" data-type="' + k.F_Type + '"   ></div>                    </div>                </div>';
                    g.append(i);
                    b[k.F_Id] = echarts.init(document.getElementById(k.F_Id));
                    top.learun.httpAsync("GET", top.$.rootUrl + "/LR_Desktop/DTChart/GetSqlData", {
                        Id: k.F_Id
                    },
                        function (l) {
                            if (l) {
                                var o = $("#" + l.Id).attr("data-type");
                                var m = [];
                                var p = [];
                                $.each(l.value,
                                    function (q, r) {
                                        m.push(r.name);
                                        p.push(r.value)
                                    });
                                var n = {};
                                switch (o) {
                                    case "0":
                                        n.legend = {
                                            bottom: "bottom",
                                            data: m
                                        };
                                        n.series = [{
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
                                            data: l.value,
                                            itemStyle: {
                                                emphasis: {
                                                    shadowBlur: 10,
                                                    shadowOffsetX: 0,
                                                    shadowColor: "rgba(0, 0, 0, 0.5)"
                                                }
                                            }
                                        }];
                                        n.color = ["#df4d4b", "#304552", "#52bbc8", "rgb(224,134,105)", "#8dd5b4", "#5eb57d", "#d78d2f"];
                                        break;
                                    case "1":
                                        n.tooltip = {
                                            trigger: "axis"
                                        };
                                        n.grid = {
                                            bottom: "8%",
                                            containLabel: true
                                        };
                                        n.xAxis = {
                                            type: "category",
                                            boundaryGap: false,
                                            data: m
                                        };
                                        n.yAxis = {
                                            type: "value"
                                        };
                                        n.series = [{
                                            type: "line",
                                            data: p
                                        }];
                                        break;
                                    case "2":
                                        n.tooltip = {
                                            trigger: "axis"
                                        };
                                        n.grid = {
                                            bottom: "8%",
                                            containLabel: true
                                        };
                                        n.xAxis = {
                                            type: "category",
                                            boundaryGap: false,
                                            data: m
                                        };
                                        n.yAxis = {
                                            type: "value"
                                        };
                                        n.series = [{
                                            type: "bar",
                                            data: p
                                        }];
                                        break
                                }
                                b[l.Id].setOption(n)
                            }
                        })
                });
            window.onresize = function (i) {
                $.each(b,
                    function (j, k) {
                        k.resize(i)
                    })
            }
        }
    }
    $(".lr-desktop-panel").lrscroll();
    top.learun.clientdata.getAsync("desktop", {
        callback: function (g) {
            e(g.target || []);
            c(g.list || []);
            a(g.chart || [])
        }
    })
});