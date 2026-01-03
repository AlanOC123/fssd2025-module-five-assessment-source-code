import { Typography } from "../ui";
import { type BaseLayoutProps } from "@/types";

export function PageTitle({ children }: BaseLayoutProps) {
    return <Typography as={"h1"} className="text-left p-6" variant={"h1"}>{children}</Typography>
}