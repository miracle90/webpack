const { __esModule } = require('../dist/main.js');

(() => {
	var modules = {
		'./src/title.js': (__unused_webpack_module, exports) => {
			exports.a = 'a';
			exports.b = 'b';
		},
	};
	var cache = {};
	function require(moduleId) {
		var cachedModule = cache[moduleId];
		if (cachedModule !== undefined) {
			return cachedModule.exports;
		}
		var module = (cache[moduleId] = {
			exports: {},
		});
		modules[moduleId](module, module.exports, require);
		return module.exports;
	}
	var exports = {};
	(() => {
		let title = require('./src/title.js');
		console.log(title.a);
		console.log(title.b);
	})();
})();

// 1、commonjs => 打包后不变
// 2、esmodule => __esModule = true + 默认导出挂在 exports.default 上，其他属性不变
