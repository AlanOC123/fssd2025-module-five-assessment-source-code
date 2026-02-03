import { useContext } from "react";
import { ProjectWorkspaceContext } from "../context";

export function useProjectWorkspace() {
    const context = useContext(ProjectWorkspaceContext);

    if (!context) throw new Error("Invalid use of project workspace context")

    return context
}