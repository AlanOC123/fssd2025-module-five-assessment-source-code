import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; // Assuming shadcn Select
import {
    Clock,
    PlayCircle,
    CheckCircle2,
    Archive,
    Loader2,
} from "lucide-react";
import { useUpdateProject } from "../hooks/use-update-project";
import type { ProjectStatus } from "../types";
import { cn } from "@/lib/utils";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";

interface ProjectStatusControlProps {
    projectId: number;
    currentStatus: ProjectStatus;
    isOwner: boolean;
}

const STATUS_CONFIG: Record<
    ProjectStatus,
    {
        label: string;
        icon: ForwardRefExoticComponent<
            Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
        >;
        color: string;
        bg: string;
    }
> = {
    pending: {
        label: "Pending",
        icon: Clock,
        color: "text-yellow-600",
        bg: "bg-yellow-50 border-yellow-200",
    },
    active: {
        label: "Active",
        icon: PlayCircle,
        color: "text-green-600",
        bg: "bg-green-50 border-green-200",
    },
    complete: {
        label: "Completed",
        icon: CheckCircle2,
        color: "text-blue-600",
        bg: "bg-blue-50 border-blue-200",
    },
    archived: {
        label: "Archived",
        icon: Archive,
        color: "text-gray-500",
        bg: "bg-gray-100 border-gray-200",
    },
};

export function ProjectStatusControl({
    projectId,
    currentStatus,
    isOwner,
}: ProjectStatusControlProps) {
    const { mutate: updateProject, isPending } = useUpdateProject();

    const handleValueChange = (value: string) => {
        updateProject({
            projectId,
            data: { status: value as ProjectStatus },
        });
    };

    const config = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.pending;
    const Icon = config.icon;

    if (!isOwner) {
        // Read-only view for members
        return (
            <div
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium",
                    config.bg,
                    config.color,
                )}
            >
                <Icon className="w-4 h-4" />
                <span>{config.label}</span>
            </div>
        );
    }

    return (
        <Select
            value={currentStatus}
            onValueChange={handleValueChange}
            disabled={isPending}
        >
            <SelectTrigger
                className={cn(
                    "w-full sm:w-[180px] transition-all border shadow-sm",
                    config.bg,
                    config.color,
                    "focus:ring-0 focus:ring-offset-0", // Clean look
                )}
            >
                <div className="flex items-center gap-2">
                    {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Icon className="w-4 h-4" />
                    )}
                    <SelectValue placeholder="Status" />
                </div>
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="pending">
                    <div className="flex items-center gap-2 text-yellow-600">
                        Pending
                    </div>
                </SelectItem>
                <SelectItem value="active">
                    <div className="flex items-center gap-2 text-green-600">
                        Active
                    </div>
                </SelectItem>
                <SelectItem value="complete">
                    <div className="flex items-center gap-2 text-blue-600">
                        Completed
                    </div>
                </SelectItem>
                <SelectItem value="archived">
                    <div className="flex items-center gap-2 text-gray-500">
                        Archived
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
