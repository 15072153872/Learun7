using Learun.Util;
using System.Collections.Generic;

namespace Learun.Application.OA.Email
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架
    /// Copyright (c) 2013-2017 
    /// 创建人：陈彬彬
    /// 日 期：2018.06.04
    /// 描 述：邮件管理
    /// </summary>
    public interface EmailIBLL
    {
        #region  获取数据
        /// <summary>
        /// 获取邮件
        /// </summary>
        /// <param name="account">邮件账户</param>
        /// <param name="receiveCount">当前数量</param>
        /// <returns></returns>
        List<MailModel> GetMail(MailAccount account, int receiveCount);

        /// <summary>
        /// 发送邮件
        /// </summary>
        /// <param name="account">邮箱账户</param>
        /// <param name="mailModel">邮箱类</param>
        /// <returns></returns>
        void SendMail(MailAccount account, MailModel mailModel);


        /// <summary>
        /// 删除邮件
        /// </summary>
        /// <param name="account">邮箱账户</param>
        /// <param name="UID">UID</param>
        /// <returns></returns>
        void DeleteMail(MailAccount account, string UID);
        #endregion

        #region  提交数据

        #endregion
    }
}