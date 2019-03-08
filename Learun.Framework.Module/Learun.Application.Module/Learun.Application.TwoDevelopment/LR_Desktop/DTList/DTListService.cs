using Dapper;
using Learun.DataBase.Repository;
using Learun.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Learun.Application.TwoDevelopment.LR_Desktop
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员
    /// 日 期：2018-09-25 10:57
    /// 描 述：消息配置
    /// </summary>
    public class DTListService : RepositoryFactory
    {
        #region  获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// <summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        public IEnumerable<DTListEntity> GetList(string queryJson)
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
                t.F_Url,
                t.F_ItemUrl,
                t.F_Description,
                t.F_CreateUserName,
                t.F_CreateDate,
                	replace(t.F_DataSourceId,' ','') F_DataSourceId ,
                t.F_Sql


                ");
                strSql.Append("  FROM LR_DT_List t ");
                strSql.Append("  WHERE 1=1 ");
                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                return this.BaseRepository().FindList<DTListEntity>(strSql.ToString(),dp);
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
        /// 获取LR_DT_List表实体数据
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        public DTListEntity GetLR_DT_ListEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<DTListEntity>(keyValue);
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
                this.BaseRepository().Delete<DTListEntity>(t=>t.F_Id == keyValue);
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

        internal IEnumerable<DTListEntity> GetPageList(Pagination paginationobj, string queryJson)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_Name,
                t.F_Url,
                t.F_Sql,
                t.F_ItemUrl,
                t.F_Description,
                t.F_DataSourceId,
                t.F_CreateUserId,
                t.F_CreateUserName,
                t.F_CreateDate,
                t.F_Sort


                ");
                strSql.Append("  FROM LR_DT_List t ");
                strSql.Append("  WHERE 1=1 ");
                if (!string.IsNullOrEmpty(queryJson))
                {
                    var queryParam = queryJson.ToJObject();
                    // 虚拟参数
                    var dp = new DynamicParameters(new { });
                    if (paginationobj==null)
                    {
                        return this.BaseRepository().FindList<DTListEntity>(strSql.ToString(), dp);
                    }
                    else
                    {
                        return this.BaseRepository().FindList<DTListEntity>(strSql.ToString(), dp, paginationobj);
                    }
                    
                }
                else
                {
                    var dp = new DynamicParameters(new { });
                    if (paginationobj==null)
                    {
                        
                        return this.BaseRepository().FindList<DTListEntity>(strSql.ToString(), dp);
                    }
                    else
                    {
                        return this.BaseRepository().FindList<DTListEntity>(strSql.ToString(), dp, paginationobj);
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
        /// 保存实体数据（新增、修改）
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        public void SaveEntity(string keyValue, DTListEntity entity)
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
