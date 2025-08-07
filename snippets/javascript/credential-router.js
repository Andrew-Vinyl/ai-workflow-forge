/**
 * Credential Router for AI Workflow Forge
 * Determines which API credentials to use based on user preferences
 */

async function routeCredentials(userId, serviceName, supabaseClient) {
  try {
    // Get user's routing preferences
    const { data: routing, error: routingError } = await supabaseClient
      .from('credential_usage_routing')
      .select('*')
      .eq('user_id', userId)
      .eq('service_name', serviceName)
      .single();

    if (routingError && routingError.code !== 'PGRST116') {
      throw routingError;
    }

    const preference = routing?.routing_preference || 'shared';
    const fallbackEnabled = routing?.fallback_to_shared || false;

    // Try to get personal credentials first if preferred
    if (preference === 'personal') {
      const { data: personalCred, error: personalError } = await supabaseClient
        .from('user_personal_credentials')
        .select('*')
        .eq('user_id', userId)
        .eq('service_name', serviceName)
        .eq('is_primary', true)
        .eq('active', true)
        .single();

      if (personalCred && !personalError) {
        return {
          credentialType: 'personal',
          credentialId: personalCred.id,
          encryptedCredential: personalCred.encrypted_credential,
          owner: userId,
          costAttribution: 'personal',
          monthlyBudget: personalCred.monthly_budget
        };
      }

      // If personal credential not found and fallback enabled, use shared
      if (fallbackEnabled) {
        return await getSharedCredential(serviceName, supabaseClient, userId);
      }

      throw new Error(`No personal ${serviceName} credential found for user ${userId}`);
    }

    // Use shared credentials
    if (preference === 'shared') {
      return await getSharedCredential(serviceName, supabaseClient, userId);
    }

    // Ask each time - for now, default to shared
    if (preference === 'ask_each_time') {
      return await getSharedCredential(serviceName, supabaseClient, userId);
    }

    throw new Error(`Unknown routing preference: ${preference}`);

  } catch (error) {
    console.error('Credential routing error:', error);
    throw error;
  }
}

async function getSharedCredential(serviceName, supabaseClient, userId) {
  const { data: sharedCred, error } = await supabaseClient
    .from('master_credentials')
    .select('*')
    .eq('service_name', serviceName)
    .eq('active', true)
    .single();

  if (error || !sharedCred) {
    throw new Error(`No shared ${serviceName} credential available`);
  }

  return {
    credentialType: 'shared',
    credentialId: sharedCred.id,
    encryptedCredential: sharedCred.encrypted_credential,
    owner: 'shared',
    costAttribution: 'shared',
    requestingUser: userId
  };
}

async function logApiUsage(usageData, supabaseClient) {
  const { error } = await supabaseClient
    .from('api_usage_logs')
    .insert({
      user_id: usageData.userId,
      service_name: usageData.serviceName,
      endpoint: usageData.endpoint,
      request_count: 1,
      tokens_used: usageData.tokensUsed || 0,
      cost_estimate: usageData.costEstimate || 0,
      credential_owner: usageData.credentialOwner,
      cost_attribution: usageData.costAttribution,
      billing_category: usageData.billingCategory || 'api_usage',
      success: usageData.success !== false,
      error_message: usageData.errorMessage || null
    });

  if (error) {
    console.error('Error logging API usage:', error);
  }
}

// Example usage in n8n Code node:
/*
const credentialInfo = await routeCredentials(
  $json.user_id, 
  'anthropic', 
  supabaseClient
);

// Use the credential for API call
const apiResponse = await makeApiCall(credentialInfo);

// Log the usage
await logApiUsage({
  userId: $json.user_id,
  serviceName: 'anthropic',
  endpoint: '/v1/messages',
  tokensUsed: apiResponse.usage?.total_tokens,
  costEstimate: calculateCost(apiResponse.usage),
  credentialOwner: credentialInfo.owner,
  costAttribution: credentialInfo.costAttribution,
  success: true
}, supabaseClient);
*/

module.exports = {
  routeCredentials,
  logApiUsage,
  getSharedCredential
};
