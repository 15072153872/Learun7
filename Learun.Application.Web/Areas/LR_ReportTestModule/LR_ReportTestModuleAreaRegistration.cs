using System.Web.Mvc;

namespace Learun.Application.Web.Areas.LR_ReportTestModule
{
    public class LR_ReportTestModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "LR_ReportTestModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "LR_ReportTestModule_default",
                "LR_ReportTestModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}