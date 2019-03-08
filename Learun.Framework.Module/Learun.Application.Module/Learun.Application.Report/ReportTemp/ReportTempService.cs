using Learun.DataBase.Repository;
using Learun.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Learun.Application.Report
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员
    /// 日 期：2017-07-12 09:57
    /// 描 述：报表管理
    /// </summary>
    public class ReportTempService : RepositoryFactory
    {
        #region  获取数据
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="keyword">关键词</param>
        /// <returns></returns>
        public IEnumerable<ReportTempEntity> GetPageList(Pagination pagination, string keyword)
        {
            try
            {
                if (string.IsNullOrEmpty(pagination.sidx))
                {
                    pagination.sidx = "F_CreateDate";
                    pagination.sord = "DESC";
                }

                if (string.IsNullOrEmpty(keyword))
                {
                    return this.BaseRepository().FindList<ReportTempEntity>(pagination);

                }
                else
                {
                    return this.BaseRepository()
                        .FindList<ReportTempEntity>(p => p.F_EnCode.Contains(keyword) || p.F_FullName.Contains(keyword),
                            pagination);
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
        /// 获取实体
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <returns></returns>
        public ReportTempEntity GetEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<ReportTempEntity>(keyValue);
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
        /// 删除
        /// </summary>
        /// <param name="keyValue">主键</param>
        public void DeleteEntity(string keyValue)
        {
            try
            {
                ReportTempEntity entity = new ReportTempEntity()
                {
                    F_TempId = keyValue,
                };
                this.BaseRepository().Delete(entity);
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
        /// 保存（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <param name="entity">实体对象</param>
        /// <returns></returns>
        public void SaveEntity(string keyValue, ReportTempEntity entity)
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

        internal ReportTempEntity GetEntityByEnCode(string encode)
        {
            try
            {
                return this.BaseRepository().FindEntity<ReportTempEntity>(p=>p.F_EnCode== encode);
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
        /// Gets the report data.
        /// </summary>
        /// <param name="dataSourceId">The data source identifier.</param>
        /// <param name="strSql">The string SQL.</param>
        /// <param name="queryJson">The query json.</param>
        /// <returns>DataTable.</returns>
        internal DataTable GetReportData(string dataSourceId, string strSql, string queryJson)
        {
            return null;
        }
        #endregion
    }
}
