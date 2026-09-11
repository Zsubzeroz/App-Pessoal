const BAI_BASE = 'https://api.b.ai/v1';
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const AI_CONFIG_KEY = 'zen-ai-config';

function getConfig() {
  try { return JSON.parse(localStorage.getItem(AI_CONFIG_KEY) || '{}'); } catch { return {}; }
}

function saveConfig(cfg) {
  localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(cfg));
}

function getApiKey() {
  return getConfig().apiKey || import.meta.env.VITE_BAI_API_KEY || '';
}

function getApiBase() {
  return getConfig().apiBase || BAI_BASE;
}

function getSelectedModel() {
  return getConfig().model || 'MiMo-V2.5';
}

function getProvider() {
  return getConfig().provider || 'bai';
}

export const PROVIDERS = {
  bai: { name: 'B.AI (OpenAI compatível)', base: 'https://api.b.ai/v1' },
  gemini: { name: 'Google Gemini', base: 'https://generativelanguage.googleapis.com/v1beta' },
  openrouter: { name: 'OpenRouter', base: 'https://openrouter.ai/api/v1' },
  groq: { name: 'Groq', base: 'https://api.groq.com/openai/v1' },
  openai: { name: 'OpenAI', base: 'https://api.openai.com/v1' },
};

export const MODELS = [
  { id: 'MiMo-V2.5', name: 'MiMo-V2.5', provider: 'Xiaomi', cost: 'Grátis', group: 'bai' },
  { id: 'GLM-5.3-Flash', name: 'GLM-5.3-Flash', provider: 'Z.ai', cost: 'Grátis', group: 'bai' },
  { id: 'Qwen3.8-Flash', name: 'Qwen3.8-Flash', provider: 'Alibaba', cost: 'Grátis', group: 'bai' },
  { id: 'Hunyuan-Hy3', name: 'Hunyuan Hy3', provider: 'Tencent', cost: 'Grátis', group: 'bai' },
  { id: 'DeepSeek-V4.1-Flash', name: 'DeepSeek V4.1 Flash', provider: 'DeepSeek', cost: '$0.15/M', group: 'bai' },
  { id: 'MiMo-V2.5-Pro', name: 'MiMo-V2.5 Pro', provider: 'Xiaomi', cost: '$0.43/M', group: 'bai' },
  { id: 'GLM-5.3', name: 'GLM-5.3', provider: 'Z.ai', cost: '$1.40/M', group: 'bai' },
  { id: 'Qwen3.8-27B', name: 'Qwen3.8-27B', provider: 'Alibaba', cost: '$0.22/M', group: 'bai' },
  { id: 'DeepSeek-V4-Pro', name: 'DeepSeek V4 Pro', provider: 'DeepSeek', cost: '$1.32/M', group: 'bai' },

  { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', provider: 'Google', cost: 'Grátis', group: 'gemini' },
  { id: 'gemini-3-flash', name: 'Gemini 3 Flash', provider: 'Google', cost: '$0.50/M', group: 'gemini' },
  { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash', provider: 'Google', cost: '$1.50/M', group: 'gemini' },
  { id: 'gemini-3.1-pro', name: 'Gemini 3.1 Pro', provider: 'Google', cost: '$2.00/M', group: 'gemini' },

  { id: 'GPT-5-nano', name: 'GPT-5 nano', provider: 'OpenAI', cost: '$0.05/M', group: 'openai' },
  { id: 'GPT-5.4-mini', name: 'GPT-5.4 mini', provider: 'OpenAI', cost: '$0.75/M', group: 'openai' },
  { id: 'GPT-5.4', name: 'GPT-5.4', provider: 'OpenAI', cost: '$2.50/M', group: 'openai' },
  { id: 'gpt-4o-mini', name: 'GPT-4o mini', provider: 'OpenAI', cost: '$0.15/M', group: 'openai' },

  { id: 'claude-haiku-4.5', name: 'Claude Haiku 4.5', provider: 'Anthropic', cost: '$1.00/M', group: 'openrouter' },
  { id: 'claude-sonnet-4.5', name: 'Claude Sonnet 4.5', provider: 'Anthropic', cost: '$3.00/M', group: 'openrouter' },
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', provider: 'Meta', cost: 'Grátis', group: 'groq' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', provider: 'Mistral', cost: 'Grátis', group: 'groq' },
];

const SYSTEM_PROMPT_DEFAULT = `Você é a Zen AI, uma assistente virtual inteligente focada em produtividade, carreira e engenharia de software. Responda sempre em Português do Brasil, de forma clara, objetiva e profissional. Use Markdown quando apropriado.`;

async function callGemini(messages, model, temperature = 0.7, maxTokens = 2048) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key não configurada.');

  const contents = messages.filter(m => m.role !== 'system').map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const systemInstruction = messages.find(m => m.role === 'system');

  const body = {
    contents,
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
    }
  };

  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction.content }] };
  }

  const res = await fetch(
    `${GEMINI_BASE}/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error: ${res.status} - ${err}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callOpenAICompat(messages, model, temperature = 0.7, maxTokens = 2048) {
  const apiKey = getApiKey();
  const apiBase = getApiBase();
  if (!apiKey) throw new Error('API key não configurada.');

  const res = await fetch(`${apiBase}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model, messages, temperature, max_tokens: maxTokens })
  });

  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

async function callAI(messages, model, temperature = 0.7, maxTokens = 2048) {
  const provider = getProvider();
  if (provider === 'gemini') {
    return await callGemini(messages, model, temperature, maxTokens);
  }
  return await callOpenAICompat(messages, model, temperature, maxTokens);
}

export function hasAIConfig() {
  return !!getApiKey();
}

export function getAIConfig() {
  return getConfig();
}

export function saveAIConfig(cfg) {
  saveConfig(cfg);
}

export function clearAIConfig() {
  localStorage.removeItem(AI_CONFIG_KEY);
}

export async function chat(userMessage, history = [], systemPrompt = SYSTEM_PROMPT_DEFAULT) {
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage }
  ];

  const model = getSelectedModel();
  const response = await callAI(messages, model);
  return { response, model };
}

export async function analyzeJob(vaga, dossie) {
  const systemPrompt = `Você é um analista de carreira especialista. Analise a vaga e retorne um JSON:
{ "fitScore": 0-100, "pontosFortes": [], "pontosAtencao": [], "sugestaoAbordagem": "texto", "resumoFit": "resumo" }
Retorne APENAS o JSON, sem markdown.`;

  const userMsg = `VAGA: ${vaga.empresa} - ${vaga.cargo} (${vaga.modelo})\nLink: ${vaga.link || 'N/A'}\n\nPERFIL:\n${dossie}`;
  const messages = [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMsg }];

  const model = getSelectedModel();
  const raw = await callAI(messages, model, 0.3, 1024);
  return JSON.parse(raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
}

export async function generateCV(vaga, dossie) {
  const systemPrompt = `Você é especialista em currículos. Gere um currículo HTML+CSS profissional para A4, fundo branco, texto escuro, acentos #0ea5e9. CSS inline. Retorne APENAS o HTML completo.`;

  const userMsg = `VAGA: ${vaga.empresa} - ${vaga.cargo}\n\nPERFIL:\n${dossie}`;
  const messages = [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMsg }];

  const model = getSelectedModel();
  const html = await callAI(messages, model, 0.5, 4096);
  return html.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();
}

export async function interviewFeedback(pergunta, resposta) {
  const systemPrompt = `Você é um entrevistador técnico. Analise a resposta e retorne um JSON:
{ "nota": 1-10, "pontosFortes": [], "melhorias": [], "respostaModelo": "versão melhorada" }
Retorne APENAS o JSON, sem markdown.`;

  const userMsg = `PERGUNTA: ${pergunta}\nRESPOSTA: ${resposta}`;
  const messages = [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMsg }];

  const model = getSelectedModel();
  const raw = await callAI(messages, model, 0.3, 1024);
  return JSON.parse(raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
}
