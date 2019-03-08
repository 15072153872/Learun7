using Learun.Application.TwoDevelopment.LR_LGManager;
using Learun.Util;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace Learun.Application.Web.Areas.LR_LGManager.Controllers
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员
    /// 日 期：2018-09-29 14:51
    /// 描 述：语言映射
    /// </summary>
    public class LGMapController : MvcControllerBase
    {
        private LGMapIBLL lGMapIBLL = new LGMapBLL();

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

        public ActionResult AddForm(string keyValue)
        {
            return View();
        }

        /// <summary>
        /// 字典翻译
        /// </summary>
        /// <returns>ActionResult.</returns>
        public ActionResult DataItemLG()
        {
            return View();
        }

        /// <summary>
        /// Systems the module lg. 系统模块翻译
        /// </summary>
        /// <returns>ActionResult.</returns>
        public ActionResult SystemModuleLG()
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
        public ActionResult GetPageList(string pagination, string queryJson, string typeList)
        {
            //节后再说吧
            //这里很复杂的写法呢
            Pagination paginationobj = pagination.ToObject<Pagination>();
            var data = lGMapIBLL.GetPageList(paginationobj, queryJson, typeList);
            //var lrltMapEntities = data as LR_Lg_MapEntity[] ?? data.ToArray();
            //var datagroup = lrltMapEntities.GroupBy(p => p.F_TypeCode);
            //List<object> facade= new List<object>();

            //foreach (IGrouping<string, LR_Lg_MapEntity> lgMapEntities in datagroup)
            //{
            //  var newlist=  typeList.Split(',');
            //  Dictionary<string,string> newobject = new Dictionary<string, string>();
            //    foreach (var s in newlist)
            //    {
            //        newobject.Add(s, lgMapEntities.First(p => p.F_TypeCode==s).F_Name); 
            //    }
            //    newobject.Add("f_code", lgMapEntities.Key);
            //    newobject.Add("rownum", lgMapEntities.Key);


            //}
            var jsonData = new
            {
                rows = data,
                total = paginationobj.total,
                page = paginationobj.page,
                records = paginationobj.records
            };
            return Success(jsonData);
            //   return null;
        }
        /// <summary>
        /// 获取表单数据
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetFormData(string keyValue)
        {
            var LR_Lg_MapData = lGMapIBLL.GetLR_Lg_MapEntity(keyValue);
            var jsonData = new
            {
                LR_Lg_Map = LR_Lg_MapData,
            };
            return Success(jsonData);
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
            lGMapIBLL.DeleteEntity(keyValue);
            return Success("删除成功！");
        }
        /// <summary>
        /// 保存实体数据（新增、修改）
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>


        #endregion

        #region    扩展

        
        public ActionResult GetListByNameAndType(string keyValue, string typeCode)
        {
            var qu = new
            {
                F_TypeCode = typeCode,
                F_Name = keyValue
            };

            var tcList = lGMapIBLL.GetList(qu.ToJson());
            return Success(tcList);
        }

        public ActionResult GetLanguageByCode(string typeCode, bool isMain, string ver)
        {
            var qu = new
            {
                F_TypeCode = typeCode,
                F_isMain = isMain
            };

            var tcList = lGMapIBLL.GetList(qu.ToJson());

            Dictionary<string, string> keyValuePairs = new Dictionary<string, string>();
            foreach (var item in tcList)
            {
                try
                {
                    if (isMain)
                    {
                        keyValuePairs.Add(item.F_Name, item.F_Code);

                    }
                    else
                    {
                        keyValuePairs.Add(item.F_Code, item.F_Name);
                    }
                }
                catch (Exception)
                {

                    //throw;
                }


            }
            var resData = new { data = keyValuePairs };
            return Success(resData);
        }

        public ActionResult GetList(string queryJson)
        {
            IEnumerable<LgMapEntity> modellist = lGMapIBLL.GetList(queryJson);
            return Success(modellist);
        }


        /// <summary>
        /// Saves the muti lg form.
        /// </summary>
        /// <param name="nameList">The name list.</param>
        /// <param name="newNameList">The new name list.</param>
        /// <param name="code">The code.</param>
        /// <returns>ActionResult.</returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult SaveForm(string nameList, string newNameList, string code)
        {
            try
            {
                if (string.IsNullOrEmpty(code))
                {
                    string mycode = Guid.NewGuid().ToString();
                    var mydict = newNameList.ToObject<Dictionary<string, string>>();
                    foreach (var kvalue in mydict)
                    {

                        LgMapEntity lrltMap = new LgMapEntity();
                        lrltMap.F_TypeCode = kvalue.Key;
                        lrltMap.F_Code = mycode;
                        lrltMap.F_Name = kvalue.Value;
                        lGMapIBLL.SaveEntity("", lrltMap);
                    }
                }
                else
                {
                    var list = lGMapIBLL.GetList(new { F_Code = code }.ToJson());
                    var mydict = newNameList.ToObject<Dictionary<string, string>>();
                    if (mydict.Count != list.Count())
                    {
                        foreach (var mydictKey in mydict.Keys)
                        {
                            if (list.Count(p => p.F_TypeCode.ToLower() == mydictKey.ToLower()) == 0)
                            {
                                LgMapEntity lge = new LgMapEntity();
                                lge.F_TypeCode = mydictKey;
                                lge.F_Code = code;
                                lge.F_Name = mydict[mydictKey];
                                lGMapIBLL.SaveEntity("", lge);

                            }
                        }
                    }
                    foreach (LgMapEntity mapEntity in list)
                    {
                        var objNewName = newNameList.ToObject<JObject>();

                        if (objNewName.ContainsKey(mapEntity.F_TypeCode))
                        {
                            mapEntity.F_Name = objNewName[mapEntity.F_TypeCode].ToString();
                            lGMapIBLL.SaveEntity(mapEntity.F_Id, mapEntity);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return Fail("保存异常！");

            }
            return Success("保存成功");
        }


        public ActionResult InitLG()
        {
            var allfiles = System.IO.Directory.GetFiles("D:\\dataitem\\", "*.txt");
            foreach (string file in allfiles)
            {
                string jsonData = System.IO.File.ReadAllText(file, Encoding.Default);

                var mydata = jsonData.ToObject<ReqParameter<FacadeNameListForm>>();

                foreach (var d in mydata.data.rows)
                {
                    try
                    {
                        lGMapIBLL.SaveEntity("", new LgMapEntity()
                        {
                            F_Code = d.f_code,
                            F_Id = d.f_id,
                            F_TypeCode = d.f_typecode,
                            F_Name = d.f_name
                        });
                    }
                    catch (Exception e)
                    {


                    }

                }

            }

            return Success("成了啊");
        }

        public class FacadeNameListForm
        {
            public List<MyRow> rows { get; set; }
        }

        public class MyRow
        {
            public string f_code { get; set; }
            public string f_id { get; set; }
            public string f_name { get; set; }
            public string f_typecode { get; set; }

        }
    }

    #endregion
}


