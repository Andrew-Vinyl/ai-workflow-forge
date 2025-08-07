# 🔐 Security Guidelines for AI Workflow Forge

## 🚨 Critical Security Notice

**NEVER commit API keys, tokens, or credentials to Git repositories!**

This repository is designed to be secure by default, but requires proper configuration.

## 🛡️ Security Measures Implemented

### 1. **Git Security**
- Comprehensive `.gitignore` patterns for sensitive files
- Template files instead of actual credentials
- Clear documentation on what NOT to commit

### 2. **Environment Variable Management**
- All sensitive data stored in environment variables
- Template files provided for easy setup
- Different configurations for dev/staging/production

### 3. **Database Security**
- Row Level Security (RLS) enabled on all tables
- Role-based access control
- Client data isolation (no cross-client data access)

### 4. **API Security**
- n8n credential system with environment variables
- No hardcoded tokens in workflows
- Secure credential references only

## 🔧 Secure Setup Process

### Step 1: Environment Configuration
```bash
# Copy template and configure
cp config/env.template .env

# Edit .env with your actual values (NEVER commit this file)
nano .env
```

### Step 2: n8n Credential Setup
In your n8n instance, create credentials using environment variables:

```
Anthropic API:
- Name: anthropic-creds
- Type: HTTP Header Auth
- Header: x-api-key
- Value: ${ANTHROPIC_API_KEY}

ClickUp API:
- Name: clickup-creds  
- Type: HTTP Header Auth
- Header: Authorization
- Value: ${CLICKUP_PERSONAL_TOKEN}

Supabase API:
- Name: supabase-creds
- Type: Supabase API
- Host: ${SUPABASE_URL}
- Key: ${SUPABASE_SERVICE_KEY}
```

### Step 3: User Interface Configuration
```bash
# Copy template and configure
cp playground/config.template.js playground/config.js

# Edit config.js with your values (NEVER commit this file)
nano playground/config.js
```

## 🏢 Database Architecture Security

### Agency vs Client Data Separation

#### **Agency Documents** (Shared across all projects)
- `agency_documents` - Process documentation, templates, guidelines
- `agency_training` - Best practices, training materials
- Accessible to all team members
- Version controlled and centrally managed

#### **Client-Specific Data** (Completely isolated)
- `client_brand_assets` - Brand guides, logos, style guides
- `client_voice_profiles` - Voice, tone, messaging (per client)
- `project_deliverables` - Project-specific requirements
- **Zero cross-client data access**
- RLS policies enforce strict isolation

### Data Access Patterns
```sql
-- Agency documents: Available to all team members
SELECT * FROM agency_documents WHERE applies_to_project_types @> ARRAY['website'];

-- Client data: Only accessible to assigned team members
SELECT * FROM client_brand_assets 
WHERE client_id = 'client_a' 
AND user_has_access(auth.jwt() ->> 'user_id', 'client_a');
```

## 🚨 Security Checklist

### Before Committing Code
- [ ] No API keys in source code
- [ ] No hardcoded credentials
- [ ] All sensitive files in .gitignore
- [ ] Template files used instead of actual config
- [ ] Documentation updated for new secrets

### Before Deployment
- [ ] Environment variables configured
- [ ] n8n credentials set up with env vars
- [ ] Database RLS policies tested
- [ ] API rate limits configured
- [ ] Monitoring and alerts set up

### Regular Security Maintenance
- [ ] Rotate API keys quarterly
- [ ] Review team access permissions
- [ ] Audit database access logs
- [ ] Update security documentation
- [ ] Test backup and recovery procedures

## 🔄 Key Rotation Process

### When to Rotate Keys
- Quarterly (scheduled)
- When team member leaves
- If key exposure suspected
- After security incidents

### Rotation Steps
1. Generate new keys in respective services
2. Update environment variables
3. Update n8n credentials
4. Test all integrations
5. Revoke old keys
6. Document rotation in security log

## 📞 Security Incident Response

### If Keys Are Compromised
1. **IMMEDIATELY** revoke compromised keys
2. Generate new keys
3. Update all environments
4. Monitor for unauthorized usage
5. Document incident
6. Review how exposure occurred
7. Improve security measures

### Emergency Contacts
- **Andrew**: andrew@vinylmarketing.com
- **Anthropic Support**: https://support.anthropic.com
- **ClickUp Support**: https://help.clickup.com
- **Supabase Support**: https://supabase.com/support

## 🎯 Best Practices Summary

1. **Never commit secrets** - Use environment variables
2. **Principle of least privilege** - Minimal access required
3. **Regular rotation** - Change keys regularly
4. **Monitor usage** - Watch for anomalies
5. **Document everything** - Security procedures and incidents
6. **Test regularly** - Verify security measures work
7. **Team training** - Ensure everyone follows security practices

## 📋 Security Compliance

This system implements:
- **Data isolation** between clients
- **Role-based access control**
- **Audit trails** for all operations
- **Secure credential management**
- **Environment separation**
- **Regular security reviews**

Perfect for agencies handling multiple clients with strict confidentiality requirements.
