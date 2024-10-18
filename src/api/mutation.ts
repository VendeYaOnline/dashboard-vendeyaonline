import { useMutation } from "react-query";
import { loginUser, updatedUser } from "./request";

export const mutationLoginUser = () => {
  return useMutation(loginUser);
};

export const mutationUpdatedUser = () => {
  return useMutation(updatedUser);
};
