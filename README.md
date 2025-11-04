# AJ STUDIOZ Chatbot API

Powered by AJ-Mini v1.0 (Llama 3.2 3B) running on Hugging Face Spaces - **FREE FOREVER**

## 🚀 Features

- ✅ **24/7 Availability** - Hosted on Hugging Face Spaces
- ✅ **No API Keys Required** - Public chat endpoint
- ✅ **No Configuration** - Works out of the box
- ✅ **Unlimited Usage** - No rate limits
- ✅ **Free Forever** - No costs
- ✅ **Fast Responses** - Powered by Llama 3.2 3B

## 🌐 Live API

**URL**: `https://api.ajstudioz.co.in/api/chat`

## 📦 Deploy to Vercel

### Quick Deploy

1. **Fork/Clone this repo**
2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import this repository
3. **Deploy!** (No environment variables needed)

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📡 API Endpoint

### POST `/api/chat`

**Request:**
```json
{
  "message": "Write a Python function to reverse a string"
}
```

**Response:**
```json
{
  "reply": "Here's a Python function to reverse a string...",
  "model": "AJ-Mini v1.0",
  "provider": "AJ STUDIOZ"
}
```

## 🧪 Test the API

### cURL
```bash
curl https://api.ajstudioz.co.in/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello AJ!"}'
```

### JavaScript
```javascript
const response = await fetch('https://api.ajstudioz.co.in/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello AJ!' })
});

const data = await response.json();
console.log(data.reply);
```

### Python
```python
import requests

response = requests.post('https://api.ajstudioz.co.in/api/chat', 
    json={'message': 'Hello AJ!'})

print(response.json()['reply'])
```

## 🔧 Backend API Details

The backend is powered by:
- **Model**: Llama 3.2 3B Instruct
- **Hosting**: Hugging Face Spaces
- **API URL**: `https://kamesh14151-aj-studioz-api.hf.space`
- **Uptime**: 24/7
- **Cost**: FREE Forever

### Direct Backend Endpoints

If you want to use the backend directly without Vercel:

```bash
# Simple chat
curl https://kamesh14151-aj-studioz-api.hf.space/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'

# Health check
curl https://kamesh14151-aj-studioz-api.hf.space/health

# OpenAI compatible
curl https://kamesh14151-aj-studioz-api.hf.space/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer aj_test123" \
  -d '{
    "model": "aj-mini",
    "messages": [{"role": "user", "content": "Hello"}]
  }'

# Anthropic Claude compatible
curl https://kamesh14151-aj-studioz-api.hf.space/v1/messages \
  -H "x-api-key: sk-ant-test123" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-sonnet-4",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

## 📊 Architecture

```
User Request
    ↓
Vercel Edge Function (api.ajstudioz.co.in)
    ↓
Hugging Face Space (kamesh14151-aj-studioz-api.hf.space)
    ↓
Llama 3.2 3B Model (Meta)
    ↓
Response to User
```

## ⚙️ Advanced Configuration

### Custom Domain (Optional)

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Add `api.ajstudioz.co.in`
5. Follow DNS configuration

### Environment Variables (Optional)

If you want to add API keys for the authenticated endpoints:

```env
# Not required for basic chat endpoint
# Only needed if using /v1/chat/completions or /v1/messages
AJ_API_KEY=aj_your_secret_key
```

## 🎯 Use Cases

- **Chatbots** - Add AI chat to your website
- **Code Generation** - Generate code snippets
- **Content Writing** - Create blog posts, articles
- **Customer Support** - Automated responses
- **Education** - AI tutor for learning
- **Development** - API integration testing

## 📝 Response Format

All responses include:
```json
{
  "reply": "AI response text",
  "model": "AJ-Mini v1.0",
  "provider": "AJ STUDIOZ"
}
```

Error responses:
```json
{
  "error": "Error message",
  "details": "Additional error details"
}
```

## 🔒 Security

- ✅ CORS enabled for all origins
- ✅ Rate limiting by Vercel
- ✅ No sensitive data stored
- ✅ Serverless architecture
- ✅ HTTPS only

## 🆘 Troubleshooting

### API returns error
- Check if Hugging Face Space is running
- Verify your message format
- Check network connectivity

### Slow responses
- First request may take 5-10 seconds (cold start)
- Subsequent requests are instant
- Normal behavior for free tier

## 📞 Support

- **Website**: https://ajstudioz.co.in
- **API Status**: https://kamesh14151-aj-studioz-api.hf.space/health
- **GitHub**: https://github.com/kamesh6592-cell

## 📜 License

MIT License - Free for personal and commercial use

---

**Built by AJ STUDIOZ** 🚀  
*Enterprise AI Solutions - Free Forever*
