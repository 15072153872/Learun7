﻿using Learun.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learun.Application.OA.Email.EmailSend
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架
    /// Copyright (c) 2013-2017 
    /// 创建人：陈彬彬
    /// 日 期：2018.06.04
    /// 描 述：邮箱发送
    /// </summary>
    public class EmailSendEntity
    {
        #region  实体成员
        /// <summary>
        /// 邮件发送主键
        /// </summary>
        /// <returns></returns>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 发件人
        /// </summary>
        /// <returns></returns>
        [Column("F_Sender")]
        public string F_Sender { get; set; }

        /// <summary>
        /// 发件人
        /// </summary>
        /// <returns></returns>
        [Column("F_SenderName")]
        public string F_SenderName { get; set; }
        /// <summary>
        /// 收件人
        /// </summary>
        /// <returns></returns>
        [Column("F_To")]
        public string F_To { get; set; }
        /// <summary>
        /// 抄送人
        /// </summary>
        /// <returns></returns>
        [Column("F_CC")]
        public string F_CC { get; set; }
        /// <summary>
        /// 密送人
        /// </summary>
        /// <returns></returns>
        [Column("F_BCC")]
        public string F_BCC { get; set; }
        /// <summary>
        /// 颜色
        /// </summary>
        /// <returns></returns>
        [Column("F_Colour")]
        public string F_Colour { get; set; }
        /// <summary>
        /// 主题
        /// </summary>
        /// <returns></returns>
        [Column("F_Subject")]
        public string F_Subject { get; set; }
        /// <summary>
        /// 正文
        /// </summary>
        /// <returns></returns>
        [Column("F_BodyText")]
        public string F_BodyText { get; set; }
        /// <summary>
        /// 附件
        /// </summary>
        /// <returns></returns>
        [Column("F_Attachment")]
        public string F_Attachment { get; set; }
        /// <summary>
        /// 状态
        /// </summary>
        /// <returns></returns>
        [Column("F_State")]
        public int? F_State { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        /// <returns></returns>
        [Column("F_DESCRIPTION")]
        public string F_Description { get; set; }
        /// <summary>
        /// 排序码
        /// </summary>
        /// <returns></returns>
        [Column("F_SORTCODE")]
        public int? F_SortCode { get; set; }
        /// <summary>
        /// 有效标志
        /// </summary>
        /// <returns></returns>
        [Column("F_ENABLEDMARK")]
        public int? F_EnabledMark { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        /// <returns></returns>
        [Column("F_CREATORTIME")]
        public DateTime? F_CreatorTime { get; set; }
        /// <summary>
        /// 创建用户
        /// </summary>
        /// <returns></returns>
        [Column("F_CREATORUSERID")]
        public string F_CreatorUserId { get; set; }
        /// <summary>
        /// 修改时间
        /// </summary>
        /// <returns></returns>
        [Column("F_LastModifyTime")]
        public DateTime? F_LastModifyTime { get; set; }
        /// <summary>
        /// 修改用户
        /// </summary>
        /// <returns></returns>
        [Column("F_LastModifyUserId")]
        public string F_LastModifyUserId { get; set; }
        /// <summary>
        /// 删除用户
        /// </summary>
        /// <returns></returns>
        [Column("F_DeleteMark")]
        public int? F_DeleteMark { get; set; }
        /// <summary>
        /// 删除时间
        /// </summary>
        /// <returns></returns>
        [Column("F_DeleteTime")]
        public DateTime? F_DeleteTime { get; set; }
        /// <summary>
        /// 删除用户
        /// </summary>
        /// <returns></returns>
        [Column("F_DeleteUserId")]
        public string F_DeleteUserId { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        /// <returns></returns>
        [Column("F_Date")]
        public DateTime? F_Date { get; set; }

        #endregion

        #region  扩展操作
        /// <summary>
        /// 新增调用
        /// </summary>
        public void Create()
        {
            this.F_CreatorTime = DateTime.Now;
            this.F_Date = DateTime.Now;
            this.F_EnabledMark = 0;
            this.F_DeleteMark = 0;
            UserInfo userInfo = LoginUserInfo.Get();
            this.F_CreatorUserId = userInfo.userId;
        }
        /// <summary>
        /// 编辑调用
        /// </summary>
        /// <param name="keyValue">主键</param>
        public void Modify(string keyValue)
        {
            this.F_Id = keyValue;
            this.F_LastModifyTime = DateTime.Now;

            UserInfo userInfo = LoginUserInfo.Get();
            this.F_LastModifyUserId = userInfo.userId;
        }
        #endregion
    }
}