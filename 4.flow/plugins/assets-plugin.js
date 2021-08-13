class AssetPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('AssetPlugin', assets => {
      assets['assets.md'] = Object.kes(assets).join('\n')
    })
  }
}

module.exports = AssetPlugin