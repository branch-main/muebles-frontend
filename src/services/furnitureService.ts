import api from "./api";
import type { Furniture, FurnitureCreate } from "../types";

class FurnitureService {
  async getAll() {
    return api.get<Furniture[]>("/furniture/");
  }

  async getById(id: number) {
    return api.get<Furniture>(`/furniture/${id}/`);
  }

  async create(data: FurnitureCreate) {
    const formData = new FormData();
    formData.append("provider", data.provider.toString());
    formData.append("name", data.name);
    formData.append("material", data.material);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    if (data.image) {
      formData.append("image", data.image);
    }
    return api.post<Furniture>("/furniture/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async update(id: number, data: Partial<FurnitureCreate>) {
    const formData = new FormData();
    if (data.provider) formData.append("provider", data.provider.toString());
    if (data.name) formData.append("name", data.name);
    if (data.material) formData.append("material", data.material);
    if (data.price !== undefined) formData.append("price", data.price.toString());
    if (data.stock !== undefined) formData.append("stock", data.stock.toString());
    if (data.image) formData.append("image", data.image);
    return api.patch<Furniture>(`/furniture/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async delete(id: number) {
    return api.delete(`/furniture/${id}/`);
  }
}

export default new FurnitureService();
