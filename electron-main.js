import { app, BrowserWindow, Menu, session, protocol, net } from 'electron';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Habilitar aceleração de hardware (Placa de Vídeo / WebGPU) para a IA ficar ultra-rápida
app.commandLine.appendSwitch('enable-unsafe-webgpu');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-features', 'Vulkan');

// Registrar privilégios ANTES do app estar pronto
protocol.registerSchemesAsPrivileged([
  { scheme: 'hf', privileges: { secure: true, standard: true, supportFetchAPI: true, corsEnabled: true } }
]);

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
    icon: path.join(__dirname, 'public/favicon.ico'),
  });

  // Forçar User-Agent de navegador comum para evitar bloqueios do Hugging Face
  mainWindow.webContents.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    console.log('Loading development URL...');
    mainWindow.loadURL('http://localhost:5173');
  } else {
    console.log('Loading production file...');
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  // Descomente abaixo para ver os logs do DevTools caso haja algum erro em produção
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', () => {
  // Configura cabeçalhos globais para evitar bloqueios de IA
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    // Deleta cabeçalhos que revelam que a requisição vem de um app local
    delete details.requestHeaders['Origin'];
    delete details.requestHeaders['Referer'];
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  createWindow();
});

// Tudo resolvido: o problema não era o Electron, mas sim o modelo que não existia mais!
app.whenReady().then(() => {
  // Pronto para rodar
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Menu
const template = [
  {
    label: 'Arquivo',
    submenu: [
      {
        label: 'Sair',
        accelerator: 'CmdOrCtrl+Q',
        click: () => {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'Editar',
    submenu: [
      { label: 'Desfazer', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
      { label: 'Refazer', accelerator: 'CmdOrCtrl+Y', role: 'redo' },
      { type: 'separator' },
      { label: 'Cortar', accelerator: 'CmdOrCtrl+X', role: 'cut' },
      { label: 'Copiar', accelerator: 'CmdOrCtrl+C', role: 'copy' },
      { label: 'Colar', accelerator: 'CmdOrCtrl+V', role: 'paste' },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
