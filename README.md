# App Pessoal

Aplicativo pessoal desktop desenvolvido com Electron + Vite para gerenciamento de rotina, plano bíblico, vagas de emprego e currículo. Suporta totalmente Windows e Linux.

## 🚀 Funcionalidades

- **Minha Rotina** - Gerenciamento diário de tarefas e hábitos
- **Plano Bíblico** - Acompanhamento de leitura bíblica
- **Vagas** - Controle de oportunidades de emprego
- **Currículo** - Gerenciamento de informações profissionais

## 🛠️ Tecnologias

- **Electron** - Framework para aplicações desktop
- **Vite** - Build tool e dev server com suporte a caminhos relativos em produção
- **JavaScript ES6+** - Linguagem principal
- **HTML5/CSS3** - Interface e estilos

## 📦 Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/Zsubzeroz/App-Pessoal.git
cd App-Pessoal

# Instale as dependências
npm install
```

## 🚀 Como executar

### Desenvolvimento
```bash
# Executar servidor de desenvolvimento e o Electron
npm run electron-dev
```

### Produção (Build)

#### No Windows
```bash
# Compilar instalador e versão portátil para Windows
npm run electron-build:win
```

#### No Linux
```bash
# Compilar versão AppImage e .deb para Linux
npm run electron-build:linux

# Ou via script auxiliar
./compilar_executavel.sh
```

## 🐧 Rodando no Linux
Você pode instalar o pacote nativo `.deb` ou executar o arquivo portátil `AppImage`:

### Como instalar e rodar o arquivo `.deb`
```bash
sudo dpkg -i dist/app-pessoal_0.0.0_amd64.deb
```

### Como rodar o `AppImage`
```bash
chmod +x "dist/App Pessoal-0.0.0.AppImage"
./"dist/App Pessoal-0.0.0.AppImage" --no-sandbox
```

## 📁 Estrutura do Projeto

```
App-Pessoal/
├── src/                    # Código fonte
│   ├── main.js            # Ponto de entrada da aplicação
│   ├── style.css          # Estilos globais
│   └── views/             # Views da aplicação
│       ├── rotina.js      # Lógica da rotina
│       ├── biblia.js      # Lógica do plano bíblico
│       ├── vagas.js       # Lógica das vagas
│       └── curriculo.js   # Lógica do currículo
├── public/                # Assets estáticos
├── electron-main.js       # Processo principal do Electron
├── preload.js            # Script de preload
├── vite.config.js        # Configuração do Vite para produção
└── package.json          # Dependências e scripts
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento Vite
- `npm run build` - Build para produção
- `npm run electron-dev` - Desenvolvimento com Electron
- `npm run electron-build` - Build do executável para Windows e Linux
- `npm run electron-build:win` - Build do executável para Windows
- `npm run electron-build:linux` - Build do executável para Linux

---

**Desenvolvido por Luan Estifer**