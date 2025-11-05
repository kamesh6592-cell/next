// API Configuration
const API_BASE_URL = 'https://api.ajstudioz.co.in/api';

// Auto-resize textarea
const messageInput = document.getElementById('messageInput');
messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 150) + 'px';
});

// Send message on Enter key (but not Shift+Enter)
messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Health check
async function checkHealth() {
    const startTime = Date.now();
    
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        if (response.ok) {
            const data = await response.json();
            
            // Update status badge
            document.getElementById('statusText').textContent = 'Online';
            document.querySelector('.status-dot').style.background = '#10b981';
            
            // Update response time
            document.getElementById('responseTime').textContent = `${responseTime}ms`;
            document.getElementById('healthResponseTime').textContent = `${responseTime}ms`;
            
            // Update model name
            if (data.model) {
                document.getElementById('modelName').textContent = data.model || 'AJ-Coder v2.0';
            }
            
            // Update health indicators
            document.getElementById('apiHealth').className = 'health-indicator healthy';
            document.getElementById('modelHealth').className = 'health-indicator healthy';
            
            // Update last updated time
            const now = new Date();
            document.getElementById('lastUpdated').textContent = now.toLocaleTimeString();
            
            // Show success notification
            showNotification('System is healthy and online! 🟢', 'success');
        } else {
            throw new Error('API returned error status');
        }
    } catch (error) {
        console.error('Health check failed:', error);
        
        // Update status to offline
        document.getElementById('statusText').textContent = 'Offline';
        document.querySelector('.status-dot').style.background = '#ef4444';
        document.getElementById('responseTime').textContent = '--ms';
        
        // Update health indicators
        document.getElementById('apiHealth').className = 'health-indicator unhealthy';
        document.getElementById('modelHealth').className = 'health-indicator unhealthy';
        
        showNotification('API is currently offline. Please try again later. 🔴', 'error');
    }
}

// Send message
async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Disable send button
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.disabled = true;
    
    // Clear input
    input.value = '';
    input.style.height = 'auto';
    
    // Remove welcome message if present
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }
    
    // Add user message
    addMessage(message, 'user');
    
    // Show typing indicator
    const typingId = showTypingIndicator();
    
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });
        
        if (response.ok) {
            const data = await response.json();
            
            // Remove typing indicator
            removeTypingIndicator(typingId);
            
            // Add assistant message
            addMessage(data.reply, 'assistant');
        } else {
            throw new Error('API request failed');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        
        // Remove typing indicator
        removeTypingIndicator(typingId);
        
        // Show error message
        addMessage('Sorry, I encountered an error. Please try again or check the system status.', 'assistant', true);
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Re-enable send button
        sendBtn.disabled = false;
        input.focus();
    }
}

// Add message to chat
function addMessage(content, role, isError = false) {
    const chatContainer = document.getElementById('chatContainer');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? '👤' : '🤖';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    if (isError) {
        messageContent.style.background = '#fee2e2';
        messageContent.style.color = '#991b1b';
    }
    
    // Format content (handle code blocks, etc.)
    messageContent.innerHTML = formatMessage(content);
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = new Date().toLocaleTimeString();
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    messageContent.appendChild(messageTime);
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Format message (handle markdown-style code blocks)
function formatMessage(text) {
    // Handle code blocks
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    
    // Handle inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Handle line breaks
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

// Show typing indicator
function showTypingIndicator() {
    const chatContainer = document.getElementById('chatContainer');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    messageDiv.id = 'typing-indicator-' + Date.now();
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = '🤖';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    messageContent.appendChild(typingIndicator);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    return messageDiv.id;
}

// Remove typing indicator
function removeTypingIndicator(id) {
    const indicator = document.getElementById(id);
    if (indicator) {
        indicator.remove();
    }
}

// Clear chat
function clearChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.innerHTML = `
        <div class="welcome-message">
            <div class="welcome-icon">👋</div>
            <h4>Welcome to AJ STUDIOZ AI Assistant</h4>
            <p>Ask me anything! I can help with coding, problem-solving, writing, and more.</p>
        </div>
    `;
    showNotification('Chat cleared!', 'success');
}

// Copy API example
function copyApiExample() {
    const code = `curl https://api.ajstudioz.co.in/api/chat \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Hello!"}'`;
    
    navigator.clipboard.writeText(code).then(() => {
        showNotification('API example copied to clipboard! 📋', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('Failed to copy. Please try again.', 'error');
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#667eea'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Run initial health check
    checkHealth();
    
    // Set up periodic health checks (every 30 seconds)
    setInterval(checkHealth, 30000);
    
    // Focus on input
    messageInput.focus();
    
    console.log('🚀 AJ STUDIOZ API Interface loaded successfully!');
    console.log('API Endpoint:', API_BASE_URL);
});

// Add some example prompts
const examplePrompts = [
    "Write a Python function to calculate fibonacci numbers",
    "Explain async/await in JavaScript",
    "Create a REST API endpoint in FastAPI",
    "What are the SOLID principles?"
];

// Add keyboard shortcut for clearing chat (Ctrl+K or Cmd+K)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        clearChat();
    }
});
