// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // 主进程-渲染器
  set: (title) => ipcRenderer.send('set', title),
  // 渲染器-主进程
  open: () => ipcRenderer.invoke('open'),
  // 监听器
  onUpdate: (callback) => ipcRenderer.on('update', callback)
})