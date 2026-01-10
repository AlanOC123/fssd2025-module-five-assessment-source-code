import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner"; // Or your specific loading component
import { useGetProjectItem, useDeleteProject, ProjectDetailHeader, ProjectMembersList } from "@/features";

export function ProjectDetailsPage() {
    const { projectId } = useParams();
    const navigate = useNavigate();

    // 1. Safe ID Parsing
    const id = projectId ? parseInt(projectId, 10) : 0;

    // 2. Data Fetching
    const { data: project, isLoading, isError } = useGetProjectItem(id);
    const { mutateAsync: deleteProject, isPending: isDeleting } =
        useDeleteProject();

    // 3. Handlers
    const handleDelete = async () => {
        if (!id) return;
        try {
            await deleteProject(id);
            // Navigation is usually handled in the mutation onSuccess,
            // but we can force it here just in case.
            navigate("/projects");
        } catch (error) {
            // Error is handled by the hook's toast
            console.error("Failed to delete project", error);
        }
    };

    const handleEdit = () => {
        // TODO: Open the "Update Project Modal" (We will build this next)
        toast.info("Edit mode coming soon!");
    };

    // 4. Loading / Error States
    if (isLoading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Spinner className="size-6" />
            </div>
        );
    }

    if (isError || !project) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                    Project not found
                </h2>
                <p className="text-muted-foreground">
                    This project may have been deleted or you don't have
                    permission to view it.
                </p>
                <button
                    onClick={() => navigate("/projects")}
                    className="text-primary hover:underline"
                >
                    Return to Projects
                </button>
            </div>
        );
    }

    // 5. The Layout
    return (
        <div className="container max-w-7xl py-8 space-y-8 animate-in fade-in-50">
            {/* Header Section */}
            <ProjectDetailHeader
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={isDeleting}
            />

            <Separator />

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Tasks / Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Placeholder for Task Board */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 min-h-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg">Tasks</h3>
                            {/* Future: Add Task Button */}
                        </div>

                        <div className="flex flex-col items-center justify-center h-75 border-2 border-dashed rounded-lg bg-muted/10">
                            <p className="text-muted-foreground text-sm">
                                No tasks created yet.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Meta Info & Team */}
                <div className="space-y-6">
                    {/* Team Members */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <h3 className="font-semibold mb-4">Team Members</h3>
                        <ProjectMembersList
                            members={project.members || []}
                            owner={project.owner}
                        />
                    </div>

                    {/* Additional Meta (Optional) */}
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <h3 className="font-semibold mb-2">Project Info</h3>
                        <div className="text-sm space-y-2 text-muted-foreground">
                            <div className="flex justify-between">
                                <span>Created</span>
                                <span>
                                    {new Date(
                                        project.created_at
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>ID</span>
                                <span className="font-mono text-xs">
                                    #{project.id}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
