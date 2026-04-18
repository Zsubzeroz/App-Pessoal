const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // Você pode adicionar APIs aqui se precisar comunicar com o processo principal
});
