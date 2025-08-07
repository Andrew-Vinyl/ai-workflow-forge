/**
 * Example data transformation snippet for n8n Code node
 * Transforms incoming data structure for ClickUp integration
 */

// Input: $input.all() - array of input items
// Output: return array of transformed items

const transformedData = $input.all().map(item => {
  const data = item.json;
  
  return {
    json: {
      task_id: data.id,
      title: data.name || data.title,
      status: data.status?.status || 'open',
      priority: data.priority?.priority || 'normal',
      assignees: data.assignees?.map(a => a.username) || [],
      due_date: data.due_date ? new Date(parseInt(data.due_date)).toISOString() : null,
      created_at: new Date().toISOString(),
      custom_fields: data.custom_fields || {}
    }
  };
});

return transformedData;
