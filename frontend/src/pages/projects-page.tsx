import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ProjectsList, useGetProjectList } from "@/features";

import { useApp } from "@/hooks";

export function ProjectsPage() {
    const { openCreateProject } = useApp()

    // 1. Fetch Logic (Automatic URL syncing enabled)
    const { data: projects = [], isLoading } = useGetProjectList(true);

    return (
        <div className="container py-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Projects
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your workspace projects and track progress.
                    </p>
                </div>
                <Button
                    onClick={openCreateProject}
                    className="shrink-0"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                </Button>
            </div>

            <Separator />

            <ProjectsList
                projects={projects}
                isLoading={isLoading}
                onCreateClick={openCreateProject}
            />
        </div>
    );
}
