import { useMutation } from "react-query";
import { registerUser } from "./request";

export const createUser = () => {
    return useMutation(registerUser)
};
