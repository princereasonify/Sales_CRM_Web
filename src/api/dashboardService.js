import api from './axios';

export const dashboardService = {
  async getFoDashboard() {
    const { data } = await api.get('/dashboard/fo');
    return data;
  },
  async getZoneDashboard() {
    const { data } = await api.get('/dashboard/zone');
    return data;
  },
  async getRegionDashboard() {
    const { data } = await api.get('/dashboard/region');
    return data;
  },
  async getNationalDashboard() {
    const { data } = await api.get('/dashboard/national');
    return data;
  },
  async getTeamPerformance() {
    const { data } = await api.get('/dashboard/team-performance');
    return data;
  },
};
