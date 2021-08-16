/**
 * file-loader 并不会对文件内容进行任何转换，只是复制一份文件内容，并根据配置为他生成一个唯一的文件名。
 */
const { getOptions } = require('loader-utils');
const mime = require('mime');

function loader(content) {
	let options = getOptions(this) || {};
	let { limit, fallback } = options;
	if (limit) {
		limit = parseInt(limit, 10);
	}
	const mimeType = mime.getType(this.resourcePath);
  console.log(limit)
  console.log(fallback)
  console.log(content.length)
	if (!limit || content.length < limit) {
		let base64 = `data:${mimeType};base64,${content.toString('base64')}`;
		return `module.exports=${JSON.stringify(base64)}`;
	} else {
    return require(fallback).call(this, content)
  }
}

module.exports = loader;
