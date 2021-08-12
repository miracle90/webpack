(() => {
	// 模块定义对象 key 模块的 id（就等于模块的相对于项目根目录的相对路径）
	var modules = {
		// 前缀全都是 ./src
		'./src/title.js': module => {
			// 因为webpack只支持commonjs模块化，不管是什么模块都会转化成commonjs模块
			module.exports = 'title';
		},
	};
	var cache = {};
	function require(moduleId) {
		var cachedModule = cache[moduleId];
		// 先看缓存有没有
		if (cachedModule !== undefined) {
			return cachedModule.exports;
		}
		// 新声明一个对象
		var module = (cache[moduleId] = {
			exports: {},
		});
		// 执行
		modules[moduleId](module, module.exports, require);
		return module.exports;
	}
	var exports = {};
	// 入口文件
	(() => {
		let title = require('./src/title.js');
		console.log(title);
	})();
})();

// nodejs里有内置的require方法

// 打包后的文件是跑在浏览器里，并没有require，需要自己实现
