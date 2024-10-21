import { useMutation } from "react-query";
import {
  loginUser,
  updatedUser,
  registerUser,
  deleteUser,
  createSubscription,
  updatedSubscription,
  deleteSubscription,
} from "./request";

// * USERS

export const mutationRegisterUser = () => {
  return useMutation(registerUser);
};

export const mutationLoginUser = () => {
  return useMutation(loginUser);
};

export const mutationUpdatedUser = () => {
  return useMutation(updatedUser);
};

export const mutationDeleteUser = () => {
  return useMutation(deleteUser);
};

// * SUBSCRIPTION

export const mutationSubscription = () => {
  return useMutation(createSubscription);
};

export const mutationDeleteSubscription = () => {
  return useMutation(deleteSubscription);
};

export const mutationUpdatedSubscription = () => {
  return useMutation(updatedSubscription);
};
