import api from './axios';

export const activityService = {
  async getActivities(params = {}) {
    const { data } = await api.get('/activities', { params });
    return data;
  },
  async createActivity(activity) {
    const { data } = await api.post('/activities', activity);
    return data;
  },
};
