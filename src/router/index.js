import Vue from 'vue'
import Router from 'vue-router'

const login = () =>
    import ("@/pages/login")
const home = () =>
    import ("@/pages/home")
const partner_index = () =>
    import ("@/pages/partner"); //合作商信息管理--合作商信息
//import partner_index from "@/pages/partner"; //合作商信息管理--合作商信息
const partner_region = () =>
    import ("@/pages/partner/region"); //合作商信息管理--大区责任人信息
const partner_excel = () =>
    import ("@/pages/partner/excel"); //合作商信息管理--批量导入EXCEL模板
const partner_manager = () =>
    import ("@/pages/partner/manager"); //合作商信息管理--门店管理人信息
const partner_sales = () =>
    import ("@/pages/partner/sales"); //合作商信息管理--门店销售员信息

const loans_query = () =>
  import ("@/pages/orderQuery/loans-query"); //订单查询--商户贷订单查询

Vue.use(Router)

export default new Router({
    routes: [
        //首页
        {
            path: "/",
            name: "home",
            component: home,
            redirect: { name: "partner_index" }
        },
        //登录页
        { path: "/login", name: "login", meta: { auth: false }, component: login },
        //合作商信息管理
        {
            path: "/partner_index",
            name: "partner_index",
            component: partner_index
        },
        {
            path: "/partner_excel/:partner_id",
            name: "partner_excel",
            component: partner_excel
        },
        {
            path: "/partner_region",
            name: "partner_region",
            component: partner_region
        },
        {
            path: "/partner_manager",
            name: "partner_manager",
            component: partner_manager
        },
        {
            path: "/partner_sales",
            name: "partner_sales",
            component: partner_sales
        },
      ///订单查询
       {
            path: "/orderQuery/loans_query",
            name: "loans_query",
            component: loans_query
        }
    ]
});
