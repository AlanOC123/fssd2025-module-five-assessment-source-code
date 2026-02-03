import { getPendingProjects } from "../services";
import { useQuery } from "@tanstack/react-query";

export function usePendingProjects() {
    return useQuery({
        queryKey: ["projects", "pending"],
        queryFn: getPendingProjects,
    });
}