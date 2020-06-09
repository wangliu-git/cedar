const path= require('path')
module.exports = {
  //可以解析模板
  runtimeCompiler: true,

  // 关闭EsLint的规则
  lintOnSave: false,

  css: { loaderOptions: {
      postcss: {
        plugins: []
      }
    }
  },

  configureWebpack:{
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
      alias: { // 路径别名(简写方式)
        // 'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配   带vue编译器
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
      }
    }
  },

  devServer: {
    open: true, // 自动打开浏览器
    proxy: {
      // 处理以/api开头路径的请求
      // '/api': 'http://192.168.75.58:4000'
      '/api': {
        // target: 'http://192.168.75.58:8080', // 转发的目标地址
        target: 'https://cedar.genowis.com', // 转发的目标地址
        pathRewrite: {
          '^/api' : ''  // 转发请求时去除路径前面的/api
        },
        secure: true,
        changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
      }
    },
    historyApiFallback: true,
  },

  publicPath: '/cedar/'
}
