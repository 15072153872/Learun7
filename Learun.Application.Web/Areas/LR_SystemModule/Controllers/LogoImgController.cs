using Learun.Application.Base.SystemModule;
using System;
using System.IO;
using System.Web;
using System.Web.Mvc;

namespace Learun.Application.Web.Areas.LR_SystemModule.Controllers
{
    public class LogoImgController : MvcControllerBase
    {
        DatabaseLinkIBLL databaseLinkIbll = new DatabaseLinkBLL();

        // GET: LR_SystemModule/LogoImg
        public ActionResult AppIndex()
        {
            return View();
        }

        public ActionResult UploadFile(string code)
        {

            HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            //没有文件上传，直接返回
            if (files[0].ContentLength == 0 || string.IsNullOrEmpty(files[0].FileName))
            {
                return HttpNotFound();
            }
            string fExtension = Path.GetExtension(files[0].FileName);
            string rootPath = Server.MapPath("/");
            try
            {
                switch (code)
                {

                    case "default":
                        files[0].SaveAs(rootPath + "/Content/images/logo/default.png");
                        break;
                    case "accordion":
                        files[0].SaveAs(rootPath + "/Content/images/logo/accordion.png");
                        break;
                    case "windows":
                        files[0].SaveAs(rootPath + "/Content/images/logo/windows.png");
                        break;
                    case "top":
                        files[0].SaveAs(rootPath + "/Content/images/logo/top.png");
                        break;
                    case "applogo":
                        files[0].SaveAs(rootPath+"/Content/images/logo/applogo.png");
                        break;

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }


            return Success("保存成功！");
        }

        public ActionResult GetImg(string code)
        {
            string rootPath = Server.MapPath("/");
            string midPath = "Content/images/logo";
            try
            {
                switch (code)
                {
                    case "default":

                        var bytesdefault = System.IO.File.ReadAllBytes(Path.Combine(rootPath, midPath, "default.png"));
                        return File(bytesdefault, "image/jpeg");
                    case "accordion":
                        var bytesaccordion = System.IO.File.ReadAllBytes(Path.Combine(rootPath, midPath, "accordion.png"));
                        return File(bytesaccordion, "image/jpeg");
                        
                    case "windows":
                        var byteswindows = System.IO.File.ReadAllBytes(Path.Combine(rootPath, midPath, "windows.png"));
                        return File(byteswindows, "image/jpeg");
                    case "top":
                        var bytestop = System.IO.File.ReadAllBytes(Path.Combine(rootPath, midPath, "top.png"));
                        return File(bytestop, "image/jpeg");
                    case "applogo":
                        var byteapplogo = System.IO.File.ReadAllBytes(Path.Combine(rootPath, midPath, "applogo.png"));
                        return File(byteapplogo, "image/jpeg");

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            
            return null;
        }

        public ActionResult PCIndex()
        {
            return View();
        }

    }
}