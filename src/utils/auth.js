const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

const getCookie = name => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const removeCookie = name => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const setToken = (token, days = 7) => {
  setCookie('authToken', token, days);
};

export const getToken = () => {
  return getCookie('authToken');
};

export const removeToken = () => {
  removeCookie('authToken');
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

export const getUser = () => {
  const userStr = getCookie('user');
  return userStr ? JSON.parse(decodeURIComponent(userStr)) : null;
};

export const setUser = (user, days = 7) => {
  setCookie('user', encodeURIComponent(JSON.stringify(user)), days);
};

export const removeUser = () => {
  removeCookie('user');
};

export const logout = () => {
  removeToken();
  removeUser();
};
