import { useMutation } from "react-query";
import { loginUser, updatedUser, registerUser } from "./request";

export const mutationRegisterUser = () => {
  return useMutation(registerUser);
};

export const mutationLoginUser = () => {
  return useMutation(loginUser);
};

export const mutationUpdatedUser = () => {
  return useMutation(updatedUser);
};
