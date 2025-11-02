# Deploy AJ STUDIOZ to GitHub & Vercel

## Step 1: Push to GitHub

### Option A: Using GitHub Desktop (EASIEST)
1. Download GitHub Desktop: https://desktop.github.com
2. Sign in with your GitHub account
3. File → Add Local Repository → Browse to `D:\.ollama\models\vercel-chatbot-groq`
4. Publish repository
5. Name it: `aj-studioz-chatbot`
6. Click "Publish Repository"

### Option B: Using Command Line
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scope: `repo` (full control)
4. Copy the token

Then run:
```powershell
cd D:\.ollama\models\vercel-chatbot-groq

# Use token for authentication
git remote set-url origin https://YOUR_TOKEN@github.com/AJ-07-14151/demo-repository.git

# Push
git push -u origin main --force
```

## Step 2: Deploy to Vercel

1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import `aj-studioz-chatbot` (or demo-repository)
5. **Add Environment Variable:**
   - Name: `AJ_API_URL`
   - Value: `https://wriest-easter-nonimitational.ngrok-free.dev`
6. Click "Deploy"

## Step 3: Test Your Chatbot

After deployment, Vercel will give you a URL like:
`https://aj-studioz-chatbot.vercel.app`

Test the API:
```bash
curl -X POST https://YOUR-APP.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello from AJ STUDIOZ!"}'
```

## What's in the Repo

```
vercel-chatbot-groq/
├── api/
│   └── chat.js          # Main API endpoint
├── package.json         # Project config
├── README.md           # Documentation
└── .gitignore          # Git ignore file
```

## Files Ready:
✅ api/chat.js - Connects to your AJ-Mini model  
✅ package.json - Vercel configuration  
✅ README.md - Documentation  
✅ .gitignore - Excludes unnecessary files  

## Important Notes

- **Keep Colab running** while testing
- **Update AJ_API_URL** in Vercel when ngrok URL changes (every 12 hours)
- **Free tier limits:**
  - Colab: 12 hours per session
  - Vercel: Unlimited deployments
  - ngrok: URL changes on restart

## Next Steps After Deployment

1. Connect a frontend (React, Next.js, etc.)
2. Add authentication
3. Add rate limiting
4. Deploy to permanent server (Oracle Cloud, etc.)

---

## Need Help?

All files are ready in: `D:\.ollama\models\vercel-chatbot-groq`

Just use GitHub Desktop to push, then deploy on Vercel!
