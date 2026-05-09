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
      
      // Usando um modelo testado e verificado que sabemos que existe no Hugging Face
      assistant = await pipeline('text2text-generation', 'Xenova/flan-t5-small', {
        device: 'wasm', // Usa o processador para compatibilidade máxima em qualquer PC
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
      // Adiciona uma instrução para ajudar o modelo a focar na resposta em Português
      const prompt = `Responda de forma curta e clara em Português: ${text}`;
      
      const output = await assistant(prompt, {
        max_new_tokens: 150,
        temperature: 0.7,
        repetition_penalty: 1.5, // Impede o modelo de repetir "nie nie nie"
        no_repeat_ngram_size: 2, // Impede repetição de sílabas ("e o e o")
        do_sample: true,
      });
      
      self.postMessage({ type: 'response', text: output[0].generated_text });
    } catch (error) {
      self.postMessage({ type: 'error', error: error.message });
    }
  }
};
