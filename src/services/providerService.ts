import api from "./api";
import type { Provider, ProviderCreate } from "../types";

class ProviderService {
  async getAll() {
    return api.get<Provider[]>("/providers/");
  }

  async getById(id: number) {
    return api.get<Provider>(`/providers/${id}/`);
  }

  async create(data: ProviderCreate) {
    return api.post<Provider>("/providers/", data);
  }

  async update(id: number, data: Partial<ProviderCreate>) {
    return api.patch<Provider>(`/providers/${id}/`, data);
  }

  async delete(id: number) {
    return api.delete(`/providers/${id}/`);
  }
}

export default new ProviderService();
