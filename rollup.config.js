export default {
  input: 'src/validator.js',
  output: {
    format: 'umd',
    file: 'dist/validator.js',
    name: 'Validator'          // 导出的默认对象名字
  },
  onwarn: function (warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') {
    return;
  }
    console.error(warning.message);
  }
}
