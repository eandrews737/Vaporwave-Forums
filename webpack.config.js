module.exports = {
  entry: './main.js',
  output: {
    path: './',
    filename: 'index.js',
    publicPath: "/public/",
  },
  devServer: {
    inline: true,
    port: 5432
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}