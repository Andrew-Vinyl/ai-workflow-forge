// Extracts task info from AI output for ClickUp creation
module.exports = function parseTasks(responseText) {
  const clean = responseText.replace(/```json\\n?/, '').replace(/```/, '').trim();
  const tasks = JSON.parse(clean);
  return tasks.map((task, index) => ({
    ...task,
    task_index: index,
    created_at: new Date().toISOString()
  }));
};
