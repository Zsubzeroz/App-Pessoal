import { pipeline, env } from '@huggingface/transformers';

// Configurações para ambiente Electron/Browser
env.allowLocalModels = false;
env.useBrowserCache = true;

let assistant = null;

self.onmessage = async (event) => {
  const { type, text } = event.data;

  if (type === 'load') {
    try {
      self.postMessage({ type: 'status', message: 'Conectando ao cérebro da IA...' });
      
      // Usando o Qwen 0.5B: um modelo que realmente entende Português e conversa de verdade
      assistant = await pipeline('text-generation', 'Xenova/Qwen1.5-0.5B-Chat', {
        device: 'wasm', // Usa o processador para compatibilidade máxima em qualquer PC
        dtype: 'q4', // Especifica o arquivo exato (model_q4.onnx) disponível no servidor
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
        { role: 'system', content: 'Você é a Zen AI, uma assistente virtual inteligente e prestativa integrada à Central Luan. Você fala Português do Brasil fluentemente e responde de forma clara e direta.' },
        { role: 'user', content: text }
      ];
      
      // Passamos o array de mensagens diretamente para a v3 da biblioteca
      // Ela cuida do template e retorna apenas a nova mensagem
      const output = await assistant(messages, {
        max_new_tokens: 400,
        temperature: 0.7,
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
