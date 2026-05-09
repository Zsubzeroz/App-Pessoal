import { pipeline, env } from '@xenova/transformers';

// Skip local check to download from Hub on first run
env.allowLocalModels = false;
env.useBrowserCache = true;

let assistant = null;

// Listen for messages from the main thread
self.onmessage = async (event) => {
  const { type, text } = event.data;

  if (type === 'load') {
    try {
      self.postMessage({ type: 'status', message: 'Iniciando IA local...' });
      
      // Usando um modelo de teste ultra-leve para verificar a conexão
      assistant = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
        progress_callback: (p) => {
          self.postMessage({ type: 'progress', data: p });
        }
      });
      
      self.postMessage({ type: 'ready' });
    } catch (error) {
      self.postMessage({ type: 'error', error: error.message });
    }
  }

  if (type === 'chat' && assistant) {
    try {
      const output = await assistant(text, {
        max_new_tokens: 100,
        temperature: 0.7,
        repetition_penalty: 1.2,
      });
      
      self.postMessage({ type: 'response', text: output[0].generated_text });
    } catch (error) {
      self.postMessage({ type: 'error', error: error.message });
    }
  }
};
