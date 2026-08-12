const div = document.createElement('div');

export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  div.textContent = str;
  return div.innerHTML;
}

export function escapeAttr(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
