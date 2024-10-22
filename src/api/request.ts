import {
  Form,
  Inputs,
  InputsForm,
  Subscription,
  SubscriptionResponse,
  SubscriptionUpdated,
  User,
} from "@/interfaces";
import { axiosConfig } from "./config";

interface Props {
  id: string;
  user: Inputs;
}

// * USERS
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

// * SUSCRIPTIONS

export const getAllSubscription = async () => {
  return (
    await axiosConfig.get<{ subscription: SubscriptionResponse[] }>(
      "/get-suscriptions"
    )
  ).data.subscription;
};

export const getAllCancellations = async () => {
  return (
    await axiosConfig.get<{ subscription: SubscriptionResponse[] }>(
      "/get-cancellations"
    )
  ).data.subscription;
};

export const createSubscription = async (subscription: Subscription) => {
  return (await axiosConfig.post("/create-suscription", subscription)).data;
};

export const createCancellations = async (subscription: Subscription) => {
  return (await axiosConfig.post("/create-canceled_suscription", subscription))
    .data;
};

export const updatedSubscription = async ({
  id,
  subscription,
}: {
  id: string;
  subscription: SubscriptionUpdated;
}) => {
  return (await axiosConfig.put(`/updated-suscription/${id}`, subscription))
    .data;
};

export const updatedCancellation = async ({
  id,
  subscription,
}: {
  id: string;
  subscription: SubscriptionUpdated;
}) => {
  return (await axiosConfig.put(`/updated-cancellations/${id}`, subscription))
    .data;
};

export const cancellationSubscription = async ({
  id,
  subscription,
}: {
  id: string;
  subscription: SubscriptionUpdated;
}) => {
  return (await axiosConfig.put(`/updated-suscription/${id}`, subscription))
    .data;
};

export const deleteSubscription = async (id: number) => {
  return (await axiosConfig.delete(`/delete-suscription/${id}`)).data;
};

export const deleteCancellation = async (id: number) => {
  return (await axiosConfig.delete(`/delete-canceled_suscription/${id}`)).data;
};

// * FORMS

export const getAllForms = async () => {
  return (await axiosConfig.get<{ forms: Form[] }>("/get-forms")).data.forms;
};

export const registerForms = async (form: InputsForm) => {
  return (await axiosConfig.post(`/register-form`, form)).data;
};

export const updatedForms = async ({
  id,
  form,
}: {
  id: string;
  form: InputsForm;
}) => {
  return (await axiosConfig.put(`/updated-form/${id}`, form)).data;
};

export const deleteForm = async (id: number) => {
  return (await axiosConfig.delete(`/delete-form/${id}`)).data;
};
