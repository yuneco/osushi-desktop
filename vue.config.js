module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: 'com.nekobooks.sushidesk',
        mac: {
          target: 'dmg',
          icon: 'src/assets/app.icns'
        },
        win: {
          target: 'portable',
          icon: 'src/assets/app.ico'
        }
      }
    }
  }
}
