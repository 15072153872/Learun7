using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Learun.Application.Web.Areas.LR_Desktop.Controllers
{
    public class DTSettingController : MvcControllerBase
    {
        // GET: LR_Desktop/DTSetting
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult PcIndex()
        {
            return View();
        }

        public ActionResult AppIndex()
        {
            return View();
        }
    }
}