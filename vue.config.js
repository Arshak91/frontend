module.exports = {
  outputDir: './dist',
  devServer: {
    proxy: {
      '/': {
        target: process.env.API_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      fallback: {
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        os: require.resolve('os-browserify'),
        path: require.resolve('path-browserify')
      }
    }
  }
}
