﻿/*
 * 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架(http://www.learun.cn) 
 * Copyright (c) 2013-2018 上海力软信息技术有限公司 
 * 创建人：陈彬彬
 * 日 期：2017.03.16
 * 描 述：经典风格皮肤	
 */
var bootstrap = function ($, learun) {
    "use strict";
    // 菜单操作
    var meuns = {
        init: function () {
            debugger;

            this.load();
            this.bind();
        },
        load: function () {
            var modulesTree = learun.clientdata.get(['modulesTree']);
            // 第一级菜单
            var parentId = '0';
            var modules = modulesTree[parentId] || [];
            var $firstmenus = $('<ul class="lr-first-menu-list"></ul>');
            for (var i = 0, l = modules.length; i < l; i++) {
                var item = modules[i];
                if (item.F_IsMenu == 1) {
                    var $firstMenuItem = $('<li></li>');
                    if (!!item.F_Description) {
                        $firstMenuItem.attr('title', item.F_Description);
                    }
                    var menuItemHtml = '<a id="' + item.F_ModuleId + '" href="javascript:void(0);" class="lr-menu-item">';
                    menuItemHtml += '<i class="' + item.F_Icon + ' lr-menu-item-icon"></i>';
                    menuItemHtml += '<span class="lr-menu-item-text">' + item.F_FullName + '</span>';
                    menuItemHtml += '<span class="lr-menu-item-arrow"></span></a>';
                    $firstMenuItem.append(menuItemHtml);
                    // 第二级菜单
                    var secondModules = modulesTree[item.F_ModuleId] || [];
                    var $secondMenus = $('<ul class="lr-second-menu-list"></ul>');
                    var secondMenuHad = false;
                    for (var j = 0, sl = secondModules.length ; j < sl; j++) {
                        var secondItem = secondModules[j];
                        if (secondItem.F_IsMenu == 1) {
                            secondMenuHad = true;
                            var $secondMenuItem = $('<li></li>');
                            if (!!secondItem.F_Description) {
                                $secondMenuItem.attr('title', secondItem.F_Description);
                            }
                            var secondItemHtml = '<a id="' + secondItem.F_ModuleId + '" href="javascript:void(0);" class="lr-menu-item" >';
                            secondItemHtml += '<i class="' + secondItem.F_Icon + ' lr-menu-item-icon"></i>';
                            secondItemHtml += '<span class="lr-menu-item-text">' + secondItem.F_FullName + '</span>';
                            secondItemHtml += '</a>';

                            $secondMenuItem.append(secondItemHtml);
                            // 第三级菜单
                            var threeModules = modulesTree[secondItem.F_ModuleId] || [];
                            var $threeMenus = $('<ul class="lr-three-menu-list"></ul>');
                            var threeMenuHad = false;
                            for (var m = 0, tl = threeModules.length ; m < tl; m++) {
                                var threeItem = threeModules[m];
                                if (threeItem.F_IsMenu == 1) {
                                    threeMenuHad = true;
                                    var $threeMenuItem = $('<li></li>');
                                    $threeMenuItem.attr('title', threeItem.F_FullName);
                                    var threeItemHtml = '<a id="' + threeItem.F_ModuleId + '" href="javascript:void(0);" class="lr-menu-item" >';
                                    threeItemHtml += '<i class="' + threeItem.F_Icon + ' lr-menu-item-icon"></i>';
                                    threeItemHtml += '<span class="lr-menu-item-text">' + threeItem.F_FullName + '</span>';
                                    threeItemHtml += '</a>';
                                    $threeMenuItem.append(threeItemHtml);
                                    $threeMenus.append($threeMenuItem);
                                }
                            }
                            if (threeMenuHad) {
                                $secondMenuItem.addClass('lr-meun-had');
                                $secondMenuItem.append($threeMenus);
                            }
                            $secondMenus.append($secondMenuItem);
                        }
                    }
                    if (secondMenuHad) {
                        $firstMenuItem.append($secondMenus);
                    }
                    $firstmenus.append($firstMenuItem);
                }
            }
            $('#lr_frame_menu').html($firstmenus);


            // 语言包翻译
            $('.lr-menu-item-text').each(function () {
                var $this = $(this);
                var text = $this.text();
                learun.language.get(text, function (text) {
                    $this.text(text);
                    $this.parent().parent().attr('title', text);
                });
            });
        },
        bind: function () {
            $("#lr_frame_menu").lrscroll();
            $("#lr_frame_menu .lr-first-menu-list > li").hover(function (e) {// 一级菜单选中的时候判断二级菜单的位置
                //$('#lr_frame_menu').width(4000);
                var $secondMenu = $(this).find('.lr-second-menu-list');
                var length = $secondMenu.find('li').length;
                if (length > 0) {
                    $secondMenu.css('top', '0px');
                    var secondMenuTop = $(this).offset().top + $secondMenu.height() + 23;
                    var bodyHeight = $(window).height();
                    if (secondMenuTop > bodyHeight) {
                        $secondMenu.css('top', '-' + (secondMenuTop - bodyHeight) + 'px');
                    }
                }
            }, function (e) {
                $('#lr_frame_menu').width(80);
            });

            $("#lr_frame_menu .lr-second-menu-list > li.lr-meun-had").hover(function (e) {// 二级菜单选中的时候判断三级菜单的位置
                var $ul = $(this).find('.lr-three-menu-list');
                $ul.css('top', '-9px');
                var ulTop = $(this).offset().top + $ul.height() + 23;
                var bodyHeight = $(window).height();
                if (ulTop > bodyHeight) {
                    $ul.css('top', '-' + (ulTop - bodyHeight) + 'px');
                }
            });

            // 添加点击事件
            $('#lr_frame_menu .lr-menu-item').on('click', function () {
                var $obj = $(this);
                var id = $obj.attr('id');
                var _module = learun.clientdata.get(['modulesMap', id]);
                switch (_module.F_Target) {
                    case 'iframe':// 窗口
                        if (learun.validator.isNotNull(_module.F_UrlAddress).code) {
                            learun.frameTab.open(_module);
                        }
                        else {

                        }
                        break;
                }
            });
        }
    };
    meuns.init();


    var companyMap = {};
    var departmentMap = {};
    var userMap = {};

    var imUserId = '';

    var getHeadImg = function (user) {
        var url = top.$.rootUrl;
        switch (user.img) {
            case '0':
                url += '/Content/images/head/on-girl.jpg';
                break;
            case '1':
                url += '/Content/images/head/on-boy.jpg';
                break;
            default:
                url += '/LR_OrganizationModule/User/GetImg?userId=' + user.id;
                break;
        }
        return url;
    };
    // 发送聊天信息
    var sendMsg = function (msg, time) {
        var loginInfo = learun.clientdata.get(['userinfo']);
        learun.clientdata.getAsync('user', {
            key: loginInfo.userId,
            callback: function (data, op) {
                data.id = op.key;
                var _html = '\
                <div class="im-me">\
                    <div class="headimg"><img src="'+ getHeadImg(data) + '"></div>\
                    <div class="arrow"></div>\
                    <span class="content">'+ msg + '</span>\
                </div>';

                if (time && time != '') {
                    $('.lr-im-msgcontent .lr-scroll-box').append('<div class="im-time">' + time + '</div>');
                }

                $('.lr-im-msgcontent .lr-scroll-box').append(_html);
                $('.lr-im-msgcontent').lrscrollSet('moveBottom');
            }
        });
    };
    // 接收聊天消息
    var revMsg = function (userId, msg, time) {
        learun.clientdata.getAsync('user', {
            key: userId,
            callback: function (data, op) {
                data.id = op.key;
                var _html = '\
                <div class="im-other">\
                    <div class="headimg"><img src="'+ getHeadImg(data) + '"></div>\
                    <div class="arrow"></div>\
                    <span class="content">'+ msg + '</span>\
                </div>';

                if (time && time != '') {
                    $('.lr-im-msgcontent .lr-scroll-box').append('<div class="im-time">' + time + '</div>');
                }

                $('.lr-im-msgcontent .lr-scroll-box').append(_html);
                $('.lr-im-msgcontent').lrscrollSet('moveBottom');
            }
        });
    };


    // 即时通讯
    var im = {
        init: function () {
            this.bind();
            this.load();
        },
        load: function () {
            // 获取下公司列表
            learun.clientdata.getAllAsync('company', {
                callback: function (data) {
                    $.each(data, function (_id, _item) {
                        companyMap[_item.parentId] = companyMap[_item.parentId] || [];
                        _item.id = _id;
                        companyMap[_item.parentId].push(_item);
                    });
                    var $list = $('#lr_im_content_userlist .lr-scroll-box');
                    $.each(companyMap["0"], function (_index, _item) {
                        var _html = '\
                            <div class="lr-im-company-item">\
                                <div class="lr-im-item-name lr-im-company" data-value="'+ _item.id + '"  data-deep="0" >\
                                    <i class="fa fa-angle-right"></i>'+ _item.name + '\
                                </div>\
                            </div>';
                        $list.append(_html);

                    });
                    // 获取部门列表
                    learun.clientdata.getAllAsync('department', {
                        callback: function (data) {
                            $.each(data, function (_id, _item) {
                                _item.id = _id;
                                if (_item.parentId == "0") {
                                    departmentMap[_item.companyId] = departmentMap[_item.companyId] || [];
                                    departmentMap[_item.companyId].push(_item);
                                }
                                else {
                                    departmentMap[_item.parentId] = departmentMap[_item.parentId] || [];
                                    departmentMap[_item.parentId].push(_item);
                                }
                            });
                            // 获取人员数据
                            learun.clientdata.getAllAsync('user', {
                                callback: function (data) {
                                    $.each(data, function (_id, _item) {
                                        _item.id = _id;
                                        if (_item.departmentId) {
                                            userMap[_item.departmentId] = userMap[_item.departmentId] || [];
                                            userMap[_item.departmentId].push(_item);
                                        }
                                        else if (_item.companyId) {
                                            userMap[_item.companyId] = userMap[_item.companyId] || [];
                                            userMap[_item.companyId].push(_item);
                                        }
                                    });
                                    // 获取最近联系人列表
                                    learun.im.getContacts(function (data) {
                                        var $userList = $('#lr_immsg_userlist .lr-scroll-box');
                                        $.each(data, function (_index, _item) {
                                            var html = '\
                                            <div class="userlist-item '+ (_item.F_IsRead == '1' ? 'imHasMsg' : '') + '" data-value="' + _item.F_OtherUserId + '"  >\
                                                <div class="photo"><img src="'+ top.$.rootUrl + '/Content/images/head/on-boy.jpg" >\
                                                <div class="point"></div></div>\
                                            </div>';
                                            $userList.append(html);
                                            learun.clientdata.getAsync('user', {
                                                key: _item.F_OtherUserId,
                                                index: _index,
                                                callback: function (data, op) {
                                                    var $item = $userList.find('[data-value="' + op.key + '"]');
                                                    $item.attr('title', data.name);
                                                    data.id = op.key;
                                                    $item.find('img').attr('src', getHeadImg(data));
                                                    if (op.index == 0) {
                                                        $item.trigger('click');
                                                    }
                                                    $item = null;
                                                }
                                            });
                                        });
                                    });
                                }
                            }); 
                        }
                    }); 

                }
            });
        },
        bind: function () {
            // 最近消息 与 联系人之间的切换
            $('.lr-im-title .title-item').on('click', function () {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $('.lr-im-body>.active').removeClass('active');
                    $('.lr-im-title>.active').removeClass('active');
                    $this.addClass('active');
                    var v = $this.attr('data-value');
                    $('#' + v).addClass('active');
                }
            });
            // 打开关闭聊天窗
            $('.lr-im-bell').on('click', function () {
                var $this = $(this);
                if ($this.hasClass('open')) {
                    $this.removeClass('open');
                    $('.lr-im-body').removeClass('open');
                }
                else {
                    $this.addClass('open');
                    $('.lr-im-bell .point').hide();
                    $('.lr-im-body').addClass('open');
                }
            });
            // 联系人
            $('#lr_im_content_userlist').lrscroll();
            $('#lr_immsg_userlist').lrscroll();
            $('.lr-im-msgcontent').lrscroll();

            // 联系人列表点击
            $('#lr_im_content_userlist .lr-scroll-box').on('click', function (e) {
                e = e || window.event;
                var et = e.target || e.srcElement;
                var $et = $(et);

                if (et.tagName == 'IMG' || et.tagName == 'I') {
                    $et = $et.parent();
                }

                if ($et.hasClass('lr-im-company')) {// 点击公司项
                    // 判断是否是打开的状态
                    if ($et.hasClass('open')) {
                        $et.removeClass('open');
                        $et.parent().find('.lr-im-user-list').remove();

                    } else {
                        var id = $et.attr('data-value');
                        var deep = parseInt($et.attr('data-deep'));
                        var $list = $('<div class="lr-im-user-list" ></div>');
                        $list.css({ 'padding-left': '10px' });
                        var flag = false;
                        // 加载员工
                        var loginInfo = learun.clientdata.get(['userinfo']);
                        $.each(userMap[id] || [], function (_index, _item) {
                            if (_item.id != loginInfo.userId) {
                                var _html = '\
                                <div class="lr-im-company-item">\
                                    <div class="lr-im-item-name lr-im-user" data-value="'+ _item.id + '" >\
                                         <img src="'+ getHeadImg(_item) + '" >' + _item.name + '\
                                    </div>\
                                </div>';
                                $list.append(_html);
                                flag = true;
                            }
                        });
                        // 加载部门
                        $.each(departmentMap[id] || [], function (_index, _item) {
                            var _html = '\
                            <div class="lr-im-company-item">\
                                <div class="lr-im-item-name lr-im-department" data-value="'+ _item.id + '"  data-deep="' + (deep + 1) + '" >\
                                    <i class="fa fa-angle-right"></i>'+ _item.name + '\
                                </div>\
                            </div>';
                            $list.append(_html);
                            flag = true;
                        });
                        // 加载下属公司
                        $.each(companyMap[id] || [], function (_index, _item) {
                            var _html = '\
                            <div class="lr-im-company-item">\
                                <div class="lr-im-item-name lr-im-company" data-value="'+ _item.id + '"  data-deep="' + (deep + 1) + '" >\
                                    <i class="fa fa-angle-right"></i>'+ _item.name + '\
                                </div>\
                            </div>';
                            $list.append(_html);
                            flag = true;
                        });



                        if (flag) {
                            $et.parent().append($list);
                        }
                        $et.addClass('open');
                    }
                    return false;
                }
                else if ($et.hasClass('lr-im-department')) {
                    // 判断是否是打开的状态
                    if ($et.hasClass('open')) {
                        $et.removeClass('open');
                        $et.parent().find('.lr-im-user-list').remove();

                    } else {
                        var id = $et.attr('data-value');
                        var deep = parseInt($et.attr('data-deep'));
                        var $list = $('<div class="lr-im-user-list" ></div>');
                        $list.css({ 'padding-left': '10px' });
                        var flag = false;
                        // 加载员工
                        var loginInfo = learun.clientdata.get(['userinfo']);
                        $.each(userMap[id] || [], function (_index, _item) {
                            if (_item.id != loginInfo.userId) {
                                var _html = '\
                                <div class="lr-im-company-item">\
                                    <div class="lr-im-item-name lr-im-user" data-value="'+ _item.id + '" >\
                                         <img src="'+ getHeadImg(_item) + '" >' + _item.name + '\
                                    </div>\
                                </div>';
                                $list.append(_html);
                                flag = true;
                            }
                        });
                        // 加载部门
                        $.each(departmentMap[id] || [], function (_index, _item) {
                            var _html = '\
                            <div class="lr-im-company-item">\
                                <div class="lr-im-item-name lr-im-department" data-value="'+ _item.id + '"  data-deep="' + (deep + 1) + '" >\
                                    <i class="fa fa-angle-right"></i>'+ _item.name + '\
                                </div>\
                            </div>';
                            $list.append(_html);
                            flag = true;
                        });

                        if (flag) {
                            $et.parent().append($list);
                        }
                        $et.addClass('open');

                    }

                }
                else if ($et.hasClass('lr-im-user')){
                    // 如果是用户列表
                    // 1.打开聊天窗口
                    // 2.添加一条最近联系人数据（如果没有添加的话）
                    // 3.获取最近的20条聊天数据或者最近的聊天信息

                    var id = $et.attr('data-value');
                    var $userList = $('#lr_immsg_userlist .lr-scroll-box');
                    var $userItem = $userList.find('[data-value="' + id + '"]');

                    // 更新下最近的联系人列表数据

                    $('.lr-im-title .title-item').eq(0).trigger('click');

                    $('#lr_im_msglist .lr-im-right').removeClass('lr-im-nouser');

                    imUserId = id;
                    if ($userItem.length > 0) {
                        $userList.prepend($userItem);
                        $userItem.trigger('click');
                    }
                    else {
                        $userList.find('.active').removeClass('active');
                        var imgurl = $et.find('img').attr('src');

                        var _html = '\
                            <div class="userlist-item" data-value="'+ id + '" >\
                                <div class="photo"><img src="'+ imgurl + '" >\
                                <div class="point"></div></div>\
                            </div>';

                        $userList.prepend(_html);

                        // 获取人员数据
                        learun.clientdata.getAsync('user', {
                            key: id,
                            callback: function (data, op) {
                                $userList.find('[data-value="' + op.key + '"]').attr('title', data.name).addClass('active');
                                $('#lr_im_msglist .lr-im-right .lr-im-touser').text(data.name);
                            }
                        });
                        learun.im.addContacts(id);
                        $('.lr-im-msgcontent .lr-scroll-box').html('');
                    }
                    $('#lr_im_input').val('');
                    $('#lr_im_input').select();
                }
            });
            // 最近联系人列表点击
            $('#lr_immsg_userlist .lr-scroll-box').on('click', function (e) {
                e = e || window.event;
                var et = e.target || e.srcElement;
                var $et = $(et);

                if (!$et.hasClass('userlist-item')) {
                    $et = $et.parents('.userlist-item');
                }
                if ($et.length > 0) {
                    if (!$et.hasClass('active')) {
                        var name = $et.attr('title');
                        imUserId = $et.attr('data-value');

                        $('#lr_immsg_userlist .lr-scroll-box .active').removeClass('active');
                        $et.addClass('active');
                        $('#lr_im_msglist .lr-im-right .lr-im-touser').text(name);
                        $('#lr_im_msglist .lr-im-right').removeClass('lr-im-nouser');

                        $('#lr_im_input').val('');
                        $('#lr_im_input').select();

                        $('.lr-im-msgcontent .lr-scroll-box').html('');
                        // 获取聊天信息
                        learun.im.getMsgList(imUserId, function (data) {
                            var len = data.length;
                            if (len > 0) {
                                for (var i = len - 1; i >= 0; i--) {
                                    var _item = data[i];
                                    learun.clientdata.getAsync('user', {
                                        key: _item.userId,
                                        msg: _item.content,
                                        time: _item.time,
                                        callback: function (data, op) {
                                            data.id = op.key;
                                            var loginInfo = learun.clientdata.get(['userinfo']);
                                            var _html = '\
                                            <div class="'+ (loginInfo.userId == op.key ? 'im-me' : 'im-other') + '">\
                                                <div class="headimg"><img src="'+ getHeadImg(data) + '"></div>\
                                                <div class="arrow"></div>\
                                                <span class="content">'+ op.msg + '</span>\
                                            </div>';
                                            $('.lr-im-msgcontent .lr-scroll-box').prepend(_html);
                                            $('.lr-im-msgcontent .lr-scroll-box').prepend('<div class="im-time">' + op.time + '</div>');
                                        }
                                    });
                                }
                                $('.lr-im-msgcontent').lrscrollSet('moveBottom');
                            }
                        }, $et.hasClass('imHasMsg'));
                        $et.removeClass('imHasMsg');
                        learun.im.updateContacts(imUserId);
                    }
                }
            });
            // 联系人搜索
            $('.lr-im-search input').on("keypress", function (e) {
                e = e || window.event;
                if (e.keyCode == "13") {
                    var $this = $(this);
                    var keyword = $this.val();
                    var $list = $('#lr_im_content_userlist .lr-scroll-box');
                    $list.html("");
                    if (keyword) {
                        learun.clientdata.getAllAsync('user', {
                            callback: function (data) {
                                var loginInfo = learun.clientdata.get(['userinfo']);
                                $.each(data, function (_index, _item) {
                                    if (_index != loginInfo.userId) {
                                        if (_item.name.indexOf(keyword) != -1) {
                                            _item.id = _index;
                                            var _html = '\
                                            <div class="lr-im-company-item">\
                                                <div class="lr-im-item-name lr-im-user" data-value="'+ _item.id + '" >\
                                                     <img src="'+ getHeadImg(_item) + '" >' + _item.name + '\
                                                </div>\
                                            </div>';
                                            $list.append(_html);
                                        }
                                    }
                                });
                            }
                        }); 
                    }
                    else {
                        $.each(companyMap["0"], function (_index, _item) {
                            var _html = '\
                            <div class="lr-im-company-item">\
                                <div class="lr-im-item-name lr-im-company" data-value="'+ _item.id + '"  data-deep="0" >\
                                    <i class="fa fa-angle-right"></i>'+ _item.name + '\
                                </div>\
                            </div>';
                            $list.append(_html);
                        });
                    }

                }
            });
            // 发送消息
            $('#lr_im_input').on("keypress", function (e) {
                e = e || window.event;
                if (e.keyCode == "13") {
                    var text = $(this).val();
                    $(this).val('');
                    if (text.replace(/(^\s*)|(\s*$)/g, "") != '') {
                        var time = learun.im.sendMsg(imUserId,text);
                        sendMsg(text, time);
                    }
                    console.log(text);

                    return false;
                }
            });

            // 注册消息接收
            learun.im.registerRevMsg(function (userId, msg, dateTime) {
                // 判断当前账号是否打开聊天窗口
                if (userId == imUserId) {
                    revMsg(userId, msg, dateTime);
                    learun.im.updateContacts(userId);
                }
                else {
                    var $userList = $('#lr_immsg_userlist .lr-scroll-box');
                    var $userItem = $userList.find('[data-value="' + userId + '"]');
                    $('#lr_im_msglist .lr-im-right').removeClass('lr-im-nouser');

                    if ($userItem.length > 0) {
                        $userList.prepend($userItem);
                        if (!$userItem.hasClass('imHasMsg')) {
                            $userItem.addClass('imHasMsg');
                        }
                    }
                    else {
                        var html = '\
                            <div class="userlist-item imHasMsg" data-value="'+ userId + '" >\
                                <div class="photo"><img src="'+ top.$.rootUrl + '/Content/images/head/on-boy.jpg" >\
                                <div class="point"></div></div>\
                            </div>';
                        $userList.prepend(html);
                        learun.clientdata.getAsync('user', {
                            key: userId,
                            callback: function (data, op) {
                                var $item = $userList.find('[data-value="' + op.key + '"]');
                                $item.attr('title', data.name);
                                data.id = op.key;
                                $item.find('img').attr('src', getHeadImg(data));
                                $item = null;
                            }
                        });

                        var _$userItem = $userList.find('.userlist-item');
                        if (_$userItem.length == 1) {
                            _$userItem.trigger('click');
                        }

                    }
                    $('#lr_im_input').val('');
                    $('#lr_im_input').select();
                }
                if (!$('.lr-im-bell').hasClass('open')) {
                    $('.lr-im-bell .point').show();
                }
            });

            // 查看聊天记录
            $('#lr_im_look_msg_btn').on('click', function () {
                learun.layerForm({
                    id: 'LookMsgIndex',
                    title: '查看聊天记录-' + $('#lr_im_msglist .lr-im-right .lr-im-touser').text(),
                    url: top.$.rootUrl + '/LR_IM/IMMsg/Index?userId=' + imUserId,
                    width: 800,
                    height: 500,
                    maxmin: true,
                    btn: null
                });
            });
        }
    };

    im.init();
};