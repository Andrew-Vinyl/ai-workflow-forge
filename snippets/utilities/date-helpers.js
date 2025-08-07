/**
 * Date utility functions for n8n workflows
 */

// Format timestamp to readable date
function formatTimestamp(timestamp) {
  if (!timestamp) return null;
  const date = new Date(parseInt(timestamp));
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// Get relative date (days from now)
function getRelativeDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

// Check if date is overdue
function isOverdue(dueDateTimestamp) {
  if (!dueDateTimestamp) return false;
  const dueDate = new Date(parseInt(dueDateTimestamp));
  const now = new Date();
  return dueDate < now;
}

// Calculate days until due
function daysUntilDue(dueDateTimestamp) {
  if (!dueDateTimestamp) return null;
  const dueDate = new Date(parseInt(dueDateTimestamp));
  const now = new Date();
  const diffTime = dueDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

module.exports = {
  formatTimestamp,
  getRelativeDate,
  isOverdue,
  daysUntilDue
};
