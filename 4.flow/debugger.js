const webpack = require("./webpack");
const webpackOptions = require("./webpack.config");
const compiler = webpack(webpackOptions);
compiler.run((err, stats) => {
  let result = stats.toJson({
    files: true,
    assets: true,
    chunk: true,
    modules: true,
    entries: true,
  });
  console.log('++++++++++++++++++++++++')
  console.log(JSON.stringify(result, null, 2));
});
