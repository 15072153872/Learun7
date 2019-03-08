using Learun.Application.OA.Email.EmailReceive;
using System.Data.Entity.ModelConfiguration;

namespace Learun.Application.Mapping.LR_OA
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架
    /// Copyright (c) 2013-2017 
    /// 创建人：陈彬彬
    /// 日 期：2017.04.17
    /// 描 述：邮件接收
    /// </summary>
    public class EmailReceiveMap : EntityTypeConfiguration<EmailReceiveEntity>
    {
        public EmailReceiveMap()
        {
            #region  表、主键
            //表
            this.ToTable("LR_EMAILRECEIVE");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region  配置关系
            #endregion
        }
    }
}