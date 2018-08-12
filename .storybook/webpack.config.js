const path = require("path");

module.exports = {
    resolve: {
        alias: {
            src: path.resolve(__dirname, '..', 'src'),
        },
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
              test: /\.(ts|tsx)$/,
              loader: 'babel-loader!ts-loader',
              exclude: /node_modules/,
              include: path.resolve(__dirname, "../"),
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
                include: path.resolve(__dirname, "../"),
            }
        ]
    }
  };