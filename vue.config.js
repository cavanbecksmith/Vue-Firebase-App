module.exports = {
  configureWebpack: {
    module: {
      rules: [
        // {
        //   test: /\.(pdf)(\?.*)?$/,
        //   use: [
        //     {
        //       loader: 'url-loader',
        //       options: {
        //         name: 'files/[name].[hash:8].[ext]'
        //       }
        //     }
        //   ]
        // }
        // { loader: 'url-loader?limit=100000', test: /.(png|woff|woff2|eot|ttf|svg|gif)$/ },
        // {
        //   test: require.resolve('tinymce/tinymce'),
        //   loaders: [
        //     'imports?this=>window',
        //     'exports?window.tinymce'
        //   ]
        // },
        // {
        //   test: /tinymce\/(themes|plugins)\//,
        //   loaders: [
        //     'imports?this=>window'
        //   ]
        // }   
      ]
    }
  },
  runtimeCompiler: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      // css: {
      //   // options here will be passed to css-loader
      // },
      // postcss: {
      //   // options here will be passed to postcss-loader
      // }
    }
  }
}