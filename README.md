# AI Workflow Forge

Centralized development repo for AI-driven n8n workflows, agent prompts, reusable code snippets, and multi-tool orchestration.

## Key Folders
- `flows/` – Full exported JSON workflows (e.g. from n8n)
- `snippets/` – Reusable code (JS, JSON, etc) for Code nodes or Forge logic
- `prompts/` – Agent prompt templates (for Vader, Forge, Yoda)
- `agents/` – Definitions + handler logic per agent (ClickUp, Schema Builder, etc)
- `playground/` – Experimental ideas, raw output, drafts

## Main Agent
> **ClickUp AI Agent - Ultimate Controller**
Handles multi-mode task logic via `agent_mode` switch (task_manager, comment_processor, etc).

## 🔐 Security First
This repository is designed with security best practices:
- **No hardcoded API keys** - All credentials use environment variables
- **Client data isolation** - Zero cross-client data access
- **Role-based permissions** - Team access control
- **Secure by default** - Comprehensive .gitignore and templates

## 🚀 Quick Start
1. **Setup Environment**: `cp config/env.template .env` (fill in your keys)
2. **Configure n8n**: Use environment variables for all credentials
3. **Setup Database**: Import schema from `flows/` directory
4. **Configure Interface**: `cp playground/config.template.js playground/config.js`

## 📖 Documentation
- **Security Guidelines**: See `SECURITY.md`
- **System Architecture**: See `flows/AI-Workflow-Forge-System-Documentation.md`
- **Workflow Setup**: See `flows/clickup-agent-ultimate-README.md`