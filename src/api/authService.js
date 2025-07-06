import { setToken, setUser, getToken } from '../utils/auth';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const authService = {
  async login(email, password, rememberMe = false) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro no login');
      }

      const data = await response.json();

      const expirationDays = rememberMe ? 365 : 7;
      setToken(data.token, expirationDays);
      setUser(data.user, expirationDays);

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro na requisição de login:', error);
      throw error;
    }
  },

  async logout() {
    try {
      const token = getToken();
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro no logout:', error);
    }
  },
};
