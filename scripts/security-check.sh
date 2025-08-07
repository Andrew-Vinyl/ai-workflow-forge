#!/bin/bash

# 🔐 Security Check Script for AI Workflow Forge
# This script checks for potential security issues before committing

echo "🔍 Running security checks..."

# Check for potential API keys in files (excluding templates)
echo "Checking for potential API keys..."
if grep -r "sk-ant-api03-[A-Za-z0-9]" . --exclude-dir=.git --exclude-dir=node_modules --exclude="*.template*" 2>/dev/null | grep -v "YOUR_KEY_HERE" | grep -v "YOUR_ACTUAL_KEY_HERE"; then
    echo "❌ Found potential Anthropic API key!"
    exit 1
fi

if grep -r "pk_[0-9]" . --exclude-dir=.git --exclude-dir=node_modules --exclude="*.template*" 2>/dev/null | grep -v "YOUR_TOKEN_HERE" | grep -v "YOUR_ACTUAL_TOKEN_HERE"; then
    echo "❌ Found potential ClickUp API key!"
    exit 1
fi

if grep -r "sk-proj-[A-Za-z0-9]" . --exclude-dir=.git --exclude-dir=node_modules --exclude="*.template*" 2>/dev/null | grep -v "YOUR_KEY_HERE" | grep -v "YOUR_ACTUAL_KEY_HERE"; then
    echo "❌ Found potential OpenAI API key!"
    exit 1
fi

# Check for .env files that shouldn't be committed
echo "Checking for .env files..."
if find . -name ".env" -not -path "./.git/*" | grep -q .; then
    echo "❌ Found .env files that should not be committed!"
    find . -name ".env" -not -path "./.git/*"
    exit 1
fi

# Check for credential files
echo "Checking for credential files..."
if find . -name "*credentials.json" -not -path "./.git/*" | grep -q .; then
    echo "❌ Found credential files that should not be committed!"
    find . -name "*credentials.json" -not -path "./.git/*"
    exit 1
fi

# Check for config.js files (should only be templates)
echo "Checking for config.js files..."
if find . -name "config.js" -not -path "./.git/*" | grep -q .; then
    echo "⚠️  Found config.js files - make sure these don't contain real credentials!"
    find . -name "config.js" -not -path "./.git/*"
fi

echo "✅ Security checks passed!"
echo "📋 Remember to:"
echo "   - Use environment variables for all credentials"
echo "   - Never commit .env files"
echo "   - Use template files for examples"
echo "   - Rotate keys if they were ever exposed"
