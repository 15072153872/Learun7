namespace Learun.Application.Organization
{
    /// <summary>
    /// 版 本 Learun-ADMS-Ultimate V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创建人：陈彬彬
    /// 日 期：2018.03.27
    /// 描 述：公司数据模型
    /// </summary>
    public class CompanyModel
    {
        /// <summary>
        /// 公司上级Id
        /// </summary>
        public string parentId { get; set; }
        /// <summary>
        /// 公司名称
        /// </summary>
        public string name { get; set; }
    }
}
