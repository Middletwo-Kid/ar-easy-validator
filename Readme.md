# ar-easy-validator

## 安装和使用

```bash
npm install --save ar-easy-validator
```

或者直接通过CDN

```js
<script src="https://cdn.jsdelivr.net/npm/ar-easy-validator"></script>
```

## 什么是ar-easy-validator
之前有一个需求是，当用户填完所有的表单才会高亮按钮，若按钮置灰时，点击按钮用户还可以知道没有完成的表单项是哪些，除此之外，表单中有些内容是否是必填项取决于某一项是否符合某些条件，于是封装了这个校验器。

现在其实有很多现成的校验器，但是这个校验器有以下几个特点：
- 该校验器有一个`need`属性，可适用于当A条件成立的条件下才去校验某一项表单；
- 可以新增或者改写校验规则（方法）且新增过一次之后不用再重复新增；
- 书写规则和其他校验器不太一样，对于某些人来说可能比较通俗易懂。

![demo](https://github.com/Middletwo-Kid/ar-easy-validator/blob/master/public/demo.gif)

通过传入一个表单内含有的值和需要校验的规则，返回校验的结果和提示消息。

```js
import { validator } from 'ar-easy-validator';
const formData = {
    name: '姓名',
    sex: '',
    age: 18,
    isStudent: 0,
    job: ''
};
const formDataRules = [
    // name必须符合名字规则
    { field: 'name', name: '姓名', rules: 'isName'},
    // sex必填
    { field: 'sex', name: '性别'},
    // age大于15
    { field: 'age', name: '年龄', rules: {'>': 15}},
    // isStudent必填，可传递提示语
    { field: 'isStudent', name: '是否是学生', tip: '是否是学生是必填项'},
    // 当isStudent==1时才会去校验job字段
    { field: 'job', name: '工作', need: [{field: 'isStudent', rules: {'==': 0}}]}
]
let { res, msg } = validator.validate(formData, formDataRules);
console.log(res, msg);       // false 【性别】格式有误

// 新增自定义校验器
validator.addRules('isInArray', (str) => {
    return [1,2,3,4,5,6,7,8,9,0].indexOf(str);
})
const ohterRules = [
    { field: 'name', name: '姓名', need: [{ field: 'test', rules: 'isInArray'}]}
]
{ res, msg } = validator.validate({name: '', test: 3}, ohterRules);
console.log(res, msg);       // false 【姓名】格式有误
```

## 方法说明

| 方法名     | 规则            |
| ---------- | --------------- |
| isRequired | 必填            |
| isName     | 姓名            |
| isNumber   | 纯数字           |
| isPhone    | 手机号          |
| isCode     | 6位数字的验证码 |
| isBankcard | 银行卡          |
| isIdcard   | 身份证          |
| isAge      | 年龄            |
| isWx       | 微信            |
| isMoney    | 金额            |
| isEmail    | 邮箱            |
| isEmpty    | 是否为空         |
| validate   | 校验方法        |
| addRules   | 自定义校验方法        |

代码示例：
```js
const { res } = validator.isName('错误的姓名');      // false
const { res } = validator.isPhone('13800138000');   // true
```

## validate说明

```js
const { res, msg } = validator.validate(formData, rules);
```
`formData`为一个对象，`rules`是校验规则。 校验规则格式如下：
| 参数  | 参数说明         | 是否必填 |
| ----- | ---------------- | -------- |
| field | 表单对象对应的键 | 是       |
| name  | 表单中文名       | 是       |
| tip   | 报错提示         | 否       |
| rules | 校验规则         | 否       |
| need  | 校验前置条件     | 否       |

### rules规则说明

rules可支持字符串、对象和数组：
| 参数类型           | 参数举例                                 |
| ------------------ | ---------------------------------------- |
| 字符串（单个校验） | rules: 'isName'                          |
| 对象（单个校验）   | rules: {'>': 2}                          |
|数组（多个校验）   | rules: ['isMoney', {'>': 2}, {'<': 100}] |

当rules为字符串时， 可传入以下参数：

| 校验规则名字 | 通过条件   |
| ------------ | ---------- |
| isRequired   | 必填       |
| isName       | 姓名       |
| isNumber   | 纯数字       |
| isPhone      | 手机号     |
| isCode       | 手机验证码 |
| isBankcard   | 银行卡     |
| isIdcard     | 身份证     |
| isAge        | 年龄       |
| isWx         | 微信       |
| isInt        | 整数       |
| isMoney      | 金额       |
| isEmail      | 邮箱       |
| isEmpty      | 是否为空   |

当rules为对象时， 可传入以下参数：

| 校验方法 | 通过条件 |
| -------- | -------- |
| <        | 小于     |
| <=       | 小于等于 |
| >        | 大于     |
| >=       | 大于等于 |
| =        | 等于     |

代码示例：
```js
// 第一种 表单必填
{ field: 'name', name:'姓名', tip: '姓名为必填项'}
// 第二种 有校验规则
{ field: 'name', name: '姓名', rules: 'isName', tip: '姓名为必填项'}
// 第三种 多种校验规则
{ field: 'money', name: '金额', rules: ['isMoney', {'>': 2}, {'<': 100}], tip: '金额不能为空，且必须大于2小于100'}
// 第四种 当sales_channel_type == 2 时，才校验reference_data_seller
{ field: 'reference_data_seller', name: '推单人', need:[{field: 'sales_channel_type', rules: {'=': 2}}] },
// 第五种 当wx号为空时，才校验phone或当phone为空时才校验wx, 即二选一，其中一项必填
{ field: 'phone', name: '联系方式', need:[{field: 'wx', rules: 'isEmpty'}] },
```

## addRules

代码示例：

```js
validator.addRules('isInArray', (str) => {
   return [1,2,3,4,5,6,7,8,9,0].indexOf(str);
})

validator.isInArray('3');
validator.validate({test: 3}, rules: 'isArray');
```

该方法接受两个参数，第一个是校验规则的名字，第二个是校验函数。

注意： 校验规则不可命名为`validate`和`addRules`。

## 更新日志

### 2020/10/09 v1.2.4
- 修复直接使用各个校验方法对`undefined`的值结果有误的BUG。

### 2020/09/22 v1.2.3
- 新增`isNumber`校验规则校验纯数字。

### 2020/09/05 v1.2.2
- 新增`isEmpty`校验规则；
- 新增能实现二选一校验的规则。
- 优化表单内的取值，支持以点的方式获得当前校验的值，如`field: 'reference.phone'`

### 2020/08/30 v1.2.1
- 新增多种常用校验规则；
- 新增自定义校验规则方法。

## 结尾

如有问题欢迎提`issue`或者`pr`，感谢使用~
