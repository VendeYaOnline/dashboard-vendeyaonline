import { Inputs, User } from "@/interfaces";
import { axiosConfig } from "./config";

interface Props {
  id: string;
  user: Inputs;
}

export const getUsers = async () => {
  return (await axiosConfig.get<User[]>("/get-users")).data;
};

export const registerUser = async (user: Inputs) => {
  return axiosConfig.post<User>("/create-user", user);
};

export const loginUser = async (user: { email: string; password: string }) => {
  return axiosConfig.post("/login-user", user);
};

export const updatedUser = async ({ id, user }: Props) => {
  return (await axiosConfig.put(`/update-user/${id}`, user)).data;
};

export const deleteUser = async (id: number) => {
  return (await axiosConfig.delete(`/delete-user/${id}`)).data;
};
