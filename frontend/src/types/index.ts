import { type ReactNode, type HTMLAttributes } from "react";

export interface BaseComponentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode,
    className?: string
}

export interface BaseLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

export interface UserProfile {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    location: string | null;
    bio: string | null;
    role: string;
    full_name: string;
}

export interface User {
    id: number,
    email: string,
    profile: UserProfile
}