// Vercel Serverless Function for AJ STUDIOZ Chatbot
// Using Hugging Face Hosted API - FREE FOREVER
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
      version: '1.0',
      endpoints: {
        chat: 'POST /api/chat with {"message": "your message"}',
        backend: 'https://kamesh14151-aj-studioz-api.hf.space'
      },
      usage: 'Send POST request with JSON body: {"message": "Hello"}'
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
    // Using AJ STUDIOZ API on Hugging Face Spaces (24/7 Free)
    const AJ_API_URL = 'https://kamesh14151-aj-studioz-api.hf.space';
    
    const response = await fetch(`${AJ_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return res.status(200).json({
      reply: data.reply,
      model: data.model || 'AJ-Mini v1.0',
      provider: data.provider || 'AJ STUDIOZ'
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to get response from AJ API',
      details: error.message 
    });
  }
}
