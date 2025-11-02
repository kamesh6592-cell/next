# AJ STUDIOZ Chatbot

Powered by custom AJ-Mini model running on Google Colab.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import to Vercel
3. Add environment variable:
   - `AJ_API_URL` = `https://wriest-easter-nonimitational.ngrok-free.dev`
4. Deploy!

## API Endpoint

`POST /api/chat`

```json
{
  "message": "Hello!"
}
```

Response:
```json
{
  "reply": "Hello! How can I assist you today?",
  "model": "AJ-Mini v1.0",
  "provider": "AJ STUDIOZ"
}
```

## Note

Keep Google Colab notebook running for the API to work.
Update `AJ_API_URL` when ngrok URL changes.
