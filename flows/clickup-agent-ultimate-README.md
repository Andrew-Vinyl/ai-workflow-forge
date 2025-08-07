# ClickUp AI Agent - Ultimate Controller

## Overview
This n8n workflow implements an intelligent ClickUp agent that can handle multiple modes of operation through AI-powered processing. It acts as a central controller for ClickUp task management, comment processing, status updates, report generation, and automation handling.

## Workflow Features

### 🎯 Multi-Mode Agent Router
- **task_manager** - AI-powered task creation and management
- **comment_processor** - Intelligent comment analysis and responses
- **status_updater** - Direct ClickUp API status updates
- **report_generator** - AI-generated reports and analytics
- **automation_handler** - Custom automation processing

### 🔐 Security & Credentials Required
Before importing, set up these credentials in n8n using environment variables:

1. **Anthropic API** (ID: `anthropic-creds`)
   - Type: HTTP Header Auth
   - Header Name: `x-api-key`
   - Header Value: `${ANTHROPIC_API_KEY}` (from environment)

2. **ClickUp API** (ID: `clickup-creds`)
   - Type: HTTP Header Auth
   - Header Name: `Authorization`
   - Header Value: `${CLICKUP_PERSONAL_TOKEN}` (from environment)

3. **Supabase API** (ID: `supabase-creds`)
   - Type: Supabase API
   - Host: `${SUPABASE_URL}` (from environment)
   - Service Key: `${SUPABASE_SERVICE_KEY}` (from environment)

**⚠️ SECURITY NOTE**: Never hardcode API keys in workflows! Use environment variables and n8n's credential system.

## API Endpoint
**Webhook URL**: `https://your-n8n-instance.com/webhook/clickup-agent-v2`
**Method**: POST

## Request Format
```json
{
  "agent_mode": "task_manager",
  "operation": "create",
  "client_id": "vinyl_internal",
  "context": {
    "project_context": "WordPress ACF sync logic"
  },
  "payload": {
    "list_id": "901317115211",
    "title": "Implement ACF sync",
    "description": "Create automated sync between ACF fields and database",
    "priority": "high",
    "assignee": "andrew"
  }
}
```

## Default Values
- `agent_mode`: `task_manager`
- `operation`: `create`
- `client_id`: `vinyl_internal`
- `project_context`: `general`
- `list_id`: `901317115211` (System Connections List)

## ClickUp Workspace Structure
```json
{
  "space_id": "90138864110",
  "default_lists": {
    "system_connections": "901317115211",
    "training_tasks": "901317115221",
    "plugin_toolkit": "901317115229",
    "system_automation": "901317115574"
  }
}
```

## Response Format
```json
{
  "status": "success",
  "agent_mode": "task_manager",
  "operation": "create",
  "client_id": "vinyl_internal",
  "message": "ClickUp AI Agent request processed successfully",
  "result": {
    "ai_response": "...",
    "processed_data": "..."
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Usage Examples

### Create Task
```bash
curl -X POST https://your-n8n-instance.com/webhook/clickup-agent-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "agent_mode": "task_manager",
    "operation": "create",
    "payload": {
      "title": "New Feature Implementation",
      "description": "Implement new feature with AI assistance"
    }
  }'
```

### Process Comment
```bash
curl -X POST https://your-n8n-instance.com/webhook/clickup-agent-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "agent_mode": "comment_processor",
    "payload": {
      "comment_text": "This task needs priority review",
      "task_id": "12345"
    }
  }'
```

### Update Status
```bash
curl -X POST https://your-n8n-instance.com/webhook/clickup-agent-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "agent_mode": "status_updater",
    "payload": {
      "task_id": "12345",
      "status_to": "in progress"
    }
  }'
```

## Error Handling
The workflow includes comprehensive error handling:
- Unknown agent modes route to error handler
- Invalid requests return structured error responses
- All errors include timestamp and context information

## Integration Notes
- Designed to work with the AI Workflow Forge ecosystem
- Compatible with Vader task creation prompts
- Supports dynamic list ID assignment
- Includes audit trail with timestamps and client tracking
