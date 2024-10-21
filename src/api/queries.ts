import { useQuery } from "react-query";
import { getUsers, getAllSubscription, getAllCancellations } from "./request";

// * USERS
export const userQuery = () => {
  return useQuery("users", getUsers);
};

// * SUBSCRIPTIONS

export const subscriptionsQuery = () => {
  return useQuery("subscriptions", getAllSubscription);
};

export const cancellationsQuery = () => {
  return useQuery("cancellations", getAllCancellations);
};
