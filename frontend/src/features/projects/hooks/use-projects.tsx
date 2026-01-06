import { getProjectList } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

type UseProjectOptions = {
    enableSearch?: boolean
}

export function useProjects({ enableSearch = false }: UseProjectOptions = {}) {
    const [searchParams] = useSearchParams();
    const query = enableSearch ? (searchParams.get("search") || undefined) : undefined;

    return useQuery({
        queryKey: ["projects", { query }],
        queryFn: () => getProjectList({ query })
    })
}