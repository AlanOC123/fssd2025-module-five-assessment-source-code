import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema } from "../schema";
import type { LoginUserData } from "../../types";
import { LoginView } from "./login-view";
import { useAuth } from "../../hooks";
import { getItemFromStorage } from "@/utils";

export function LoginForm() {
    const { login, isLoading } = useAuth();

    const methods = useForm<LoginUserData>({
        resolver: zodResolver(loginUserSchema),
        mode: "onChange",

        defaultValues: {
            email: getItemFromStorage("auth_items", "email") ?? "",
        },
    });

    const handleSubmit = (credentials: LoginUserData) => {
        login(credentials);
    };

    return (
        <LoginView
            methods={methods}
            isPending={isLoading}
            onSubmit={handleSubmit}
        />
    );
}
