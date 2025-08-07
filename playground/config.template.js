// 🔐 Configuration Template for User Interface
// Copy this file to config.js and fill in your actual values
// NEVER commit config.js to Git!

// Supabase Configuration
window.SUPABASE_URL = 'https://rlkcxmfezvimfsdmdrlg.supabase.co';
window.SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE'; // Replace with actual anon key

// n8n Configuration  
window.N8N_WEBHOOK_URL = 'https://your-n8n-instance.com/webhook/clickup-agent-v2';

// Environment
window.ENVIRONMENT = 'development'; // 'development', 'staging', 'production'

// Optional: Additional configuration
window.APP_CONFIG = {
    debug: true,
    apiTimeout: 30000,
    retryAttempts: 3
};
