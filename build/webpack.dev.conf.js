const merge = require('webpack-merge')

const base = require('./webpack.base.conf').base

// 此处放置development模式下的webpack配置，请注意，此处的配置会直接merge @vue/cli 的默认配置
// 请尽量使用`chainWebpack`来对webpack进行配置
// 此处仅作为兼容使用
exports.dev = merge(base,{

})

// eslint-disable-next-line no-unused-vars
exports.devChain = (webpackConfig) => {
  // 通过webpackConfig来修改webpack的配置
  return webpackConfig
}
