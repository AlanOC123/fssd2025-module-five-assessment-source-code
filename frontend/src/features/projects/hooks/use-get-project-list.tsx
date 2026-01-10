import { getProjectList } from "../services";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { PROJECTS_KEYS } from "./keys";

export function useGetProjectList(enableSearch: boolean = false) {
    const [searchParams] = useSearchParams();

    const search = enableSearch ? searchParams.get("search") : null;

    const query = search || undefined;

    return useQuery({
        queryKey: PROJECTS_KEYS.list({ search: query }),
        queryFn: () => getProjectList({ search: query }),
    });
}
