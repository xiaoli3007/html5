module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	'no-unused-vars': 'off',
	'no-tabs': 0,
	'no-mixed-spaces-and-tabs': 0,
	'indent': ["off", "tab"],
	'no-trailing-spaces': 0,
	// 禁止自我赋值
	'no-self-assign': 0,
	// 禁止在正则表达式中使用控制字符
	'no-control-regex': 0,
	'no-unreachable': 'off',
	'no-irregular-whitespace': 'off',
  }
}
