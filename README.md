# 🚀 Central Luan Estifer

Uma central de produtividade premium desenvolvida com **Electron + Vite**, projetada para organizar sua vida, carreira e espiritualidade em um só lugar.

## 🎯 Funcionalidades Principais

*   **📅 Minha Rotina**: Dashboard inteligente com relógio digital, Pomodoro integrado e cronograma semanal de estudos.
*   **📖 Plano Bíblico**: Acompanhamento dinâmico de leitura para 365 dias com barra de progresso.
*   **💼 Gerenciador de Vagas**: Rastreie suas candidaturas, status e links de oportunidades em tempo real.
*   **📝 Editor de Currículo Live**: Edite seu currículo em HTML/CSS com visualização instantânea e exportação para PDF.

## 🌐 Acesso Online (GitHub Pages)

Acesse a Central Luan diretamente no navegador, sem instalar nada:

**🔗 [Central Luan - GitHub Pages](https://zsubzeroz.github.io/App-Pessoal/)**

> [!NOTE]
> A Zen AI (Ollama) só funciona na versão desktop, pois requer motor local.

## 📦 Downloads (Executáveis Universais)

Para facilitar o uso sem a necessidade de instalar ferramentas de desenvolvimento, você pode baixar a versão mais recente diretamente da aba **Releases** do GitHub:

*   **Windows**: Versão Portátil (`.exe`) - Não requer instalação.
*   **Linux**: AppImage (`.AppImage`) - Funciona em qualquer distribuição (Ubuntu, Fedora, etc.).

> [!TIP]
> No Linux, lembre-se de dar permissão de execução: `chmod +x arquivo.AppImage`.

## 🛠️ Tecnologias

*   **Desktop**: [Electron](https://www.electronjs.org/)
*   **Build Engine**: [Vite](https://vitejs.dev/)
*   **Design**: Vanilla CSS3 com variáveis dinâmicas
*   **Interface**: HTML5 Semântico

## 🚀 Desenvolvimento

Se você deseja rodar o projeto localmente ou contribuir:

### Instalação
```bash
git clone https://github.com/Zsubzeroz/App-Pessoal.git
cd App-Pessoal
npm install
```

### Scripts Disponíveis
*   `npm run electron-dev`: Inicia o ambiente de desenvolvimento.
*   `npm run electron-build`: Gera os executáveis para Windows e Linux.

## 🔄 Manutenção e Gestão

### Como Atualizar
Se houver novas atualizações no repositório, use:
```bash
git pull origin master
```

### Como Desinstalar
*   **Linux**:
    1. Remova a pasta do projeto: `rm -rf ~/Dev/Projetos/App-Pessoal-master`
    2. Remova o atalho do menu: `rm ~/.local/share/applications/central-luan.desktop`
*   **Windows**:
    1. Delete a pasta do projeto.
    2. Delete o atalho criado na Área de Trabalho.

## 📁 Estrutura Organizada
```
App-Pessoal/
├── .github/workflows/      # Automação de Builds (CI/CD)
├── src/
│   ├── assets/             # Imagens e ícones
│   ├── views/              # Lógica de cada módulo
│   ├── main.js             # Roteador principal
│   └── style.css           # Sistema de design global
├── electron-main.js        # Configuração do Electron
└── package.json            # Metadados e dependências
```

---
**Desenvolvido com ❤️ por Luan Estifer**