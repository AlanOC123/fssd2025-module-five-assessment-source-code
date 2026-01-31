import { cn } from "@/lib/utils";
import { Textarea, Progress } from "@/components";
import { useProjectWorkspace } from "../hooks";
import { ProjectTimeline } from "../components";

export function ProjectInfoPanel() {
    const {
        project,
        isOwner,
        updateDescription,
        updateStartDate,
        updateEndDate,
    } = useProjectWorkspace();

    // Guard clause to ensure project data is available
    if (!project) return null;

    const handleTimelineUpdate = (start?: string, end?: string) => {
        updateStartDate(start);
        updateEndDate(end);
    };

    // Access the computed progress from the project object (from your backend serializer)
    const progressValue = project.progress || 0;

    return (
        <div className="p-6 space-y-8 animate-in fade-in-50 slide-in-from-right-4 duration-500">
            {/* Description Section */}
            <section className="space-y-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    About this Project
                </h3>
                <div className="relative group">
                    <Textarea
                        value={project.description || ""}
                        onChange={(e) => updateDescription(e.target.value)}
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