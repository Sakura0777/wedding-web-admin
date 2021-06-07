/** @format */

module.exports = {
  publicPath: "./",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/gkc": {
        target: `http://material.shilim.cn`,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets,
        pathRewrite: {
          "^/gkc": "",
        },
      },
      "/images": {
        target: `http://material.shilim.cn/verify/img`,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets,
      },
    },
  },
  transpileDependencies: [/\bvue-awesome\b/],
};
