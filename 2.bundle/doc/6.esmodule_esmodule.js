(() => {
	'use strict';
	var modules = {
		'./src/title.js': (module, __webpack_exports__, require) => {
			require.r(__webpack_exports__);
			require.d(__webpack_exports__, {
				default: () => EXPORT,
				age: () => age,
			});
			const EXPORT = 'esmodule';
			const age = 'esmodule_age';
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
    // 先 require.r
		require.r(__webpack_exports__);
		var _title_0__ = require('./src/title.js');
		console.log(_title_0__.default);
		console.log(_title_0__.age);
	})();
})();
