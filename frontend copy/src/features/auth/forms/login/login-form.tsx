import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema } from "../schema";
import type { LoginUserData } from "../../types";
import { LoginView } from "./login-view";
import { useAuth } from "../../hooks";
import { getItemFromStorage } from "@/utils";
import { AxiosError } from "axios";

export function LoginForm() {
    const { login, isLoading } = useAuth();

    const methods = useForm<LoginUserData>({
        resolver: zodResolver(loginUserSchema),
        mode: "onChange",

        defaultValues: {
            email: getItemFromStorage("auth_items", "email") ?? "",
        },
    });

    const onSubmit = (credentials: LoginUserData) => {
        try {
            login(credentials)
        } catch(err) {
            console.error(err);

            if (err instanceof AxiosError) {
                const errData = err.response?.data 
                if (errData.password) {
                    methods.setError("password", errData.password, { shouldFocus: true });
                }
            }
        }
    };

    return (
        <LoginView
            methods={methods}
            isPending={isLoading}
            onSubmit={onSubmit}
        />
    );
}
