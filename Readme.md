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

Github上有很多现成的校验器，但是这个校验器有以下几个特点：
- 该校验器有一个`need`属性，可适用于当A条件成立的条件下才去校验；
- 支持在不需要函数的情况下，使用多个校验规则。

通过传入一个表单的值和需要校验的规则，返回校验的结果和提示消息。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>validator</title>
</head>
<body>
  <div id="app">
    <p><label>姓名：</label><input v-model="formData.name" /></p>
    <p><label>年龄：</label><input v-model="formData.age" /></p>
    <p><label>电话：</label><input v-model="formData.phone" /></p>
    <p><label>邮箱：</label><input v-model="formData.email" /></p>
    <p><label>身份证：</label><input v-model="formData.idcard" /></p>
    <p><label>金额：</label><input v-model="formData.money" /></p>
    <p><label>职业（当年龄大于18时必填）：</label><input v-model="formData.job" /></p>
    <div>
      <p>请一定要选择Jhon:</p>
      <input type="checkbox" id="jack" value="Jack" v-model="formData.checkedNames">
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="formData.checkedNames">
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="formData.checkedNames">
      <label for="mike">Mike</label>
    </div>
    <button @click="handleClick">提交</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="../dist/validator.js"></script>
  <script>
    var comName=new Vue({
      el:"#app",
      data(){
        return {
          formData:{
            name:'',
            age: '',
            phone:'',
            email:'',
            idcard: '',
            money: '',
            job: '',
            checkedNames: []
          }
        }
      },
      methods:{
        handleClick(){
          const rule = {
            name: { rule:'isName', tip: '请输入正确的姓名' },
            age: { rule: 'isAge' },
            phone: { rule: 'isPhone' },
            email: { rule: 'isEmail' },
            idcard: { rule: 'isIdcard' },
            money: { rule: 'isMoney' },
            job: { rule: 'isRequired', need: [ {field: 'age', rule: { ">=" : 18 } } ]},
            checkedNames: { rule: 'isSelectJhon', tip: '一定要选择John' },
          }

          let v = new Validator();
          v.addRule('isSelectJhon', (val) => {
            return Array.isArray(val) && val.includes('John');
          })
          const { res , msg} = v.validate(this.formData, rule);
          alert(msg);
        }
      }
    })
  </script>
</body>
</html>
```

## 方法说明

| 方法名     | 规则            |
| ---------- | --------------- |
| isRequired | 必填            |
| isEmpty    | 是否为空         |
| isEmail    | 邮箱            |
| isPhone    | 手机号          |
| isName     | 姓名            |
| isNumber   | 纯数字           |
| isCode     | 6位数字的验证码 |
| isBankcard | 银行卡          |
| isAge      | 年龄            |
| isMoney    | 金额（两位数）            |
|isMoneyNotLimit | 金额         |
| isChinese    | 是否为中文         |
| isEnglish    | 是否为英文         |
| isUrl   | url          |
| isFax   | 传真          |
| isIp   | Ip地址          |
| isIdcard | 身份证          |
| isWx | 微信          |
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
| rule | 校验规则         | 是       | string、object、array |
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
| isEmail    | 邮箱            |
| isPhone    | 手机号          |
| isName     | 姓名            |
| isNumber   | 纯数字           |
| isCode     | 6位数字的验证码 |
| isBankcard | 银行卡          |
| isAge      | 年龄            |
| isMoney    | 金额（两位数）            |
|isMoneyNotLimit | 金额         |
| isChinese    | 是否为中文         |
| isEnglish    | 是否为英文         |
| isUrl   | url          |
| isFax   | 传真          |
| isIp   | Ip地址          |
| isIdcard | 身份证          |
| isWx | 微信          |
| validate   | 校验方法        |
| addRules   | 自定义校验方法        |

当rule为对象时， 可传入以下参数：

| 校验方法 | 通过条件 |
| -------- | -------- |
| <        | 小于     |
| <=       | 小于等于 |
| >        | 大于     |
| >=       | 大于等于 |
| ==        | 等于     |
| ===        | 全等于     |
| !=        | 不等于     |
| !==        | 不全等于     |

代码示例：
```js
const rule = {
    // 单种校验规则-字符串
    name: { rule:'isName', tip: '请输入正确的姓名' },
    // 单种校验规则-对象
    age: { rule: {'=': 2 } },
    // 多种校验规则-数组
    score: { rule: [ 'isNumber', { "==": 100 } ] },
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

## 结尾

如有问题欢迎提`issue`或者`pr`，感谢使用~
