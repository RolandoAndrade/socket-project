const webpack = require("webpack");

module.exports = {
  lintOnSave: false,
  outputDir: `${__dirname}/../server/public`,
  transpileDependencies: ["vuetify"],
  configureWebpack: (config) => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          "process.env.VUE_APP_VERSION": JSON.stringify(require("./package.json").version)
        })
      ]
    };
  }
};