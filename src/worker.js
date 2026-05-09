// Worker para conexão com Ollama (Motor de IA Nativo)
const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL_NAME = 'llama3.2'; // O modelo mais moderno e rápido da Meta para rodar localmente

self.onmessage = async (event) => {
  const { type, text } = event.data;

  if (type === 'load') {
    self.postMessage({ type: 'status', message: 'Buscando motor de IA nativo na máquina...' });
    try {
      // Faz um "ping" silencioso para ver se o Ollama está rodando no background
      const res = await fetch('http://localhost:11434/');
      if (res.ok) {
        self.postMessage({ type: 'ready' });
      } else {
        throw new Error('Serviço indisponível');
      }
    } catch (e) {
      // Se der erro de fetch, o Ollama não está instalado/rodando
      self.postMessage({ type: 'ollama_missing' });
    }
  }

  if (type === 'chat') {
    try {
      // Dispara a pergunta para o motor nativo (usa 100% da velocidade real do PC)
      const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL_NAME,
          prompt: text,
          system: 'Você é a Zen AI, uma assistente virtual focada em produtividade e Engenharia de Software. Responda sempre em Português do Brasil, de forma clara e profissional.',
          stream: false // Pede a resposta de uma vez (instantâneo para modelos rápidos)
        })
      });

      if (!response.ok) {
        if (response.status === 404) {
             throw new Error(`Modelo não baixado. Abra o terminal e rode:\nollama run ${MODEL_NAME}`);
        }
        throw new Error(`Erro interno do Ollama (${response.status})`);
      }

      const data = await response.json();
      self.postMessage({ type: 'response', text: data.response });

    } catch (error) {
      console.error("Erro na conexão com IA Nativa:", error);
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        self.postMessage({ type: 'ollama_missing' });
      } else {
        self.postMessage({ type: 'error', error: error.message });
      }
    }
  }
};

