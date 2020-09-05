(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
var validatorRules = __importStar(__webpack_require__(1));
var validate_1 = __importDefault(__webpack_require__(2));
var Validator = /** @class */ (function () {
    function Validator(validatorRules) {
        var _this = this;
        Object.keys(validatorRules).forEach(function (key) {
            // @ts-ignore
            _this[key] = validatorRules[key];
        });
        this.validate = validate_1.default;
    }
    Validator.prototype.addRules = function (key, fn) {
        try {
            if (key === 'validate' || key === 'addRules')
                throw new Error("\u65B0\u6DFB\u52A0\u7684\u89C4\u5219\u4E0D\u53EF\u547D\u540D\u4E3A" + key);
            if (typeof fn !== 'function')
                throw new Error("addRules\u4F20\u53C2\u9519\u8BEF");
            // @ts-ignore
            this[key] = fn;
        }
        catch (error) {
            console.error(error);
        }
    };
    return Validator;
}());
exports.validator = new Validator(validatorRules);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.isMoney = exports.isWx = exports.isAge = exports.isIdcard = exports.isBankcard = exports.isCode = exports.isPhone = exports.isName = exports.isEmpty = exports.isRequired = void 0;
exports.isRequired = function (str) { return String(str).length > 0; };
exports.isEmpty = function (str) { return str == null || str === '' || (Array.isArray(str) && str.length == 0) || typeof str == 'undefined' || JSON.stringify(str) == '{}'; };
exports.isName = function (str) { return /^[\u4E00-\u9FA5]{2,4}$/.test(str); };
exports.isPhone = function (str) { return /^1[3456789][0-9]{9}$/.test(str); };
exports.isCode = function (str) { return /^[0-9]{6}$/.test(str); };
exports.isBankcard = function (str) { return /^[0-9]{16,19}$/.test(str); };
exports.isIdcard = function (code) {
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var pass = true;
    var msg = "验证成功";
    //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
        pass = false;
        msg = "身份证号格式错误";
    }
    else if (!city[code.substr(0, 2)]) {
        pass = false;
        msg = "身份证号地址编码错误";
    }
    else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = Number(code[i]);
                wi = factor[i];
                sum += ai * wi;
            }
            if (parity[sum % 11] != code[17].toUpperCase()) {
                pass = false;
                msg = "身份证号校验位错误";
            }
        }
        return pass;
    }
};
exports.isAge = function (str) { return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/.test(str); };
exports.isWx = function (str) { return ((/^1[3456789][0-9]{9}$/.test(str) || /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(str))); };
exports.isMoney = function (str) { return /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(str); };
exports.isEmail = function (str) { return /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(str); };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sign = ['>', '>=', '==', '===', '<', '<='];
var index_1 = __webpack_require__(0);
var commonValidator;
var commonVaidatorRules = [];
// 是否为空
var isEmpty = function (value) {
    return value == null || value === '' || (Array.isArray(value) && value.length == 0) || typeof value == 'undefined' || JSON.stringify(value) == '{}';
};
// 校验函数的参数(formData和rules)
var checkFormAndRules = function (formData, rules) {
    if (!formData || typeof formData != 'object' || JSON.stringify(formData) == "{}") {
        throw new Error('表单对象不能为空');
    }
    checkRules(rules);
    return true;
};
// 校验rules参数
var checkRules = function (rules, isSubRule) {
    if (isSubRule === void 0) { isSubRule = false; }
    for (var i = 0, len = rules.length; i < len; i++) {
        var obj = rules[i];
        if (isSubRule && Object.prototype.toString.call(obj) !== '[object Object]') {
            throw new Error('need中的每一项必须是对象');
        }
        // 校验field
        if (!('field' in obj) || isEmpty(obj.field)) {
            throw new Error('缺少 field');
        }
        // 校验name
        if (!isSubRule && (!('name' in obj) || isEmpty(obj.name))) {
            throw new Error('缺少 name');
        }
        // 校验rules
        if ('rules' in obj) {
            if (!Array.isArray(obj['rules']) && typeof (obj['rules']) != 'string' && Object.prototype.toString.call(obj['rules']) !== '[object Object]')
                throw new Error((isSubRule ? 'need' : 'rules') + "\u5FC5\u987B\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\u6216\u5BF9\u8C61\u6216\u6570\u7EC4");
        }
        // 如果存在need
        if (!isSubRule && ('need' in obj)) {
            if (!Array.isArray(obj['need']) || obj['need'].length === 0)
                throw new Error('need必须是一个数组，且不能为空');
            checkRules(obj['need'], true);
        }
    }
    return true;
};
// 设置返回的错误
var setErrorRes = function (msg, name) {
    if (msg === void 0) { msg = ''; }
    return {
        res: false,
        msg: msg ? msg : "\u3010" + name + "\u3011\u683C\u5F0F\u6709\u8BEF"
    };
};
/**
 * 校验规则有三种
 * 1.字符串，单个校验，即默认的校验器；
 * 2.对象，单个校验；
 * 3.数组，多个校验
 */
var checkRuleType = function (rules) {
    if (isEmpty(rules)) {
        return '';
    }
    else if (typeof rules === 'string') {
        return 'string';
    }
    else if (Object.prototype.toString.call(rules) === '[object Object]') {
        return 'object';
    }
    else if (Array.isArray(rules)) {
        return 'array';
    }
    else {
        return '';
    }
};
var checkFileByString = function (value, rules) {
    if (rules === void 0) { rules = 'isRequired'; }
    try {
        if (commonVaidatorRules.indexOf(rules) === -1)
            throw new Error('当前rules值不存在于校验器规则中');
        else
            return commonValidator[rules](value);
    }
    catch (error) {
        console.error(error);
    }
};
var checkFileByObj = function (value, rules) {
    var _a = Object.entries(rules)[0], key = _a[0], val = _a[1];
    if (!(sign.includes(key)))
        throw new Error('当前rules值不存在于校验器规则中');
    else {
        return checkFileBySign(value, key, val);
    }
};
var checkFileBySign = function (value, key, result) {
    switch (key) {
        case '>': return Number(value) > Number(result);
        case '>=': return Number(value) >= Number(result);
        case '==': return value == result;
        case '===': return value === result;
        case '<': return Number(value) < Number(result);
        case '<=': return Number(value) <= Number(result);
        default: return true;
    }
};
var checkFileByArr = function (value, rules) {
    for (var i = 0, len = rules.length; i < len; i++) {
        var rule = rules[i];
        var flag = true;
        try {
            flag = doValidate(value, rule);
            if (!flag)
                return false;
            if (i == len - 1)
                return true;
        }
        catch (error) {
            console.error(error);
        }
    }
};
var doValidate = function (value, rules) {
    var type = checkRuleType(rules);
    switch (type) {
        case 'string': return checkFileByString(value, rules);
        case 'object': return checkFileByObj(value, rules);
        case 'array': return checkFileByArr(value, rules);
        default: return checkFileByString(value);
    }
};
// 获得表单中的值
var getValueByField = function (formData, key) {
    var field = key.split('.');
    var obj = formData;
    for (var i = 0, len = field.length; i < len; i++) {
        obj = getObj(obj, field[i]);
        if (!obj)
            return '';
    }
    return obj;
};
var getObj = function (formData, key) {
    return formData[key];
};
// 校验need中的rules
var doValidateNeed = function (formData, need) {
    for (var i = 0, len = need.length; i < len; i++) {
        var currentValue = getValueByField(formData, need[i].field);
        var rule = need[i].rules;
        var flag = doValidate(currentValue, rule);
        if (!flag)
            return false;
    }
    return true;
};
var validate = function (formData, rulesArr) {
    if (!checkFormAndRules(formData, rulesArr))
        return;
    commonValidator = index_1.validator;
    commonVaidatorRules = Object.keys(index_1.validator).filter(function (key) {
        return key !== 'validate';
    });
    try {
        for (var i = 0, len = rulesArr.length; i < len; i++) {
            var _a = rulesArr[i], field = _a.field, name_1 = _a.name, rules = _a.rules, need = _a.need, tip = _a.tip;
            var currentValue = getValueByField(formData, field);
            var flag = true;
            // 值为空，且没有need
            if (isEmpty(currentValue) && !need) {
                if (rules != 'isEmpty')
                    return setErrorRes(tip, name_1);
                // 值为空，但有need
            }
            else if (isEmpty(currentValue) && need) {
                var t = doValidateNeed(formData, need);
                if (t && rules != 'isEmpty')
                    return setErrorRes(tip, name_1);
                // 有值，但没有rules,即isRequired
            }
            else if (!isEmpty(currentValue) && !rules) {
                flag = doValidate(currentValue);
                if (!flag)
                    return setErrorRes(tip, name_1);
                // 有值有need, 在判断有无rules
            }
            else {
                var needVaidtate = true;
                // 是否有need
                if (need) {
                    // need校验是否通过
                    needVaidtate = doValidateNeed(formData, need);
                    // 如果通过再校验当前的值
                    if (needVaidtate) {
                        flag = doValidate(currentValue, rules);
                        if (!flag)
                            return setErrorRes(tip, name_1);
                    }
                }
                else {
                    flag = doValidate(currentValue, rules);
                    if (!flag)
                        return setErrorRes(tip, name_1);
                }
            }
        }
        return {
            res: true,
            msg: 'success'
        };
    }
    catch (error) {
        console.error(error);
        return setErrorRes('校验器出错~');
    }
};
exports.default = validate;


/***/ })
/******/ ]);
});