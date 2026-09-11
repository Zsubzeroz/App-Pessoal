const USER_KEY = 'central-user';

export function getLoggedUser() {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(USER_KEY);
  location.reload();
}

export function loginWithName(name) {
  const cleanName = name.trim();
  if (cleanName.length < 2) return { ok: false, error: 'Nome deve ter pelo menos 2 caracteres.' };

  const user = {
    email: cleanName.toLowerCase().replace(/\s+/g, '.'),
    name: cleanName,
    picture: '',
    sub: cleanName.toLowerCase().replace(/\s+/g, '.')
  };

  setUser(user);
  return { ok: true, user };
}
