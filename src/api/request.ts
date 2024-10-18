import { User } from "@/interfaces";
import { axiosConfig } from "./config";

export const getUsers = async () => {
  return (await axiosConfig.get<User[]>("/get-users")).data;
};

export const registerUser = async (user: any) => {
  return axiosConfig.post("/login-user", user);
};
