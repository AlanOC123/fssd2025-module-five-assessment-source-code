import {
    ProjectWorkspaceLayout,
    ProjectError,
} from "@/features";

import { useParams } from "react-router";

export function ProjectWorkspacePage() {
    const { projectId } = useParams<{ projectId: string }>();

    if (projectId === undefined || isNaN(Number(projectId))) return ( <ProjectError /> );

    return <ProjectWorkspaceLayout projectId={Number(projectId)} />
}