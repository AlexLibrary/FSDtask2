const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    //new BundleAnalyzerPlugin()
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
