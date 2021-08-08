import pkg from './package.json';
const path = require('path');
import { cloneDeep  } from 'lodash';
import { terser } from "rollup-plugin-terser";
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const extensions = ['.js', '.ts'];

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const banner =
  `/*!
 * ${pkg.name} v${pkg.version}
 * (c) 2020-2021 ${pkg.author}
 * Released under the ${pkg.license} License.
 */
`;

const minimize = (obj) => {
  const minObj = cloneDeep(obj)
  minObj.file = minObj.file.slice(0, minObj.file.lastIndexOf('.js')) + '.min.js'
  minObj.plugins = [terser({ compress: { drop_console: true } })]
  minObj.banner = banner
  return minObj
}

const output = [{
  format: 'umd',
  file: 'dist/validator.js',
  name: 'Validator'          // 导出的默认对象名字
}]

export default {
  input: resolve('src/index.ts'),
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
  },
  plugins: [
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    typescript(),
    commonjs(),
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
  ]
}
