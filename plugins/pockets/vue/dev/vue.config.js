const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
let mode = process.env.NODE_ENV

module.exports = {
  outputDir: "../dist",
  devServer: {
    /**
      allowedHosts: all is needed for HMR to work
    */
    allowedHosts: 'all',
    headers: {
      "Access-Control-Allow-Origin": "*"
      /**
        this is also required for HMR to work
      */
    },
  },
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: config => {
    config.plugins = config.plugins.concat( new WebpackManifestPlugin( { } ) )
  },
  chainWebpack: config => {
    config.plugins
      .delete("html")
      .delete("prefetch")
      .delete("preload")

      config.module
        .rule('vue')
        .use('vue-loader')
        .tap((options) => {
          return {
            ...options,
            reactivityTransform: true
          }
        })
    return config
  }
}
