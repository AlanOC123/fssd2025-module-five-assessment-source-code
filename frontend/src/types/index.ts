import { type ReactNode, type HTMLAttributes } from "react";

export interface BaseComponentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode,
    className?: string
}

export interface BaseLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
}

export const STORAGE_PREFIX = "_APP_STORAGE";

export type StorageConfig = {
    auth_items: {
        first_name: string;
        last_name: string;
        date_of_birth: string;
        email: string;
    };
};