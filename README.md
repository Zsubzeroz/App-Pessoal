# Central de Produtividade

Aplicação web SPA responsiva e moderna para organizar rotina, estudos, carreira e produtividade. Acesse de qualquer dispositivo — mobile ou desktop — sem instalar nada.

## Acesso Online

**[Central de Produtividade - GitHub Pages](https://zsubzeroz.github.io/App-Pessoal/)**

## Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| **Minha Rotina** | Saudação dinâmica, relógio, Pomodoro 25/5, progresso diário, cronograma semanal editável |
| **Plano Bíblico** | Leitura de 365 dias com checkboxes, barra de progresso, auto-reset |
| **Zen AI** | Chat assistente com motor offline (Ollama) |
| **Ideias & Notas** | Bloco de notas com organização via IA |
| **Checklist** | Hábitos diários com reset automático + tarefas customizáveis |
| **Gestão de Vagas** | Dashboard de candidaturas com status, métricas e CRUD |
| **Currículo** | Editor live HTML/CSS com preview e impressão PDF |

## Login Google

O app utiliza **Google Identity Services** para autenticação. Cada usuário visualiza apenas seus próprios dados. Sem conta Google, o app não funciona.

## Exportação TXT Criptografado

- Botão **Exportar Dados** no menu lateral
- Gera arquivo `.enc.txt` com AES-256-GCM
- Criptografado com ID da conta Google do usuário
- Apenas a mesma conta consegue descriptografar
- Verifica duplicatas antes de baixar

## PWA (Progressive Web App)

O app pode ser instalado no mobile e desktop como um aplicativo nativo:
- Funciona offline via Service Worker
- Ícone próprio no menu do dispositivo
- Modo standalone (sem barra do navegador)

## Tecnologias

- **Frontend**: Vanilla JS + Vite
- **Estilo**: CSS customizado com variáveis CSS
- **Ícones**: Font Awesome 6
- **Fontes**: Google Fonts (Inter)
- **Criptografia**: Web Crypto API (AES-256-GCM, PBKDF2)
- **Auth**: Google Identity Services
- **PWA**: vite-plugin-pwa + Workbox
- **Deploy**: GitHub Pages

## Desenvolvimento

```bash
git clone https://github.com/Zsubzeroz/App-Pessoal.git
cd App-Pessoal
npm install
npm run dev
```

### Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |

## Estrutura

```
App-Pessoal/
├── .github/workflows/      # CI/CD (deploy GitHub Pages)
├── public/
│   ├── manifest.json       # Manifest PWA
│   ├── icon-192.svg        # Ícone PWA 192x192
│   ├── icon-512.svg        # Ícone PWA 512x512
│   └── favicon.svg         # Favicon
├── src/
│   ├── auth.js             # Login/logout Google
│   ├── crypto.js           # Criptografia AES-256-GCM
│   ├── storage.js          # localStorage por usuário
│   ├── utils.js            # Funções utilitárias + export TXT
│   ├── views/              # Componentes de cada módulo
│   ├── main.js             # Router + fluxo de auth
│   └── style.css           # Design system global
├── index.html              # Shell HTML com login + app
├── vite.config.js          # Configuração Vite + PWA
├── CHANGELOG.txt           # Histórico de alterações
└── package.json
```

## Configuração Google OAuth

Para habilitar o login Google:

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto ou selecione um existente
3. Ative o **Google Identity Services**
4. Crie um **OAuth 2.0 Client ID** (tipo: Web application)
5. Adicione o domínio do GitHub Pages nos Authorized JavaScript origins
6. Substitua `SEU_CLIENT_ID_AQUI` em `src/main.js`

## Licença

Desenvolvido por Luan Estifer Rodrigues Pereira (Software Engineer).
