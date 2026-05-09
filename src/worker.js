import { pipeline, env } from '@huggingface/transformers';

// Configurações para ambiente Electron/Browser
env.allowLocalModels = false;
env.useBrowserCache = true;
// Configurar WASM para usar múltiplos núcleos do processador (Deixa a IA mais rápida na CPU)
env.backends.onnx.wasm.numThreads = 4;

let assistant = null;

self.onmessage = async (event) => {
  const { type, text } = event.data;

  if (type === 'load') {
    try {
      self.postMessage({ type: 'status', message: 'Conectando ao cérebro da IA...' });
      
      // Usando o Qwen 0.5B de forma 100% segura no Processador (WASM Turbo)
      assistant = await pipeline('text-generation', 'Xenova/Qwen1.5-0.5B-Chat', {
        device: 'wasm', 
        dtype: 'q4',
        progress_callback: (p) => {
          self.postMessage({ type: 'progress', data: p });
        }
      });
      
      self.postMessage({ type: 'ready' });
    } catch (error) {
      console.error("Erro no load:", error);
      self.postMessage({ type: 'error', error: error.message });
    }
  }

  if (type === 'chat' && assistant) {
    try {
      // Formata a mensagem no padrão de chat do Qwen
      const messages = [
        { role: 'system', content: 'Você é a Zen AI, uma assistente virtual focada em produtividade e Engenharia de Software. Responda APENAS em Português do Brasil. NUNCA use palavras em outros idiomas ou caracteres chineses. Seja direta e didática.' },
        { role: 'user', content: text }
      ];
      
      // Passamos o array de mensagens diretamente para a v3 da biblioteca
      // Ela cuida do template e retorna apenas a nova mensagem
      const output = await assistant(messages, {
        max_new_tokens: 400,
        temperature: 0.3, // Temperatura baixa deixa a IA focada e impede alucinações (como falar chinês)
        repetition_penalty: 1.1,
        do_sample: true,
      });
      
      // Extrai apenas a resposta gerada (no v3 com array, ele já filtra o histórico)
      let generatedText = output[0].generated_text;
      
      // Fallback de segurança caso a biblioteca retorne em formato de array de mensagens
      if (Array.isArray(generatedText)) {
        generatedText = generatedText[generatedText.length - 1].content;
      }
      
      self.postMessage({ type: 'response', text: generatedText.trim() });
    } catch (error) {
      self.postMessage({ type: 'error', error: error.message });
    }
  }
};
