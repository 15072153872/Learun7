using System.Web.Mvc;

namespace Learun.Application.Web.Areas.LR_Desktop
{
    public class LR_DesktopAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "LR_Desktop";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "LR_Desktop_default",
                "LR_Desktop/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}