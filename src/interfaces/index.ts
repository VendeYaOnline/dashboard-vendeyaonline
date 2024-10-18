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