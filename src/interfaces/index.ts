export interface User {
  id: number;
  username: string;
  lastname: string;
  email: string;
  phone: string;
  city: string;
  department: string;
  createdat: Date;
  updatedat: Date;
}

export type Inputs = {
  username: string;
  email: string;
  password?: string;
  lastname: string;
  phone: string;
  department: string;
  city: string;
};

export interface Subscription {
  price: number;
  type: string;
  date: string;
  client: number;
}

export interface SubscriptionUpdated {
  price?: number;
  type?: string;
  date?: string;
  client?: number;
}

export interface SubscriptionResponse {
  id: number;
  price: number;
  type: string;
  date: string;
  client: number;
  createdat: string;
  updatedat: string;
}

export interface Form {
  id: number;
  name: string;
  email: string;
  lastname: string;
  phone: string;
  message: string;
  createdat: string;
  updatedat: string;
}

export interface InputsForm {
  name: string;
  email: string;
  lastname: string;
  phone: string;
  message: string;
}
