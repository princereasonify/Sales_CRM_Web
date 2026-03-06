import api from './axios';

export const leadService = {
  async getLeads(params = {}) {
    const { data } = await api.get('/leads', { params });
    return data;
  },
  async getLeadById(id) {
    const { data } = await api.get(`/leads/${id}`);
    return data;
  },
  async createLead(lead) {
    const { data } = await api.post('/leads', lead);
    return data;
  },
  async updateLead(id, lead) {
    const { data } = await api.put(`/leads/${id}`, lead);
    return data;
  },
  async deleteLead(id) {
    const { data } = await api.delete(`/leads/${id}`);
    return data;
  },
  async getPipeline() {
    const { data } = await api.get('/leads/pipeline');
    return data;
  },
  async checkDuplicate(school, city) {
    const { data } = await api.get('/leads/check-duplicate', { params: { school, city } });
    return data;
  },
};
