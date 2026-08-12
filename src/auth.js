let googleClientId = '';

export function setClientId(id) {
  googleClientId = id;
}

export function getLoggedUser() {
  try {
    const data = localStorage.getItem('central-user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function onGoogleLogin(response) {
  try {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    const user = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      sub: payload.sub
    };
    localStorage.setItem('central-user', JSON.stringify(user));
    if (typeof window.__onUserLogin === 'function') {
      window.__onUserLogin(user);
    }
  } catch (err) {
    console.error('Erro no login Google:', err);
  }
}

export function initGoogleAuth(onLogin) {
  window.__onUserLogin = onLogin;

  function tryInit() {
    if (typeof google === 'undefined' || !google.accounts) {
      setTimeout(tryInit, 200);
      return;
    }

    google.accounts.id.initialize({
      client_id: googleClientId,
      callback: onGoogleLogin
    });

    google.accounts.id.renderButton(
      document.getElementById('google-login-btn'),
      { theme: 'outline', size: 'large', text: 'signin_with', width: 300 }
    );
  }

  tryInit();
}

export function logout() {
  if (typeof google !== 'undefined' && google.accounts) {
    google.accounts.id.disableAutoSelect();
  }
  localStorage.removeItem('central-user');
  location.reload();
}
