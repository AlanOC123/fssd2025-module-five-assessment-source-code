import { type ReactNode, type HTMLAttributes } from "react";

export interface BaseComponentProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode,
    className?: string
}

export interface BaseLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}