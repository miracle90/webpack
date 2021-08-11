module.exports = {
  // 配置文件有继承关系，根文件
  // root: true,
  // 继承或者说扩展自airbnb的配置
  extends: 'airbnb',
  parser: 'babel-eslint',
  // parserOptions: {
  //   sourceType: 'module',
  //   ecmaVersion: 2015,
  // },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    indent: 'off',
    // quotes: 'off',
    // 不能出现console
    'no-console': 'off',
    'linebreak-style': 'off',
    'comma-dangle': 0,
    'no-debugger': 0,
    'max-len': 0,
    'no-tabs': 0,
    'no-eval': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0
  },
};

// LF CRLF
// 换行符，不同的操作系统不一样
// window \r\n
// linux \n
// mac \r
