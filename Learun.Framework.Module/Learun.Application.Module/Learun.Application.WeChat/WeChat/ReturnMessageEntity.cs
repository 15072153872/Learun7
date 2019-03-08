﻿namespace Learun.Application.WeChat.WeChat
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架
    /// Copyright (c) 2013-2017 
    /// 创 建：超级管理员
    /// 日 期：2017-09-22 12:01
    /// 描 述：微信一般接口返回类
    /// </summary>
    public class ReturnMessageEntity
    {
        /// <summary>
        /// 错误码
        /// </summary>
        public int errcode { get; set; }
        /// <summary>
        /// 错误内容
        /// </summary>
        public string errmsg { get; set; }
    }
}
