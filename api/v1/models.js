// OpenAI-Compatible Models List Endpoint
// AJ STUDIOZ API - v2.0.0
// Endpoint: /v1/models

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: {
        message: 'Method not allowed. Use GET.',
        type: 'invalid_request_error',
        code: 'method_not_allowed'
      }
    });
  }

  try {
    // Primary API: Modal.com
    const MODAL_API = 'https://kamesh6592-cell--aj-studioz-deepseek-fastapi-app.modal.run';
    
    const response = await fetch(`${MODAL_API}/v1/models`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch models from backend');
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error:', error);
    
    // Fallback response if backend is down
    return res.status(200).json({
      object: 'list',
      data: [
        {
          id: 'aj-coder-v2',
          object: 'model',
          created: 1730793600,
          owned_by: 'aj-studioz',
          permission: [],
          root: 'aj-coder-v2',
          parent: null
        }
      ],
      service: 'AJ STUDIOZ AI API',
      status: 'operational',
      provider: 'AJ STUDIOZ Technologies'
    });
  }
}
