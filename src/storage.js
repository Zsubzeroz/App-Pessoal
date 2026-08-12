const STORAGE_PREFIX = 'central-v2:';

function getUserEmail() {
  try {
    const user = JSON.parse(localStorage.getItem('central-user'));
    return user ? user.email : null;
  } catch {
    return null;
  }
}

function userKey(key) {
  const email = getUserEmail();
  if (!email) return key;
  return `${STORAGE_PREFIX}${email}:${key}`;
}

export function saveUserData(key, data) {
  localStorage.setItem(userKey(key), JSON.stringify(data));
}

export function loadUserData(key, defaultValue = null) {
  const data = localStorage.getItem(userKey(key));
  if (data === null) return defaultValue;
  try {
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
}

export function removeUserData(key) {
  localStorage.removeItem(userKey(key));
}

export function clearAllUserData() {
  const email = getUserEmail();
  if (!email) return;
  const prefix = `${STORAGE_PREFIX}${email}:`;
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(prefix)) keys.push(k);
  }
  keys.forEach(k => localStorage.removeItem(k));
}
