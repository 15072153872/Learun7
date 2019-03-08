using Learun.Application.Base.SystemModule;
using Learun.Application.TwoDevelopment.LR_Desktop;
using Learun.Util;
using System.Web.Mvc;

namespace Learun.Application.Web.Areas.LR_Desktop.Controllers
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员
    /// 日 期：2018-09-25 10:57
    /// 描 述：消息配置
    /// </summary>
    public class DTListController : MvcControllerBase
    {
        private DTListIBLL dTListIBLL = new DTListBLL();
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
        public ActionResult GetList(string queryJson)
        {
            var data = dTListIBLL.GetList(queryJson);
            return JsonResult(data);
        }
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetPageList(string pagination, string queryJson)
        {
            Pagination paginationobj = pagination.ToObject<Pagination>();

            var data = dTListIBLL.GetPageList(paginationobj, queryJson);


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
                    records = paginationobj.records,
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
            var LR_DT_ListData = dTListIBLL.GetLR_DT_ListEntity(keyValue);
            var jsonData = new
            {
                LR_DT_List = LR_DT_ListData,
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
            dTListIBLL.DeleteEntity(keyValue);
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
        public ActionResult SaveForm(string keyValue, DTListEntity entity)
        {

            dTListIBLL.SaveEntity(keyValue, entity);
            return Success("保存成功！");
        }






        #endregion


        [HttpGet]
        [AjaxOnly]
        public ActionResult GetSqlData(string Id)
        {
            var dtListEntity = dTListIBLL.GetLR_DT_ListEntity(Id);
            var reqDataTable = databaseLinkIbll.FindTable(dtListEntity.F_DataSourceId.Trim(), dtListEntity.F_Sql);
            var jsonData = new
            {
                Id = Id,
                value = reqDataTable,

            };
            return JsonResult(jsonData);
        }


    }
}
