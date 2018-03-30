//验证规则---------------------------------------------------------
// let test_qd_name = function() {
//   var reg = /^[\u4e00-\u9fa5a-zA-Z0-9\(\)\（\）\-\.]{1,30}$/;
//   return reg;
// }
//验证手机号或邮箱
let test_tel_email = function(require, type) {
    var reg = [{
        required: require,
        pattern: /(^1[0-9]{10}$|^[a-zA-Z0-9_\-\'\.]+@[a-zA-Z0-9_]+(\.[a-z]+){1,2}$)/,
        message: "请输入用户名（手机号码/邮箱）",
        trigger: type
    }];
    return reg;
};
//渠道名称、渠道简称------------中文+英文大小写+数字+空白+()（）.-
let test_qd_name = function(lablename, min, max, require, type) {
    var reg = [{
        required: require,
        pattern: new RegExp(
            "^[\u4e00-\u9fa5a-zA-Z0-9\\(\\)\\（\\）\\-\\.\\s]{" +
            min +
            "," +
            max +
            "}$"
        ),
        //pattern: eval('/^[\u4e00-\u9fa5a-zA-Z0-9\\(\\)\\（\\）\\-\\.]{' + min + ',' + max + '}$/'),
        message: "请输入" + lablename + "，长度在 " + min + " 到 " + max + " 个字符",
        trigger: type
    }];
    return reg;
};
//验证数字
let test_number = function(lablename, min, max, require, type) {
    var reg = [{
        required: require,
        pattern: new RegExp("^[0-9\\s]{" + min + "," + max + "}$"),
        //pattern: eval('/^[\u4e00-\u9fa5a-zA-Z0-9\\(\\)\\（\\）\\-\\.]{' + min + ',' + max + '}$/'),
        message: "请输入" + lablename + "，长度在 " + min + " 到 " + max + " 个字符",
        trigger: type
    }];
    return reg;
};
//验证手机号和座机号
let test_telephone = function(lablename, require, type) {
    var reg = [{
        required: require,
        pattern: /(^(0\d{2,3}(-){0,1}){1}\d{7,8})(-\d{3,5}){0,1}$|^1[0-9]{10}$/,
        message: "请填写" + lablename + "，手机号/座机号码均可",
        trigger: type
    }];
    return reg;
};
//验证手机号
let test_tel = function(lablename, require, type) {
    var reg = [{
        required: require,
        pattern: /^1[0-9]{10}$/,
        message: "请填写" + lablename,
        trigger: type
    }];
    return reg;
};
//中文验证
let test_chinese = function(lablename, min, max, require, type) {
    var reg = [{
        required: require,
        pattern: new RegExp("^[\u4e00-\u9fa5]{" + min + "," + max + "}$"),
        message: "请输入" +
            lablename +
            "(中文)，长度在 " +
            min +
            " 到 " +
            max +
            " 个字符",
        trigger: type
    }];
    return reg;
};
//验证任意字符
let test_any = function(lablename, min, max, require, type) {
    var reg = [{
        required: require,
        pattern: new RegExp("^[\\S\\s]{" + min + "," + max + "}$"),
        message: "请输入" + lablename + "，长度在 " + min + " 到 " + max + " 个字符",
        trigger: type
    }];
    return reg;
};
//身份证号码
let test_idnumber = function(lablename, require, type) {
    var reg = [{ required: require, pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: "请输入" + lablename, trigger: type }];
    return reg;
};
//验证金额，整数部分9位，小数部分2位--验证规则中使用
let checkamt = (rule, value, callback) => {
    let reg = /^[0-9]{0,9}(\.{1}\d{1,2}){0,1}$/;
    setTimeout(() => {
        if (!reg.test(value)) {
            callback(new Error("请输入数字值,最大9位数,最多两位小数"));
        } else {
            callback();
        }
    }, 100);
};
//验证金额，整数部分9位，小数部分2位--验证规则中使用--必填
let checkamtYes = (rule, value, callback) => {
    let reg = /^[0-9]{1,9}(\.{1}\d{1,2}){0,1}$/;
    setTimeout(() => {
        if (!reg.test(value)) {
            callback(new Error("请输入数字值,最大9位数,最多两位小数"));
        } else {
            callback();
        }
    }, 100);
};
//验证金额，整数部分9位，小数部分2位--单独验证
let checkamt_reg = (value, callback_error, callback_right) => {
    let reg = /^[0-9]{0,9}(\.{1}\d{1,2}){0,1}$/;
    if (!reg.test(value)) {
        callback_error("请输入数字值,最大9位数,最多两位小数");
    } else {
        callback_right();
    }
};
//验证金额，整数部分9位，小数部分2位
let checkamt_need = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入内容"));
    }
    let reg = /^[0-9]{0,9}(\.{1}\d{1,2}){0,1}$/;
    setTimeout(() => {
        if (!reg.test(value)) {
            callback(new Error("请输入数字值,最大9位数,最多两位小数"));
        } else {
            callback();
        }
    }, 100);
};
//费率--百分比，整数部分两位，小数两位
var check_fee = (rule, value, callback) => {
    let reg = /^[0-9]{0,2}(\.{1}\d{1,2}){0,1}$/;
    setTimeout(() => {
        if (!reg.test(value)) {
            callback(new Error("费率填写错误,最多两位小数"));
        } else {
            callback();
        }
    }, 100);
};
//百分比，整数部分两位，小数两位
var check_percent = (rule, value, callback) => {
    let reg = /^[0-9]{0,2}(\.{1}\d{1,2}){0,1}$/;
    setTimeout(() => {
        if (!reg.test(value)) {
            callback(new Error("填写错误,最多两位小数"));
        } else {
            callback();
        }
    }, 100);
};
//两位浮点数转化成整数——元——分
var floatToint = val => {
    let value = val.toString();
    if (value.length <= 0) {
        return "";
    }
    let val_f, val_flen, endVal;
    try {
        val_flen = value.split(".")[1].length;
        val_f = value.split(".")[1];
    } catch (e) {
        val_flen = 0;
    }
    if (val_flen == 0) {
        endVal = value + "00";
    } else if (val_flen == 1) {
        endVal = value.replace(/\./, "") + "0";
    } else if (val_flen == 2) {
        endVal = value.replace(/\./, "");
    } else {
        endVal = value.split(".")[0] + value.split(".")[1].substr(0, 2);
    }
    return endVal - 0;
};
//百分数转化成小数——32.34%====0.3234
var percentTofloat = val => {
    let value = val.toString();
    let val_z, val_zlen, val_f, val_flen, endVal;
    val_z = value.split(".")[0];
    val_zlen = val_z.length;
    try {
        val_f = value.split(".")[1];
        val_flen = value.split(".")[1].length;
    } catch (e) {
        val_f = "";
    }
    if (val_zlen == 2) {
        endVal = "0." + val_z + val_f;
    } else if (val_zlen == 1) {
        endVal = "0.0" + val_z + val_f;
    } else if (val_zlen == 0) {
        endVal = "0.00" + val_z + val_f;
    } else {
        endVal = val_z.substr(0, val_zlen - 2) + "." + val_z.substr(-2) + val_f;
    }
    return endVal - 0;
};
exports.test_qd_name = test_qd_name;
exports.test_number = test_number;
exports.test_telephone = test_telephone;
exports.test_tel = test_tel;
exports.test_chinese = test_chinese;
exports.test_any = test_any;
exports.checkamt = checkamt;
exports.checkamt_reg = checkamt_reg;
exports.checkamt_need = checkamt_need;
exports.check_fee = check_fee;
exports.check_percent = check_percent;
exports.floatToint = floatToint;
exports.percentTofloat = percentTofloat;
exports.checkamtYes = checkamtYes;
exports.test_tel_email = test_tel_email;
exports.test_idnumber = test_idnumber;
// [{
//   required: true,
//   pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\(\)\（\）\-\.]{1,30}$/,
//   message: '请输入渠道简称，长度在 1 到 30 个字符',
//   trigger: 'blur'
// }]