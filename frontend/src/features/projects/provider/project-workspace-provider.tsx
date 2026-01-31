import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type {
    ProjectDetailItem,
    ProjectWorkspaceProviderProps,
    WorkspaceTab,
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

    const updateTitle = async (newTitle: string) => {
        if (!isOwner || !project || newTitle === project.title) return;
        optimisticUpdate({ title: newTitle });
        updateProject({ id: projectId, data: { title: newTitle } });
    };

    const updateDescription = async (newDescription?: string) => {
        if (!isOwner || !project || newDescription === project.description)
            return;

        optimisticUpdate({ description: newDescription });
        updateProject({
            id: projectId,
            data: { description: newDescription },
        });
    };

    const updateStartDate = async (newDate?: string) => {
        if (!isOwner || !project || newDate === project.start_date) return;

        optimisticUpdate({ start_date: newDate || null });
        updateProject({
            id: projectId,
            data: { start_date: newDate },
        });
    };

    const updateEndDate = async (newDate?: string) => {
        if (!isOwner || !project || newDate === project.end_date) return;

        optimisticUpdate({ end_date: newDate || null });
        updateProject({ id: projectId, data: { end_date: newDate } });
    };

    const value = {
        project,
        team,
        isOwner,
        isError,
        isLoading,
        activeTab,
        setActiveTab,
        updateTitle,
        updateDescription,
        updateStartDate,
        updateEndDate,
    };

    return (
        <ProjectWorkspaceContext.Provider value={value}>
            {children}
        </ProjectWorkspaceContext.Provider>
    );
}
