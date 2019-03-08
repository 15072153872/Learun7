using Learun.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learun.Application.TwoDevelopment.LR_Desktop
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员
    /// 日 期：2018-09-25 11:32
    /// 描 述：图标配置
    /// </summary>
    public class DTChartEntity 
    {
        #region  实体成员
        /// <summary>
        /// F_Id
        /// </summary>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// F_Name
        /// </summary>
        [Column("F_NAME")]
        public string F_Name { get; set; }
        /// <summary>
        /// F_Sql
        /// </summary>
        [Column("F_SQL")]
        public string F_Sql { get; set; }
        /// <summary>
        /// F_Sort
        /// </summary>
        [Column("F_SORT")]
        public int? F_Sort { get; set; }
        /// <summary>
        /// F_CreateUserId
        /// </summary>
        [Column("F_CREATEUSERID")]
        public string F_CreateUserId { get; set; }
        /// <summary>
        /// F_CreateUserName
        /// </summary>
        [Column("F_CREATEUSERNAME")]
        public string F_CreateUserName { get; set; }
        /// <summary>
        /// F_CreateDate
        /// </summary>
        [Column("F_CREATEDATE")]
        public DateTime? F_CreateDate { get; set; }
        /// <summary>
        /// F_Description
        /// </summary>
        [Column("F_DESCRIPTION")]
        public string F_Description { get; set; }
        /// <summary>
        /// F_Proportion1
        /// </summary>
        [Column("F_PROPORTION1")]
        public int? F_Proportion1 { get; set; }
        /// <summary>
        /// F_Proportion2
        /// </summary>
        [Column("F_PROPORTION2")]
        public int? F_Proportion2 { get; set; }
        /// <summary>
        /// F_Proportion3
        /// </summary>
        [Column("F_PROPORTION3")]
        public int? F_Proportion3 { get; set; }
        /// <summary>
        /// F_Proportion4
        /// </summary>
        [Column("F_PROPORTION4")]
        public int? F_Proportion4 { get; set; }
        /// <summary>
        /// F_DataSourceId
        /// </summary>
        [Column("F_DATASOURCEID")]
        public string F_DataSourceId { get; set; }
        /// <summary>
        /// F_Icon
        /// </summary>
        [Column("F_ICON")]
        public string F_Icon { get; set; }
        /// <summary>
        /// F_Type
        /// </summary>
        [Column("F_TYPE")]
        public int? F_Type { get; set; }
        #endregion

        #region  扩展操作
        /// <summary>
        /// 新增调用
        /// </summary>
        public void Create()
        {
            this.F_Id = Guid.NewGuid().ToString();
            this.F_CreateDate = DateTime.Now;
            UserInfo userInfo = LoginUserInfo.Get();
            this.F_CreateUserId = userInfo.userId;
            this.F_CreateUserName = userInfo.realName;
        }
        /// <summary>
        /// 编辑调用
        /// </summary>
        /// <param name="keyValue"></param>
        public void Modify(string keyValue)
        {
            this.F_Id = keyValue;
        }
        #endregion
        #region  扩展字段
        #endregion
    }
}

