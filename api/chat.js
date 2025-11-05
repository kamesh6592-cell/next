// Vercel Serverless Function for AJ STUDIOZ Chatbot
// Using Modal.com GPU + DeepSeek-Coder-6.7B - Professional AI
// Deploy this to Vercel

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request for health check
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      service: 'AJ STUDIOZ Chat API',
      version: '3.0',
      endpoints: {
        chat: 'POST /api/chat with {"message": "your message"}',
        backend_primary: 'Modal.com GPU (AJ-Coder v2.0 - DeepSeek-Coder-6.7B)',
        backend_fallback: 'HuggingFace Spaces (AJ-Mini v2.0 - TinyLlama)'
      },
      model: 'DeepSeek-Coder-6.7B (Flagship)',
      platform: 'Modal.com T4 GPU',
      usage: 'Send POST request with JSON body: {"message": "Hello"}',
      developed_by: 'AJ STUDIOZ'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST with {"message": "your text"}' });
  }

  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Primary API: Modal.com with DeepSeek-Coder-6.7B (Flagship)
    const PRIMARY_API = 'https://kamesh6592-cell--aj-studioz-deepseek-fastapi-app.modal.run';
    // Fallback API: HuggingFace Spaces with TinyLlama (Unlimited Backup)
    const FALLBACK_API = 'https://kamesh14151-aj-deepseek-api.hf.space';
    
    // Try primary API first (Modal GPU)
    let apiUrl = PRIMARY_API;
    let response;
    let usingFallback = false;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds
      
      response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
    } catch (primaryError) {
      console.log('Primary API (Modal) failed, trying fallback (HF Spaces)...', primaryError.message);
      usingFallback = true;
      // Try fallback API
      apiUrl = FALLBACK_API;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);
      
      response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.details || 'API request failed');
    }

    return res.status(200).json({
      reply: data.reply,
      model: data.model || 'AJ-Coder v2.0',
      developer: data.developer || 'AJ STUDIOZ',
      inference_time: data.inference_time,
      platform: data.platform || (usingFallback ? 'HuggingFace Spaces (Fallback)' : 'Modal.com GPU'),
      api_used: usingFallback ? 'fallback' : 'primary'
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to get response from AJ API',
      details: error.message,
      tip: 'API may be warming up. Please try again in a moment.',
      service: 'AJ STUDIOZ'
    });
  }
}
