import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectList } from "@/features/projects/components/project-list";
import { useGetProjectList } from "@/features";
import { useApp } from "@/hooks/use-app"; // Assuming this controls your modal state
import { CreateProjectForm } from "@/features/projects/forms/create-project"; // Your form import

export function ProjectsPage() {
    const { data: projects, isLoading } = useGetProjectList();
    const { toggleCreateProject } = useApp();

    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Projects
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your workspace projects and track progress.
                    </p>
                </div>

                <Button
                    onClick={toggleCreateProject}
                    className="shrink-0 w-full sm:w-auto gap-2"
                >
                    <Plus className="w-4 h-4" />
                    New Project
                </Button>
            </div>

            <ProjectList projects={projects} isLoading={isLoading} />

            <CreateProjectForm />
        </div>
    );
}
