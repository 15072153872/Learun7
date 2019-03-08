using System.Web.Mvc;

namespace Learun.Application.Web.Areas.LR_ReportTest
{
    public class LR_ReportTestAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "LR_ReportTest";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "LR_ReportTest_default",
                "LR_ReportTest/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}