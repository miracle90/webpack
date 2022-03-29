class AssetPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('AssetPlugin', assets => {
      assets['assets.md'] = Object.keys(assets).join('\n')
    })
  }
}

module.exports = AssetPlugin