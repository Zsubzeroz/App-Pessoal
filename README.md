# Central de Produtividade

Aplicação web SPA responsiva e moderna para organizar rotina, estudos, carreira e produtividade. Acesse de qualquer dispositivo — mobile ou desktop — sem instalar nada.

## Acesso Online

**[Central de Produtividade - GitHub Pages](https://zsubzeroz.github.io/App-Pessoal/)**

## Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| **Minha Rotina** | Saudação dinâmica, relógio, Pomodoro 25/5, progresso diário, cronograma semanal editável |
| **Plano Bíblico** | Leitura de 365 dias com checkboxes, barra de progresso |
| **Zen AI** | Chat assistente com API de IA (configurável) |
| **Ideias & Notas** | Bloco de notas com organização via IA |
| **Checklist** | Hábitos diários com reset automático + tarefas customizáveis |
| **Gestão de Vagas** | Dashboard de candidaturas com status, métricas e CRUD |
| **Currículo** | Editor live HTML/CSS com preview e impressão PDF + geração por IA |
| **Cartas de Apresentação** | CRUD de cartas para cada vaga |
| **Entrevistas** | Simulador de entrevistas com feedback por IA |
| **Portfólio de Projetos** | CRUD de projetos pessoais |
| **Pipeline Notion** | Kanban sincronizado com Notion (via API) |
| **Treinos & Medidas** | Ficha de treino + medidas corporais editáveis |
| **Cronograma Capilar** | Agenda semanal de cuidados |
| **Controle Financeiro** | Regras e dicas financeiras editáveis |

## API de IA (Obrigatória para funcionalidades de IA)

Os módulos **Zen AI**, **Análise de Vagas**, **Geração de Currículo** e **Feedback de Entrevistas** precisam de uma **API Key** para funcionar.

### Como configurar

1. Abra o módulo **Zen AI** no menu lateral
2. Clique no botão **Config** (ícone de engrenagem)
3. Cole sua **API Key** e, se necessário, altere a **Base URL**
4. Clique em **Salvar**

### Opções de API compatíveis

| Provedor | URL | Modelos | Custo |
|----------|-----|---------|-------|
| **B.AI** | https://b.ai | MiMo-V2.5, Qwen3.8-Flash, GLM-5.3-Flash | Pago |
| **OpenRouter** | https://openrouter.ai | Vários modelos (incluindo gratuitos) | Free tier |
| **Groq** | https://console.groq.com | Llama, Mixtral | Free tier rápido |
| **OpenAI** | https://platform.openai.com | GPT-4o, GPT-4o-mini | Pago |

Qualquer API compatível com o formato OpenAI Chat Completions funciona.

## Login

Login simples por nome — sem dependência de Google ou backend. Cada usuário visualiza apenas seus próprios dados (localStorage isolado por nome).

## Exportação TXT

- Botão **Exportar Dados** no menu lateral
- Modal de permissão: "Deseja salvar seus dados?"
- Se **Sim** → gera arquivo `.txt` no dispositivo (File System Access API ou download)
- Se **Não** → mantém dados apenas no navegador
- Verifica se o arquivo já existe antes de criar

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
- **Auth**: Login por nome (localStorage)
- **IA**: API compatível OpenAI (B.AI, OpenRouter, Groq, etc.)
- **Notion**: Notion API (Internal Integration)
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
├── public/
│   ├── manifest.json       # Manifest PWA
│   ├── icon-192.svg        # Ícone PWA 192x192
│   ├── icon-512.svg        # Ícone PWA 512x512
│   └── favicon.svg         # Favicon
├── src/
│   ├── auth.js             # Login/logout por nome
│   ├── storage.js          # localStorage por usuário
│   ├── utils.js            # Funções utilitárias
│   ├── services/
│   │   ├── aiService.js    # Integração com API de IA
│   │   └── fileSave.js     # Salvar dados em .txt
│   ├── views/              # 14 módulos (rotina, biblia, ia, etc.)
│   ├── main.js             # Router + fluxo de auth
│   └── style.css           # Design system global
├── index.html              # Shell HTML com login + app
├── vite.config.js          # Configuração Vite + PWA
└── package.json
```

## Licença

Desenvolvido por Luan Estifer Rodrigues Pereira (Software Engineer).
