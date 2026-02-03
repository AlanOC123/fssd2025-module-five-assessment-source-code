import { getProjectItem } from "../services";
import { useQuery } from "@tanstack/react-query";
import { PROJECTS_KEYS} from "./keys";
import type { ProjectDetailItem } from "../types";

export function useGetProjectItem(id: number) {
    return useQuery<ProjectDetailItem>({
        queryKey: PROJECTS_KEYS.detailed(id),
        queryFn: () => getProjectItem(id),
        enabled: !!id,
        retry: false
    });
}
