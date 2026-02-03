import { getProjectList } from "../services";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { PROJECTS_KEYS } from "./keys";

export function useGetProjectList(enableSearch: boolean = false) {
    // 1. Read the URL State
    const [searchParams] = useSearchParams();
    const search = enableSearch ? searchParams.get("search") : null;
    const query = search || undefined;

    return useQuery({
        // Cache Key Strategy:
        // We include the 'search' term in the key.
        // If the user types in the search bar, the key changes -> React Query refetches automatically.
        queryKey: PROJECTS_KEYS.list({ search: query }),
        queryFn: () => getProjectList({ search: query }),
    });
}
