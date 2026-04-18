# App Pessoal - Versão Desktop (Electron)

## Como Usar

### Modo Desenvolvimento
Execute um dos arquivos abaixo para rodar o app em modo desenvolvimento:
- **iniciar_invisivel.vbs** - Abre o app sem mostrar o terminal (recomendado)
- **iniciar.cmd** - Abre o app e mostra o terminal

### Compilar para Executável
Para criar um instalador e/ou executável portátil:
```bash
npm run electron-build
```

Os arquivos compilados estarão em: `dist/`

Você terá:
- **AppPessoal Setup.exe** - Instalador Windows
- **AppPessoal.exe** - Executável portátil (pode rodar sem instalar)

## O que foi feito

✅ Integração com Electron  
✅ Scripts automáticos para rodar  
✅ Menu da aplicação (Arquivo, Editar)  
✅ DevTools aberto em desenvolvimento  
✅ Configuração para gerar instalador Windows  

## Estrutura

- **electron-main.js** - Processo principal do Electron
- **preload.js** - Script de preload (segurança)
- **package.json** - Configuração com scripts e builder

## Dicas

1. Para desativar DevTools em desenvolvimento, edite `electron-main.js` linha ~42
2. Para mudar o tamanho inicial da janela, edite `electron-main.js` linhas 10-14
3. Para adicionar um ícone personalizado, coloque um arquivo `.ico` em `public/favicon.ico`
