# Agents Directory

Agent definitions, configurations, and handler logic for the AI Workflow Forge system.

## Structure
- `clickup-controller/` - ClickUp AI Agent (Ultimate Controller)
- `schema-builder/` - Database and API schema management
- `vader/` - Strategic oversight agent
- `forge/` - Development and implementation agent
- `yoda/` - Wisdom and guidance agent

## Agent Architecture
Each agent directory contains:
- `config.json` - Agent configuration and capabilities
- `handlers/` - Mode-specific logic handlers
- `prompts/` - Agent-specific prompt templates
- `tests/` - Unit tests for agent functionality

## Main Agent: ClickUp Controller
The primary agent handling multi-mode task logic via `agent_mode` switch:
- task_manager
- comment_processor
- status_updater
- report_generator
- automation_handler
