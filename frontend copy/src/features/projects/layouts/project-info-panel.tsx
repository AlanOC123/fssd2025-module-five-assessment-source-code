import { cn } from "@/lib/utils";
import { Textarea, Progress } from "@/components";
import { useProjectWorkspace } from "../hooks";
import { ProjectTimeline, ProjectStatusControl } from "../components";
import { toast } from "sonner";

export function ProjectInfoPanel() {
    const { project, isOwner, makeChanges } = useProjectWorkspace();

    // Guard clause to ensure project data is available
    if (!project) return null;
    const handleTimelineUpdate = (
        field: "start_date" | "end_date",
        newValue: string | null,
    ) => {
        const currentStart = project?.start_date;
        const currentEnd = project?.end_date;

        // 1. Validation Logic
        if (field === "start_date" && newValue && currentEnd) {
            if (new Date(newValue) > new Date(currentEnd)) {
                toast.error("Start date cannot be after end date");
                return;
            }
        }

        if (field === "end_date" && newValue && currentStart) {
            if (new Date(newValue) < new Date(currentStart)) {
                toast.error("End date cannot be before start date");
                return;
            }
        }

        // 2. Format the specific value being changed
        // Ensure we strip the Time/TZ data so Django gets exactly YYYY-MM-DD
        const formattedValue = newValue ? newValue.split("T")[0] : undefined;

        // 3. Single Commit
        makeChanges({
            field,
            action: "commit",
            value: formattedValue,
        });
    };

    // Access the computed progress from the project object (from your backend serializer)
    const progressValue = project.progress || 0;

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        makeChanges({
            field: "description",
            action: "sync",
            value: e.currentTarget.value,
        });
    };

    const handleDescriptionBlur = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        makeChanges({
            field: "description",
            action: "commit",
            value: e.currentTarget.value,
        });
    };

    return (
        <div className="p-6 space-y-8 animate-in fade-in-50 slide-in-from-right-4 duration-500">
            {/* Status Section */}
            <section className="space-y-4">
                <ProjectStatusControl
                    projectId={project.id}
                    currentStatus={project.status}
                    isOwner={isOwner}
                />
            </section>
            {/* Description Section */}
            <section className="space-y-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    About this Project
                </h3>
                <div className="relative group">
                    <Textarea
                        value={project.description || ""}
                        onChange={handleDescriptionChange}
                        onBlur={handleDescriptionBlur}
                        disabled={!isOwner}
                        placeholder={
                            isOwner
                                ? "Add a description..."
                                : "No description provided."
                        }
                        className={cn(
                            "resize-none min-h-30 text-sm leading-relaxed bg-transparent border-transparent px-0 py-0 shadow-none focus-visible:ring-0 transition-all p-2",
                            isOwner
                                ? "hover:bg-muted/50 -mx-2 px-2 rounded-md focus:bg-muted/50"
                                : "cursor-default",
                        )}
                    />
                </div>
            </section>

            {/* Timeline Section */}
            <section className="space-y-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Timeline
                </h3>
                <ProjectTimeline
                    startDate={project.start_date}
                    endDate={project.end_date}
                    isOwner={isOwner}
                    onUpdate={handleTimelineUpdate}
                />
            </section>

            {/* Progress Section */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Progress
                    </h3>
                    <span
                        className={cn(
                            "text-xs font-bold transition-colors",
                            progressValue === 100
                                ? "text-green-600"
                                : "text-primary",
                        )}
                    >
                        {progressValue}%
                    </span>
                </div>

                <div className="space-y-2">
                    <Progress
                        value={progressValue}
                        className="h-2 bg-muted/30"
                    />
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                        {progressValue === 100
                            ? "All tasks are complete! The project is ready for review."
                            : `Currently ${progressValue}% through the total task list.`}
                    </p>
                </div>
            </section>
        </div>
    );
}
