import api from './axios';

export const dealService = {
  async getDeals(params = {}) {
    const { data } = await api.get('/deals', { params });
    return data;
  },
  async getDealById(id) {
    const { data } = await api.get(`/deals/${id}`);
    return data;
  },
  async createDeal(deal) {
    const { data } = await api.post('/deals', deal);
    return data;
  },
  async approveDeal(id, approval) {
    const { data } = await api.put(`/deals/${id}/approve`, approval);
    return data;
  },
  async getPendingApprovals() {
    const { data } = await api.get('/deals/pending-approvals');
    return data;
  },
};
