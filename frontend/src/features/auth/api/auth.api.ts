import { api, ENDPOINTS } from "@/api";
import { type User } from "@/types";
import { type RegisterFormData, type LoginFormData } from "../components";

export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get(ENDPOINTS.AUTH.CURRENT_USER);
    return response.data;
};

export const postRegister = async (data: RegisterFormData) => {
    const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        date_of_birth: data.dateOfBirth,
        email: data.email,
        password1: data.password,
        password2: data.confirmPassword,
    };

    const response = await api.post(ENDPOINTS.AUTH.REGISTER, payload);
    return response.data;
};

export const postLogin = async (data: LoginFormData) => {
    try {
        const response = await api.post(ENDPOINTS.AUTH.LOGIN, data);
        return response.data;
    } catch (err) {
        const { response } = err;
        console.log(err);
        throw err;
    }
};

export const postLogout = async () => {
    const response = await api.get(ENDPOINTS.AUTH.LOGOUT);
    return response.data;
};
