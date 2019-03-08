using System.Web.Mvc;

namespace Learun.Application.Web.Areas.LR_LGManager
{
    public class LR_LGManagerModuleAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "LR_LGManager";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "LR_LGManagerModule_default",
                "LR_LGManager/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}