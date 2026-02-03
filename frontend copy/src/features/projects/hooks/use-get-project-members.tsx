import { useQuery } from "@tanstack/react-query";
import { getProjectMembers } from "../services";
import { PROJECTS_KEYS } from "./keys";

export function useGetProjectMembers(projectId: number) {
    return useQuery({
        queryKey: PROJECTS_KEYS.members(projectId),
        queryFn: () => getProjectMembers(projectId),
        enabled: !!projectId,
    });
}
