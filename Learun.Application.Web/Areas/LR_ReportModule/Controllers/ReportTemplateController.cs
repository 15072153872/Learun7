using Learun.Util;
using System.Web.Mvc;

namespace Learun.Application.Web.Areas.LR_ReportModule.Controllers
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创建人：陈彬彬
    /// 日 期：2017.03.09
    /// 描 述：报表模板
    /// </summary>
    public class ReportTemplateController : MvcControllerBase
    {
        #region  视图功能
        /// <summary>
        /// 采购报表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult PurchaseReport()
        {
            return View();
        }
        /// <summary>
        /// 销售报表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult SalesReport()
        {
            return View();
        }
        /// <summary>
        /// 仓库报表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult StockReport()
        {
            return View();
        }
        /// <summary>
        /// 收支报表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult FinanceReport()
        {
            return View();
        }
        #endregion

        #region  获取数据
        /// <summary>
        /// 获取采购报表数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetPurchaseReportList()
        {
            var data = ExcelHelper.ExcelImport(Server.MapPath("~/Areas/LR_ReportModule/Views/ReportTemplate/ReportData/PurchaseReport.xlsx"));
            return JsonResult(data);
        }
        /// <summary>
        /// 获取销售报表数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetSalesReportList()
        {
            var data = ExcelHelper.ExcelImport(Server.MapPath("~/Areas/LR_ReportModule/Views/ReportTemplate/ReportData/SalesReport.xlsx"));
            return JsonResult(data);
        }
        /// <summary>
        /// 获取仓库报表数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetStockReportList()
        {
            var data = ExcelHelper.ExcelImport(Server.MapPath("~/Areas/LR_ReportModule/Views/ReportTemplate/ReportData/StockReport.xlsx"));
            return JsonResult(data);
        }
        /// <summary>
        /// 获取收支报表数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetFinanceReportList()
        {
            var data = ExcelHelper.ExcelImport(Server.MapPath("~/Areas/LR_ReportModule/Views/ReportTemplate/ReportData/FinanceReport.xlsx"));
            return JsonResult(data);
        }
        #endregion
    }
}