import * as z from "zod";
import type { ReactNode } from "react";

import {
    updateEmailSchema,
    updatePasswordSchema,
    deleteAccountSchema,
    loginUserSchema,
    registerUserSchema,
    requestPasswordResetSchema,
    confirmPasswordResetSchema,
} from "../forms";

import type { UseFormReturn } from "react-hook-form";
import type { StorageConfig } from "@/types";

export interface User {
    id: number;
    email: string;
}

export type RegisterStep = "personal" | "account" | "security";
export type SaveableKey = keyof StorageConfig["auth_items"];

export type UpdateEmailData = z.infer<typeof updateEmailSchema>;
export type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;
export type DeleteAccountData = z.infer<typeof deleteAccountSchema>;
export type LoginUserData = z.infer<typeof loginUserSchema>;
export type RegisterUserData = z.infer<typeof registerUserSchema>;
export type RequestPasswordResetData = z.infer<
    typeof requestPasswordResetSchema
>;
export type ConfirmPasswordResetData = z.infer<
    typeof confirmPasswordResetSchema
>;

export type ConfirmPasswordResetPayload = {
    uid: string | undefined;
    token: string | undefined;
    new_password1: string;
    new_password2: string;
};

export const RegisterSteps: RegisterStep[] = [
    "personal",
    "account",
    "security",
];

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (credentials: LoginUserData) => void;
    register: (data: RegisterUserData) => void;
    logout: (data: void) => void;
    delete: (data: DeleteAccountData) => Promise<void>;
    requestReset: (data: RequestPasswordResetData) => Promise<void>;
    confirmReset: (data: ConfirmPasswordResetPayload) => Promise<void>;
    clearSession: () => void;
}

export interface LoginViewProps {
    methods: UseFormReturn<LoginUserData>;
    onSubmit: (data: LoginUserData) => void;
    isPending: boolean;
}

export interface DeleteAccountViewProps {
    methods: UseFormReturn<DeleteAccountData>;
    onSubmit: (data: DeleteAccountData) => void;
    isPending: boolean;
    setOpen: (isOpen: boolean) => void;
}

export interface RegisterViewProps {
    methods: UseFormReturn<RegisterUserData>;
    currStep: RegisterStep;
    handleNext: () => Promise<void>;
    handlePrev: () => Promise<void>;
    handleSubmit: (data: RegisterUserData) => void;
    isLoading: boolean;
}

export interface RequestPasswordResetViewProps {
    methods: UseFormReturn<RequestPasswordResetData>;
    handleSubmit: (data: RequestPasswordResetData) => void;
}

export interface ConfirmPasswordResetViewProps {
    methods: UseFormReturn<ConfirmPasswordResetData>;
    handleSubmit: (data: ConfirmPasswordResetData) => void;
}

export interface TabContentContainerProps {
    value: RegisterStep;
    children: ReactNode;
}

export interface RegisterStepProps {
    onNext?: () => void;
    onPrev?: () => void;
    onSubmit?: () => void;
    isLoading?: boolean;
}
