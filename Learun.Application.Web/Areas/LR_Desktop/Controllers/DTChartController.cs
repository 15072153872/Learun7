using Learun.Application.TwoDevelopment.LR_Desktop;
using Learun.Util;
using System.Web.Mvc;
using Learun.Application.Base.SystemModule;

namespace Learun.Application.Web.Areas.LR_Desktop.Controllers
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员
    /// 日 期：2018-09-25 11:32
    /// 描 述：图标配置
    /// </summary>
    public class DTChartController : MvcControllerBase
    {
        private DTChartIBLL dTChartIBLL = new DTChartBLL();
        private DatabaseLinkIBLL databaseLinkIbll = new DatabaseLinkBLL();
        #region  视图功能

        /// <summary>
        /// 主页面
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 表单页
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Form()
        {
            return View();
        }
        #endregion

        #region  获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// <summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetPageList(string pagination, string queryJson)
        {
            Pagination paginationobj = pagination.ToObject<Pagination>();

            var data = dTChartIBLL.GetPageList(paginationobj, queryJson);
            if (paginationobj == null)
            {

                return JsonResult(data);
            }
            else
            {
                var jsonData = new
                {
                    rows = data,
                    total = paginationobj.total,
                    page = paginationobj.page,
                    records = paginationobj.records
                };
                return JsonResult(jsonData);
            }


        }
        /// <summary>
        /// 获取表单数据
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetFormData(string keyValue)
        {
            var LR_DT_ChartData = dTChartIBLL.GetLR_DT_ChartEntity(keyValue);
            var jsonData = new
            {
                LR_DT_Chart = LR_DT_ChartData,
            };
            return JsonResult(jsonData);
        }
        #endregion

        #region  提交数据

        /// <summary>
        /// 删除实体数据
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        [HttpPost]
        [AjaxOnly]
        public ActionResult DeleteForm(string keyValue)
        {
            dTChartIBLL.DeleteEntity(keyValue);
            return Success("删除成功！");
        }
        /// <summary>
        /// 保存实体数据（新增、修改）
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult SaveForm(string keyValue, DTChartEntity entity)
        {

            dTChartIBLL.SaveEntity(keyValue, entity);
            return Success("保存成功！");
        }
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetSqlData(string Id)
        {


            var dtListEntity = dTChartIBLL.GetLR_DT_ChartEntity(Id);
            var reqDataTable = databaseLinkIbll.FindTable(dtListEntity.F_DataSourceId.Trim(), dtListEntity.F_Sql);
            var jsonData = new
            {
                Id = Id,
                value = reqDataTable,

            };
            return JsonResult(jsonData);
        }

        #endregion

    }
}
