const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              'babel-plugin-relay',
            ],
          },
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  target: 'node',
  entry: './src/server.jsx',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'server.js',
  },
  resolve: {
    extensions: ['mjs', '.js', '.jsx', 'json'],
  },
  mode: 'development',
};
