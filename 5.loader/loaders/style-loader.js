const loaderUtils = require('loader-utils')

/**
 * @param {*} inputSource
 * less-loader 转译后的代码
 */
function loader(inputSource) {
  // let script = `
  //   let style = document.createElement('style');
  //   style.innerHTML = ${JSON.stringify(inputSource)};
  //   document.head.appendChild(style);
  // `;
  // return script;
}

/**
 * 如果 pitch 函数有返回值，不需要执行后续的loader和读文件了
 * @param {*} remainingRequest 
 * @param {*} previousRequest 
 * @param {*} data 
 */
loader.pitch = function(remainingRequest, previousRequest, data) {
  console.log('remainingRequest ', remainingRequest)
  console.log('previousRequest ', previousRequest)
  console.log('data ', data)
  let script = `
    let style = document.createElement('style');
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
    document.head.appendChild(style);
  `;
  // 这个返回的js脚本给了webpack了
  // 把这个js脚本转成ast抽象语法树，分析里面的require依赖
  return script;
}
module.exports = loader

/**
 * ['style-loader', 'less-loader']
 * request = style-loader!less-loader!index.less
 * remainingRequest=less-loader!index.less
 * !!less-loader!index.less
 * stringifyRequest 把绝对路径转成相对路径
 */