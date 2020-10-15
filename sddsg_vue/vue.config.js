// vue.config.js
const path = require('path')
// const CompressionPlugin = require('compression-webpack-plugin')// 引入gzip压缩插件
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {

  publicPath: './',

  // 将构建好的文件输出到哪里
  outputDir: 'dist',

  // 放置生成的静态资源(js、css、img、fonts)的目录。
  assetsDir: 'statics/style/beishida',

  // 指定生成的 index.html 的输出路径
  indexPath: 'index.html',

  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],

  // 生产环境关闭 source map
  productionSourceMap: false,
  // lintOnSave: true,
  
  
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
  
    // config.optimization.minimizer('terser').tap((args) => {
    //   // 去除生产环境console
    //   args[0].terserOptions.compress.drop_console = true
    //   return args
    // })
  
  //   const svgRule = config.module.rule('svg')
  //   svgRule.uses.clear()
  //   svgRule.exclude.add(/node_modules/)
  //   svgRule
  //     .test(/\.svg$/)
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: 'icon-[name]'
  //     })
  
  //   const imagesRule = config.module.rule('images')
  //   imagesRule.exclude.add(resolve('src/icons'))
  //   config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  },
  
  configureWebpack: (config) => {
   
    if (process.env.NODE_ENV === 'production') {
      // config.plugins.push(new BundleAnalyzerPlugin())
  
      // config.plugins.push(new CompressionPlugin({ // gzip压缩配置
      //   test: /\.js$|\.html$|\.css/, // 匹配文件名
      //   threshold: 10240, // 对超过10kb的数据进行压缩
      //   deleteOriginalAssets: false // 是否删除原文件
      // }))
    }
  },
}
