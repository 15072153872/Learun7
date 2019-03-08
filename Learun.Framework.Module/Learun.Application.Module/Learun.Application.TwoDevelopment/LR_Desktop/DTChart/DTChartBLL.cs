using Learun.Util;
using System;
using System.Data;
using System.Collections.Generic;
using System.Collections.Specialized;
using Learun.Application.Base.SystemModule;

namespace Learun.Application.TwoDevelopment.LR_Desktop
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员
    /// 日 期：2018-09-25 11:32
    /// 描 述：图标配置
    /// </summary>
    public class DTChartBLL : DTChartIBLL
    {
        private DTChartService dTChartService = new DTChartService();
        private DatabaseLinkIBLL databaseLinkIbll = new DatabaseLinkBLL();
        private DataSourceIBLL dataSourceIbll = new DataSourceBLL();
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
                return dTChartService.GetPageList(pagination, queryJson);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
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
                return dTChartService.GetLR_DT_ChartEntity(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
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
                dTChartService.DeleteEntity(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
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
                dTChartService.SaveEntity(keyValue, entity);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        public List<NameValueCollection> GetSqlData(string id)
        {
            try
            {
              return   dTChartService.GetSqlData(id);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        #endregion

    }
}
