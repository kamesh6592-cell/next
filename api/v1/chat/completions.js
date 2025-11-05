// OpenAI-Compatible Chat Completions Endpoint
// AJ STUDIOZ API - v2.0.0
// Endpoint: /v1/chat/completions

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Request-ID');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: {
        message: 'Method not allowed. Use POST.',
        type: 'invalid_request_error',
        code: 'method_not_allowed'
      }
    });
  }

  try {
    const { model, messages, max_tokens, temperature, stream } = req.body;
    
    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: {
          message: 'messages field is required and must be an array',
          type: 'invalid_request_error',
          code: 'invalid_messages'
        }
      });
    }

    // Primary API: Modal.com with DeepSeek-Coder-6.7B (Fast, Professional)
    const MODAL_API = 'https://kamesh6592-cell--aj-studioz-deepseek-fastapi-app.modal.run';
    // Fallback API: HuggingFace Space with TinyLlama (Unlimited, Free)
    const FALLBACK_API = 'https://kamesh14151-aj-deepseek-api.hf.space';
    
    // Check if user explicitly requested AJ-Mini model
    const requestedModel = model || 'aj-coder-v2';
    const forceAJMini = requestedModel.toLowerCase().includes('aj-mini') || requestedModel.toLowerCase().includes('mini');
    
    let response;
    let usingFallback = false;
    
    // If AJ-Mini explicitly requested, use HuggingFace directly
    if (forceAJMini) {
      console.log('AJ-Mini model requested, using HuggingFace Space...');
      usingFallback = true;
      
      const lastMessage = messages[messages.length - 1];
      const userMessage = lastMessage.content;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 120 seconds
      
      response = await fetch(`${FALLBACK_API}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'aj-mini',
          messages,
          max_tokens: max_tokens || 512,
          temperature: temperature || 0.7,
          stream: stream || false
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
    } else {
      // Use Modal API for AJ-Coder (Primary)
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 seconds
        
        response = await fetch(`${MODAL_API}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: model || 'aj-coder-v2',
            messages,
            max_tokens: max_tokens || 512,
            temperature: temperature || 0.7,
            stream: stream || false
          }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error('Modal API failed');
        }
      } catch (primaryError) {
        console.log('Primary API (Modal) failed, switching to fallback (HuggingFace)...', primaryError.message);
        usingFallback = true;
        
        // Extract last user message for fallback
        const lastMessage = messages[messages.length - 1];
        const userMessage = lastMessage.content;
        
        // Try HuggingFace Space fallback (Unlimited)
        const fallbackController = new AbortController();
        const fallbackTimeoutId = setTimeout(() => fallbackController.abort(), 120000); // 120 seconds
        
        response = await fetch(`${FALLBACK_API}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
          signal: fallbackController.signal
        });
        
        clearTimeout(fallbackTimeoutId);
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({
        error: {
          message: errorData.error || 'API request failed',
          type: 'api_error',
          code: 'backend_error'
        }
      });
    }

    // Handle fallback response format conversion
    if (usingFallback) {
      const fallbackData = await response.json();
      
      // Convert HuggingFace format to OpenAI format
      return res.status(200).json({
        id: `chatcmpl-${Date.now()}`,
        object: 'chat.completion',
        created: Math.floor(Date.now() / 1000),
        model: 'aj-mini-fallback',
        choices: [{
          index: 0,
          message: {
            role: 'assistant',
            content: fallbackData.reply || fallbackData.response || 'No response from fallback'
          },
          finish_reason: 'stop'
        }],
        usage: {
          prompt_tokens: messages.reduce((acc, m) => acc + m.content.length / 4, 0),
          completion_tokens: (fallbackData.reply || '').length / 4,
          total_tokens: messages.reduce((acc, m) => acc + m.content.length / 4, 0) + (fallbackData.reply || '').length / 4
        },
        provider: 'AJ STUDIOZ',
        backend: 'HuggingFace Space (Fallback - Unlimited)',
        model_details: {
          name: 'AJ-Mini v1.0 (Backup)',
          base_model: 'TinyLlama-1.1B',
          developer: 'AJ STUDIOZ',
          company: 'AJ STUDIOZ Technologies'
        },
        note: 'Using fallback server (unlimited, free forever)'
      });
    }

    const data = await response.json();
    
    // Return OpenAI-compatible response
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: {
        message: error.message || 'Internal server error',
        type: 'api_error',
        code: 'internal_error'
      }
    });
  }
}
