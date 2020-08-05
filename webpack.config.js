const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const getPlugins = (env) => {
//     let plugins = [new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(env) })];

//     plugins.push(new MiniCssExtractPlugin({ filename: "[name].css" }));

//     let filesToCopy = [
//         { "from": "node_modules/jquery/dist/jquery.min.js", "to": "./" },
//         { "from": "node_modules/foundation-sites/dist/js/foundation.min.js", "to": "./" },
//         { "from": "node_modules/what-input/dist/what-input.min.js", "to": "./" },
//         {
//             "from": "src/app/img/**/*",
//             "to": "./",
//             test: /\.(gif|png|jpe?g|svg|ico)$/,
//             transformPath(targetPath, absolutePath) { return targetPath.replace(/^src[\\\/]+app/i, "") }
//         },
//     ];

//     if (env === "development") {
//         filesToCopy.push({ "from": "node_modules/foundation-sites/dist/js/foundation.min.js.map", "to": "./" });
//         filesToCopy.push({ "from": "node_modules/what-input/dist/maps/what-input.min.js.map", "to": "./maps/" });
//     }

//     plugins.push(new CopyWebpackPlugin(filesToCopy));

//     if (env === "production") {
//         plugins.push(new CleanWebpackPlugin());
//     }

//     return plugins;
// };

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
      "css/app": "./src/app/scss/app.scss",
      "css/climb-rentals": "./src/app/scss/climb-rentals.scss",
      "css/power-reviews": "./src/app/css/power-reviews.css",
      app: "./src/static.ma.js",
      "font-awesome": "font-awesome-loader!./font-awesome.config.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    // externals: {
    //   "foundation-sites": "Foundation",
    //   jquery: "jQuery",
    //   "what-input": "whatInput",
    // },
    devtool: env == "development" ? "sourcemap" : false,
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: /node_modules/,
            chunks: "all",
            enforce: true,
            // priority: -9
          },
        },
      },
    },
    mode: env,
    watchOptions: {
      ignored: /node_modules/,
    },
    module: {
      rules: [
        // {
        //     test: /\.html$/,
        //     use: [
        //         { loader: "ngtemplate-loader?relativeTo=" + (path.resolve(__dirname, './src/app')) + '/' },
        //         { loader: 'html-loader' }
        //     ]
        // },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env"] },
          },
        },
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
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({ filename: "[name].css" }),
    ],
    target: "web",
  };
};
