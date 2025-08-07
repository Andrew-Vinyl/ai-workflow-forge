# 🔐 Secure Configuration Management

## Overview
This directory contains secure configuration templates and documentation for managing API keys and sensitive data.

## ⚠️ SECURITY WARNING
**NEVER commit actual API keys, tokens, or credentials to Git!**

## 🔧 Setup Instructions

### 1. Environment Variables (Recommended)
Create a `.env` file in the project root (already in .gitignore):

```bash
# Copy the template and fill in your actual values
cp config/env.template .env
```

### 2. n8n Credentials Setup
In your n8n instance, create these credentials:

#### Anthropic API Credential
- **Name**: `anthropic-creds`
- **Type**: HTTP Header Auth
- **Header Name**: `x-api-key`
- **Header Value**: `${ANTHROPIC_API_KEY}` (from environment)

#### ClickUp API Credential
- **Name**: `clickup-creds`
- **Type**: HTTP Header Auth
- **Header Name**: `Authorization`
- **Header Value**: `${CLICKUP_PERSONAL_TOKEN}` (from environment)

#### Supabase API Credential
- **Name**: `supabase-creds`
- **Type**: Supabase API
- **Host**: `https://rlkcxmfezvimfsdmdrlg.supabase.co`
- **Service Key**: `${SUPABASE_SERVICE_KEY}` (from environment)

### 3. Railway/Production Deployment
Set environment variables in your Railway dashboard:

```
ANTHROPIC_API_KEY=sk-ant-api03-YOUR_ACTUAL_KEY_HERE
CLICKUP_PERSONAL_TOKEN=pk_YOUR_ACTUAL_TOKEN_HERE
SUPABASE_URL=https://rlkcxmfezvimfsdmdrlg.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIs_YOUR_ACTUAL_KEY_HERE
OPENAI_API_KEY=sk-proj-YOUR_ACTUAL_KEY_HERE
```

## 🛡️ Security Best Practices

### For Development
1. Use environment variables for all sensitive data
2. Never hardcode API keys in source code
3. Use different keys for dev/staging/production
4. Rotate keys regularly

### For Production
1. Use Railway's environment variable system
2. Enable IP restrictions where possible
3. Monitor API usage for anomalies
4. Set up alerts for unusual activity

### For Team Members
1. Each team member should have their own API keys
2. Use role-based access control
3. Document who has access to what
4. Regular access reviews

## 📋 Credential Checklist

- [ ] `.env` file created and populated
- [ ] n8n credentials configured with environment variables
- [ ] Railway environment variables set
- [ ] API keys tested and working
- [ ] Team access documented
- [ ] Backup/recovery plan in place

## 🚨 If Keys Are Compromised

1. **Immediately revoke** the compromised keys
2. **Generate new keys** from the respective services
3. **Update environment variables** in all environments
4. **Update n8n credentials** with new keys
5. **Monitor accounts** for unauthorized usage
6. **Document the incident** for future reference

## 📞 Emergency Contacts

- **Anthropic Support**: https://support.anthropic.com
- **ClickUp Support**: https://help.clickup.com
- **Supabase Support**: https://supabase.com/support
- **OpenAI Support**: https://help.openai.com
