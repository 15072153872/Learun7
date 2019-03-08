using Dapper;
using Learun.Application.Base.SystemModule;
using Learun.DataBase.Repository;
using Learun.Util;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Text;
using System.Linq;
using System.Linq.Expressions;

namespace Learun.Application.TwoDevelopment.LR_Desktop
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员
    /// 日 期：2018-09-25 11:32
    /// 描 述：图标配置
    /// </summary>
    public class DTChartService : RepositoryFactory
    {
        #region  获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// <summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        public IEnumerable<DTChartEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_Name,
                t.F_Icon,
                t.F_Sort,
                t.F_Sql,
                t.F_CreateDate,
                t.F_CreateUserName,
                t.F_Type,
                t.F_Proportion1,
                t.F_Proportion2,
                t.F_Proportion3,
                t.F_Proportion4,
                t.F_DataSourceId
                ");
                strSql.Append("  FROM LR_DT_Chart t ");
                strSql.Append("  WHERE 1=1 ");
                if (!string.IsNullOrEmpty(queryJson))
                {
                    var queryParam = queryJson.ToJObject();
                    // 虚拟参数
                    var dp = new DynamicParameters(new { });
                    if (pagination == null)
                    {
                        return this.BaseRepository().FindList<DTChartEntity>(strSql.ToString(), dp);
                    }
                    else
                    {
                        return this.BaseRepository().FindList<DTChartEntity>(strSql.ToString(), dp, pagination);
                    }

                }
                else
                {
                    var dp = new DynamicParameters(new { });
                    if (pagination == null)
                    {

                        return this.BaseRepository().FindList<DTChartEntity>(strSql.ToString(), dp);
                    }
                    else
                    {
                        return this.BaseRepository().FindList<DTChartEntity>(strSql.ToString(), dp, pagination);
                    }
                }
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }

        /// <summary>
        /// 获取LR_DT_Chart表实体数据
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        public DTChartEntity GetLR_DT_ChartEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<DTChartEntity>(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }

        #endregion

        #region  提交数据

        /// <summary>
        /// 删除实体数据
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        public void DeleteEntity(string keyValue)
        {
            try
            {
                this.BaseRepository().Delete<DTChartEntity>(t => t.F_Id == keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }

        internal List<NameValueCollection> GetSqlData(string id)
        {


            try
            {
                var chartEntity = this.BaseRepository().FindEntity<DTChartEntity>(p => p.F_Id == id);
                var databsseLinkEntity = this.BaseRepository().FindEntity<DatabaseLinkEntity>(p => p.F_DatabaseLinkId == chartEntity.F_DataSourceId);

                var reqtable = this.BaseRepository(databsseLinkEntity.F_DbConnection, databsseLinkEntity.F_DbType)
                        .FindTable(chartEntity.F_Sql);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }

            return null;
        }

        /// <summary>
        /// 保存实体数据（新增、修改）
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        public void SaveEntity(string keyValue, DTChartEntity entity)
        {
            try
            {
                if (!string.IsNullOrEmpty(keyValue))
                {
                    entity.Modify(keyValue);
                    this.BaseRepository().Update(entity);
                }
                else
                {
                    entity.Create();
                    this.BaseRepository().Insert(entity);
                }
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }

        #endregion

    }
}
