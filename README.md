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
| **Meu Perfil** | Dados profissionais para funcionalidades de IA |

## API de IA (Obrigatória para funcionalidades de IA)

Os módulos **Zen AI**, **Análise de Vagas**, **Geração de Currículo** e **Feedback de Entrevistas** precisam de uma **API Key** para funcionar.

### Como configurar

1. Abra o módulo **Zen AI** no menu lateral
2. Clique no botão **Config** (ícone de engrenagem)
3. Escolha o **Provedor**, cole sua **API Key** e selecione o **Modelo**
4. Clique em **Salvar**

### Provedores suportados

| Provedor | Modelos Grátis | URL |
|----------|---------------|-----|
| **B.AI** | MiMo-V2.5, GLM-5.3-Flash, Qwen3.8-Flash | https://b.ai |
| **Google Gemini** | Gemini 3.8 Flash | https://aistudio.google.com |
| **Groq** | Llama 3.3 70B, Mixtral 8x7B | https://console.groq.com |
| **OpenRouter** | Vários modelos gratuitos | https://openrouter.ai |
| **OpenAI** | GPT-5 nano, GPT-5.4 mini | https://platform.openai.com |

## Segurança & LGPD

**Este projeto NÃO coleta, envia ou armazena dados pessoais em servidores externos.**

- Todos os dados ficam **exclusivamente no navegador do usuário** (localStorage)
- Nenhum dado pessoal é enviado para o GitHub ou qualquer outro servidor
- As API Keys ficam salvas apenas no navegador do usuário
- O código fonte é público, mas **não contém dados de usuários**
- Cada usuário começa com dados zerados — preenche apenas o que quiser
- O módulo "Meu Perfil" permite configurar dados profissionais para uso local nas funcionalidades de IA

### Dados salvos localmente (localStorage)

| Dado | Onde |
|------|------|
| Nome de usuário | Login (localStorage) |
| Perfil profissional | Módulo "Meu Perfil" |
| Rotina, checklist, notas | Respectivos módulos |
| API Keys (IA, Notion) | Configurações de cada módulo |
| Candidaturas, vagas | Módulos Vagas/Notion |

## Login

Login por nome — sem dependência de Google ou backend. Cada usuário visualiza apenas seus próprios dados (localStorage isolado por nome).

## Exportação TXT

- Botão **Exportar Dados** no menu lateral
- Modal de permissão: "Deseja salvar seus dados?"
- Se **Sim** → gera arquivo `.txt` no dispositivo
- Se **Não** → mantém dados apenas no navegador

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
- **IA**: API compatível OpenAI + Google Gemini
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
│   │   ├── fileSave.js     # Salvar dados em .txt
│   │   └── profileService.js # Perfil profissional
│   ├── views/              # 15 módulos
│   ├── main.js             # Router + fluxo de auth
│   └── style.css           # Design system global
├── index.html              # Shell HTML com login + app
├── vite.config.js          # Configuração Vite + PWA
└── package.json
```

## Direitos Autorais

Copyright © 2026 Luan Estifer Rodrigues Pereira. Todos os direitos reservados.

Este software é protegido pela lei de direitos autorais. É proibida a reprodução, distribuição ou modificação total ou parcial sem autorização prévia do autor.

## Licença

Uso pessoal e educacional. Para uso comercial, entre em contato com o autor.
