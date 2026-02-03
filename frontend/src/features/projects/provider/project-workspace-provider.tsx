import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type {
    ProjectDetailItem,
    ProjectWorkspaceProviderProps,
    WorkspaceTab,
    WorkspaceChangesProps
} from "../types";
import { useActiveUser } from "@/features/auth";
import { useUpdateProject, useGetProjectItem, PROJECTS_KEYS } from "../hooks";
import { ProjectWorkspaceContext } from "../context";

export function ProjectWorkspaceProvider({
    projectId,
    children,
}: ProjectWorkspaceProviderProps) {
    const queryClient = useQueryClient();
    const { data: user } = useActiveUser();

    // Fetch the data
    const { data: project, isLoading, isError } = useGetProjectItem(projectId);
    const { mutate: updateProject } = useUpdateProject();

    const [activeTab, setActiveTab] = useState<WorkspaceTab>("tasks");

    const isOwner = useMemo(() => {
        if (!project || !user) return false;
        return user.id === project.owner.user_id;
    }, [user, project]);

    const team = useMemo(() => {
        if (!project) return [];
        const members = project.members || [];
        const allMembers = [project.owner, ...members];

        return Array.from(
            new Map(allMembers.map((m) => [m.user_id, m])).values(),
        );
    }, [project]);

    const optimisticUpdate = (updates: Partial<ProjectDetailItem>) => {
        if (!project) return;

        // Update the specific project in the cache
        queryClient.setQueryData(
            PROJECTS_KEYS.detailed(projectId),
            (old: ProjectDetailItem) => ({
                ...old,
                ...updates,
            }),
        );
    };

    const makeChanges = async ({ field, action, value }: WorkspaceChangesProps) => {
        if (action === "sync") {
            if (!isOwner) return;
            optimisticUpdate({ [field]: value })
        }

        if (action === "commit") {
            if (!isOwner || !project) return;

            console.log()

            updateProject({
                projectId,
                data: { [field]: value }
            })
        }
    }

    const value = {
        project,
        team,
        isOwner,
        isError,
        isLoading,
        activeTab,
        setActiveTab,
        makeChanges
    };

    return (
        <ProjectWorkspaceContext.Provider value={value}>
            {children}
        </ProjectWorkspaceContext.Provider>
    );
}
