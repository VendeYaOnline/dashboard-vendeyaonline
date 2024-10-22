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

export const mutationCancellations = () => {
  return useMutation(createCancellations);
};

export const mutationDeleteSubscription = () => {
  return useMutation(deleteSubscription);
};

export const mutationDeleteCancellations = () => {
  return useMutation(deleteCancellation);
};

export const mutationUpdatedSubscription = () => {
  return useMutation(updatedSubscription);
};

export const mutationCancellationsSubscription = () => {
  return useMutation(updatedCancellation);
};

// * FORM

export const mutationForm = () => {
  return useMutation(registerForms);
};

export const mutationUpdatedForm = () => {
  return useMutation(updatedForms);
};

export const mutationDeleteForm = () => {
  return useMutation(deleteForm);
};
