﻿using Learun.Application.OA.File.FileInfo;
using System.Data.Entity.ModelConfiguration;

namespace Learun.Application.Mapping.LR_OA
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架
    /// Copyright (c) 2013-2017 
    /// 创建人：陈彬彬
    /// 日 期：2018.06.20
    /// 描 述：文件管理
    /// </summary>
    public class FileInfoMap : EntityTypeConfiguration<FileInfoEntity>
    {
        public FileInfoMap()
        {
            #region  表、主键
            //表
            this.ToTable("LR_OA_FileInfo");
            //主键
            this.HasKey(t => t.F_FileId);
            #endregion

            #region  配置关系
            #endregion
        }
    }
}