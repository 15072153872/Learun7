using Learun.Application.TwoDevelopment.LR_Desktop;
using Learun.Util;
using System.Linq;
using System.Web.Mvc;

namespace Learun.Application.Web.Areas.LR_Desktop.Controllers
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员
    /// 日 期：2018-09-21 16:35
    /// 描 述：统计配置
    /// </summary>
    public class DTTargetController : MvcControllerBase
    {
        private DTTargetIBLL dTTargetIBLL = new DTTargetBLL();
        private DTListIBLL dtListIbll = new DTListBLL();
        private DTChartBLL dtChartBll = new DTChartBLL();

        #region  视图功能


        public ActionResult GetMap(string ver)
        {
            if (string.IsNullOrEmpty(ver))
            {
                ver = System.Guid.NewGuid().ToString("N");
            }
            //{"data":{"target":[{"F_Id":"1a2cf529-f9a6-4141-ad15-ab2015a798a1","F_Name":"最新商机量","F_Icon":"fa fa-pie-chart","F_Sql":null,"F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_CreateDate":"2018-05-28 18:26:00","F_Description":"对商机数的统计","F_Sort":1,"F_Url":"/LR_CRMModule/Chance/Index","F_DataSourceId":"7bb4e46a-a781-402d-8a52-3985b8db0af5"},{"F_Id":"d2c1de7e-1c0e-4270-9f4e-ca6bdd7d87d3","F_Name":"最新客户量","F_Icon":"fa fa-bar-chart-o","F_Sql":null,"F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_CreateDate":"2018-06-19 17:15:51","F_Description":"对客户数据进行统计","F_Sort":1,"F_Url":"/LR_CRMModule/Customer/Index","F_DataSourceId":"7bb4e46a-a781-402d-8a52-3985b8db0af5"},{"F_Id":"c14e3d98-784b-4a88-a62c-0a9f775fd292","F_Name":"新签订单量","F_Icon":"fa fa-windows","F_Sql":null,"F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_CreateDate":"2018-06-19 17:22:37","F_Description":null,"F_Sort":2,"F_Url":"/LR_CRMModule/CrmOrder/Index","F_DataSourceId":"7bb4e46a-a781-402d-8a52-3985b8db0af5"},{"F_Id":"395b04c3-d926-4d96-a2b8-f5899128fad4","F_Name":"本周付款额","F_Icon":"fa fa-globe","F_Sql":null,"F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_CreateDate":"2018-06-19 17:26:06","F_Description":null,"F_Sort":4,"F_Url":null,"F_DataSourceId":"7bb4e46a-a781-402d-8a52-3985b8db0af5"},{"F_Id":"2274bd2b-dca6-430c-b46c-17da999b6040","F_Name":"利润总额","F_Icon":"fa fa-globe","F_Sql":null,"F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_CreateDate":"2018-06-19 17:28:30","F_Description":null,"F_Sort":5,"F_Url":null,"F_DataSourceId":"7bb4e46a-a781-402d-8a52-3985b8db0af5"}],"list":[],"chart":[{"F_Id":"b9fb3027-24eb-48d3-b0f6-873a076e4189","F_Icon":"fa fa-bar-chart","F_DataSourceId":"7bb4e46a-a781-402d-8a52-3985b8db0af5","F_Name":"客户订单占比","F_Type":0,"F_Sql":null,"F_Sort":1,"F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_CreateDate":"2018-06-20 10:12:23","F_Description":null,"F_Proportion1":2,"F_Proportion2":1,"F_Proportion3":1,"F_Proportion4":1},{"F_Id":"1064e045-f075-42a2-8431-ba717e1539b3","F_Icon":"fa fa-bar-chart","F_DataSourceId":"7bb4e46a-a781-402d-8a52-3985b8db0af5","F_Name":"每月订单量","F_Type":1,"F_Sql":null,"F_Sort":2,"F_CreateUserId":"System","F_CreateUserName":"超级管理员","F_CreateDate":"2018-06-20 11:01:14","F_Description":null,"F_Proportion1":2,"F_Proportion2":1,"F_Proportion3":1,"F_Proportion4":2}]},"ver":"59ec6e63c0a761612592444d2702a409"}
            var targetlist = dTTargetIBLL.GetPageList(null, "");
            var dtlist = dtListIbll.GetPageList(null, "");
            var chartlist = dtChartBll.GetPageList(null, "");
            var reqobject = new
            {
                data = new
                {

                    target = targetlist.ToArray(),
                    list = dtlist.ToArray(),
                    chart = chartlist.ToArray()

                },
                ver = ver
            };
            return JsonResult(reqobject);
        }



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

            var data = dTTargetIBLL.GetPageList(paginationobj, queryJson);


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
            var LR_DT_TargetData = dTTargetIBLL.GetLR_DT_TargetEntity(keyValue);
            var jsonData = new
            {
                LR_DT_Target = LR_DT_TargetData,
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
            dTTargetIBLL.DeleteEntity(keyValue);
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
        public ActionResult SaveForm(string keyValue, DTTargetEntity strEntity)
        {


            dTTargetIBLL.SaveEntity(keyValue, strEntity);
            return Success("保存成功！");
        }
        #endregion
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetSqlData(string Id)
        {
            double valueRet = dTTargetIBLL.GetSqlData(Id);
            var jsonData = new
            {
                Id = Id,
                value = valueRet,

            };
            return JsonResult(jsonData);
        }

    }
}
