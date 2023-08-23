const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    assetsDir: "static",
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
})
