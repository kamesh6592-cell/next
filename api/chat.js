// Vercel Serverless Function for Chatbot using Groq (FREE)
// Deploy this to Vercel

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Using AJ STUDIOZ API (Your own Ollama on Google Colab)
    const AJ_API_URL = process.env.AJ_API_URL; // Add your ngrok URL in Vercel env vars
    
    if (!AJ_API_URL) {
      return res.status(500).json({ error: 'AJ_API_URL not configured. Add your ngrok URL to Vercel environment variables.' });
    }

    const response = await fetch(`${AJ_API_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify({
        model: 'aj-mini',
        prompt: message,
        stream: false
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed');
    }

    return res.status(200).json({
      reply: data.response,
      model: 'AJ-Mini v1.0',
      provider: 'AJ STUDIOZ'
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to get response',
      details: error.message 
    });
  }
}
