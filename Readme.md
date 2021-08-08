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

Github上有很多现成的校验器，这款校验器和其他校验器最大的不同在于, 它的校验规则以字面量的形式编写，比较简单且意思明了。

通过传入一个表单的值和需要校验的规则，返回校验的结果和提示消息。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ar-easy-validator demo</title>
</head>
<body>
  <script src="../dist/validator.js"></script>
  <script>
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
        { field: 'job', name: '工作', need: [{field: 'isStudent', rules: {'===': 1}}]}
    ]
    const r = Validator.validate(formData, formDataRules);
    console.log(r.res, r.msg);       // false sex is error

    // 新增自定义校验器
    Validator.addRule('isInArray', (value) => {
        return [1,2,3,4,5,6,7,8,9,0].indexOf(value);
    })
    const ohterRules = [
      { field: 'name', name: '姓名', need: [{ field: 'test', rules: 'isInArray'}]}
    ]
    const r2 = Validator.validate({name: ''}, ohterRules);
    console.log(r2.res, r2.msg);       // false name is error
    
    const r3 = Validator.validate({name: '王花花'}, ohterRules);
    console.log(r3.res, r3.msg);       // true success
  </script>
</body>
</html>
```

## 方法说明

| 方法名     | 规则            |
| ---------- | --------------- |
| isRequired | 必填            |
| isEmpty    | 是否为空         |
| isEqual    | 是否相等         |
| isEmail    | 邮箱            |
| isMobile    | 手机号          |
| isConcat    | 手机号 和 座机       |
| isWx    | 微信       |
| isName     | 姓名            |
| isNumber   | 纯数字           |
| isPositiveInt     | 是否是正整数 |
| isBankcard | 银行卡          |
| isAge      | 年龄            |
| isMoney    | 金额（两位数）            |
| isChinese    | 是否为中文         |
| isEnglish    | 是否为英文         |
| isUrl   | url          |
| isIdcard | 身份证          |
| validate   | 校验方法        |
| addRule   | 自定义校验方法        |

代码示例：
```js
const validator = new Validator();
const res1 = validator.isName('错误的姓名');      // false
const res2 = validator.isPhone('13800138000');   // true
```

## validate说明

```js
const { res, msg } = validator.validate(formData, rules);
```
`formData`为一个对象，`rules`是校验规则。 校验规则格式如下：
| 参数  | 参数说明         | 是否必填 | 格式 |
| ----- | ---------------- | -------- | -------- |
| rules | 校验规则         | 否       | string、object、array， 默认为`isRequired` |
| field   | key值        | 是       | string       |
| tip   | 报错提示         | 否       | string       |
| need  | 校验前置条件     | 否       | array       |

### rule规则说明

rule可支持字符串、对象和数组：
| 参数类型           | 参数举例                                 |
| ------------------ | ---------------------------------------- |
| 字符串（单个校验） | rules: 'isName'                          |
| 对象（单个校验）   | rules: {'>': 2}                          |
| 数组（多个校验）   | rules: ['isMoney', {'>': 2}, {'<': 100}] |

当rule为字符串时， 可传入以下参数：

| 校验规则名字 | 通过条件   |
| ------------ | ---------- |
| isRequired | 必填            |
| isEmpty    | 是否为空         |
| isEqual    | 是否相等         |
| isEmail    | 邮箱            |
| isMobile    | 手机号          |
| isConcat    | 手机号 和 座机       |
| isWx    | 微信       |
| isName     | 姓名            |
| isNumber   | 纯数字           |
| isPositiveInt     | 是否是正整数 |
| isBankcard | 银行卡          |
| isAge      | 年龄            |
| isMoney    | 金额（两位数）            |
| isChinese    | 是否为中文         |
| isEnglish    | 是否为英文         |
| isUrl   | url          |
| isIdcard | 身份证          |

当rule为对象时， 可传入以下参数：

| 校验方法 | 通过条件 |
| -------- | -------- |
| <        | 小于     |
| <=       | 小于等于 |
| >        | 大于     |
| >=       | 大于等于 |
| ==        | 等于     |
| ===        | 全等于,其中NaN === NaN， +0 !== -0,还可以浅比较对象     |

代码示例：
```js
const rule = {
    // 单种校验规则-字符串
    name: { rule:'isName', tip: '请输入正确的姓名' },
    // 单种校验规则-对象
    age: { rules: {'=': 2 } },
    // 多种校验规则-数组
    score: { rules: [ 'isNumber', { "==": 100 } ] },
}
```

### need规则说明

跟`rule`相似：

```js
const rule = {
    // 当age符合年龄校验规则时，再校验job
    job: { rule:'isReuqired', need: [{ field: 'age', rule: 'isAge' }] },
    // 当age大于等于18时，再校验job
    job: { rule:'isReuqired', need: [{ field: 'age', rule: { ">=": 18 } }] },
    // 当age符合年龄校验规则且大于等于18时，再校验job
    job: { rule:'isReuqired', need: [{ field: 'age', rule: ['isAge', { ">=": 18 }] }] }
}
```

## addRule

代码示例：

```js
validator.addRule('isInArray', (str) => {
   return [1,2,3,4,5,6,7,8,9,0].indexOf(str);
})

validator.isInArray('3');
validator.validate({test: 3}, rule: 'isArray');
```

该方法接受两个参数，第一个是校验规则的名字，第二个是校验函数。

注意： 校验规则不可命名为`validate`和`addRule`。
