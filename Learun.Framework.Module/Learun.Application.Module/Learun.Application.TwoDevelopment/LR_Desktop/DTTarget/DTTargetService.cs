using Dapper;
using Learun.DataBase.Repository;
using Learun.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Learun.Application.Base.SystemModule;

namespace Learun.Application.TwoDevelopment.LR_Desktop
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员
    /// 日 期：2018-09-21 16:35
    /// 描 述：统计配置
    /// </summary>
    public class DTTargetService : RepositoryFactory
    {
        #region  获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// <summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        public IEnumerable<DTTargetEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_Name,
                t.F_Icon,
                t.F_Url,
                t.F_Sort,
                t.F_Sql,
                t.F_CreateUserId,
                t.F_CreateUserName,
                t.F_CreateDate,
                t.F_Description,
                t.F_DataSourceId 

                ");
                strSql.Append("  FROM LR_DT_Target t ");
                strSql.Append("  WHERE 1=1 ");
                if (!string.IsNullOrEmpty(queryJson))
                {
                    var queryParam = queryJson?.ToJObject();
                    // 虚拟参数
                    var dp = new DynamicParameters(new { });
                    if (!queryParam["F_Name"].IsEmpty())
                    {
                        dp.Add("F_Name", "%" + queryParam["F_Name"].ToString() + "%", DbType.String);
                        strSql.Append(" AND t.F_Name Like @F_Name ");
                    }
                    if (!queryParam["F_Description"].IsEmpty())
                    {
                        dp.Add("F_Description", "%" + queryParam["F_Description"].ToString() + "%", DbType.String);
                        strSql.Append(" AND t.F_Description Like @F_Description ");
                    }

                     
                    return this.BaseRepository().FindList<DTTargetEntity>(strSql.ToString(), dp, pagination);
                }
                else
                {
                    return this.BaseRepository().FindList<DTTargetEntity>(strSql.ToString());

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
        /// 获取LR_DT_Target表实体数据
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        public DTTargetEntity GetLR_DT_TargetEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<DTTargetEntity>(keyValue);
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

        internal double GetSqlData(string id)
        {
            try
            {
                var chartEntity = this.BaseRepository().FindEntity<DTTargetEntity>(p => p.F_Id == id);
                var databsseLinkEntity = this.BaseRepository().FindEntity<DatabaseLinkEntity>(p => p.F_DatabaseLinkId == chartEntity.F_DataSourceId);

                var reqtable = this.BaseRepository(databsseLinkEntity.F_DbConnection, databsseLinkEntity.F_DbType)
                    .FindTable(chartEntity.F_Sql);
                return reqtable.Rows[0][0].ToDouble();
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
                this.BaseRepository().Delete<DTTargetEntity>(t=>t.F_Id == keyValue);
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
        /// 保存实体数据（新增、修改）
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        public void SaveEntity(string keyValue, DTTargetEntity entity)
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
