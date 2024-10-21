// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // 监听器
  uploadValue: (callback) => ipcRenderer.on('uploadValue', callback),
  // 获取配置文件路径
  getPath: (key) => {
    ipcRenderer.invoke('getPath', key)
  },
  // 
  reset: (callback) => ipcRenderer.on('reset', callback),
})