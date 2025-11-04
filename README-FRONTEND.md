# 🚀 AJ STUDIOZ API Frontend

Beautiful, modern web interface for the AJ STUDIOZ AI API with real-time status monitoring, interactive chat, and comprehensive API documentation.

![AJ STUDIOZ](https://img.shields.io/badge/AJ-STUDIOZ-blueviolet?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Online-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## ✨ Features

### 🎨 **Modern UI/UX**
- Gradient-based design with AJ STUDIOZ branding
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional interface with status monitoring

### 💬 **Interactive Chat Interface**
- Real-time messaging with typing indicators
- Code syntax highlighting
- Markdown support
- Auto-scrolling and message history
- Copy code snippets

### 📊 **System Health Monitoring**
- Real-time API status tracking
- Response time metrics
- Model status indicators
- Auto-refresh every 30 seconds
- Manual refresh button

### 🔌 **API Documentation**
- All available endpoints listed
- Quick-copy curl examples
- Authentication examples
- Integration guides

### ⌨️ **Keyboard Shortcuts**
- `Enter` - Send message
- `Shift + Enter` - New line in message
- `Ctrl/Cmd + K` - Clear chat

## 🛠️ Tech Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Inter (Google Fonts)
- **API**: Fetch API for HTTP requests
- **Deployment**: Vercel (serverless)

## 📁 Project Structure

```
aj-frontend/
├── index.html          # Main HTML page
├── styles.css          # All styles and animations
├── script.js           # Frontend logic and API calls
├── vercel.json         # Vercel deployment config
├── package.json        # Project metadata
├── api/
│   └── chat.js        # Serverless API proxy
└── README.md          # This file
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/kamesh6592-cell/next.git aj-frontend
   cd aj-frontend
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

3. **Or use Vercel CLI**
   ```bash
   npm install -g vercel
   vercel dev
   ```

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set up custom domain** (optional)
   ```bash
   vercel domains add api.ajstudioz.co.in
   ```

## 🔧 Configuration

### API Endpoint

Update the API endpoint in `script.js`:

```javascript
const API_BASE_URL = 'https://kamesh14151-aj-studioz-api.hf.space';
```

### Custom Branding

Update colors in `styles.css`:

```css
:root {
    --primary: #667eea;      /* Primary brand color */
    --secondary: #764ba2;    /* Secondary brand color */
    --success: #10b981;      /* Success color */
    --danger: #ef4444;       /* Error color */
}
```

## 📡 API Integration

The frontend connects to the following endpoints:

### Health Check
```bash
GET https://kamesh14151-aj-studioz-api.hf.space/
```

### Chat Endpoint
```bash
POST https://kamesh14151-aj-studioz-api.hf.space/chat
Content-Type: application/json

{
  "message": "Hello, AI!"
}
```

### Response Format
```json
{
  "reply": "Hello! How can I help you today?",
  "model": "AJ-Mini v1.0",
  "provider": "AJ STUDIOZ"
}
```

## 🎯 Features in Detail

### Health Monitoring

The frontend automatically checks API health:
- **Status Indicator**: Shows if API is online/offline
- **Response Time**: Displays average response time
- **Model Info**: Shows current AI model being used
- **Auto-Refresh**: Updates status every 30 seconds

### Chat Interface

Advanced chat features:
- **Message History**: Keeps track of conversation
- **Typing Indicators**: Shows when AI is responding
- **Error Handling**: Graceful error messages
- **Auto-resize Input**: Text area grows with content
- **Code Formatting**: Automatic code block detection

### Notifications

Toast notifications for:
- ✅ Successful operations
- ❌ Error messages
- ℹ️ Info messages
- 📋 Copy confirmations

## 📱 Responsive Design

The UI is fully responsive:
- **Desktop** (1024px+): Full layout with sidebar
- **Tablet** (768px-1024px): Adjusted grid layout
- **Mobile** (<768px): Stacked layout, mobile-optimized

## 🔒 Security

- CORS enabled for API calls
- XSS protection headers
- Content Security Policy
- Input sanitization
- No sensitive data in frontend

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 🐛 Troubleshooting

### API Not Responding
1. Check if HuggingFace Space is running
2. Verify API_BASE_URL in script.js
3. Check browser console for errors
4. Test API directly with curl

### Chat Not Working
1. Check network tab in browser DevTools
2. Verify CORS settings on API
3. Check API response format
4. Clear browser cache

### Deployment Issues
1. Verify vercel.json is valid
2. Check Vercel logs: `vercel logs`
3. Ensure all files are committed to git
4. Try redeploying: `vercel --prod --force`

## 📚 Live Demo

- **Frontend**: https://api.ajstudioz.co.in
- **API Backend**: https://kamesh14151-aj-studioz-api.hf.space
- **GitHub**: https://github.com/kamesh6592-cell/next

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🎉 Credits

**Developed by AJ STUDIOZ**
- Website: https://ajstudioz.co.in
- GitHub: https://github.com/kamesh6592-cell
- HuggingFace: https://huggingface.co/kamesh14151

**Powered by:**
- Microsoft Phi-3 Mini (AI Model)
- HuggingFace Spaces (Backend)
- Vercel (Frontend Hosting)

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact: AJ STUDIOZ Support
- Check API status at health endpoint

---

**⭐ If you find this useful, please star the repository!**

Made with ❤️ by AJ STUDIOZ | © 2025 All Rights Reserved
