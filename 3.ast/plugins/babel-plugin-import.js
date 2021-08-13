let babelCore = require('@babel/core');
let types = require('babel-types');

/**
 * import { flatten, concat } from 'lodash'
 * 通过把上面这种写法变成下面这种写法
 * import flatten from 'lodash/flatten'
 * import concat from 'lodash/concat'
 */


// tresshaking 只支持 esmodule，不支持commonjs
let babelPluginImport = {
	visitor: {
		// 拦截所有的导入语句
		ImportDeclaration: {
			enter(nodePath, state = {}) {
				// 拿到所有的标识符
				const specifiers = nodePath.node.specifiers;
				// 模块的名字 => lodash
				const source = nodePath.node.source;
				// 如果是默认导入，防止死循环
				if (state.opts.libraryName === 'lodash' && !types.isImportDefaultSpecifier(specifiers[0])) {
					const importDeclarations = specifiers.map((specifier, index) => {
						return types.importDeclaration(
							[types.importDefaultSpecifier(specifier.local)],
							// lodash/flatten...
							types.stringLiteral(`${source.value}/${specifier.local.name}`)
						);
					});
					nodePath.replaceWithMultiple(importDeclarations);
				}
			},
		},
	},
};

module.exports = function () {
	return babelPluginImport;
};
