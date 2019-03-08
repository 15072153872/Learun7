using Dapper;
using Learun.DataBase.Repository;
using Learun.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Learun.Application.TwoDevelopment.LR_ReportTest
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员
    /// 日 期：2018-10-15 11:34
    /// 描 述：测试CRM报表
    /// </summary>
    public class TestCRMReportService : RepositoryFactory
    {
        #region  获取数据

        /// <summary>
        /// 获取报表数据
        /// <summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        public DataTable GetList(string queryJson)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT  ");
                strSql.Append(@" t.订单号,  t.客户名称,  t.销售额,  t.销售员,  t.订单日期,  t.付款日期 ");
                strSql.Append(@"  FROM (SELECT 
F_OrderCode AS 订单号,
c.F_FullName AS 客户名称, 
F_Accounts AS 销售额,
u.F_RealName AS 销售员,
F_OrderDate AS 订单日期,
F_PaymentDate AS 付款日期 
FROM LR_CRM_Order o INNER JOIN LR_CRM_Customer c ON o.F_CustomerId = c.F_CustomerId
INNER JOIN LR_Base_User u ON u.F_UserId = o.F_SellerId)t ");
                strSql.Append("  WHERE 1=1 ");
                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                if (!queryParam["订单号"].IsEmpty())
                {
                    dp.Add("订单号", "%" + queryParam["订单号"].ToString() + "%", DbType.String);
                    strSql.Append(" AND t.订单号 Like @订单号 ");
                }
                if (!queryParam["客户名称"].IsEmpty())
                {
                    dp.Add("客户名称", "%" + queryParam["客户名称"].ToString() + "%", DbType.String);
                    strSql.Append(" AND t.客户名称 Like @客户名称 ");
                }
                if (!queryParam["销售员"].IsEmpty())
                {
                    dp.Add("销售员", "%" + queryParam["销售员"].ToString() + "%", DbType.String);
                    strSql.Append(" AND t.销售员 Like @销售员 ");
                }
                return this.BaseRepository().FindTable(strSql.ToString(),dp);
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
        #endregion 

