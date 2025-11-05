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

    // Primary API: Modal.com with DeepSeek-Coder-6.7B
    const MODAL_API = 'https://kamesh6592-cell--aj-studioz-deepseek-fastapi-app.modal.run';
    
    // Forward to Modal API with OpenAI format
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 seconds
    
    const response = await fetch(`${MODAL_API}/v1/chat/completions`, {
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
      const errorData = await response.json();
      return res.status(response.status).json({
        error: {
          message: errorData.error || 'API request failed',
          type: 'api_error',
          code: 'backend_error'
        }
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
