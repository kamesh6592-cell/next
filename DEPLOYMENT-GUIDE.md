# Deploy AJ STUDIOZ API to GitHub & Vercel

## ✅ UPDATED: Now using Hugging Face (No Colab needed!)

Your API is now hosted 24/7 on Hugging Face Spaces - **NO configuration required!**

---

## Step 1: Push to GitHub

### Option A: Using GitHub Desktop (EASIEST)
1. Download GitHub Desktop: https://desktop.github.com
2. Sign in with your GitHub account
3. File → Add Local Repository → Browse to this folder
4. Publish repository
5. Name it: `aj-studioz-api-vercel`
6. Click "Publish Repository"

### Option B: Using Command Line
```powershell
cd "D:\New folder (2)\aj-frontend"

# Initialize if needed
git init

# Add your GitHub remote
git remote add origin https://github.com/kamesh6592-cell/next.git

# Commit changes
git add .
git commit -m "Updated to use Hugging Face API"

# Push
git push -u origin main --force
```

---

## Step 2: Deploy to Vercel

1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import `next` repository
5. **NO Environment Variables Needed!** (Everything works out of the box)
6. Click "Deploy"

---

## Step 3: Configure Custom Domain (Optional)

### Add `api.ajstudioz.co.in` to Vercel

1. In Vercel Dashboard, go to your project
2. Settings → Domains
3. Add domain: `api.ajstudioz.co.in`
4. Vercel will give you DNS records

### Update DNS (Your Domain Provider)

Add these records to `ajstudioz.co.in`:

**For Cloudflare, GoDaddy, Namecheap, etc:**

| Type  | Name | Value                          | TTL  |
|-------|------|--------------------------------|------|
| CNAME | api  | cname.vercel-dns.com          | Auto |

Or if CNAME doesn't work:

| Type | Name | Value          | TTL  |
|------|------|----------------|------|
| A    | api  | 76.76.21.21   | Auto |

Wait 5-10 minutes for DNS propagation.

---

## Step 4: Test Your API

### Test on Vercel URL
```bash
curl https://YOUR-APP.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello AJ!"}'
```

### Test on Custom Domain
```bash
curl https://api.ajstudioz.co.in/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Write a Python function"}'
```

---

## What's in the Repo

```
aj-frontend/
├── api/
│   └── chat.js          # Vercel serverless function
├── package.json         # Vercel configuration
├── README.md           # Full documentation
├── DEPLOYMENT-GUIDE.md # This file
└── .gitignore          # Git ignore file
```

---

## How It Works

```
User → api.ajstudioz.co.in (Vercel)
         ↓
    Calls Hugging Face API
         ↓
    kamesh14151-aj-studioz-api.hf.space
         ↓
    Llama 3.2 3B Model
         ↓
    Response → User
```

---

## Advantages Over Previous Setup

### Before (Colab + ngrok)
❌ Need to keep Colab running  
❌ URL changes every 12 hours  
❌ Manual updates required  
❌ Unreliable uptime  

### Now (Hugging Face + Vercel)
✅ **24/7 automatic uptime**  
✅ **Permanent URLs**  
✅ **No configuration**  
✅ **Free forever**  
✅ **Professional setup**  

---

## Backend Details

Your backend API is already deployed on:
- **URL**: https://kamesh14151-aj-studioz-api.hf.space
- **Status**: https://kamesh14151-aj-studioz-api.hf.space/health
- **Model**: Llama 3.2 3B Instruct
- **Hosting**: Hugging Face Spaces (Free)
- **Uptime**: 24/7

---

## API Endpoints Available

### Via Vercel (Recommended)
- `POST https://api.ajstudioz.co.in/api/chat`

### Direct (Backend)
- `POST https://kamesh14151-aj-studioz-api.hf.space/chat`
- `POST https://kamesh14151-aj-studioz-api.hf.space/v1/chat/completions` (OpenAI format)
- `POST https://kamesh14151-aj-studioz-api.hf.space/v1/messages` (Claude format)
- `GET  https://kamesh14151-aj-studioz-api.hf.space/health`

---

## Troubleshooting

### Vercel Deployment Failed
- Make sure `package.json` exists
- Check `api/chat.js` is in correct folder
- Try redeploying

### API Returns 500 Error
- Check backend health: `curl https://kamesh14151-aj-studioz-api.hf.space/health`
- Wait 30 seconds and try again (cold start)

### Custom Domain Not Working
- Wait 10 minutes after adding DNS records
- Clear browser cache
- Try incognito mode
- Verify DNS: `nslookup api.ajstudioz.co.in`

---

## Next Steps

### 1. Add Frontend
Connect a React/Next.js frontend:
```javascript
const response = await fetch('https://api.ajstudioz.co.in/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: userInput })
});
```

### 2. Add Features
- User authentication
- Chat history
- Rate limiting
- Analytics
- Custom styling

### 3. Monitor Usage
- Check Vercel Analytics
- Monitor Hugging Face Space logs
- Track API responses

---

## Cost Breakdown

| Service        | Plan | Cost       |
|----------------|------|------------|
| Hugging Face   | Free | $0/month   |
| Vercel         | Free | $0/month   |
| **Total**      |      | **$0/month** |

**Limits:**
- Hugging Face: Unlimited requests (with reasonable use)
- Vercel: 100GB bandwidth/month (Free tier)

---

## Files Ready ✅

All files are updated and ready to deploy:

✅ `api/chat.js` - Updated to use HF API  
✅ `package.json` - Vercel config  
✅ `README.md` - Complete documentation  
✅ `DEPLOYMENT-GUIDE.md` - This guide  

---

## Need Help?

- Check logs in Vercel Dashboard
- Test backend health endpoint
- Verify your request format

**Your API is production-ready!** 🚀

---

**Built by AJ STUDIOZ**  
*Professional AI Solutions - Free Forever*
