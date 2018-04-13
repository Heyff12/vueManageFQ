// 使用 Mock
var Mock = require("mockjs");
var Random = Mock.Random;
//合作商信息管理----------------------------------------------------------------------
//大区责任人信息
var partner_list = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        district_cnt: 200, // 商户数
        page: 1,
        page_size: 10,
        "district_info|50-80": [{
            partner_name: Random.cword(10),
            "district_id|+10": 456,
            "userid|+10": 456777,
            district_name: Random.cword(10),
            name: Random.cname(),
            mobile: /^1[0-9]{10}$/,
            idnumber: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            "status|1": [2, 3, 4], //大区负责人激活状态 未激活=2， 已激活=3，注销=4
            update_time: Random.datetime("yyyy-MM-dd HH:mm:ss")
        }]
    }
};
Mock.mock(
    /fenqi_mis\/v1\/api\/partner\/district_mgr\/list/,
    "get",
    partner_list
);
//大区责任人信息--修改
var partner_edit = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {}
};
// Mock.mock(
//     /fenqi_mis\/v1\/api\/partner\/district_mgr\/modify/,
//     "post",
//     partner_edit
// );
//门店负责人信息
var manager_list = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        store_cnt: 200, // 商户数
        page: 1,
        page_size: 10,
        "store_info|50-80": [{
            partner_name: Random.cword(10),
            district_name: Random.cword(10),
            store_name: Random.cword(10),
            "store_id|+10": 456,
            "userid|+10": 456777,
            store_address: Random.cword(10),
            name: Random.cname(),
            mobile: /^1[0-9]{10}$/,
            idnumber: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            "status|1": [2, 3, 4], //大区负责人激活状态 未激活=2， 已激活=3，注销=4
            update_time: Random.datetime("yyyy-MM-dd HH:mm:ss")
        }]
    }
};
Mock.mock(/fenqi_mis\/v1\/api\/partner\/store_mgr\/list/, "get", manager_list);
//门店负责人信息--修改
var manager_edit = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {}
};
// Mock.mock(
//     /fenqi_mis\/v1\/api\/partner\/store_mgr\/modify/,
//     "post",
//     manager_edit
// );
//门店销售信息
var sale_list = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        opuser_cnt: 200, // 商户数
        page: 1,
        page_size: 10,
        "opuser_info|50-80": [{
            "userid|+10": 456777,
            store_name: Random.cword(10),
            name: Random.cname(),
            mobile: /^1[0-9]{10}$/,
            idnumber: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            "status|1": [2, 3, 4], //大区负责人激活状态 未激活=2， 已激活=3，注销=4
            update_time: Random.datetime("yyyy-MM-dd HH:mm:ss")
        }]
    }
};
Mock.mock(/fenqi_mis\/v1\/api\/partner\/opuser\/list/, "get", sale_list);
//门店销售信息--修改
var sale_edit = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {}
};
// Mock.mock(/fenqi_mis\/v1\/api\/partner\/opuser\/modify/, "post", sale_edit);
//合作商基本信息
var partnerBig_list = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        partner_cnt: 200, // 商户数
        page: 1,
        page_size: 10,
        "partner_info|50-80": [{
            "partner_id|+10": 1234567,
            partner_name: Random.cword(10),
            join_time: Random.datetime("yyyy-MM-dd HH:mm:ss"),
            "status|1": [2, 1]
        }]
    }
};
Mock.mock(/fenqi_mis\/v1\/api\/partner\/list/, "get", partnerBig_list);


//获取门店列表
var storelist = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    "data|8-12": [{
        name: Random.cword(10), //门店名称
        "store_id|+1": 111 //门店 id
    }]
};
Mock.mock(
    /fenqi_mis\/v1\/api\/partner\/store\/pulldown_list/,
    "get",
    storelist
);

//获取大区列表
var districtlist = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    "data|8-12": [{
        name: Random.cword(10), //门店名称
        "district_id|+1": 111 //门店 id
    }]
};
Mock.mock(
    /fenqi_mis\/v1\/api\/partner\/district\/pulldown_list/,
    "get",
    districtlist
);

//获取合作商列表
var partnerlist = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    "data|8-12": [{
        name: Random.cword(10), //门店名称
        "partner_id|+1": 111 //门店 id
    }]
};
Mock.mock(
    /fenqi_mis\/v1\/api\/partner\/pulldown_list/,
    "get",
    partnerlist
);