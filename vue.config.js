module.exports = {
  // 解决不能内网穿透
  devServer: {
    proxy: 'http://localhost:3000'
  },
  lintOnSave: false // 关闭eslint检查
}
