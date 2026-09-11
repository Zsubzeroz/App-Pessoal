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
  if (window.google?.accounts?.id) {
    window.google.accounts.id.disableAutoSelect();
  }
  location.reload();
}

export function initGoogleAuth(handleCredential) {
  const CLIENT_ID = 'SEU_CLIENT_ID_AQUI.apps.googleusercontent.com';

  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onload = () => {
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredential,
      auto_select: false
    });
  };
  document.head.appendChild(script);
}

export function renderGoogleButton(containerId) {
  if (!window.google?.accounts?.id) return;

  window.google.accounts.id.renderButton(
    document.getElementById(containerId),
    {
      type: 'standard',
      theme: 'filled_black',
      size: 'large',
      text: 'continue_with',
      shape: 'pill',
      width: 300
    }
  );
}

export function handleCredentialResponse(response) {
  const payload = decodeJwtPayload(response.credential);

  const user = {
    email: payload.email,
    name: payload.name || payload.given_name || payload.email,
    picture: payload.picture || '',
    sub: payload.sub
  };

  setUser(user);
  return user;
}

function decodeJwtPayload(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join('')
  );
  return JSON.parse(jsonPayload);
}
