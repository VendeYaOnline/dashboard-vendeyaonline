import { axiosConfig } from "./config";

export const getUsers = async () => {
  axiosConfig.get("/get-users");
};

export const registerUser = async (user: any) => {
  return axiosConfig.post("/login-user", user);
};
