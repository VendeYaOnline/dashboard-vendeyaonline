import { useMutation } from "react-query";
import {
  loginUser,
  updatedUser,
  registerUser,
  deleteUser,
  createSubscription,
  updatedSubscription,
  deleteSubscription,
  createCancellations,
  updatedCancellation,
  deleteCancellation,
  updatedForms,
  deleteForm,
  registerForms,
} from "./request";

// * USERS

export const useMutationRegisterUser = () => {
  return useMutation(registerUser);
};

export const useMutationLoginUser = () => {
  return useMutation(loginUser);
};

export const useMutationUpdatedUser = () => {
  return useMutation(updatedUser);
};

export const useMutationDeleteUser = () => {
  return useMutation(deleteUser);
};

// * SUBSCRIPTION

export const useMutationSubscription = () => {
  return useMutation(createSubscription);
};

export const useMutationCancellations = () => {
  return useMutation(createCancellations);
};

export const useMutationDeleteSubscription = () => {
  return useMutation(deleteSubscription);
};

export const useMutationDeleteCancellations = () => {
  return useMutation(deleteCancellation);
};

export const useMutationUpdatedSubscription = () => {
  return useMutation(updatedSubscription);
};

export const useMutationCancellationsSubscription = () => {
  return useMutation(updatedCancellation);
};

// * FORM

export const useMutationForm = () => {
  return useMutation(registerForms);
};

export const useMutationUpdatedForm = () => {
  return useMutation(updatedForms);
};

export const useMutationDeleteForm = () => {
  return useMutation(deleteForm);
};
