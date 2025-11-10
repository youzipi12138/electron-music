import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { isDev } from './utils.js';

// 在 ES 模块中获取 __dirname 的等效值
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1056,
    height: 752,
    minWidth: 1056,
    minHeight: 752,
    frame: false, // 隐藏系统标题栏
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'), // 加载 preload 脚本
    },
  });

  if (isDev) {
    // 开发模式：加载 Vite 开发服务器
    mainWindow.loadURL('http://localhost:3009');
    // 自动打开开发者工具
    mainWindow.webContents.openDevTools();
  } else {
    // 生产模式：加载构建后的文件
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 监听窗口最大化状态变化
  mainWindow.on('maximize', () => {
    mainWindow?.webContents.send('window-maximize-changed', true);
  });

  mainWindow.on('unmaximize', () => {
    mainWindow?.webContents.send('window-maximize-changed', false);
  });
}

// 处理窗口控制 IPC 消息
ipcMain.handle('window-minimize', () => {
  mainWindow?.minimize();
});

ipcMain.handle('window-maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.handle('window-close', () => {
  // macOS 上点击关闭按钮时隐藏窗口而不是关闭
  if (process.platform === 'darwin') {
    mainWindow?.hide();
  } else {
    mainWindow?.close();
  }
});

ipcMain.handle('window-is-maximized', () => {
  return mainWindow?.isMaximized() || false;
});

//首次打开
app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
//macOS上点击Dock图标时显示窗口
app.on('activate', () => {
  if (process.platform === 'darwin') {
    if (mainWindow) {
      mainWindow.show();
    } else {
      createWindow();
    }
  } else {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  }
});

// nodeIntegration: false
// 含义：禁止在渲染进程中直接访问 Node.js API（如 require、process、fs 等）
// 作用：降低安全风险，避免网页脚本直接操作文件系统或执行系统命令
// 示例：在渲染进程中不能直接写 const fs = require('fs')
// contextIsolation: true
// 含义：启用上下文隔离，将网页上下文与 Electron 的 Node.js 上下文隔离
// 作用：防止网页脚本通过原型链污染或全局变量访问 Node.js 上下文
// 配合：通常与 preload 脚本配合，通过 contextBridge 安全地暴露 API 给渲染进程
