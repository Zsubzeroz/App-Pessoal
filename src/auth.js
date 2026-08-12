const USERS_KEY = 'central-users';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return bufToBase64(hash);
}

function bufToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function getLoggedUser() {
  try {
    const data = localStorage.getItem('central-user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function register(username, password) {
  const users = getUsers();
  const key = username.toLowerCase().trim();

  if (users[key]) {
    return { ok: false, error: 'Usuário já existe.' };
  }

  if (key.length < 3) {
    return { ok: false, error: 'Usuário deve ter pelo menos 3 caracteres.' };
  }

  if (password.length < 4) {
    return { ok: false, error: 'Senha deve ter pelo menos 4 caracteres.' };
  }

  const hash = await hashPassword(password);
  users[key] = { username: key, hash, createdAt: new Date().toISOString() };
  saveUsers(users);

  const user = { email: key, name: username, picture: '', sub: key };
  localStorage.setItem('central-user', JSON.stringify(user));

  return { ok: true, user };
}

export async function login(username, password) {
  const users = getUsers();
  const key = username.toLowerCase().trim();
  const user = users[key];

  if (!user) {
    return { ok: false, error: 'Usuário não encontrado.' };
  }

  const hash = await hashPassword(password);
  if (hash !== user.hash) {
    return { ok: false, error: 'Senha incorreta.' };
  }

  const loggedUser = { email: key, name: user.username, picture: '', sub: key };
  localStorage.setItem('central-user', JSON.stringify(loggedUser));

  return { ok: true, user: loggedUser };
}

export function logout() {
  localStorage.removeItem('central-user');
  location.reload();
}
