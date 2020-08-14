// vue.config.js
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {

  publicPath: './',

  // 将构建好的文件输出到哪里
  outputDir: 'dist',

  // 放置生成的静态资源(js、css、img、fonts)的目录。
  assetsDir: 'statics/style/default_phone',

  // 指定生成的 index.html 的输出路径
  indexPath: 'index.html',

  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],

  // 生产环境关闭 source map
  productionSourceMap: false,
  // lintOnSave: true,
}
