import { type ElementType, type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib";
import { cva, type VariantProps } from 'class-variance-authority'

const typographyVariants = cva("text-foreground", {
    variants: {
        variant: {
            h1: "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
            h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
            h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
            h4: "scroll-m-20 text-xl font-semibold tracking-tight",
            p: "leading-7 [&:not(:first-child)]:mt-6",
            blockquote: "mt-6 border-l-2 pl-6 italic",
            list: "my-6 ml-6 list-disc [&>li]:mt-2",
            lead: "text-muted-foreground text-xl",
            large: "text-lg font-semibold",
            small: "text-sm leading-none font-medium",
            muted: "text-muted-foreground text-sm",
        },
    },
    defaultVariants: {
        variant: "p"
    }
});

interface TypographyProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof typographyVariants> {
    as? : ElementType,
    children: ReactNode,
    className?: string
}

function Typography({
    as: Component = "p",
    variant = "p",
    children,
    className,
    ...props
}: TypographyProps) {
    return (
        <Component
            className={cn(typographyVariants({ variant }), className)}
            {...props}
        >
            {children}
        </Component>
    );
}

export { Typography }