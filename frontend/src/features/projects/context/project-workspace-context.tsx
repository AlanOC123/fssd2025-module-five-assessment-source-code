import { createContext } from "react";
import type { ProjectWorkspaceContextType } from "../types";

export const ProjectWorkspaceContext = createContext<
    ProjectWorkspaceContextType | undefined
>(undefined);
