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
      
      // Usando o modelo da comunidade ONNX, que é mais compatível com a v3
      assistant = await pipeline('text2text-generation', 'onnx-community/LaMini-Flan-T5-78M', {
        device: 'webgpu', // Tenta usar a placa de vídeo se disponível
        progress_callback: (p) => {
          self.postMessage({ type: 'progress', data: p });
        }
      });
      
      self.postMessage({ type: 'ready' });
    } catch (error) {
      console.error("Erro no load:", error);
      // Fallback para CPU se o WebGPU falhar
      try {
        assistant = await pipeline('text2text-generation', 'onnx-community/LaMini-Flan-T5-78M', {
          device: 'wasm',
          progress_callback: (p) => {
            self.postMessage({ type: 'progress', data: p });
          }
        });
        self.postMessage({ type: 'ready' });
      } catch (innerError) {
        self.postMessage({ type: 'error', error: innerError.message });
      }
    }
  }

  if (type === 'chat' && assistant) {
    try {
      const output = await assistant(text, {
        max_new_tokens: 100,
        temperature: 0.7,
      });
      
      self.postMessage({ type: 'response', text: output[0].generated_text });
    } catch (error) {
      self.postMessage({ type: 'error', error: error.message });
    }
  }
};
