import { Plus, Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components"; // Import ButtonProps to allow passing variants/sizes
import { useCreateProject } from "../hooks";

interface CreateProjectButtonProps extends ButtonProps {
    label?: string;
}

export function CreateProjectButton({
    label = "New Project",
    className,
    variant = "default",
    size = "sm",
    ...props
}: CreateProjectButtonProps) {
    const { mutate: createProject, isPending } = useCreateProject();

    const handleCreate = () => {
        createProject({
            data: {
                title: "Untitled Project",
                description: "",
            },
        });
    };

    return (
        <Button
            onClick={handleCreate}
            disabled={isPending}
            variant={variant}
            size={size}
            className={className}
            {...props}
        >
            {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
                <Plus className="w-4 h-4 mr-2" />
            )}
            {label}
        </Button>
    );
}
