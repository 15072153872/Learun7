using Learun.Application.TwoDevelopment.LR_Desktop;
using System.Data.Entity.ModelConfiguration;

namespace  Learun.Application.Mapping
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员
    /// 日 期：2018-09-25 10:57
    /// 描 述：消息配置
    /// </summary>
    public class DTListMap : EntityTypeConfiguration<DTListEntity>
    {
        public DTListMap()
        {
            #region  表、主键
            //表
            this.ToTable("LR_DT_LIST");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region  配置关系
            #endregion
        }
    }
}

