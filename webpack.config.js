const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const scssBuildOptions = (env) => {
  return {
    outputStyle: env === "development" ? "expanded" : "compressed",
    sourceMap: env === "development",
  };
};

module.exports = (env) => {
  console.log(`ENVIRONMENT == ${env}\n`);

  return {
    entry: {
      "app": "./src/app/scss/app.scss",
      "climb-rentals": "./src/app/scss/climb-rentals.scss",
      "power-reviews": "./src/app/css/power-reviews.css",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "public/css"),
    },
    externals: {
      jquery: "jQuery",
    },
    devtool: env == "development" ? "sourcemap" : false,
    mode: env,
    watchOptions: {
      ignored: /node_modules/,
    },
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: scssBuildOptions(env),
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "postcss-loader",
              options: { plugins: [autoprefixer()], sourceMap: true },
            },
            {
              loader: "sass-loader",
              options: {
                implementation: require("node-sass"),
                sassOptions: scssBuildOptions(env),
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(gif|png|woff|otf|jpg|eot|svg)$/,
          loader: "url-loader",
          options: { limit: 10000 },
        },
        {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader",
        },
        {
          test: /\.(ttf|eot)(\?[\s\S]+)?$/,
          loader: "file-loader",
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "[name].css" }),
    ],
    target: "web",
  };
};
