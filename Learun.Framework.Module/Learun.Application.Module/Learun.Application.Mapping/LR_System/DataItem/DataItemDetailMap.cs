﻿using Learun.Application.Base.SystemModule;
using System.Data.Entity.ModelConfiguration;

namespace Learun.Application.Mapping
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创建人：陈彬彬
    /// 日 期：2017.03.04
    /// 描 述：数据字典详细
    /// </summary>
    public class DataItemDetailMap : EntityTypeConfiguration<DataItemDetailEntity>
    {
        public DataItemDetailMap()
        {
            #region  表、主键
            //表
            this.ToTable("LR_BASE_DATAITEMDETAIL");
            //主键
            this.HasKey(t => t.F_ItemDetailId);
            #endregion

            #region  配置关系
            #endregion
        }
    }
}
