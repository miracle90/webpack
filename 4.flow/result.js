let stats = {
  // 本地编译产出的hash值
  hash: '07eec3e9370ee6c9800e',
  version: '5.50.0',
  time: 46,
  // 构建的时间戳
  builtAt: 1628838097049,
  // 资源访问路径
  publicPath: 'auto',
  // 输出目录
  outputPath: '/Users/11112733/project/webpack/dist',
  // 资源代码块的文件名，key value 格式
  assetsByChunkName: { main: [ 'main.js' ] },
  assets: [
    {
      type: 'asset',
      name: 'main.js',
    }
  ],
  // 编译出的代码块
  chunks: [
    {
      rendered: true,
      initial: true,
      entry: true,
      recorded: false,
      reason: undefined,
      size: 0,
      "names": ["main"],
			"idHints": [],
			"runtime": ["main"],
			"files": ["main.js"],
      auxiliaryFiles: [],
      hash: 'af45743264574de85003',
      "childrenByOrder": {},
      id: 'main',
      siblings: [],
      parents: [],
      children: [],
      "origins": [
				{
					"module": "",
					"moduleIdentifier": "",
					"moduleName": "",
					"loc": "main",
					"request": "./src/index.js"
				}
			]
    }
  ],
  modules: [],
  filteredModules: undefined,
  "entrypoints": {
		"main": {
			"name": "main",
			"chunks": ["main"],
			"assets": [
				{
					"name": "main.js",
					"size": 99
				}
			],
			"filteredAssets": 0,
			"assetsSize": 99,
			"auxiliaryAssets": [],
			"filteredAuxiliaryAssets": 0,
			"auxiliaryAssetsSize": 0,
			"children": {},
			"childAssets": {},
			"isOverSizeLimit": false
		}
	},
  // 命名代码块分组
	"namedChunkGroups": {
		"main": {
			"name": "main",
			"chunks": ["main"],
			"assets": [
				{
					"name": "main.js",
					"size": 99
				}
			],
			"filteredAssets": 0,
			"assetsSize": 99,
			"auxiliaryAssets": [],
			"filteredAuxiliaryAssets": 0,
			"auxiliaryAssetsSize": 0,
			"children": {},
			"childAssets": {},
			"isOverSizeLimit": false
		}
	},
  errors: [
    {
      loc: 'main',
      message: "Module not found: Error: Can't resolve './src/index.js' in '/Users/11112733/project/webpack'",
      details: "resolve './src/index.js' in '/Users/11112733/project/webpack'\n" +
        '  No description file found in /Users/11112733/project/webpack or above\n' +
        '  No description file found in /Users/11112733/project/webpack/src or above\n' +
        '  no extension\n' +
        "    /Users/11112733/project/webpack/src/index.js doesn't exist\n" +
        '  .js\n' +
        "    /Users/11112733/project/webpack/src/index.js.js doesn't exist\n" +
        '  .json\n' +
        "    /Users/11112733/project/webpack/src/index.js.json doesn't exist\n" +
        '  .wasm\n' +
        "    /Users/11112733/project/webpack/src/index.js.wasm doesn't exist\n" +
        '  as directory\n' +
        "    /Users/11112733/project/webpack/src/index.js doesn't exist",
      stack: "ModuleNotFoundError: Module not found: Error: Can't resolve './src/index.js' in '/Users/11112733/project/webpack'\n" +
        '    at /Users/11112733/project/webpack/4.flow/node_modules/webpack/lib/Compilation.js:1773:28\n' +
        '    at /Users/11112733/project/webpack/4.flow/node_modules/webpack/lib/NormalModuleFactory.js:811:13\n' +
        '    at eval (eval at create (/Users/11112733/project/webpack/4.flow/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:10:1)\n' +
        '    at /Users/11112733/project/webpack/4.flow/node_modules/webpack/lib/NormalModuleFactory.js:286:22\n' +
        '    at eval (eval at create (/Users/11112733/project/webpack/4.flow/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:9:1)\n' +
        '    at /Users/11112733/project/webpack/4.flow/node_modules/webpack/lib/NormalModuleFactory.js:442:22\n' +
        '    at /Users/11112733/project/webpack/4.flow/node_modules/webpack/lib/NormalModuleFactory.js:124:11\n' +
        '    at /Users/11112733/project/webpack/4.flow/node_modules/webpack/lib/NormalModuleFactory.js:673:25\n' +
        '    at /Users/11112733/project/webpack/4.flow/node_modules/webpack/lib/NormalModuleFactory.js:882:8\n' +
        '    at /Users/11112733/project/webpack/4.flow/node_modules/webpack/lib/NormalModuleFactory.js:1002:5'
    }
  ],
  errorsCount: 1,
  warnings: [],
  warningsCount: 0,
  children: []
}
