// Vercel Serverless Function for AJ STUDIOZ Chatbot
// Using self-hosted APIs on HuggingFace Spaces - FREE FOREVER
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
      version: '2.0',
      endpoints: {
        chat: 'POST /api/chat with {"message": "your message"}',
        backend_general: 'https://kamesh14151-aj-studioz-api.hf.space (AJ-Mini v2.0 - Phi-2)',
        backend_coder: 'https://kamesh14151-aj-deepseek-api.hf.space (AJ-Coder v1.0 - Qwen2.5)'
      },
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
    // Primary API: AJ-Mini (General AI)
    const PRIMARY_API = 'https://kamesh14151-aj-studioz-api.hf.space';
    // Fallback API: AJ-Coder (Coding AI)
    const FALLBACK_API = 'https://kamesh14151-aj-deepseek-api.hf.space';
    
    // Try primary API first
    let apiUrl = PRIMARY_API;
    let response;
    
    try {
      response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
        timeout: 60000 // 60 seconds timeout
      });
    } catch (primaryError) {
      console.log('Primary API failed, trying fallback...', primaryError.message);
      // Try fallback API
      apiUrl = FALLBACK_API;
      response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
        timeout: 60000
      });
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.details || 'API request failed');
    }

    return res.status(200).json({
      reply: data.reply,
      model: data.model || 'AJ STUDIOZ AI',
      provider: 'AJ STUDIOZ',
      api_used: apiUrl
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to get response from AJ STUDIOZ APIs',
      details: error.message,
      tip: 'APIs may be warming up. Please try again in a moment.'
    });
  }
}
