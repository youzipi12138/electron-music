import { contextBridge, ipcRenderer } from 'electron';

// 暴露窗口控制 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 最小化窗口
  minimizeWindow: () => ipcRenderer.invoke('window-minimize'),
  // 最大化/还原窗口
  maximizeWindow: () => ipcRenderer.invoke('window-maximize'),
  // 关闭窗口
  closeWindow: () => ipcRenderer.invoke('window-close'),
  // 检查窗口是否最大化
  isMaximized: () => ipcRenderer.invoke('window-is-maximized'),
  // 监听窗口最大化状态变化
  onMaximize: (callback: (isMaximized: boolean) => void) => {
    ipcRenderer.on('window-maximize-changed', (_event, isMaximized: boolean) =>
      callback(isMaximized)
    );
  },
});
