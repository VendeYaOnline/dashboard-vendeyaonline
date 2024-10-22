import { useQuery } from "react-query";
import {
  getUsers,
  getAllSubscription,
  getAllCancellations,
  getAllForms,
} from "./request";

// * USERS
export const useUserQuery = () => {
  return useQuery("users", getUsers);
};

// * SUBSCRIPTIONS

export const useSubscriptionsQuery = () => {
  return useQuery("subscriptions", getAllSubscription);
};

export const cancellationsQuery = () => {
  return useQuery("cancellations", getAllCancellations);
};

// * FORMS

export const useFormsQuery = () => {
  return useQuery("forms", getAllForms);
};
