import pkg from './package.json';
const path = require('path');
import { cloneDeep  } from 'lodash';
import { terser } from "rollup-plugin-terser";

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

// 最小化版本文件头注释信息
const banner =
  `/*!
 * ${pkg.name} v${pkg.version}
 * (c) 2020-2021 ${pkg.author}
 * Released under the ${pkg.license} License.
 */
`;

// 最小化版本处理函数
const minimize = (obj) => {
  // 深拷贝
  const minObj = cloneDeep(obj)
  // 文件名添加 .min
  minObj.file = minObj.file.slice(0, minObj.file.lastIndexOf('.js')) + '.min.js'
  // 只对最小化版本去除 console，并压缩 js
  minObj.plugins = [terser({ compress: { drop_console: true } })]
  // 只对最小化版本添加文件头注释信息
  minObj.banner = banner
  return minObj
}

const output = [{
  format: 'umd',
  file: 'dist/validator.js',
  name: 'Validator'          // 导出的默认对象名字
}]

export default {
  input: resolve('src/validator.js'),
  output: [
    ...output,
    ...output.map(type => {
      type.file = resolve(type.file);
      return minimize(type)
    })
  ],
  onwarn: function (warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') {
    return;
  }
    console.error(warning.message);
  }
}
