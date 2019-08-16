'use strict'

// import { app, BrowserWindow } from 'electron'

import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'
// 注意这个autoUpdater不是electron中的autoUpdater
import {
  autoUpdater
} from 'electron-updater'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
	 * Initial window options
	 */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 处理更新操作
  function handleUpdate () {
    const returnData = {
      error: {
        status: -1,
        msg: '检测更新查询异常'
      },
      checking: {
        status: 0,
        msg: '正在检查应用程序更新'
      },
      updateAva: {
        status: 1,
        msg: '检测到新版本，正在下载,请稍后'
      },
      updateNotAva: {
        status: -1,
        msg: '您现在使用的版本为最新版本,无需更新!'
      }
    }

    // 和之前package.json配置的一样
    autoUpdater.setFeedURL('http://rms.youyoushizi.com:8088/downdir')

    // 更新错误
    autoUpdater.on('error', function (error) {
      sendUpdateMessage(returnData.error)
    })

    // 检查中
    autoUpdater.on('checking-for-update', function () {
      sendUpdateMessage(returnData.checking)
    })

    // 发现新版本
    autoUpdater.on('update-available', function (info) {
      sendUpdateMessage(returnData.updateAva)
    })

    // 当前版本为最新版本
    autoUpdater.on('update-not-available', function (info) {
      setTimeout(function () {
        sendUpdateMessage(returnData.updateNotAva)
      }, 1000)
    })

    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
      mainWindow.webContents.send('downloadProgress', progressObj)
    })

    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
      ipcMain.on('isUpdateNow', (e, arg) => {
        // some code here to handle event
        autoUpdater.quitAndInstall()
      })
      // win.webContents.send('isUpdateNow')
    })

    // 执行自动更新检查
    // autoUpdater.checkForUpdates()
  }
  handleUpdate()

  // 通过main进程发送事件给renderer进程，提示更新信息
  function sendUpdateMessage (text) {
    mainWindow.webContents.send('message', text)
  }

  ipcMain.on('checkForUpdate', (event, data) => {
    console.log('执行自动更新检查!!!')
    // event.sender.send('reply', 'hi lee my name is yuan, age is 17');
    autoUpdater.checkForUpdates()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
