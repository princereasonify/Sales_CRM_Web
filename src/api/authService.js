import api from './axios';

export const authService = {
  async login(email, password) {
    const payload = { email: email.trim(), password: password.trim() };
    const { data } = await api.post('/auth/login', payload);
    return data;
  },
};
