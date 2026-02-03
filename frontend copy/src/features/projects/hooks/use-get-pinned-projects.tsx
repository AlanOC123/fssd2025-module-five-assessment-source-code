import { PROJECTS_KEYS } from "./keys";
import { useQuery } from "@tanstack/react-query";
import { getProjectList } from "../services";

export function useGetPinnedProjects() {
    const params = { is_pinned: true }
    return useQuery({
        queryKey: PROJECTS_KEYS.list(params),
        queryFn: () => getProjectList(params),
        staleTime: 1000 * 60 * 5
    })
}