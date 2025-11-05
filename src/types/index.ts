export interface Provider {
  id: number;
  name: string;
  city: string;
  phone: string;
  email: string;
}

export interface Furniture {
  id: number;
  provider: number;
  provider_name: string;
  name: string;
  material: string;
  price: number;
  stock: number;
  image: string;
}

export interface FurnitureCreate {
  provider: number;
  name: string;
  material: string;
  price: number;
  stock: number;
  image?: File;
}

export interface ProviderCreate {
  name: string;
  city: string;
  phone: string;
  email: string;
}
