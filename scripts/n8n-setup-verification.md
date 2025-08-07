# 🔧 n8n Setup Verification Checklist

## ✅ **Pre-Import Checklist**

### **1. Railway Environment Variables**
Verify these are set in your n8n Railway service:
- [ ] `ANTHROPIC_API_KEY` = sk-ant-api03-...
- [ ] `CLICKUP_PERSONAL_TOKEN` = pk_...
- [ ] `SUPABASE_URL` = https://rlkcxmfezvimfsdmdrlg.supabase.co
- [ ] `SUPABASE_SERVICE_KEY` = eyJhbGciOiJIUzI1NiIs...
- [ ] `OPENAI_API_KEY` = sk-proj-...

### **2. n8n Credentials Created**
Create these credentials in n8n with Expression mode:

#### **anthropic-dynamic**
- Type: HTTP Header Auth
- Header Name: `x-api-key`
- Header Value: `{{ $env.ANTHROPIC_API_KEY }}` (Expression mode)

#### **clickup-dynamic**  
- Type: HTTP Header Auth
- Header Name: `Authorization`
- Header Value: `{{ $env.CLICKUP_PERSONAL_TOKEN }}` (Expression mode)

#### **supabase-dynamic**
- Type: Supabase
- Host: `{{ $env.SUPABASE_URL }}` (Expression mode)
- Service Key: `{{ $env.SUPABASE_SERVICE_KEY }}` (Expression mode)

#### **openai-dynamic**
- Type: OpenAI API
- API Key: `{{ $env.OPENAI_API_KEY }}` (Expression mode)
- Base URL: `https://api.openai.com/v1` (Fixed mode)

### **3. Test Environment Variables**
Create a simple workflow to test:
1. Add a Code node
2. Add this code: `console.log('Anthropic:', !!process.env.ANTHROPIC_API_KEY);`
3. Execute and check logs

## 🚀 **Import Workflow**

### **File Location**
```
flows/clickup-agent-ultimate.json
```

### **Import Steps**
1. Copy the entire JSON content
2. In n8n: Click "+" → "Import from clipboard"
3. Paste and click "Import"
4. **Don't activate yet!**

## 🧪 **Post-Import Verification**

### **1. Check Node Connections**
Verify these nodes are connected properly:
- Webhook Trigger → Parse Agent Request
- Parse Agent Request → Lookup User Context
- Get Agency Training → AI Model Router
- AI Model Router → Both AI nodes

### **2. Verify Credentials**
Each node should reference the correct credential:
- Supabase nodes → `supabase-dynamic`
- Anthropic node → `anthropic-dynamic`
- OpenAI node → `openai-dynamic`
- ClickUp node → `clickup-dynamic`

### **3. Test Webhook URL**
After activation, your webhook will be:
```
https://your-n8n-instance.railway.app/webhook/clickup-agent-v2
```

## 🔍 **Common Issues & Fixes**

### **Issue: "Credential not found"**
- **Fix**: Make sure credential names match exactly
- **Check**: `anthropic-dynamic`, `openai-dynamic`, etc.

### **Issue: "Environment variable undefined"**
- **Fix**: Verify Railway variables are set
- **Check**: Railway redeploy completed

### **Issue: "Supabase connection failed"**
- **Fix**: Verify service_role key (not anon key)
- **Check**: Supabase URL is correct

### **Issue: "Webhook not responding"**
- **Fix**: Make sure workflow is activated
- **Check**: Webhook path is `/clickup-agent-v2`

## 🎯 **Test Request**

Once everything is set up, test with:

```bash
curl -X POST https://your-n8n-instance.railway.app/webhook/clickup-agent-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "andrew",
    "agent_mode": "task_manager",
    "operation": "create",
    "payload": {
      "title": "Test task from secure system",
      "description": "Testing the complete AI workflow"
    }
  }'
```

## ✅ **Success Indicators**

### **Workflow Working When:**
- [ ] Webhook responds with 200 status
- [ ] Response includes processed task data
- [ ] Supabase logs show user context lookup
- [ ] AI model responds with task suggestions
- [ ] No credential errors in n8n logs

### **BYOK System Working When:**
- [ ] User can add personal credentials via interface
- [ ] Workflow routes to correct API based on user preference
- [ ] Cost attribution shows correct credential owner
- [ ] Fallback to shared credentials works

## 🚀 **Ready for Production**

Once all checks pass:
- [ ] Activate the workflow
- [ ] Share webhook URL with team
- [ ] Set up user credential management
- [ ] Monitor usage and costs
- [ ] Celebrate! 🎉

Your AI Workflow Forge is ready to revolutionize your agency operations!
