import { getProjectItem } from "../services";
import { useQuery } from "@tanstack/react-query";
import { DETAILED_PROJECT_QUERY_KEY } from "./keys";
import type { ProjectDetailItem } from "../types";

export function useGetProjectItem(id: number) {
    return useQuery<ProjectDetailItem>({
        queryKey: DETAILED_PROJECT_QUERY_KEY(id),
        queryFn: () => getProjectItem(id),
        enabled: !!id,
        retry: false
    });
}
