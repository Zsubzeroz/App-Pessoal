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
      
      // O apply_chat_template aplica o formato correto automaticamente
      const textToGenerate = assistant.tokenizer.apply_chat_template(messages, { tokenize: false, add_generation_prompt: true });

      const output = await assistant(textToGenerate, {
        max_new_tokens: 250,
        temperature: 0.7,
        repetition_penalty: 1.1,
        do_sample: true,
      });
      
      // O modelo retorna o prompt inteiro + a resposta, então precisamos extrair só a resposta nova
      const generatedText = output[0].generated_text;
      const responseOnly = generatedText.replace(textToGenerate, '').trim();
      
      self.postMessage({ type: 'response', text: responseOnly });
    } catch (error) {
      self.postMessage({ type: 'error', error: error.message });
    }
  }
};
