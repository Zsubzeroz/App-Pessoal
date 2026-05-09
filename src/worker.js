import { pipeline, env } from '@xenova/transformers';

// Skip local check to download from Hub on first run
env.allowLocalModels = false;
env.useBrowserCache = true;
env.remoteHost = 'https://hf-mirror.com';

let assistant = null;

// Listen for messages from the main thread
self.onmessage = async (event) => {
  const { type, text } = event.data;

  if (type === 'load') {
    try {
      self.postMessage({ type: 'status', message: 'Iniciando IA local...' });
      
      // Using a very small and fast model: LaMini-Flan-T5-78M
      assistant = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-78M', {
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
