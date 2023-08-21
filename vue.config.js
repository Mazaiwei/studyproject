const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  css: {
    loaderOptions: {
    postcss: {
    postcssOptions: {
    plugins: [
    require('autoprefixer')(),
    require('postcss-pxtorem')({
    rootValue: 75,
    propList: ['*']
    })
    ]
    }
    }
    }
    },
}


