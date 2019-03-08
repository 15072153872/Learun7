using Dapper;
using Learun.DataBase.Repository;
using Learun.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Learun.Application.TwoDevelopment.LR_LGManager
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员
    /// 日 期：2018-09-29 14:51
    /// 描 述：语言映射
    /// </summary>
    public class LGMapService : RepositoryFactory
    {
        #region  获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// <summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        public DataTable GetPageList(Pagination pagination, string queryJson, string typeList)
        {
            try
            {
                var lgs = typeList.Split(',');
                var strSql = new StringBuilder();
                strSql.Append(" select F_Code, ");

                for (int i = 0; i < lgs.Length; i++)
                {
                    if (i == lgs.Length - 1)
                    {
                        strSql.Append($" MAX( case f_typecode when '{lgs[i]}' then f_name end ){lgs[i]}");

                    }
                    else
                    {
                        strSql.Append($" MAX( case f_typecode when '{lgs[i]}' then f_name end ){lgs[i]} ,");
                    }
                }

                strSql.Append(" From dbo.LR_Lg_Map");
                strSql.Append("  WHERE 1=1 ");
                

               
                var queryParam = queryJson.ToJObject();
                // 虚拟参数 
                var dp = new DynamicParameters(new { });

                strSql.Append(" group by F_Code");
                return this.BaseRepository().FindTable(strSql.ToString(), dp, pagination);

                //return this.BaseRepository().FindList<LgMapEntity>(strSql.ToString(), dp, pagination);
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
        /// 获取LR_Lg_Map表实体数据
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        public LgMapEntity GetLR_Lg_MapEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<LgMapEntity>(keyValue);
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
                this.BaseRepository().Delete<LgMapEntity>(t => t.F_Id == keyValue);
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
        public void SaveEntity(string keyValue, LgMapEntity entity)
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

        /// <summary>
        /// 根据queryjson 查询数据库信息
        /// </summary>
        /// <param name="queryJson">The query json.</param>
        /// <returns>IEnumerable&lt;LR_Lg_MapEntity&gt;.</returns>
        public IEnumerable<LgMapEntity> GetList(string queryJson)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Code,
                t.F_ID,
                t.F_Name,
                t.F_TypeCode


                ");
                strSql.Append("  FROM LR_Lg_Map t ");
                strSql.Append("  WHERE 1=1 ");
                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                if (!queryParam["F_Code"].IsEmpty())
                {
                    dp.Add("F_Code", queryParam["F_Code"].ToString(), dbType: DbType.String);
                    strSql.Append(" AND t.F_Code= @F_Code ");
                }
                if (!queryParam["F_Name"].IsEmpty())
                {
                    dp.Add("F_Name", queryParam["F_Name"].ToString(), dbType: DbType.String);
                    strSql.Append(" AND t.F_Name= @F_Name ");
                }
                if (!queryParam["F_TypeCode"].IsEmpty())
                {
                    dp.Add("F_TypeCode", queryParam["F_TypeCode"].ToString(), dbType: DbType.String);
                    strSql.Append(" AND t.F_TypeCode= @F_TypeCode ");
                }
                return this.BaseRepository().FindList<LgMapEntity>(strSql.ToString(), dp);
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
    }
}
