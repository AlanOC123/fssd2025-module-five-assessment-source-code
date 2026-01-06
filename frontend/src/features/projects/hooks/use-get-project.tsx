import { getProject } from "../api";
import { useQuery } from "@tanstack/react-query";

export function useGetProject(id: number) {
    return useQuery({
        queryKey: ["project", id],
        queryFn: () => getProject(id),
        enabled: !!id,
    })
}