import { useQuery } from "react-query";
import { getUsers } from "./request";

export const userQuery = () => {
  return useQuery("users", getUsers);
};
