const BAI_BASE = 'https://api.b.ai/v1';
const API_KEY = import.meta.env.VITE_BAI_API_KEY;

const MODELS = [
  'MiMo-V2.5',
  'Qwen3.8-Flash',
  'GLM-5.3-Flash'
];

const SYSTEM_PROMPT_DEFAULT = `Você é a Zen AI, uma assistente virtual inteligente focada em produtividade, carreira e engenharia de software. Responda sempre em Português do Brasil, de forma clara, objetiva e profissional. Use Markdown quando apropriado.`;

async function callBAI(messages, model = MODELS[0], temperature = 0.7, maxTokens = 2048) {
  const res = await fetch(`${BAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens
    })
  });

  if (!res.ok) {
    throw new Error(`BAI API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

export async function chat(userMessage, history = [], systemPrompt = SYSTEM_PROMPT_DEFAULT) {
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage }
  ];

  for (const model of MODELS) {
    try {
      const response = await callBAI(messages, model);
      return { response, model };
    } catch (err) {
      console.warn(`Model ${model} failed:`, err.message);
      continue;
    }
  }

  throw new Error('Todos os modelos falharam. Tente novamente mais tarde.');
}

export async function analyzeJob(vaga, dossie) {
  const systemPrompt = `Você é um analista de carreira especialista. Analise a vaga abaixo considerando o perfil do candidato e retorne um JSON com:
{
  "fitScore": número de 0 a 100,
  "pontosFortes": ["ponto 1", "ponto 2"],
  "pontosAtencao": ["atenção 1"],
  "sugestaoAbordagem": "texto curto com dica de como se candidatar",
  "resumoFit": "resumo de 1-2 frases do fit"
}
Retorne APENAS o JSON, sem markdown.`;

  const userMsg = `VAGA:
Empresa: ${vaga.empresa}
Cargo: ${vaga.cargo}
Modelo: ${vaga.modelo}
Link: ${vaga.link || 'Não informado'}

PERFIL DO CANDIDATO:
${dossie}`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMsg }
  ];

  for (const model of MODELS) {
    try {
      const raw = await callBAI(messages, model, 0.3, 1024);
      const jsonStr = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(jsonStr);
    } catch (err) {
      console.warn(`Model ${model} failed for job analysis:`, err.message);
      continue;
    }
  }

  throw new Error('Não foi possível analisar a vaga.');
}

export async function generateCV(vaga, dossie) {
  const systemPrompt = `Você é um especialista em recrutamento e criação de currículos profissionais.
Gere um currículo em HTML + CSS para o candidato, direcionado para a vaga descrita.
O HTML deve ser semântico, profissional, e caber em uma página A4.
Use a paleta: fundo branco, texto escuro, acentos em #0ea5e9.
O CSS deve ser inline no <style>.
Retorne APENAS o bloco HTML completo (com <!DOCTYPE html>), sem markdown.`;

  const userMsg = `VAGA:
Empresa: ${vaga.empresa}
Cargo: ${vaga.cargo}

PERFIL DO CANDIDATO:
${dossie}

Gere o currículo direcionado para esta vaga.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMsg }
  ];

  for (const model of MODELS) {
    try {
      const html = await callBAI(messages, model, 0.5, 4096);
      return html.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();
    } catch (err) {
      console.warn(`Model ${model} failed for CV generation:`, err.message);
      continue;
    }
  }

  throw new Error('Não foi possível gerar o currículo.');
}

export async function interviewFeedback(pergunta, resposta) {
  const systemPrompt = `Você é um entrevistador técnico experiente. Analise a resposta do candidato e retorne um JSON:
{
  "nota": número de 1 a 10,
  "pontosFortes": ["ponto 1"],
  "melhorias": ["melhoria 1"],
  "respostaModelo": "uma versão melhorada da resposta em 2-3 parágrafos"
}
Retorne APENAS o JSON, sem markdown.`;

  const userMsg = `PERGUNTA: ${pergunta}

RESPOSTA DO CANDIDATO: ${resposta}

Analise e dê seu feedback.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMsg }
  ];

  for (const model of MODELS) {
    try {
      const raw = await callBAI(messages, model, 0.3, 1024);
      const jsonStr = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(jsonStr);
    } catch (err) {
      console.warn(`Model ${model} failed for interview feedback:`, err.message);
      continue;
    }
  }

  throw new Error('Não foi possível gerar o feedback.');
}
