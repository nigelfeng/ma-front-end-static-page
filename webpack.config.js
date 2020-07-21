const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
      // "polyfill": "@babel/polyfill",
      // "main": "./src/app/main.js",
      // "home-main": "./src/app/home/home-main.js",
      // "catalog-main": "./src/app/catalog/catalog-main.js",
      // "login-main": "./src/app/login/login-main.js",
      // "account-main": "./src/app/account/account-main.js",
      // "cart-main": "./src/app/cart/cart-main.js",
      // "checkout-main": "./src/app/checkout/checkout-main.js",
      // "sl-main": "./src/app/shoppingLists/sl-main.js",
      // "product-main": "./src/app/product/product-main.js",
      // "rentals-main": "./src/app/rentals/rentals-main.js",
      // "correspondence/correspondence-main": "./src/app/correspondence/correspondence-main.js",
      // "track-order-main": "./src/app/trackorder/track-order-main.js",
      "css/app": "./src/app/scss/app.scss",
      "css/climb-rentals": "./src/app/scss/climb-rentals.scss",
      "css/power-reviews": "./src/app/css/power-reviews.css",
      app: "./src/static.ma.js",
      // "school-supplies-main": "./src/app/school-supplies/school-supplies.main.js",
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
            { loader: "css-loader" },
            {
              loader: "postcss-loader",
              options: { plugins: [autoprefixer()] },
            },
            {
              loader: "sass-loader",
              options: {
                implementation: require("node-sass"),
                sassOptions: scssBuildOptions(env),
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
      // home
      new HtmlWebpackPlugin({
        template: "html-withimg-loader!./html/index.html",
        title: "static ma",
        filename: "index.html",
        chunks: ["css/app", "app"],
      }),

      // cart
      new HtmlWebpackPlugin({
        template: "html-withimg-loader!./html/cart.html",
        title: "static ma",
        filename: "cart.html",
        chunks: ["css/app", "app"],
      }),

      // catalog
      new HtmlWebpackPlugin({
        template: "html-withimg-loader!./html/catalog.html",
        title: "static ma",
        filename: "catalog.html",
        chunks: ["css/app", "app"],
      }),

      new MiniCssExtractPlugin({ filename: "[name].css" }),
    ],
    target: "web",
    devServer: {
      host: "0.0.0.0",
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000,
    },
  };
};
