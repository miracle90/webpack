(() => {
	var modules = {
		'./src/title.js': module => {
			module.exports = {
				name: 'title_name',
				age: 'title_age',
			};
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
	(() => {
		require.n = module => {
      // 判断是否为 esmodule 模块
      // 如果是，会返回 module.default
      // 如果是 commonjs，取导出对象本身
			var getter =
				module && module.__esModule ? () => module['default'] : () => module;
			require.d(getter, { a: getter });
			return getter;
		};
	})();
	(() => {
		require.d = (exports, definition) => {
			for (var key in definition) {
				if (require.o(definition, key) && !require.o(exports, key)) {
					Object.defineProperty(exports, key, {
						enumerable: true,
						get: definition[key],
					});
				}
			}
		};
	})();
	(() => {
		require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
	})();
	(() => {
		require.r = exports => {
			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
			}
			Object.defineProperty(exports, '__esModule', { value: true });
		};
	})();
	var __webpack_exports__ = {};
	(() => {
		'use strict';
    // 当我们用 esmodule 去加载 commonjs 的时候，default 如何取
		require.r(__webpack_exports__);
		var _title_0__ = require('./src/title.js');
		var _title_0___default = /*#__PURE__*/ require.n(_title_0__);
		console.log(_title_0___default());
		console.log(_title_0__.age);
	})();
})();
