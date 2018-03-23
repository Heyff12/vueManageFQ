import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { Loading, Message } from "element-ui";

Vue.use(VueAxios, axios);
//ajax-请求--resource---get
//that--运行函数的this；url--请求连接；data--传递的数据；success_func--请求成功后的事件；error_func--请求失败后的事件；all_func--不需要请求处理的事件
let ajax_get = (
    that,
    url,
    data,
    success_func,
    error_func,
    common_func,
    all_func
) => {
    let _this = that;
    //console.log('get');
    let loadingInstance = Loading.service({
        fullscreen: true, // lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0)",
        customClass: 'bigIcon'
    });
    _this.$http
        .get(url, {
            params: data
        })
        .then(
            function(response) {
                //console.log('get2');
                loadingInstance.close();
                if (all_func) {
                    all_func(data);
                    return false;
                }
                let data_return = response.data;
                //console.log(data_return);
                if (data_return.respcd == "0000") {
                    if (success_func) {
                        success_func(data_return);
                    }
                } else {
                    if (data_return.respmsg) {
                        Message.error({
                            message: data_return.respmsg
                        });
                    } else {
                        Message.error({
                            message: data_return.resperr
                        });
                    }
                    if (error_func) {
                        error_func(data_return);
                    }
                }
            },
            function(response) {
                if (common_func) {
                    common_func();
                }
                loadingInstance.close();
                Message.error({ message: "系统问题,请稍后再试" });
            }
        )
        .catch(function(response) {
            if (common_func) {
                common_func();
            }
            loadingInstance.close();
        });
};

//ajax-请求--resource---post
let ajax_post = (
    that,
    url,
    data,
    success_func,
    error_func,
    common_func,
    all_func
) => {
    let _this = that;
    let loadingInstance = Loading.service({
        fullscreen: true,
        // lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0)",
        customClass: 'bigIcon'
    });
    //console.log('post');
    _this.$http
        .post(url, data)
        .then(
            function(response) {
                //console.log('post2');
                loadingInstance.close();
                if (all_func) {
                    all_func(data);
                    return false;
                }
                console.log(response);
                let data_return = response.data;
                //console.log(data_return);
                if (data_return.respcd == "0000") {
                    if (success_func) {
                        success_func(data_return);
                    }
                } else {
                    if (data_return.respmsg) {
                        Message.error({
                            message: data_return.respmsg
                        });
                    } else {
                        Message.error({
                            message: data_return.resperr
                        });
                    }
                    if (error_func) {
                        error_func(data_return);
                    }
                }
            },
            function(response) {
                if (common_func) {
                    common_func();
                }
                loadingInstance.close();
                Message.error({
                    message: "系统问题,请稍后再试"
                });
            }
        )
        .catch(function(response) {
            if (common_func) {
                common_func();
            }
            loadingInstance.close();
        });
};

export default {
    ajax_get: ajax_get,
    ajax_post: ajax_post
};

//测试---------------------------------------------------

// this.$ajax_axios.ajax_post(this, this.login_url, _this.login, data_return => {
//   _this.$store.commit("login");
//   _this.$router.replace({
//     path: "/"
//   });
// });